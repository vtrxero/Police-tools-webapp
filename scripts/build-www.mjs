/**
 * Prepara www/ para Capacitor.
 *
 * Capacitor copia una unica carpeta dentro del APK. La raiz del repo no
 * sirve: arrastraria node_modules, android/ y el propio .git. Aqui se
 * copia solo lo que la app necesita en tiempo de ejecucion.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destino = path.join(raiz, 'www');

// Lo que forma la app. Todo lo demas se queda fuera del APK.
const CONTENIDO = [
    'index.html',
    'manifest.json',
    'sw.js',
    'css',
    'js',
    'assets',
    'vendor',
    'pdf-templates'
];

function copiar(origen, dest) {
    const stat = fs.statSync(origen);
    if (stat.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const hijo of fs.readdirSync(origen)) {
            copiar(path.join(origen, hijo), path.join(dest, hijo));
        }
    } else {
        fs.copyFileSync(origen, dest);
    }
}

fs.rmSync(destino, { recursive: true, force: true });
fs.mkdirSync(destino, { recursive: true });

let ficheros = 0;
let bytes = 0;

for (const entrada of CONTENIDO) {
    const origen = path.join(raiz, entrada);
    if (!fs.existsSync(origen)) {
        console.warn(`  aviso: falta ${entrada}`);
        continue;
    }
    copiar(origen, path.join(destino, entrada));
}

// Recuento
(function medir(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) medir(p);
        else { ficheros++; bytes += fs.statSync(p).size; }
    }
})(destino);

console.log(`www/ listo: ${ficheros} archivos, ${(bytes / 1048576).toFixed(1)} MB`);
