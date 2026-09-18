# ROADMAP de V2

Lo que entra en **Police Tools V2**, en orden. La versión original queda
congelada como aplicación aparte (ver [ANDROID.md](ANDROID.md)): nada de esto
se le añade.

El orden no es por importancia, es por dependencias. Primero lo que no
necesita nada de fuera.

## Hecho

- [x] **V2 como APK independiente.** `applicationId
      mil.buchanan.policetools.v2`, nombre *Police Tools V2*, versión 1.0.x,
      release `apk-v2`, carpeta `Documents/PoliceToolsV2/`. El workflow
      verifica el `applicationId` dentro del APK compilado antes de publicar.

- [x] **Log de calibración de radar/lidar.** Check al abrir y cerrar turno
      —autotest, display/audio, diapasones con valor grabado y obtenido—, hoja
      en PDF dibujada con pdf-lib, veredicto calculado contra ±1 mph y aviso
      cuando falta el check de entrada.

- [x] **Backup cifrado.** AES-GCM con clave derivada por PBKDF2 (210.000
      iteraciones, como el PIN), sal e IV nuevos en cada export, y las copias
      en claro de antes siguen importándose. La copia automática de `Documents`
      queda en claro a propósito y la app lo dice.

## Sin dependencias externas

- [ ] **Vencimientos de certificaciones.** Cualificación de arma, CPR, Taser,
      ASP, operador de radar, CJIS, físico, licencia. Aviso a 60 y 30 días en
      el inicio.
- [ ] **Estimado de paga.** El resumen del mes ya sabe el patrón 2-2-3, que el
      turno es de 13 h y cuáles son los feriados. Con eso: night differential,
      Sunday premium, feriado y overtime por separado, para cuadrar contra el
      LES y cazar errores de timecard.
- [ ] **Lista de barment y BOLO.** Búsqueda por placa o nombre para el ECP, y
      aviso de contacto repetido ("esta placa apareció 3 veces este mes") sobre
      los datos que el buscador global ya tiene.
- [ ] **Blotter del desk.** Log cronológico del turno, entrada con hora de un
      toque. Es el DA 1594; hasta tener la plantilla oficial, se dibuja.
- [ ] **Pass-down por QR.** Entregar el turno al siguiente sin backend:
      lo esencial cabe en un código que el otro teléfono lee.
- [ ] **Sketch de escena.** Croquis a dedo para el informe de accidente,
      adjunto como página extra. El canvas de firma y el adjunto de fotos ya
      están resueltos.
- [ ] **Modo estudio.** Flashcards sobre los 761 códigos que ya están cargados.

## Requieren la plantilla PDF oficial

El motor de AcroForms ya está hecho: cada formulario nuevo es una plantilla más
un mapeo en `js/pdf-mappings.js`. Pero la plantilla tiene que ser el PDF
rellenable oficial, y **no se puede descargar desde este entorno**:
`armypubs.army.mil` y `esd.whs.mil` están bloqueados por la política de red.

Así que hace falta que el fichero se añada a `pdf-templates/` a mano. La app no
improvisa un sustituto: si falta la plantilla, la generación se detiene con un
error explícito.

| Formulario | Qué es | Estado |
|---|---|---|
| **DD 1805** | US District Court Violation Notice — la citación al magistrado federal | falta plantilla |
| **DD 1408** | Armed Forces Traffic Ticket | falta plantilla |
| **DA 3975** | Military Police Report | falta plantilla |
| **DA 2823** | Sworn Statement | falta plantilla |
| **DA 3881** | Rights Warning Procedure/Waiver Certificate | falta plantilla |
| **DA 4137** | Evidence/Property Custody Document | falta plantilla |
| **DA 3946** | MP Traffic Accident Report | falta plantilla |
| **SF 91** | Motor Vehicle Accident Report (vehículo GSA) | falta plantilla |
| **DA 1594** | Daily Staff Journal / blotter | falta plantilla |
| **DA 2062** | Hand Receipt | falta plantilla |

El DD 1805 es el que más peso tiene: `js/citations.js` ya sabe qué ley se
eligió y ya lleva los contadores de Moving / Non-Moving.

## Pendiente de contenido legal

Estas piden texto que tiene que venir aprobado, no redactado por la app:

- [ ] **Elementos del delito** por código en la Law Library. Convierte 761
      consultas en una herramienta de decisión y alimenta la narrativa de causa
      probable. Requiere redactar los elementos de cada cargo; se empieza por
      los más usados.
- [ ] **Cuantías** de multa y collateral forfeiture para el DD 1805, según el
      schedule de la instalación.
- [ ] **Paquete de DUI.** SFST con conteo de claves (HGN, walk-and-turn,
      one-leg stand), horas de cada paso y narrativa. La advertencia de
      consentimiento implícito y la de derechos van **verbatim en inglés y en
      español**, y ese texto tiene que darlo el supervisor o el SJA: en corte
      se lee tal cual, y una traducción hecha al vuelo es material impugnable.

## Lo que no se toca

- La app sigue sin backend y sin salida de datos del dispositivo.
- La original no recibe ninguna de estas funciones.
- Ninguna plantilla se sustituye por una dibujada a mano si existe la oficial.
