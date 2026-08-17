/**
 * PHOTOS - Police Tools App
 *
 * El propio formulario PMCS dice que los daños, rayones y niveles se anotan
 * en la inspeccion, pero solo habia una linea de texto para describirlos.
 * Con fotos queda constancia de que el daño ya estaba antes del turno, que
 * es lo que protege al operador.
 *
 * Las imagenes se comprimen y se añaden como paginas extra del PDF.
 */

(function () {
    'use strict';

    const CLAVE = 'policeTools_pmcsPhotos';
    const MAX_FOTOS = 8;
    const LADO_MAX = 1400;      // px del lado mayor tras redimensionar
    const CALIDAD = 0.72;

    const app = () => window.app;

    // ============================================
    // ALMACEN
    // ============================================
    const fotos = {
        todas() {
            try { return JSON.parse(localStorage.getItem(CLAVE) || '[]'); } catch (e) { return []; }
        },

        set(lista) {
            try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch (e) {
                app()?.showToast('No space left for more photos', 'error');
            }
        },

        añadir(foto) {
            const l = this.todas();
            if (l.length >= MAX_FOTOS) {
                app()?.showToast(`Maximum ${MAX_FOTOS} photos`, 'warning');
                return false;
            }
            l.push(foto);
            this.set(l);
            return true;
        },

        quitar(i) {
            const l = this.todas();
            l.splice(i, 1);
            this.set(l);
        },

        limpiar() {
            this.set([]);
        }
    };

    // ============================================
    // COMPRESION
    // ============================================
    /**
     * Redimensiona y recomprime la foto.
     *
     * Una foto de un movil actual ronda los 4 MB. Sin esto, dos fotos
     * llenarian el almacenamiento y harian el PDF inmanejable para enviarlo
     * por correo.
     */
    function comprimir(fichero) {
        return new Promise((resolve, reject) => {
            const lector = new FileReader();

            lector.onload = () => {
                const img = new Image();

                img.onload = () => {
                    let { width: w, height: h } = img;
                    const escala = Math.min(1, LADO_MAX / Math.max(w, h));
                    w = Math.round(w * escala);
                    h = Math.round(h * escala);

                    const c = document.createElement('canvas');
                    c.width = w;
                    c.height = h;
                    c.getContext('2d').drawImage(img, 0, 0, w, h);

                    resolve({
                        dataUrl: c.toDataURL('image/jpeg', CALIDAD),
                        ancho: w,
                        alto: h,
                        nombre: fichero.name || 'photo.jpg',
                        fecha: new Date().toISOString()
                    });
                };

                img.onerror = () => reject(new Error('No se pudo leer la imagen'));
                img.src = lector.result;
            };

            lector.onerror = () => reject(new Error('No se pudo abrir el archivo'));
            lector.readAsDataURL(fichero);
        });
    }

    // ============================================
    // INTERFAZ
    // ============================================
    function pintar() {
        const caja = document.getElementById('pmcs-photos');
        if (!caja) return;

        const lista = fotos.todas();

        caja.innerHTML = `
            <div class="ph-grid">
                ${lista.map((f, i) => `
                    <div class="ph-item">
                        <img src="${f.dataUrl}" alt="Damage photo ${i + 1}"/>
                        <button type="button" class="ph-del" data-i="${i}" aria-label="Remove photo">&times;</button>
                    </div>
                `).join('')}
                ${lista.length < MAX_FOTOS ? `
                    <button type="button" class="ph-add" id="ph-add">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <span>Add photo</span>
                    </button>` : ''}
            </div>
            <p class="section-note">${lista.length
                ? `${lista.length} photo${lista.length === 1 ? '' : 's'} will be attached to the PDF`
                : 'Photos of damage, scratches or fluid levels get attached to the PDF'}</p>
        `;

        caja.querySelector('#ph-add')?.addEventListener('click', () => {
            document.getElementById('ph-input')?.click();
        });

        caja.querySelectorAll('.ph-del').forEach(b => {
            b.addEventListener('click', () => {
                fotos.quitar(+b.dataset.i);
                pintar();
            });
        });
    }

    async function alElegir(e) {
        const ficheros = [...(e.target.files || [])];
        e.target.value = '';
        if (!ficheros.length) return;

        app()?.showLoading(true);
        let puestas = 0;

        for (const f of ficheros) {
            try {
                const foto = await comprimir(f);
                if (fotos.añadir(foto)) puestas++;
            } catch (err) {
                console.warn('[photos]', err.message);
            }
        }

        app()?.showLoading(false);
        pintar();

        if (puestas) {
            app()?.showToast(`${puestas} photo(s) added`, 'success');
            window.PoliceToolsMobile?.haptics.success();
        }
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        const vista = document.getElementById('pmcs-view');
        if (!vista || document.getElementById('pmcs-photos')) return;

        // Se coloca antes de la seccion de comentarios
        const secciones = [...vista.querySelectorAll('.form-section')];
        const remarks = secciones.find(s => /remark/i.test(s.querySelector('h3')?.textContent || ''));
        const destino = remarks || secciones[secciones.length - 1];
        if (!destino) return;

        const seccion = document.createElement('div');
        seccion.className = 'form-section';
        seccion.innerHTML = `
            <h3>Damage photos</h3>
            <div id="pmcs-photos"></div>
            <input type="file" id="ph-input" accept="image/*" capture="environment" multiple hidden/>
        `;
        destino.parentNode.insertBefore(seccion, destino);

        document.getElementById('ph-input').addEventListener('change', alElegir);
        pintar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 200));
    } else {
        setTimeout(init, 200);
    }

    window.PoliceToolsPhotos = { fotos, pintar, MAX_FOTOS };
})();
