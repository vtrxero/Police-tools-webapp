/**
 * MI INFORMACION - Police Tools
 *
 * Un boton de Prefill fijo en Patrol Log, PMCS y Guard Mount.
 *
 * El oficial guarda una vez lo que no cambia —su nombre, su MID, la
 * patrulla, el vehiculo, el supervisor de turno— y a partir de ahi cada
 * parte del dia arranca con todo eso puesto. Antes solo existia "usar los
 * datos del turno anterior", que aparecia sin pedirlo, solo si el
 * formulario estaba casi vacio, y desaparecia despues de un uso: no servia
 * para lo que hace falta todos los dias.
 *
 * QUE SE GUARDA
 *
 * Lo que haya escrito en el formulario cuando se pulsa "Save my info",
 * menos los campos que son del dia y no de la persona. Guardar por
 * exclusion y no por una lista de campos permitidos es a proposito: la
 * lista habria que ampliarla cada vez que un formulario gana un campo, y un
 * campo olvidado no da error, simplemente no se rellena nunca y nadie sabe
 * por que.
 *
 * QUE NO SE GUARDA NUNCA
 *
 * Fechas, millajes, firmas, las casillas de inspeccion del PMCS y sus
 * observaciones, los conteos de citaciones y los campos de texto libre.
 *
 * Las casillas del PMCS y las firmas quedan fuera por algo mas que comodidad:
 * arrastrar el "before/after" de ayer seria dar por inspeccionado un vehiculo
 * que hoy nadie ha mirado, y arrastrar una firma seria firmar un documento
 * sin haberlo leido. Eso no es rellenar, es falsear un parte.
 */

(function () {
    'use strict';

    const CLAVE = 'policeTools_prefill';

    const VISTAS = {
        'patrol-log-view': 'patrol',
        'pmcs-view': 'pmcs',
        'guard-mount-view': 'guardmount'
    };

    const app = () => window.app;

    /** Campos del dia, no de la persona: nunca se guardan ni se rellenan. */
    const DEL_DIA = [
        /^date$/,
        /mileage|odometer/,
        /_sign$/, /_signature$/,          // firmar por adelantado, no
        /_before$/, /_after$/,            // inspeccion del PMCS de hoy
        /_remark$/,
        /^remarks$/, /^comments$/,
        /^citations_/, /^dd_fm_/, /^da_fm_/, /^verbal_warning$/,
        /^fuel/, /^oil$/, /^other_maintenance$/,
        /^trainer_subject$/,
        /^additional_operators$/
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

    /** Los campos utiles del formulario, ya filtrados. */
    function camposDe(form) {
        return [...form.querySelectorAll('input, select, textarea')].filter(el => {
            const n = el.name;
            return n && el.type !== 'hidden' && !el.readOnly && !el.disabled && !esDelDia(n);
        });
    }

    function tieneValor(el) {
        if (el.type === 'checkbox' || el.type === 'radio') return el.checked;
        return String(el.value || '').trim() !== '';
    }

    // ============================================
    // GUARDAR Y RELLENAR
    // ============================================

    function recoger(form) {
        const datos = {};
        camposDe(form).forEach(el => {
            if (el.type === 'checkbox') {
                if (el.checked) datos[el.name] = true;
            } else if (el.type === 'radio') {
                // Un grupo de radios comparte nombre: vale el que este marcado
                if (el.checked) datos[el.name] = el.value;
            } else if (tieneValor(el)) {
                datos[el.name] = el.value;
            }
        });
        return datos;
    }

    /**
     * Rellena solo lo que este vacio.
     *
     * Pisar lo ya escrito seria peor que no rellenar: el oficial que cambio
     * de patrulla hoy y le da al boton sin querer perderia el dato correcto
     * sin enterarse.
     */
    function aplicar(form, datos) {
        let puestos = 0;

        for (const [nombre, valor] of Object.entries(datos || {})) {
            const grupo = [...form.querySelectorAll(`[name="${CSS.escape(nombre)}"]`)];
            if (!grupo.length) continue;

            const primero = grupo[0];

            if (primero.type === 'radio') {
                if (grupo.some(r => r.checked)) continue;
                const elegido = grupo.find(r => r.value === valor);
                if (!elegido) continue;
                elegido.checked = true;
                elegido.dispatchEvent(new Event('change', { bubbles: true }));
                puestos++;
                continue;
            }

            if (primero.type === 'checkbox') {
                if (primero.checked) continue;
                primero.checked = !!valor;
                primero.dispatchEvent(new Event('change', { bubbles: true }));
                puestos++;
                continue;
            }

            if (tieneValor(primero)) continue;
            primero.value = valor;
            primero.dispatchEvent(new Event('input', { bubbles: true }));
            primero.dispatchEvent(new Event('change', { bubbles: true }));
            puestos++;
        }

        return puestos;
    }

    /**
     * Sin nada guardado todavia, se tira del ultimo parte del mismo tipo.
     *
     * Asi el boton sirve desde el primer dia, sin tener que acordarse de
     * guardar nada antes.
     */
    function respaldoDelUltimo(tipo) {
        const anterior = (app()?.dailyReports || []).find(r => r.type === tipo);
        if (!anterior?.formData) return null;

        const datos = {};
        for (const [k, v] of Object.entries(anterior.formData)) {
            if (esDelDia(k)) continue;
            if (v === '' || v === null || v === undefined || v === false) continue;
            datos[k] = v;
        }
        return Object.keys(datos).length ? datos : null;
    }

    // ============================================
    // LA BARRA
    // ============================================

    function montar(vista) {
        const tipo = VISTAS[vista.id];
        if (!tipo) return;

        const form = vista.querySelector('form');
        if (!form) return;

        let barra = form.querySelector('.pf-bar');
        if (!barra) {
            barra = document.createElement('div');
            barra.className = 'pf-bar';
            barra.innerHTML = `
                <button type="button" class="pf-btn pf-fill">
                    <span class="pf-ico">▤</span>
                    <span class="pf-txt"><b>Prefill</b><em></em></span>
                </button>
                <button type="button" class="pf-btn pf-save">
                    <span class="pf-ico">☑</span>
                    <span class="pf-txt"><b>Save my info</b><em>from this form</em></span>
                </button>
            `;
            form.insertBefore(barra, form.firstChild);

            barra.querySelector('.pf-fill').addEventListener('click', () => rellenar(form, tipo, barra));
            barra.querySelector('.pf-save').addEventListener('click', () => guardar(form, tipo, barra));
        }

        actualizar(barra, tipo);
    }

    function actualizar(barra, tipo) {
        const guardado = leerTodo()[tipo];
        const n = guardado ? Object.keys(guardado.datos || {}).length : 0;
        const em = barra.querySelector('.pf-fill em');

        if (n) {
            em.textContent = `${n} saved field${n === 1 ? '' : 's'}`;
        } else {
            em.textContent = respaldoDelUltimo(tipo) ? 'from your last report' : 'nothing saved yet';
        }
    }

    function guardar(form, tipo, barra) {
        const datos = recoger(form);
        const n = Object.keys(datos).length;

        if (!n) {
            app()?.showToast('Fill the form first, then save it as your info', 'warning');
            return;
        }

        const todo = leerTodo();
        todo[tipo] = { datos, guardado: new Date().toISOString() };
        guardarTodo(todo);

        actualizar(barra, tipo);
        app()?.showToast(`${n} field(s) saved as your info`, 'success');
        window.PoliceToolsMobile?.haptics.success();
    }

    function rellenar(form, tipo, barra) {
        const guardado = leerTodo()[tipo]?.datos;
        const datos = (guardado && Object.keys(guardado).length)
            ? guardado
            : respaldoDelUltimo(tipo);

        if (!datos) {
            app()?.showToast('Nothing saved yet — fill the form and tap "Save my info"', 'warning');
            return;
        }

        const puestos = aplicar(form, datos);

        if (!puestos) {
            app()?.showToast('Everything was already filled in', 'info');
            return;
        }

        app()?.showToast(`${puestos} field(s) filled`, 'success');
        window.PoliceToolsMobile?.haptics.success();
        actualizar(barra, tipo);
    }

    // ============================================
    // INICIO
    // ============================================

    function refrescar() {
        const vista = document.querySelector('.tab-view.active');
        if (vista) montar(vista);
    }

    function init() {
        // Las vistas se muestran quitando y poniendo una clase, sin evento
        // propio, asi que se mira cuando cambia y al abrir cualquier pestaña.
        document.addEventListener('click', () => setTimeout(refrescar, 120));
        document.addEventListener('reportschanged', refrescar);
        setTimeout(refrescar, 1200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PoliceToolsPrefill = { refrescar, recoger, aplicar, esDelDia, CLAVE };
})();
