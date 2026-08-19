/**
 * BORRADORES - Police Tools
 *
 * Lo que se escribe en un formulario se guarda solo, y sigue ahi al volver.
 *
 * Hasta ahora no habia nada de esto. El interruptor "Auto-save forms" de
 * Ajustes estaba puesto y encendido, pero no habia una sola linea detras: era
 * un interruptor de adorno. Lo escrito vivia unicamente en los campos del
 * HTML, asi que aguantaba mientras la pagina no se recargara —y en el APK se
 * recarga cada vez que Android decide reclamar memoria de una app en segundo
 * plano, o cuando se sale y se vuelve a entrar—. Un turno de trabajo escrito
 * a medias se perdia sin aviso y sin forma de recuperarlo.
 *
 * CUANDO SE GUARDA
 *
 * Medio segundo despues de dejar de escribir, y ademas de golpe cuando la app
 * pasa a segundo plano. Lo segundo es lo que salva el caso de verdad: cuando
 * Android mata la app no avisa, y lo ultimo escrito no habria llegado a
 * guardarse.
 *
 * CUANTO DURA
 *
 * Veinte horas. Un borrador es el parte de este turno, no el de la semana
 * pasada: si al abrir el formulario apareciera lo de hace tres dias seria un
 * estorbo, y en un parte oficial ademas es peligroso. Veinte y no
 * veinticuatro porque el turno de noche cruza la medianoche —de 1730 a 0630—,
 * asi que "el mismo dia natural" no serviria; y no doce, porque el turno dura
 * trece horas y hay que poder terminar el parte al salir.
 *
 * Para repetir los datos de siempre esta el boton Prefill, que es otra cosa:
 * el borrador guarda este parte, Prefill guarda quien eres.
 */

(function () {
    'use strict';

    const PREFIJO = 'policeTools_draft_';
    const CLAVE_ACTIVO = 'policeTools_autosave';
    const HORAS_VIDA = 20;
    const RETARDO = 500;

    // Los cuatro formularios, por el id de su <form>
    const FORMULARIOS = {
        'patrol-form': 'patrol',
        'pmcs-form': 'pmcs',
        'guardmount-form': 'guardmount',
        'interview-form': 'interview'
    };

    const app = () => window.app;

    /** Encendido salvo que se apague a proposito en Ajustes. */
    function activo() {
        try { return localStorage.getItem(CLAVE_ACTIVO) !== 'off'; }
        catch (e) { return true; }
    }

    function activar(si) {
        try { localStorage.setItem(CLAVE_ACTIVO, si ? 'on' : 'off'); } catch (e) {}
        if (!si) Object.values(FORMULARIOS).forEach(borrar);
    }

    function campos(form) {
        return [...form.querySelectorAll('input, select, textarea')]
            .filter(el => el.name && el.type !== 'file' && el.type !== 'hidden' && !el.disabled);
    }

    // ============================================
    // GUARDAR
    // ============================================

    function recoger(form) {
        const datos = {};
        campos(form).forEach(el => {
            if (el.type === 'checkbox') {
                if (el.checked) datos[el.name] = true;
            } else if (el.type === 'radio') {
                if (el.checked) datos[el.name] = el.value;
            } else if (String(el.value || '').trim() !== '') {
                datos[el.name] = el.value;
            }
        });
        return datos;
    }

    function guardar(tipo, form) {
        if (!activo()) return 0;

        const datos = recoger(form);
        const n = Object.keys(datos).length;

        // Un formulario vacio no deja borrador: si lo dejara, borrar el
        // formulario a mano no serviria de nada —el borrador vacio se
        // guardaria encima y al volver no habria nada que restaurar, que es
        // lo mismo, pero ocupando sitio.
        if (!n) { borrar(tipo); return 0; }

        try {
            localStorage.setItem(PREFIJO + tipo, JSON.stringify({
                guardado: new Date().toISOString(),
                datos
            }));
        } catch (e) {
            console.warn('[drafts] no se pudo guardar el borrador:', e.message);
        }
        return n;
    }

    function borrar(tipo) {
        try { localStorage.removeItem(PREFIJO + tipo); } catch (e) {}
    }

    /** Guarda los cuatro de golpe, sin esperar al retardo. */
    function guardarTodo() {
        for (const [id, tipo] of Object.entries(FORMULARIOS)) {
            const form = document.getElementById(id);
            if (form) guardar(tipo, form);
        }
    }

    // ============================================
    // RESTAURAR
    // ============================================

    function leer(tipo) {
        let crudo;
        try { crudo = localStorage.getItem(PREFIJO + tipo); } catch (e) { return null; }
        if (!crudo) return null;

        let b;
        try { b = JSON.parse(crudo); } catch (e) { borrar(tipo); return null; }
        if (!b?.datos) return null;

        const horas = (Date.now() - new Date(b.guardado).getTime()) / 3600000;
        if (!(horas >= 0) || horas > HORAS_VIDA) { borrar(tipo); return null; }

        return b;
    }

    function restaurar(tipo, form) {
        const b = leer(tipo);
        if (!b) return 0;

        let puestos = 0;
        for (const [nombre, valor] of Object.entries(b.datos)) {
            const grupo = [...form.querySelectorAll(`[name="${CSS.escape(nombre)}"]`)];
            if (!grupo.length) continue;

            const primero = grupo[0];

            if (primero.type === 'radio') {
                const elegido = grupo.find(r => r.value === valor);
                if (!elegido || elegido.checked) continue;
                elegido.checked = true;
                elegido.dispatchEvent(new Event('change', { bubbles: true }));
            } else if (primero.type === 'checkbox') {
                if (primero.checked === !!valor) continue;
                primero.checked = !!valor;
                primero.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                if (primero.value === valor) continue;
                primero.value = valor;
                primero.dispatchEvent(new Event('input', { bubbles: true }));
                primero.dispatchEvent(new Event('change', { bubbles: true }));
            }
            puestos++;
        }
        return puestos;
    }

    function restaurarTodo() {
        let total = 0;
        for (const [id, tipo] of Object.entries(FORMULARIOS)) {
            const form = document.getElementById(id);
            if (form) total += restaurar(tipo, form);
        }
        return total;
    }

    // ============================================
    // INICIO
    // ============================================

    const pendientes = {};

    function alEscribir(e) {
        const form = e.target?.closest?.('form');
        if (!form) return;

        const tipo = FORMULARIOS[form.id];
        if (!tipo) return;

        clearTimeout(pendientes[tipo]);
        pendientes[tipo] = setTimeout(() => guardar(tipo, form), RETARDO);
    }

    function init() {
        document.addEventListener('input', alEscribir, true);
        document.addEventListener('change', alEscribir, true);

        // Android no avisa antes de matar una app en segundo plano, pero si
        // manda visibilitychange al salir. Es la ultima oportunidad de
        // guardar, asi que aqui se escribe ya, sin retardo.
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') guardarTodo();
        });
        window.addEventListener('pagehide', guardarTodo);
        window.addEventListener('beforeunload', guardarTodo);

        // El interruptor de Ajustes, que hasta ahora no mandaba sobre nada
        const sw = document.getElementById('autosave-toggle');
        if (sw) {
            sw.checked = activo();
            sw.addEventListener('change', () => {
                activar(sw.checked);
                app()?.showToast(
                    sw.checked ? 'Auto-save on' : 'Auto-save off — drafts cleared',
                    sw.checked ? 'success' : 'warning');
            });
        }

        // Se restaura una vez, con los formularios ya en el DOM
        setTimeout(() => {
            const n = restaurarTodo();
            if (n) {
                app()?.showToast(`Restored ${n} field(s) you had filled in`, 'info');
            }
        }, 900);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PoliceToolsDrafts = {
        guardar, guardarTodo, restaurar, restaurarTodo, borrar, leer,
        activo, activar, HORAS_VIDA, PREFIJO
    };
})();
