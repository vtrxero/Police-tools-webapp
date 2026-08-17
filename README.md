# Police Tools

Suite de productividad para agentes de policía. PWA sin build step: HTML, CSS y
JavaScript vanilla que se sirven como archivos estáticos.

## Uso

**Android:** abre desde el teléfono
[**PoliceTools.apk**](https://github.com/vtrxero/Police-tools-webapp/releases/download/apk-latest/PoliceTools.apk).
Es siempre el mismo enlace y apunta a la última compilación. Ver
[ANDROID.md](ANDROID.md).

**Web:**

```bash
npm install
npm run serve
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
js/shift-tools.js       prellenado por turno, continuación y plantillas
js/month-summary.js     resumen del mes
js/pdf-generator.js     relleno de AcroForms con pdf-lib
js/pdf-mappings.js      mapeo campo UI -> campo PDF
js/pdf-view.js          vista previa en canvas con pdf.js
js/file-out.js          descargar, compartir y correo (web y APK)
js/law-library-data.js  base de datos legal
js/mobile.js            teclado, conexión, hápticos, wake lock
sw.js                   Service Worker (offline)
vendor/                 pdf-lib, JSZip y pdf.js servidos localmente
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

## Sacar documentos del dispositivo

Descargar, compartir y enviar por correo salen todos por `js/file-out.js`
(`window.PTOut`), que tiene dos implementaciones detrás.

**En el APK** la app corre en un WebView de Android, no en Chrome, y ahí no
existe ninguna de las tres cosas que usaba la versión web:

| | WebView de Android |
|---|---|
| `navigator.share` | no existe (es API de Chrome) |
| `<a download href="blob:">` | no hay gestor de descargas; el clic no hace nada |
| `<iframe src="*.pdf">` | no hay visor de PDF; sale en blanco |

Ninguna de las tres lanza excepción, así que Download, Share y Preview se
ejecutaban enteros sin hacer nada. En nativo se resuelven con los plugins
`@capacitor/filesystem` (escribe el PDF en `Documents/PoliceTools`, y si esa
carpeta no deja escribir cae a la de la app) y `@capacitor/share` (pasa la URI
al selector de Android, que es lo que Gmail o Drive saben recibir). Los
plugins se usan con `Capacitor.registerPlugin`, sin empaquetador.

**En el navegador** se usan la Web Share API y `<a download>` como antes.

Se marcan varios documentos en Daily Reports y se envían juntos: compartir
los adjunta de verdad. Cuando no hay forma de adjuntar se descarga un ZIP y se
abre el borrador con `mailto:`, avisando de que hay que adjuntarlo —
`mailto:` no admite adjuntos. El asunto se compone con los tipos y las fechas.

## Vista previa

Las páginas se dibujan sobre canvas con pdf.js (`js/pdf-view.js`), en vez de
delegar en el visor del sistema con un `<iframe>`. Así se ve igual en el
teléfono, en el navegador y sin conexión. La librería se carga con `import()`
la primera vez que se abre una vista previa: son 400 KB más el worker y no
hacen falta para arrancar. Se incluyen las fuentes sustitutas de pdf.js
(`vendor/pdfjs-fonts/`) porque los formularios usan Helvetica sin embeber y
sin ellas los campos rellenos saldrían vacíos.

## Calendario

Cada día se colorea con el turno que toca según el patrón de *Panama Schedule*
(azul de día, violeta de noche, sin color libre), con punto rojo en los
feriados y verde en los días que ya tienen horas registradas. Al tocar un día
se abre la ficha, que es donde caben los nombres largos.

Tres defectos que tenía:

- **Se salía de la pantalla.** Las rejillas usaban `repeat(7, 1fr)`, y `1fr`
  es `minmax(auto, 1fr)`: la columna no puede encogerse por debajo de su
  contenido. El nombre del feriado dentro de la celda ("Thanksgiving")
  estiraba la columna a 68 px, las siete sumaban 550 px y el sábado quedaba
  fuera. Con `minmax(0, 1fr)` cabe desde 320 px.
- **Dos calendarios con las mismas clases.** Este y el de *Panama Schedule*
  declaraban `.calendar-day`, `.calendar-header` y `.calendar-nav` por
  separado, y ganaba el segundo por estar más abajo en el archivo: este
  calendario se pintaba con los estilos del otro. Cada uno va ahora acotado a
  su vista.
- **Los feriados estaban fijados a 2025.** Seis de los once son días móviles
  y estaban escritos a mano (`${year}-01-20`, `${year}-11-27`), así que en
  cualquier otro año caían mal: en 2026 el día de Martin Luther King es el 19
  de enero y Thanksgiving el 26 de noviembre. Ahora se calculan, y los de
  fecha fija que caen en fin de semana muestran el día observado.

Las fechas ya no se construyen con `new Date('2026-11-11')`: eso se interpreta
como UTC y en Puerto Rico (UTC−4) retrocedía un día, por lo que Veterans Day
aparecía el 10.

## Horario de Panamá

Ciclo 2-2-3 de catorce días, con rotación día/noche cada dos meses. Tres cosas
impedían cuadrarlo:

- **El ciclo arrancaba un día antes.** `new Date('2026-08-19')` se interpreta
  como medianoche UTC, que en Puerto Rico es el 18 a las 20:00, y el
  `setHours(0,0,0,0)` que venía detrás lo dejaba en el día 18. Marcar «el 19
  fue OFF» pintaba el 19 como ON.
- **Decir «ese día fue OFF» no sitúa el ciclo.** En un 2-2-3 hay siete
  posiciones libres, así que esa respuesta deja siete fases posibles y la app
  elegía una. Si tu rotación no empezaba justo en el límite del patrón, no
  había forma de expresarla. Ahora se marcan sobre el calendario dos o tres
  días que se trabajan de verdad y la app prueba las 28 combinaciones (14
  desfases × empezar en ON u OFF) y se queda con la que más acierta. También
  hay un ajuste de ±1 día.
- **La rotación iba cada 60 días**, no cada dos meses, así que el cambio se
  adelantaba un poco en cada vuelta y acababa cayendo a mitad de mes. Se
  cuenta por meses de calendario.

Los turnos son de **13 horas**: día 0530-1830 y noche 1730-0630. Se entra media
hora antes del relevo y se sale media hora después, y de esas 13 una va como
**overtime** — de ahí el solape entre el fin del turno de día y el inicio del
de noche. El inicio anunciaba «Day Shift 0700-1500» porque usaba los horarios
de 8 horas del turno por defecto.

El resumen del mes separa las dos cosas: lo que pase de 12 horas en un mismo
turno cuenta como extra, así que tres turnos de 13 salen como 36 h regulares y
3 h de overtime. Un turno marcado explícitamente como *overtime* cuenta
entero.

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

## Seguridad

La app guarda nombres de entrevistados, direcciones y MIDs, así que tiene
**bloqueo con PIN** de cuatro dígitos y huella donde el dispositivo la ofrezca.

El PIN no se guarda: se guarda su derivación PBKDF2 con sal y 210.000
iteraciones. Un SHA-256 a secas no serviría, porque un PIN de cuatro dígitos
son 10.000 combinaciones y se rompe al instante. Tras cinco fallos hay que
esperar 30 segundos; no se borra nada, porque perder los reportes por teclear
mal sería peor que el riesgo que evita.

En el APK la copia automática de Android está desactivada: subiría esos datos
a la cuenta de Google del dispositivo.

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
- **Buscador global** sobre leyes, reportes y misiones anteriores. Busca dentro
  de todos los campos de los documentos guardados, así que encuentra un
  entrevistado, un MID o una placa sin abrir los PDFs, y dice en qué campo
  coincidió. Se excluyen las firmas (son PNG en base64).
- **Prellenado** con los datos del turno anterior.
- **Cabecera desde el calendario**: la app ya sabe qué turno toca hoy, así que
  ofrece poner la fecha y marcar DAYS / SWINGS / MID en el Patrol Log.
- **Continuar del turno anterior**: el Mid Shift cruza medianoche y queda
  partido en dos Patrol Log. Arrastra el millaje de cierre como millaje de
  apertura, con el vehículo y el radio.
- **Plantillas de misión**: las descripciones que se repiten cada turno, a un
  toque. Las que se usan de verdad suben en la lista.
- **Aviso de PMCS**: si el turno está empezado y no hay inspección del día,
  avisa. Una vez al día y solo estando de turno.
- **Resumen del mes**: horas, horas extra, citaciones y documentos, con el
  desglose. Sale de lo que ya está guardado, así que no hay nada nuevo que
  rellenar. Las horas se recalculan de las horas de entrada y salida porque el
  campo `total_hours` daba negativo en los turnos que cruzan medianoche.
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
