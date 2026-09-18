/**
 * LOG DE CALIBRACION DE RADAR / LIDAR - Police Tools V2
 *
 * El equipo de velocidad se verifica al abrir y al cerrar el turno, y esa
 * verificacion es lo que sostiene la citacion: sin constancia de que el radar
 * estaba dentro de tolerancia cuando se midio, la lectura queda sin respaldo
 * y el caso se cae. La app registraba la citacion pero no el check, asi que
 * el dato que hace falta despues era el unico que no quedaba guardado.
 *
 * Aqui se guardan los checks, se avisa cuando falta el de entrada y se saca
 * la hoja en PDF.
 *
 * A diferencia del resto de documentos, este PDF **no** sale de una plantilla
 * oficial: no existe un formulario DA/DD para el check de tuning fork, asi
 * que la hoja se dibuja con pdf-lib. Por eso no hay riesgo de estar
 * sustituyendo un formulario que deberia ser el oficial.
 *
 * Nada de lo que hay aqui decide si una lectura vale: la tolerancia se
 * declara, se compara y se anota. Quien firma es el oficial.
 */

(function () {
    'use strict';

    const CLAVE = 'policeToolsRadarChecks';
    const CLAVE_AVISO = 'policeTools_avisoRadar';

    /**
     * Tolerancia por defecto del check de tuning fork, en mph.
     *
     * Es el margen que se suele exigir: la lectura tiene que dar el valor
     * grabado en el diapason. Va como constante y no escondido en una
     * comparacion para que se pueda cambiar si la instalacion pide otro, y
     * se imprime en la hoja para que quien la lea sepa contra que se compara.
     */
    const TOLERANCIA_MPH = 1;

    const app = () => window.app;
    const home = () => window.PoliceToolsHome;

    function hoyDeTrabajo() {
        // El dia de trabajo, no el del reloj: el turno de noche sale a las
        // 0630 del dia siguiente y su check de cierre pertenece al turno
        // anterior.
        const d = home()?.diaDeTrabajo?.();
        if (d) return d;
        const n = new Date();
        return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${
            String(n.getDate()).padStart(2, '0')}`;
    }

    function ahoraHHMM() {
        const n = new Date();
        return `${String(n.getHours()).padStart(2, '0')}${String(n.getMinutes()).padStart(2, '0')}`;
    }

    // ============================================
    // ALMACENAMIENTO
    // ============================================
    function leer() {
        try {
            const v = JSON.parse(localStorage.getItem(CLAVE) || '[]');
            return Array.isArray(v) ? v : [];
        } catch (e) {
            return [];
        }
    }

    function escribir(lista) {
        try {
            localStorage.setItem(CLAVE, JSON.stringify(lista));
        } catch (e) {
            console.warn('[radar] no se pudo guardar:', e.message);
            app()?.showToast?.('Could not save the check: storage full', 'error');
            return false;
        }
        document.dispatchEvent(new CustomEvent('radarchanged'));
        return true;
    }

    // ============================================
    // VEREDICTO
    // ============================================
    /**
     * Si el check pasa o no.
     *
     * Devuelve { ok, motivos }. Se calcula, no se teclea: dejarlo a mano
     * permitiria marcar "pass" con una lectura fuera de tolerancia delante,
     * y es justo lo que la hoja tiene que poder demostrar que no paso.
     */
    function veredicto(c) {
        const motivos = [];

        if (c.autotest === 'fail') motivos.push('Internal self-test failed');
        if (c.displayAudio === 'fail') motivos.push('Display / audio test failed');

        if (c.tipo === 'lidar') {
            if (c.alineacion === 'fail') motivos.push('Scope alignment off');
            const esp = parseFloat(c.distEsperada);
            const obt = parseFloat(c.distObtenida);
            if (!isNaN(esp) && !isNaN(obt) && Math.abs(esp - obt) > 1) {
                motivos.push(`Fixed-distance check off by ${Math.abs(esp - obt).toFixed(1)} ft`);
            }
        } else {
            for (const n of [1, 2]) {
                const esp = parseFloat(c[`fork${n}Esperado`]);
                const obt = parseFloat(c[`fork${n}Obtenido`]);
                if (isNaN(esp) || isNaN(obt)) continue;
                const dif = Math.abs(esp - obt);
                if (dif > TOLERANCIA_MPH) {
                    motivos.push(`${esp} mph fork read ${obt} (off by ${dif.toFixed(0)})`);
                }
            }
        }

        return { ok: motivos.length === 0, motivos };
    }

    // ============================================
    // API
    // ============================================
    const API = {
        TOLERANCIA_MPH,
        veredicto,

        todas() {
            return leer().slice().sort((a, b) =>
                (b.fecha + b.hora).localeCompare(a.fecha + a.hora));
        },

        delDia(fecha) {
            const f = fecha || hoyDeTrabajo();
            return this.todas().filter(c => c.fecha === f).reverse();
        },

        guardar(check) {
            const lista = leer();
            const id = check.id || `radar_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`;
            const i = lista.findIndex(c => c.id === id);
            const registro = { ...check, id, guardado: new Date().toISOString() };
            if (i === -1) lista.push(registro);
            else lista[i] = registro;
            return escribir(lista) ? registro : null;
        },

        borrar(id) {
            return escribir(leer().filter(c => c.id !== id));
        },

        /** Hay check de entrada del dia de trabajo? */
        hayCheckDeEntrada(fecha) {
            return this.delDia(fecha).some(c => c.momento === 'start');
        },

        /**
         * Equipo del ultimo check, para no volver a teclear marca y serie.
         * El radar de la patrulla es el mismo turno tras turno.
         */
        ultimoEquipo() {
            const u = this.todas()[0];
            if (!u) return null;
            return { tipo: u.tipo, marca: u.marca, serie: u.serie, oficial: u.oficial };
        }
    };

    // ============================================
    // PDF
    // ============================================
    /**
     * Dibuja la hoja del dia.
     *
     * Una pagina por cada seis checks, que es mas de lo que cabe en un turno:
     * en la practica entra todo en una.
     */
    async function construirPDF(checks, cabecera) {
        const PDFLib = window.PDFLib;
        if (!PDFLib) throw new Error('pdf-lib no esta cargado');

        const { PDFDocument, StandardFonts, rgb } = PDFLib;
        const doc = await PDFDocument.create();
        const fuente = await doc.embedFont(StandardFonts.Helvetica);
        const negrita = await doc.embedFont(StandardFonts.HelveticaBold);

        const ANCHO = 612, ALTO = 792, M = 42;
        const NEGRO = rgb(0, 0, 0);
        const GRIS = rgb(0.42, 0.42, 0.42);
        const ROJO = rgb(0.7, 0.1, 0.1);

        let pagina = null;
        let y = 0;

        const linea = (y1, grosor = 0.8, color = GRIS) => {
            pagina.drawLine({
                start: { x: M, y: y1 }, end: { x: ANCHO - M, y: y1 },
                thickness: grosor, color
            });
        };

        const texto = (t, x, yy, { size = 9, font = fuente, color = NEGRO } = {}) => {
            pagina.drawText(String(t == null ? '' : t), { x, y: yy, size, font, color });
        };

        /**
         * Texto pegado al margen derecho.
         *
         * Se mide, no se estima: colocarlo con un desplazamiento a ojo dejaba
         * "OUT OF TOLERANCE" —justo lo que hay que ver— sobresaliendo de la
         * linea del margen, y cada veredicto tiene un ancho distinto.
         */
        const textoDerecha = (t, yy, { size = 9, font = fuente, color = NEGRO } = {}) => {
            const s = String(t == null ? '' : t);
            const ancho = font.widthOfTextAtSize(s, size);
            pagina.drawText(s, { x: ANCHO - M - ancho, y: yy, size, font, color });
        };

        function nuevaPagina() {
            pagina = doc.addPage([ANCHO, ALTO]);
            y = ALTO - M;

            texto('RADAR / LIDAR ACCURACY CHECK LOG', M, y - 4, { size: 13, font: negrita });
            y -= 20;
            linea(y, 1.1, NEGRO);
            y -= 16;

            texto(`OFFICER: ${cabecera.oficial || ''}`, M, y, { font: negrita });
            texto(`DATE: ${cabecera.fecha || ''}`, ANCHO / 2 + 40, y, { font: negrita });
            y -= 13;
            texto(`PATROL / UNIT: ${cabecera.patrulla || ''}`, M, y);
            texto(`SHIFT: ${cabecera.turno || ''}`, ANCHO / 2 + 40, y);
            y -= 13;
            texto(`Fork tolerance applied: ±${TOLERANCIA_MPH} mph`, M, y, { size: 8, color: GRIS });
            y -= 14;
            linea(y);
            y -= 18;
        }

        nuevaPagina();

        for (const c of checks) {
            // Un bloque ocupa ~120 pt; si no cabe, pagina nueva
            if (y < M + 140) nuevaPagina();

            const v = veredicto(c);
            const momento = { start: 'START OF SHIFT', end: 'END OF SHIFT' }[c.momento] || 'CHECK';

            texto(`${momento}  ·  ${c.hora || ''}`, M, y, { size: 10, font: negrita });
            textoDerecha(v.ok ? 'WITHIN TOLERANCE' : 'OUT OF TOLERANCE', y,
                { size: 10, font: negrita, color: v.ok ? NEGRO : ROJO });
            y -= 14;

            texto(`${(c.tipo || 'radar').toUpperCase()}   ${c.marca || ''}`, M, y);
            texto(`S/N: ${c.serie || ''}`, ANCHO / 2 + 40, y);
            y -= 13;

            const si = (v) => v === 'pass' ? 'PASS' : (v === 'fail' ? 'FAIL' : '—');

            texto(`Internal self-test: ${si(c.autotest)}`, M + 8, y);
            texto(`Display / audio: ${si(c.displayAudio)}`, ANCHO / 2 + 40, y);
            y -= 13;

            if (c.tipo === 'lidar') {
                texto(`Fixed distance: ${c.distEsperada || '—'} ft expected / ${
                    c.distObtenida || '—'} ft read`, M + 8, y);
                texto(`Scope alignment: ${si(c.alineacion)}`, ANCHO / 2 + 40, y);
                y -= 13;
            } else {
                for (const n of [1, 2]) {
                    const esp = c[`fork${n}Esperado`];
                    const obt = c[`fork${n}Obtenido`];
                    if (!esp && !obt) continue;
                    texto(`Tuning fork ${n}: ${esp || '—'} mph stamped / ${obt || '—'} mph read`,
                        M + 8, y);
                    y -= 13;
                }
                if (c.ambosForks) {
                    texto(`Both forks simultaneously: ${si(c.ambosForks)}`, M + 8, y);
                    y -= 13;
                }
            }

            if (c.velocimetro) {
                texto(`Speedometer comparison: ${c.velocimetro}`, M + 8, y);
                y -= 13;
            }

            if (!v.ok) {
                for (const m of v.motivos) {
                    texto(`• ${m}`, M + 8, y, { size: 8.5, color: ROJO });
                    y -= 11;
                }
                texto('Device removed from service / supervisor notified as required.',
                    M + 8, y, { size: 8, font: negrita, color: ROJO });
                y -= 12;
            }

            if (c.notas) {
                const trozos = String(c.notas).match(/.{1,96}/g) || [];
                texto('Notes:', M + 8, y, { size: 8.5, color: GRIS });
                y -= 11;
                for (const t of trozos.slice(0, 4)) {
                    texto(t, M + 16, y, { size: 8.5 });
                    y -= 11;
                }
            }

            y -= 6;
            linea(y);
            y -= 18;
        }

        // Bloque de firma: la hoja vale por lo que alguien certifica, no por
        // lo que el telefono imprima.
        if (y < M + 70) nuevaPagina();
        y -= 10;
        texto('I certify that the checks recorded above were performed as stated.',
            M, y, { size: 8.5, color: GRIS });
        y -= 34;
        pagina.drawLine({
            start: { x: M, y }, end: { x: M + 220, y }, thickness: 0.8, color: NEGRO
        });
        pagina.drawLine({
            start: { x: ANCHO - M - 150, y }, end: { x: ANCHO - M, y },
            thickness: 0.8, color: NEGRO
        });
        y -= 11;
        texto('SIGNATURE', M, y, { size: 7.5, color: GRIS });
        texto('DATE', ANCHO - M - 150, y, { size: 7.5, color: GRIS });

        // Pie: de donde salio la hoja
        const pies = doc.getPages();
        pies.forEach((p, i) => {
            p.drawText(`${window.PTEdition?.firma?.() || 'Police Tools'}  ·  page ${
                i + 1} of ${pies.length}`, {
                x: M, y: 24, size: 7, font: fuente, color: GRIS
            });
        });

        return doc;
    }

    // ============================================
    // UI
    // ============================================
    function $(id) {
        return document.getElementById(id);
    }

    /** Muestra los campos que tocan segun el tipo de equipo. */
    function ajustarTipo() {
        const tipo = $('radar_tipo')?.value || 'radar';
        const esLidar = tipo === 'lidar';
        const bloqueRadar = $('radar-bloque-forks');
        const bloqueLidar = $('radar-bloque-lidar');
        if (bloqueRadar) bloqueRadar.hidden = esLidar;
        if (bloqueLidar) bloqueLidar.hidden = !esLidar;
    }

    function recogerFormulario() {
        return {
            fecha: $('radar_fecha')?.value || hoyDeTrabajo(),
            hora: ($('radar_hora')?.value || '').replace(':', '') || ahoraHHMM(),
            momento: $('radar_momento')?.value || 'start',
            tipo: $('radar_tipo')?.value || 'radar',
            marca: $('radar_marca')?.value || '',
            serie: $('radar_serie')?.value || '',
            autotest: $('radar_autotest')?.value || '',
            displayAudio: $('radar_display')?.value || '',
            fork1Esperado: $('radar_fork1_esp')?.value || '',
            fork1Obtenido: $('radar_fork1_obt')?.value || '',
            fork2Esperado: $('radar_fork2_esp')?.value || '',
            fork2Obtenido: $('radar_fork2_obt')?.value || '',
            ambosForks: $('radar_ambos')?.value || '',
            distEsperada: $('radar_dist_esp')?.value || '',
            distObtenida: $('radar_dist_obt')?.value || '',
            alineacion: $('radar_alineacion')?.value || '',
            velocimetro: $('radar_velocimetro')?.value || '',
            oficial: $('radar_oficial')?.value || '',
            notas: $('radar_notas')?.value || ''
        };
    }

    /** Deja el formulario listo para el siguiente check. */
    function prepararFormulario({ conservarEquipo = true } = {}) {
        if ($('radar_fecha')) $('radar_fecha').value = hoyDeTrabajo();
        if ($('radar_hora')) {
            const h = ahoraHHMM();
            $('radar_hora').value = `${h.slice(0, 2)}:${h.slice(2)}`;
        }

        // El momento que toca: si ya hay el de entrada, el siguiente es el de
        // salida. Es el orden real del turno.
        if ($('radar_momento')) {
            $('radar_momento').value = API.hayCheckDeEntrada() ? 'end' : 'start';
        }

        for (const id of ['radar_autotest', 'radar_display', 'radar_ambos',
                          'radar_alineacion', 'radar_fork1_obt', 'radar_fork2_obt',
                          'radar_dist_obt', 'radar_velocimetro', 'radar_notas']) {
            if ($(id)) $(id).value = '';
        }

        // Marca, serie y los valores grabados en los diapasones no cambian de
        // un turno a otro: volver a teclearlos cada vez es lo que hace que un
        // registro asi se deje de llevar.
        if (conservarEquipo) {
            const eq = API.ultimoEquipo();
            if (eq) {
                if ($('radar_tipo') && eq.tipo) $('radar_tipo').value = eq.tipo;
                if ($('radar_marca') && !$('radar_marca').value) $('radar_marca').value = eq.marca || '';
                if ($('radar_serie') && !$('radar_serie').value) $('radar_serie').value = eq.serie || '';
                if ($('radar_oficial') && !$('radar_oficial').value) {
                    $('radar_oficial').value = eq.oficial || '';
                }
            }
            const previo = API.todas()[0];
            if (previo) {
                if ($('radar_fork1_esp') && !$('radar_fork1_esp').value) {
                    $('radar_fork1_esp').value = previo.fork1Esperado || '';
                }
                if ($('radar_fork2_esp') && !$('radar_fork2_esp').value) {
                    $('radar_fork2_esp').value = previo.fork2Esperado || '';
                }
                if ($('radar_dist_esp') && !$('radar_dist_esp').value) {
                    $('radar_dist_esp').value = previo.distEsperada || '';
                }
            }
        }

        ajustarTipo();
    }

    function escapar(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function pintarLista() {
        const cont = $('radar-list');
        if (!cont) return;

        const delDia = API.delDia();
        const total = API.todas().length;

        if (!delDia.length) {
            cont.innerHTML = `<p class="empty-state">No checks logged for ${
                escapar(hoyDeTrabajo())}.${total ? ` ${total} check(s) on file from other days.` : ''}</p>`;
        } else {
            cont.innerHTML = delDia.map(c => {
                const v = veredicto(c);
                const momento = { start: 'Start of shift', end: 'End of shift' }[c.momento] || 'Check';
                const detalle = c.tipo === 'lidar'
                    ? `${c.distEsperada || '—'}/${c.distObtenida || '—'} ft`
                    : [1, 2].map(n => c[`fork${n}Esperado`]
                        ? `${c[`fork${n}Esperado`]}→${c[`fork${n}Obtenido`] || '—'}`
                        : null).filter(Boolean).join('  ');

                return `<div class="radar-item${v.ok ? '' : ' fail'}">
                    <div class="ri-head">
                        <b>${escapar(momento)}</b>
                        <span class="ri-time">${escapar(c.hora || '')}</span>
                        <span class="ri-verdict">${v.ok ? 'OK' : 'OUT'}</span>
                    </div>
                    <div class="ri-body">
                        <span>${escapar((c.tipo || '').toUpperCase())} ${escapar(c.serie || '')}</span>
                        <span>${escapar(detalle)}</span>
                    </div>
                    ${v.ok ? '' : `<div class="ri-why">${v.motivos.map(escapar).join(' · ')}</div>`}
                    <button class="btn-link radar-del" data-id="${escapar(c.id)}">Delete</button>
                </div>`;
            }).join('');
        }

        // Aviso en la propia vista: el check de entrada es el que importa
        const aviso = $('radar-missing');
        if (aviso) {
            const falta = !API.hayCheckDeEntrada();
            aviso.hidden = !falta;
        }
    }

    async function generarHoja() {
        const checks = API.delDia();
        if (!checks.length) {
            app()?.showToast?.('No checks logged for today', 'error');
            return;
        }

        try {
            const turno = home()?.turnoDeHoy?.();
            const doc = await construirPDF(checks, {
                oficial: $('radar_oficial')?.value || checks[0].oficial || '',
                fecha: hoyDeTrabajo(),
                patrulla: $('radar_patrulla')?.value || '',
                turno: turno?.etiqueta || ''
            });

            const nombre = `${window.PTEdition?.prefijoFichero || 'PoliceTools'}_RadarLog_${
                hoyDeTrabajo()}.pdf`;

            // Pasa por el mismo archivado que el resto de documentos: asi
            // aparece en Daily Reports, entra en el backup y cuenta en el
            // resumen del mes sin nada nuevo que mantener.
            await app()?.saveDailyReport?.('radar', doc, nombre);
            app()?.showToast?.('Radar log saved to Daily Reports', 'success');
        } catch (e) {
            console.error('[radar] no se pudo generar la hoja:', e);
            app()?.showToast?.(`Could not generate the log: ${e.message}`, 'error');
        }
    }

    function guardarDesdeFormulario() {
        const check = recogerFormulario();

        // Lo minimo para que el registro sirva de algo
        if (!check.serie) {
            app()?.showToast?.('Serial number is required', 'error');
            $('radar_serie')?.focus();
            return;
        }
        if (check.tipo !== 'lidar' && !check.fork1Obtenido && !check.fork2Obtenido) {
            app()?.showToast?.('Enter at least one fork reading', 'error');
            $('radar_fork1_obt')?.focus();
            return;
        }

        if (!API.guardar(check)) return;

        const v = veredicto(check);
        if (v.ok) {
            app()?.showToast?.('Check logged', 'success');
        } else {
            // Un check fallido no es un error de la app: es el resultado, y
            // hay que verlo. Queda tambien como aviso.
            app()?.showToast?.('Check logged OUT OF TOLERANCE', 'error');
            app()?.addNotification?.('warning', 'Speed device out of tolerance',
                `${(check.tipo || 'radar').toUpperCase()} S/N ${check.serie}: ${
                    v.motivos.join('; ')}`);
        }

        prepararFormulario();
        pintarLista();
    }

    // ============================================
    // AVISO
    // ============================================
    /**
     * Avisa una vez al dia, y solo con el turno empezado y algo que medir.
     *
     * Mismo criterio que el aviso del PMCS: recordarlo a quien esta libre es
     * ruido, y repetirlo en cada arranque hace que se ignore.
     */
    function avisar() {
        const hoy = hoyDeTrabajo();
        let ya = '';
        try { ya = localStorage.getItem(CLAVE_AVISO) || ''; } catch (e) {}
        if (ya === hoy) return;

        const turno = home()?.turnoDeHoy?.();
        if (!turno || turno.clave === 'off') return;

        const progreso = home()?.progresoTurno?.(turno);
        if (progreso === null || progreso === undefined) return;

        // Solo tiene sentido si ya se ha usado el equipo alguna vez: a quien
        // no lleva radar no se le recuerda un check que no le toca.
        if (!API.todas().length) return;
        if (API.hayCheckDeEntrada(hoy)) return;

        app()?.addNotification?.(
            'warning',
            'Radar check not logged',
            `You are on ${turno.etiqueta} and there is no start-of-shift accuracy check for ${hoy}.`
        );

        try { localStorage.setItem(CLAVE_AVISO, hoy); } catch (e) {}
    }

    // ============================================
    // ARRANQUE
    // ============================================
    function init() {
        $('radar_tipo')?.addEventListener('change', ajustarTipo);
        $('save-radar-check')?.addEventListener('click', guardarDesdeFormulario);
        $('generate-radar-log')?.addEventListener('click', generarHoja);

        $('radar-list')?.addEventListener('click', (e) => {
            const boton = e.target.closest('.radar-del');
            if (!boton) return;
            API.borrar(boton.dataset.id);
            pintarLista();
        });

        document.addEventListener('radarchanged', pintarLista);

        // Al abrir la vista, la fecha y la hora puestas al momento
        document.addEventListener('click', (e) => {
            if (!e.target.closest('[data-tab="radar"], [data-new="radar"]')) return;
            setTimeout(() => { prepararFormulario(); pintarLista(); }, 80);
        }, true);

        prepararFormulario();
        pintarLista();

        // Espera a que la app tenga los reportes y el turno cargados
        setTimeout(avisar, 4500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
    } else {
        setTimeout(init, 300);
    }

    window.PTRadar = API;
})();
