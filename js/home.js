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

    /**
     * getPanamaShiftForDate devuelve { type: 'on' | 'off', shift: 'day' |
     * 'night' }: en type va si se trabaja y en shift cual de los dos turnos.
     * Aqui se buscaba HORARIOS[panama.type], es decir HORARIOS['on'], que no
     * existe — asi que en cuanto se configuraba el patron de Panama esta
     * funcion devolvia null y el inicio se quedaba sin turno. Funcionaba solo
     * mientras el patron estaba sin configurar, porque entonces cae al turno
     * por defecto de los ajustes.
     */
    /*
     * Turnos de Panama en Ft. Buchanan: 13 horas, no 12. Se entra media hora
     * antes del relevo y se sale media hora despues, y de esas 13 una va como
     * overtime. De ahi el solape entre el fin del de dia (1830) y el inicio
     * del de noche (1730).
     *
     * HORARIOS, mas arriba, son los de 8 horas del turno por defecto: se usan
     * solo cuando no hay patron de Panama configurado. Mezclarlos hacia que el
     * inicio anunciara "Day Shift 0700-1500" y que la cuenta atras saliera con
     * el horario que no era.
     */
    const PANAMA = {
        day:   { ini: 5.5 * 60,  fin: 18.5 * 60, etiqueta: 'Day Shift',   rango: '0530-1830' },
        night: { ini: 17.5 * 60, fin: 6.5 * 60,  etiqueta: 'Night Shift', rango: '1730-0630' }
    };

    /** Horas de un turno de Panama que van como overtime. */
    const HORAS_OVERTIME = 1;

    function turnoDeFecha(fecha) {
        // Si hay calendario Panama configurado, manda ese
        try {
            const panama = app()?.getPanamaShiftForDate?.(fecha);
            if (panama && panama.type === 'off') {
                return { clave: 'off', etiqueta: 'Off duty', rango: '' };
            }
            if (panama && panama.type === 'on') {
                const clave = panama.shift === 'night' ? 'night' : 'day';
                return { clave, ...PANAMA[clave] };
            }
        } catch (e) {}

        // Si no, el turno por defecto de los ajustes
        const porDefecto = document.getElementById('default-shift')?.value || 'days';
        return { clave: porDefecto, ...HORARIOS[porDefecto] };
    }

    function turnoDeHoy() {
        return turnoDeFecha(new Date());
    }

    function iso(f) {
        return `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${
            String(f.getDate()).padStart(2, '0')}`;
    }

    /**
     * El dia de trabajo, que no siempre es el dia del calendario.
     *
     * El turno de noche entra a las 1730 y sale a las 0630 del dia siguiente,
     * asi que a las dos de la madrugada el reloj dice 20 de agosto pero el
     * turno que se esta trabajando es el del 19. Todo lo que la app fecha
     * sola —la fecha que propone en el parte, el aviso del PMCS, el turno que
     * enseña el inicio— miraba el reloj sin mas.
     *
     * Eso rompia dos cosas a la vez en un turno de noche:
     *
     *   - Al pasar la medianoche, el parte del turno cambiaba de dia. Como
     *     solo hay un Patrol Log por fecha, el turno acababa partido en dos
     *     documentos: el que se empezo a las 1730 y otro por lo que quedaba.
     *   - El calendario podia decir "libre" a las tres de la manana estando
     *     de servicio, porque miraba el 20 y el turno era del 19.
     *
     * Antes de la hora de salida, el dia de trabajo sigue siendo el de ayer,
     * siempre que ayer tocara turno de noche. En turno de dia o libre, el dia
     * de trabajo es el del calendario.
     */
    function diaDeTrabajo(momento = new Date()) {
        const min = momento.getHours() * 60 + momento.getMinutes();

        const ayer = new Date(momento);
        ayer.setDate(ayer.getDate() - 1);

        const turnoDeAyer = turnoDeFecha(ayer);
        const cruzaMedianoche = turnoDeAyer
            && turnoDeAyer.ini !== undefined
            && turnoDeAyer.fin !== undefined
            && turnoDeAyer.fin <= turnoDeAyer.ini;

        if (cruzaMedianoche && min < turnoDeAyer.fin) return iso(ayer);

        return iso(momento);
    }

    /** El turno que se esta trabajando ahora, contando la noche que sigue. */
    function turnoEnCurso(momento = new Date()) {
        const dia = diaDeTrabajo(momento);
        const [y, m, d] = dia.split('-').map(Number);
        return turnoDeFecha(new Date(y, m - 1, d));
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
    // PROXIMO TURNO
    // ============================================
    /** Fecha y hora en que empieza el proximo turno. */
    function proximoInicio(turno) {
        if (!turno || turno.ini === undefined) return null;

        const ahora = new Date();
        const inicio = new Date(ahora);
        inicio.setHours(Math.floor(turno.ini / 60), turno.ini % 60, 0, 0);

        // Si la hora de inicio ya paso hoy, el proximo es mañana
        if (inicio <= ahora) inicio.setDate(inicio.getDate() + 1);
        return inicio;
    }

    function cuentaAtras(hasta) {
        const ms = hasta - Date.now();
        if (ms <= 0) return null;
        const min = Math.floor(ms / 60000);
        const h = Math.floor(min / 60);
        return h ? `${h}h ${String(min % 60).padStart(2, '0')}m` : `${min}m`;
    }

    // ============================================
    // ANILLO DE PROGRESO
    // ============================================
    /** Aro SVG que indica cuanto lleva relleno ese documento. */
    function anillo(fraccion, clase) {
        const R = 9;
        const C = 2 * Math.PI * R;
        const avance = C * Math.max(0, Math.min(1, fraccion));
        return `
            <svg class="hs-ring ${clase}" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="${R}" class="hs-ring-bg"></circle>
                <circle cx="12" cy="12" r="${R}" class="hs-ring-fg"
                        stroke-dasharray="${avance.toFixed(2)} ${C.toFixed(2)}"></circle>
            </svg>`;
    }

    /** Cuanto lleva relleno el formulario de ese tipo, de 0 a 1. */
    function avanceDe(tipo) {
        const clave = tipo === 'patrol' ? 'patrol' : tipo;
        const datos = app()?.formState?.[clave] || {};
        const escritos = Object.values(datos).filter(v => v && String(v).trim()).length;
        // Referencia aproximada de campos por documento
        const total = { patrol: 24, pmcs: 30, guardmount: 12 }[tipo] || 20;
        return Math.min(1, escritos / total);
    }

    const ICONOS = {
        patrol: '<rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
        pmcs: '<path d="M5 17h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5z"></path><circle cx="7.5" cy="17" r="1.6"></circle><circle cx="16.5" cy="17" r="1.6"></circle>',
        guardmount: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>'
    };

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

        const hoy = new Date();
        const dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const meses = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

        let html = '';

        // --- Barra de estado del turno ---
        const enTurno = !!prog;
        html += `
            <div class="hs-bar">
                <span class="hs-live${enTurno ? ' on' : ''}"></span>
                <b class="hs-bar-shift">${turno && turno.rango ? `${turno.etiqueta} (${turno.rango})` : 'No shift'}</b>
                <span class="hs-bar-sep"></span>
                <span class="hs-bar-state">${enTurno ? "You're on shift" : (turno?.clave === 'off' ? 'Off duty' : 'Off shift')}</span>
                <button type="button" class="hs-schedule" data-cal>
                    VIEW SCHEDULE
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </button>
            </div>`;

        // --- Tarjeta principal ---
        const inicio = proximoInicio(turno);
        const falta = inicio ? cuentaAtras(inicio) : null;

        let bloqueInferior;
        if (enTurno) {
            bloqueInferior = `
                <span class="hs-label">CURRENT SHIFT</span>
                <div class="hs-hero-row">
                    <div class="hs-hero-cell">
                        <span>${turno.rango}</span>
                        <b>${prog.texto.replace(' left', '')}</b>
                    </div>
                    <div class="hs-hero-cell accent">
                        <span>Shift progress</span>
                        <b>${Math.round(prog.fraccion * 100)}%</b>
                    </div>
                </div>
                <div class="hs-bar-track"><i style="width:${(prog.fraccion * 100).toFixed(1)}%"></i></div>`;
        } else {
            const esHoy = inicio && inicio.toDateString() === hoy.toDateString();
            const dia = !inicio ? '--'
                : (esHoy ? 'TODAY'
                   : `${dias[inicio.getDay()].toUpperCase()} ${meses[inicio.getMonth()].slice(0, 3).toUpperCase()} ${inicio.getDate()}`);
            bloqueInferior = `
                <span class="hs-label">NEXT ${turno?.etiqueta?.toUpperCase() || 'SHIFT'}</span>
                <div class="hs-hero-row">
                    <div class="hs-hero-cell">
                        <span>${dia}</span>
                        <b>${turno?.rango || '--'}</b>
                    </div>
                    <div class="hs-hero-cell accent">
                        <span>Time until shift</span>
                        <b>${falta || '--'}</b>
                    </div>
                </div>`;
        }

        html += `
            <section class="hs-hero">
                <div class="hs-hero-photo" aria-hidden="true"></div>
                <div class="hs-hero-head">
                    <span class="hs-eyebrow">${dias[hoy.getDay()].toUpperCase()}</span>
                    <b class="hs-date">${meses[hoy.getMonth()]} ${hoy.getDate()}, ${hoy.getFullYear()}</b>
                </div>
                <div class="hs-hero-foot">${bloqueInferior}</div>
                <button type="button" class="hs-hero-go" data-cal aria-label="Open calendar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </section>`;

        // --- Borrador sin terminar ---
        if (borrador) {
            html += `
                <button type="button" class="hs-resume" data-resume="${borrador.tab}">
                    <span class="hs-warn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                            <line x1="12" y1="7" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </span>
                    <span class="hs-resume-text">
                        <b>${borrador.nombre} unfinished</b>
                        <em>${borrador.campos} field${borrador.campos === 1 ? '' : 's'} filled &middot; Tap to continue</em>
                    </span>
                    <svg class="hs-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <path d="M9 18l6-6-6-6"></path>
                    </svg>
                </button>`;
        }

        // --- Documentos del turno ---
        const fichas = DOCUMENTOS.map(d => {
            const hecho = hechos.find(r => r.type === d.tipo);
            const frac = hecho ? 1 : avanceDe(d.tipo);
            return `
                <button type="button" class="hs-doc${hecho ? ' done' : ''}" data-doc="${d.tab}">
                    <span class="hs-doc-ic ${d.tipo}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICONOS[d.tipo] || ''}</svg>
                    </span>
                    <span class="hs-doc-txt">
                        <b>${d.nombre}</b>
                        <em>${hecho ? (hecho.displayTime || 'Filed') : 'Pending'}</em>
                    </span>
                    ${anillo(frac, d.tipo + (hecho ? ' full' : ''))}
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
        caja.querySelectorAll('[data-cal]').forEach(b => {
            b.addEventListener('click', () => app().openTab('calendar'));
        });
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        // La tarjeta de estado sustituye a la tarjeta azul de turno, que solo
        // repetia el dia y la fecha ya visibles en el chip de arriba y dejaba
        // hueco muerto. Se oculta en vez de borrarla porque updateDateDisplay
        // sigue escribiendo en sus nodos.
        const chip = document.querySelector('.shift-badge-container');
        if (chip) chip.hidden = true;

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

    window.PoliceToolsHome = {
        render, turnoDeHoy, turnoDeFecha, diaDeTrabajo, turnoEnCurso,
        progresoTurno, HORARIOS, PANAMA, HORAS_OVERTIME
    };
})();
