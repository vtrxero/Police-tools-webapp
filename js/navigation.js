/**
 * NAVIGATION - Police Tools App
 *
 * Barra inferior fija. Antes la unica forma de pasar de una herramienta a
 * otra era volver al inicio; ahora las cinco zonas estan siempre a un toque.
 */

(function () {
    'use strict';

    // Vistas que corresponden a cada posicion de la barra
    const RUTAS = {
        'home': null,                 // cierra la vista activa
        'daily-reports': 'daily-reports',
        'law-library': 'law-library',
        'panama': 'panama'
    };

    // Que posicion se marca activa cuando se abre una vista cualquiera
    const VISTA_A_NAV = {
        'daily-reports': 'daily-reports',
        'law-library': 'law-library',
        'panama': 'panama',
        'calendar': 'panama'
    };

    let nav, sheet;

    function app() {
        return window.app;
    }

    // ============================================
    // ESTADO ACTIVO
    // ============================================
    function marcarActivo(clave) {
        if (!nav) return;
        nav.querySelectorAll('.bn-item').forEach(b => {
            b.classList.toggle('active', b.dataset.nav === clave);
        });
    }

    /** Sincroniza la barra con la vista que este abierta. */
    function sincronizar() {
        const activa = document.querySelector('.tab-view.active');
        if (!activa) {
            marcarActivo('home');
            return;
        }
        const id = activa.id.replace(/-view$/, '');
        marcarActivo(VISTA_A_NAV[id] || '');
    }

    // ============================================
    // HOJA DEL BOTON +
    // ============================================
    function abrirHoja() {
        if (!sheet) return;
        sheet.hidden = false;
        // Bloquea el scroll de detras mientras la hoja esta abierta
        document.body.style.overflow = 'hidden';
    }

    function cerrarHoja() {
        if (!sheet) return;
        sheet.hidden = true;
        document.body.style.overflow = '';
    }

    // ============================================
    // CONTADOR DE REPORTES DEL DIA
    // ============================================
    function actualizarBadge() {
        const badge = document.getElementById('bn-reports-badge');
        if (!badge || !app()) return;

        try {
            const hoy = new Date().toISOString().split('T')[0];
            const delDia = (app().dailyReports || []).filter(r => {
                const f = r.formDate || r.date || '';
                return String(f).startsWith(hoy);
            });
            badge.hidden = delDia.length === 0;
        } catch (e) {
            badge.hidden = true;
        }
    }

    // ============================================
    // INICIO
    // ============================================
    function init() {
        nav = document.getElementById('bottom-nav');
        sheet = document.getElementById('new-sheet');
        if (!nav) return;

        // Posiciones normales
        nav.querySelectorAll('.bn-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const clave = btn.dataset.nav;
                const destino = RUTAS[clave];

                if (!app()) return;

                if (destino === null) {
                    // Inicio: cerrar lo que haya abierto
                    if (document.querySelector('.tab-view.active')) app().closeCurrentTab();
                } else {
                    app().openTab(destino);
                }

                marcarActivo(clave);
            });
        });

        // Boton central
        document.getElementById('bn-new')?.addEventListener('click', abrirHoja);
        document.getElementById('new-sheet-cancel')?.addEventListener('click', cerrarHoja);

        sheet?.addEventListener('click', (e) => {
            // Tocar fuera de la hoja la cierra
            if (e.target === sheet) cerrarHoja();
        });

        sheet?.querySelectorAll('.sheet-item').forEach(item => {
            item.addEventListener('click', () => {
                const tab = item.dataset.new;
                cerrarHoja();
                if (app()) {
                    app().openTab(tab);
                    marcarActivo('');
                }
            });
        });

        // Escape cierra la hoja
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sheet && !sheet.hidden) cerrarHoja();
        });

        // La barra tiene que seguir a la vista, se abra desde donde se abra
        // (tarjetas del inicio, menu, boton atras de Android, ?tab=...)
        const observer = new MutationObserver(sincronizar);
        document.querySelectorAll('.tab-view').forEach(v => {
            observer.observe(v, { attributes: true, attributeFilter: ['class'] });
        });

        sincronizar();
        actualizarBadge();
        document.addEventListener('reportschanged', actualizarBadge);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.PoliceToolsNav = { sincronizar, actualizarBadge, cerrarHoja };
})();
