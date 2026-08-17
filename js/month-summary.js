/**
 * RESUMEN DEL MES - Police Tools
 *
 * Todo esto ya se guardaba y no habia forma de verlo junto: para saber las
 * horas del mes o cuantas citaciones se emitieron habia que abrir los
 * documentos uno por uno.
 *
 * Sale de tres sitios:
 *   - Las horas, de las entradas de turno (savedData.shifts).
 *   - Las citaciones, de los contadores de los Patrol Log guardados.
 *   - El recuento de documentos, de las fichas de Daily Reports.
 *
 * No inventa nada: si un dato no esta registrado, sale en cero y se dice.
 */

(function () {
    'use strict';

    const app = () => window.app;

    const MESES = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];

    /** Desplazamiento en meses respecto al actual: 0 este mes, -1 el pasado. */
    let desplazamiento = 0;

    // ============================================
    // CALCULO
    // ============================================

    /**
     * Horas de un turno a partir de HHMM de entrada y salida.
     *
     * Se calcula aqui en vez de confiar en el campo total_hours porque es de
     * solo lectura y en los turnos que cruzan medianoche (Mid, 1730-0630)
     * daba negativo.
     */
    function horasDe(turno) {
        const ini = String(turno.beginTime || turno.begin_time || '').padStart(4, '0');
        const fin = String(turno.endTime || turno.end_time || '').padStart(4, '0');
        if (!/^\d{4}$/.test(ini) || !/^\d{4}$/.test(fin)) return 0;

        const min = (s) => parseInt(s.slice(0, 2), 10) * 60 + parseInt(s.slice(2), 10);
        let d = min(fin) - min(ini);
        if (d < 0) d += 24 * 60;      // cruzo medianoche
        return d / 60;
    }

    function entero(v) {
        const n = parseInt(String(v ?? '').trim(), 10);
        return Number.isFinite(n) ? n : 0;
    }

    function mesObjetivo() {
        const d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() + desplazamiento);
        return d;
    }

    function calcular() {
        const ref = mesObjetivo();
        const prefijo = `${ref.getFullYear()}-${String(ref.getMonth() + 1).padStart(2, '0')}-`;

        const a = app();
        const turnos = (a?.savedData?.shifts || []).filter(s => String(s.date || '').startsWith(prefijo));
        const docs = (a?.dailyReports || []).filter(r =>
            String(r.documentDate || r.date || '').startsWith(prefijo));

        let horas = 0, extra = 0, licencia = 0, enfermo = 0;
        for (const t of turnos) {
            const h = horasDe(t);
            horas += h;
            if (t.status === 'overtime') extra += h;
            if (t.status === 'leave') licencia += h;
            if (t.status === 'sick') enfermo += h;
        }

        let moving = 0, noMoving = 0, dd1805 = 0, da1408 = 0, verbales = 0;
        for (const r of docs) {
            if (r.type !== 'patrol') continue;
            const f = r.formData || {};
            moving += entero(f.citations_moving);
            noMoving += entero(f.citations_nonmoving);
            dd1805 += entero(f.dd_fm_1805);
            da1408 += entero(f.da_fm_1408);
            verbales += entero(f.verbal_warning);
        }

        const porTipo = {};
        for (const r of docs) porTipo[r.type] = (porTipo[r.type] || 0) + 1;

        // Millaje: suma de los totales de cada Patrol Log
        let millas = 0;
        for (const r of docs) {
            if (r.type !== 'patrol') continue;
            millas += entero((r.formData || {}).total_mileage);
        }

        return {
            etiqueta: `${MESES[ref.getMonth()]} ${ref.getFullYear()}`,
            esActual: desplazamiento === 0,
            turnos: turnos.length,
            horas, extra, licencia, enfermo,
            citaciones: moving + noMoving,
            moving, noMoving, dd1805, da1408, verbales,
            millas,
            docs: docs.length,
            porTipo
        };
    }

    // ============================================
    // PINTADO
    // ============================================
    function num(v) {
        return Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, '');
    }

    function render() {
        const caja = document.getElementById('month-summary');
        if (!caja) return;

        const d = calcular();
        const vacio = d.turnos === 0 && d.docs === 0;

        const fichas = [
            { valor: num(d.horas), unidad: 'h', etiqueta: 'Hours worked', clase: 'blue' },
            { valor: num(d.extra), unidad: 'h', etiqueta: 'Overtime', clase: 'yellow' },
            { valor: String(d.citaciones), etiqueta: 'Citations', clase: 'red' },
            { valor: String(d.docs), etiqueta: 'Documents', clase: 'green' }
        ];

        const desglose = [
            d.moving || d.noMoving ? `${d.moving} moving · ${d.noMoving} non-moving` : '',
            d.dd1805 ? `${d.dd1805} DD 1805` : '',
            d.da1408 ? `${d.da1408} DA 1408` : '',
            d.verbales ? `${d.verbales} verbal warning${d.verbales === 1 ? '' : 's'}` : '',
            d.millas ? `${d.millas} miles patrolled` : '',
            d.licencia ? `${num(d.licencia)} h leave` : '',
            d.enfermo ? `${num(d.enfermo)} h sick` : ''
        ].filter(Boolean);

        const nombres = { patrol: 'Patrol Log', pmcs: 'PMCS', guardmount: 'Guard Mount', interview: 'Interview' };
        const porTipo = Object.entries(d.porTipo)
            .map(([t, n]) => `${n} ${nombres[t] || t}`).join(' · ');

        caja.innerHTML = `
            <div class="ms-head">
                <button type="button" class="calendar-nav" data-ms="-1" aria-label="Previous month">&#10094;</button>
                <h3>${d.etiqueta}</h3>
                <button type="button" class="calendar-nav" data-ms="1" aria-label="Next month"
                        ${desplazamiento >= 0 ? 'disabled' : ''}>&#10095;</button>
            </div>

            ${vacio ? `
                <p class="ms-empty">Nothing recorded for ${d.etiqueta}.<br>
                Hours come from shift entries and citations from saved Patrol Logs.</p>
            ` : `
                <div class="ms-grid">
                    ${fichas.map(f => `
                        <div class="ms-card ${f.clase}">
                            <b>${f.valor}${f.unidad ? `<i>${f.unidad}</i>` : ''}</b>
                            <span>${f.etiqueta}</span>
                        </div>
                    `).join('')}
                </div>

                <p class="ms-note">${d.esActual ? 'Month in progress · ' : ''}${
                    d.turnos} shift${d.turnos === 1 ? '' : 's'} logged${porTipo ? ' · ' + porTipo : ''}</p>
                ${desglose.length ? `<ul class="ms-breakdown">${desglose.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
            `}
        `;

        caja.querySelectorAll('[data-ms]').forEach(b => {
            b.addEventListener('click', () => {
                const paso = parseInt(b.dataset.ms, 10);
                // Sin meses futuros: no hay nada que resumir
                if (desplazamiento + paso > 0) return;
                desplazamiento += paso;
                render();
            });
        });
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        render();

        // Se repinta cuando cambia lo que resume
        document.addEventListener('reportschanged', render);
        document.addEventListener('shiftschanged', render);

        // Y al abrir la pestaña, por si cambio algo estando en otra vista
        const vista = document.getElementById('calendar-view');
        if (vista) {
            new MutationObserver(() => {
                if (vista.classList.contains('active')) requestAnimationFrame(render);
            }).observe(vista, { attributes: true, attributeFilter: ['class'] });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 350));
    } else {
        setTimeout(init, 350);
    }

    window.PoliceToolsMonth = { calcular, render, horasDe };
})();
