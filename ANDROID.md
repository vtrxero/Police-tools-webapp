# APK de Android

La app es la misma en web y en Android: Capacitor empaqueta los archivos de
`www/` dentro del APK, así que funciona sin conexión y sin necesidad de
alojar nada.

## Dos versiones instaladas a la vez

Hay dos aplicaciones, no una con dos compilaciones:

| | Police Tools | Police Tools V2 |
|---|---|---|
| `applicationId` | `mil.buchanan.policetools` | `mil.buchanan.policetools.v2` |
| Nombre en el lanzador | Police Tools | Police Tools V2 |
| Versión | 2.7.x | 1.0.x |
| Release | `apk-latest` | `apk-v2` |
| Fichero | `PoliceTools.apk` | `PoliceToolsV2.apk` |
| Carpeta en Documents | `PoliceTools/` | `PoliceToolsV2/` |
| Rama | `claude/abrir-esto-m2sdix` | `claude/civilian-police-app-ideas-nctsgk` |

Lo que las separa es el **`applicationId`**: Android identifica una app por ese
valor. Con el mismo, instalar V2 *sustituiría* a la original; con el sufijo
`.v2` son dos entradas distintas en el lanzador, cada una con su
almacenamiento. La original se queda como está, funcionando, mientras V2 va
creciendo.

Tres cosas más tuvieron que separarse, porque el `applicationId` no las cubre:

- **La carpeta de `Documents`.** Es del teléfono, no de la app, así que las dos
  podían escribir en la misma. V2 usa `Documents/PoliceToolsV2/`, de modo que
  su copia automática no pisa la de la original — que es justo el respaldo que
  sobrevive a una desinstalación.
- **El `authority` del FileProvider.** Se declara como
  `${applicationId}.fileprovider`, así que sale distinto solo. Dos apps con el
  mismo authority no pueden estar instaladas a la vez: la segunda falla al
  instalar.
- **El `id` del manifest de la PWA**, para que instalada desde el navegador
  también aparezca como un icono aparte.

El workflow comprueba el `applicationId` **dentro del APK compilado** (con
`aapt dump badging`) antes de publicar nada. Verificarlo solo en el fuente no
bastaría: lo que instala el teléfono es el binario, y un APK con el
`applicationId` equivocado no se descubre hasta tener la app original
sustituida.

### Los datos no se comparten

Son dos cajones separados: los reportes de la original **no aparecen** en V2.
Para llevarte el historial, en la original *Ajustes → Backup → Export* y en V2
*Import*.

## Instalar en el teléfono

**Police Tools V2** (esta versión, la que recibe las funciones nuevas):

**https://github.com/vtrxero/Police-tools-webapp/releases/download/apk-v2/PoliceToolsV2.apk**

**Police Tools** (la original, congelada):

**https://github.com/vtrxero/Police-tools-webapp/releases/download/apk-latest/PoliceTools.apk**

Ábrelos **desde el propio teléfono**. Son siempre los mismos enlaces y cada uno
apunta a la última compilación de su versión: cada push lo reemplaza. Android
pedirá permiso para instalar desde esta fuente, que es lo normal en una app que
no viene de Play Store.

El artefacto de la pestaña *Actions* sigue estando, pero para instalar no
sirve: viene comprimido en un zip y su descarga exige estar identificado en
GitHub. Úsalo solo para recuperar una compilación antigua.

El workflow verifica antes de compilar que las plantillas PDF y los scripts
estén dentro del paquete. Sin esa comprobación, un fallo al copiar produce un
APK que instala y arranca en blanco, que es peor que un fallo de compilación.

## Actualizar sin perder los reportes

Descarga el APK nuevo y ábrelo: se instala encima del anterior y **conserva los
reportes**. No hay que desinstalar nada. Tres cosas lo sostienen:

**Una sola clave de firma.** Todas las compilaciones firman con
`android/app/debug.keystore`, versionada con el proyecto. Android trata dos
APKs con firmas distintas como aplicaciones ajenas y se niega a instalar uno
sobre el otro (*"App not installed"*). Antes Gradle generaba una clave nueva en
cada runner de CI, así que cada APK salía firmado distinto. El workflow ahora
compara el SHA-256 del APK con el del keystore y falla si no coinciden, en vez
de dejar que se descubra en el teléfono.

**Un `versionCode` que solo sube.** Sale del recuento de commits
(`git rev-list --count HEAD`), así que cada publicación es mayor que la
anterior y el instalador la reconoce como actualización y no como
reinstalación. Un paso con `aapt` comprueba que el número que acabó dentro del
APK es el esperado.

**Una copia automática fuera de la app.** La app escribe sola
`Documents/PoliceTools/PoliceTools_AutoBackup.json` con todos los reportes y
sus PDFs. `Documents` es del teléfono, no de la app: desinstalar borra el
almacenamiento interno pero no toca esa carpeta. Si algún día hay que
reinstalar desde cero, *Ajustes → Backup → Import* y ese fichero lo devuelve
todo.

La copia se rehace unos segundos después de guardar un documento o un turno, y
solo si algo cambió de verdad: lleva una huella de lo guardado y, si coincide
con la de la última copia, no reescribe (el fichero pesa decenas de MB con los
PDFs dentro). Es silenciosa, no interrumpe. En el navegador no se ejecuta,
porque una web no puede escribir en disco sin que se lo pidan.

Si tienes instalado un APK anterior a la versión 2.1.0 —los que se firmaban con
la clave aleatoria— esa sí necesita desinstalarse una vez: exporta el JSON
desde *Ajustes → Backup*, desinstala, instala el APK nuevo e importa el JSON.
De ahí en adelante las actualizaciones entran directas.

## Compilar en tu máquina

Hace falta el SDK de Android, que en el entorno de desarrollo no se puede
descargar (`dl.google.com` está bloqueado por política de red).

```bash
npm install
npm run android:debug
# android/app/build/outputs/apk/debug/app-debug.apk
```

## APK firmado para repartir

La clave de debug está en el repositorio, así que su contraseña es pública y no
acredita quién construyó el APK. Sirve para que las actualizaciones se
instalen encima, no para demostrar procedencia. Para repartir la app fuera del
equipo hace falta una clave propia que no salga de tus manos.

```bash
keytool -genkey -v -keystore police-tools.keystore \
  -alias policetools -keyalg RSA -keysize 2048 -validity 10000
```

Guarda `police-tools.keystore` **fuera del repositorio y con copia**. Si la
pierdes, no puedes publicar actualizaciones sobre la app instalada.

Después, en *Settings → Secrets and variables → Actions* del repositorio:

| Secret | Valor |
|---|---|
| `KEYSTORE_BASE64` | `base64 -w0 police-tools.keystore` |
| `KEYSTORE_PASSWORD` | la contraseña del almacén |
| `KEY_ALIAS` | `policetools` |
| `KEY_PASSWORD` | la contraseña de la clave |

Y lanza el workflow a mano desde Actions marcando *release*.

## Qué cambia dentro del APK

- **El Service Worker no se registra.** Los archivos ya vienen empaquetados,
  así que no aporta nada y su caché podría servir la versión anterior después
  de actualizar la app.
- **La copia automática de Android está desactivada** (`allowBackup="false"`).
  Subiría los nombres, direcciones y MIDs de los entrevistados a la cuenta de
  Google del dispositivo. La copia se hace desde *Ajustes → Backup*, que es
  explícita y va a un archivo que controlas tú.
- **Orientación fija en vertical** y el teclado redimensiona la vista en vez
  de taparla.

## Ojo con el almacenamiento

El APK y el navegador son dos cajones separados: los reportes guardados en
uno **no aparecen** en el otro. Si usas los dos, mueve los datos con
*Ajustes → Backup* (exportar en uno, importar en el otro).

Lo razonable es usar el APK para el trabajo diario y la web solo para
consultar desde el ordenador.

Ojo con un caso: en el **navegador**, si la original y V2 se sirven del mismo
origen (mismo dominio y puerto), sí comparten `localStorage` e IndexedDB —
esos almacenes van por origen, no por carpeta. En el APK nunca pasa, porque
ahí las separa el `applicationId`. Para tenerlas separadas también en web,
sírvelas en puertos distintos.

## Permisos que pide

| Permiso | Para qué |
|---|---|
| `INTERNET` | Capacitor lo exige aunque la app no salga a la red |
| `CAMERA` | Fotos de daños en el PMCS |
| `VIBRATE` | Confirmación táctil al pulsar |
| `USE_BIOMETRIC` | Desbloqueo con huella |

Cámara y huella se declaran como **no obligatorias**, así que la app se instala
igual en un dispositivo que no las tenga.
