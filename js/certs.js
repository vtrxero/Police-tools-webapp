/**
 * VENCIMIENTOS DE CERTIFICACIONES - Police Tools V2
 *
 * Cualificacion de arma, CPR, Taser, ASP, operador de radar, CJIS, fisico,
 * licencia. Se vencen en fechas distintas, no avisa nadie, y una vencida te
 * saca de la calle o tumba lo que hiciste con ella. Estaba todo en la cabeza
 * o en un papel en la taquilla.
 *
 * Aqui se anotan las fechas y la app avisa con antelacion.
 *
 * Las fechas se parten a mano en año/mes/dia y NO se construyen con
 * new Date('2026-11-11'): eso se interpreta como medianoche UTC, que en
 * Puerto Rico (UTC-4) es el dia anterior a las 20:00, y toda la cuenta de
 * dias saldria desplazada uno. Es el mismo defecto que tenia el calendario.
 */

(function () {
    'use strict';

    const CLAVE = 'policeToolsCerts';
    const CLAVE_AVISO = 'policeTools_avisoCerts';

    /** Umbrales de aviso, en dias. */
    const UMBRALES = [60, 30];

    const app = () => window.app;

    /**
     * Lo que se lleva en este puesto. La lista es para no teclear: se toca y
     * queda puesto el nombre, con la fecha por rellenar.
     */
    const SUGERIDAS = [
        'Weapons qualification',
        'CPR / First Aid',
        'Taser recertification',
        'ASP / baton',
        'OC spray',
        'Radar / lidar operator',
        'CJIS / NCIC security awareness',
        'Physical / medical exam',
        'Driver’s license',
        'Government driver’s permit (OF-346)'
    ];

    // ============================================
    // FECHAS
    // ============================================
    /** yyyy-mm-dd -> Date local a medianoche. */
    function aFecha(iso) {
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '').trim());
        if (!m) return null;
        return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    }

    function hoyLocal() {
        const n = new Date();
        return new Date(n.getFullYear(), n.getMonth(), n.getDate());
    }

    /** Dias hasta la fecha. Negativo si ya paso. */
    function diasHasta(iso) {
        const f = aFecha(iso);
        if (!f) return null;
        return Math.round((f - hoyLocal()) / 86400000);
    }

    /**
     * En que estado esta.
     *
     * 'vencida' | 'critica' (<=30) | 'proxima' (<=60) | 'ok' | 'sinfecha'
     */
    function estado(cert) {
        const d = diasHasta(cert.vence);
        if (d === null) return { clave: 'sinfecha', dias: null };
        if (d < 0) return { clave: 'vencida', dias: d };
        if (d <= 30) return { clave: 'critica', dias: d };
        if (d <= 60) return { clave: 'proxima', dias: d };
        return { clave: 'ok', dias: d };
    }

    function textoEstado(e) {
        if (e.clave === 'sinfecha') return 'No date set';
        if (e.clave === 'vencida') {
            const d = Math.abs(e.dias);
            return d === 0 ? 'Expires today' : `Expired ${d} day${d === 1 ? '' : 's'} ago`;
        }
        if (e.dias === 0) return 'Expires today';
        return `${e.dias} day${e.dias === 1 ? '' : 's'} left`;
    }

    // ============================================
    // ALMACENAMIENTO
    // ============================================
    function leer() {
        try {
            const v = JSON.parse(localStorage.getItem(CLAVE) || '[]');
            return Array.isArray(v) ? v : [];
        } catch (e) {
            return [];
        }
    }

    function escribir(lista) {
        try {
            localStorage.setItem(CLAVE, JSON.stringify(lista));
        } catch (e) {
            app()?.showToast?.('Could not save: storage full', 'error');
            return false;
        }
        document.dispatchEvent(new CustomEvent('certschanged'));
        return true;
    }

    // ============================================
    // API
    // ============================================
    const API = {
        SUGERIDAS,
        estado,
        diasHasta,

        /** Ordenadas por la que vence antes. Las sin fecha, al final. */
        todas() {
            return leer().slice().sort((a, b) => {
                const da = diasHasta(a.vence);
                const db = diasHasta(b.vence);
                if (da === null && db === null) return String(a.nombre).localeCompare(b.nombre);
                if (da === null) return 1;
                if (db === null) return -1;
                return da - db;
            });
        },

        guardar(cert) {
            const lista = leer();
            const id = cert.id || `cert_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`;
            const i = lista.findIndex(c => c.id === id);
            const registro = { ...cert, id };
            if (i === -1) lista.push(registro);
            else lista[i] = registro;
            return escribir(lista) ? registro : null;
        },

        borrar(id) {
            return escribir(leer().filter(c => c.id !== id));
        },

        /** Las que piden atencion: vencidas o a menos de 60 dias. */
        pendientes() {
            return this.todas().filter(c => {
                const e = estado(c);
                return e.clave === 'vencida' || e.clave === 'critica' || e.clave === 'proxima';
            });
        }
    };

    // ============================================
    // AVISOS
    // ============================================
    /**
     * Avisa al cruzar cada umbral, una sola vez por umbral y certificacion.
     *
     * Se recuerda el umbral ya avisado y no la fecha del aviso: repetirlo cada
     * dia desde los 60 hasta el vencimiento son sesenta avisos de lo mismo, y
     * eso se ignora entero. Asi hay tres: a 60 dias, a 30 y cuando vence.
     */
    function avisar() {
        let ya = {};
        try { ya = JSON.parse(localStorage.getItem(CLAVE_AVISO) || '{}') || {}; } catch (e) {}

        let cambio = false;

        for (const cert of API.todas()) {
            const d = diasHasta(cert.vence);
            if (d === null) continue;

            // El umbral que le toca ahora: 0 para vencida, si no 30 o 60
            let umbral = null;
            if (d < 0) umbral = 0;
            else {
                for (const u of UMBRALES) {
                    if (d <= u) { umbral = u; break; }
                }
            }
            if (umbral === null) continue;

            // Ya avisado en este umbral o en uno mas cercano
            const previo = ya[cert.id];
            if (previo !== undefined && previo <= umbral) continue;

            const e = estado(cert);
            app()?.addNotification?.(
                umbral === 0 ? 'error' : 'warning',
                umbral === 0 ? `${cert.nombre} expired` : `${cert.nombre} expires soon`,
                `${textoEstado(e)} · ${cert.vence}`
            );

            ya[cert.id] = umbral;
            cambio = true;
        }

        // Limpia los avisos de lo que ya no existe
        const vivos = new Set(leer().map(c => c.id));
        for (const id of Object.keys(ya)) {
            if (!vivos.has(id)) { delete ya[id]; cambio = true; }
        }

        if (cambio) {
            try { localStorage.setItem(CLAVE_AVISO, JSON.stringify(ya)); } catch (e) {}
        }
    }

    // ============================================
    // UI
    // ============================================
    function $(id) {
        return document.getElementById(id);
    }

    function escapar(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function pintarSugerencias() {
        const cont = $('cert-suggestions');
        if (!cont) return;

        const puestas = new Set(leer().map(c => String(c.nombre).toLowerCase()));
        const faltan = SUGERIDAS.filter(n => !puestas.has(n.toLowerCase()));

        cont.innerHTML = faltan.map(n =>
            `<button type="button" class="cert-chip" data-add="${escapar(n)}">+ ${escapar(n)}</button>`
        ).join('');
        cont.hidden = !faltan.length;
    }

    function pintarLista() {
        const cont = $('cert-list');
        if (!cont) return;

        const lista = API.todas();
        if (!lista.length) {
            cont.innerHTML = '<p class="empty-state">Nothing tracked yet. '
                + 'Add what expires and the app will warn you at 60 and 30 days.</p>';
        } else {
            cont.innerHTML = lista.map(c => {
                const e = estado(c);
                return `<div class="cert-item ${e.clave}">
                    <div class="ci-main">
                        <b>${escapar(c.nombre)}</b>
                        <span class="ci-state">${escapar(textoEstado(e))}</span>
                    </div>
                    <div class="ci-meta">
                        <span>${c.vence ? escapar(c.vence) : 'set a date'}</span>
                        ${c.notas ? `<span>${escapar(c.notas)}</span>` : ''}
                    </div>
                    <div class="ci-actions">
                        <input type="date" class="cert-date" data-id="${escapar(c.id)}"
                               value="${escapar(c.vence || '')}"
                               aria-label="Expiry date for ${escapar(c.nombre)}" />
                        <button type="button" class="btn-link cert-del"
                                data-id="${escapar(c.id)}">Remove</button>
                    </div>
                </div>`;
            }).join('');
        }

        pintarSugerencias();
        pintarResumen();
    }

    /** Una linea con lo que pide atencion, para el inicio de la vista. */
    function pintarResumen() {
        const el = $('cert-summary');
        if (!el) return;

        const pend = API.pendientes();
        if (!pend.length) {
            el.hidden = true;
            return;
        }

        const vencidas = pend.filter(c => estado(c).clave === 'vencida');
        el.hidden = false;
        el.className = `cert-summary${vencidas.length ? ' vencida' : ''}`;
        el.innerHTML = vencidas.length
            ? `<b>${vencidas.length} expired</b><span>${
                vencidas.map(c => escapar(c.nombre)).join(', ')}</span>`
            : `<b>${pend.length} expiring within 60 days</b><span>${
                pend.map(c => `${escapar(c.nombre)} (${estado(c).dias}d)`).join(', ')}</span>`;
    }

    function anadirDesdeFormulario() {
        const nombre = ($('cert_nombre')?.value || '').trim();
        if (!nombre) {
            app()?.showToast?.('Name the certification', 'error');
            $('cert_nombre')?.focus();
            return;
        }

        API.guardar({
            nombre,
            vence: $('cert_vence')?.value || '',
            notas: ($('cert_notas')?.value || '').trim()
        });

        if ($('cert_nombre')) $('cert_nombre').value = '';
        if ($('cert_vence')) $('cert_vence').value = '';
        if ($('cert_notas')) $('cert_notas').value = '';

        pintarLista();
        avisar();
    }

    // ============================================
    // ARRANQUE
    // ============================================
    function init() {
        $('add-cert')?.addEventListener('click', anadirDesdeFormulario);

        // Una sugerencia se anade sin fecha: la fecha se pone en la propia
        // fila, que es donde se ve contra que se compara.
        $('cert-suggestions')?.addEventListener('click', (e) => {
            const boton = e.target.closest('[data-add]');
            if (!boton) return;
            API.guardar({ nombre: boton.dataset.add, vence: '', notas: '' });
            pintarLista();
        });

        const lista = $('cert-list');

        lista?.addEventListener('click', (e) => {
            const boton = e.target.closest('.cert-del');
            if (!boton) return;
            API.borrar(boton.dataset.id);
            pintarLista();
            avisar();
        });

        // La fecha se edita en la fila y se guarda al cambiarla: un boton de
        // guardar aparte sobra para un solo campo.
        lista?.addEventListener('change', (e) => {
            const campo = e.target.closest('.cert-date');
            if (!campo) return;
            const cert = leer().find(c => c.id === campo.dataset.id);
            if (!cert) return;
            API.guardar({ ...cert, vence: campo.value });
            pintarLista();
            avisar();
        });

        // Repinta la lista entera, no solo el resumen: los datos cambian
        // tambien desde fuera de esta vista (una restauracion de copia, otra
        // pestana de la PWA), y entonces la lista abierta se quedaba con lo
        // de antes hasta volver a entrar.
        document.addEventListener('certschanged', pintarLista);

        document.addEventListener('click', (e) => {
            if (!e.target.closest('[data-tab="certs"]')) return;
            setTimeout(pintarLista, 80);
        }, true);

        pintarLista();

        // Espera a que la app pueda recibir avisos
        setTimeout(avisar, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
    } else {
        setTimeout(init, 300);
    }

    window.PTCerts = API;
})();
