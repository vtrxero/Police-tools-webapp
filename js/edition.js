/**
 * EDICION - Police Tools
 *
 * Quien es esta copia de la app. Existen dos a la vez:
 *
 *   - Police Tools      (original, applicationId mil.buchanan.policetools)
 *   - Police Tools V2    (esta,     applicationId mil.buchanan.policetools.v2)
 *
 * Android las trata como aplicaciones distintas, asi que se instalan las dos
 * y cada una tiene su propio almacenamiento interno. Pero hay una cosa que
 * NO esta separada por el sistema: la carpeta publica Documents, que es del
 * telefono. Si las dos escribieran ahi con el mismo nombre, la copia
 * automatica de una pisaria la de la otra y el respaldo que sobrevive a una
 * desinstalacion dejaria de ser fiable.
 *
 * De ahi que la carpeta y el nombre del fichero salgan de aqui y no esten
 * escritos a mano en cada sitio: cambiar de edicion es cambiar este fichero.
 */

(function () {
    'use strict';

    const EDICION = {
        // Identidad visible
        nombre: 'Police Tools V2',
        nombreCorto: 'Police Tools V2',
        // Numeracion propia: V2 no hereda el 2.7 de la original. El tercer
        // numero lo pone el workflow con el recuento de commits.
        version: '1.0',
        // Sufijo del applicationId de Android. Vacio en la original.
        sufijo: 'v2',

        // Carpeta dentro de Documents donde van los PDFs y la copia
        // automatica. Distinta de la original a proposito.
        carpeta: 'PoliceToolsV2',
        ficheroAutoBackup: 'PoliceToolsV2_AutoBackup.json',
        // Prefijo de los nombres de fichero que salen de la app
        prefijoFichero: 'PoliceToolsV2',

        /** Etiqueta para las notas de un documento o una copia. */
        firma() {
            return `${this.nombre} ${this.version}`;
        },

        /**
         * true si esta copia comparte almacenamiento con la original.
         *
         * En el APK nunca: el applicationId las separa. En el navegador si,
         * cuando las dos se sirven del mismo origen, porque localStorage e
         * IndexedDB van por origen y no por carpeta.
         */
        comparteAlmacenamientoWeb() {
            try {
                return !(window.Capacitor && window.Capacitor.isNativePlatform
                    && window.Capacitor.isNativePlatform());
            } catch (e) {
                return true;
            }
        }
    };

    window.PTEdition = EDICION;

    /**
     * Escribe la edicion en los sitios donde se ensena.
     *
     * El marcador del HTML dice solo "Police Tools V2" para que se lea igual
     * si el script no llegara a correr; aqui se completa con la version.
     */
    function pintar() {
        const footer = document.getElementById('footer-edition');
        if (footer) {
            footer.textContent =
                `${EDICION.nombre} ${EDICION.version} - Law Enforcement Productivity Suite`;
        }
        const about = document.getElementById('about-edition');
        if (about) about.textContent = `${EDICION.nombre} ${EDICION.version}`;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', pintar);
    } else {
        pintar();
    }
})();
