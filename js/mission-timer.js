/**
 * MISSION TIMER + DICTADO - Police Tools App
 *
 * Dos cosas que quitan trabajo manual del Patrol Log:
 *
 *   - Las horas de entrada y salida se tecleaban a mano en formato militar
 *     de cuatro digitos, normalmente despues del hecho y de memoria. Con un
 *     boton se marcan solas con la hora real.
 *
 *   - Escribir la descripcion de una mision con el teclado del telefono
 *     dentro de un vehiculo es el peor caso posible. Se dicta y se corrige.
 */

(function () {
    'use strict';

    const CLAVE_ACTIVA = 'policeTools_misionActiva';

    const app = () => window.app;

    function ahoraMilitar(fecha) {
        const d = fecha || new Date();
        return String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0');
    }

    function duracion(desdeISO) {
        const ms = Date.now() - new Date(desdeISO).getTime();
        const min = Math.max(0, Math.floor(ms / 60000));
        const h = Math.floor(min / 60);
        return h ? `${h}h ${String(min % 60).padStart(2, '0')}m` : `${min}m`;
    }

    // ============================================
    // CRONOMETRO
    // ============================================
    const timer = {
        get activa() {
            try { return JSON.parse(localStorage.getItem(CLAVE_ACTIVA) || 'null'); } catch (e) { return null; }
        },

        set activa(v) {
            try {
                if (v) localStorage.setItem(CLAVE_ACTIVA, JSON.stringify(v));
                else localStorage.removeItem(CLAVE_ACTIVA);
            } catch (e) {}
        },

        iniciar() {
            const inicio = new Date();
            this.activa = { inicio: inicio.toISOString(), horaIn: ahoraMilitar(inicio) };

            const campoIn = document.getElementById('mission-time-in');
            if (campoIn) campoIn.value = this.activa.horaIn;

            this.pintar();
            app()?.showToast(`Mission started ${this.activa.horaIn}`, 'success');
            window.PoliceToolsMobile?.haptics.success();
        },

        cerrar() {
            const a = this.activa;
            if (!a) return;

            const horaOut = ahoraMilitar();

            const campoIn = document.getElementById('mission-time-in');
            const campoOut = document.getElementById('mission-time-out');
            if (campoIn) campoIn.value = a.horaIn;
            if (campoOut) campoOut.value = horaOut;

            this.activa = null;
            this.pintar();

            app()?.showToast(`Mission ${a.horaIn} - ${horaOut}. Add the description.`, 'success');
            window.PoliceToolsMobile?.haptics.success();

            // El siguiente dato es la descripcion: se lleva el foco alli
            document.getElementById('mission-description')?.focus();
        },

        descartar() {
            this.activa = null;
            this.pintar();
            app()?.showToast('Mission discarded', 'info');
        },

        pintar() {
            const caja = document.getElementById('mission-timer');
            if (!caja) return;

            const a = this.activa;
            if (!a) {
                caja.className = 'mission-timer';
                caja.innerHTML = `
                    <button type="button" class="mt-start" id="mt-start">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="9"></circle>
                            <polyline points="12 7 12 12 15 14"></polyline>
                        </svg>
                        Start mission
                    </button>
                    <span class="mt-hint">Records IN and OUT with the real clock</span>
                `;
                caja.querySelector('#mt-start').addEventListener('click', () => this.iniciar());
                return;
            }

            caja.className = 'mission-timer running';
            caja.innerHTML = `
                <div class="mt-live">
                    <span class="mt-dot"></span>
                    <div class="mt-text">
                        <b>In progress · ${a.horaIn}</b>
                        <span id="mt-elapsed">${duracion(a.inicio)}</span>
                    </div>
                </div>
                <div class="mt-buttons">
                    <button type="button" class="mt-discard" id="mt-discard">Discard</button>
                    <button type="button" class="mt-stop" id="mt-stop">Close mission</button>
                </div>
            `;
            caja.querySelector('#mt-stop').addEventListener('click', () => this.cerrar());
            caja.querySelector('#mt-discard').addEventListener('click', () => this.descartar());
        },

        arrancarReloj() {
            setInterval(() => {
                const a = this.activa;
                const el = document.getElementById('mt-elapsed');
                if (a && el) el.textContent = duracion(a.inicio);
            }, 30000);
        }
    };

    // ============================================
    // DICTADO
    // ============================================
    const dictado = {
        get disponible() {
            return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
        },

        crear(idioma) {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            const r = new SR();
            r.lang = idioma;
            r.continuous = true;
            r.interimResults = true;
            return r;
        },

        /** Dicta sobre un campo, añadiendo al texto que ya tenga. */
        escuchar(campo, boton) {
            if (!this.disponible) {
                app()?.showToast('Dictation is not available in this browser', 'warning');
                return;
            }

            if (this.activo) {
                this.parar();
                return;
            }

            // El idioma sigue al del dispositivo: los partes se escriben en
            // ingles pero el oficial puede hablar en español
            const idioma = (navigator.language || 'en-US').startsWith('es') ? 'es-PR' : 'en-US';

            const r = this.crear(idioma);
            this.activo = r;
            this.base = campo.value ? campo.value.trim() + ' ' : '';

            boton?.classList.add('listening');

            r.onresult = (e) => {
                let texto = '';
                for (let i = e.resultIndex; i < e.results.length; i++) {
                    texto += e.results[i][0].transcript;
                }
                campo.value = this.base + texto;
                campo.dispatchEvent(new Event('input', { bubbles: true }));
            };

            r.onerror = (e) => {
                if (e.error === 'not-allowed') {
                    app()?.showToast('Microphone permission denied', 'error');
                } else if (e.error !== 'aborted' && e.error !== 'no-speech') {
                    app()?.showToast('Dictation error: ' + e.error, 'error');
                }
                this.parar();
            };

            r.onend = () => {
                // Al terminar se consolida lo dicho como nueva base
                this.base = campo.value ? campo.value.trim() + ' ' : '';
                boton?.classList.remove('listening');
                this.activo = null;
            };

            try {
                r.start();
                window.PoliceToolsMobile?.haptics.tap();
            } catch (e) {
                this.parar();
            }
        },

        parar() {
            if (this.activo) {
                try { this.activo.stop(); } catch (e) {}
                this.activo = null;
            }
            document.querySelectorAll('.mic-btn.listening').forEach(b => b.classList.remove('listening'));
        }
    };

    /** Añade un boton de microfono a un campo de texto largo. */
    function montarMicrofono(campo) {
        if (!dictado.disponible) return;
        if (campo.dataset.micMounted) return;
        campo.dataset.micMounted = '1';

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'mic-btn';
        boton.setAttribute('aria-label', 'Dictate');
        boton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="2" width="6" height="12" rx="3"></rect>
                <path d="M5 10v2a7 7 0 0 0 14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>`;

        boton.addEventListener('click', () => dictado.escuchar(campo, boton));

        const envoltorio = document.createElement('div');
        envoltorio.className = 'mic-wrap';
        campo.parentNode.insertBefore(envoltorio, campo);
        envoltorio.appendChild(campo);
        envoltorio.appendChild(boton);
    }

    const CAMPOS_DICTABLES = [
        'mission-description', 'mission-remarks', 'journal-content'
    ];

    function montarDictado() {
        CAMPOS_DICTABLES.forEach(id => {
            const el = document.getElementById(id);
            if (el) montarMicrofono(el);
        });

        document.querySelectorAll('textarea[name="comments"], textarea[name="remarks"]')
            .forEach(montarMicrofono);
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        // El cronometro se inserta encima del formulario de mision
        const anclaje = document.getElementById('mission-time-in')?.closest('.entry-row, .entry-grid, .entry-form');
        if (anclaje && !document.getElementById('mission-timer')) {
            const caja = document.createElement('div');
            caja.id = 'mission-timer';
            caja.className = 'mission-timer';
            anclaje.parentNode.insertBefore(caja, anclaje);
        }

        timer.pintar();
        timer.arrancarReloj();
        montarDictado();

        // Los campos aparecen al abrir cada vista
        new MutationObserver(() => montarDictado())
            .observe(document.body, { childList: true, subtree: true });

        // Salir de la vista para el dictado, que si no sigue con el microfono
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState !== 'visible') dictado.parar();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PoliceToolsMission = { timer, dictado };
})();
