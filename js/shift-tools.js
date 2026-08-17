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

        // El Patrol Log solo tiene DAYS / SWINGS / MID. Los dos turnos de 12
        // horas de Panama caen en el que mas se le parece: el de dia en DAYS
        // y el de noche en MID.
        const casilla = {
            days: 'shift_days', swings: 'shift_swings', mid: 'shift_mid',
            day: 'shift_days', night: 'shift_mid'
        }[turno.clave];
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
    // 3. ACTIVIDADES DE LA MISION
    // ============================================
    /**
     * Las actividades del turno, tal y como se registran en Ft. Buchanan.
     * La lista es fija: son las categorias que se usan, no sugerencias.
     */
    const ACTIVIDADES = [
        'Guard mount',
        'Preventive patrol',
        'Perimeter road check',
        'Housing patrol',
        'Walking patrol',
        'Out of service',
        'Police response',
        'Open post activity'
    ];

    /** ¿Con que actividad empieza este texto? */
    function actividadDe(texto) {
        const t = String(texto || '').trimStart().toLowerCase();
        // La mas larga primero, para que "Perimeter road check" gane a una
        // hipotetica "Perimeter" si algun dia se añade
        return [...ACTIVIDADES]
            .sort((a, b) => b.length - a.length)
            .find(a => t.startsWith(a.toLowerCase())) || null;
    }

    /**
     * Escribe la actividad elegida al principio de la descripcion.
     *
     * La descripcion es el campo que va al PDF, y ahi cabe la actividad mas
     * el detalle ("Preventive patrol — Sector 2, nada que reportar"). Elegir
     * otra actividad sustituye solo la primera parte y respeta lo escrito a
     * mano; sin eso, cambiar de idea dejaba las dos pegadas.
     */
    function aplicarActividad(campo, actividad) {
        if (!campo) return;

        const texto = campo.value;
        const anterior = actividadDe(texto);

        if (!actividad) {
            // Volver a "Select activity…" quita la actividad y deja el detalle
            campo.value = anterior
                ? texto.trimStart().slice(anterior.length).replace(/^\s*[—-]\s*/, '')
                : texto;
        } else if (anterior) {
            const resto = texto.trimStart().slice(anterior.length);
            campo.value = actividad + resto;
        } else {
            const resto = texto.trim();
            campo.value = resto ? `${actividad} — ${resto}` : actividad;
        }

        campo.dispatchEvent(new Event('input', { bubbles: true }));
        campo.dispatchEvent(new Event('change', { bubbles: true }));
        window.PoliceToolsMobile?.haptics.tap();
    }

    function montarActividades(vista) {
        const select = vista.querySelector('#mission-activity');
        const campo = vista.querySelector('#mission-description');
        if (!select || !campo || select.dataset.stListo) return;

        select.dataset.stListo = '1';

        select.addEventListener('change', () => aplicarActividad(campo, select.value));

        // Al escribir a mano o al editar una mision guardada, el desplegable
        // se pone al dia solo: si no, quedaria enseñando otra cosa.
        const sincronizar = () => {
            const a = actividadDe(campo.value);
            if (select.value !== (a || '')) select.value = a || '';
        };
        campo.addEventListener('input', sincronizar);
        campo.addEventListener('change', sincronizar);
        sincronizar();
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
            montarActividades(vista);
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

        // Al guardar la mision el formulario se vacia, asi que el desplegable
        // vuelve a "Select activity…" en vez de quedarse con la anterior
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#save-mission-entry')) return;
            setTimeout(() => {
                const select = document.getElementById('mission-activity');
                const campo = document.getElementById('mission-description');
                if (select && campo) select.value = actividadDe(campo.value) || '';
            }, 60);
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

    window.PoliceToolsShiftTools = {
        ACTIVIDADES, actividadDe, datosDelTurno, anteriorConMillaje, pmcsDeHoy, refrescar
    };
})();
