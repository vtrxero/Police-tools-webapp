# Police Tools

Suite de productividad para agentes de policía. PWA sin build step: HTML, CSS y
JavaScript vanilla que se sirven como archivos estáticos.

## Uso

```bash
npx http-server -p 8080 -c-1
# abrir http://localhost:8080
```

Hace falta servirla por HTTP (no `file://`): el Service Worker y la carga de las
plantillas PDF requieren un origen real.

## Qué hace

| Vista | Función |
|---|---|
| **Interview** | Hoja de entrevista (59 campos) |
| **Guard Mount** | Parte de revista con hasta 18 efectivos |
| **Patrol Log** | Registro de patrulla con tabla de misiones |
| **PMCS** | Inspección de vehículo (Explorer, Taurus, Durango, F-150, Custom) |
| **Law Library** | 761 códigos bilingües EN/ES: tránsito de Ft. Buchanan (9 L.P.R.A.) y penal federal (U.S.C.) |
| **Daily Reports** | Documentos generados, con filtro por fecha y compartir múltiple |
| **Panama Schedule** | Calendario de turnos 2-2-3 con editor de patrón |

Todo se guarda en `localStorage`. No hay backend ni salida de datos del dispositivo.

## Estructura

```
index.html              UI completa
css/styles.css          estilos base
css/mobile.css          capa de optimización móvil
js/app.js               controlador (clase PoliceToolsApp)
js/pdf-generator.js     relleno de AcroForms con pdf-lib
js/pdf-mappings.js      mapeo campo UI -> campo PDF
js/law-library-data.js  base de datos legal
js/mobile.js            teclado, conexión, hápticos, wake lock
sw.js                   Service Worker (offline)
vendor/                 pdf-lib y JSZip servidos localmente
pdf-templates/          plantillas AcroForm
```

## PDFs

Los PDFs se entregan como **formularios rellenables**: los valores se ven al
abrirlos y los campos siguen siendo editables en cualquier visor. No se aplanan.

Para conseguirlo se generan las apariencias con `updateFieldAppearances()` y se
marca `NeedAppearances` en el AcroForm, de modo que los visores que no leen las
apariencias precalculadas las regeneren ellos.

### Plantilla ausente: `patrol_log.pdf`

El paquete original no incluía `pdf-templates/patrol_log.pdf`, así que la
generación del Patrol Log fallaba por completo. Ahora la app detecta que la
plantilla no está y compone el formulario desde cero
(`generatePatrolFromScratch`), con la misma estructura que el impreso oficial y
con campos AcroForm reales, no texto fijo.

Si consigues el `patrol_log.pdf` original, déjalo en `pdf-templates/` y la app lo
usará automáticamente: la detección es en tiempo de ejecución.

### Rejilla del PMCS

Las plantillas PMCS no nombran los campos de forma semántica; en el PDF real se
llaman `checkbox_27pmos`, `text_86wdvw`, etc. Por eso el mapeo por nombre nunca
encontraba nada y las marcas de inspección no se escribían. La rejilla se
localiza ahora por posición en la página (`buildPMCSGrid`), lo que funciona con
las cinco plantillas.

`p. Vehicle GSA Fuel card` no tiene casillas en el formulario oficial (dice
"On file / At the desk"); si se marca en la app, queda anotado en REMARKS.

## Móvil

- Zoom permitido (accesibilidad); el zoom-al-enfocar de iOS se evita con
  `font-size: 16px` en los inputs, no bloqueando el gesto.
- Objetivos táctiles de 44px mínimo.
- `env(safe-area-inset-*)` para notch y barra de gestos.
- Estados `:hover` desactivados en pantallas táctiles (se quedaban pegados).
- Teclado numérico automático en millaje, horas y conteos.
- Enter salta al campo siguiente.
- Wake lock mientras hay un formulario abierto.
- Aviso de estado sin conexión.
- Funciona offline completo, plantillas PDF incluidas.
