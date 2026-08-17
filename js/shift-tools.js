/**
 * HERRAMIENTAS DE TURNO - Police Tools
 *
 * Cuatro cosas que se hacian a mano cada turno y que la app ya sabia:
 *
 *   1. La cabecera del Patrol Log (fecha, turno, horario) se teclea entera
 *      aunque el calendario ya diga que turno toca hoy.
 *   2. El Mid Shift cruza medianoche, asi que queda partido en dos Patrol
 *      Logs y el millaje de cierre del primero se copia a mano al segundo.
 *   3. El PMCS es el documento que mas se olvida y el que el supervisor pide.
 *   4. Las mismas descripciones de mision se dictan turno tras turno.
 */

(function () {
    'use strict';

    const app = () => window.app;
    const home = () => window.PoliceToolsHome;

    const CLAVE_PLANTILLAS = 'policeTools_plantillasMision';
    const CLAVE_AVISO_PMCS = 'policeTools_avisoPMCS';

    // ============================================
    // UTILIDADES
    // ============================================
    function hoyISO() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function relleno(el) {
        if (!el) return false;
        if (el.type === 'checkbox' || el.type === 'radio') return el.checked;
        return String(el.value || '').trim() !== '';
    }

    function poner(form, nombre, valor) {
        const el = form.querySelector(`[name="${nombre}"]`);
        if (!el || relleno(el)) return false;
        el.value = valor;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }

    function marcar(form, nombre) {
        const el = form.querySelector(`[name="${nombre}"]`);
        if (!el || el.checked) return false;
        el.checked = true;
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }

    /** Documentos guardados de un tipo, del mas nuevo al mas viejo. */
    function reportes(tipo) {
        return (app()?.dailyReports || []).filter(r => r.type === tipo);
    }

    function fechaDe(reporte) {
        return (reporte.documentDate || reporte.date || '').split('T')[0];
    }

    // ============================================
    // 1. CABECERA DESDE EL CALENDARIO
    // ============================================
    /**
     * Lo que se puede deducir del turno de hoy: la fecha y cual de los tres
     * turnos toca. El horario no se rellena porque el Patrol Log no tiene
     * campos de hora de turno, solo las casillas DAYS / SWINGS / MID.
     */
    function datosDelTurno() {
        const turno = home()?.turnoDeHoy?.();
        if (!turno || turno.clave === 'off') return null;

        const casilla = { days: 'shift_days', swings: 'shift_swings', mid: 'shift_mid' }[turno.clave];
        if (!casilla) return null;

        return { fecha: hoyISO(), casilla, etiqueta: turno.etiqueta, rango: turno.rango };
    }

    function montarTurnoDeHoy(vista) {
        const form = vista.querySelector('#patrol-form');
        if (!form || form.querySelector('.st-fill[data-st="turno"]')) return;

        const datos = datosDelTurno();
        if (!datos) return;

        // Si ya estan puestos los dos, no hay nada que ofrecer
        const yaFecha = relleno(form.querySelector('[name="date"]'));
        const yaCasilla = form.querySelector(`[name="${datos.casilla}"]`)?.checked;
        if (yaFecha && yaCasilla) return;

        const boton = tarjeta('turno',
            `Today: ${datos.etiqueta}`,
            `${datos.rango} · ${datos.fecha}`,
            'Fill');

        boton.addEventListener('click', () => {
            let n = 0;
            if (poner(form, 'date', datos.fecha)) n++;
            if (marcar(form, datos.casilla)) n++;
            boton.remove();
            aviso(`${n} field(s) filled from the schedule`);
        });

        form.insertBefore(boton, form.firstChild);
    }

    // ============================================
    // 2. CONTINUAR DEL TURNO ANTERIOR
    // ============================================
    /**
     * El Patrol Log mas reciente que ya tenga millaje de cierre. Se busca por
     * fecha del documento y no por orden de guardado: un log corregido dias
     * despues no debe pasar por delante del de ayer.
     */
    function anteriorConMillaje() {
        const lista = reportes('patrol')
            .filter(r => String(r.formData?.ending_mileage || '').trim())
            .sort((a, b) => (fechaDe(b) || '').localeCompare(fechaDe(a) || ''));

        const hoy = hoyISO();
        // El del propio dia no sirve de "anterior"
        return lista.find(r => fechaDe(r) && fechaDe(r) < hoy) || null;
    }

    function montarContinuacion(vista) {
        const form = vista.querySelector('#patrol-form');
        if (!form || form.querySelector('.st-fill[data-st="seguir"]')) return;

        const previo = anteriorConMillaje();
        if (!previo) return;

        const cierre = String(previo.formData.ending_mileage).trim();
        if (relleno(form.querySelector('[name="beginning_mileage"]'))) return;

        const vehiculo = previo.formData.vehicle || '';
        const radio = previo.formData.radio_no || '';
        const extras = [vehiculo && `veh ${vehiculo}`, radio && `radio ${radio}`].filter(Boolean).join(' · ');

        const boton = tarjeta('seguir',
            `Continue from ${fechaDe(previo)}`,
            `Closing mileage ${cierre}${extras ? ' · ' + extras : ''}`,
            'Carry');

        boton.addEventListener('click', () => {
            let n = 0;
            if (poner(form, 'beginning_mileage', cierre)) n++;
            if (vehiculo && poner(form, 'vehicle', vehiculo)) n++;
            if (radio && poner(form, 'radio_no', radio)) n++;
            boton.remove();
            aviso(`Carried over from ${fechaDe(previo)} (${n} field${n === 1 ? '' : 's'})`);
        });

        form.insertBefore(boton, form.firstChild);
    }

    // ============================================
    // 4. AVISO DE PMCS PENDIENTE
    // ============================================
    /** Ya hay PMCS de hoy? */
    function pmcsDeHoy() {
        const hoy = hoyISO();
        return reportes('pmcs').some(r => fechaDe(r) === hoy);
    }

    /**
     * Avisa una sola vez al dia, y solo estando de turno: recordar el PMCS a
     * quien esta libre es ruido, y repetirlo cada vez que se abre la app hace
     * que se ignore.
     */
    function avisarPMCS() {
        const hoy = hoyISO();
        let ya = '';
        try { ya = localStorage.getItem(CLAVE_AVISO_PMCS) || ''; } catch (e) {}
        if (ya === hoy) return;

        const turno = home()?.turnoDeHoy?.();
        if (!turno || turno.clave === 'off') return;

        // Solo con el turno empezado: antes de entrar no hay nada que inspeccionar
        const progreso = home()?.progresoTurno?.(turno);
        if (progreso === null || progreso === undefined) return;

        if (pmcsDeHoy()) return;

        app()?.addNotification?.(
            'warning',
            'PMCS not done today',
            `You are on ${turno.etiqueta} and there is no vehicle inspection for ${hoy}.`
        );

        try { localStorage.setItem(CLAVE_AVISO_PMCS, hoy); } catch (e) {}
    }

    // ============================================
    // 3. PLANTILLAS DE MISION
    // ============================================
    const PLANTILLAS_BASE = [
        'Guard mount',
        'Routine patrol of assigned sector',
        'Traffic control point',
        'Escort',
        'Building checks',
        'Response to call for service',
        'Break',
        'Vehicle refuel',
        'Report writing',
        'Turned in shift paperwork'
    ];

    const plantillas = {
        todas() {
            let propias = [];
            try { propias = JSON.parse(localStorage.getItem(CLAVE_PLANTILLAS) || '[]'); } catch (e) {}
            // Las propias primero: son las que el oficial ha usado de verdad
            return [...propias, ...PLANTILLAS_BASE.filter(p => !propias.includes(p))];
        },

        /** Guarda una descripcion usada, para que suba a la lista. */
        recordar(texto) {
            const t = String(texto || '').trim();
            if (t.length < 4 || t.length > 60) return;
            if (PLANTILLAS_BASE.includes(t)) return;

            let propias = [];
            try { propias = JSON.parse(localStorage.getItem(CLAVE_PLANTILLAS) || '[]'); } catch (e) {}
            propias = [t, ...propias.filter(p => p !== t)].slice(0, 8);
            try { localStorage.setItem(CLAVE_PLANTILLAS, JSON.stringify(propias)); } catch (e) {}
        }
    };

    /**
     * Fila de atajos bajo el campo de descripcion de la mision.
     *
     * El campo del formulario es #mission-description. La clase
     * .mission-description es otra cosa: la llevan las filas de misiones ya
     * guardadas, que se generan al vuelo.
     */
    function montarPlantillas(vista) {
        const campo = vista.querySelector('#mission-description');
        if (!campo) return;

        const contenedor = campo.closest('.entry-field') || campo.parentElement;
        if (!contenedor || contenedor.querySelector('.st-chips')) return;

        const fila = document.createElement('div');
        fila.className = 'st-chips';
        fila.setAttribute('aria-label', 'Mission templates');

        for (const texto of plantillas.todas().slice(0, 8)) {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'st-chip';
            chip.textContent = texto;
            chip.addEventListener('click', () => {
                // Se añade al final en vez de reemplazar: una mision puede
                // ser "Routine patrol" mas un detalle escrito a mano.
                const actual = campo.value.trim();
                campo.value = actual ? `${actual}. ${texto}` : texto;
                campo.dispatchEvent(new Event('input', { bubbles: true }));
                campo.focus();
                window.PoliceToolsMobile?.haptics.tap();
            });
            fila.appendChild(chip);
        }

        contenedor.appendChild(fila);
    }

    // ============================================
    // PIEZAS COMUNES
    // ============================================
    function tarjeta(clave, titulo, detalle, accion) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'st-fill';
        b.dataset.st = clave;
        b.innerHTML = `
            <span class="st-fill-text">
                <b></b>
                <em></em>
            </span>
            <span class="st-fill-go"></span>
        `;
        b.querySelector('b').textContent = titulo;
        b.querySelector('em').textContent = detalle;
        b.querySelector('.st-fill-go').textContent = accion;
        return b;
    }

    function aviso(texto) {
        app()?.showToast(texto, 'success');
        window.PoliceToolsMobile?.haptics.success();
    }

    // ============================================
    // INICIO
    // ============================================
    function refrescar() {
        const vista = document.querySelector('.tab-view.active');
        if (!vista) return;

        if (vista.id === 'patrol-log-view') {
            // Las dos se insertan al principio del formulario, asi que la
            // ultima en montarse queda arriba. El turno de hoy va primero
            // porque es el dato de este documento; continuar del anterior es
            // secundario.
            montarContinuacion(vista);
            montarTurnoDeHoy(vista);
            montarPlantillas(vista);
        }
    }

    function init() {
        refrescar();

        // Las vistas se muestran sin recargar la pagina, asi que hay que
        // reaccionar al cambio de pestaña. Igual que form-progress.js, el
        // observador se limita a las vistas para no dispararse solo.
        const obs = new MutationObserver(() => requestAnimationFrame(refrescar));
        document.querySelectorAll('.tab-view').forEach(v =>
            obs.observe(v, { attributes: true, attributeFilter: ['class'] }));

        // Las filas de mision se crean al vuelo
        const contenedor = document.getElementById('patrol-log-view');
        if (contenedor) {
            new MutationObserver(() => requestAnimationFrame(refrescar))
                .observe(contenedor, { childList: true, subtree: true });
        }

        // Guardar la descripcion usada al guardar la mision, para que suba
        // en la lista la proxima vez
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#save-mission-entry')) return;
            const campo = document.getElementById('mission-description');
            if (campo) plantillas.recordar(campo.value);
        }, true);

        // El aviso del PMCS espera a que la app tenga los reportes cargados
        setTimeout(avisarPMCS, 4000);
        document.addEventListener('reportschanged', () => {
            // Si acaba de guardar el PMCS, que no salte despues
            if (pmcsDeHoy()) {
                try { localStorage.setItem(CLAVE_AVISO_PMCS, hoyISO()); } catch (e) {}
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
    } else {
        setTimeout(init, 300);
    }

    window.PoliceToolsShiftTools = { plantillas, datosDelTurno, anteriorConMillaje, pmcsDeHoy, refrescar };
})();
