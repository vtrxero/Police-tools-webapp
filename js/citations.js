/**
 * CITATIONS + SEARCH - Police Tools App
 *
 * Dos cosas que estaban desconectadas:
 *
 *   1. La Law Library y el Patrol Log. Se buscaba el codigo en la biblioteca
 *      y luego se escribia a mano el numero de citaciones y la referencia en
 *      las observaciones, copiando de una pantalla a otra.
 *
 *   2. No habia forma de buscar en lo ya hecho: ni en los reportes guardados
 *      ni en las misiones de turnos anteriores.
 */

(function () {
    'use strict';

    const CLAVE_TURNO = 'policeTools_citacionesTurno';
    const app = () => window.app;

    // ============================================
    // CITACIONES DEL TURNO
    // ============================================
    const citaciones = {
        todas() {
            try { return JSON.parse(localStorage.getItem(CLAVE_TURNO) || '[]'); } catch (e) { return []; }
        },

        set(l) {
            try { localStorage.setItem(CLAVE_TURNO, JSON.stringify(l)); } catch (e) {}
        },

        /** ¿Es de las que van al contador de "Moving"? */
        esMoving(ley) {
            const texto = `${ley.title_en || ''} ${ley.category || ''} ${ley.article_number || ''}`.toLowerCase();
            // El codigo de transito separa infracciones en movimiento de las
            // administrativas (registro, licencia, estacionamiento)
            const quieto = /parking|registration|address|license plate|inspection sticker|expired|insurance|permit/;
            return !quieto.test(texto);
        },

        añadir(ley) {
            const l = this.todas();
            l.push({
                id: ley.id,
                articulo: ley.article_number || ley.citation || '',
                citacion: ley.citation || '',
                titulo: ley.title_en || ley.title_es || '',
                multa: ley.fine || '',
                moving: this.esMoving(ley),
                fecha: new Date().toISOString()
            });
            this.set(l);
            this.aplicarAlPatrol();
            return l.length;
        },

        quitar(i) {
            const l = this.todas();
            l.splice(i, 1);
            this.set(l);
            this.aplicarAlPatrol();
        },

        limpiar() {
            this.set([]);
            this.aplicarAlPatrol();
        },

        /**
         * Vuelca los contadores y la referencia en el Patrol Log.
         * Es el paso que antes se hacia a mano.
         */
        aplicarAlPatrol() {
            const l = this.todas();
            const form = document.querySelector('#patrol-log-view form');
            if (!form) return;

            const moving = l.filter(c => c.moving).length;
            const noMoving = l.length - moving;

            const poner = (nombre, valor) => {
                const el = form.querySelector(`[name="${nombre}"]`);
                if (!el) return;
                el.value = valor;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            };

            poner('citations_moving', moving ? String(moving) : '');
            poner('citations_nonmoving', noMoving ? String(noMoving) : '');

            // Referencias en los comentarios, sin pisar lo que ya escribio
            const comentarios = form.querySelector('[name="comments"]');
            if (comentarios && l.length) {
                const refs = 'Citations: ' + l.map(c => c.articulo).filter(Boolean).join(', ');
                const actual = comentarios.value || '';
                const limpio = actual.replace(/Citations:.*$/m, '').trim();
                comentarios.value = limpio ? `${limpio}\n${refs}` : refs;
                comentarios.dispatchEvent(new Event('input', { bubbles: true }));
            }

            this.pintarLista();
        },

        pintarLista() {
            const caja = document.getElementById('shift-citations');
            if (!caja) return;

            const l = this.todas();
            if (!l.length) {
                caja.innerHTML = `<p class="section-note">No citations added yet. Add them from the Law Library.</p>`;
                return;
            }

            caja.innerHTML = `
                <ul class="cit-list">
                    ${l.map((c, i) => `
                        <li>
                            <span class="cit-tag ${c.moving ? 'moving' : 'nonmoving'}">${c.moving ? 'MOV' : 'NON'}</span>
                            <span class="cit-text">
                                <b>${c.articulo}</b>
                                <em>${c.titulo}</em>
                            </span>
                            ${c.multa ? `<span class="cit-fine">${c.multa}</span>` : ''}
                            <button type="button" class="cit-del" data-i="${i}" aria-label="Remove">&times;</button>
                        </li>
                    `).join('')}
                </ul>
                <button type="button" class="cit-clear" id="cit-clear">Clear all</button>
            `;

            caja.querySelectorAll('.cit-del').forEach(b => {
                b.addEventListener('click', () => this.quitar(+b.dataset.i));
            });
            caja.querySelector('#cit-clear')?.addEventListener('click', () => this.limpiar());
        }
    };

    /** Boton "Add to shift" dentro del detalle de una ley. */
    function montarBotonEnDetalle() {
        const modal = document.querySelector('.modal.active .law-detail-modal');
        if (!modal || modal.querySelector('.cit-add')) return;

        const ley = window.__leyActual;
        if (!ley) return;

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'btn btn-primary cit-add';
        boton.textContent = 'Add to this shift';

        boton.addEventListener('click', () => {
            const n = citaciones.añadir(ley);
            boton.textContent = 'Added ✓';
            boton.disabled = true;
            app()?.showToast(`Citation added (${n} this shift)`, 'success');
            window.PoliceToolsMobile?.haptics.success();
        });

        const contenido = modal.querySelector('.law-detail-content') || modal;
        contenido.appendChild(boton);
    }

    // ============================================
    // BUSCADOR GLOBAL
    // ============================================
    function buscar(q) {
        const t = q.trim().toLowerCase();
        if (t.length < 2) return { leyes: [], reportes: [], misiones: [] };

        const contiene = (v) => String(v || '').toLowerCase().includes(t);

        // Leyes: se reutiliza el buscador que ya usa la biblioteca
        let leyes = [];
        try {
            leyes = (typeof searchLaws === 'function' ? searchLaws(q.trim(), 'all') : []).slice(0, 8);
        } catch (e) {}

        // Reportes guardados
        const reportes = (app()?.dailyReports || []).filter(r =>
            contiene(r.title) || contiene(r.filename) ||
            contiene(r.formData?.police_name) || contiene(r.formData?.operator_name)
        ).slice(0, 8);

        // Misiones de turnos anteriores
        const misiones = [];
        for (const r of (app()?.dailyReports || [])) {
            if (r.type !== 'patrol') continue;
            const ms = r.formData?.__missions || r.missions || [];
            for (const m of ms) {
                if (contiene(m.description) || contiene(m.remarks)) {
                    misiones.push({ ...m, fecha: (r.documentDate || r.date || '').split('T')[0] });
                }
            }
        }

        return { leyes, reportes, misiones: misiones.slice(0, 8) };
    }

    function abrirBuscador() {
        const anterior = document.getElementById('global-search');
        if (anterior) { anterior.remove(); document.body.style.overflow = ''; return; }

        const fondo = document.createElement('div');
        fondo.className = 'sheet-backdrop gs-backdrop';
        fondo.id = 'global-search';
        fondo.innerHTML = `
            <div class="sheet gs-sheet">
                <div class="sheet-handle"></div>
                <input type="search" id="gs-input" class="gs-input" placeholder="Search laws, reports, missions..."
                       autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="search"/>
                <div class="gs-results" id="gs-results">
                    <p class="section-note">Type at least 2 characters.</p>
                </div>
                <button class="sheet-cancel" id="gs-close">Close</button>
            </div>
        `;

        document.body.appendChild(fondo);
        document.body.style.overflow = 'hidden';

        const cerrar = () => { fondo.remove(); document.body.style.overflow = ''; };
        fondo.querySelector('#gs-close').addEventListener('click', cerrar);
        fondo.addEventListener('click', (e) => { if (e.target === fondo) cerrar(); });

        const entrada = fondo.querySelector('#gs-input');
        const salida = fondo.querySelector('#gs-results');

        let temporizador;
        entrada.addEventListener('input', () => {
            clearTimeout(temporizador);
            temporizador = setTimeout(() => {
                const r = buscar(entrada.value);
                const total = r.leyes.length + r.reportes.length + r.misiones.length;

                if (entrada.value.trim().length < 2) {
                    salida.innerHTML = `<p class="section-note">Type at least 2 characters.</p>`;
                    return;
                }
                if (!total) {
                    salida.innerHTML = `<p class="section-note">Nothing found for "${entrada.value}".</p>`;
                    return;
                }

                let html = '';

                if (r.leyes.length) {
                    html += `<div class="gs-group"><label>Laws</label>` +
                        r.leyes.map(l => `
                            <button type="button" class="gs-item" data-ley="${l.id}">
                                <b>${l.article_number || l.citation || ''}</b>
                                <em>${l.title_en || l.title_es || ''}</em>
                            </button>`).join('') + `</div>`;
                }

                if (r.reportes.length) {
                    html += `<div class="gs-group"><label>Reports</label>` +
                        r.reportes.map((rep) => `
                            <button type="button" class="gs-item" data-rep="${rep.id}">
                                <b>${rep.title || rep.type}</b>
                                <em>${(rep.documentDate || rep.date || '').split('T')[0]} · ${rep.filename}</em>
                            </button>`).join('') + `</div>`;
                }

                if (r.misiones.length) {
                    html += `<div class="gs-group"><label>Missions</label>` +
                        r.misiones.map(m => `
                            <div class="gs-item static">
                                <b>${m.time_in || ''}-${m.time_out || ''} · ${m.fecha || ''}</b>
                                <em>${m.description || ''}</em>
                            </div>`).join('') + `</div>`;
                }

                salida.innerHTML = html;

                salida.querySelectorAll('[data-ley]').forEach(b => {
                    b.addEventListener('click', () => {
                        const ley = r.leyes.find(l => l.id === b.dataset.ley);
                        cerrar();
                        if (ley) { app().openTab('law-library'); setTimeout(() => app().showLawDetail(ley), 350); }
                    });
                });

                salida.querySelectorAll('[data-rep]').forEach(b => {
                    b.addEventListener('click', () => {
                        const i = (app().dailyReports || []).findIndex(r2 => r2.id === b.dataset.rep);
                        cerrar();
                        if (i >= 0) { app().openTab('daily-reports'); setTimeout(() => app().viewDailyReport(i), 350); }
                    });
                });
            }, 180);
        });

        setTimeout(() => entrada.focus(), 120);
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        // Seccion de citaciones dentro del Patrol Log
        const vista = document.getElementById('patrol-log-view');
        if (vista && !document.getElementById('shift-citations')) {
            const secciones = [...vista.querySelectorAll('.form-section')];
            const destino = secciones.find(s => /citation/i.test(s.querySelector('h3')?.textContent || ''))
                || secciones[secciones.length - 1];

            if (destino) {
                const sec = document.createElement('div');
                sec.className = 'form-section';
                sec.innerHTML = `<h3>Citations this shift</h3><div id="shift-citations"></div>`;
                destino.parentNode.insertBefore(sec, destino.nextSibling);
                citaciones.pintarLista();
            }
        }

        // Boton de busqueda en la cabecera
        const acciones = document.querySelector('.header-actions');
        if (acciones && !document.getElementById('search-btn')) {
            const b = document.createElement('button');
            b.className = 'icon-btn';
            b.id = 'search-btn';
            b.setAttribute('aria-label', 'Search');
            b.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>`;
            b.addEventListener('click', abrirBuscador);
            acciones.insertBefore(b, acciones.firstChild);
        }

        // El detalle de una ley se crea al vuelo: hay que engancharse cuando aparece
        new MutationObserver(() => montarBotonEnDetalle())
            .observe(document.body, { childList: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 250));
    } else {
        setTimeout(init, 250);
    }

    window.PoliceToolsCitations = { citaciones, buscar, abrirBuscador };
})();
