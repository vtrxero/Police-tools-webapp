/**
 * FORM PROGRESS - Police Tools App
 *
 * El PMCS tiene 46 campos y el Interview 61, en un scroll continuo sin
 * ninguna referencia de por donde vas. Y al generar, la validacion existia
 * (validatePayload) pero no se veia: el boton fallaba sin decir que faltaba.
 *
 * Aqui se añade una barra pegada arriba con las secciones del formulario y
 * cuanto llevas, y el boton de generar dice que campo falta.
 */

(function () {
    'use strict';

    const app = () => window.app;

    // Campos obligatorios por tipo de documento
    const OBLIGATORIOS = {
        patrol: [
            { campo: 'date', nombre: 'Date' },
            { campo: 'patrol', nombre: 'Patrol' },
            { campo: 'police_name', nombre: 'Officer name' }
        ],
        pmcs: [
            { campo: 'date', nombre: 'Date' },
            { campo: 'vehicle_number', nombre: 'Vehicle #' },
            { campo: 'operator_name', nombre: 'Operator name' }
        ],
        guardmount: [
            { campo: 'date', nombre: 'Date' },
            { campo: 'supervisor_name', nombre: 'Supervisor name' }
        ],
        interview: [
            { campo: 'date', nombre: 'Date' },
            { campo: 'last_name', nombre: 'Last name' }
        ]
    };

    const VISTAS = {
        'patrol-log-view': 'patrol',
        'pmcs-view': 'pmcs',
        'guard-mount-view': 'guardmount',
        'interview-view': 'interview'
    };

    // ============================================
    // MEDICION
    // ============================================
    function camposDe(vista) {
        const form = vista.querySelector('form');
        if (!form) return [];
        return [...form.querySelectorAll('input, select, textarea')].filter(el => {
            if (el.type === 'hidden' || el.readOnly) return false;
            if (el.offsetParent === null) return false;   // oculto
            return true;
        });
    }

    function relleno(el) {
        if (el.type === 'checkbox' || el.type === 'radio') return el.checked;
        return !!String(el.value || '').trim();
    }

    function faltantes(vista, tipo) {
        const form = vista.querySelector('form');
        if (!form) return [];

        return (OBLIGATORIOS[tipo] || []).filter(o => {
            const el = form.querySelector(`[name="${o.campo}"], #${o.campo}`);
            return !el || !relleno(el);
        });
    }

    // ============================================
    // SECCIONES
    // ============================================
    function seccionesDe(vista) {
        return [...vista.querySelectorAll('.form-section')].map((sec, i) => {
            const titulo = sec.querySelector('h3')?.textContent.trim() || `Section ${i + 1}`;
            const campos = [...sec.querySelectorAll('input, select, textarea')]
                .filter(el => el.type !== 'hidden' && !el.readOnly);
            const hechos = campos.filter(relleno).length;
            return { sec, titulo, total: campos.length, hechos, i };
        }).filter(s => s.total > 0);
    }

    // ============================================
    // BARRA
    // ============================================
    function montar(vista) {
        if (vista.querySelector('.fp-bar')) return;

        const cabecera = vista.querySelector('.view-header');
        if (!cabecera) return;

        const barra = document.createElement('div');
        barra.className = 'fp-bar';
        barra.innerHTML = `
            <div class="fp-chips"></div>
            <div class="fp-meter"><i></i></div>
        `;
        cabecera.parentNode.insertBefore(barra, cabecera.nextSibling);
    }

    function actualizar(vista) {
        const barra = vista.querySelector('.fp-bar');
        if (!barra) return;

        const secciones = seccionesDe(vista);
        const campos = camposDe(vista);
        const total = campos.length;
        const hechos = campos.filter(relleno).length;

        barra.querySelector('.fp-meter i').style.width =
            total ? `${(hechos / total * 100).toFixed(1)}%` : '0%';

        const chips = barra.querySelector('.fp-chips');

        // Solo se reconstruyen las fichas si cambio el numero de secciones,
        // para no perder la posicion del scroll horizontal al escribir
        if (chips.children.length !== secciones.length) {
            chips.innerHTML = secciones.map(s => `
                <button type="button" class="fp-chip" data-sec="${s.i}">
                    <span class="fp-chip-name">${s.titulo}</span>
                    <span class="fp-chip-count">${s.hechos}/${s.total}</span>
                </button>
            `).join('');

            chips.querySelectorAll('.fp-chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    const s = secciones[+btn.dataset.sec];
                    s?.sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        } else {
            secciones.forEach((s, i) => {
                const chip = chips.children[i];
                if (!chip) return;
                chip.querySelector('.fp-chip-count').textContent = `${s.hechos}/${s.total}`;
                chip.classList.toggle('done', s.hechos === s.total && s.total > 0);
                chip.classList.toggle('empty', s.hechos === 0);
            });
        }
    }

    // ============================================
    // BOTONES DE GENERAR
    // ============================================
    /**
     * Cambia el texto del boton para decir que falta.
     * Antes el boton siempre decia lo mismo y el fallo aparecia despues.
     */
    function actualizarBotones(vista, tipo) {
        const falta = faltantes(vista, tipo);

        vista.querySelectorAll('[id$="-save"], [id$="-download"], [id$="-share"], [id$="-preview"]')
            .forEach(btn => {
                if (!btn.dataset.textoOriginal) {
                    btn.dataset.textoOriginal = btn.textContent.trim();
                }

                if (falta.length) {
                    btn.classList.add('needs-fields');
                    btn.title = 'Missing: ' + falta.map(f => f.nombre).join(', ');
                } else {
                    btn.classList.remove('needs-fields');
                    btn.title = '';
                }
            });

        // Aviso bajo la barra
        let aviso = vista.querySelector('.fp-missing');
        if (falta.length) {
            if (!aviso) {
                aviso = document.createElement('div');
                aviso.className = 'fp-missing';
                vista.querySelector('.fp-bar')?.appendChild(aviso);
            }
            aviso.textContent = `Missing: ${falta.map(f => f.nombre).join(', ')}`;
        } else if (aviso) {
            aviso.remove();
        }
    }

    // ============================================
    // PRELLENADO DEL ULTIMO TURNO
    // ============================================
    // Datos que casi no cambian de un turno a otro
    const HEREDABLES = {
        patrol: ['patrol', 'police_name', 'mid', 'vehicle', 'radio_no'],
        pmcs: ['unit', 'vehicle_number', 'operator_name', 'supervisor_name', 'desk_sergeant_name'],
        guardmount: ['supervisor_name', 'supervisor_rank', 'inspection_location'],
        interview: []
    };

    function ultimoReporte(tipo) {
        return (app()?.dailyReports || []).find(r => r.type === tipo) || null;
    }

    function montarPrellenado(vista, tipo) {
        const campos = HEREDABLES[tipo] || [];
        if (!campos.length) return;
        if (vista.querySelector('.fp-prefill')) return;

        const anterior = ultimoReporte(tipo);
        if (!anterior?.formData) return;

        const disponibles = campos.filter(c => {
            const v = anterior.formData[c];
            return v && String(v).trim();
        });
        if (!disponibles.length) return;

        const form = vista.querySelector('form');
        if (!form) return;

        // Si el formulario ya tiene datos, no molesta
        const yaEscrito = [...form.querySelectorAll('input, select, textarea')]
            .filter(el => el.type !== 'hidden' && !el.readOnly && relleno(el)).length;
        if (yaEscrito > 2) return;

        const caja = document.createElement('button');
        caja.type = 'button';
        caja.className = 'fp-prefill';
        const fecha = (anterior.documentDate || anterior.date || '').split('T')[0];
        caja.innerHTML = `
            <span class="fp-prefill-text">
                <b>Use data from last shift</b>
                <em>${disponibles.length} field${disponibles.length === 1 ? '' : 's'}${fecha ? ' · ' + fecha : ''}</em>
            </span>
            <span class="fp-prefill-go">Fill</span>
        `;

        caja.addEventListener('click', () => {
            let puestos = 0;
            disponibles.forEach(c => {
                const el = form.querySelector(`[name="${c}"]`);
                if (el && !relleno(el)) {
                    el.value = anterior.formData[c];
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    puestos++;
                }
            });
            caja.remove();
            app()?.showToast(`${puestos} field(s) filled from last shift`, 'success');
            window.PoliceToolsMobile?.haptics.success();
        });

        form.insertBefore(caja, form.firstChild);
    }

    // ============================================
    // INICIO
    // ============================================
    function refrescar() {
        const vista = document.querySelector('.tab-view.active');
        if (!vista) return;

        const tipo = VISTAS[vista.id];
        if (!tipo) return;

        montar(vista);
        actualizar(vista);
        actualizarBotones(vista, tipo);
        montarPrellenado(vista, tipo);
    }

    function init() {
        // Al escribir cambia el progreso. Se agrupa en un frame porque
        // rellenar un formulario dispara decenas de eventos seguidos.
        let pendiente = false;
        const pedirRefresco = () => {
            if (pendiente) return;
            pendiente = true;
            requestAnimationFrame(() => {
                pendiente = false;
                refrescar();
            });
        };

        document.addEventListener('input', pedirRefresco);
        document.addEventListener('change', pedirRefresco);

        // Solo se vigila la apertura de vistas. Vigilar 'class' en todo el
        // subarbol provocaba un bucle: refrescar cambia clases de las fichas,
        // eso disparaba al observador y este volvia a refrescar.
        const obs = new MutationObserver(pedirRefresco);
        document.querySelectorAll('.tab-view').forEach(v => {
            obs.observe(v, { attributes: true, attributeFilter: ['class'] });
        });

        refrescar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 150));
    } else {
        setTimeout(init, 150);
    }

    window.PoliceToolsProgress = { refrescar, faltantes };
})();
