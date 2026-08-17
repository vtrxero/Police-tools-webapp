/**
 * MOBILE LAYER - Police Tools App
 *
 * Ajustes que solo tienen sentido en un telefono en servicio:
 * teclado, conexion intermitente, feedback tactil, pantalla encendida
 * mientras se rellena un formulario y accesos directos de la PWA.
 *
 * No toca la logica de negocio: se engancha por eventos y atributos.
 */

(function () {
    'use strict';

    // ============================================
    // 1. FEEDBACK HAPTICO
    // Una vibracion corta confirma el toque cuando el guante o el
    // movimiento del vehiculo hacen dudar de si se pulso.
    // ============================================
    const haptics = {
        enabled: 'vibrate' in navigator,

        // Respeta el ajuste guardado por el usuario
        get allowed() {
            try {
                return localStorage.getItem('policeTools_haptics') !== 'off';
            } catch (e) {
                return true;
            }
        },

        tap() { this.fire(10); },
        success() { this.fire([15, 40, 15]); },
        warn() { this.fire([30, 60, 30]); },

        fire(pattern) {
            if (!this.enabled || !this.allowed) return;
            try { navigator.vibrate(pattern); } catch (e) {}
        }
    };

    const TAPPABLE = [
        '.menu-card', '.btn', '.icon-btn', '.back-btn', '.filter-btn',
        '.document-card', '.saved-entry-card', '.law-item', '.calendar-day',
        '.menu-dropdown-item', '.add-row-btn', '.save-entry-btn',
        '.team-template-btn', '.shift-card', '.vehicle-option'
    ].join(',');

    document.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'touch') return;
        if (e.target.closest(TAPPABLE)) haptics.tap();
    }, { passive: true });

    // Vibracion distinta segun el resultado de una accion
    document.addEventListener('policetools:toast', (e) => {
        const type = e.detail?.type;
        if (type === 'success') haptics.success();
        else if (type === 'error' || type === 'warning') haptics.warn();
    });

    // ============================================
    // 2. TECLADO EN PANTALLA
    // visualViewport avisa cuando el teclado reduce el area visible.
    // Sin esto, el campo enfocado queda tapado en los formularios largos.
    // ============================================
    if (window.visualViewport) {
        const vv = window.visualViewport;
        let baseHeight = vv.height;

        const onResize = () => {
            // Una reduccion de mas de 150px solo la provoca el teclado
            const shrink = baseHeight - vv.height;
            const open = shrink > 150;

            document.body.classList.toggle('keyboard-open', open);
            document.documentElement.style.setProperty('--keyboard-height', open ? `${shrink}px` : '0px');

            if (open) scrollFocusedIntoView();
            else baseHeight = Math.max(baseHeight, vv.height);
        };

        vv.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', () => {
            // Tras girar, la altura de referencia cambia por completo
            setTimeout(() => { baseHeight = vv.height; }, 350);
        });
    }

    function scrollFocusedIntoView() {
        const el = document.activeElement;
        if (!el || !el.matches('input, textarea, select')) return;

        // Deja que el teclado termine de desplegarse
        setTimeout(() => {
            el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }, 120);
    }

    document.addEventListener('focusin', (e) => {
        if (e.target.matches('input, textarea, select')) scrollFocusedIntoView();
    });

    // Enter en un campo salta al siguiente en vez de enviar el formulario
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const el = e.target;
        if (!el.matches('input:not([type="checkbox"]):not([type="radio"])')) return;

        const form = el.closest('form, .tab-view');
        if (!form) return;

        const campos = Array.from(
            form.querySelectorAll('input:not([type="hidden"]):not([readonly]), select, textarea')
        ).filter(c => c.offsetParent !== null);

        const i = campos.indexOf(el);
        if (i > -1 && i < campos.length - 1) {
            e.preventDefault();
            campos[i + 1].focus();
        }
    });

    // ============================================
    // 3. TIPO DE TECLADO POR CAMPO
    // Abrir el teclado numerico para el millaje ahorra toques en cada turno.
    // Se aplica por patron de nombre en vez de tocar 130 inputs del HTML.
    // ============================================
    const REGLAS_TECLADO = [
        {
            test: /mileage|fuel_cost|citation|_cost|^oil$|hours|mid$|badge/i,
            attrs: { inputmode: 'numeric', enterkeyhint: 'next', autocomplete: 'off' }
        },
        {
            test: /time_in|time_out|^time|hora/i,
            attrs: { inputmode: 'numeric', enterkeyhint: 'next', maxlength: '4' }
        },
        {
            test: /radio|vehicle_number|patrol$|unit$|plate|tag/i,
            attrs: { inputmode: 'text', autocapitalize: 'characters', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'next' }
        },
        {
            test: /name|print$|sign$|operator|supervisor|sergeant|trainer/i,
            attrs: { autocapitalize: 'words', autocomplete: 'off', enterkeyhint: 'next' }
        },
        {
            test: /phone|tel/i,
            attrs: { inputmode: 'tel', enterkeyhint: 'next' }
        },
        {
            test: /email/i,
            attrs: { inputmode: 'email', autocapitalize: 'none', autocorrect: 'off' }
        },
        {
            test: /description|remarks|comments|notes|narrative/i,
            attrs: { autocapitalize: 'sentences', enterkeyhint: 'enter' }
        }
    ];

    function aplicarHintsTeclado(raiz) {
        const campos = (raiz || document).querySelectorAll('input, textarea');

        campos.forEach((campo) => {
            if (campo.dataset.mobileHinted) return;
            campo.dataset.mobileHinted = '1';

            const tipo = campo.type;
            if (tipo === 'checkbox' || tipo === 'radio' || tipo === 'hidden') return;

            const clave = `${campo.name || ''} ${campo.id || ''}`;

            // type="number" en movil da una rueda diminuta y acepta "e"/"-";
            // text + inputmode numerico es mas fiable para millaje y conteos.
            if (tipo === 'number') {
                campo.type = 'text';
                campo.setAttribute('inputmode', 'numeric');
                campo.setAttribute('pattern', '[0-9]*');
            }

            for (const regla of REGLAS_TECLADO) {
                if (!regla.test.test(clave)) continue;
                for (const [attr, valor] of Object.entries(regla.attrs)) {
                    if (!campo.hasAttribute(attr)) campo.setAttribute(attr, valor);
                }
                break;
            }

            // El ultimo campo visible cierra el teclado en vez de "siguiente"
            if (campo.tagName === 'TEXTAREA' && !campo.hasAttribute('enterkeyhint')) {
                campo.setAttribute('enterkeyhint', 'enter');
            }
        });
    }

    // ============================================
    // 4. ESTADO DE CONEXION
    // La app funciona offline, pero el oficial debe saberlo.
    // ============================================
    const banner = document.createElement('div');
    banner.className = 'offline-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<line x1="1" y1="1" x2="23" y2="23"></line>' +
        '<path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>' +
        '<path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>' +
        '<path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>' +
        '<path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>' +
        '<path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>' +
        '<line x1="12" y1="20" x2="12.01" y2="20"></line>' +
        '</svg><span>Offline - los datos se guardan en el dispositivo</span>';

    function actualizarConexion() {
        const offline = !navigator.onLine;
        banner.classList.toggle('visible', offline);
        document.body.classList.toggle('is-offline', offline);
    }

    window.addEventListener('online', actualizarConexion);
    window.addEventListener('offline', actualizarConexion);

    // ============================================
    // 5. AVISO DE VERSION NUEVA
    // ============================================
    window.addEventListener('sw-update-ready', (e) => {
        const worker = e.detail?.worker;

        const toast = document.createElement('div');
        toast.className = 'update-toast';
        toast.innerHTML = '<span>Nueva version disponible</span>';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Actualizar';
        btn.addEventListener('click', () => {
            // controllerchange (index.html) se encarga de recargar
            if (worker) worker.postMessage({ type: 'SKIP_WAITING' });
            toast.classList.remove('visible');
        });

        toast.appendChild(btn);
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));

        setTimeout(() => toast.classList.remove('visible'), 15000);
    });

    // ============================================
    // 6. PANTALLA ENCENDIDA
    // Rellenar un Guard Mount de 18 personas tarda mas que el tiempo de
    // apagado de pantalla. Se mantiene despierta solo dentro de un formulario.
    // ============================================
    let wakeLock = null;

    async function pedirWakeLock() {
        if (!('wakeLock' in navigator) || wakeLock) return;
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => { wakeLock = null; });
        } catch (e) {
            // Denegado o bateria baja: no es critico
        }
    }

    function soltarWakeLock() {
        if (!wakeLock) return;
        try { wakeLock.release(); } catch (e) {}
        wakeLock = null;
    }

    function hayFormularioAbierto() {
        return !!document.querySelector('.tab-view.active form');
    }

    function revisarWakeLock() {
        if (document.visibilityState === 'visible' && hayFormularioAbierto()) pedirWakeLock();
        else soltarWakeLock();
    }

    document.addEventListener('visibilitychange', revisarWakeLock);

    // ============================================
    // 7. ACCESOS DIRECTOS DE LA PWA (?tab=)
    // ============================================
    function abrirTabDeURL() {
        const tab = new URLSearchParams(window.location.search).get('tab');
        if (!tab) return;

        const intentar = (restantes) => {
            if (window.app && typeof window.app.openTab === 'function') {
                window.app.openTab(tab);
                // Limpia el parametro para que el boton atras no reabra la vista
                history.replaceState(null, '', window.location.pathname);
            } else if (restantes > 0) {
                setTimeout(() => intentar(restantes - 1), 150);
            }
        };

        intentar(20);
    }

    // ============================================
    // 8. OBSERVADOR
    // Las vistas y filas dinamicas se crean despues de cargar, asi que hay
    // que aplicar los hints tambien a lo que aparece luego.
    // ============================================
    const observer = new MutationObserver((mutaciones) => {
        let nuevosCampos = false;

        for (const m of mutaciones) {
            for (const nodo of m.addedNodes) {
                if (nodo.nodeType !== 1) continue;
                if (nodo.matches?.('input, textarea') || nodo.querySelector?.('input, textarea')) {
                    nuevosCampos = true;
                }
            }
            if (m.type === 'attributes') revisarWakeLock();
        }

        if (nuevosCampos) aplicarHintsTeclado();
    });

    // ============================================
    // INICIO
    // ============================================
    function init() {
        document.body.appendChild(banner);
        actualizarConexion();
        aplicarHintsTeclado();
        abrirTabDeURL();
        revisarWakeLock();

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expuesto para los ajustes y para el resto de la app
    window.PoliceToolsMobile = { haptics, aplicarHintsTeclado };
})();
