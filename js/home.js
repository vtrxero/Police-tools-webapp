/**
 * HOME - Police Tools App
 *
 * El inicio mostraba el dia y la fecha, y debajo seis tarjetas iguales con
 * bastante espacio muerto. No decia nada sobre el turno ni sobre lo que
 * queda por hacer.
 *
 * Ahora muestra cuanto falta del turno, que documentos ya se enviaron hoy y
 * cuales no, y avisa si hay un borrador sin terminar para retomarlo.
 */

(function () {
    'use strict';

    const app = () => window.app;

    // Documentos que se esperan en un turno normal
    const DOCUMENTOS = [
        { tipo: 'patrol', tab: 'patrol-log', nombre: 'Patrol Log' },
        { tipo: 'pmcs', tab: 'pmcs', nombre: 'PMCS' },
        { tipo: 'guardmount', tab: 'guard-mount', nombre: 'Guard Mount' }
    ];

    // ============================================
    // TURNO
    // ============================================
    /** Horas de inicio y fin de cada turno, en minutos desde medianoche. */
    const HORARIOS = {
        days:   { ini: 7 * 60,  fin: 15 * 60, etiqueta: 'Day Shift',   rango: '0700-1500' },
        swings: { ini: 15 * 60, fin: 23 * 60, etiqueta: 'Swing Shift', rango: '1500-2300' },
        mid:    { ini: 17.5 * 60, fin: 6.5 * 60, etiqueta: 'Mid Shift', rango: '1730-0630' }
    };

    function turnoDeHoy() {
        // Si hay calendario Panama configurado, manda ese
        try {
            const panama = app()?.getPanamaShiftForDate?.(new Date());
            if (panama && panama.type && panama.type !== 'off') {
                return HORARIOS[panama.type] ? { clave: panama.type, ...HORARIOS[panama.type] } : null;
            }
            if (panama && panama.type === 'off') return { clave: 'off', etiqueta: 'Off duty', rango: '' };
        } catch (e) {}

        // Si no, el turno por defecto de los ajustes
        const porDefecto = document.getElementById('default-shift')?.value || 'days';
        return { clave: porDefecto, ...HORARIOS[porDefecto] };
    }

    /** Progreso del turno actual: 0 a 1, o null si no esta en curso. */
    function progresoTurno(turno) {
        if (!turno || turno.clave === 'off' || turno.ini === undefined) return null;

        const ahora = new Date();
        const min = ahora.getHours() * 60 + ahora.getMinutes();

        let { ini, fin } = turno;
        let transcurrido, total;

        if (fin > ini) {
            // Turno dentro del mismo dia
            if (min < ini || min >= fin) return null;
            transcurrido = min - ini;
            total = fin - ini;
        } else {
            // Turno que cruza medianoche (Mid)
            total = (24 * 60 - ini) + fin;
            if (min >= ini) transcurrido = min - ini;
            else if (min < fin) transcurrido = (24 * 60 - ini) + min;
            else return null;
        }

        const restante = total - transcurrido;
        return {
            fraccion: Math.min(1, Math.max(0, transcurrido / total)),
            restanteMin: restante,
            texto: restante >= 60
                ? `${Math.floor(restante / 60)} h ${String(restante % 60).padStart(2, '0')} m left`
                : `${restante} m left`
        };
    }

    // ============================================
    // DOCUMENTOS DEL DIA
    // ============================================
    function reportesDeHoy() {
        const hoy = new Date().toISOString().split('T')[0];
        return (app()?.dailyReports || []).filter(r => {
            const f = r.documentDate || r.date || '';
            return String(f).startsWith(hoy);
        });
    }

    /** Formulario con datos escritos pero sin generar todavia. */
    function borradorPendiente() {
        const estado = app()?.formState || {};
        for (const d of DOCUMENTOS) {
            const clave = d.tipo === 'patrol' ? 'patrol' : d.tipo;
            const datos = estado[clave];
            if (!datos) continue;

            const rellenos = Object.values(datos).filter(v => v && String(v).trim()).length;
            // vehicle_type viene puesto de serie, no cuenta como escrito
            const minimo = clave === 'pmcs' ? 2 : 1;
            if (rellenos >= minimo) {
                const yaGenerado = reportesDeHoy().some(r => r.type === d.tipo);
                if (!yaGenerado) return { ...d, campos: rellenos };
            }
        }
        return null;
    }

    // ============================================
    // PINTADO
    // ============================================
    function render() {
        const caja = document.getElementById('home-status');
        if (!caja || !app()) return;

        const turno = turnoDeHoy();
        const prog = progresoTurno(turno);
        const hechos = reportesDeHoy();
        const borrador = borradorPendiente();

        // --- Tarjeta de turno ---
        let html = '';

        const hoy = new Date();
        const dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const fecha = `${dias[hoy.getDay()]} · ${meses[hoy.getMonth()]} ${hoy.getDate()}`;

        // Abre el calendario, igual que hacia la flecha de la tarjeta antigua
        const flecha = `
            <button type="button" class="hs-cal" data-cal aria-label="Open calendar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>`;

        if (prog) {
            html += `
                <div class="hs-shift running">
                    <div class="hs-main">
                        <span class="hs-label">${fecha} · ${turno.etiqueta} ${turno.rango}</span>
                        <b class="hs-big">${prog.texto}</b>
                    </div>
                    ${flecha}
                    <div class="hs-bar"><i style="width:${(prog.fraccion * 100).toFixed(1)}%"></i></div>
                </div>`;
        } else if (turno && turno.clave === 'off') {
            html += `
                <div class="hs-shift off">
                    <div class="hs-main">
                        <span class="hs-label">${fecha}</span>
                        <b class="hs-big">Off duty</b>
                    </div>
                    ${flecha}
                </div>`;
        } else if (turno) {
            html += `
                <div class="hs-shift">
                    <div class="hs-main">
                        <span class="hs-label">${fecha} · next ${turno.etiqueta}</span>
                        <b class="hs-big">${turno.rango}</b>
                    </div>
                    ${flecha}
                </div>`;
        }

        // --- Borrador sin terminar ---
        if (borrador) {
            html += `
                <button type="button" class="hs-resume" data-resume="${borrador.tab}">
                    <span class="hs-dot"></span>
                    <span class="hs-resume-text">
                        <b>${borrador.nombre} unfinished</b>
                        <em>${borrador.campos} field${borrador.campos === 1 ? '' : 's'} filled · tap to continue</em>
                    </span>
                </button>`;
        }

        // --- Documentos del turno ---
        const fichas = DOCUMENTOS.map(d => {
            const hecho = hechos.find(r => r.type === d.tipo);
            return `
                <button type="button" class="hs-doc${hecho ? ' done' : ''}" data-doc="${d.tab}">
                    <span class="hs-doc-name">${d.nombre}</span>
                    <span class="hs-doc-state">${hecho ? '&#10003; ' + (hecho.displayTime || 'filed') : 'Pending'}</span>
                </button>`;
        }).join('');

        html += `<div class="hs-docs">${fichas}</div>`;

        caja.innerHTML = html;

        caja.querySelectorAll('[data-doc]').forEach(b => {
            b.addEventListener('click', () => app().openTab(b.dataset.doc));
        });
        caja.querySelector('[data-resume]')?.addEventListener('click', (e) => {
            app().openTab(e.currentTarget.dataset.resume);
        });
        caja.querySelector('[data-cal]')?.addEventListener('click', () => app().openTab('calendar'));
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        // La tarjeta de estado sustituye a la tarjeta azul de turno, que solo
        // repetia el dia y la fecha ya visibles en el chip de arriba y dejaba
        // hueco muerto. Se oculta en vez de borrarla porque updateDateDisplay
        // sigue escribiendo en sus nodos.
        const vieja = document.querySelector('.main-content .shift-card');
        if (vieja && !document.getElementById('home-status')) {
            vieja.hidden = true;

            const caja = document.createElement('section');
            caja.id = 'home-status';
            caja.className = 'home-status';
            vieja.parentNode.insertBefore(caja, vieja.nextSibling);
        }

        render();

        // Se refresca al volver del formulario y cada minuto (el tiempo
        // restante del turno cambia solo)
        setInterval(render, 60000);
        document.addEventListener('reportschanged', render);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') render();
        });

        // Al cerrar una vista puede haber cambiado el estado
        new MutationObserver(() => {
            if (!document.querySelector('.tab-view.active')) render();
        }).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
    } else {
        setTimeout(init, 100);
    }

    window.PoliceToolsHome = { render, turnoDeHoy, progresoTurno };
})();
