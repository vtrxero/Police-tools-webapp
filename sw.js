/**
 * SERVICE WORKER - Police Tools App
 *
 * Objetivo: que la app funcione completa sin señal. Un oficial en patrulla
 * pierde cobertura constantemente, asi que el shell, las librerias y las
 * plantillas PDF tienen que estar en cache desde la primera visita.
 *
 * Estrategias:
 *   - Navegacion (HTML): network-first con fallback a cache.
 *   - Estaticos propios (css/js/assets/vendor): stale-while-revalidate.
 *   - Plantillas PDF: cache-first (son pesadas y no cambian).
 */

const VERSION = 'v2.5.0';
const SHELL_CACHE = `police-tools-shell-${VERSION}`;
const PDF_CACHE = `police-tools-pdf-${VERSION}`;
const RUNTIME_CACHE = `police-tools-runtime-${VERSION}`;

// Recursos sin los que la app no arranca
const SHELL_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './css/mobile.css',
    './css/themes.css',
    './css/ui.css',
    './css/home.css',
    './css/lock.css',
    './assets/hero/skyline-blue.webp',
    './assets/hero/skyline-violet.webp',
    './assets/hero/skyline-sunset.webp',
    './js/app.js',
    './js/file-out.js',
    './js/pdf-view.js',
    './js/mobile.js',
    './js/themes.js',
    './js/navigation.js',
    './js/data-io.js',
    './js/report-store.js',
    './js/signature.js',
    './js/mission-timer.js',
    './js/home.js',
    './js/form-progress.js',
    './js/prefill.js',
    './js/drafts.js',
    './js/photos.js',
    './js/citations.js',
    './js/shift-tools.js',
    './js/month-summary.js',
    './js/lock.js',
    './js/law-library-data.js',
    './js/pdf-generator.js',
    './js/pdf-mappings.js',
    './vendor/pdf-lib.min.js',
    './vendor/jszip.min.js',
    './vendor/pdf.min.mjs',
    './vendor/pdf.worker.min.mjs',
    './vendor/pdfjs-fonts/LiberationSans-Regular.ttf',
    './vendor/pdfjs-fonts/LiberationSans-Bold.ttf',
    './vendor/pdfjs-fonts/LiberationSans-Italic.ttf',
    './vendor/pdfjs-fonts/LiberationSans-BoldItalic.ttf',
    './assets/icon-192x192.png',
    './assets/icon-512x512.png',
    './assets/icon-maskable-512.png'
];

// Plantillas PDF: se cachean en segundo plano para no retrasar la instalacion
const PDF_TEMPLATES = [
    './pdf-templates/Interview.pdf',
    './pdf-templates/guardmount.pdf',
    './pdf-templates/patrol_log.pdf',
    './pdf-templates/PMCS Explorer.pdf',
    './pdf-templates/PMCS Durango.pdf',
    './pdf-templates/PMCS Taurus.pdf',
    './pdf-templates/PMCS F 150.pdf',
    './pdf-templates/PMCS Custom.pdf'
];

// ============================================
// INSTALL
// ============================================
self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(SHELL_CACHE);

        // addAll es atomico: si un recurso falla, se pierde todo el precache.
        // Cacheamos uno por uno para tolerar un archivo ausente.
        await Promise.all(SHELL_ASSETS.map(async (url) => {
            try {
                await cache.add(new Request(url, { cache: 'reload' }));
            } catch (err) {
                console.warn('[SW] No se pudo precachear', url, err.message);
            }
        }));

        // Los PDFs pesan ~11 MB: se cachean sin bloquear la instalacion
        precachePDFTemplates();

        await self.skipWaiting();
    })());
});

async function precachePDFTemplates() {
    const cache = await caches.open(PDF_CACHE);
    for (const url of PDF_TEMPLATES) {
        try {
            const existing = await cache.match(url);
            if (!existing) await cache.add(new Request(url, { cache: 'reload' }));
        } catch (err) {
            console.warn('[SW] Plantilla no cacheada', url, err.message);
        }
    }
}

// ============================================
// ACTIVATE - limpiar caches de versiones viejas
// ============================================
self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        const vigentes = [SHELL_CACHE, PDF_CACHE, RUNTIME_CACHE];
        await Promise.all(
            keys.filter(k => k.startsWith('police-tools-') && !vigentes.includes(k))
                .map(k => caches.delete(k))
        );
        await self.clients.claim();
    })());
});

// ============================================
// FETCH
// ============================================
self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // Navegacion: red primero para recoger cambios, cache si no hay señal
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request, SHELL_CACHE, './index.html'));
        return;
    }

    // Plantillas PDF: cache primero, son grandes e inmutables
    if (url.pathname.includes('/pdf-templates/')) {
        event.respondWith(cacheFirst(request, PDF_CACHE));
        return;
    }

    // Resto de estaticos propios
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

async function networkFirst(request, cacheName, fallbackUrl) {
    const cache = await caches.open(cacheName);
    try {
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
    } catch (err) {
        const cached = await cache.match(request) || await cache.match(fallbackUrl);
        if (cached) return cached;
        return new Response('Sin conexion y sin copia en cache.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }
}

async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
    } catch (err) {
        return new Response('Recurso no disponible sin conexion.', { status: 503 });
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const fetching = fetch(request).then((response) => {
        if (response && response.ok) cache.put(request, response.clone());
        return response;
    }).catch(() => null);

    if (cached) return cached;

    const fresh = await fetching;
    return fresh || new Response('Recurso no disponible sin conexion.', { status: 503 });
}

// ============================================
// MENSAJES DESDE LA APP
// ============================================
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING' || event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    if (event.data?.type === 'CACHE_PDF_TEMPLATES') {
        event.waitUntil(precachePDFTemplates());
    }
});
