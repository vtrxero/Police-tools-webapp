/**
 * SIGNATURE - Police Tools App
 *
 * Los formularios tienen lineas de firma reales (SIGN, SIGN_2, SIGN_3,
 * SHIFT SUPERVISOR SIGNATURE, y las casillas de firma del PMCS), pero la
 * app solo permitia escribir el nombre como texto, que no es una firma:
 * habia que imprimir el PDF para firmarlo a mano.
 *
 * Aqui se dibuja con el dedo en un canvas y el trazo se incrusta como PNG
 * en el PDF, sobre la linea que le corresponde.
 */

(function () {
    'use strict';

    const CLAVE = 'policeTools_signatures';

    // ============================================
    // ALMACEN
    // ============================================
    const almacen = {
        todas() {
            try { return JSON.parse(localStorage.getItem(CLAVE) || '{}'); } catch (e) { return {}; }
        },

        obtener(campo) {
            return this.todas()[campo] || null;
        },

        guardar(campo, dataUrl) {
            const t = this.todas();
            t[campo] = dataUrl;
            try { localStorage.setItem(CLAVE, JSON.stringify(t)); } catch (e) {
                // Las firmas son PNG pequeños; si aun asi no cabe, se avisa
                window.app?.showToast('No space left to store the signature', 'error');
            }
        },

        borrar(campo) {
            const t = this.todas();
            delete t[campo];
            try { localStorage.setItem(CLAVE, JSON.stringify(t)); } catch (e) {}
        }
    };

    // ============================================
    // LIENZO
    // ============================================
    class Lienzo {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.dibujando = false;
            this.hayTrazo = false;
            this.ultimo = null;
            this.preparar();
            this.escuchar();
        }

        preparar() {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            // El canvas se dibuja a la resolucion real del dispositivo para
            // que el trazo no salga pixelado en el PDF
            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            this.ctx.scale(dpr, dpr);

            this.ctx.lineWidth = 2.4;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.strokeStyle = '#111827';
        }

        punto(e) {
            const r = this.canvas.getBoundingClientRect();
            const t = e.touches ? e.touches[0] : e;
            return { x: t.clientX - r.left, y: t.clientY - r.top };
        }

        escuchar() {
            const inicio = (e) => {
                e.preventDefault();
                this.dibujando = true;
                this.ultimo = this.punto(e);
            };

            const mover = (e) => {
                if (!this.dibujando) return;
                e.preventDefault();

                const p = this.punto(e);
                this.ctx.beginPath();
                this.ctx.moveTo(this.ultimo.x, this.ultimo.y);
                this.ctx.lineTo(p.x, p.y);
                this.ctx.stroke();
                this.ultimo = p;
                this.hayTrazo = true;

                this.canvas.dispatchEvent(new CustomEvent('trazo'));
            };

            const fin = () => { this.dibujando = false; };

            this.canvas.addEventListener('pointerdown', inicio);
            this.canvas.addEventListener('pointermove', mover);
            this.canvas.addEventListener('pointerup', fin);
            this.canvas.addEventListener('pointerleave', fin);
            this.canvas.addEventListener('pointercancel', fin);

            // touch-action: none en el CSS evita que el gesto haga scroll
        }

        limpiar() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.hayTrazo = false;
            this.canvas.dispatchEvent(new CustomEvent('trazo'));
        }

        /**
         * Devuelve el PNG recortado al trazo, con fondo transparente.
         * Recortar importa: si se guardara el lienzo entero, la firma
         * apareceria diminuta al escalarla dentro de la casilla del PDF.
         */
        aPNG() {
            if (!this.hayTrazo) return null;

            const { width: w, height: h } = this.canvas;
            const datos = this.ctx.getImageData(0, 0, w, h).data;

            let minX = w, minY = h, maxX = 0, maxY = 0;
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    if (datos[(y * w + x) * 4 + 3] > 8) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            if (maxX <= minX || maxY <= minY) return null;

            const margen = 6;
            minX = Math.max(0, minX - margen);
            minY = Math.max(0, minY - margen);
            maxX = Math.min(w, maxX + margen);
            maxY = Math.min(h, maxY + margen);

            const recorte = document.createElement('canvas');
            recorte.width = maxX - minX;
            recorte.height = maxY - minY;
            recorte.getContext('2d').drawImage(
                this.canvas, minX, minY, recorte.width, recorte.height,
                0, 0, recorte.width, recorte.height
            );

            return recorte.toDataURL('image/png');
        }
    }

    // ============================================
    // MODAL
    // ============================================
    function abrirModal(campo, etiqueta, alGuardar) {
        const anterior = document.getElementById('sig-modal');
        if (anterior) anterior.remove();

        const fondo = document.createElement('div');
        fondo.className = 'sheet-backdrop sig-backdrop';
        fondo.id = 'sig-modal';
        fondo.innerHTML = `
            <div class="sheet sig-sheet">
                <div class="sheet-handle"></div>
                <h3>${etiqueta}</h3>
                <p class="section-note">Sign with your finger. Turn the phone sideways for more room.</p>
                <div class="sig-pad">
                    <canvas id="sig-canvas"></canvas>
                    <div class="sig-line"></div>
                </div>
                <div class="sig-actions">
                    <button type="button" class="btn btn-secondary" id="sig-clear">Clear</button>
                    <button type="button" class="btn btn-primary" id="sig-save" disabled>Save signature</button>
                </div>
                <button class="sheet-cancel" id="sig-cancel">Cancel</button>
            </div>
        `;

        document.body.appendChild(fondo);
        document.body.style.overflow = 'hidden';

        const canvas = fondo.querySelector('#sig-canvas');
        const guardar = fondo.querySelector('#sig-save');

        // El canvas necesita su tamaño final antes de configurar la escala
        requestAnimationFrame(() => {
            const lienzo = new Lienzo(canvas);

            canvas.addEventListener('trazo', () => {
                guardar.disabled = !lienzo.hayTrazo;
            });

            fondo.querySelector('#sig-clear').addEventListener('click', () => lienzo.limpiar());

            guardar.addEventListener('click', () => {
                const png = lienzo.aPNG();
                if (!png) return;
                almacen.guardar(campo, png);
                cerrar();
                alGuardar?.(png);
                window.PoliceToolsMobile?.haptics.success();
            });
        });

        const cerrar = () => {
            fondo.remove();
            document.body.style.overflow = '';
        };

        fondo.querySelector('#sig-cancel').addEventListener('click', cerrar);
        fondo.addEventListener('click', (e) => { if (e.target === fondo) cerrar(); });
    }

    // ============================================
    // INTEGRACION CON LOS FORMULARIOS
    // ============================================

    // Campos de la UI que son una firma
    const CAMPOS_FIRMA = [
        'sig1_sign', 'sig2_sign', 'sig3_sign',
        'operator_signature', 'supervisor_signature', 'desk_sergeant_signature'
    ];

    function etiquetaDe(input) {
        const grupo = input.closest('.form-group, .entry-field');
        const label = grupo?.querySelector('label');
        return label ? label.textContent.trim() : 'Signature';
    }

    /** Sustituye el input de texto por un boton de firma con vista previa. */
    function montarCampo(input) {
        if (input.dataset.sigMounted) return;
        input.dataset.sigMounted = '1';

        const campo = input.name || input.id;
        const etiqueta = etiquetaDe(input);

        const caja = document.createElement('div');
        caja.className = 'sig-field';

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'sig-btn';

        const borrar = document.createElement('button');
        borrar.type = 'button';
        borrar.className = 'sig-clear-btn';
        borrar.setAttribute('aria-label', 'Remove signature');
        borrar.innerHTML = '&times;';

        const pintar = () => {
            const png = almacen.obtener(campo);
            if (png) {
                boton.innerHTML = `<img src="${png}" alt="Signature"/>`;
                boton.classList.add('signed');
                borrar.hidden = false;
                // El payload del PDF sigue leyendo el input: se marca firmado
                input.value = input.value || 'signed';
            } else {
                boton.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M3 17c3 0 4-8 7-8s3 8 6 8 5-4 5-4"></path>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                    </svg>
                    <span>Tap to sign</span>`;
                boton.classList.remove('signed');
                borrar.hidden = true;
            }
        };

        boton.addEventListener('click', () => abrirModal(campo, etiqueta, pintar));

        borrar.addEventListener('click', () => {
            almacen.borrar(campo);
            if (input.value === 'signed') input.value = '';
            pintar();
        });

        input.parentNode.insertBefore(caja, input);
        caja.appendChild(boton);
        caja.appendChild(borrar);

        // El input sigue existiendo (el resto de la app lee su value) pero
        // deja de verse: la firma ya no se teclea.
        input.type = 'hidden';

        pintar();
    }

    function montarTodos(raiz) {
        (raiz || document).querySelectorAll('input').forEach(input => {
            const nombre = input.name || input.id || '';
            if (CAMPOS_FIRMA.includes(nombre)) montarCampo(input);
        });
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        montarTodos();

        // Los formularios se rellenan y reconstruyen al editar un reporte
        const obs = new MutationObserver(() => montarTodos());
        obs.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PoliceToolsSignature = { almacen, abrirModal, montarTodos, CAMPOS_FIRMA };
})();
