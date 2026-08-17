/**
 * SALIDA DE FICHEROS - Police Tools
 *
 * Un unico camino para descargar, compartir y enviar por correo, con dos
 * implementaciones detras: la del navegador y la del APK.
 *
 * Por que hace falta: dentro del APK la app corre en un WebView de Android,
 * que no es Chrome. Le faltan justo las tres cosas que usaba la version web:
 *
 *   - navigator.share       no existe en WebView (es una API de Chrome).
 *   - <a download href=blob:>  el WebView no tiene gestor de descargas, asi
 *                              que el clic no hace nada y no da error.
 *   - <iframe src=*.pdf>    el WebView no trae visor de PDF: sale en blanco.
 *
 * De ahi que en el telefono Download, Share y Preview parecieran muertos: el
 * codigo se ejecutaba entero y sin excepciones, simplemente no pasaba nada.
 *
 * En nativo se resuelve con dos plugins de Capacitor: Filesystem escribe el
 * PDF en el disco de la app y Share lo pasa al selector de Android con su URI,
 * que es lo que Gmail, Drive o WhatsApp saben recibir. La vista previa se
 * dibuja con pdf.js sobre un canvas (js/pdf-view.js), que no depende del
 * visor del sistema y de paso funciona igual en el navegador.
 */

(function () {
    'use strict';

    const MIME = 'application/pdf';
    // Subcarpeta propia: los PDFs no se mezclan con el resto de Documentos
    const CARPETA = 'PoliceTools';

    function cap() {
        return window.Capacitor;
    }

    /** Dentro del APK. En el navegador Capacitor no existe. */
    function esNativo() {
        try {
            return !!(cap() && cap().isNativePlatform && cap().isNativePlatform());
        } catch (e) {
            return false;
        }
    }

    /**
     * Handle de un plugin nativo.
     *
     * Capacitor.Plugins solo se rellena si se carga el paquete JS del plugin,
     * que viene como modulo ES y esta app no tiene empaquetador. El puente
     * nativo expone registerPlugin, que es justo lo que hacen esos paquetes:
     * devuelve el proxy que llama a la implementacion Java. Asi se usan los
     * plugins sin build step.
     */
    const cacheProxies = {};

    function plugin(nombre) {
        if (cacheProxies[nombre] !== undefined) return cacheProxies[nombre];

        const c = cap();
        let p = null;

        if (c && c.Plugins && c.Plugins[nombre]) {
            p = c.Plugins[nombre];
        } else if (c && typeof c.registerPlugin === 'function') {
            try {
                p = c.registerPlugin(nombre);
            } catch (e) {
                console.warn('[file-out] No se pudo registrar', nombre, e.message);
            }
        }

        cacheProxies[nombre] = p;
        return p;
    }

    /**
     * Nombre de fichero valido en Android (y en cualquier sitio).
     * La extension se conserva tal cual: Android deduce el tipo de ella, y
     * cambiarla haria que el selector no ofreciera la app correcta.
     */
    function limpiarNombre(nombre) {
        const base = String(nombre || '')
            .replace(/[\\/:*?"<>|]+/g, '-')
            .replace(/\s+/g, ' ')
            .trim();
        if (!base) return 'documento.pdf';
        return /\.[a-z0-9]{2,5}$/i.test(base) ? base : `${base}.pdf`;
    }

    /**
     * Blob -> base64 sin cabecera. Filesystem de Capacitor solo acepta
     * cadenas: el puente entre JavaScript y Java pasa por JSON.
     */
    function aBase64(blob) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => {
                const res = String(fr.result);
                resolve(res.slice(res.indexOf(',') + 1));
            };
            fr.onerror = () => reject(fr.error || new Error('No se pudo leer el fichero'));
            fr.readAsDataURL(blob);
        });
    }

    // ============================================
    // ESCRITURA EN NATIVO
    // ============================================

    /**
     * Escribe el PDF y devuelve su URI nativa (content:// o file://).
     *
     * Cache para compartir: es privado, se limpia solo y el selector de
     * Android puede leerlo por el FileProvider que instala Capacitor.
     * Documents para descargar: queda visible en la app de Ficheros.
     */
    async function escribir(blob, nombre, directorio) {
        const Filesystem = plugin('Filesystem');
        if (!Filesystem) throw new Error('Filesystem no disponible');

        const path = `${CARPETA}/${limpiarNombre(nombre)}`;
        const data = await aBase64(blob);

        await Filesystem.writeFile({
            path,
            data,
            directory: directorio,
            recursive: true
        });

        const { uri } = await Filesystem.getUri({ path, directory: directorio });
        return uri;
    }

    /**
     * Documents es publico y lo ve la app de Ficheros, pero puede fallar por
     * permisos segun la version de Android. EXTERNAL (Android/data/<app>) no
     * necesita ninguno y sigue estando en la tarjeta.
     */
    async function escribirParaGuardar(blob, nombre) {
        for (const dir of ['DOCUMENTS', 'EXTERNAL', 'CACHE']) {
            try {
                return { uri: await escribir(blob, nombre, dir), dir };
            } catch (e) {
                console.warn(`[file-out] ${dir} no disponible:`, e.message);
            }
        }
        throw new Error('No se pudo escribir el fichero en el dispositivo');
    }

    const NOMBRE_DIR = {
        DOCUMENTS: `Documents/${CARPETA}`,
        EXTERNAL: `Android/data/…/${CARPETA}`,
        CACHE: 'almacenamiento temporal'
    };

    // ============================================
    // API PUBLICA
    // ============================================

    /**
     * Guarda el documento en el dispositivo.
     * items: [{ blob, nombre }]
     */
    async function descargar(items) {
        const lista = [].concat(items).filter(x => x && x.blob);
        if (!lista.length) throw new Error('Nada que descargar');

        if (esNativo()) {
            const rutas = [];
            for (const it of lista) {
                rutas.push(await escribirParaGuardar(it.blob, it.nombre));
            }
            // Si alguno acabo en un sitio peor, se informa del peor de todos
            const orden = ['DOCUMENTS', 'EXTERNAL', 'CACHE'];
            const peor = rutas.reduce((a, r) =>
                orden.indexOf(r.dir) > orden.indexOf(a) ? r.dir : a, 'DOCUMENTS');

            return {
                via: 'nativo',
                cantidad: lista.length,
                donde: NOMBRE_DIR[peor],
                uris: rutas.map(r => r.uri)
            };
        }

        for (const it of lista) {
            const url = URL.createObjectURL(it.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = limpiarNombre(it.nombre);
            document.body.appendChild(a);
            a.click();
            a.remove();
            // Revocar en el mismo tick cancela la descarga en algunos
            // navegadores: el enlace se lee despues del clic.
            setTimeout(() => URL.revokeObjectURL(url), 30000);
        }
        return { via: 'navegador', cantidad: lista.length, donde: 'Descargas' };
    }

    /**
     * Abre el selector del sistema con los documentos adjuntos.
     * Es el camino bueno para el correo: los pasa como adjuntos de verdad.
     */
    async function compartir(items, opciones = {}) {
        const lista = [].concat(items).filter(x => x && x.blob);
        if (!lista.length) throw new Error('Nada que compartir');

        const titulo = opciones.asunto || opciones.titulo || 'Police Tools';

        if (esNativo()) {
            const Share = plugin('Share');
            if (!Share) throw new Error('Share no disponible');

            const files = [];
            for (const it of lista) {
                // Cache: el fichero es temporal, solo tiene que vivir lo que
                // dure el envio.
                files.push(await escribir(it.blob, it.nombre, 'CACHE'));
            }

            // title acaba en EXTRA_SUBJECT, asi que Gmail abre con el asunto
            // ya puesto. text va en el cuerpo.
            await Share.share({
                title: titulo,
                text: opciones.cuerpo || '',
                files,
                dialogTitle: lista.length > 1
                    ? `Enviar ${lista.length} documentos`
                    : 'Enviar documento'
            });
            return { via: 'nativo', cantidad: lista.length };
        }

        // Navegador: Web Share con ficheros donde exista (Android/Chrome, iOS)
        if (navigator.share && navigator.canShare) {
            const files = lista.map(it => new File([it.blob], limpiarNombre(it.nombre),
                { type: it.blob.type || MIME }));
            if (navigator.canShare({ files })) {
                await navigator.share({ title: titulo, text: opciones.cuerpo || '', files });
                return { via: 'webshare', cantidad: lista.length };
            }
        }

        // Sin Web Share no hay forma de adjuntar nada: se descarga
        return { ...(await descargar(lista)), via: 'descarga' };
    }

    /** true si compartir va a adjuntar de verdad, en vez de descargar. */
    function puedeAdjuntar(cantidad = 1) {
        if (esNativo()) return !!plugin('Share');
        if (!navigator.share || !navigator.canShare) return false;
        try {
            const files = Array.from({ length: cantidad }, (_, i) =>
                new File([new Blob([new Uint8Array([37, 80, 68, 70])], { type: MIME })], `p${i}.pdf`, { type: MIME }));
            return navigator.canShare({ files });
        } catch (e) {
            return false;
        }
    }

    window.PTOut = { esNativo, puedeAdjuntar, descargar, compartir, limpiarNombre };
})();
