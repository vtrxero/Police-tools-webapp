/**
 * VISTA PREVIA DE PDF - Police Tools
 *
 * Dibuja el PDF pagina a pagina sobre canvas con pdf.js.
 *
 * Antes la vista previa era un <iframe src="blob:...">, que delega en el visor
 * de PDF del entorno. Chrome trae uno; el WebView de Android no. En el APK el
 * iframe salia completamente en blanco, sin error en consola: el modal se
 * abria vacio. Dibujandolo nosotros el resultado es el mismo en el telefono,
 * en el navegador y sin conexion.
 *
 * pdf.js va como modulo ES y se carga con import() la primera vez que se abre
 * una vista previa: son 400 KB mas el worker, y no hacen falta para arrancar.
 */

(function () {
    'use strict';

    // Rutas absolutas resueltas contra el documento.
    // Con una relativa, el import() dinamico de un script clasico se resuelve
    // contra la URL del propio script (js/), y buscaba js/vendor/pdf.min.mjs.
    const base = (ruta) => new URL(ruta, document.baseURI).href;

    const RUTA_LIB = base('vendor/pdf.min.mjs');
    const RUTA_WORKER = base('vendor/pdf.worker.min.mjs');
    const RUTA_FUENTES = base('vendor/pdfjs-fonts/');

    // Tope de resolucion: en un movil de 3x un folio a 1.5 de escala son
    // 3.500 px de alto por pagina. Pasado cierto punto no se nota y la
    // memoria del WebView si.
    const ESCALA_MAX = 2;

    let libreria = null;
    let cargando = null;

    async function lib() {
        if (libreria) return libreria;
        if (!cargando) {
            cargando = import(RUTA_LIB).then((mod) => {
                mod.GlobalWorkerOptions.workerSrc = RUTA_WORKER;
                libreria = mod;
                return mod;
            }).catch((e) => {
                cargando = null;
                throw e;
            });
        }
        return cargando;
    }

    /** Estado del visor abierto, para poder cerrarlo y liberar memoria. */
    let actual = null;

    async function cerrar() {
        if (!actual) return;
        const { doc, contenedor } = actual;
        actual = null;
        if (contenedor) contenedor.innerHTML = '';
        try {
            await doc.cleanup();
            await doc.destroy();
        } catch (e) { /* ya estaba cerrado */ }
    }

    /**
     * Pinta el PDF dentro de contenedor.
     * @param {HTMLElement} contenedor
     * @param {Blob|ArrayBuffer|Uint8Array} fuente
     */
    async function render(contenedor, fuente) {
        if (!contenedor) throw new Error('Falta el contenedor');

        await cerrar();
        contenedor.innerHTML = '<div class="pv-cargando">Loading document…</div>';

        const pdfjs = await lib();

        let datos;
        if (fuente instanceof Blob) datos = new Uint8Array(await fuente.arrayBuffer());
        else if (fuente instanceof ArrayBuffer) datos = new Uint8Array(fuente);
        else datos = fuente;

        const doc = await pdfjs.getDocument({
            data: datos,
            // Sin esto los campos rellenos con Helvetica no embebida salen
            // vacios: pdf.js necesita la fuente sustituta para dibujarlos.
            standardFontDataUrl: RUTA_FUENTES,
            // Los valores de los campos van en las apariencias del propio
            // documento, que es lo que se quiere ver.
            isEvalSupported: false
        }).promise;

        actual = { doc, contenedor };
        contenedor.innerHTML = '';

        const ancho = Math.max(contenedor.clientWidth || 0, 280);
        const dpr = Math.min(window.devicePixelRatio || 1, ESCALA_MAX);

        const cabecera = document.createElement('div');
        cabecera.className = 'pv-info';
        cabecera.textContent = doc.numPages === 1 ? '1 page' : `${doc.numPages} pages`;
        contenedor.appendChild(cabecera);

        // Las paginas se pintan en orden y de una en una: pintarlas todas a la
        // vez bloquea el hilo y en un PDF de 5 paginas se nota el tiron.
        for (let n = 1; n <= doc.numPages; n++) {
            if (!actual || actual.doc !== doc) return;   // se cerro mientras se pintaba

            const pagina = await doc.getPage(n);
            const base = pagina.getViewport({ scale: 1 });
            const escala = ancho / base.width;
            const vista = pagina.getViewport({ scale: escala * dpr });

            const hoja = document.createElement('div');
            hoja.className = 'pv-hoja';

            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(vista.width);
            canvas.height = Math.floor(vista.height);
            // Ancho en CSS: el canvas se pinta a dpr y se muestra a 1x
            canvas.style.width = '100%';
            canvas.style.height = 'auto';
            hoja.appendChild(canvas);

            const num = document.createElement('span');
            num.className = 'pv-num';
            num.textContent = n;
            hoja.appendChild(num);

            contenedor.appendChild(hoja);

            await pagina.render({
                canvasContext: canvas.getContext('2d', { alpha: false }),
                viewport: vista,
                background: '#ffffff'
            }).promise;

            pagina.cleanup();
        }

        return { paginas: doc.numPages };
    }

    window.PTPdfView = { render, cerrar };
})();
