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

    const app = () => window.app;

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

    function fechaArchivo() {
        return new Date().toISOString().split('T')[0];
    }

    /** Obtiene el PDF de un reporte como File, venga del store o de base64. */
    async function reporteAFichero(reporte) {
        const blob = app() ? await app().getReportBlob(reporte) : null;
        if (!blob) return null;
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

        /** Tamaño aproximado de lo guardado, para enseñarlo en ajustes. */
        tamano() {
            let bytes = 0;
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const clave = localStorage.key(i);
                    bytes += (clave || '').length + (localStorage.getItem(clave) || '').length;
                }
            } catch (e) {}
            return bytes;
        },

        async exportar({ incluirPDFs = true } = {}) {
            app()?.showLoading(true);
            const copia = await this.recopilar({ incluirPDFs });
            app()?.showLoading(false);

            const json = JSON.stringify(copia);
            const blob = new Blob([json], { type: 'application/json' });
            const nombre = `PoliceTools_Backup_${fechaArchivo()}.json`;

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
                        cuerpo: `Backup of Police Tools (${tam}). Keep it somewhere safe.`
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
            app()?.showToast(`Backup saved (${tam})`, 'success');
            this.actualizarEstado();
        },

        /**
         * Restaura una copia.
         *
         * Por defecto fusiona: las claves de la copia sobreescriben las
         * actuales y lo que no este en la copia se conserva. Reemplazar del
         * todo borraria los reportes creados despues de hacerla.
         */
        async importar(fichero, { reemplazar = false } = {}) {
            const texto = await fichero.text();

            let copia;
            try {
                copia = JSON.parse(texto);
            } catch (e) {
                throw new Error('El archivo no es una copia valida (JSON ilegible)');
            }

            if (copia.formato !== 'police-tools-backup' || !copia.datos) {
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

            // 1. Compartir con ficheros: es la unica via que los adjunta de
            //    verdad. En el APK la hace el plugin Share de Capacitor y en
            //    el navegador la Web Share API.
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

            // 2. ZIP + borrador de correo
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
    function init() {
        montarAjustes();

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

    window.PoliceToolsData = { backup, email, abrirHojaEnvio };
})();
