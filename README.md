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
css/themes.css          8 paletas + selector
css/mobile.css          capa de optimización móvil
js/app.js               controlador (clase PoliceToolsApp)
js/themes.js            motor de temas y modo automático por hora
js/navigation.js        barra inferior
js/report-store.js      PDFs en IndexedDB
js/data-io.js           copia de seguridad y envío por correo
js/signature.js         firma con el dedo
js/mission-timer.js     cronómetro de misión y dictado
js/photos.js            fotos de daños del PMCS
js/home.js              estado del turno en el inicio
js/form-progress.js     secciones, progreso y prellenado
js/citations.js         citaciones del turno y buscador global
js/pdf-generator.js     relleno de AcroForms con pdf-lib
js/pdf-mappings.js      mapeo campo UI -> campo PDF
js/law-library-data.js  base de datos legal
js/mobile.js            teclado, conexión, hápticos, wake lock
sw.js                   Service Worker (offline)
vendor/                 pdf-lib y JSZip servidos localmente
pdf-templates/          plantillas AcroForm
```

## Almacenamiento

Los PDFs viven en **IndexedDB**, no en `localStorage`. Medido en el navegador:
la cuota de `localStorage` es de ~4.8 MB y cada documento ocupa entre 0.8 y
1.7 MB en base64, así que la app dejaba de poder guardar al tercer o cuarto
reporte y el fallo era silencioso. IndexedDB guarda Blobs sin el 33% extra del
base64 y dispone de ~1 GB.

En `localStorage` queda solo la ficha del reporte. La migración de lo ya
guardado corre sola al arrancar.

**Haz copias.** Ajustes → Backup exporta un JSON con todo, PDFs incluidos.
Sin eso, borrar los datos del navegador o reinstalar la PWA pierde el historial.

## Envío por correo

Se marcan varios documentos en Daily Reports y se envían juntos. La vía
principal es la API de compartir con ficheros, que los pasa como adjuntos a
Gmail, Outlook o Mail. Cuando no está disponible se descarga un ZIP y se abre
el borrador con `mailto:`, avisando de que hay que adjuntarlo — `mailto:` no
admite adjuntos. El asunto se compone solo con los tipos y las fechas.

## Temas

Ocho paletas: cuatro oscuras (Midnight, Carbon, Forest, Tactical), tres claras
(Daylight, Paper, High Noon) y **Night Ops**, en rojo sobre negro. El ojo
adaptado a la oscuridad apenas percibe el rojo, así que la pantalla se lee de
madrugada sin perder la visión nocturna, que tarda unos 20 minutos en volver.

Hay un modo automático por hora: Daylight de día, Midnight al atardecer y
Night Ops de madrugada.

## PDFs

Los PDFs se entregan como **formularios rellenables**: los valores se ven al
abrirlos y los campos siguen siendo editables en cualquier visor. No se aplanan.

Para conseguirlo se generan las apariencias (`/AP`) con `updateFieldAppearances()`
y se dejan los campos intactos.

No se marca `NeedAppearances`: esa bandera le dice al visor que ignore las
apariencias del archivo y las reconstruya él mismo, y al hacerlo coloca mal el
texto de los campos que la app crea (se veía el valor de un campo encima del de
al lado). Con las `/AP` ya generadas no hace falta.

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

### Cabecera del PMCS Taurus

`PMCS Taurus.pdf` es otra edición del formulario (9232-R-E, JUN 2008) y sólo
define `Shift` en la página 1: los otros nueve recuadros de la cabecera están
impresos pero sin campo de formulario, así que el vehículo, el operador, el
supervisor y los millajes se perdían al generar el PDF.

`pmcsTaurusMapping.missingFields` declara esos nueve campos con las coordenadas
medidas sobre las etiquetas impresas de esa misma página, y
`crearCamposAusentes` los crea al generar. La cabecera pasa de 1/10 a 10/10.

### Rejilla del PMCS

Las plantillas PMCS no nombran los campos de forma semántica; en el PDF real se
llaman `checkbox_27pmos`, `text_86wdvw`, etc. Por eso el mapeo por nombre nunca
encontraba nada y las marcas de inspección no se escribían. La rejilla se
localiza ahora por posición en la página (`buildPMCSGrid`), lo que funciona con
las cinco plantillas.

`p. Vehicle GSA Fuel card` no tiene casillas en el formulario oficial (dice
"On file / At the desk"); si se marca en la app, queda anotado en REMARKS.

## Funciones

- **Firma con el dedo**: se dibuja en un canvas y se incrusta como PNG sobre la
  línea de firma del formulario. Antes solo se podía teclear el nombre, así que
  había que imprimir el PDF para firmarlo.
- **Cronómetro de misión**: un botón marca la hora de entrada con el reloj real
  y otro cierra la misión y rellena la salida.
- **Dictado por voz** en descripciones y observaciones, en español o inglés.
- **Fotos de daños** en el PMCS, adjuntas como páginas extra del PDF.
- **Citaciones del turno**: desde una ley se añade al turno y los contadores de
  Moving / Non-Moving del Patrol Log se rellenan solos.
- **Buscador global** sobre leyes, reportes y misiones anteriores.
- **Prellenado** con los datos del turno anterior.
- El inicio muestra cuánto falta del turno, qué documentos se enviaron hoy y si
  hay un borrador sin terminar.

## Móvil

- Barra de navegación inferior fija con botón para crear documentos.
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
