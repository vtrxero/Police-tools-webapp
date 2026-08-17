# APK de Android

La app es la misma en web y en Android: Capacitor empaqueta los archivos de
`www/` dentro del APK, así que funciona sin conexión y sin necesidad de
alojar nada.

## Cómo conseguir el APK

**El más fácil: GitHub Actions.** Cada push a cualquier rama compila el APK
automáticamente.

1. Abre la pestaña **Actions** del repositorio
2. Entra en la ejecución más reciente de *Android APK*
3. Descarga el artefacto **PoliceTools-debug-apk**
4. Pásalo al teléfono e instálalo (hay que permitir "orígenes desconocidos")

El workflow verifica antes de compilar que las plantillas PDF y los scripts
estén dentro del paquete. Sin esa comprobación, un fallo al copiar produce un
APK que instala y arranca en blanco, que es peor que un fallo de compilación.

## Compilar en tu máquina

Hace falta el SDK de Android, que en el entorno de desarrollo no se puede
descargar (`dl.google.com` está bloqueado por política de red).

```bash
npm install
npm run android:debug
# android/app/build/outputs/apk/debug/app-debug.apk
```

## APK firmado para repartir

El APK de debug sirve para probar, pero cada compilación lleva una firma
distinta, así que Android no deja actualizar encima: hay que desinstalar y
volver a instalar, perdiendo los datos. Para repartirlo de verdad hace falta
una clave propia.

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
