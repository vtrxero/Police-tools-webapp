# APK de Android

La app es la misma en web y en Android: Capacitor empaqueta los archivos de
`www/` dentro del APK, así que funciona sin conexión y sin necesidad de
alojar nada.

## Instalar en el teléfono

Abre este enlace **desde el propio teléfono**:

**https://github.com/vtrxero/Police-tools-webapp/releases/download/apk-latest/PoliceTools.apk**

Es siempre el mismo enlace y siempre apunta a la última compilación: cada push
lo reemplaza. Android pedirá permiso para instalar desde esta fuente, que es lo
normal en una app que no viene de Play Store.

El artefacto de la pestaña *Actions* sigue estando, pero para instalar no
sirve: viene comprimido en un zip y su descarga exige estar identificado en
GitHub. Úsalo solo para recuperar una compilación antigua.

El workflow verifica antes de compilar que las plantillas PDF y los scripts
estén dentro del paquete. Sin esa comprobación, un fallo al copiar produce un
APK que instala y arranca en blanco, que es peor que un fallo de compilación.

## Actualizar sin perder los reportes

Las actualizaciones se instalan encima y **conservan los datos**, porque todas
las compilaciones se firman con la misma clave (`android/app/debug.keystore`,
versionada con el proyecto).

Hubo una excepción: los APKs anteriores a la versión 2.1.0 se firmaron con la
clave que Gradle se generaba en cada runner, distinta cada vez. Si tienes uno
de esos instalado, Android rechazará la actualización con *"App not installed"*
y hay que desinstalar primero:

1. *Ajustes → Backup* en la app, y exporta el JSON
2. Desinstala Police Tools
3. Instala el APK nuevo
4. *Ajustes → Backup → Import* y elige el JSON

Solo hace falta una vez. A partir de ahí las actualizaciones entran directas.

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

## Permisos que pide

| Permiso | Para qué |
|---|---|
| `INTERNET` | Capacitor lo exige aunque la app no salga a la red |
| `CAMERA` | Fotos de daños en el PMCS |
| `VIBRATE` | Confirmación táctil al pulsar |
| `USE_BIOMETRIC` | Desbloqueo con huella |

Cámara y huella se declaran como **no obligatorias**, así que la app se instala
igual en un dispositivo que no las tenga.
