/**
 * APP LOCK - Police Tools App
 *
 * La app guarda nombres de entrevistados, direcciones, MIDs y nombres de
 * oficiales, y no tenia ningun bloqueo: cualquiera que cogiera el telefono
 * desbloqueado abria todo el historial.
 *
 * Aqui hay un PIN y, donde el dispositivo lo permita, desbloqueo con
 * huella. El PIN no se guarda: se guarda su hash PBKDF2 con sal, asi que
 * leer el almacenamiento no lo revela.
 */

(function () {
    'use strict';

    const K_HASH = 'policeTools_lockHash';
    const K_SAL = 'policeTools_lockSalt';
    const K_MIN = 'policeTools_lockMinutes';
    const K_BIO = 'policeTools_lockBio';
    const K_CRED = 'policeTools_lockCredId';
    const K_VISTO = 'policeTools_lockSeen';

    const ITERACIONES = 210000;   // coste PBKDF2 recomendado por OWASP
    const MAX_INTENTOS = 5;

    const app = () => window.app;

    let intentos = 0;
    let desbloqueada = false;
    let temporizador = null;

    // ============================================
    // CRIPTOGRAFIA
    // ============================================
    function aHex(buf) {
        return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function salAleatoria() {
        return aHex(crypto.getRandomValues(new Uint8Array(16)));
    }

    /**
     * Deriva el hash del PIN.
     *
     * PBKDF2 y no SHA-256 a secas: un PIN de 4 digitos son 10.000
     * combinaciones, y un hash simple se rompe por fuerza bruta al
     * instante. Con 210.000 iteraciones cada intento cuesta tiempo real.
     */
    async function derivar(pin, sal) {
        const enc = new TextEncoder();
        const clave = await crypto.subtle.importKey(
            'raw', enc.encode(pin), { name: 'PBKDF2' }, false, ['deriveBits']
        );
        const bits = await crypto.subtle.deriveBits(
            { name: 'PBKDF2', salt: enc.encode(sal), iterations: ITERACIONES, hash: 'SHA-256' },
            clave, 256
        );
        return aHex(bits);
    }

    // ============================================
    // ESTADO
    // ============================================
    const lock = {
        get activo() {
            try { return !!localStorage.getItem(K_HASH); } catch (e) { return false; }
        },

        get minutos() {
            try { return parseInt(localStorage.getItem(K_MIN) || '2', 10); } catch (e) { return 2; }
        },

        set minutos(m) {
            try { localStorage.setItem(K_MIN, String(m)); } catch (e) {}
        },

        get biometriaActiva() {
            try { return localStorage.getItem(K_BIO) === 'on'; } catch (e) { return false; }
        },

        async establecer(pin) {
            const sal = salAleatoria();
            const hash = await derivar(pin, sal);
            localStorage.setItem(K_SAL, sal);
            localStorage.setItem(K_HASH, hash);
            intentos = 0;
        },

        async comprobar(pin) {
            const sal = localStorage.getItem(K_SAL);
            const hash = localStorage.getItem(K_HASH);
            if (!sal || !hash) return false;
            return (await derivar(pin, sal)) === hash;
        },

        quitar() {
            [K_HASH, K_SAL, K_BIO, K_CRED].forEach(k => {
                try { localStorage.removeItem(k); } catch (e) {}
            });
            desbloqueada = true;
            ocultar();
        }
    };

    // ============================================
    // BIOMETRIA
    // ============================================
    /**
     * Huella o cara mediante WebAuthn con autenticador de plataforma.
     *
     * No sustituye al PIN, lo acompaña: si el sensor falla o el navegador
     * no lo soporta, siempre queda el PIN. Y la credencial nunca sale del
     * dispositivo.
     */
    const bio = {
        async disponible() {
            if (!window.PublicKeyCredential) return false;
            try {
                return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            } catch (e) {
                return false;
            }
        },

        async registrar() {
            if (!(await this.disponible())) throw new Error('No biometric sensor available');

            const reto = crypto.getRandomValues(new Uint8Array(32));
            const idUsuario = crypto.getRandomValues(new Uint8Array(16));

            const cred = await navigator.credentials.create({
                publicKey: {
                    challenge: reto,
                    rp: { name: 'Police Tools' },
                    user: { id: idUsuario, name: 'officer', displayName: 'Officer' },
                    pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
                    authenticatorSelection: {
                        authenticatorAttachment: 'platform',
                        userVerification: 'required',
                        residentKey: 'preferred'
                    },
                    timeout: 60000
                }
            });

            if (!cred) throw new Error('Registration cancelled');

            localStorage.setItem(K_CRED, aHex(cred.rawId));
            localStorage.setItem(K_BIO, 'on');
            return true;
        },

        async verificar() {
            const idHex = localStorage.getItem(K_CRED);
            if (!idHex) return false;

            const bytes = new Uint8Array(idHex.match(/.{2}/g).map(h => parseInt(h, 16)));
            const reto = crypto.getRandomValues(new Uint8Array(32));

            const assert = await navigator.credentials.get({
                publicKey: {
                    challenge: reto,
                    allowCredentials: [{ type: 'public-key', id: bytes }],
                    userVerification: 'required',
                    timeout: 60000
                }
            });

            return !!assert;
        },

        desactivar() {
            try {
                localStorage.removeItem(K_BIO);
                localStorage.removeItem(K_CRED);
            } catch (e) {}
        }
    };

    // ============================================
    // PANTALLA DE BLOQUEO
    // ============================================
    function pantalla({ modo = 'unlock', alTerminar } = {}) {
        const anterior = document.getElementById('lock-screen');
        if (anterior) anterior.remove();

        const titulos = {
            unlock: { t: 'Enter PIN', s: 'Police Tools is locked' },
            set: { t: 'Choose a PIN', s: '4 digits' },
            confirm: { t: 'Repeat the PIN', s: 'Confirm to save' },
            verify: { t: 'Enter your PIN', s: 'Confirm it is you' }
        };
        const txt = titulos[modo] || titulos.unlock;

        const el = document.createElement('div');
        el.className = 'lock-screen';
        el.id = 'lock-screen';
        el.innerHTML = `
            <div class="lk-inner">
                <div class="lk-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="M9 12l2 2 4-4"></path>
                    </svg>
                </div>
                <h2 class="lk-title">${txt.t}</h2>
                <p class="lk-sub" id="lk-sub">${txt.s}</p>

                <div class="lk-dots" id="lk-dots"></div>

                <div class="lk-pad">
                    ${[1,2,3,4,5,6,7,8,9].map(n => `<button type="button" class="lk-key" data-k="${n}">${n}</button>`).join('')}
                    <button type="button" class="lk-key lk-bio" id="lk-bio" hidden aria-label="Use biometrics">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                            <path d="M12 3a9 9 0 0 0-9 9v3"></path>
                            <path d="M21 15v-3a9 9 0 0 0-4.5-7.8"></path>
                            <path d="M7 20a12 12 0 0 1-1-5v-3a6 6 0 0 1 9-5.2"></path>
                            <path d="M17 10v5a16 16 0 0 1-.6 4.4"></path>
                            <path d="M12 12v3a9 9 0 0 0 .8 3.7"></path>
                        </svg>
                    </button>
                    <button type="button" class="lk-key" data-k="0">0</button>
                    <button type="button" class="lk-key lk-del" id="lk-del" aria-label="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                            <path d="M21 5H9l-6 7 6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"></path>
                            <line x1="18" y1="9" x2="12" y2="15"></line>
                            <line x1="12" y1="9" x2="18" y2="15"></line>
                        </svg>
                    </button>
                </div>

                ${modo !== 'unlock' ? '<button type="button" class="lk-cancel" id="lk-cancel">Cancel</button>' : ''}
            </div>
        `;

        document.body.appendChild(el);
        document.body.classList.add('locked');

        let valor = '';
        const dots = el.querySelector('#lk-dots');
        const sub = el.querySelector('#lk-sub');

        // PIN de longitud fija: se envia solo al cuarto digito. Permitir
        // longitud variable obligaba a un boton de aceptar escondido.
        const LARGO = 4;

        const pintarPuntos = () => {
            dots.innerHTML = Array.from({ length: LARGO }, (_, i) =>
                `<i class="${i < valor.length ? 'on' : ''}"></i>`).join('');
        };
        pintarPuntos();

        const error = (msg) => {
            sub.textContent = msg;
            sub.classList.add('err');
            el.querySelector('.lk-inner').classList.add('shake');
            setTimeout(() => el.querySelector('.lk-inner')?.classList.remove('shake'), 420);
            valor = '';
            pintarPuntos();
            window.PoliceToolsMobile?.haptics.warn();
        };

        const enviar = async () => {
            if (modo === 'unlock') {
                if (await lock.comprobar(valor)) {
                    intentos = 0;
                    cerrar();
                    alTerminar?.(true);
                } else {
                    intentos++;
                    if (intentos >= MAX_INTENTOS) {
                        // Sin borrar nada: solo se hace esperar. Borrar los
                        // datos por fallar el PIN seria peor que el riesgo.
                        el.querySelectorAll('.lk-key').forEach(k => k.disabled = true);
                        let espera = 30;
                        sub.textContent = `Too many attempts. Wait ${espera}s`;
                        sub.classList.add('err');
                        const t = setInterval(() => {
                            espera--;
                            sub.textContent = `Too many attempts. Wait ${espera}s`;
                            if (espera <= 0) {
                                clearInterval(t);
                                intentos = 0;
                                el.querySelectorAll('.lk-key').forEach(k => k.disabled = false);
                                sub.textContent = titulos.unlock.s;
                                sub.classList.remove('err');
                            }
                        }, 1000);
                        valor = '';
                        pintarPuntos();
                    } else {
                        error(`Wrong PIN. ${MAX_INTENTOS - intentos} left`);
                    }
                }
                return;
            }

            if (modo === 'set') {
                const primero = valor;
                cerrar();
                pantalla({
                    modo: 'confirm',
                    alTerminar: async (ok, segundo) => {
                        if (!ok) { alTerminar?.(false); return; }
                        if (segundo !== primero) {
                            app()?.showToast('The PINs do not match', 'error');
                            pantalla({ modo: 'set', alTerminar });
                            return;
                        }
                        await lock.establecer(primero);
                        app()?.showToast('PIN set', 'success');
                        alTerminar?.(true);
                    }
                });
                return;
            }

            if (modo === 'confirm' || modo === 'verify') {
                if (modo === 'verify' && !(await lock.comprobar(valor))) { error('Wrong PIN'); return; }
                cerrar();
                alTerminar?.(true, valor);
            }
        };

        el.querySelectorAll('.lk-key[data-k]').forEach(b => {
            b.addEventListener('click', () => {
                if (valor.length >= LARGO) return;
                valor += b.dataset.k;
                pintarPuntos();
                sub.classList.remove('err');
                window.PoliceToolsMobile?.haptics.tap();

                // Al completar los cuatro digitos se valida solo
                if (valor.length === LARGO) setTimeout(enviar, 140);
            });
        });

        el.querySelector('#lk-del').addEventListener('click', () => {
            valor = valor.slice(0, -1);
            pintarPuntos();
            sub.classList.remove('err');
        });

        el.querySelector('#lk-cancel')?.addEventListener('click', () => {
            cerrar();
            alTerminar?.(false);
        });

        // Aceptar tambien con Enter, util con teclado fisico
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') enviar();
            else if (e.key === 'Backspace') { valor = valor.slice(0, -1); pintarPuntos(); }
            else if (/^[0-9]$/.test(e.key) && valor.length < LARGO) {
                valor += e.key;
                pintarPuntos();
                if (valor.length === LARGO) setTimeout(enviar, 140);
            }
        });
        el.tabIndex = -1;
        el.focus();

        // Boton de huella
        if (modo === 'unlock' && lock.biometriaActiva) {
            const bt = el.querySelector('#lk-bio');
            bio.disponible().then(ok => {
                if (!ok) return;
                bt.hidden = false;
                const pedir = async () => {
                    try {
                        if (await bio.verificar()) {
                            cerrar();
                            alTerminar?.(true);
                        }
                    } catch (e) {
                        sub.textContent = 'Use your PIN';
                    }
                };
                bt.addEventListener('click', pedir);
                // Se ofrece nada mas abrir, como hace el sistema
                setTimeout(pedir, 350);
            });
        }

        function cerrar() {
            el.remove();
            document.body.classList.remove('locked');
        }
    }

    function ocultar() {
        document.getElementById('lock-screen')?.remove();
        document.body.classList.remove('locked');
    }

    // ============================================
    // BLOQUEO AUTOMATICO
    // ============================================
    function bloquear() {
        if (!lock.activo || document.getElementById('lock-screen')) return;
        desbloqueada = false;
        pantalla({ modo: 'unlock', alTerminar: () => { desbloqueada = true; } });
    }

    function programar() {
        clearTimeout(temporizador);
        const min = lock.minutos;
        if (!lock.activo || min <= 0) return;
        temporizador = setTimeout(bloquear, min * 60000);
    }

    // ============================================
    // AJUSTES
    // ============================================
    function montarAjustes() {
        const caja = document.getElementById('lock-settings');
        if (!caja) return;

        const pintar = async () => {
            const hayBio = await bio.disponible();

            caja.innerHTML = `
                <div class="lk-row">
                    <div class="lk-row-text">
                        <b>${lock.activo ? 'PIN is on' : 'PIN is off'}</b>
                        <span>${lock.activo
                            ? 'Asked when the app opens or comes back from the background'
                            : 'Anyone who picks up this phone can read every report'}</span>
                    </div>
                    <button type="button" class="btn ${lock.activo ? 'btn-secondary' : 'btn-primary'}" id="lk-toggle">
                        ${lock.activo ? 'Turn off' : 'Set up'}
                    </button>
                </div>

                ${lock.activo ? `
                    <div class="form-group">
                        <label for="lk-minutes">Lock after</label>
                        <select id="lk-minutes">
                            <option value="0">Immediately</option>
                            <option value="1">1 minute</option>
                            <option value="2">2 minutes</option>
                            <option value="5">5 minutes</option>
                            <option value="15">15 minutes</option>
                        </select>
                    </div>

                    ${hayBio ? `
                        <div class="lk-row">
                            <div class="lk-row-text">
                                <b>Unlock with fingerprint</b>
                                <span>The PIN still works if the sensor fails</span>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" id="lk-bio-toggle" ${lock.biometriaActiva ? 'checked' : ''}/>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>` : `
                        <p class="section-note">This device has no fingerprint sensor available to the app.</p>`}

                    <button type="button" class="btn btn-secondary" id="lk-change">Change PIN</button>
                ` : ''}
            `;

            caja.querySelector('#lk-toggle').addEventListener('click', () => {
                if (lock.activo) {
                    pantalla({
                        modo: 'verify',
                        alTerminar: (ok) => {
                            if (!ok) return;
                            lock.quitar();
                            app()?.showToast('PIN removed', 'info');
                            pintar();
                        }
                    });
                } else {
                    pantalla({ modo: 'set', alTerminar: (ok) => { if (ok) { programar(); pintar(); } } });
                }
            });

            caja.querySelector('#lk-change')?.addEventListener('click', () => {
                pantalla({
                    modo: 'verify',
                    alTerminar: (ok) => {
                        if (!ok) return;
                        pantalla({ modo: 'set', alTerminar: () => pintar() });
                    }
                });
            });

            const sel = caja.querySelector('#lk-minutes');
            if (sel) {
                sel.value = String(lock.minutos);
                sel.addEventListener('change', () => { lock.minutos = +sel.value; programar(); });
            }

            const bt = caja.querySelector('#lk-bio-toggle');
            if (bt) {
                bt.addEventListener('change', async () => {
                    if (bt.checked) {
                        try {
                            await bio.registrar();
                            app()?.showToast('Fingerprint unlock enabled', 'success');
                        } catch (e) {
                            bt.checked = false;
                            app()?.showToast('Could not enable: ' + e.message, 'error');
                        }
                    } else {
                        bio.desactivar();
                        app()?.showToast('Fingerprint unlock disabled', 'info');
                    }
                });
            }
        };

        pintar();
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        montarAjustes();

        if (lock.activo) {
            bloquear();
        } else {
            // Se propone una sola vez, sin insistir en cada arranque
            try {
                if (!localStorage.getItem(K_VISTO)) {
                    localStorage.setItem(K_VISTO, '1');
                    setTimeout(() => {
                        app()?.addNotification?.(
                            'warning',
                            'Protect your reports',
                            'Set a PIN in Settings. Right now anyone with this phone can read them.'
                        );
                    }, 4000);
                }
            } catch (e) {}
        }

        // Al pasar a segundo plano arranca la cuenta; al volver, si se
        // cumplio el tiempo, se pide el PIN.
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                if (lock.minutos === 0) bloquear();
                else programar();
            } else {
                clearTimeout(temporizador);
            }
        });

        window.addEventListener('blur', programar);
        window.addEventListener('focus', () => clearTimeout(temporizador));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
    } else {
        setTimeout(init, 300);
    }

    window.PoliceToolsLock = { lock, bio, pantalla, bloquear };
})();
