/**
 * REPORT STORE - Police Tools App
 *
 * Los PDFs se guardaban en localStorage como base64 dentro del propio
 * objeto del reporte. Medido en este navegador: la cuota de localStorage
 * es de ~4.8 MB y cada documento ocupa entre 0.8 y 1.7 MB, asi que la app
 * dejaba de poder guardar al tercer o cuarto reporte, y el fallo era
 * silencioso.
 *
 * Aqui los PDFs pasan a IndexedDB, que guarda Blobs tal cual (sin el 33%
 * extra del base64) y tiene una cuota mucho mayor. En localStorage se
 * queda solo la ficha del reporte, que son unos pocos KB.
 */

(function () {
    'use strict';

    const DB_NOMBRE = 'policeTools';
    const DB_VERSION = 1;
    const ALMACEN = 'pdfs';

    let dbPromesa = null;

    function abrir() {
        if (dbPromesa) return dbPromesa;

        dbPromesa = new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                reject(new Error('IndexedDB no disponible'));
                return;
            }

            const req = indexedDB.open(DB_NOMBRE, DB_VERSION);

            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(ALMACEN)) {
                    db.createObjectStore(ALMACEN, { keyPath: 'id' });
                }
            };

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        return dbPromesa;
    }

    function transaccion(modo) {
        return abrir().then(db => db.transaction(ALMACEN, modo).objectStore(ALMACEN));
    }

    function comoPromesa(req) {
        return new Promise((resolve, reject) => {
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    const store = {
        /** Guarda el PDF de un reporte. Acepta Blob, Uint8Array o data URL. */
        async guardar(id, pdf) {
            let blob;
            if (pdf instanceof Blob) {
                blob = pdf;
            } else if (typeof pdf === 'string' && pdf.startsWith('data:')) {
                const base64 = pdf.split(',')[1] || '';
                const bin = atob(base64);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                blob = new Blob([bytes], { type: 'application/pdf' });
            } else if (pdf && pdf.byteLength !== undefined) {
                blob = new Blob([pdf], { type: 'application/pdf' });
            } else {
                throw new Error('Formato de PDF no reconocido');
            }

            const s = await transaccion('readwrite');
            await comoPromesa(s.put({ id, blob, guardado: new Date().toISOString() }));
            return blob.size;
        },

        /** Devuelve el Blob del PDF, o null si no esta. */
        async obtener(id) {
            try {
                const s = await transaccion('readonly');
                const fila = await comoPromesa(s.get(id));
                return fila ? fila.blob : null;
            } catch (e) {
                return null;
            }
        },

        /** URL temporal para previsualizar. Hay que revocarla al cerrar. */
        async obtenerURL(id) {
            const blob = await this.obtener(id);
            return blob ? URL.createObjectURL(blob) : null;
        },

        async obtenerFichero(id, nombre) {
            const blob = await this.obtener(id);
            if (!blob) return null;
            return new File([blob], nombre || `${id}.pdf`, { type: 'application/pdf' });
        },

        async borrar(id) {
            try {
                const s = await transaccion('readwrite');
                await comoPromesa(s.delete(id));
            } catch (e) {}
        },

        async listarIds() {
            try {
                const s = await transaccion('readonly');
                return await comoPromesa(s.getAllKeys());
            } catch (e) {
                return [];
            }
        },

        /** Espacio ocupado por todos los PDFs. */
        async tamanoTotal() {
            try {
                const s = await transaccion('readonly');
                const filas = await comoPromesa(s.getAll());
                return filas.reduce((t, f) => t + (f.blob?.size || 0), 0);
            } catch (e) {
                return 0;
            }
        },

        /** Cuota real del origen, cuando el navegador la expone. */
        async cuota() {
            if (!navigator.storage?.estimate) return null;
            try {
                const e = await navigator.storage.estimate();
                return { usado: e.usage || 0, total: e.quota || 0 };
            } catch (e) {
                return null;
            }
        },

        /**
         * Pide almacenamiento persistente.
         *
         * Sin esto el navegador puede liberar los datos cuando falta espacio,
         * e iOS los borra si el sitio no se abre en siete dias. Con la PWA
         * instalada se suele conceder sin preguntar.
         */
        async pedirPersistencia() {
            if (!navigator.storage?.persist) return false;
            try {
                if (await navigator.storage.persisted()) return true;
                return await navigator.storage.persist();
            } catch (e) {
                return false;
            }
        },

        /**
         * Migra los PDFs que aun esten en localStorage.
         *
         * Se ejecuta una sola vez al arrancar: mueve cada pdfData a IndexedDB
         * y lo quita del objeto, con lo que la lista de reportes baja de
         * megabytes a kilobytes.
         */
        async migrarDesdeLocalStorage() {
            let reportes;
            try {
                reportes = JSON.parse(localStorage.getItem('policeToolsDailyReports') || '[]');
            } catch (e) {
                return { migrados: 0 };
            }

            if (!Array.isArray(reportes) || !reportes.length) return { migrados: 0 };

            let migrados = 0;
            let liberado = 0;

            for (const r of reportes) {
                if (!r || !r.pdfData || !r.id) continue;
                try {
                    liberado += r.pdfData.length;
                    await this.guardar(r.id, r.pdfData);
                    delete r.pdfData;
                    r.pdfEnStore = true;
                    migrados++;
                } catch (e) {
                    console.warn('[store] No se pudo migrar', r.id, e.message);
                }
            }

            if (migrados) {
                try {
                    localStorage.setItem('policeToolsDailyReports', JSON.stringify(reportes));
                } catch (e) {}
                console.log(`[store] ${migrados} PDF(s) movidos a IndexedDB, ` +
                            `${(liberado / 1048576).toFixed(1)} MB liberados de localStorage`);
            }

            return { migrados, liberado };
        },

        /** Quita de IndexedDB los PDFs de reportes que ya no existen. */
        async limpiarHuerfanos(idsVigentes) {
            const vigentes = new Set(idsVigentes);
            const ids = await this.listarIds();
            let borrados = 0;
            for (const id of ids) {
                if (!vigentes.has(id)) {
                    await this.borrar(id);
                    borrados++;
                }
            }
            return borrados;
        }
    };

    window.PoliceToolsStore = store;

    // La migracion tiene que terminar antes de que la app pinte la lista de
    // reportes, por eso se expone la promesa y app.js la espera.
    window.PoliceToolsStoreReady = (async () => {
        try {
            await store.migrarDesdeLocalStorage();
            store.pedirPersistencia();
        } catch (e) {
            console.warn('[store] migracion fallida:', e.message);
        }
        return store;
    })();
})();
