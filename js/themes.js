/**
 * THEMES - Police Tools App
 *
 * Ocho paletas completas mas un modo automatico que cambia el tema segun
 * la hora: claro de dia, oscuro al atardecer y rojo de madrugada.
 */

const POLICE_THEMES = [
    // --- Oscuros ---
    {
        id: 'midnight',
        name: 'Midnight',
        group: 'dark',
        desc: 'Midnight blue',
        preview: { bar: '#070d18', a: '#16223a', b: '#4d8dff', c: '#2fd08a', bg: '#0b1220' }
    },
    {
        id: 'carbon',
        name: 'Carbon',
        group: 'dark',
        desc: 'Neutral grey',
        preview: { bar: '#000000', a: '#212121', b: '#64b5f6', c: '#66bb6a', bg: '#121212' }
    },
    {
        id: 'forest',
        name: 'Forest',
        group: 'dark',
        desc: 'Unit green',
        preview: { bar: '#08110a', a: '#1a271d', b: '#74c489', c: '#c4d62e', bg: '#0d1410' }
    },
    {
        id: 'tactical',
        name: 'Tactical',
        group: 'dark',
        desc: 'Amber on olive',
        preview: { bar: '#0d0b07', a: '#252118', b: '#ffc94d', c: '#9bbf4f', bg: '#14120c' }
    },

    // --- Vision nocturna ---
    {
        id: 'nightops',
        name: 'Night Ops',
        group: 'night',
        desc: 'Red, preserves night vision',
        preview: { bar: '#150604', a: '#1a0a07', b: '#ff6b52', c: '#c4695c', bg: '#0a0503' }
    },

    // --- Claros ---
    {
        id: 'daylight',
        name: 'Daylight',
        group: 'light',
        desc: 'Clean and neutral',
        preview: { bar: '#1e3a5f', a: '#ffffff', b: '#2563eb', c: '#059669', bg: '#f4f6f9' }
    },
    {
        id: 'paper',
        name: 'Paper',
        group: 'light',
        desc: 'Warm, less glare',
        preview: { bar: '#3d3527', a: '#ffffff', b: '#2f6f9e', c: '#4a7c3f', bg: '#efece4' }
    },
    {
        id: 'highnoon',
        name: 'High Noon',
        group: 'light',
        desc: 'Max contrast for sunlight',
        preview: { bar: '#000000', a: '#ffffff', b: '#0033cc', c: '#006622', bg: '#ffffff' }
    }
];

class ThemeManager {
    constructor() {
        this.themes = POLICE_THEMES;
        this.STORAGE_KEY = 'policeTools_theme';
        this.AUTO_KEY = 'policeTools_themeAuto';

        // Que tema usa el modo automatico en cada tramo del dia
        this.autoPlan = {
            day: 'daylight',     // 06:00 - 17:59
            evening: 'midnight', // 18:00 - 21:59
            night: 'nightops'    // 22:00 - 05:59
        };

        this.current = null;
        this.timer = null;
    }

    // ============================================
    // LECTURA / ESCRITURA
    // ============================================
    get autoEnabled() {
        try { return localStorage.getItem(this.AUTO_KEY) === 'on'; } catch (e) { return false; }
    }

    set autoEnabled(on) {
        try { localStorage.setItem(this.AUTO_KEY, on ? 'on' : 'off'); } catch (e) {}
    }

    get saved() {
        try { return localStorage.getItem(this.STORAGE_KEY); } catch (e) { return null; }
    }

    set saved(id) {
        try { localStorage.setItem(this.STORAGE_KEY, id); } catch (e) {}
    }

    getTheme(id) {
        return this.themes.find(t => t.id === id) || null;
    }

    // ============================================
    // TRAMO HORARIO
    // ============================================
    tramoActual(fecha) {
        const h = (fecha || new Date()).getHours();
        if (h >= 22 || h < 6) return 'night';
        if (h >= 18) return 'evening';
        return 'day';
    }

    temaAutomatico() {
        return this.autoPlan[this.tramoActual()];
    }

    // ============================================
    // APLICAR
    // ============================================
    apply(id, { persist = true } = {}) {
        const tema = this.getTheme(id);
        // Alias antiguos: 'light' y 'dark' de versiones previas
        const destino = tema ? tema.id
            : (id === 'light' ? 'daylight' : (id === 'dark' ? 'midnight' : 'midnight'));

        document.documentElement.setAttribute('data-theme', destino);
        this.current = destino;

        if (persist) this.saved = destino;

        this.actualizarColorBarra(destino);
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: destino } }));
        return destino;
    }

    /** Tiñe la barra del sistema con el color de la cabecera del tema. */
    actualizarColorBarra(id) {
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue('--header-bg').trim();
        if (!color) return;

        document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove());
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = color;
        document.head.appendChild(meta);
    }

    // ============================================
    // MODO AUTOMATICO
    // ============================================
    activarAuto(on) {
        this.autoEnabled = on;
        if (on) {
            this.apply(this.temaAutomatico(), { persist: false });
            this.programarRevision();
        } else {
            this.detenerRevision();
            this.apply(this.saved || 'midnight');
        }
    }

    programarRevision() {
        this.detenerRevision();
        // Revisar cada 5 minutos: barato y no depende de que la app este activa
        this.timer = setInterval(() => {
            if (!this.autoEnabled) return;
            const deseado = this.temaAutomatico();
            if (deseado !== this.current) this.apply(deseado, { persist: false });
        }, 5 * 60 * 1000);
    }

    detenerRevision() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }

    // ============================================
    // INICIO
    // ============================================
    init() {
        if (this.autoEnabled) {
            this.apply(this.temaAutomatico(), { persist: false });
            this.programarRevision();
        } else {
            this.apply(this.saved || 'midnight', { persist: false });
        }

        // Al volver del segundo plano puede haber cambiado el tramo horario
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && this.autoEnabled) {
                const deseado = this.temaAutomatico();
                if (deseado !== this.current) this.apply(deseado, { persist: false });
            }
        });

        return this.current;
    }

    // ============================================
    // SELECTOR EN AJUSTES
    // ============================================
    renderPicker(contenedor) {
        if (!contenedor) return;

        const grupos = [
            { titulo: 'Dark', filtro: 'dark' },
            { titulo: 'Night vision', filtro: 'night' },
            { titulo: 'Light', filtro: 'light' }
        ];

        contenedor.innerHTML = grupos.map(g => {
            const temas = this.themes.filter(t => t.group === g.filtro);
            if (!temas.length) return '';

            const swatches = temas.map(t => `
                <button type="button" class="theme-swatch${t.id === this.current ? ' selected' : ''}"
                        data-theme-id="${t.id}" aria-label="${t.name}: ${t.desc}">
                    <span class="sw-check">&#10003;</span>
                    <span class="sw-preview" style="background:${t.preview.bg}">
                        <span class="sw-bar" style="background:${t.preview.bar}"></span>
                        <span class="sw-row">
                            <span class="sw-tile" style="background:${t.preview.a}"></span>
                            <span class="sw-tile" style="background:${t.preview.b}"></span>
                            <span class="sw-tile" style="background:${t.preview.c}"></span>
                        </span>
                    </span>
                    <span class="sw-name">${t.name}</span>
                </button>
            `).join('');

            return `
                <div class="theme-group">
                    <label>${g.titulo}</label>
                    <div class="theme-grid">${swatches}</div>
                </div>
            `;
        }).join('');

        contenedor.querySelectorAll('.theme-swatch').forEach(btn => {
            btn.addEventListener('click', () => {
                // Elegir un tema a mano desactiva el automatico
                if (this.autoEnabled) {
                    this.autoEnabled = false;
                    this.detenerRevision();
                    const chk = document.getElementById('theme-auto-toggle');
                    if (chk) chk.checked = false;
                }

                this.apply(btn.dataset.themeId);
                contenedor.querySelectorAll('.theme-swatch').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');

                if (window.PoliceToolsMobile) window.PoliceToolsMobile.haptics.tap();
            });
        });
    }

    /** Refresca la marca de seleccion cuando el tema cambia solo. */
    refrescarSeleccion(contenedor) {
        if (!contenedor) return;
        contenedor.querySelectorAll('.theme-swatch').forEach(b => {
            b.classList.toggle('selected', b.dataset.themeId === this.current);
        });
    }
}

window.themeManager = new ThemeManager();

// El tema se aplica antes de pintar para evitar el destello de color
// equivocado en el arranque.
window.themeManager.init();
