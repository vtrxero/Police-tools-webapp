/**
 * DATA I/O - Police Tools App
 *
 * Dos cosas que la app no tenia y que dependen de lo mismo (sacar datos
 * del dispositivo):
 *
 *   1. Copia de seguridad. Todo vive en localStorage. Si se borran los
 *      datos del navegador, se reinstala la PWA o iOS libera espacio
 *      (lo hace con sitios que no se abren en 7 dias), se pierde todo sin
 *      forma de recuperarlo.
 *
 *   2. Envio de varios documentos por correo. mailto: no admite adjuntos,
 *      asi que el camino bueno en movil es la API de compartir con
 *      ficheros, que si los pasa a Gmail, Outlook o Mail.
 */

(function () {
    'use strict';

    const CLAVE_DESTINATARIOS = 'policeTools_mailTo';
    const CLAVE_COPIA_CC = 'policeTools_mailCc';
    const CLAVE_ULTIMA_COPIA = 'policeTools_lastBackup';
    const CLAVE_AUTO_FECHA = 'policeTools_autoBackupAt';
    const CLAVE_AUTO_FIRMA = 'policeTools_autoBackupSig';

    // Las tres claves que escriben las propias copias. Se dejan fuera de
    // la huella: si contaran, guardar la huella cambiaria el tamaño y la
    // copia siguiente se dispararia sola en bucle.
    const CLAVES_BITACORA = new Set([CLAVE_ULTIMA_COPIA, CLAVE_AUTO_FECHA, CLAVE_AUTO_FIRMA]);

    const app = () => window.app;

    // ============================================
    // CIFRADO DE LA COPIA
    // ============================================
    /*
     * La copia lleva nombres de entrevistados, direcciones y MIDs, y es
     * justo el fichero que sale del telefono: se manda a Drive, al correo o
     * a un pendrive. Iba en claro, asi que cualquiera que lo tuviera lo
     * abria con un editor de texto. La app se molesta en pedir un PIN para
     * ver esos mismos datos en pantalla.
     *
     * AES-GCM con clave derivada de una frase por PBKDF2, las mismas 210.000
     * iteraciones que usa el PIN en js/lock.js. GCM y no CBC porque trae
     * autenticacion: un fichero manipulado falla al descifrar en vez de
     * devolver basura que luego se escribiria en localStorage.
     *
     * La frase NO se guarda en ninguna parte. Si se pierde, la copia no se
     * recupera — de ahi que el aviso al exportar sea explicito.
     *
     * La copia automatica de Documents sigue en claro, y es deliberado: para
     * cifrarla sola habria que dejar la frase guardada en el mismo
     * dispositivo donde esta el fichero, lo que no protege de nada. Esa copia
     * existe para sobrevivir a una desinstalacion, y cifrarla con una frase
     * que se pueda olvidar convertiria la ultima red de seguridad en un
     * fichero inservible. Ver ANDROID.md.
     */
    const FORMATO_CLARO = 'police-tools-backup';
    const FORMATO_CIFRADO = 'police-tools-backup-encrypted';
    const ITERACIONES = 210000;
    const MIN_FRASE = 8;

    function aB64(bytes) {
        let s = '';
        const b = new Uint8Array(bytes);
        // De a trozos: con un array de megabytes, String.fromCharCode(...b)
        // desborda la pila de argumentos.
        for (let i = 0; i < b.length; i += 8192) {
            s += String.fromCharCode.apply(null, b.subarray(i, i + 8192));
        }
        return btoa(s);
    }

    function deB64(texto) {
        const s = atob(texto);
        const b = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
        return b;
    }

    async function derivarClave(frase, sal, iteraciones = ITERACIONES) {
        const base = await crypto.subtle.importKey(
            'raw', new TextEncoder().encode(frase), { name: 'PBKDF2' }, false, ['deriveKey']
        );
        return await crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: sal, iterations: iteraciones, hash: 'SHA-256' },
            base,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    /**
     * Envuelve la copia en un sobre cifrado.
     *
     * La cabecera va en claro a proposito: sal, iteraciones y algoritmo hacen
     * falta para poder descifrar, y no son secretos. Lo que no aparece es la
     * frase ni nada derivado de ella.
     */
    async function cifrarCopia(copia, frase) {
        const sal = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const clave = await derivarClave(frase, sal);

        const plano = new TextEncoder().encode(JSON.stringify(copia));
        const cifrado = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, clave, plano);

        return {
            formato: FORMATO_CIFRADO,
            version: 1,
            creado: copia.creado,
            edicion: window.PTEdition?.firma?.() || 'Police Tools',
            kdf: { algoritmo: 'PBKDF2-SHA256', iteraciones: ITERACIONES, sal: aB64(sal) },
            cifra: { algoritmo: 'AES-GCM-256', iv: aB64(iv) },
            contenido: aB64(cifrado)
        };
    }

    async function descifrarCopia(sobre, frase) {
        const sal = deB64(sobre.kdf?.sal || '');
        const iv = deB64(sobre.cifra?.iv || '');
        const clave = await derivarClave(frase, sal, sobre.kdf?.iteraciones || ITERACIONES);

        let plano;
        try {
            plano = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv }, clave, deB64(sobre.contenido || ''));
        } catch (e) {
            // GCM no distingue frase mala de fichero manipulado: las dos
            // cosas fallan la autenticacion. Se dice lo probable.
            throw new Error('Wrong password, or the file is damaged');
        }

        return JSON.parse(new TextDecoder().decode(plano));
    }


    // ============================================
    // MODAL DE LA FRASE
    // ============================================
    /**
     * Pide la frase y devuelve { frase } , { claro: true } o null si se
     * cancela.
     *
     * Con un prompt() del navegador bastaria en web, pero en el WebView del
     * APK los dialogos de JavaScript dependen de que el host los implemente,
     * y no se puede escribir en ellos con el teclado del sistema de forma
     * fiable. El modal es de la propia app, asi que se comporta igual en los
     * dos sitios.
     */
    function pedirFrase({ modo = 'exportar' } = {}) {
        const modal = document.getElementById('backup-pass-modal');
        if (!modal) return Promise.resolve(null);

        const pass = document.getElementById('bp-pass');
        const repetir = document.getElementById('bp-repeat');
        const grupoRepetir = document.getElementById('bp-repeat-group');
        const error = document.getElementById('bp-error');
        const titulo = document.getElementById('bp-title');
        const nota = document.getElementById('bp-note');
        const btnOk = document.getElementById('bp-ok');
        const btnClaro = document.getElementById('bp-plain');
        const btnCancelar = document.getElementById('bp-cancel');

        const importando = modo === 'importar';

        if (titulo) titulo.textContent = importando ? 'Encrypted backup' : 'Protect this backup';
        if (nota) {
            nota.textContent = importando
                ? 'This backup is encrypted. Enter the password it was saved with.'
                : 'The backup contains names, addresses and MIDs. With a password the '
                  + 'file is unreadable without it \u2014 and unrecoverable if you forget '
                  + 'it. Nothing stores it.';
        }
        if (grupoRepetir) grupoRepetir.hidden = importando;
        if (btnClaro) btnClaro.hidden = importando;
        if (btnOk) btnOk.textContent = importando ? 'Decrypt and restore' : 'Encrypt and save';
        if (pass) pass.value = '';
        if (repetir) repetir.value = '';
        if (error) { error.hidden = true; error.textContent = ''; }

        modal.classList.add('active');
        app()?.abrirCapa?.();
        setTimeout(() => pass?.focus(), 120);

        return new Promise((resolver) => {
            function cerrar(resultado) {
                modal.classList.remove('active');
                btnOk?.removeEventListener('click', alAceptar);
                btnClaro?.removeEventListener('click', alClaro);
                btnCancelar?.removeEventListener('click', alCancelar);
                modal.removeEventListener('click', alFondo);
                pass?.removeEventListener('keydown', alEnter);
                repetir?.removeEventListener('keydown', alEnter);
                // La frase no se queda en el DOM despues de usarla
                if (pass) pass.value = '';
                if (repetir) repetir.value = '';
                resolver(resultado);
            }

            function fallar(mensaje) {
                if (!error) return;
                error.textContent = mensaje;
                error.hidden = false;
            }

            function alAceptar() {
                const frase = pass?.value || '';
                if (!importando) {
                    if (frase.length < MIN_FRASE) {
                        fallar(`At least ${MIN_FRASE} characters. This one protects `
                             + 'names and MIDs leaving the device.');
                        return;
                    }
                    if (frase !== (repetir?.value || '')) {
                        fallar('The two passwords do not match.');
                        return;
                    }
                } else if (!frase) {
                    fallar('Enter the password.');
                    return;
                }
                cerrar({ frase });
            }

            function alClaro() {
                if (!confirm(
                    'Save the backup unencrypted?\n\n'
                    + 'It will contain names, addresses and MIDs in plain text, readable '
                    + 'by anyone who gets the file.'
                )) return;
                cerrar({ claro: true });
            }

            function alCancelar() { cerrar(null); }
            function alFondo(e) { if (e.target === modal) cerrar(null); }
            function alEnter(e) { if (e.key === 'Enter') { e.preventDefault(); alAceptar(); } }

            btnOk?.addEventListener('click', alAceptar);
            btnClaro?.addEventListener('click', alClaro);
            btnCancelar?.addEventListener('click', alCancelar);
            modal.addEventListener('click', alFondo);
            pass?.addEventListener('keydown', alEnter);
            repetir?.addEventListener('keydown', alEnter);
        });
    }

    // ============================================
    // UTILIDADES
    // ============================================
    function leer(clave, porDefecto = '') {
        try { return localStorage.getItem(clave) || porDefecto; } catch (e) { return porDefecto; }
    }

    function guardar(clave, valor) {
        try { localStorage.setItem(clave, valor); } catch (e) {}
    }

    /**
     * Guarda el fichero. Detras esta PTOut, que en el APK escribe con
     * Filesystem: en un WebView el truco de <a download> no descarga nada.
     */
    async function descargar(blob, nombre) {
        return await window.PTOut.descargar([{ blob, nombre }]);
    }

    /**
     * "a@x.mil, b@x.mil; c@x.mil" -> ["a@x.mil", "b@x.mil", "c@x.mil"]
     *
     * El intent de Android quiere un array; el campo de la hoja de envio es
     * una sola linea, y ahi la gente separa con coma o con punto y coma
     * indistintamente.
     */
    function listaDirecciones(texto) {
        return String(texto || '')
            .split(/[,;\s]+/)
            .map(x => x.trim())
            .filter(Boolean);
    }

    function fechaArchivo() {
        return new Date().toISOString().split('T')[0];
    }

    /** Obtiene el PDF de un reporte como File, venga del store o de base64. */
    async function reporteAFichero(reporte) {
        let blob = app() ? await app().getReportBlob(reporte) : null;
        if (!blob) return null;

        // Lo que se manda por correo va aplanado: el que lo recibe lo imprime,
        // y con los campos de formulario la hoja sale con las lineas y sin los
        // datos. El archivado se queda editable.
        if (app()?.paraSalir) blob = await app().paraSalir(blob);
        return new File([blob], reporte.filename || 'documento.pdf', { type: 'application/pdf' });
    }

    function blobABase64(blob) {
        return new Promise((resolve) => {
            const r = new FileReader();
            r.onloadend = () => resolve(r.result);
            r.onerror = () => resolve(null);
            r.readAsDataURL(blob);
        });
    }

    // ============================================
    // COPIA DE SEGURIDAD
    // ============================================
    const backup = {
        /**
         * Recoge todo lo que la app guarda en el dispositivo.
         *
         * Los PDFs viven en IndexedDB desde que dejaron de caber en
         * localStorage, asi que hay que sacarlos aparte o la copia
         * restauraria las fichas sin los documentos.
         */
        async recopilar({ incluirPDFs = true } = {}) {
            const datos = {};
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const clave = localStorage.key(i);
                    if (!clave) continue;
                    datos[clave] = localStorage.getItem(clave);
                }
            } catch (e) {}

            const pdfs = {};
            if (incluirPDFs && window.PoliceToolsStore) {
                const ids = await window.PoliceToolsStore.listarIds();
                for (const id of ids) {
                    const blob = await window.PoliceToolsStore.obtener(id);
                    if (blob) {
                        const b64 = await blobABase64(blob);
                        if (b64) pdfs[id] = b64;
                    }
                }
            }

            return {
                formato: 'police-tools-backup',
                version: 3,
                creado: new Date().toISOString(),
                dispositivo: navigator.userAgent,
                datos,
                pdfs
            };
        },

        /**
         * Tamaño aproximado de lo guardado, para enseñarlo en ajustes.
         *
         * omitir sirve para la huella de la copia automatica: las claves que
         * la propia copia escribe no pueden contar, o cada copia cambiaria el
         * tamaño y la siguiente se creeria que hay algo nuevo.
         */
        tamano(omitir = null) {
            let bytes = 0;
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const clave = localStorage.key(i);
                    if (omitir && omitir.has(clave)) continue;
                    bytes += (clave || '').length + (localStorage.getItem(clave) || '').length;
                }
            } catch (e) {}
            return bytes;
        },

        async exportar({ incluirPDFs = true, frase = undefined } = {}) {
            /*
             * La frase se pide ANTES de recopilar.
             *
             * Recopilar lee todos los PDFs de IndexedDB y los pasa a base64:
             * son decenas de MB y varios segundos. Preguntando despues, quien
             * cancelara en el dialogo habria esperado todo ese trabajo para
             * nada, y con la copia ya montada en memoria.
             */
            if (frase === undefined) {
                const r = await pedirFrase({ modo: 'exportar' });
                if (!r) return;                       // cancelado
                frase = r.claro ? null : r.frase;
            }

            app()?.showLoading(true);
            const copia = await this.recopilar({ incluirPDFs });

            let json;
            if (frase) {
                // Cifrar 20 MB de base64 no es instantaneo; el overlay de
                // carga sigue puesto mientras dura.
                json = JSON.stringify(await cifrarCopia(copia, frase));
            } else {
                json = JSON.stringify(copia);
            }
            app()?.showLoading(false);

            const blob = new Blob([json], { type: 'application/json' });
            const nombre = `${window.PTEdition?.prefijoFichero || 'PoliceTools'}_Backup_${
                fechaArchivo()}${frase ? '_encrypted' : ''}.json`;

            const mb = blob.size / 1048576;
            const tam = mb >= 1 ? `${mb.toFixed(1)} MB` : `${(blob.size / 1024).toFixed(0)} KB`;

            // Una copia que se queda en el mismo telefono no protege de nada:
            // si el telefono se pierde o se borra, se va con el. En el APK se
            // abre el selector para poder mandarla a Drive o al correo; el
            // navegador ya descarga a una carpeta que se sincroniza.
            try {
                if (window.PTOut.esNativo()) {
                    await window.PTOut.compartir([{ blob, nombre }], {
                        asunto: `Police Tools backup — ${fechaArchivo()}`,
                        cuerpo: `Backup of Police Tools (${tam}). ${frase
                            ? 'Encrypted: it needs the password to open.'
                            : 'NOT encrypted: it holds names and MIDs in plain text.'
                            } Keep it somewhere safe.`
                    });
                } else {
                    await descargar(blob, nombre);
                }
            } catch (e) {
                if (e && e.name === 'AbortError') return;
                // Si el selector falla, al menos que quede el fichero
                await descargar(blob, nombre);
            }

            guardar(CLAVE_ULTIMA_COPIA, new Date().toISOString());
            app()?.showToast(
                frase ? `Encrypted backup saved (${tam})` : `Backup saved (${tam})`,
                'success');
            this.actualizarEstado();
        },

        /**
         * Restaura una copia.
         *
         * Por defecto fusiona: las claves de la copia sobreescriben las
         * actuales y lo que no este en la copia se conserva. Reemplazar del
         * todo borraria los reportes creados despues de hacerla.
         */
        async importar(fichero, { reemplazar = false, frase = undefined } = {}) {
            const texto = await fichero.text();

            let copia;
            try {
                copia = JSON.parse(texto);
            } catch (e) {
                throw new Error('El archivo no es una copia valida (JSON ilegible)');
            }

            /*
             * Una copia cifrada se reconoce por el formato del sobre y se
             * abre antes de seguir. Las copias en claro de siempre —las que
             * ya tenga guardadas de la version original— entran igual: el
             * cifrado se anade, no sustituye al formato anterior.
             */
            if (copia.formato === FORMATO_CIFRADO) {
                if (frase === undefined) {
                    const r = await pedirFrase({ modo: 'importar' });
                    if (!r) return null;              // cancelado
                    frase = r.frase;
                }
                copia = await descifrarCopia(copia, frase);
            }

            if (copia.formato !== FORMATO_CLARO || !copia.datos) {
                throw new Error('El archivo no es una copia de Police Tools');
            }

            if (reemplazar) {
                try { localStorage.clear(); } catch (e) {}
            }

            let restauradas = 0;
            for (const [clave, valor] of Object.entries(copia.datos)) {
                try {
                    localStorage.setItem(clave, valor);
                    restauradas++;
                } catch (e) {
                    // Cuota llena: se avisa al terminar
                }
            }

            // Copias de la version 2 traian los PDFs dentro de los reportes;
            // desde la 3 vienen aparte porque ya no caben en localStorage.
            let pdfs = 0;
            if (copia.pdfs && window.PoliceToolsStore) {
                for (const [id, dataUrl] of Object.entries(copia.pdfs)) {
                    try {
                        await window.PoliceToolsStore.guardar(id, dataUrl);
                        pdfs++;
                    } catch (e) {}
                }
            }

            return { restauradas, pdfs, creado: copia.creado };
        },

        /**
         * Huella de lo que hay guardado. Si no cambia, no hay nada nuevo que
         * copiar: recopilar() lee todos los PDFs de IndexedDB y los pasa a
         * base64, que con diez documentos son ~25 MB. Hacerlo en cada arranque
         * seria gastar bateria para reescribir lo mismo.
         */
        firma() {
            const r = app()?.dailyReports || [];
            const turnos = app()?.savedData?.shifts || [];
            return `${r.length}:${r[0]?.id || ''}:${turnos.length}:${this.tamano(CLAVES_BITACORA)}`;
        },

        /**
         * Copia automatica a Documents/<carpeta de la edicion>.
         *
         * Es la unica que sobrevive a una desinstalacion. Los reportes y los
         * PDFs viven en el almacenamiento interno de la app, y desinstalar lo
         * borra entero; Documents es del telefono y no se toca. Si algun dia
         * hay que reinstalar desde cero, el fichero sigue ahi para importarlo.
         *
         * Silenciosa a proposito: no avisa ni interrumpe. Solo en el APK,
         * porque en el navegador no se puede escribir en disco sin pedirlo.
         */
        async automatica({ forzar = false } = {}) {
            if (!window.PTOut?.esNativo?.()) return null;

            const firma = this.firma();
            if (!forzar && leer(CLAVE_AUTO_FIRMA) === firma) return null;

            // Sin nada guardado no hay copia que hacer
            if (!(app()?.dailyReports || []).length) return null;

            try {
                const copia = await this.recopilar({ incluirPDFs: true });
                const blob = new Blob([JSON.stringify(copia)], { type: 'application/json' });

                // Nombre fijo: se sobreescribe en vez de acumular un fichero
                // de 25 MB por cada cambio hasta llenar el telefono.
                const uri = await window.PTOut.guardarEnDocumentos(
                    blob, window.PTEdition?.ficheroAutoBackup
                        || 'PoliceTools_AutoBackup.json');
                if (!uri) return null;

                guardar(CLAVE_AUTO_FECHA, new Date().toISOString());
                guardar(CLAVE_AUTO_FIRMA, firma);
                this.actualizarEstado();
                return { uri, bytes: blob.size };
            } catch (e) {
                console.warn('[data-io] copia automatica fallida:', e.message);
                return null;
            }
        },

        async actualizarEstado() {
            const el = document.getElementById('backup-status');
            if (!el) return;

            const ultima = leer(CLAVE_ULTIMA_COPIA);
            const enStore = window.PoliceToolsStore
                ? await window.PoliceToolsStore.tamanoTotal() : 0;
            const total = this.tamano() + enStore;
            const kb = total >= 1048576
                ? `${(total / 1048576).toFixed(1)} MB`
                : `${(total / 1024).toFixed(0)} KB`;

            if (!ultima) {
                el.innerHTML = `<b class="warn">No backup yet</b><span>${kb} stored on this device only</span>`;
                return;
            }

            const f = new Date(ultima);
            const dias = Math.floor((Date.now() - f.getTime()) / 86400000);
            const cuando = dias === 0 ? 'today' : (dias === 1 ? 'yesterday' : `${dias} days ago`);
            const clase = dias > 14 ? ' class="warn"' : '';

            el.innerHTML = `<b${clase}>Last backup ${cuando}</b><span>${kb} stored · ${f.toLocaleDateString()}</span>`;

            // La copia automatica es la red de seguridad: se dice donde esta
            // para que se pueda encontrar sin la app instalada.
            const auto = leer(CLAVE_AUTO_FECHA);
            if (auto && window.PTOut?.esNativo?.()) {
                const fa = new Date(auto);
                const linea = document.createElement('span');
                linea.className = 'auto-backup';
                // Se dice que esa copia va en claro. Es la que sobrevive a
                // una desinstalacion y por eso no se cifra (haria falta
                // guardar la frase en el mismo telefono), asi que quien la
                // tenga tiene los datos: mejor saberlo que suponerlo.
                linea.textContent =
                    `Auto-copy in Documents/${window.PTEdition?.carpeta
                        || 'PoliceTools'} · ${fa.toLocaleDateString()} ${
                        fa.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        } · not encrypted`;
                el.appendChild(linea);
            }
        }
    };

    // ============================================
    // ENVIO POR CORREO
    // ============================================
    const email = {
        get destinatarios() { return leer(CLAVE_DESTINATARIOS); },
        set destinatarios(v) { guardar(CLAVE_DESTINATARIOS, v); },

        get copia() { return leer(CLAVE_COPIA_CC); },
        set copia(v) { guardar(CLAVE_COPIA_CC, v); },

        /** Asunto a partir de los documentos elegidos. */
        asunto(reportes) {
            const tipos = [...new Set(reportes.map(r => this.nombreTipo(r.type)))];
            const fechas = [...new Set(reportes.map(r => (r.formDate || r.date || '').split('T')[0]).filter(Boolean))];

            const parteTipo = tipos.length === 1 ? tipos[0]
                : (tipos.length <= 3 ? tipos.join(' + ') : `${reportes.length} documents`);
            const parteFecha = fechas.length === 1 ? fechas[0]
                : (fechas.length ? `${fechas[fechas.length - 1]} to ${fechas[0]}` : fechaArchivo());

            return `${parteTipo} — ${parteFecha}`;
        },

        nombreTipo(t) {
            return ({
                patrol: 'Patrol Log',
                pmcs: 'PMCS',
                guardmount: 'Guard Mount',
                interview: 'Interview'
            })[t] || 'Report';
        },

        /** Cuerpo con el detalle de lo que se adjunta. */
        cuerpo(reportes, conAviso) {
            const lineas = reportes.map(r => {
                const fecha = (r.formDate || r.date || '').split('T')[0];
                return `  · ${this.nombreTipo(r.type)}${fecha ? ' — ' + fecha : ''}  (${r.filename})`;
            });

            let texto = `${reportes.length} document${reportes.length === 1 ? '' : 's'} attached:\n\n${lineas.join('\n')}\n`;

            if (conAviso) {
                texto += `\n---\nThe documents were downloaded to this device. ` +
                         `Attach them to this email before sending.\n`;
            }

            texto += `\nSent from Police Tools.`;
            return texto;
        },

        /**
         * Envia los documentos.
         *
         * En movil se usa la API de compartir con ficheros, que si los pasa
         * como adjuntos a la app de correo. Cuando no esta disponible se
         * descarga un ZIP y se abre el borrador con mailto:, avisando de que
         * hay que adjuntarlo a mano, porque mailto: no admite adjuntos.
         */
        async enviar(reportes, { para, cc } = {}) {
            if (!reportes.length) {
                app()?.showToast('No documents selected', 'warning');
                return;
            }

            const ficheros = (await Promise.all(reportes.map(reporteAFichero))).filter(Boolean);
            if (!ficheros.length) {
                app()?.showToast('Could not read the saved PDFs', 'error');
                return;
            }

            const asunto = this.asunto(reportes);
            const items = ficheros.map(f => ({ blob: f, nombre: f.name }));

            // 1. Correo nativo: el unico camino que lleva el destinatario
            //    puesto y los PDFs adjuntos a la vez.
            //
            //    El plugin Share de Capacitor no tiene destinatario, asi que
            //    el correo se abria con los adjuntos y el campo Para en
            //    blanco por mucho que en Ajustes hubiera una direccion
            //    guardada: no tenia por donde llegar. Y mailto:, que si lleva
            //    destinatario, no admite adjuntos.
            if (window.PTOut.puedeDirigirCorreo?.()) {
                try {
                    const r = await window.PTOut.correo(items, {
                        para: listaDirecciones(para),
                        cc: listaDirecciones(cc),
                        asunto,
                        cuerpo: this.cuerpo(reportes, false)
                    });
                    if (r) {
                        app()?.showToast(
                            r.via === 'correo'
                                ? `${ficheros.length} document(s) ready to send`
                                : `${ficheros.length} document(s) attached`,
                            'success');
                        return { metodo: 'correo', via: r.via };
                    }
                } catch (e) {
                    console.warn('[data-io] correo nativo fallo, se comparte:', e.message);
                }
            }

            // 2. Compartir con ficheros: adjunta de verdad, pero sin
            //    destinatario. En el APK lo hace el plugin Share de Capacitor
            //    y en el navegador la Web Share API.
            if (window.PTOut.puedeAdjuntar(items.length)) {
                try {
                    await window.PTOut.compartir(items, {
                        asunto,
                        cuerpo: this.cuerpo(reportes, false)
                    });
                    app()?.showToast(`${ficheros.length} document(s) sent`, 'success');
                    return { metodo: 'share' };
                } catch (e) {
                    // El usuario cancelo: no hay que caer al plan B
                    if (e && (e.name === 'AbortError' || /cancel/i.test(e.message || ''))) {
                        return { metodo: 'cancelado' };
                    }
                    console.warn('[data-io] Compartir fallo, se usa mailto:', e.message);
                }
            }

            // 3. ZIP + borrador de correo
            await this.porMailto(reportes, ficheros, asunto, para, cc);
            return { metodo: 'mailto' };
        },

        async porMailto(reportes, ficheros, asunto, para, cc) {
            // Descargar primero, para que el adjunto ya este cuando se abra
            // el cliente de correo
            if (ficheros.length === 1) {
                await descargar(ficheros[0], ficheros[0].name);
            } else if (typeof JSZip !== 'undefined') {
                const zip = new JSZip();
                ficheros.forEach(f => zip.file(f.name, f));
                const blob = await zip.generateAsync({ type: 'blob' });
                await descargar(blob, `PoliceTools_${fechaArchivo()}.zip`);
            } else {
                for (const f of ficheros) await descargar(f, f.name);
            }

            const params = new URLSearchParams();
            params.set('subject', asunto);
            params.set('body', this.cuerpo(reportes, true));
            if (cc) params.set('cc', cc);

            // URLSearchParams codifica el espacio como '+', que en mailto se
            // interpreta literal
            const query = params.toString().replace(/\+/g, '%20');
            window.location.href = `mailto:${encodeURIComponent(para || '')}?${query}`;

            app()?.showToast('Attach the downloaded file to the email', 'info');
        }
    };

    // ============================================
    // HOJA DE ENVIO
    // ============================================
    function abrirHojaEnvio(reportes) {
        const anterior = document.getElementById('email-sheet');
        if (anterior) anterior.remove();

        const asunto = email.asunto(reportes);
        const lista = reportes.map(r => {
            const fecha = (r.formDate || r.date || '').split('T')[0];
            return `<li><b>${email.nombreTipo(r.type)}</b>${fecha ? ' <span>' + fecha + '</span>' : ''}</li>`;
        }).join('');

        const fondo = document.createElement('div');
        fondo.className = 'sheet-backdrop';
        fondo.id = 'email-sheet';
        fondo.innerHTML = `
            <div class="sheet">
                <div class="sheet-handle"></div>
                <h3>Email ${reportes.length} document${reportes.length === 1 ? '' : 's'}</h3>

                <ul class="email-list">${lista}</ul>

                <div class="form-group">
                    <label for="email-to">To</label>
                    <input type="email" id="email-to" inputmode="email" autocapitalize="none"
                           autocorrect="off" spellcheck="false"
                           placeholder="supervisor@example.mil" value="${email.destinatarios}"/>
                </div>

                <div class="form-group">
                    <label for="email-cc">Cc <span class="opt">optional</span></label>
                    <input type="email" id="email-cc" inputmode="email" autocapitalize="none"
                           autocorrect="off" spellcheck="false" value="${email.copia}"/>
                </div>

                <div class="form-group">
                    <label for="email-subject">Subject</label>
                    <input type="text" id="email-subject" value="${asunto.replace(/"/g, '&quot;')}"/>
                </div>

                <label class="email-remember">
                    <input type="checkbox" id="email-remember" checked/>
                    <span>Remember these addresses</span>
                </label>

                <button class="btn btn-primary" id="email-send">Send</button>
                <button class="sheet-cancel" id="email-cancel">Cancel</button>
            </div>
        `;

        document.body.appendChild(fondo);
        document.body.style.overflow = 'hidden';
        app()?.abrirCapa?.();

        const cerrar = () => {
            fondo.remove();
            document.body.style.overflow = '';
        };

        fondo.addEventListener('click', (e) => { if (e.target === fondo) cerrar(); });
        fondo.querySelector('#email-cancel').addEventListener('click', cerrar);

        fondo.querySelector('#email-send').addEventListener('click', async () => {
            const para = fondo.querySelector('#email-to').value.trim();
            const cc = fondo.querySelector('#email-cc').value.trim();
            const recordar = fondo.querySelector('#email-remember').checked;

            if (recordar) {
                email.destinatarios = para;
                email.copia = cc;
            }

            cerrar();
            app()?.showLoading(true);
            try {
                await email.enviar(reportes, { para, cc });
                app()?.clearSelection();
            } catch (e) {
                app()?.showToast('Could not send: ' + e.message, 'error');
            } finally {
                app()?.showLoading(false);
            }
        });
    }

    // ============================================
    // AJUSTES
    // ============================================
    function montarAjustes() {
        backup.actualizarEstado();

        document.getElementById('backup-export')?.addEventListener('click', () => backup.exportar());

        const entrada = document.getElementById('backup-file');
        document.getElementById('backup-import')?.addEventListener('click', () => entrada?.click());

        entrada?.addEventListener('change', async (e) => {
            const fichero = e.target.files?.[0];
            if (!fichero) return;
            e.target.value = '';

            if (!confirm(
                'Restore this backup?\n\n' +
                'Data in the backup replaces what is on this device. ' +
                'Anything created after the backup is kept.'
            )) return;

            app()?.showLoading(true);
            try {
                const r = await backup.importar(fichero);
                // null = se cancelo el dialogo de la contrasena. No es un
                // error y no hay nada restaurado que anunciar.
                if (!r) return;
                app()?.showToast(
                    `Restored ${r.restauradas} entries` + (r.pdfs ? ` and ${r.pdfs} PDFs` : ''),
                    'success'
                );
                setTimeout(() => window.location.reload(), 1200);
            } catch (err) {
                app()?.showToast(err.message, 'error');
            } finally {
                app()?.showLoading(false);
            }
        });

        // Destinatarios por defecto
        const to = document.getElementById('default-mail-to');
        const cc = document.getElementById('default-mail-cc');
        if (to) {
            to.value = email.destinatarios;
            to.addEventListener('change', () => { email.destinatarios = to.value.trim(); });
        }
        if (cc) {
            cc.value = email.copia;
            cc.addEventListener('change', () => { email.copia = cc.value.trim(); });
        }
    }

    // ============================================
    // INICIO
    // ============================================
    /*
     * Copia automatica con retardo.
     *
     * Se espera un poco a proposito: guardar un documento ya hace trabajo
     * pesado (generar el PDF, escribirlo en IndexedDB), y encadenar ahi la
     * lectura de todos los PDFs para la copia dejaria la app trabada justo
     * despues de tocar Guardar.
     */
    let pendiente = null;

    function programarCopiaAutomatica(retardo = 8000) {
        clearTimeout(pendiente);
        pendiente = setTimeout(() => backup.automatica(), retardo);
    }

    function init() {
        montarAjustes();

        document.addEventListener('reportschanged', () => programarCopiaAutomatica());
        document.addEventListener('shiftschanged', () => programarCopiaAutomatica());

        // Y una al arrancar, por si la anterior quedo a medias
        programarCopiaAutomatica(20000);

        // Recordar hacer copia si hace mas de dos semanas de la ultima
        const ultima = leer(CLAVE_ULTIMA_COPIA);
        const hayDatos = backup.tamano() > 4096;
        const vieja = !ultima || (Date.now() - new Date(ultima).getTime()) > 14 * 86400000;

        if (hayDatos && vieja) {
            setTimeout(() => {
                app()?.addNotification?.(
                    'warning',
                    'Back up your data',
                    'Your reports only exist on this device. Export a backup from Settings.'
                );
            }, 3000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PoliceToolsData = { backup, email, abrirHojaEnvio, programarCopiaAutomatica };
})();
