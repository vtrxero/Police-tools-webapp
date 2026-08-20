/**
 * EMPEZAR EL PARTE - Police Tools
 *
 * Una sola tarjeta encima del formulario vacio: "Start today's report", con
 * lo que la app ya sabe listado debajo y un boton que lo pone todo.
 *
 * POR QUE UNA Y NO TRES
 *
 * Antes habia tres cosas peleandose por ese hueco: dos botones —Prefill y
 * Save my info—, la tarjeta "Use data from last shift" que salia sola, y la
 * del turno de hoy. Tres maneras distintas de hacer casi lo mismo, cada una
 * con sus reglas de cuando aparece y cuando no. El oficial que abre el parte
 * a las cinco y media de la manana no tiene que elegir entre tres botones:
 * tiene que empezar a escribir.
 *
 * Ahora hay una tarjeta, un boton, y dice de antemano que va a poner.
 *
 * NADA QUE GUARDAR A MANO
 *
 * "Save my info" tambien se fue. Obligaba a acordarse de pulsarlo, y quien no
 * lo pulsara no tenia prefill nunca —sin ninguna pista de por que—. Los datos
 * que se repiten se aprenden solos de cada documento que se archiva: nombre,
 * MID, patrulla, vehiculo, unidad, supervisor. Es lo mismo que se escribio
 * ayer, asi que no hay nada que decidir.
 *
 * LO QUE NO SE APRENDE NUNCA
 *
 * Fechas, millajes, firmas, las casillas de inspeccion del PMCS y sus
 * observaciones, los conteos y el texto libre. Las casillas y las firmas no
 * es comodidad: arrastrar el before/after de ayer seria dar por inspeccionado
 * un vehiculo que hoy nadie ha mirado, y arrastrar una firma seria firmar sin
 * leer. Eso no es rellenar un parte, es falsearlo.
 */

(function () {
    'use strict';

    const CLAVE = 'policeTools_prefill';

    const VISTAS = {
        'patrol-log-view': 'patrol',
        'pmcs-view': 'pmcs',
        'guard-mount-view': 'guardmount'
    };

    const FORMULARIO = {
        patrol: 'patrol-form',
        pmcs: 'pmcs-form',
        guardmount: 'guardmount-form'
    };

    // Como se llama cada campo cuando se lo enseña al oficial. Sin esto la
    // tarjeta diria "police_name", que es el nombre de la casilla del PDF.
    const ROTULOS = {
        police_name: 'Officer', mid: 'MID', patrol: 'Patrol', vehicle: 'Vehicle',
        radio_no: 'Radio', shift_days: 'Days', shift_swings: 'Swings', shift_mid: 'Mid',
        unit: 'Unit', vehicle_number: 'Vehicle', vehicle_type: 'Type', shift: 'Shift',
        operator_name: 'Operator', supervisor_name: 'Supervisor',
        supervisor_rank: 'Rank', desk_sergeant_name: 'Desk sergeant',
        inspection_location: 'Location', hours: 'Hours',
        from_shift_supervisor: 'From', to_desk_officer: 'To',
        guardmount_conducted: 'Conducted by', trainer: 'Trainer'
    };

    const app = () => window.app;
    const turnos = () => window.PoliceToolsShiftTools;

    /** Campos del dia, no de la persona: no se aprenden ni se rellenan. */
    const DEL_DIA = [
        /^date$/,
        /mileage|odometer/,
        /_sign$/, /_signature$/,
        /_before$/, /_after$/,
        /_remark$/,
        /^remarks$/, /^comments$/,
        /^citations_/, /^dd_fm_/, /^da_fm_/, /^verbal_warning$/,
        /^fuel/, /^oil$/, /^other_maintenance$/,
        /^trainer_subject$/, /^additional_operators$/
    ];

    function esDelDia(nombre) {
        return DEL_DIA.some(re => re.test(nombre));
    }

    function leerTodo() {
        try { return JSON.parse(localStorage.getItem(CLAVE) || '{}'); }
        catch (e) { return {}; }
    }

    function guardarTodo(datos) {
        try { localStorage.setItem(CLAVE, JSON.stringify(datos)); }
        catch (e) { console.warn('[prefill] no se pudo guardar:', e.message); }
    }

    // ============================================
    // APRENDER
    // ============================================

    /**
     * Se llama al archivar un documento. Lo que se acaba de escribir y no es
     * del dia pasa a ser lo que se propone mañana.
     */
    function recordar(tipo, payload) {
        if (!FORMULARIO[tipo] || !payload) return 0;

        const datos = {};
        for (const [k, v] of Object.entries(payload)) {
            if (esDelDia(k)) continue;
            if (v === '' || v === null || v === undefined || v === false) continue;
            if (typeof v === 'object') continue;   // misiones, personal: no son datos fijos
            datos[k] = v;
        }

        const n = Object.keys(datos).length;
        if (!n) return 0;

        const todo = leerTodo();
        todo[tipo] = { datos, guardado: new Date().toISOString() };
        guardarTodo(todo);
        return n;
    }

    /** Lo que se propondra: lo aprendido, o el ultimo documento si no hay nada. */
    function loQueSabemos(tipo) {
        const guardado = leerTodo()[tipo]?.datos;
        if (guardado && Object.keys(guardado).length) return guardado;

        const anterior = (app()?.dailyReports || []).find(r => r.type === tipo);
        if (!anterior?.formData) return null;

        const datos = {};
        for (const [k, v] of Object.entries(anterior.formData)) {
            if (esDelDia(k)) continue;
            if (v === '' || v === null || v === undefined || v === false) continue;
            if (typeof v === 'object') continue;
            datos[k] = v;
        }
        return Object.keys(datos).length ? datos : null;
    }

    // ============================================
    // RELLENAR
    // ============================================

    function vacio(el) {
        if (!el) return false;
        if (el.type === 'checkbox' || el.type === 'radio') return !el.checked;
        return String(el.value || '').trim() === '';
    }

    /** Solo lo que este vacio: pisar lo escrito seria peor que no rellenar. */
    function poner(form, nombre, valor) {
        const grupo = [...form.querySelectorAll(`[name="${CSS.escape(nombre)}"]`)];
        if (!grupo.length) return false;

        const primero = grupo[0];

        if (primero.type === 'radio') {
            if (grupo.some(r => r.checked)) return false;
            const elegido = grupo.find(r => r.value === valor);
            if (!elegido) return false;
            elegido.checked = true;
            elegido.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
        }

        if (primero.type === 'checkbox') {
            if (primero.checked) return false;
            primero.checked = !!valor;
            primero.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
        }

        if (!vacio(primero)) return false;
        primero.value = valor;
        primero.dispatchEvent(new Event('input', { bubbles: true }));
        primero.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }

    // ============================================
    // QUE SE VA A PONER
    // ============================================

    /**
     * La lista completa: los datos que se repiten, mas la fecha y el turno de
     * hoy si el formulario los tiene.
     *
     * Va todo junto a proposito. Antes la fecha venia de una tarjeta y el
     * nombre de otra, asi que empezar el parte costaba dos botones en dos
     * sitios distintos, y con dos toasts.
     */
    function propuesta(tipo, form) {
        const campos = [];

        const sabido = loQueSabemos(tipo) || {};
        for (const [nombre, valor] of Object.entries(sabido)) {
            const el = form.querySelector(`[name="${CSS.escape(nombre)}"]`);
            if (!el || !vacio(el)) continue;
            campos.push({ nombre, valor, rotulo: ROTULOS[nombre] || nombre });
        }

        // Fecha y casilla del turno, del calendario
        if (tipo === 'patrol') {
            const t = turnos()?.datosDelTurno?.();
            if (t) {
                if (vacio(form.querySelector('[name="date"]'))) {
                    campos.push({ nombre: 'date', valor: t.fecha, rotulo: 'Date' });
                }
                const casilla = form.querySelector(`[name="${t.casilla}"]`);
                if (casilla && vacio(casilla)) {
                    campos.push({ nombre: t.casilla, valor: true, rotulo: t.etiqueta });
                }
            }
        } else if (vacio(form.querySelector('[name="date"]'))) {
            const dia = window.PoliceToolsHome?.diaDeTrabajo?.();
            if (dia) campos.push({ nombre: 'date', valor: dia, rotulo: 'Date' });
        }

        return campos;
    }

    /** "SGT Morales · S-1 · 85Y · Aug 20" — para verlo antes de pulsar. */
    function resumen(campos) {
        return campos
            .map(c => (c.valor === true ? c.rotulo : String(c.valor)))
            .slice(0, 6)
            .join(' · ');
    }

    // ============================================
    // LA TARJETA
    // ============================================

    // Descartada a mano: no vuelve mientras no se cambie de formulario
    const descartadas = {};

    function montar(vista) {
        const tipo = VISTAS[vista.id];
        if (!tipo) return;

        const form = document.getElementById(FORMULARIO[tipo]);
        if (!form) return;

        const anterior = form.querySelector('.pf-card');
        const campos = propuesta(tipo, form);

        // Sin nada que aportar, la tarjeta no pinta nada en la pantalla
        if (!campos.length || descartadas[tipo]) {
            if (anterior) anterior.remove();
            return;
        }

        if (anterior) {
            anterior.querySelector('.pf-lista').textContent = resumen(campos);
            anterior.dataset.n = campos.length;
            return;
        }

        const caja = document.createElement('div');
        caja.className = 'pf-card';
        caja.dataset.n = campos.length;
        caja.innerHTML = `
            <button type="button" class="pf-x" aria-label="Dismiss">×</button>
            <div class="pf-cab">
                <span class="pf-ico">▤</span>
                <b>Start today's report</b>
            </div>
            <p class="pf-lista">${resumen(campos)}</p>
            <button type="button" class="pf-go">Fill it in</button>
        `;

        caja.querySelector('.pf-go').addEventListener('click', () => {
            const lista = propuesta(tipo, form);
            let n = 0;
            lista.forEach(c => { if (poner(form, c.nombre, c.valor)) n++; });

            caja.remove();
            app()?.showToast(`${n} field(s) filled in`, 'success');
            window.PoliceToolsMobile?.haptics.success();
        });

        caja.querySelector('.pf-x').addEventListener('click', () => {
            descartadas[tipo] = true;
            caja.remove();
        });

        form.insertBefore(caja, form.firstChild);
    }

    // ============================================
    // INICIO
    // ============================================

    function refrescar() {
        const vista = document.querySelector('.tab-view.active');
        if (vista) montar(vista);
    }

    /** Tras "Create new form": la tarjeta vuelve, que es justo cuando sirve. */
    function alEmpezarDeNuevo(tipo) {
        descartadas[tipo] = false;
        setTimeout(refrescar, 60);
    }

    function init() {
        document.addEventListener('click', () => setTimeout(refrescar, 150));
        document.addEventListener('reportschanged', () => setTimeout(refrescar, 200));
        setTimeout(refrescar, 1200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PoliceToolsPrefill = {
        refrescar, recordar, loQueSabemos, propuesta, alEmpezarDeNuevo, esDelDia, CLAVE
    };
})();
