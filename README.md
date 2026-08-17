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

Los cuatro documentos se generan sobre la plantilla oficial correspondiente.
Si falta una plantilla, la generación se detiene con un error explícito en vez
de producir un sustituto.

### Tabla de misiones del Patrol Log

`patrol_log.pdf` no numera sus campos de forma coherente entre páginas:

- Página 1: filas 1-26 completas (IN, OUT, DESCRIPTION, REMARKS).
- Página 2: `INRow27..65`, pero la descripción va desfasada un número (la fila
  de `INRow27` lleva `...WhyRow26`) hasta que la ausencia de `...WhyRow42`
  reajusta la cuenta.
- `OUTRow` solo llega a 39 y esos campos están en las filas finales.
- `REMARKS` solo existe en la página 1.

Rellenar por número mandaba la hora de salida de la misión 27 a 26 filas más
abajo y descartaba sus observaciones sin avisar. Las filas se localizan ahora
por su altura en la página (`buildPatrolRows`), de modo que cada dato cae en su
celda impresa.

Dos defectos de la plantilla se corrigen al vuelo:

- `MISSION DESCRIPTION...Row26` tiene dos widgets (última fila de la página 1 y
  primera de la página 2). Al ser un único campo, ambas filas mostraban el mismo
  texto. `separarCamposCompartidos` lo divide en dos campos independientes.
- La hoja de continuación dibuja las columnas OUT y REMARKS pero no define
  widgets para la mayoría de sus filas. `completarCeldasFaltantes` los crea
  tomando la posición de las columnas que sí existen, que comparten x y ancho
  en ambas páginas.

Si hay más misiones que filas (65), la app avisa en vez de descartarlas
en silencio.

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
