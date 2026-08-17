/**
 * LAW LIBRARY DATA - Police Tools App
 * Base de datos de códigos legales con sistema de búsqueda avanzado
 * Federal Penal Code - Complete Dataset with Exact Citations
 * 
 * FUENTE MAESTRA: Contenido bilingüe exacto proporcionado por el usuario
 * Ordenado numéricamente: Título → Sección → Subsección
 * Formato de citación: "{title} U.S.C. § {section}" (NO "Art. X")
 */

// ============================================
// FT BUCHANAN TRAFFIC CODE - COMPLETE DATASET
// 148 Articles - 9 L.P.R.A. Traffic Violations
// Ordenados numéricamente por artículo
// ============================================
const FT_BUCHANAN_TRAFFIC_CODE = [
    // Artículos 2.xx - Vehicle Registration
    {
        "id": "ftb-2-06-b",
        "article_number": "Art. 2.06(b)",
        "citation": "9 L.P.R.A. § 5007",
        "sort_key": "002.006.002",
        "category": "ftb-traffic",
        "title_en": "Failure of vehicle owner to change address within 30 days",
        "title_es": "Dueño del vehículo no cambia dirección en 30 días",
        "when_applies_en": "During an intervention, the owner admits to having moved more than a month ago and has not updated the vehicle address at CESCO.",
        "when_applies_es": "En una intervención, el dueño admite haberse mudado hace más de un mes y no ha actualizado la dirección del vehículo en el CESCO.",
        "description_en": "Vehicle owner fails to notify DMV of address change within 30 days of moving.",
        "description_es": "El dueño del vehículo no notifica al CESCO el cambio de dirección dentro de los 30 días de mudarse.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["address change", "30 days", "vehicle owner", "CESCO", "registration"],
        "keywords_es": ["cambio dirección", "30 días", "dueño vehículo", "CESCO", "registro"],
        "verified": true
    },
    {
        "id": "ftb-2-21-e",
        "article_number": "Art. 2.21(e)",
        "citation": "9 L.P.R.A. § 5022",
        "sort_key": "002.021.005",
        "category": "ftb-traffic",
        "title_en": "Handicapped decals from another US state/territory expired",
        "title_es": "Calcomanías de impedido de otro estado/territorio vencidas",
        "when_applies_en": "A non-resident uses a US handicap permit but has been living in PR for more than 120 days.",
        "when_applies_es": "Un no residente usa un carnet de impedido de EE. UU. pero lleva más de 120 días viviendo en PR.",
        "description_en": "Using an out-of-state handicap parking permit after establishing residency in Puerto Rico for over 120 days.",
        "description_es": "Uso de permiso de estacionamiento para impedidos de otro estado después de establecer residencia en Puerto Rico por más de 120 días.",
        "fine": "$1,000.00",
        "is_mca": false,
        "keywords_en": ["handicapped", "disabled", "out of state", "expired", "120 days", "decal"],
        "keywords_es": ["impedido", "discapacitado", "otro estado", "vencido", "120 días", "calcomanía"],
        "verified": true
    },
    {
        "id": "ftb-2-28-i",
        "article_number": "Art. 2.28(i)",
        "citation": "9 L.P.R.A. § 5029",
        "sort_key": "002.028.009",
        "category": "ftb-traffic",
        "title_en": "Displaying a radio amateur license plate without authorization",
        "title_es": "Exhibir tablilla de radioaficionado sin autorización",
        "when_applies_en": "Using amateur radio license plate (KP4) without having valid FCC license.",
        "when_applies_es": "Usa tablilla de radioaficionado (KP4) sin tener la licencia de la FCC vigente.",
        "description_en": "Displaying amateur radio operator license plates without valid FCC amateur radio license.",
        "description_es": "Exhibir tablillas de operador de radioaficionado sin licencia válida de la FCC.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["radio amateur", "KP4", "FCC license", "unauthorized plate"],
        "keywords_es": ["radioaficionado", "KP4", "licencia FCC", "tablilla no autorizada"],
        "verified": true
    },
    {
        "id": "ftb-2-29-ph1",
        "article_number": "Art. 2.29(ph1)",
        "citation": "9 L.P.R.A. § 5030",
        "sort_key": "002.029.001",
        "category": "ftb-traffic",
        "title_en": "Handicapped Parking without decal/plate/sign, or expired",
        "title_es": "Estacionamiento impedido sin carnet/tablilla/señal, o vencido",
        "when_applies_en": "Direct ticket for parking in blue line without visible permit, or with expired permit.",
        "when_applies_es": "El boleto directo por estacionarse en línea azul sin el carnet visible, o si el carnet está vencido.",
        "description_en": "Parking in designated handicapped parking space without valid permit or with expired permit.",
        "description_es": "Estacionarse en espacio designado para impedidos sin permiso válido o con permiso vencido.",
        "fine": "$1,000.00",
        "is_mca": false,
        "keywords_en": ["handicapped parking", "blue line", "expired permit", "disabled parking"],
        "keywords_es": ["estacionamiento impedido", "línea azul", "permiso vencido", "discapacitado"],
        "verified": true
    },
    {
        "id": "ftb-2-29-ph2",
        "article_number": "Art. 2.29(ph2)",
        "citation": "9 L.P.R.A. § 5030",
        "sort_key": "002.029.002",
        "category": "ftb-traffic",
        "title_en": "Displaying a handicapped decal/plate/sign without being duly authorized",
        "title_es": "Exhibir carnet/tablilla/señal de impedido sin estar debidamente autorizado",
        "when_applies_en": "Driver is using a family member's handicap permit (who is not in the car) to get good parking.",
        "when_applies_es": "El conductor está usando el carnet de impedido de un familiar (que no está en el auto) para conseguir buen estacionamiento.",
        "description_en": "Using someone else's handicap parking permit without the authorized person being present in the vehicle.",
        "description_es": "Usar el permiso de estacionamiento para impedidos de otra persona sin que la persona autorizada esté presente.",
        "fine": "$1,000.00",
        "is_mca": false,
        "keywords_en": ["handicapped", "unauthorized use", "family member permit", "misuse"],
        "keywords_es": ["impedido", "uso no autorizado", "permiso familiar", "mal uso"],
        "verified": true
    },
    {
        "id": "ftb-2-32-f",
        "article_number": "Art. 2.32(f)",
        "citation": "9 L.P.R.A. § 5033",
        "sort_key": "002.032.006",
        "category": "ftb-traffic",
        "title_en": "Displaying a personalized license plate without authorization",
        "title_es": "Exhibir tablilla personalizada sin autorización",
        "when_applies_en": "Using a fake or unapproved personalized license plate not issued by CESCO.",
        "when_applies_es": "Usa una tablilla personalizada falsa o que no fue aprobada y expedida por el CESCO.",
        "description_en": "Displaying personalized/vanity license plates without proper authorization from CESCO.",
        "description_es": "Exhibir tablillas personalizadas sin autorización adecuada del CESCO.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["personalized plate", "vanity plate", "unauthorized", "CESCO"],
        "keywords_es": ["tablilla personalizada", "no autorizada", "CESCO"],
        "verified": true
    },
    {
        "id": "ftb-2-39",
        "article_number": "Art. 2.39",
        "citation": "9 L.P.R.A. § 5040",
        "sort_key": "002.039.000",
        "category": "ftb-traffic",
        "title_en": "Failure to register vehicle within 5 days of introduction into PR",
        "title_es": "No registrar vehículo dentro de 5 días de introducción a PR",
        "when_applies_en": "Someone brought an imported vehicle (e.g., by boat from USA) and is driving it without local registration within first 5 days.",
        "when_applies_es": "Alguien trajo un auto importado (ej. por barco desde EE. UU.) y lo está corriendo sin haberlo registrado localmente en sus primeros 5 días.",
        "description_en": "Operating a vehicle in Puerto Rico without registering it within 5 days of entry.",
        "description_es": "Operar un vehículo en Puerto Rico sin registrarlo dentro de 5 días de entrada.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["registration", "5 days", "imported vehicle", "foreign vehicle"],
        "keywords_es": ["registro", "5 días", "vehículo importado", "vehículo extranjero"],
        "verified": true
    },
    {
        "id": "ftb-2-47-a",
        "article_number": "Art. 2.47(a)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.001",
        "category": "ftb-traffic",
        "title_en": "Driving a vehicle/trailer not authorized by the Secretary to operate",
        "title_es": "Conducir vehículo/remolque no autorizado por el Secretario",
        "when_applies_en": "Off-road vehicles (like four-tracks or dirt bikes) running on public roads without legal permission.",
        "when_applies_es": "Vehículos off-road (como four-tracks o dirt bikes) corriendo en la vía pública sin permiso legal.",
        "description_en": "Operating vehicles not authorized for public road use, including off-road vehicles and trailers.",
        "description_es": "Operar vehículos no autorizados para uso en vías públicas, incluyendo vehículos off-road y remolques.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["off-road", "unauthorized vehicle", "four-track", "dirt bike", "trailer"],
        "keywords_es": ["off-road", "vehículo no autorizado", "four-track", "dirt bike", "remolque"],
        "verified": true
    },
    {
        "id": "ftb-2-47-b",
        "article_number": "Art. 2.47(b)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.002",
        "category": "ftb-traffic",
        "title_en": "Driving engaged in a use requiring a different type of license/permit",
        "title_es": "Conducir en uso que requiere diferente tipo de licencia/permiso",
        "when_applies_en": "Private vehicle (normal plate) charging as Uber or taxi without Public Service Commission permits.",
        "when_applies_es": "Un vehículo privado (tablilla normal) cobrando como si fuera Uber o taxi sin los permisos de la Comisión de Servicio Público (CSP).",
        "description_en": "Using a private vehicle for commercial transportation services without proper CSP authorization.",
        "description_es": "Usar vehículo privado para servicios de transporte comercial sin autorización adecuada de la CSP.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["Uber", "taxi", "commercial use", "CSP", "private vehicle"],
        "keywords_es": ["Uber", "taxi", "uso comercial", "CSP", "vehículo privado"],
        "verified": true
    },
    {
        "id": "ftb-2-47-c",
        "article_number": "Art. 2.47(c)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.003",
        "category": "ftb-traffic",
        "title_en": "Driving without carrying a copy of the permit/registration document",
        "title_es": "Conducir sin llevar copia del permiso/documento de registro",
        "when_applies_en": "Driver does not have vehicle registration (paper) physically or digitally at time of stop.",
        "when_applies_es": "El conductor no tiene la licencia del vehículo (el papel de registro del auto) física ni digital al momento de la parada.",
        "description_en": "Operating a vehicle without possessing the registration certificate or digital copy.",
        "description_es": "Operar un vehículo sin poseer el certificado de registro o copia digital.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["registration", "document", "no papers", "vehicle permit"],
        "keywords_es": ["registro", "documento", "sin papeles", "permiso vehículo"],
        "verified": true
    },
    {
        "id": "ftb-2-47-d",
        "article_number": "Art. 2.47(d)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.004",
        "category": "ftb-traffic",
        "title_en": "Driving a vehicle exhibiting license plates that are not legible",
        "title_es": "Conducir vehículo con tablillas no legibles",
        "when_applies_en": "Plate faded, intentionally dirty with mud, or with dark plastics preventing reading from distance or at night.",
        "when_applies_es": "Tablilla despintada, sucia de lodo intencionalmente, o con plásticos oscuros que impiden leerla bien de lejos o de noche.",
        "description_en": "Operating vehicle with obscured, faded, or illegible license plates.",
        "description_es": "Operar vehículo con tablillas oscurecidas, despintadas o ilegibles.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["illegible plate", "faded", "dirty plate", "obscured"],
        "keywords_es": ["tablilla ilegible", "despintada", "tablilla sucia", "oscurecida"],
        "verified": true
    },
    {
        "id": "ftb-2-47-e",
        "article_number": "Art. 2.47(e)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.005",
        "category": "ftb-traffic",
        "title_en": "Operating with expired registration (Marbete)",
        "title_es": "Operar con registro vencido (Marbete)",
        "when_applies_en": "Expired registration ticket. If 30 days or less expired: $50; if 31 days or more: $500.",
        "when_applies_es": "Boleto por marbete vencido. Si lleva 30 días o menos vencido es $50; si lleva 31 días o más, son $500.",
        "description_en": "Operating vehicle with expired registration. Fine varies based on days expired.",
        "description_es": "Operar vehículo con registro vencido. La multa varía según días vencidos.",
        "fine": "$50.00 / $500.00",
        "is_mca": false,
        "keywords_en": ["expired registration", "marbete", "late registration", "30 days", "31 days"],
        "keywords_es": ["registro vencido", "marbete", "registro atrasado", "30 días", "31 días"],
        "verified": true
    },
    {
        "id": "ftb-2-47-f",
        "article_number": "Art. 2.47(f)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.006",
        "category": "ftb-traffic",
        "title_en": "Giving false information to obtain licenses, permits, or title transfers",
        "title_es": "Dar información falsa para obtener licencias, permisos o traspasos",
        "when_applies_en": "Fraudulent transfers, forged signatures on car title, or lying on CESCO forms.",
        "when_applies_es": "Traspasos fraudulentos, firmas falsificadas en el título del auto o mentir en los formularios del CESCO.",
        "description_en": "Providing false information or forged documents to obtain vehicle registration or transfers.",
        "description_es": "Proporcionar información falsa o documentos falsificados para obtener registro o traspaso de vehículo.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["false information", "forgery", "fraud", "title transfer", "CESCO"],
        "keywords_es": ["información falsa", "falsificación", "fraude", "traspaso", "CESCO"],
        "verified": true
    },
    {
        "id": "ftb-2-47-g",
        "article_number": "Art. 2.47(g)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.007",
        "category": "ftb-traffic",
        "title_en": "Erasing, altering, or adding info to a license certificate or registration",
        "title_es": "Borrar, alterar o agregar info a certificado de licencia o registro",
        "when_applies_en": "Physically altering vehicle license paper (e.g., crossing out name or changing VIN number on document).",
        "when_applies_es": "Alterar físicamente el papel de la licencia del vehículo (ej. tachar un nombre o cambiar el número de VIN en el documento).",
        "description_en": "Tampering with or altering official vehicle registration documents.",
        "description_es": "Manipular o alterar documentos oficiales de registro de vehículo.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["altering", "erasing", "tampering", "registration document", "VIN"],
        "keywords_es": ["alterar", "borrar", "manipular", "documento registro", "VIN"],
        "verified": true
    },
    {
        "id": "ftb-2-47-h",
        "article_number": "Art. 2.47(h)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.008",
        "category": "ftb-traffic",
        "title_en": "Placing plates on a motor vehicle/trailer not authorized to use them",
        "title_es": "Colocar tablillas en vehículo/remolque no autorizado a usarlas",
        "when_applies_en": "Fake plate (putting grandma's car plate on a car without registration to deceive).",
        "when_applies_es": "Tablilla ficticia (ponerle la tablilla del carro de la abuela a un carro sin marbete para despistar).",
        "description_en": "Using license plates on a vehicle not registered to use those plates.",
        "description_es": "Usar tablillas en un vehículo no registrado para usar esas tablillas.",
        "fine": "$1,000.00",
        "is_mca": false,
        "keywords_en": ["wrong plates", "unauthorized plates", "fake plates", "plate switch"],
        "keywords_es": ["tablillas equivocadas", "tablillas no autorizadas", "tablillas falsas"],
        "verified": true
    },
    {
        "id": "ftb-2-47-i",
        "article_number": "Art. 2.47(i)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.009",
        "category": "ftb-traffic",
        "title_en": "Stealing, mutilating, altering, or covering license plates",
        "title_es": "Robar, mutilar, alterar o cubrir tablillas",
        "when_applies_en": "Bending motorcycle plates upward, or putting black tape on letter/number to evade tolls or police.",
        "when_applies_es": "Doblar la tablilla de las motoras hacia arriba, o ponerle tape negro a una letra/número para evadir peajes o a la policía.",
        "description_en": "Theft, damage, or alteration of license plates to obscure identification.",
        "description_es": "Robo, daño o alteración de tablillas para oscurecer identificación.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["stealing plates", "mutilating", "altering plates", "covering plates", "theft"],
        "keywords_es": ["robar tablillas", "mutilar", "alterar tablillas", "cubrir tablillas", "robo"],
        "verified": true
    },
    {
        "id": "ftb-2-47-j",
        "article_number": "Art. 2.47(j)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.010",
        "category": "ftb-traffic",
        "title_en": "Driving with plates altered in a way that covers/prevents clear view",
        "title_es": "Conducir con tablillas alteradas que cubren/evitan vista clara",
        "when_applies_en": "Using very wide plate frames that cover 'Puerto Rico' text or reflective numbers.",
        "when_applies_es": "Usar marcos de tablilla (frames) muy anchos que tapan la frase 'Puerto Rico' o los números reflectivos.",
        "description_en": "Using plate frames or covers that obscure any part of the license plate.",
        "description_es": "Usar marcos o cubiertas de tablilla que oscurecen cualquier parte de la tablilla.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["plate frame", "covering plate", "obscured plate", "frame"],
        "keywords_es": ["marco tablilla", "cubrir tablilla", "tablilla oscurecida", "marco"],
        "verified": true
    },
    {
        "id": "ftb-2-47-k",
        "article_number": "Art. 2.47(k)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.011",
        "category": "ftb-traffic",
        "title_en": "Loaning registration to unauthorized persons / using to identify another vehicle",
        "title_es": "Prestar registro a personas no autorizadas / usar para identificar otro vehículo",
        "when_applies_en": "Lending your car papers to a friend to show if stopped in a 'twin' or illegal car.",
        "when_applies_es": "Prestarle los papeles de tu carro legal a un amigo para que los enseñe si lo paran en un carro 'gemelo' o ilegal.",
        "description_en": "Lending vehicle registration documents to others for fraudulent use.",
        "description_es": "Prestar documentos de registro de vehículo a otros para uso fraudulento.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["loaning registration", "unauthorized", "fraudulent use", "papers"],
        "keywords_es": ["prestar registro", "no autorizado", "uso fraudulento", "papeles"],
        "verified": true
    },
    {
        "id": "ftb-2-47-l",
        "article_number": "Art. 2.47(l)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.012",
        "category": "ftb-traffic",
        "title_en": "Loaning license plates for deceptive use on another vehicle",
        "title_es": "Prestar tablillas para uso engañoso en otro vehículo",
        "when_applies_en": "Similar to 2.47(h), but punishes the real plate owner for knowingly lending it to another person.",
        "when_applies_es": "Similar al 2.47(h), pero este castiga al dueño real de la tablilla por habérsela prestado a sabiendas a otra persona.",
        "description_en": "Owner knowingly lending their license plates to another for deceptive purposes.",
        "description_es": "Dueño que sabiendo presta sus tablillas a otro para propósitos engañosos.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["loaning plates", "lending plates", "deceptive", "owner liability"],
        "keywords_es": ["prestar tablillas", "préstamo tablillas", "engaño", "responsabilidad dueño"],
        "verified": true
    },
    {
        "id": "ftb-2-47-m",
        "article_number": "Art. 2.47(m)",
        "citation": "Sin L.P.R.A. asignado",
        "sort_key": "002.047.013",
        "category": "ftb-traffic",
        "title_en": "Erasing, altering, or covering the VIN of the motor or body",
        "title_es": "Borrar, alterar o cubrir el VIN del motor o carrocería",
        "when_applies_en": "Stolen vehicles or with stolen parts ('chop shop') where serial number on dash, engine or chassis was filed or altered.",
        "when_applies_es": "Vehículos robados o con piezas robadas ('chop shop') donde el número de serie en el dash, motor o chasis fue limado o alterado.",
        "description_en": "Tampering with Vehicle Identification Number (VIN) on engine or body.",
        "description_es": "Manipulación del Número de Identificación del Vehículo (VIN) en motor o carrocería.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["VIN", "serial number", "altered VIN", "chop shop", "stolen vehicle"],
        "keywords_es": ["VIN", "número serie", "VIN alterado", "chop shop", "vehículo robado"],
        "verified": true
    },
    {
        "id": "ftb-2-47-n",
        "article_number": "Art. 2.47(n)",
        "citation": "Sin L.P.R.A. asignado",
        "sort_key": "002.047.014",
        "category": "ftb-traffic",
        "title_en": "Stealing any valid registration certificate or provisional license",
        "title_es": "Robar cualquier certificado de registro válido o licencia provisional",
        "when_applies_en": "Stealing car papers from another vehicle's glove compartment.",
        "when_applies_es": "Robarse los papeles del carro de la guantera de otro vehículo.",
        "description_en": "Theft of valid vehicle registration documents or provisional licenses.",
        "description_es": "Robo de documentos válidos de registro de vehículo o licencias provisionales.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["stealing", "theft", "registration certificate", "provisional license"],
        "keywords_es": ["robar", "robo", "certificado registro", "licencia provisional"],
        "verified": true
    },
    {
        "id": "ftb-2-47-p",
        "article_number": "Art. 2.47(p)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.016",
        "category": "ftb-traffic",
        "title_en": "Buyer's failure to notify DMV of transfer within 10 working days",
        "title_es": "Comprador no notifica al DMV del traspaso en 10 días hábiles",
        "when_applies_en": "Bought car through transfer and has been driving for more than two weeks without putting it in their name at CESCO.",
        "when_applies_es": "Compró el carro por un traspaso y lleva más de dos semanas corriendo sin ponerlo a su nombre en el CESCO.",
        "description_en": "New owner failing to register vehicle transfer within 10 business days.",
        "description_es": "Nuevo dueño no registra traspaso de vehículo dentro de 10 días hábiles.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["transfer", "10 days", "buyer", "CESCO", "title transfer"],
        "keywords_es": ["traspaso", "10 días", "comprador", "CESCO", "transferencia"],
        "verified": true
    },
    {
        "id": "ftb-2-47-q",
        "article_number": "Art. 2.47(q)",
        "citation": "Sin L.P.R.A. asignado",
        "sort_key": "002.047.017",
        "category": "ftb-traffic",
        "title_en": "Failure to turn in plates when required",
        "title_es": "No entregar tablillas cuando se requiere",
        "when_applies_en": "Junk or total loss vehicle and owner did not surrender plates to CESCO as required by law.",
        "when_applies_es": "Vehículo chatarra o pérdida total y el dueño no entregó las tablillas al CESCO como requiere la ley.",
        "description_en": "Failing to surrender license plates when vehicle is junked or totaled.",
        "description_es": "No entregar tablillas cuando el vehículo es declarado chatarra o pérdida total.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["surrender plates", "junk vehicle", "total loss", "CESCO"],
        "keywords_es": ["entregar tablillas", "vehículo chatarra", "pérdida total", "CESCO"],
        "verified": true
    },
    {
        "id": "ftb-2-47-r",
        "article_number": "Art. 2.47(r)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.018",
        "category": "ftb-traffic",
        "title_en": "Driving a vehicle whose permit is suspended, revoked, or expired",
        "title_es": "Conducir vehículo cuyo permiso está suspendido, revocado o vencido",
        "when_applies_en": "CESCO revoked the car's registration (e.g., for massive unpaid AutoExpreso tickets) and they continue using it on the street.",
        "when_applies_es": "El CESCO le revocó el registro al carro (ej. por multas masivas sin pagar de AutoExpreso) y lo siguen usando en la calle.",
        "description_en": "Operating vehicle with suspended, revoked, or cancelled registration.",
        "description_es": "Operar vehículo con registro suspendido, revocado o cancelado.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["suspended", "revoked", "expired registration", "AutoExpreso"],
        "keywords_es": ["suspendido", "revocado", "registro vencido", "AutoExpreso"],
        "verified": true
    },
    {
        "id": "ftb-2-47-s",
        "article_number": "Art. 2.47(s)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.019",
        "category": "ftb-traffic",
        "title_en": "Displaying numbered plates not listed on current registration",
        "title_es": "Exhibir tablillas numeradas no listadas en registro actual",
        "when_applies_en": "Putting European (Euro plates) or Japanese decorative plates on front of car, which is illegal in PR if not official.",
        "when_applies_es": "Ponerle tablillas decorativas europeas (Euro plates) o japonesas al frente del carro, lo cual es ilegal en PR si no son oficiales.",
        "description_en": "Displaying non-official or decorative plates not registered to the vehicle.",
        "description_es": "Exhibir tablillas no oficiales o decorativas no registradas al vehículo.",
        "fine": "$200.00",
        "is_mca": false,
        "keywords_en": ["decorative plates", "Euro plates", "unofficial plates", "front plate"],
        "keywords_es": ["tablillas decorativas", "placas Euro", "tablillas no oficiales"],
        "verified": true
    },
    {
        "id": "ftb-2-47-t",
        "article_number": "Art. 2.47(t)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.020",
        "category": "ftb-traffic",
        "title_en": "Driving heavy motor vehicle without weight/capacity indications",
        "title_es": "Conducir vehículo pesado sin indicaciones de peso/capacidad",
        "when_applies_en": "Commercial trucks (heavy duty) that don't have labeled on doors their empty weight and maximum load capacity.",
        "when_applies_es": "Camiones comerciales (heavy duty) que no tienen rotulado en las puertas su peso vacío y capacidad de carga máxima.",
        "description_en": "Operating heavy commercial vehicle without required weight and capacity markings.",
        "description_es": "Operar vehículo comercial pesado sin marcajes requeridos de peso y capacidad.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["heavy vehicle", "commercial truck", "weight markings", "capacity"],
        "keywords_es": ["vehículo pesado", "camión comercial", "marcas peso", "capacidad"],
        "verified": true
    },
    {
        "id": "ftb-2-47-u",
        "article_number": "Art. 2.47(u)",
        "citation": "Sin L.P.R.A. asignado",
        "sort_key": "002.047.021",
        "category": "ftb-traffic",
        "title_en": "Driving with exhibition/dealer plates longer than authorized",
        "title_es": "Conducir con tablillas de exhibición/dealer más tiempo de lo autorizado",
        "when_applies_en": "Using a 'Dealer' plate (orange/red) for months as personal vehicle, evading paying regular registration.",
        "when_applies_es": "Usar una tablilla de 'Dealer' (naranja/roja) por meses como vehículo personal, evadiendo pagar el registro regular.",
        "description_en": "Using dealer or exhibition plates beyond authorized time period.",
        "description_es": "Usar tablillas de dealer o exhibición más allá del período autorizado.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["dealer plates", "exhibition plates", "unauthorized use", "temporary"],
        "keywords_es": ["tablillas dealer", "tablillas exhibición", "uso no autorizado", "temporal"],
        "verified": true
    },
    {
        "id": "ftb-2-47-w",
        "article_number": "Art. 2.47(w)",
        "citation": "9 L.P.R.A. § 5048",
        "sort_key": "002.047.023",
        "category": "ftb-traffic",
        "title_en": "Maintaining a vehicle parked on public road with expired permit",
        "title_es": "Mantener vehículo estacionado en vía pública con permiso vencido",
        "when_applies_en": "Car is not running, but is parked on street in front of house with expired registration.",
        "when_applies_es": "El carro no está corriendo, pero está estacionado en la calle frente a una casa con el marbete vencido.",
        "description_en": "Parking vehicle with expired registration on public roadway.",
        "description_es": "Estacionar vehículo con registro vencido en vía pública.",
        "fine": "$150.00",
        "is_mca": false,
        "keywords_en": ["parked", "expired registration", "public road", "street parking"],
        "keywords_es": ["estacionado", "registro vencido", "vía pública", "parqueo calle"],
        "verified": true
    }
];

// ============================================
// FEDERAL PENAL CODE - COMPLETE DATASET
// 482 Statutes - Title 18, 21, and 26 U.S.C.
// Ordenados numéricamente por sort_key
// ============================================
const federalPenalCodeStatutes = [
    {
        "id": "usc-18-1",
        "citation": "18 U.S.C. § 1",
        "sort_key": "018.00001.000",
        "category": "Federal Penal Code",
        "title_en": "Fugitive from Justice",
        "title_es": "Fugitivo de la Justicia",
        "description_en": "Harboring or concealing a person who has escaped from federal custody or who is wanted for a federal offense.",
        "description_es": "Dar refugio o ocultar a una persona que ha escapado de custodia federal o que es buscada por un delito federal.",
        "keywords_en": [
            "fugitive",
            "harboring",
            "concealing",
            "escaped",
            "federal custody"
        ],
        "keywords_es": [
            "fugitivo",
            "refugio",
            "ocultar",
            "escapado",
            "custodia federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2",
        "citation": "18 U.S.C. § 2",
        "sort_key": "018.00002.000",
        "category": "Federal Penal Code",
        "title_en": "Aiding and Abetting (Complicity)",
        "title_es": "Cómplice (Aiding and Abetting)",
        "description_en": "Assisting, encouraging, or facilitating the commission of a federal crime. The aider and abettor is punished as if they committed the crime themselves.",
        "description_es": "Asistir, alentar o facilitar la comisión de un delito federal. El cómplice es castigado como si hubiera cometido el delito él mismo.",
        "keywords_en": [
            "aiding",
            "abetting",
            "complicity",
            "accomplice",
            "facilitating",
            "assisting"
        ],
        "keywords_es": [
            "cómplice",
            "ayudar",
            "facilitar",
            "asistir",
            "delito federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3",
        "citation": "18 U.S.C. § 3",
        "sort_key": "018.00003.000",
        "category": "Federal Penal Code",
        "title_en": "Accessory After the Fact",
        "title_es": "Cómplice Después del Hecho",
        "description_en": "Helping someone who has committed a federal crime to avoid arrest, trial, or punishment. Example: giving a ride, hiding evidence, or providing a false alibi.",
        "description_es": "Ayudar a alguien que ha cometido un delito federal a evitar el arresto, juicio o castigo. Ejemplo: dar transporte, ocultar evidencia o proporcionar una coartada falsa.",
        "keywords_en": [
            "accessory",
            "after the fact",
            "helping",
            "avoid arrest",
            "false alibi"
        ],
        "keywords_es": [
            "cómplice",
            "después del hecho",
            "evadir",
            "coartada falsa",
            "ocultar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-4",
        "citation": "18 U.S.C. § 4",
        "sort_key": "018.00004.000",
        "category": "Federal Penal Code",
        "title_en": "Misprision of Felony (Failure to Report Federal Felony)",
        "title_es": "Encubrimiento de Delito Grave (No Reportar)",
        "description_en": "Knowing about a federal felony and failing to report it to authorities. Concealing the crime from federal officials.",
        "description_es": "Saber de un delito grave federal y no reportarlo a las autoridades. Ocultar el delito de los funcionarios federales.",
        "keywords_en": [
            "misprision",
            "failure to report",
            "concealing",
            "federal felony",
            "not reporting"
        ],
        "keywords_es": [
            "encubrimiento",
            "no reportar",
            "delito grave",
            "ocultar",
            "autoridades federales"
        ],
        "verified": true
    },
    {
        "id": "usc-18-7",
        "citation": "18 U.S.C. § 7",
        "sort_key": "018.00007.000",
        "category": "Federal Penal Code",
        "title_en": "Special Maritime and Territorial Jurisdiction of the United States",
        "title_es": "Jurisdicción Marítima y Territorial Especial de EE.UU.",
        "description_en": "Defines areas where federal law applies: forts, military bases, federal buildings, vessels, aircraft, and territorial waters including Puerto Rico coastal waters.",
        "description_es": "Define áreas donde aplica la ley federal: fuertes, bases militares, edificios federales, embarcaciones, aeronaves y aguas territoriales incluyendo las costas de Puerto Rico.",
        "keywords_en": [
            "maritime jurisdiction",
            "territorial",
            "military base",
            "federal building",
            "coastal waters"
        ],
        "keywords_es": [
            "jurisdicción marítima",
            "territorial",
            "base militar",
            "edificio federal",
            "aguas costeras"
        ],
        "verified": true
    },
    {
        "id": "usc-18-13",
        "citation": "18 U.S.C. § 13",
        "sort_key": "018.00013.000",
        "category": "Federal Penal Code",
        "title_en": "Assimilative Crimes Act (State Law on Federal Property)",
        "title_es": "Ley de Crímenes Asimilados (Ley Estatal en Propiedad Federal)",
        "description_en": "Applies state criminal laws to offenses committed on federal property. If an act is illegal under Puerto Rico law and occurs on a federal installation, it becomes a federal offense.",
        "description_es": "Aplica leyes penales estatales a delitos cometidos en propiedad federal. Si un acto es ilegal bajo la ley de Puerto Rico y ocurre en una instalación federal, se convierte en delito federal.",
        "keywords_en": [
            "assimilative crimes",
            "state law",
            "federal property",
            "federal installation",
            "Puerto Rico law"
        ],
        "keywords_es": [
            "crímenes asimilados",
            "ley estatal",
            "propiedad federal",
            "instalación federal",
            "ley de Puerto Rico"
        ],
        "verified": true
    },
    {
        "id": "usc-18-111",
        "citation": "18 U.S.C. § 111",
        "sort_key": "018.00111.000",
        "category": "Federal Penal Code",
        "title_en": "Assaulting, Resisting, or Impeding Federal Officers",
        "title_es": "Agredir, Resistir u Obstaculizar Oficiales Federales",
        "description_en": "Assaulting, resisting, opposing, impeding, intimidating, or interfering with federal officers while they are performing their duties.",
        "description_es": "Agredir, resistir, oponerse, obstaculizar, intimidar o interferir con oficiales federales mientras realizan sus deberes.",
        "keywords_en": [
            "assault",
            "federal officer",
            "resisting",
            "impeding",
            "interfering"
        ],
        "keywords_es": [
            "agredir",
            "oficial federal",
            "resistir",
            "obstaculizar",
            "interferir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-112",
        "citation": "18 U.S.C. § 112",
        "sort_key": "018.00112.000",
        "category": "Federal Penal Code",
        "title_en": "Protection of Foreign Officials",
        "title_es": "Protección de Funcionarios Extranjeros",
        "description_en": "Assaulting, kidnapping, or threatening foreign officials, official guests, or internationally protected persons in the United States.",
        "description_es": "Agredir, secuestrar o amenazar a funcionarios extranjeros, invitados oficiales o personas internacionalmente protegidas en Estados Unidos.",
        "keywords_en": [
            "foreign official",
            "assault",
            "kidnapping",
            "threatening",
            "protected persons"
        ],
        "keywords_es": [
            "funcionario extranjero",
            "agredir",
            "secuestro",
            "amenazar",
            "personas protegidas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-113",
        "citation": "18 U.S.C. § 113",
        "sort_key": "018.00113.000",
        "category": "Federal Penal Code",
        "title_en": "Assault Within Special Maritime and Territorial Jurisdiction",
        "title_es": "Agresión Dentro de Jurisdicción Marítima y Territorial Especial",
        "description_en": "Committing assault, maiming, or attempted murder within federal jurisdiction such as military bases, federal buildings, or vessels.",
        "description_es": "Cometer agresión, mutilación o intento de asesinato dentro de la jurisdicción federal como bases militares, edificios federales o embarcaciones.",
        "keywords_en": [
            "assault",
            "maritime jurisdiction",
            "military base",
            "attempted murder",
            "maiming"
        ],
        "keywords_es": [
            "agresión",
            "jurisdicción marítima",
            "base militar",
            "intento de asesinato",
            "mutilación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-114",
        "citation": "18 U.S.C. § 114",
        "sort_key": "018.00114.000",
        "category": "Federal Penal Code",
        "title_en": "Maiming Within Special Maritime and Territorial Jurisdiction",
        "title_es": "Mutilación Dentro de Jurisdicción Marítima y Territorial Especial",
        "description_en": "Intentionally causing serious bodily injury or permanent disfigurement to another person within federal jurisdiction.",
        "description_es": "Causar intencionalmente lesiones corporales graves o desfiguración permanente a otra persona dentro de la jurisdicción federal.",
        "keywords_en": [
            "maiming",
            "serious bodily injury",
            "disfigurement",
            "federal jurisdiction",
            "permanent injury"
        ],
        "keywords_es": [
            "mutilación",
            "lesiones graves",
            "desfiguración",
            "jurisdicción federal",
            "lesión permanente"
        ],
        "verified": true
    },
    {
        "id": "usc-18-115",
        "citation": "18 U.S.C. § 115",
        "sort_key": "018.00115.000",
        "category": "Federal Penal Code",
        "title_en": "Influencing, Impeding, or Retaliating Against Federal Official by Threatening Family Member",
        "title_es": "Influir, Obstaculizar o Vengarse de Funcionario Federal Amenazando a Familiar",
        "description_en": "Threatening to assault, kidnap, or murder a family member of a federal official, law enforcement officer, or judge to influence or retaliate.",
        "description_es": "Amenazar con agredir, secuestrar o asesinar a un familiar de un funcionario federal, oficial de la ley o juez para influir o vengarse.",
        "keywords_en": [
            "threatening",
            "family member",
            "federal official",
            "retaliation",
            "influencing"
        ],
        "keywords_es": [
            "amenazar",
            "familiar",
            "funcionario federal",
            "venganza",
            "influir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-117",
        "citation": "18 U.S.C. § 117",
        "sort_key": "018.00117.000",
        "category": "Federal Penal Code",
        "title_en": "Domestic Assault by an Habitual Offender",
        "title_es": "Agresión Doméstica por Delincuente Habitual",
        "description_en": "Committing domestic assault within federal jurisdiction when the person has at least two prior domestic violence convictions.",
        "description_es": "Cometer agresión doméstica dentro de la jurisdicción federal cuando la persona tiene al menos dos condenas previas por violencia doméstica.",
        "keywords_en": [
            "domestic assault",
            "habitual offender",
            "domestic violence",
            "prior convictions",
            "federal jurisdiction"
        ],
        "keywords_es": [
            "agresión doméstica",
            "delincuente habitual",
            "violencia doméstica",
            "condenas previas",
            "jurisdicción federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-118",
        "citation": "18 U.S.C. § 118",
        "sort_key": "018.00118.000",
        "category": "Federal Penal Code",
        "title_en": "Interference with Flight Crew Members and Attendants",
        "title_es": "Interferencia con Miembros de Tripulación de Vuelo",
        "description_en": "Assaulting, intimidating, or interfering with flight crew members or attendants in the performance of their duties aboard aircraft.",
        "description_es": "Agredir, intimidar o interferir con miembros de la tripulación de vuelo o asistentes en el desempeño de sus deberes a bordo de aeronaves.",
        "keywords_en": [
            "flight crew",
            "interference",
            "assault",
            "aircraft",
            "attendants"
        ],
        "keywords_es": [
            "tripulación de vuelo",
            "interferencia",
            "agredir",
            "aeronave",
            "asistentes"
        ],
        "verified": true
    },
    {
        "id": "usc-18-120",
        "citation": "18 U.S.C. § 120",
        "sort_key": "018.00120.000",
        "category": "Federal Penal Code",
        "title_en": "Kidnapping",
        "title_es": "Secuestro",
        "description_en": "Unlawfully seizing, confining, or carrying away a person and holding them for ransom, reward, or otherwise, within federal jurisdiction.",
        "description_es": "Apoderarse ilegalmente, confinar o llevarse a una persona y retenerla por rescate, recompensa o de otro modo, dentro de la jurisdicción federal.",
        "keywords_en": [
            "kidnapping",
            "ransom",
            "abduction",
            "federal jurisdiction",
            "hostage"
        ],
        "keywords_es": [
            "secuestro",
            "rescate",
            "abducción",
            "jurisdicción federal",
            "rehén"
        ],
        "verified": true
    },
    {
        "id": "usc-18-134",
        "citation": "18 U.S.C. § 134",
        "sort_key": "018.00134.000",
        "category": "Federal Penal Code",
        "title_en": "Mail Fraud",
        "title_es": "Fraude por Correo",
        "description_en": "Using the U.S. Postal Service or private carriers to carry out a scheme to defraud, obtain money or property by false pretenses.",
        "description_es": "Usar el Servicio Postal de EE.UU. o transportistas privados para llevar a cabo un esquema de defraudación, obtener dinero o propiedad por medios falsos.",
        "keywords_en": [
            "mail fraud",
            "postal service",
            "scheme to defraud",
            "false pretenses",
            "fraud"
        ],
        "keywords_es": [
            "fraude por correo",
            "servicio postal",
            "esquema de fraude",
            "falsedades",
            "defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1343",
        "citation": "18 U.S.C. § 134(3)",
        "sort_key": "018.00134.3",
        "category": "Federal Penal Code",
        "title_en": "Wire Fraud (Telecommunications)",
        "title_es": "Fraude Electrónico (Wire Fraud)",
        "description_en": "Using wire, radio, television, or internet communications to carry out a scheme to defraud or obtain money by false pretenses.",
        "description_es": "Usar comunicaciones por cable, radio, televisión o internet para llevar a cabo un esquema de defraudación o obtener dinero por medios falsos.",
        "keywords_en": [
            "wire fraud",
            "internet fraud",
            "telecommunications",
            "scheme to defraud",
            "electronic"
        ],
        "keywords_es": [
            "fraude electrónico",
            "fraude por internet",
            "telecomunicaciones",
            "esquema de fraude",
            "electrónico"
        ],
        "verified": true
    },
    {
        "id": "usc-18-152",
        "citation": "18 U.S.C. § 152",
        "sort_key": "018.00152.000",
        "category": "Federal Penal Code",
        "title_en": "Concealment of Assets in Bankruptcy",
        "title_es": "Ocultamiento de Activos en Quiebra",
        "description_en": "Hiding, transferring, or destroying property belonging to a bankruptcy estate with intent to defraud creditors or the court.",
        "description_es": "Ocultar, transferir o destruir propiedad perteneciente a una masa de quiebra con intención de defraudar acreedores o el tribunal.",
        "keywords_en": [
            "bankruptcy",
            "concealment",
            "assets",
            "fraud",
            "transferring property"
        ],
        "keywords_es": [
            "quiebra",
            "ocultamiento",
            "activos",
            "fraude",
            "transferir propiedad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-201",
        "citation": "18 U.S.C. § 201",
        "sort_key": "018.00201.000",
        "category": "Federal Penal Code",
        "title_en": "Bribery of Public Officials and Witnesses",
        "title_es": "Soborno de Funcionarios Públicos y Testigos",
        "description_en": "Corruptly giving, offering, or promising anything of value to a federal public official to influence any official act.",
        "description_es": "Dar, ofrecer o prometer corruptamente cualquier cosa de valor a un funcionario público federal para influir en cualquier acto oficial.",
        "keywords_en": [
            "bribery",
            "public official",
            "corruption",
            "influence",
            "federal official"
        ],
        "keywords_es": [
            "soborno",
            "funcionario público",
            "corrupción",
            "influir",
            "funcionario federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-210",
        "citation": "18 U.S.C. § 210",
        "sort_key": "018.00210.000",
        "category": "Federal Penal Code",
        "title_en": "Offer to Procure Appointive Public Office",
        "title_es": "Ofrecer Procurar Cargo Público por Nombramiento",
        "description_en": "Promising or offering to procure an appointive federal office in exchange for payment, support, or other consideration.",
        "description_es": "Prometer u ofrecer procurar un cargo federal por nombramiento a cambio de pago, apoyo u otra consideración.",
        "keywords_en": [
            "appointive office",
            "procure",
            "public office",
            "payment",
            "federal position"
        ],
        "keywords_es": [
            "cargo por nombramiento",
            "procurar",
            "cargo público",
            "pago",
            "posición federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-211",
        "citation": "18 U.S.C. § 211",
        "sort_key": "018.00211.000",
        "category": "Federal Penal Code",
        "title_en": "Acceptance of Solicitation to Obtain Appointive Public Office",
        "title_es": "Aceptar Solicitud para Obtener Cargo Público por Nombramiento",
        "description_en": "Accepting a solicitation to obtain an appointive federal office in exchange for payment, support, or other consideration.",
        "description_es": "Aceptar una solicitud para obtener un cargo federal por nombramiento a cambio de pago, apoyo u otra consideración.",
        "keywords_en": [
            "solicitation",
            "appointive office",
            "acceptance",
            "public office",
            "federal position"
        ],
        "keywords_es": [
            "solicitud",
            "cargo por nombramiento",
            "aceptación",
            "cargo público",
            "posición federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-215",
        "citation": "18 U.S.C. § 215",
        "sort_key": "018.00215.000",
        "category": "Federal Penal Code",
        "title_en": "Receipt of Commissions or Gifts for Procuring Loans",
        "title_es": "Recibir Comisiones o Regalos para Procurar Préstamos",
        "description_en": "Corruptly accepting anything of value in return for procuring or attempting to procure a loan from a financial institution.",
        "description_es": "Aceptar corruptamente cualquier cosa de valor a cambio de procurar o intentar procurar un préstamo de una institución financiera.",
        "keywords_en": [
            "commissions",
            "gifts",
            "procuring loans",
            "financial institution",
            "corruption"
        ],
        "keywords_es": [
            "comisiones",
            "regalos",
            "procurar préstamos",
            "institución financiera",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-241",
        "citation": "18 U.S.C. § 241",
        "sort_key": "018.00241.000",
        "category": "Federal Penal Code",
        "title_en": "Conspiracy Against Rights",
        "title_es": "Conspiración Contra los Derechos",
        "description_en": "Two or more persons conspiring to injure, oppress, threaten, or intimidate any person in the free exercise of any right or privilege secured by the Constitution or laws of the United States.",
        "description_es": "Dos o más personas conspirando para lesionar, oprimir, amenazar o intimidar a cualquier persona en el libre ejercicio de cualquier derecho o privilegio asegurado por la Constitución o leyes de Estados Unidos.",
        "keywords_en": [
            "conspiracy",
            "civil rights",
            "intimidate",
            "constitutional rights",
            "oppress"
        ],
        "keywords_es": [
            "conspiración",
            "derechos civiles",
            "intimidar",
            "derechos constitucionales",
            "oprimir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-242",
        "citation": "18 U.S.C. § 242",
        "sort_key": "018.00242.000",
        "category": "Federal Penal Code",
        "title_en": "Deprivation of Rights Under Color of Law",
        "title_es": "Privación de Derechos Bajo Color de Ley",
        "description_en": "Any person acting under color of law who willfully subjects any person to the deprivation of any rights, privileges, or immunities secured by the Constitution or laws of the United States.",
        "description_es": "Cualquier persona que actúe bajo color de ley que someta intencionalmente a cualquier persona a la privación de derechos, privilegios o inmunidades asegurados por la Constitución o leyes de Estados Unidos.",
        "keywords_en": [
            "color of law",
            "civil rights",
            "deprivation",
            "constitutional rights",
            "official misconduct"
        ],
        "keywords_es": [
            "color de ley",
            "derechos civiles",
            "privación",
            "derechos constitucionales",
            "mala conducta oficial"
        ],
        "verified": true
    },
    {
        "id": "usc-18-245",
        "citation": "18 U.S.C. § 245",
        "sort_key": "018.00245.000",
        "category": "Federal Penal Code",
        "title_en": "Federally Protected Activities",
        "title_es": "Actividades Federalmente Protegidas",
        "description_en": "Intentionally injuring, intimidating, or interfering with any person because of their race, color, religion, national origin, or because they are participating in a federally protected activity.",
        "description_es": "Lesionar, intimidar o interferir intencionalmente con cualquier persona por su raza, color, religión, origen nacional, o porque está participando en una actividad federalmente protegida.",
        "keywords_en": [
            "protected activities",
            "race",
            "color",
            "religion",
            "national origin",
            "intimidation"
        ],
        "keywords_es": [
            "actividades protegidas",
            "raza",
            "color",
            "religión",
            "origen nacional",
            "intimidación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-247",
        "citation": "18 U.S.C. § 247",
        "sort_key": "018.00247.000",
        "category": "Federal Penal Code",
        "title_en": "Damage to Religious Property; Obstruction of Persons in the Free Exercise of Religious Beliefs",
        "title_es": "Daño a Propiedad Religiosa; Obstrucción de Personas en el Libre Ejercicio de Creencias Religiosas",
        "description_en": "Intentionally defacing, damaging, or destroying religious property or preventing individuals from exercising their religious beliefs.",
        "description_es": "Defacear, dañar o destruir intencionalmente propiedad religiosa o impedir que individuos ejerzan sus creencias religiosas.",
        "keywords_en": [
            "religious property",
            "damage",
            "religious beliefs",
            "obstruction",
            "hate crime"
        ],
        "keywords_es": [
            "propiedad religiosa",
            "daño",
            "creencias religiosas",
            "obstrucción",
            "crimen de odio"
        ],
        "verified": true
    },
    {
        "id": "usc-18-249",
        "citation": "18 U.S.C. § 249",
        "sort_key": "018.00249.000",
        "category": "Federal Penal Code",
        "title_en": "Hate Crime Acts",
        "title_es": "Actos de Crímenes de Odio",
        "description_en": "Willfully causing bodily injury to any person because of their actual or perceived race, color, religion, national origin, gender, sexual orientation, gender identity, or disability.",
        "description_es": "Causar intencionalmente lesiones corporales a cualquier persona por su raza, color, religión, origen nacional, género, orientación sexual, identidad de género o discapacidad real o percibida.",
        "keywords_en": [
            "hate crime",
            "bodily injury",
            "race",
            "religion",
            "sexual orientation",
            "disability"
        ],
        "keywords_es": [
            "crimen de odio",
            "lesiones corporales",
            "raza",
            "religión",
            "orientación sexual",
            "discapacidad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-371",
        "citation": "18 U.S.C. § 371",
        "sort_key": "018.00371.000",
        "category": "Federal Penal Code",
        "title_en": "Conspiracy to Commit Offense or to Defraud the United States",
        "title_es": "Conspiración para Cometer Delito o Defraudar a Estados Unidos",
        "description_en": "Two or more persons conspiring either to commit any offense against the United States or to defraud the United States.",
        "description_es": "Dos o más personas conspirando ya sea para cometer cualquier delito contra Estados Unidos o para defraudar a Estados Unidos.",
        "keywords_en": [
            "conspiracy",
            "defraud",
            "United States",
            "federal offense",
            "agreement"
        ],
        "keywords_es": [
            "conspiración",
            "defraudar",
            "Estados Unidos",
            "delito federal",
            "acuerdo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-472",
        "citation": "18 U.S.C. § 472",
        "sort_key": "018.00472.000",
        "category": "Federal Penal Code",
        "title_en": "Uttering Counterfeit Obligations or Securities",
        "title_es": "Poner en Circulación Obligaciones o Valores Falsificados",
        "description_en": "Passing, uttering, publishing, or selling counterfeit obligations or securities of the United States with intent to defraud.",
        "description_es": "Pasar, poner en circulación, publicar o vender obligaciones o valores falsificados de Estados Unidos con intención de defraudar.",
        "keywords_en": [
            "counterfeit",
            "securities",
            "uttering",
            "intent to defraud",
            "obligations"
        ],
        "keywords_es": [
            "falsificación",
            "valores",
            "poner en circulación",
            "intención de defraudar",
            "obligaciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-473",
        "citation": "18 U.S.C. § 473",
        "sort_key": "018.00473.000",
        "category": "Federal Penal Code",
        "title_en": "Dealing in Counterfeit Obligations or Securities",
        "title_es": "Tráfico de Obligaciones o Valores Falsificados",
        "description_en": "Buying, selling, exchanging, or possessing counterfeit obligations or securities of the United States with intent to defraud.",
        "description_es": "Comprar, vender, intercambiar o poseer obligaciones o valores falsificados de Estados Unidos con intención de defraudar.",
        "keywords_en": [
            "counterfeit",
            "dealing",
            "securities",
            "possessing",
            "intent to defraud"
        ],
        "keywords_es": [
            "falsificación",
            "tráfico",
            "valores",
            "poseer",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-474",
        "citation": "18 U.S.C. § 474",
        "sort_key": "018.00474.000",
        "category": "Federal Penal Code",
        "title_en": "Plates, Stones, or Analog, Digital, or Electronic Images for Counterfeiting",
        "title_es": "Placas, Piedras o Imágenes Análogas, Digitales o Electrónicas para Falsificación",
        "description_en": "Making, possessing, or selling plates, stones, or digital images used for counterfeiting obligations or securities of the United States.",
        "description_es": "Hacer, poseer o vender placas, piedras o imágenes digitales usadas para falsificar obligaciones o valores de Estados Unidos.",
        "keywords_en": [
            "counterfeiting",
            "plates",
            "digital images",
            "securities",
            "making"
        ],
        "keywords_es": [
            "falsificación",
            "placas",
            "imágenes digitales",
            "valores",
            "fabricar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-476",
        "citation": "18 U.S.C. § 476",
        "sort_key": "018.00476.000",
        "category": "Federal Penal Code",
        "title_en": "Taking Impressions of Tools Used for Obligations or Securities",
        "title_es": "Tomar Impresiones de Herramientas Usadas para Obligaciones o Valores",
        "description_en": "Taking or making impressions, molds, or dies of tools, plates, or other items used for printing obligations or securities of the United States.",
        "description_es": "Tomar o hacer impresiones, moldes o troqueles de herramientas, placas u otros artículos usados para imprimir obligaciones o valores de Estados Unidos.",
        "keywords_en": [
            "impressions",
            "tools",
            "securities",
            "molds",
            "printing"
        ],
        "keywords_es": [
            "impresiones",
            "herramientas",
            "valores",
            "moldes",
            "impresión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-477",
        "citation": "18 U.S.C. § 477",
        "sort_key": "018.00477.000",
        "category": "Federal Penal Code",
        "title_en": "Possessing or Selling Impressions of Tools Used for Obligations or Securities",
        "title_es": "Poseer o Vender Impresiones de Herramientas Usadas para Obligaciones o Valores",
        "description_en": "Having custody or possession of impressions, molds, or dies of tools used for printing obligations or securities with intent to defraud.",
        "description_es": "Tener custodia o posesión de impresiones, moldes o troqueles de herramientas usadas para imprimir obligaciones o valores con intención de defraudar.",
        "keywords_en": [
            "possessing",
            "selling",
            "impressions",
            "tools",
            "intent to defraud"
        ],
        "keywords_es": [
            "poseer",
            "vender",
            "impresiones",
            "herramientas",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-478",
        "citation": "18 U.S.C. § 478",
        "sort_key": "018.00478.000",
        "category": "Federal Penal Code",
        "title_en": "Foreign Obligations or Securities",
        "title_es": "Obligaciones o Valores Extranjeros",
        "description_en": "Making, possessing, or selling counterfeit foreign obligations or securities within the United States.",
        "description_es": "Hacer, poseer o vender obligaciones o valores extranjeros falsificados dentro de Estados Unidos.",
        "keywords_en": [
            "foreign",
            "counterfeit",
            "securities",
            "obligations",
            "foreign currency"
        ],
        "keywords_es": [
            "extranjero",
            "falsificación",
            "valores",
            "obligaciones",
            "moneda extranjera"
        ],
        "verified": true
    },
    {
        "id": "usc-18-479",
        "citation": "18 U.S.C. § 479",
        "sort_key": "018.00479.000",
        "category": "Federal Penal Code",
        "title_en": "Uttering Counterfeit Foreign Obligations or Securities",
        "title_es": "Poner en Circulación Obligaciones o Valores Extranjeros Falsificados",
        "description_en": "Passing, uttering, publishing, or selling counterfeit foreign obligations or securities with intent to defraud.",
        "description_es": "Pasar, poner en circulación, publicar o vender obligaciones o valores extranjeros falsificados con intención de defraudar.",
        "keywords_en": [
            "uttering",
            "counterfeit",
            "foreign",
            "securities",
            "intent to defraud"
        ],
        "keywords_es": [
            "poner en circulación",
            "falsificación",
            "extranjero",
            "valores",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-480",
        "citation": "18 U.S.C. § 480",
        "sort_key": "018.00480.000",
        "category": "Federal Penal Code",
        "title_en": "Possessing Counterfeit Foreign Obligations or Securities",
        "title_es": "Poseer Obligaciones o Valores Extranjeros Falsificados",
        "description_en": "Buying, selling, exchanging, or possessing counterfeit foreign obligations or securities with intent to defraud.",
        "description_es": "Comprar, vender, intercambiar o poseer obligaciones o valores extranjeros falsificados con intención de defraudar.",
        "keywords_en": [
            "possessing",
            "counterfeit",
            "foreign",
            "securities",
            "intent to defraud"
        ],
        "keywords_es": [
            "poseer",
            "falsificación",
            "extranjero",
            "valores",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-481",
        "citation": "18 U.S.C. § 481",
        "sort_key": "018.00481.000",
        "category": "Federal Penal Code",
        "title_en": "Plates, Stones, or Analog, Digital, or Electronic Images for Counterfeiting Foreign Obligations or Securities",
        "title_es": "Placas, Piedras o Imágenes para Falsificar Obligaciones o Valores Extranjeros",
        "description_en": "Making, possessing, or selling plates, stones, or digital images used for counterfeiting foreign obligations or securities.",
        "description_es": "Hacer, poseer o vender placas, piedras o imágenes digitales usadas para falsificar obligaciones o valores extranjeros.",
        "keywords_en": [
            "plates",
            "counterfeiting",
            "foreign",
            "digital images",
            "securities"
        ],
        "keywords_es": [
            "placas",
            "falsificación",
            "extranjero",
            "imágenes digitales",
            "valores"
        ],
        "verified": true
    },
    {
        "id": "usc-18-485",
        "citation": "18 U.S.C. § 485",
        "sort_key": "018.00485.000",
        "category": "Federal Penal Code",
        "title_en": "Coins or Bars",
        "title_es": "Monedas o Lingotes",
        "description_en": "Making, possessing, or selling counterfeit coins or bars of gold, silver, or other metal intended for use as current money.",
        "description_es": "Hacer, poseer o vender monedas o lingotes falsificados de oro, plata u otro metal destinados a usarse como dinero corriente.",
        "keywords_en": [
            "coins",
            "bars",
            "counterfeit",
            "gold",
            "silver",
            "current money"
        ],
        "keywords_es": [
            "monedas",
            "lingotes",
            "falsificación",
            "oro",
            "plata",
            "dinero corriente"
        ],
        "verified": true
    },
    {
        "id": "usc-18-486",
        "citation": "18 U.S.C. § 486",
        "sort_key": "018.00486.000",
        "category": "Federal Penal Code",
        "title_en": "Uttering Coins of Gold, Silver, or Other Metal",
        "title_es": "Poner en Circulación Monedas de Oro, Plata u Otro Metal",
        "description_en": "Passing, uttering, publishing, or selling counterfeit coins of gold, silver, or other metal with intent to defraud.",
        "description_es": "Pasar, poner en circulación, publicar o vender monedas falsificadas de oro, plata u otro metal con intención de defraudar.",
        "keywords_en": [
            "uttering",
            "coins",
            "gold",
            "silver",
            "intent to defraud"
        ],
        "keywords_es": [
            "poner en circulación",
            "monedas",
            "oro",
            "plata",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-487",
        "citation": "18 U.S.C. § 487",
        "sort_key": "018.00487.000",
        "category": "Federal Penal Code",
        "title_en": "Making or Possessing Counterfeit Coins",
        "title_es": "Fabricar o Poseer Monedas Falsificadas",
        "description_en": "Making, possessing, or selling counterfeit coins of gold, silver, or other metal with intent to defraud.",
        "description_es": "Hacer, poseer o vender monedas falsificadas de oro, plata u otro metal con intención de defraudar.",
        "keywords_en": [
            "making",
            "possessing",
            "counterfeit",
            "coins",
            "intent to defraud"
        ],
        "keywords_es": [
            "fabricar",
            "poseer",
            "falsificación",
            "monedas",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-488",
        "citation": "18 U.S.C. § 488",
        "sort_key": "018.00488.000",
        "category": "Federal Penal Code",
        "title_en": "Making or Possessing Similar Counterfeit Coins",
        "title_es": "Fabricar o Poseer Monedas Falsificadas Similares",
        "description_en": "Making, possessing, or selling counterfeit coins that resemble genuine coins of the United States or foreign countries.",
        "description_es": "Hacer, poseer o vender monedas falsificadas que se asemejan a monedas genuinas de Estados Unidos o países extranjeros.",
        "keywords_en": [
            "similar",
            "counterfeit",
            "coins",
            "resemble",
            "genuine"
        ],
        "keywords_es": [
            "similar",
            "falsificación",
            "monedas",
            "asemejar",
            "genuino"
        ],
        "verified": true
    },
    {
        "id": "usc-18-490",
        "citation": "18 U.S.C. § 490",
        "sort_key": "018.00490.000",
        "category": "Federal Penal Code",
        "title_en": "Forging or Counterfeiting Foreign Bank Notes",
        "title_es": "Falsificar o Falsificar Billetes de Banco Extranjeros",
        "description_en": "Forging, counterfeiting, or altering foreign bank notes or bills with intent to defraud.",
        "description_es": "Falsificar, falsificar o alterar billetes de banco extranjeros con intención de defraudar.",
        "keywords_en": [
            "forging",
            "counterfeiting",
            "foreign",
            "bank notes",
            "intent to defraud"
        ],
        "keywords_es": [
            "falsificar",
            "falsificación",
            "extranjero",
            "billetes de banco",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-491",
        "citation": "18 U.S.C. § 491",
        "sort_key": "018.00491.000",
        "category": "Federal Penal Code",
        "title_en": "Tokens or Paper Used as Money",
        "title_es": "Fichas o Papel Usados como Dinero",
        "description_en": "Making, possessing, or selling tokens, disks, or paper used as money in lieu of lawful coins or currency.",
        "description_es": "Hacer, poseer o vender fichas, discos o papel usados como dinero en lugar de monedas o billetes legales.",
        "keywords_en": [
            "tokens",
            "paper money",
            "disks",
            "lawful currency",
            "substitute"
        ],
        "keywords_es": [
            "fichas",
            "papel moneda",
            "discos",
            "moneda legal",
            "sustituto"
        ],
        "verified": true
    },
    {
        "id": "usc-18-492",
        "citation": "18 U.S.C. § 492",
        "sort_key": "018.00492.000",
        "category": "Federal Penal Code",
        "title_en": "Forcible Rescue of Seized Property",
        "title_es": "Rescate Forzoso de Propiedad Decomisada",
        "description_en": "Forcibly rescuing or attempting to rescue property that has been seized by federal officers.",
        "description_es": "Rescatar forzosamente o intentar rescatar propiedad que ha sido decomisada por oficiales federales.",
        "keywords_en": [
            "forcible rescue",
            "seized property",
            "federal officers",
            "attempting",
            "property"
        ],
        "keywords_es": [
            "rescate forzoso",
            "propiedad decomisada",
            "oficiales federales",
            "intentar",
            "propiedad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-493",
        "citation": "18 U.S.C. § 493",
        "sort_key": "018.00493.000",
        "category": "Federal Penal Code",
        "title_en": "Bonds and Obligations of Certain Lending Agencies",
        "title_es": "Bonos y Obligaciones de Ciertas Agencias de Préstamo",
        "description_en": "Making, possessing, or selling counterfeit bonds or obligations of federal lending agencies.",
        "description_es": "Hacer, poseer o vender bonos u obligaciones falsificadas de agencias federales de préstamo.",
        "keywords_en": [
            "bonds",
            "lending agencies",
            "counterfeit",
            "obligations",
            "federal"
        ],
        "keywords_es": [
            "bonos",
            "agencias de préstamo",
            "falsificación",
            "obligaciones",
            "federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-494",
        "citation": "18 U.S.C. § 494",
        "sort_key": "018.00494.000",
        "category": "Federal Penal Code",
        "title_en": "Contractors' Bonds, Bids, and Public Records",
        "title_es": "Fianzas de Contratistas, Ofertas y Registros Públicos",
        "description_en": "Making, possessing, or selling counterfeit contractors' bonds, bids, or public records with intent to defraud.",
        "description_es": "Hacer, poseer o vender fianzas de contratistas, ofertas o registros públicos falsificados con intención de defraudar.",
        "keywords_en": [
            "contractors",
            "bonds",
            "bids",
            "public records",
            "counterfeit"
        ],
        "keywords_es": [
            "contratistas",
            "fianzas",
            "ofertas",
            "registros públicos",
            "falsificación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-495",
        "citation": "18 U.S.C. § 495",
        "sort_key": "018.00495.000",
        "category": "Federal Penal Code",
        "title_en": "Contracts, Deeds, and Powers of Attorney",
        "title_es": "Contratos, Escrituras y Poderes Notariales",
        "description_en": "Making, possessing, or selling counterfeit contracts, deeds, or powers of attorney with intent to defraud.",
        "description_es": "Hacer, poseer o vender contratos, escrituras o poderes notariales falsificados con intención de defraudar.",
        "keywords_en": [
            "contracts",
            "deeds",
            "powers of attorney",
            "counterfeit",
            "intent to defraud"
        ],
        "keywords_es": [
            "contratos",
            "escrituras",
            "poderes notariales",
            "falsificación",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-496",
        "citation": "18 U.S.C. § 496",
        "sort_key": "018.00496.000",
        "category": "Federal Penal Code",
        "title_en": "Customs Matters",
        "title_es": "Asuntos de Aduanas",
        "description_en": "Making, possessing, or selling counterfeit customs documents or marks with intent to defraud the United States.",
        "description_es": "Hacer, poseer o vender documentos o marcas de aduanas falsificados con intención de defraudar a Estados Unidos.",
        "keywords_en": [
            "customs",
            "documents",
            "marks",
            "counterfeit",
            "intent to defraud"
        ],
        "keywords_es": [
            "aduanas",
            "documentos",
            "marcas",
            "falsificación",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-497",
        "citation": "18 U.S.C. § 497",
        "sort_key": "018.00497.000",
        "category": "Federal Penal Code",
        "title_en": "Letters Patent",
        "title_es": "Patentes",
        "description_en": "Making, possessing, or selling counterfeit letters patent with intent to defraud.",
        "description_es": "Hacer, poseer o vender patentes falsificadas con intención de defraudar.",
        "keywords_en": [
            "letters patent",
            "patents",
            "counterfeit",
            "intent to defraud",
            "intellectual property"
        ],
        "keywords_es": [
            "patentes",
            "propiedad intelectual",
            "falsificación",
            "intención de defraudar",
            "patentes"
        ],
        "verified": true
    },
    {
        "id": "usc-18-498",
        "citation": "18 U.S.C. § 498",
        "sort_key": "018.00498.000",
        "category": "Federal Penal Code",
        "title_en": "Military or Naval Discharge Certificates",
        "title_es": "Certificados de Licenciamiento Militar o Naval",
        "description_en": "Making, possessing, or selling counterfeit military or naval discharge certificates with intent to defraud.",
        "description_es": "Hacer, poseer o vender certificados de licenciamiento militar o naval falsificados con intención de defraudar.",
        "keywords_en": [
            "military discharge",
            "naval discharge",
            "certificates",
            "counterfeit",
            "veteran"
        ],
        "keywords_es": [
            "licenciamiento militar",
            "licenciamiento naval",
            "certificados",
            "falsificación",
            "veterano"
        ],
        "verified": true
    },
    {
        "id": "usc-18-499",
        "citation": "18 U.S.C. § 499",
        "sort_key": "018.00499.000",
        "category": "Federal Penal Code",
        "title_en": "Military, Naval, or Official Passes",
        "title_es": "Pases Militares, Navales u Oficiales",
        "description_en": "Making, possessing, or selling counterfeit military, naval, or official passes with intent to defraud.",
        "description_es": "Hacer, poseer o vender pases militares, navales u oficiales falsificados con intención de defraudar.",
        "keywords_en": [
            "military passes",
            "naval passes",
            "official passes",
            "counterfeit",
            "intent to defraud"
        ],
        "keywords_es": [
            "pases militares",
            "pases navales",
            "pases oficiales",
            "falsificación",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-500",
        "citation": "18 U.S.C. § 500",
        "sort_key": "018.00500.000",
        "category": "Federal Penal Code",
        "title_en": "Money Orders",
        "title_es": "Giros Postales",
        "description_en": "Making, possessing, or selling counterfeit money orders with intent to defraud.",
        "description_es": "Hacer, poseer o vender giros postales falsificados con intención de defraudar.",
        "keywords_en": [
            "money orders",
            "counterfeit",
            "intent to defraud",
            "postal",
            "financial instrument"
        ],
        "keywords_es": [
            "giros postales",
            "falsificación",
            "intención de defraudar",
            "postal",
            "instrumento financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-501",
        "citation": "18 U.S.C. § 501",
        "sort_key": "018.00501.000",
        "category": "Federal Penal Code",
        "title_en": "Postage Stamps, Postage Meter Stamps, and Postage Stamp Affixed Envelopes",
        "title_es": "Estampillas Postales, Sellos de Máquina Franqueadora y Sobres con Estampillas",
        "description_en": "Making, possessing, or selling counterfeit postage stamps, postage meter stamps, or postage stamp affixed envelopes with intent to defraud.",
        "description_es": "Hacer, poseer o vender estampillas postales, sellos de máquina franqueadora o sobres con estampillas falsificados con intención de defraudar.",
        "keywords_en": [
            "postage stamps",
            "counterfeit",
            "intent to defraud",
            "postal",
            "meter stamps"
        ],
        "keywords_es": [
            "estampillas postales",
            "falsificación",
            "intención de defraudar",
            "postal",
            "sellos de máquina"
        ],
        "verified": true
    },
    {
        "id": "usc-18-502",
        "citation": "18 U.S.C. § 502",
        "sort_key": "018.00502.000",
        "category": "Federal Penal Code",
        "title_en": "Postage and Revenue Stamps of Foreign Governments",
        "title_es": "Estampillas Postales y de Ingresos de Gobiernos Extranjeros",
        "description_en": "Making, possessing, or selling counterfeit postage or revenue stamps of foreign governments with intent to defraud.",
        "description_es": "Hacer, poseer o vender estampillas postales o de ingresos de gobiernos extranjeros falsificadas con intención de defraudar.",
        "keywords_en": [
            "postage stamps",
            "revenue stamps",
            "foreign governments",
            "counterfeit",
            "intent to defraud"
        ],
        "keywords_es": [
            "estampillas postales",
            "estampillas de ingresos",
            "gobiernos extranjeros",
            "falsificación",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-503",
        "citation": "18 U.S.C. § 503",
        "sort_key": "018.00503.000",
        "category": "Federal Penal Code",
        "title_en": "Postmarking Stamps",
        "title_es": "Sellos de Matasellos",
        "description_en": "Making, possessing, or selling counterfeit postmarking stamps with intent to defraud.",
        "description_es": "Hacer, poseer o vender sellos de matasellos falsificados con intención de defraudar.",
        "keywords_en": [
            "postmarking stamps",
            "counterfeit",
            "intent to defraud",
            "postal",
            "cancellation"
        ],
        "keywords_es": [
            "sellos de matasellos",
            "falsificación",
            "intención de defraudar",
            "postal",
            "cancelación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-504",
        "citation": "18 U.S.C. § 504",
        "sort_key": "018.00504.000",
        "category": "Federal Penal Code",
        "title_en": "Printing and Filming of United States and Foreign Obligations and Securities",
        "title_es": "Impresión y Filmación de Obligaciones y Valores de Estados Unidos y Extranjeros",
        "description_en": "Making, possessing, or selling printed or filmed copies of United States or foreign obligations or securities with intent to defraud.",
        "description_es": "Hacer, poseer o vender copias impresas o filmadas de obligaciones o valores de Estados Unidos o extranjeros con intención de defraudar.",
        "keywords_en": [
            "printing",
            "filming",
            "obligations",
            "securities",
            "counterfeit"
        ],
        "keywords_es": [
            "impresión",
            "filmación",
            "obligaciones",
            "valores",
            "falsificación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-505",
        "citation": "18 U.S.C. § 505",
        "sort_key": "018.00505.000",
        "category": "Federal Penal Code",
        "title_en": "Seals of Courts; Signatures of Judges or Court Officers",
        "title_es": "Sellos de Tribunales; Firmas de Jueces u Oficiales de Corte",
        "description_en": "Making, possessing, or selling counterfeit seals of courts or signatures of judges or court officers with intent to defraud.",
        "description_es": "Hacer, poseer o vender sellos de tribunales o firmas de jueces u oficiales de corte falsificados con intención de defraudar.",
        "keywords_en": [
            "court seals",
            "signatures",
            "judges",
            "court officers",
            "counterfeit"
        ],
        "keywords_es": [
            "sellos de tribunales",
            "firmas",
            "jueces",
            "oficiales de corte",
            "falsificación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-506",
        "citation": "18 U.S.C. § 506",
        "sort_key": "018.00506.000",
        "category": "Federal Penal Code",
        "title_en": "Seals of Departments or Agencies",
        "title_es": "Sellos de Departamentos o Agencias",
        "description_en": "Making, possessing, or selling counterfeit seals of federal departments or agencies with intent to defraud.",
        "description_es": "Hacer, poseer o vender sellos de departamentos o agencias federales falsificados con intención de defraudar.",
        "keywords_en": [
            "seals",
            "departments",
            "agencies",
            "counterfeit",
            "federal"
        ],
        "keywords_es": [
            "sellos",
            "departamentos",
            "agencias",
            "falsificación",
            "federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-507",
        "citation": "18 U.S.C. § 507",
        "sort_key": "018.00507.000",
        "category": "Federal Penal Code",
        "title_en": "Ship's Papers",
        "title_es": "Documentos de Embarcaciones",
        "description_en": "Making, possessing, or selling counterfeit ship's papers with intent to defraud.",
        "description_es": "Hacer, poseer o vender documentos de embarcaciones falsificados con intención de defraudar.",
        "keywords_en": [
            "ship's papers",
            "maritime",
            "counterfeit",
            "vessel documents",
            "intent to defraud"
        ],
        "keywords_es": [
            "documentos de embarcaciones",
            "marítimo",
            "falsificación",
            "documentos de buque",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-508",
        "citation": "18 U.S.C. § 508",
        "sort_key": "018.00508.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation Requests of Government",
        "title_es": "Solicitudes de Transporte del Gobierno",
        "description_en": "Making, possessing, or selling counterfeit government transportation requests with intent to defraud.",
        "description_es": "Hacer, poseer o vender solicitudes de transporte del gobierno falsificadas con intención de defraudar.",
        "keywords_en": [
            "transportation requests",
            "government",
            "counterfeit",
            "travel",
            "intent to defraud"
        ],
        "keywords_es": [
            "solicitudes de transporte",
            "gobierno",
            "falsificación",
            "viaje",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-509",
        "citation": "18 U.S.C. § 509",
        "sort_key": "018.00509.000",
        "category": "Federal Penal Code",
        "title_en": "Possessing and Making Plates and Counterfeit Notes",
        "title_es": "Poseer y Fabricar Placas y Billetes Falsificados",
        "description_en": "Making, possessing, or selling plates or counterfeit notes with intent to defraud.",
        "description_es": "Hacer, poseer o vender placas o billetes falsificados con intención de defraudar.",
        "keywords_en": [
            "plates",
            "counterfeit notes",
            "possessing",
            "making",
            "intent to defraud"
        ],
        "keywords_es": [
            "placas",
            "billetes falsificados",
            "poseer",
            "fabricar",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-510",
        "citation": "18 U.S.C. § 510",
        "sort_key": "018.00510.000",
        "category": "Federal Penal Code",
        "title_en": "Forging Endorsements on Treasury Checks, Bonds, or Securities of the United States",
        "title_es": "Falsificar Endosos en Cheques del Tesoro, Bonos o Valores de Estados Unidos",
        "description_en": "Forging endorsements on treasury checks, bonds, or securities of the United States with intent to defraud.",
        "description_es": "Falsificar endosos en cheques del tesoro, bonos o valores de Estados Unidos con intención de defraudar.",
        "keywords_en": [
            "forging",
            "endorsements",
            "treasury checks",
            "bonds",
            "securities"
        ],
        "keywords_es": [
            "falsificar",
            "endosos",
            "cheques del tesoro",
            "bonos",
            "valores"
        ],
        "verified": true
    },
    {
        "id": "usc-18-511",
        "citation": "18 U.S.C. § 511",
        "sort_key": "018.00511.000",
        "category": "Federal Penal Code",
        "title_en": "Altering or Removing Motor Vehicle Identification Numbers",
        "title_es": "Alterar o Remover Números de Identificación de Vehículos Motorizados",
        "description_en": "Altering, removing, or obliterating motor vehicle identification numbers with intent to conceal the identity of the vehicle.",
        "description_es": "Alterar, remover o borrar números de identificación de vehículos motorizados con intención de ocultar la identidad del vehículo.",
        "keywords_en": [
            "VIN",
            "vehicle identification",
            "altering",
            "removing",
            "conceal identity"
        ],
        "keywords_es": [
            "VIN",
            "identificación de vehículo",
            "alterar",
            "remover",
            "ocultar identidad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-512",
        "citation": "18 U.S.C. § 512",
        "sort_key": "018.00512.000",
        "category": "Federal Penal Code",
        "title_en": "Forfeiture of Vessels and Vehicles Used to Transport Counterfeit Coins",
        "title_es": "Decomiso de Embarcaciones y Vehículos Usados para Transportar Monedas Falsificadas",
        "description_en": "Forfeiture of vessels and vehicles used to transport counterfeit coins with intent to defraud.",
        "description_es": "Decomiso de embarcaciones y vehículos usados para transportar monedas falsificadas con intención de defraudar.",
        "keywords_en": [
            "forfeiture",
            "vessels",
            "vehicles",
            "counterfeit coins",
            "transport"
        ],
        "keywords_es": [
            "decomiso",
            "embarcaciones",
            "vehículos",
            "monedas falsificadas",
            "transporte"
        ],
        "verified": true
    },
    {
        "id": "usc-18-513",
        "citation": "18 U.S.C. § 513",
        "sort_key": "018.00513.000",
        "category": "Federal Penal Code",
        "title_en": "Securities of the States and Private Entities",
        "title_es": "Valores de los Estados y Entidades Privadas",
        "description_en": "Making, possessing, or selling counterfeit securities of states or private entities with intent to defraud.",
        "description_es": "Hacer, poseer o vender valores falsificados de estados o entidades privadas con intención de defraudar.",
        "keywords_en": [
            "securities",
            "states",
            "private entities",
            "counterfeit",
            "intent to defraud"
        ],
        "keywords_es": [
            "valores",
            "estados",
            "entidades privadas",
            "falsificación",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-514",
        "citation": "18 U.S.C. § 514",
        "sort_key": "018.00514.000",
        "category": "Federal Penal Code",
        "title_en": "Fictitious Obligations",
        "title_es": "Obligaciones Ficticias",
        "description_en": "Making, possessing, or selling fictitious obligations with intent to defraud.",
        "description_es": "Hacer, poseer o vender obligaciones ficticias con intención de defraudar.",
        "keywords_en": [
            "fictitious obligations",
            "counterfeit",
            "intent to defraud",
            "fake documents"
        ],
        "keywords_es": [
            "obligaciones ficticias",
            "falsificación",
            "intención de defraudar",
            "documentos falsos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-541",
        "citation": "18 U.S.C. § 541",
        "sort_key": "018.00541.000",
        "category": "Federal Penal Code",
        "title_en": "Entry of Goods Falsely Classified",
        "title_es": "Ingreso de Mercancías Falsamente Clasificadas",
        "description_en": "Entering goods into the United States with false classification to evade duties or restrictions.",
        "description_es": "Ingresar mercancías a Estados Unidos con clasificación falsa para evadir aranceles o restricciones.",
        "keywords_en": [
            "goods",
            "falsely classified",
            "customs",
            "evade duties",
            "import"
        ],
        "keywords_es": [
            "mercancías",
            "falsamente clasificadas",
            "aduanas",
            "evadir aranceles",
            "importar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-542",
        "citation": "18 U.S.C. § 542",
        "sort_key": "018.00542.000",
        "category": "Federal Penal Code",
        "title_en": "Entry of Goods by Means of False Statements",
        "title_es": "Ingreso de Mercancías por Medio de Declaraciones Falsas",
        "description_en": "Entering goods into the United States by means of false statements or documents.",
        "description_es": "Ingresar mercancías a Estados Unidos por medio de declaraciones o documentos falsos.",
        "keywords_en": [
            "goods",
            "false statements",
            "customs",
            "import",
            "fraud"
        ],
        "keywords_es": [
            "mercancías",
            "declaraciones falsas",
            "aduanas",
            "importar",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-543",
        "citation": "18 U.S.C. § 543",
        "sort_key": "018.00543.000",
        "category": "Federal Penal Code",
        "title_en": "Entry of Goods for Less Than Legal Duty",
        "title_es": "Ingreso de Mercancías por Menos del Arancel Legal",
        "description_en": "Entering goods into the United States for less than the legal duty or by means of false invoices.",
        "description_es": "Ingresar mercancías a Estados Unidos por menos del arancel legal o por medio de facturas falsas.",
        "keywords_en": [
            "goods",
            "legal duty",
            "customs",
            "false invoices",
            "evade"
        ],
        "keywords_es": [
            "mercancías",
            "arancel legal",
            "aduanas",
            "facturas falsas",
            "evadir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-545",
        "citation": "18 U.S.C. § 545",
        "sort_key": "018.00545.000",
        "category": "Federal Penal Code",
        "title_en": "Smuggling Goods into the United States",
        "title_es": "Contrabando de Mercancías a Estados Unidos",
        "description_en": "Smuggling goods into the United States contrary to law, or receiving, concealing, buying, selling, or facilitating the transportation of such goods.",
        "description_es": "Introducir mercancías a Estados Unidos contrario a la ley, o recibir, ocultar, comprar, vender o facilitar el transporte de dichas mercancías.",
        "keywords_en": [
            "smuggling",
            "goods",
            "customs",
            "contraband",
            "import"
        ],
        "keywords_es": [
            "contrabando",
            "mercancías",
            "aduanas",
            "contrabando",
            "importar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-546",
        "citation": "18 U.S.C. § 546",
        "sort_key": "018.00546.000",
        "category": "Federal Penal Code",
        "title_en": "Smuggling Goods into Foreign Countries from the United States",
        "title_es": "Contrabando de Mercancías a Países Extranjeros desde Estados Unidos",
        "description_en": "Smuggling goods from the United States into foreign countries contrary to law.",
        "description_es": "Introducir mercancías desde Estados Unidos a países extranjeros contrario a la ley.",
        "keywords_en": [
            "smuggling",
            "foreign countries",
            "export",
            "contraband",
            "goods"
        ],
        "keywords_es": [
            "contrabando",
            "países extranjeros",
            "exportar",
            "contrabando",
            "mercancías"
        ],
        "verified": true
    },
    {
        "id": "usc-18-547",
        "citation": "18 U.S.C. § 547",
        "sort_key": "018.00547.000",
        "category": "Federal Penal Code",
        "title_en": "Depositing Goods in Buildings on Boundaries",
        "title_es": "Depósito de Mercancías en Edificios en Fronteras",
        "description_en": "Depositing goods in buildings on boundaries between the United States and foreign countries for the purpose of smuggling.",
        "description_es": "Depositar mercancías en edificios en fronteras entre Estados Unidos y países extranjeros con el propósito de contrabando.",
        "keywords_en": [
            "depositing goods",
            "boundaries",
            "smuggling",
            "border",
            "buildings"
        ],
        "keywords_es": [
            "depósito de mercancías",
            "fronteras",
            "contrabando",
            "frontera",
            "edificios"
        ],
        "verified": true
    },
    {
        "id": "usc-18-548",
        "citation": "18 U.S.C. § 548",
        "sort_key": "018.00548.000",
        "category": "Federal Penal Code",
        "title_en": "Removing or Repacking Goods with Intent to Defraud",
        "title_es": "Remover o Reempacar Mercancías con Intención de Defraudar",
        "description_en": "Removing or repacking goods with intent to evade customs duties or restrictions.",
        "description_es": "Remover o reempacar mercancías con intención de evadir aranceles aduaneros o restricciones.",
        "keywords_en": [
            "removing",
            "repacking",
            "goods",
            "customs",
            "intent to defraud"
        ],
        "keywords_es": [
            "remover",
            "reempacar",
            "mercancías",
            "aduanas",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-549",
        "citation": "18 U.S.C. § 549",
        "sort_key": "018.00549.000",
        "category": "Federal Penal Code",
        "title_en": "Removing Goods from Customs Custody",
        "title_es": "Remover Mercancías de Custodia Aduanera",
        "description_en": "Removing goods from customs custody or control without authorization.",
        "description_es": "Remover mercancías de custodia o control aduanero sin autorización.",
        "keywords_en": [
            "removing",
            "customs custody",
            "goods",
            "unauthorized",
            "customs"
        ],
        "keywords_es": [
            "remover",
            "custodia aduanera",
            "mercancías",
            "no autorizado",
            "aduanas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-550",
        "citation": "18 U.S.C. § 550",
        "sort_key": "018.00550.000",
        "category": "Federal Penal Code",
        "title_en": "False Claim for Refund of Duties",
        "title_es": "Reclamación Falsa de Reembolso de Aranceles",
        "description_en": "Making a false claim for refund of customs duties with intent to defraud.",
        "description_es": "Hacer una reclamación falsa de reembolso de aranceles aduaneros con intención de defraudar.",
        "keywords_en": [
            "false claim",
            "refund",
            "customs duties",
            "intent to defraud",
            "customs"
        ],
        "keywords_es": [
            "reclamación falsa",
            "reembolso",
            "aranceles aduaneros",
            "intención de defraudar",
            "aduanas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-551",
        "citation": "18 U.S.C. § 551",
        "sort_key": "018.00551.000",
        "category": "Federal Penal Code",
        "title_en": "Concealing or Destroying Invoices or Other Papers",
        "title_es": "Ocultar o Destruir Facturas u Otros Documentos",
        "description_en": "Concealing or destroying invoices or other papers related to imported goods with intent to defraud.",
        "description_es": "Ocultar o destruir facturas u otros documentos relacionados con mercancías importadas con intención de defraudar.",
        "keywords_en": [
            "concealing",
            "destroying",
            "invoices",
            "imported goods",
            "intent to defraud"
        ],
        "keywords_es": [
            "ocultar",
            "destruir",
            "facturas",
            "mercancías importadas",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-552",
        "citation": "18 U.S.C. § 552",
        "sort_key": "018.00552.000",
        "category": "Federal Penal Code",
        "title_en": "Officers and Employees of the United States as Witnesses",
        "title_es": "Oficiales y Empleados de Estados Unidos como Testigos",
        "description_en": "Officers and employees of the United States acting as witnesses in customs matters with intent to defraud.",
        "description_es": "Oficiales y empleados de Estados Unidos actuando como testigos en asuntos aduaneros con intención de defraudar.",
        "keywords_en": [
            "officers",
            "employees",
            "witnesses",
            "customs",
            "intent to defraud"
        ],
        "keywords_es": [
            "oficiales",
            "empleados",
            "testigos",
            "aduanas",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-553",
        "citation": "18 U.S.C. § 553",
        "sort_key": "018.00553.000",
        "category": "Federal Penal Code",
        "title_en": "Importation or Exportation of Stolen Motor Vehicles, Off-Road Vehicles, Vessels, or Aircraft",
        "title_es": "Importación o Exportación de Vehículos Motorizados, Vehículos Todo Terreno, Embarcaciones o Aeronaves Robados",
        "description_en": "Importing or exporting stolen motor vehicles, off-road vehicles, vessels, or aircraft knowing them to be stolen.",
        "description_es": "Importar o exportar vehículos motorizados, vehículos todo terreno, embarcaciones o aeronaves robados sabiendo que son robados.",
        "keywords_en": [
            "importation",
            "exportation",
            "stolen vehicles",
            "stolen vessels",
            "stolen aircraft"
        ],
        "keywords_es": [
            "importación",
            "exportación",
            "vehículos robados",
            "embarcaciones robadas",
            "aeronaves robadas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-554",
        "citation": "18 U.S.C. § 554",
        "sort_key": "018.00554.000",
        "category": "Federal Penal Code",
        "title_en": "Smuggling Goods from the United States",
        "title_es": "Contrabando de Mercancías desde Estados Unidos",
        "description_en": "Smuggling goods from the United States with intent to evade customs duties or restrictions.",
        "description_es": "Introducir mercancías desde Estados Unidos con intención de evadir aranceles aduaneros o restricciones.",
        "keywords_en": [
            "smuggling",
            "goods",
            "United States",
            "customs",
            "evade"
        ],
        "keywords_es": [
            "contrabando",
            "mercancías",
            "Estados Unidos",
            "aduanas",
            "evadir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-555",
        "citation": "18 U.S.C. § 555",
        "sort_key": "018.00555.000",
        "category": "Federal Penal Code",
        "title_en": "Border Tunnels and Passages",
        "title_es": "Túneles y Pasajes Fronterizos",
        "description_en": "Constructing, financing, or maintaining a tunnel or passage across an international border for the purpose of smuggling.",
        "description_es": "Construir, financiar o mantener un túnel o pasaje a través de una frontera internacional con el propósito de contrabando.",
        "keywords_en": [
            "border tunnels",
            "passages",
            "smuggling",
            "international border",
            "contraband"
        ],
        "keywords_es": [
            "túneles fronterizos",
            "pasajes",
            "contrabando",
            "frontera internacional",
            "contrabando"
        ],
        "verified": true
    },
    {
        "id": "usc-18-556",
        "citation": "18 U.S.C. § 556",
        "sort_key": "018.00556.000",
        "category": "Federal Penal Code",
        "title_en": "Contraband Cigarettes",
        "title_es": "Cigarrillos de Contrabando",
        "description_en": "Shipping, transporting, receiving, possessing, selling, or distributing contraband cigarettes.",
        "description_es": "Enviar, transportar, recibir, poseer, vender o distribuir cigarrillos de contrabando.",
        "keywords_en": [
            "contraband cigarettes",
            "smuggling",
            "tobacco",
            "distribution",
            "transporting"
        ],
        "keywords_es": [
            "cigarrillos de contrabando",
            "contrabando",
            "tabaco",
            "distribución",
            "transporte"
        ],
        "verified": true
    },
    {
        "id": "usc-18-557",
        "citation": "18 U.S.C. § 557",
        "sort_key": "018.00557.000",
        "category": "Federal Penal Code",
        "title_en": "Delivering Goods to Consignee",
        "title_es": "Entrega de Mercancías al Consignatario",
        "description_en": "Delivering goods to a consignee without proper documentation or authorization.",
        "description_es": "Entregar mercancías a un consignatario sin documentación o autorización adecuada.",
        "keywords_en": [
            "delivering goods",
            "consignee",
            "documentation",
            "customs",
            "authorization"
        ],
        "keywords_es": [
            "entrega de mercancías",
            "consignatario",
            "documentación",
            "aduanas",
            "autorización"
        ],
        "verified": true
    },
    {
        "id": "usc-18-558",
        "citation": "18 U.S.C. § 558",
        "sort_key": "018.00558.000",
        "category": "Federal Penal Code",
        "title_en": "Issuing False Certificate",
        "title_es": "Emitir Certificado Falso",
        "description_en": "Issuing a false certificate or document related to customs or trade with intent to defraud.",
        "description_es": "Emitir un certificado o documento falso relacionado con aduanas o comercio con intención de defraudar.",
        "keywords_en": [
            "false certificate",
            "issuing",
            "customs",
            "trade",
            "intent to defraud"
        ],
        "keywords_es": [
            "certificado falso",
            "emitir",
            "aduanas",
            "comercio",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-559",
        "citation": "18 U.S.C. § 559",
        "sort_key": "018.00559.000",
        "category": "Federal Penal Code",
        "title_en": "Certification of Checks for Customs Duties",
        "title_es": "Certificación de Cheques para Aranceles Aduaneros",
        "description_en": "Certifying checks for customs duties with intent to defraud.",
        "description_es": "Certificar cheques para aranceles aduaneros con intención de defraudar.",
        "keywords_en": [
            "certification",
            "checks",
            "customs duties",
            "intent to defraud",
            "customs"
        ],
        "keywords_es": [
            "certificación",
            "cheques",
            "aranceles aduaneros",
            "intención de defraudar",
            "aduanas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-560",
        "citation": "18 U.S.C. § 560",
        "sort_key": "018.00560.000",
        "category": "Federal Penal Code",
        "title_en": "Disposition of Personal Property Seized for Violation of Customs Laws",
        "title_es": "Disposición de Propiedad Personal Decomisada por Violación de Leyes Aduaneras",
        "description_en": "Disposition of personal property seized for violation of customs laws.",
        "description_es": "Disposición de propiedad personal decomisada por violación de leyes aduaneras.",
        "keywords_en": [
            "disposition",
            "seized property",
            "customs laws",
            "personal property",
            "forfeiture"
        ],
        "keywords_es": [
            "disposición",
            "propiedad decomisada",
            "leyes aduaneras",
            "propiedad personal",
            "decomiso"
        ],
        "verified": true
    },
    {
        "id": "usc-18-561",
        "citation": "18 U.S.C. § 561",
        "sort_key": "018.00561.000",
        "category": "Federal Penal Code",
        "title_en": "Aircraft and Motor Vehicles Seized under Customs Laws",
        "title_es": "Aeronaves y Vehículos Motorizados Decomisados bajo Leyes Aduaneras",
        "description_en": "Disposition of aircraft and motor vehicles seized under customs laws.",
        "description_es": "Disposición de aeronaves y vehículos motorizados decomisados bajo leyes aduaneras.",
        "keywords_en": [
            "aircraft",
            "motor vehicles",
            "seized",
            "customs laws",
            "disposition"
        ],
        "keywords_es": [
            "aeronaves",
            "vehículos motorizados",
            "decomisados",
            "leyes aduaneras",
            "disposición"
        ],
        "verified": true
    },
    {
        "id": "usc-18-566",
        "citation": "18 U.S.C. § 566",
        "sort_key": "018.00566.000",
        "category": "Federal Penal Code",
        "title_en": "Refund of Excess Profits on Contracts with United States",
        "title_es": "Reembolso de Ganancias Excesivas en Contratos con Estados Unidos",
        "description_en": "Refund of excess profits on contracts with the United States with intent to defraud.",
        "description_es": "Reembolso de ganancias excesivas en contratos con Estados Unidos con intención de defraudar.",
        "keywords_en": [
            "refund",
            "excess profits",
            "contracts",
            "United States",
            "intent to defraud"
        ],
        "keywords_es": [
            "reembolso",
            "ganancias excesivas",
            "contratos",
            "Estados Unidos",
            "intención de defraudar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-581",
        "citation": "18 U.S.C. § 581",
        "sort_key": "018.00581.000",
        "category": "Federal Penal Code",
        "title_en": "Customhouse Brokers",
        "title_es": "Agentes de Aduana",
        "description_en": "Regulation of customhouse brokers and their conduct in customs matters.",
        "description_es": "Regulación de agentes de aduana y su conducta en asuntos aduaneros.",
        "keywords_en": [
            "customhouse brokers",
            "customs",
            "regulation",
            "brokers",
            "customs matters"
        ],
        "keywords_es": [
            "agentes de aduana",
            "aduanas",
            "regulación",
            "agentes",
            "asuntos aduaneros"
        ],
        "verified": true
    },
    {
        "id": "usc-18-582",
        "citation": "18 U.S.C. § 582",
        "sort_key": "018.00582.000",
        "category": "Federal Penal Code",
        "title_en": "Public Stores",
        "title_es": "Almacenes Públicos",
        "description_en": "Regulation of public stores and bonded warehouses for customs purposes.",
        "description_es": "Regulación de almacenes públicos y depósitos de unión para propósitos aduaneros.",
        "keywords_en": [
            "public stores",
            "bonded warehouses",
            "customs",
            "storage",
            "warehouses"
        ],
        "keywords_es": [
            "almacenes públicos",
            "depósitos de unión",
            "aduanas",
            "almacenamiento",
            "almacenes"
        ],
        "verified": true
    },
    {
        "id": "usc-18-583",
        "citation": "18 U.S.C. § 583",
        "sort_key": "018.00583.000",
        "category": "Federal Penal Code",
        "title_en": "Customs Officers and Employees",
        "title_es": "Oficiales y Empleados de Aduanas",
        "description_en": "Regulation of customs officers and employees in the performance of their duties.",
        "description_es": "Regulación de oficiales y empleados de aduanas en el desempeño de sus deberes.",
        "keywords_en": [
            "customs officers",
            "employees",
            "regulation",
            "customs",
            "duties"
        ],
        "keywords_es": [
            "oficiales de aduanas",
            "empleados",
            "regulación",
            "aduanas",
            "deberes"
        ],
        "verified": true
    },
    {
        "id": "usc-18-584",
        "citation": "18 U.S.C. § 584",
        "sort_key": "018.00584.000",
        "category": "Federal Penal Code",
        "title_en": "Customs Revenue Offenses",
        "title_es": "Delitos de Ingresos de Aduanas",
        "description_en": "Offenses related to customs revenue, including fraud and evasion of duties.",
        "description_es": "Delitos relacionados con ingresos de aduanas, incluyendo fraude y evasión de aranceles.",
        "keywords_en": [
            "customs revenue",
            "offenses",
            "fraud",
            "evasion",
            "duties"
        ],
        "keywords_es": [
            "ingresos de aduanas",
            "delitos",
            "fraude",
            "evasión",
            "aranceles"
        ],
        "verified": true
    },
    {
        "id": "usc-18-585",
        "citation": "18 U.S.C. § 585",
        "sort_key": "018.00585.000",
        "category": "Federal Penal Code",
        "title_en": "Disclosure of Information by Customs Officers and Employees",
        "title_es": "Divulgación de Información por Oficiales y Empleados de Aduanas",
        "description_en": "Unauthorized disclosure of information by customs officers and employees.",
        "description_es": "Divulgación no autorizada de información por oficiales y empleados de aduanas.",
        "keywords_en": [
            "disclosure",
            "customs officers",
            "employees",
            "information",
            "unauthorized"
        ],
        "keywords_es": [
            "divulgación",
            "oficiales de aduanas",
            "empleados",
            "información",
            "no autorizada"
        ],
        "verified": true
    },
    {
        "id": "usc-18-591",
        "citation": "18 U.S.C. § 591",
        "sort_key": "018.00591.000",
        "category": "Federal Penal Code",
        "title_en": "Offenses Enacted by the Subversive Activities Control Act of 1950",
        "title_es": "Delitos Promulgados por la Ley de Control de Actividades Subversivas de 1950",
        "description_en": "Offenses related to subversive activities and organizations as defined by the Subversive Activities Control Act of 1950.",
        "description_es": "Delitos relacionados con actividades y organizaciones subversivas según lo definido por la Ley de Control de Actividades Subversivas de 1950.",
        "keywords_en": [
            "subversive activities",
            "organizations",
            "control act",
            "1950",
            "offenses"
        ],
        "keywords_es": [
            "actividades subversivas",
            "organizaciones",
            "ley de control",
            "1950",
            "delitos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-592",
        "citation": "18 U.S.C. § 592",
        "sort_key": "018.00592.000",
        "category": "Federal Penal Code",
        "title_en": "Shipments to Countries with Which Trade Is Prohibited",
        "title_es": "Envíos a Países con los Cuales el Comercio Está Prohibido",
        "description_en": "Shipping goods to countries with which trade is prohibited by the United States.",
        "description_es": "Enviar mercancías a países con los cuales el comercio está prohibido por Estados Unidos.",
        "keywords_en": [
            "shipments",
            "prohibited trade",
            "countries",
            "embargo",
            "sanctions"
        ],
        "keywords_es": [
            "envíos",
            "comercio prohibido",
            "países",
            "embargo",
            "sanciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-594",
        "citation": "18 U.S.C. § 594",
        "sort_key": "018.00594.000",
        "category": "Federal Penal Code",
        "title_en": "Offer of Gratuities to Revenue Officers",
        "title_es": "Ofrecer Gratificaciones a Oficiales de Ingresos",
        "description_en": "Offering gratuities or bribes to revenue officers with intent to influence their actions.",
        "description_es": "Ofrecer gratificaciones o sobornos a oficiales de ingresos con intención de influir en sus acciones.",
        "keywords_en": [
            "gratuities",
            "revenue officers",
            "bribes",
            "influence",
            "corruption"
        ],
        "keywords_es": [
            "gratificaciones",
            "oficiales de ingresos",
            "sobornos",
            "influir",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-595",
        "citation": "18 U.S.C. § 595",
        "sort_key": "018.00595.000",
        "category": "Federal Penal Code",
        "title_en": "Expenditures to Influence Voting",
        "title_es": "Gastos para Influir en el Voto",
        "description_en": "Making expenditures to influence voting in federal elections with intent to defraud.",
        "description_es": "Hacer gastos para influir en el voto en elecciones federales con intención de defraudar.",
        "keywords_en": [
            "expenditures",
            "influence voting",
            "federal elections",
            "intent to defraud",
            "voting"
        ],
        "keywords_es": [
            "gastos",
            "influir en el voto",
            "elecciones federales",
            "intención de defraudar",
            "voto"
        ],
        "verified": true
    },
    {
        "id": "usc-18-596",
        "citation": "18 U.S.C. § 596",
        "sort_key": "018.00596.000",
        "category": "Federal Penal Code",
        "title_en": "Receiving Advance Pay for Services on Vessel about to Arrive",
        "title_es": "Recibir Pago Anticipado por Servicios en Embarcación a Punto de Llegar",
        "description_en": "Receiving advance pay for services on a vessel about to arrive with intent to defraud.",
        "description_es": "Recibir pago anticipado por servicios en una embarcación a punto de llegar con intención de defraudar.",
        "keywords_en": [
            "advance pay",
            "vessel services",
            "intent to defraud",
            "maritime",
            "payment"
        ],
        "keywords_es": [
            "pago anticipado",
            "servicios de embarcación",
            "intención de defraudar",
            "marítimo",
            "pago"
        ],
        "verified": true
    },
    {
        "id": "usc-18-597",
        "citation": "18 U.S.C. § 597",
        "sort_key": "018.00597.000",
        "category": "Federal Penal Code",
        "title_en": "Expenditures to Influence Voting (Deprivation by Force)",
        "title_es": "Gastos para Influir en el Voto (Privación por Fuerza)",
        "description_en": "Making expenditures to deprive any person of employment or other benefit by force with intent to influence voting.",
        "description_es": "Hacer gastos para privar a cualquier persona de empleo u otro beneficio por fuerza con intención de influir en el voto.",
        "keywords_en": [
            "expenditures",
            "deprivation",
            "force",
            "influence voting",
            "employment"
        ],
        "keywords_es": [
            "gastos",
            "privación",
            "fuerza",
            "influir en el voto",
            "empleo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-598",
        "citation": "18 U.S.C. § 598",
        "sort_key": "018.00598.000",
        "category": "Federal Penal Code",
        "title_en": "Coercion by Means of Relief Appropriations",
        "title_es": "Coerción por Medio de Apropiaciones de Ayuda",
        "description_en": "Using relief appropriations to coerce political activity or voting.",
        "description_es": "Usar apropiaciones de ayuda para coaccionar actividad política o voto.",
        "keywords_en": [
            "coercion",
            "relief appropriations",
            "political activity",
            "voting",
            "influence"
        ],
        "keywords_es": [
            "coerción",
            "apropiaciones de ayuda",
            "actividad política",
            "voto",
            "influir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-599",
        "citation": "18 U.S.C. § 599",
        "sort_key": "018.00599.000",
        "category": "Federal Penal Code",
        "title_en": "Promise of Appointment by Candidate",
        "title_es": "Promesa de Nombramiento por Candidato",
        "description_en": "A candidate promising appointment to public office in exchange for support or votes.",
        "description_es": "Un candidato promete nombramiento a cargo público a cambio de apoyo o votos.",
        "keywords_en": [
            "promise",
            "appointment",
            "candidate",
            "public office",
            "votes"
        ],
        "keywords_es": [
            "promesa",
            "nombramiento",
            "candidato",
            "cargo público",
            "votos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-600",
        "citation": "18 U.S.C. § 600",
        "sort_key": "018.00600.000",
        "category": "Federal Penal Code",
        "title_en": "Promise of Appointment by Candidate",
        "title_es": "Promesa de Nombramiento por Candidato",
        "description_en": "A candidate promising appointment to public office in exchange for support or votes.",
        "description_es": "Un candidato promete nombramiento a cargo público a cambio de apoyo o votos.",
        "keywords_en": [
            "promise",
            "appointment",
            "candidate",
            "public office",
            "votes"
        ],
        "keywords_es": [
            "promesa",
            "nombramiento",
            "candidato",
            "cargo público",
            "votos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-601",
        "citation": "18 U.S.C. § 601",
        "sort_key": "018.00601.000",
        "category": "Federal Penal Code",
        "title_en": "Deprivation of Employment or Other Benefit for Political Contribution",
        "title_es": "Privación de Empleo u Otro Beneficio por Contribución Política",
        "description_en": "Depriving any person of employment or other benefit for making or refusing to make a political contribution.",
        "description_es": "Privar a cualquier persona de empleo u otro beneficio por hacer o negarse a hacer una contribución política.",
        "keywords_en": [
            "deprivation",
            "employment",
            "political contribution",
            "benefit",
            "coercion"
        ],
        "keywords_es": [
            "privación",
            "empleo",
            "contribución política",
            "beneficio",
            "coerción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-602",
        "citation": "18 U.S.C. § 602",
        "sort_key": "018.00602.000",
        "category": "Federal Penal Code",
        "title_en": "Solicitation of Political Contributions",
        "title_es": "Solicitud de Contribuciones Políticas",
        "description_en": "Soliciting political contributions in federal buildings or from federal employees.",
        "description_es": "Solicitar contribuciones políticas en edificios federales o de empleados federales.",
        "keywords_en": [
            "solicitation",
            "political contributions",
            "federal buildings",
            "federal employees",
            "campaign"
        ],
        "keywords_es": [
            "solicitud",
            "contribuciones políticas",
            "edificios federales",
            "empleados federales",
            "campaña"
        ],
        "verified": true
    },
    {
        "id": "usc-18-603",
        "citation": "18 U.S.C. § 603",
        "sort_key": "018.00603.000",
        "category": "Federal Penal Code",
        "title_en": "Making Political Contributions",
        "title_es": "Hacer Contribuciones Políticas",
        "description_en": "Making political contributions in the name of another person or through coercion.",
        "description_es": "Hacer contribuciones políticas en nombre de otra persona o mediante coerción.",
        "keywords_en": [
            "political contributions",
            "another person",
            "coercion",
            "campaign finance",
            "fraud"
        ],
        "keywords_es": [
            "contribuciones políticas",
            "otra persona",
            "coerción",
            "finanzas de campaña",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-604",
        "citation": "18 U.S.C. § 604",
        "sort_key": "018.00604.000",
        "category": "Federal Penal Code",
        "title_en": "Solicitation from Persons on Relief",
        "title_es": "Solicitud de Personas en Ayuda",
        "description_en": "Soliciting political contributions from persons receiving federal relief or assistance.",
        "description_es": "Solicitar contribuciones políticas de personas que reciben ayuda o asistencia federal.",
        "keywords_en": [
            "solicitation",
            "relief recipients",
            "political contributions",
            "federal assistance",
            "welfare"
        ],
        "keywords_es": [
            "solicitud",
            "recipientes de ayuda",
            "contribuciones políticas",
            "asistencia federal",
            "bienestar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-605",
        "citation": "18 U.S.C. § 605",
        "sort_key": "018.00605.000",
        "category": "Federal Penal Code",
        "title_en": "Disclosure of Names of Persons on Relief",
        "title_es": "Divulgación de Nombres de Personas en Ayuda",
        "description_en": "Disclosing names of persons receiving federal relief for political purposes.",
        "description_es": "Divulgar nombres de personas que reciben ayuda federal para propósitos políticos.",
        "keywords_en": [
            "disclosure",
            "relief recipients",
            "names",
            "political purposes",
            "privacy"
        ],
        "keywords_es": [
            "divulgación",
            "recipientes de ayuda",
            "nombres",
            "propósitos políticos",
            "privacidad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-606",
        "citation": "18 U.S.C. § 606",
        "sort_key": "018.00606.000",
        "category": "Federal Penal Code",
        "title_en": "Intimidation to Secure Political Contributions",
        "title_es": "Intimidación para Asegurar Contribuciones Políticas",
        "description_en": "Intimidating any person to secure a political contribution.",
        "description_es": "Intimidar a cualquier persona para asegurar una contribución política.",
        "keywords_en": [
            "intimidation",
            "political contributions",
            "coercion",
            "threats",
            "campaign"
        ],
        "keywords_es": [
            "intimidación",
            "contribuciones políticas",
            "coerción",
            "amenazas",
            "campaña"
        ],
        "verified": true
    },
    {
        "id": "usc-18-607",
        "citation": "18 U.S.C. § 607",
        "sort_key": "018.00607.000",
        "category": "Federal Penal Code",
        "title_en": "Place of Solicitation",
        "title_es": "Lugar de Solicitud",
        "description_en": "Soliciting political contributions in certain prohibited places or manners.",
        "description_es": "Solicitar contribuciones políticas en ciertos lugares o maneras prohibidas.",
        "keywords_en": [
            "solicitation",
            "place",
            "political contributions",
            "prohibited",
            "locations"
        ],
        "keywords_es": [
            "solicitud",
            "lugar",
            "contribuciones políticas",
            "prohibido",
            "ubicaciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-608",
        "citation": "18 U.S.C. § 608",
        "sort_key": "018.00608.000",
        "category": "Federal Penal Code",
        "title_en": "Absent Uniformed Services Voters",
        "title_es": "Votantes de Servicios Uniformados Ausentes",
        "description_en": "Offenses related to absent voting by uniformed services members.",
        "description_es": "Delitos relacionados con voto ausente por miembros de servicios uniformados.",
        "keywords_en": [
            "absent voters",
            "uniformed services",
            "military voting",
            "absentee ballots",
            "fraud"
        ],
        "keywords_es": [
            "votantes ausentes",
            "servicios uniformados",
            "voto militar",
            "boletas ausentes",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-609",
        "citation": "18 U.S.C. § 609",
        "sort_key": "018.00609.000",
        "category": "Federal Penal Code",
        "title_en": "Voting for Payments",
        "title_es": "Votar por Pagos",
        "description_en": "Paying or receiving payment for voting in federal elections.",
        "description_es": "Pagar o recibir pago por votar en elecciones federales.",
        "keywords_en": [
            "voting",
            "payments",
            "vote buying",
            "federal elections",
            "corruption"
        ],
        "keywords_es": [
            "voto",
            "pagos",
            "compra de votos",
            "elecciones federales",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-610",
        "citation": "18 U.S.C. § 610",
        "sort_key": "018.00610.000",
        "category": "Federal Penal Code",
        "title_en": "Coercion of Political Activity",
        "title_es": "Coerción de Actividad Política",
        "description_en": "Coercing federal employees to engage in political activity.",
        "description_es": "Coaccionar a empleados federales para que participen en actividad política.",
        "keywords_en": [
            "coercion",
            "political activity",
            "federal employees",
            "Hatch Act",
            "pressure"
        ],
        "keywords_es": [
            "coerción",
            "actividad política",
            "empleados federales",
            "Ley Hatch",
            "presión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-611",
        "citation": "18 U.S.C. § 611",
        "sort_key": "018.00611.000",
        "category": "Federal Penal Code",
        "title_en": "Voting by Aliens",
        "title_es": "Voto por Extranjeros",
        "description_en": "Non-citizens voting in federal elections.",
        "description_es": "No ciudadanos votando en elecciones federales.",
        "keywords_en": [
            "aliens",
            "voting",
            "non-citizens",
            "federal elections",
            "illegal voting"
        ],
        "keywords_es": [
            "extranjeros",
            "voto",
            "no ciudadanos",
            "elecciones federales",
            "voto ilegal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-612",
        "citation": "18 U.S.C. § 612",
        "sort_key": "018.00612.000",
        "category": "Federal Penal Code",
        "title_en": "Unauthorized Use of 'Soldier Vote' in Advertisement",
        "title_es": "Uso No Autorizado de 'Voto de Soldado' en Publicidad",
        "description_en": "Unauthorized use of 'soldier vote' or similar terms in political advertisements.",
        "description_es": "Uso no autorizado de 'voto de soldado' o términos similares en publicidad política.",
        "keywords_en": [
            "soldier vote",
            "advertisement",
            "unauthorized use",
            "political advertising",
            "military"
        ],
        "keywords_es": [
            "voto de soldado",
            "publicidad",
            "uso no autorizado",
            "publicidad política",
            "militar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-613",
        "citation": "18 U.S.C. § 613",
        "sort_key": "018.00613.000",
        "category": "Federal Penal Code",
        "title_en": "Voting by Interference with Armed Forces",
        "title_es": "Voto por Interferencia con Fuerzas Armadas",
        "description_en": "Interfering with voting rights of members of the armed forces.",
        "description_es": "Interferir con derechos de voto de miembros de las fuerzas armadas.",
        "keywords_en": [
            "interference",
            "armed forces",
            "voting rights",
            "military",
            "elections"
        ],
        "keywords_es": [
            "interferencia",
            "fuerzas armadas",
            "derechos de voto",
            "militar",
            "elecciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-614",
        "citation": "18 U.S.C. § 614",
        "sort_key": "018.00614.000",
        "category": "Federal Penal Code",
        "title_en": "Voting by Armed Forces Members",
        "title_es": "Voto por Miembros de Fuerzas Armadas",
        "description_en": "Offenses related to voting by members of the armed forces.",
        "description_es": "Delitos relacionados con voto por miembros de las fuerzas armadas.",
        "keywords_en": [
            "armed forces",
            "voting",
            "military members",
            "elections",
            "absentee"
        ],
        "keywords_es": [
            "fuerzas armadas",
            "voto",
            "miembros militares",
            "elecciones",
            "ausente"
        ],
        "verified": true
    },
    {
        "id": "usc-18-615",
        "citation": "18 U.S.C. § 615",
        "sort_key": "018.00615.000",
        "category": "Federal Penal Code",
        "title_en": "Voting by Non-Residents",
        "title_es": "Voto por No Residentes",
        "description_en": "Offenses related to voting by non-residents in federal elections.",
        "description_es": "Delitos relacionados con voto por no residentes en elecciones federales.",
        "keywords_en": [
            "non-residents",
            "voting",
            "federal elections",
            "residency",
            "fraud"
        ],
        "keywords_es": [
            "no residentes",
            "voto",
            "elecciones federales",
            "residencia",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-641",
        "citation": "18 U.S.C. § 641",
        "sort_key": "018.00641.000",
        "category": "Federal Penal Code",
        "title_en": "Public Money, Property or Records (Theft from Government)",
        "title_es": "Dinero, Propiedad o Registros Públicos (Robo al Gobierno)",
        "description_en": "Embezzlement, theft, or conversion of public money, property, or records. Applies to theft from PX, AAFES, commissary, or any federal property including shoplifting from military exchanges.",
        "description_es": "Malversación, robo o conversión de dinero, propiedad o registros públicos. Aplica a robo de PX, AAFES, comisaría, o cualquier propiedad federal incluyendo hurto en tiendas de exchanges militares.",
        "keywords_en": [
            "theft",
            "public property",
            "PX",
            "AAFES",
            "commissary",
            "shoplifting",
            "government property",
            "embezzlement"
        ],
        "keywords_es": [
            "robo",
            "propiedad pública",
            "PX",
            "AAFES",
            "comisaría",
            "hurto",
            "propiedad gubernamental",
            "malversación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-642",
        "citation": "18 U.S.C. § 642",
        "sort_key": "018.00642.000",
        "category": "Federal Penal Code",
        "title_en": "Tools and Materials for Counterfeiting Purposes",
        "title_es": "Herramientas y Materiales para Propósitos de Falsificación",
        "description_en": "Making, possessing, or selling tools and materials for counterfeiting purposes.",
        "description_es": "Hacer, poseer o vender herramientas y materiales para propósitos de falsificación.",
        "keywords_en": [
            "tools",
            "materials",
            "counterfeiting",
            "making",
            "possessing"
        ],
        "keywords_es": [
            "herramientas",
            "materiales",
            "falsificación",
            "fabricar",
            "poseer"
        ],
        "verified": true
    },
    {
        "id": "usc-18-643",
        "citation": "18 U.S.C. § 643",
        "sort_key": "018.00643.000",
        "category": "Federal Penal Code",
        "title_en": "Accounting Officers Failing to Render Accounts",
        "title_es": "Oficiales de Contabilidad que No Rinden Cuentas",
        "description_en": "Accounting officers failing to render accounts as required by law.",
        "description_es": "Oficiales de contabilidad que no rinden cuentas según lo requerido por ley.",
        "keywords_en": [
            "accounting officers",
            "failing to render accounts",
            "financial",
            "records",
            "compliance"
        ],
        "keywords_es": [
            "oficiales de contabilidad",
            "no rendir cuentas",
            "financiero",
            "registros",
            "cumplimiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-644",
        "citation": "18 U.S.C. § 644",
        "sort_key": "018.00644.000",
        "category": "Federal Penal Code",
        "title_en": "Banker Receiving Unauthorized Deposit of Public Money",
        "title_es": "Banquero Recibiendo Depósito No Autorizado de Dinero Público",
        "description_en": "A banker receiving an unauthorized deposit of public money.",
        "description_es": "Un banquero recibiendo un depósito no autorizado de dinero público.",
        "keywords_en": [
            "banker",
            "unauthorized deposit",
            "public money",
            "financial institution",
            "violation"
        ],
        "keywords_es": [
            "banquero",
            "depósito no autorizado",
            "dinero público",
            "institución financiera",
            "violación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-645",
        "citation": "18 U.S.C. § 645",
        "sort_key": "018.00645.000",
        "category": "Federal Penal Code",
        "title_en": "Court Officers Failing to Deposit Registry Moneys",
        "title_es": "Oficiales de Corte que No Depositan Dinero de Registro",
        "description_en": "Court officers failing to deposit registry moneys as required by law.",
        "description_es": "Oficiales de corte que no depositan dinero de registro según lo requerido por ley.",
        "keywords_en": [
            "court officers",
            "failing to deposit",
            "registry moneys",
            "financial",
            "compliance"
        ],
        "keywords_es": [
            "oficiales de corte",
            "no depositar",
            "dinero de registro",
            "financiero",
            "cumplimiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-646",
        "citation": "18 U.S.C. § 646",
        "sort_key": "018.00646.000",
        "category": "Federal Penal Code",
        "title_en": "Disbursing Officer Failing to Render Accounts",
        "title_es": "Oficial Pagador que No Rinde Cuentas",
        "description_en": "Disbursing officers failing to render accounts as required by law.",
        "description_es": "Oficiales pagadores que no rinden cuentas según lo requerido por ley.",
        "keywords_en": [
            "disbursing officer",
            "failing to render accounts",
            "financial",
            "records",
            "compliance"
        ],
        "keywords_es": [
            "oficial pagador",
            "no rendir cuentas",
            "financiero",
            "registros",
            "cumplimiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-647",
        "citation": "18 U.S.C. § 647",
        "sort_key": "018.00647.000",
        "category": "Federal Penal Code",
        "title_en": "Receiving Loan from Court Officer",
        "title_es": "Recibir Préstamo de Oficial de Corte",
        "description_en": "Receiving a loan from a court officer in violation of law.",
        "description_es": "Recibir un préstamo de un oficial de corte en violación de la ley.",
        "keywords_en": [
            "receiving loan",
            "court officer",
            "violation",
            "financial",
            "ethics"
        ],
        "keywords_es": [
            "recibir préstamo",
            "oficial de corte",
            "violación",
            "financiero",
            "ética"
        ],
        "verified": true
    },
    {
        "id": "usc-18-648",
        "citation": "18 U.S.C. § 648",
        "sort_key": "018.00648.000",
        "category": "Federal Penal Code",
        "title_en": "Custodians Failing to Deposit Moneys; Persons Affected",
        "title_es": "Custodios que No Depositan Dinero; Personas Afectadas",
        "description_en": "Custodians failing to deposit moneys as required by law.",
        "description_es": "Custodios que no depositan dinero según lo requerido por ley.",
        "keywords_en": [
            "custodians",
            "failing to deposit",
            "moneys",
            "financial",
            "compliance"
        ],
        "keywords_es": [
            "custodios",
            "no depositar",
            "dinero",
            "financiero",
            "cumplimiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-649",
        "citation": "18 U.S.C. § 649",
        "sort_key": "018.00649.000",
        "category": "Federal Penal Code",
        "title_en": "Custodians Failing to Deposit Moneys; General Rule",
        "title_es": "Custodios que No Depositan Dinero; Regla General",
        "description_en": "General rule regarding custodians failing to deposit moneys.",
        "description_es": "Regla general respecto a custodios que no depositan dinero.",
        "keywords_en": [
            "custodians",
            "failing to deposit",
            "moneys",
            "general rule",
            "financial"
        ],
        "keywords_es": [
            "custodios",
            "no depositar",
            "dinero",
            "regla general",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-650",
        "citation": "18 U.S.C. § 650",
        "sort_key": "018.00650.000",
        "category": "Federal Penal Code",
        "title_en": "Depositaries Failing to Safeguard Deposits",
        "title_es": "Depositarios que No Protegen Depósitos",
        "description_en": "Depositaries failing to safeguard deposits as required by law.",
        "description_es": "Depositarios que no protegen depósitos según lo requerido por ley.",
        "keywords_en": [
            "depositaries",
            "failing to safeguard",
            "deposits",
            "financial",
            "security"
        ],
        "keywords_es": [
            "depositarios",
            "no proteger",
            "depósitos",
            "financiero",
            "seguridad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-651",
        "citation": "18 U.S.C. § 651",
        "sort_key": "018.00651.000",
        "category": "Federal Penal Code",
        "title_en": "Disbursing Officer Failing to Report",
        "title_es": "Oficial Pagador que No Reporta",
        "description_en": "Disbursing officers failing to report as required by law.",
        "description_es": "Oficiales pagadores que no reportan según lo requerido por ley.",
        "keywords_en": [
            "disbursing officer",
            "failing to report",
            "financial",
            "records",
            "compliance"
        ],
        "keywords_es": [
            "oficial pagador",
            "no reportar",
            "financiero",
            "registros",
            "cumplimiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-652",
        "citation": "18 U.S.C. § 652",
        "sort_key": "018.00652.000",
        "category": "Federal Penal Code",
        "title_en": "Disbursing Officer Making False Certificate",
        "title_es": "Oficial Pagador Haciendo Certificado Falso",
        "description_en": "Disbursing officers making false certificates with intent to defraud.",
        "description_es": "Oficiales pagadores haciendo certificados falsos con intención de defraudar.",
        "keywords_en": [
            "disbursing officer",
            "false certificate",
            "intent to defraud",
            "financial",
            "fraud"
        ],
        "keywords_es": [
            "oficial pagador",
            "certificado falso",
            "intención de defraudar",
            "financiero",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-653",
        "citation": "18 U.S.C. § 653",
        "sort_key": "018.00653.000",
        "category": "Federal Penal Code",
        "title_en": "Disbursing Officer in Armed Forces",
        "title_es": "Oficial Pagador en Fuerzas Armadas",
        "description_en": "Offenses by disbursing officers in the armed forces.",
        "description_es": "Delitos por oficiales pagadores en las fuerzas armadas.",
        "keywords_en": [
            "disbursing officer",
            "armed forces",
            "military",
            "financial",
            "offenses"
        ],
        "keywords_es": [
            "oficial pagador",
            "fuerzas armadas",
            "militar",
            "financiero",
            "delitos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-654",
        "citation": "18 U.S.C. § 654",
        "sort_key": "018.00654.000",
        "category": "Federal Penal Code",
        "title_en": "Officer or Employee of United States Converting Property of Another",
        "title_es": "Oficial o Empleado de Estados Unidos Convirtiendo Propiedad de Otro",
        "description_en": "Officers or employees of the United States converting property of another for their own use.",
        "description_es": "Oficiales o empleados de Estados Unidos convirtiendo propiedad de otro para su propio uso.",
        "keywords_en": [
            "officer",
            "employee",
            "converting property",
            "theft",
            "embezzlement"
        ],
        "keywords_es": [
            "oficial",
            "empleado",
            "convertir propiedad",
            "robo",
            "malversación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-655",
        "citation": "18 U.S.C. § 655",
        "sort_key": "018.00655.000",
        "category": "Federal Penal Code",
        "title_en": "Theft by Bank Examiner or Employee",
        "title_es": "Robo por Examinador o Empleado de Banco",
        "description_en": "Theft by a bank examiner or employee of funds entrusted to the bank.",
        "description_es": "Robo por un examinador o empleado de banco de fondos confiados al banco.",
        "keywords_en": [
            "theft",
            "bank examiner",
            "bank employee",
            "funds",
            "financial institution"
        ],
        "keywords_es": [
            "robo",
            "examinador de banco",
            "empleado de banco",
            "fondos",
            "institución financiera"
        ],
        "verified": true
    },
    {
        "id": "usc-18-656",
        "citation": "18 U.S.C. § 656",
        "sort_key": "018.00656.000",
        "category": "Federal Penal Code",
        "title_en": "Theft, Embezzlement, or Misapplication by Bank Officer or Employee",
        "title_es": "Robo, Malversación o Mal Aplicación por Oficial o Empleado de Banco",
        "description_en": "Theft, embezzlement, or misapplication of funds by a bank officer or employee.",
        "description_es": "Robo, malversación o mal aplicación de fondos por un oficial o empleado de banco.",
        "keywords_en": [
            "theft",
            "embezzlement",
            "misapplication",
            "bank officer",
            "bank employee"
        ],
        "keywords_es": [
            "robo",
            "malversación",
            "mal aplicación",
            "oficial de banco",
            "empleado de banco"
        ],
        "verified": true
    },
    {
        "id": "usc-18-657",
        "citation": "18 U.S.C. § 657",
        "sort_key": "018.00657.000",
        "category": "Federal Penal Code",
        "title_en": "Lending, Credit and Insurance Institutions",
        "title_es": "Instituciones de Préstamo, Crédito y Seguros",
        "description_en": "Offenses related to lending, credit, and insurance institutions.",
        "description_es": "Delitos relacionados con instituciones de préstamo, crédito y seguros.",
        "keywords_en": [
            "lending",
            "credit",
            "insurance",
            "financial institutions",
            "offenses"
        ],
        "keywords_es": [
            "préstamo",
            "crédito",
            "seguros",
            "instituciones financieras",
            "delitos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-658",
        "citation": "18 U.S.C. § 658",
        "sort_key": "018.00658.000",
        "category": "Federal Penal Code",
        "title_en": "Property Mortgaged or Pledged to Farm Credit Agencies",
        "title_es": "Propiedad Hipotecada o Pignorada a Agencias de Crédito Agrícola",
        "description_en": "Offenses related to property mortgaged or pledged to farm credit agencies.",
        "description_es": "Delitos relacionados con propiedad hipotecada o pignorada a agencias de crédito agrícola.",
        "keywords_en": [
            "property",
            "mortgaged",
            "pledged",
            "farm credit",
            "agricultural"
        ],
        "keywords_es": [
            "propiedad",
            "hipotecada",
            "pignorada",
            "crédito agrícola",
            "agrícola"
        ],
        "verified": true
    },
    {
        "id": "usc-18-659",
        "citation": "18 U.S.C. § 659",
        "sort_key": "018.00659.000",
        "category": "Federal Penal Code",
        "title_en": "Interstate or Foreign Shipments by Carrier",
        "title_es": "Envíos Interestatales o Extranjeros por Transportista",
        "description_en": "Theft from interstate or foreign shipments by carriers.",
        "description_es": "Robo de envíos interestatales o extranjeros por transportistas.",
        "keywords_en": [
            "interstate shipments",
            "foreign shipments",
            "carrier",
            "theft",
            "transportation"
        ],
        "keywords_es": [
            "envíos interestatales",
            "envíos extranjeros",
            "transportista",
            "robo",
            "transporte"
        ],
        "verified": true
    },
    {
        "id": "usc-18-660",
        "citation": "18 U.S.C. § 660",
        "sort_key": "018.00660.000",
        "category": "Federal Penal Code",
        "title_en": "Captain or Officer of Vessel Without Certificate",
        "title_es": "Capitán u Oficial de Embarcación Sin Certificado",
        "description_en": "Serving as captain or officer of a vessel without proper certification.",
        "description_es": "Servir como capitán u oficial de una embarcación sin certificación adecuada.",
        "keywords_en": [
            "captain",
            "officer",
            "vessel",
            "certificate",
            "maritime"
        ],
        "keywords_es": [
            "capitán",
            "oficial",
            "embarcación",
            "certificado",
            "marítimo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-661",
        "citation": "18 U.S.C. § 661",
        "sort_key": "018.00661.000",
        "category": "Federal Penal Code",
        "title_en": "Embezzlement by Employees of Gaming Establishments on Vessels",
        "title_es": "Malversación por Empleados de Establecimientos de Juego en Embarcaciones",
        "description_en": "Embezzlement by employees of gaming establishments on vessels within federal jurisdiction.",
        "description_es": "Malversación por empleados de establecimientos de juego en embarcaciones dentro de la jurisdicción federal.",
        "keywords_en": [
            "embezzlement",
            "gaming establishments",
            "vessels",
            "employees",
            "gambling"
        ],
        "keywords_es": [
            "malversación",
            "establecimientos de juego",
            "embarcaciones",
            "empleados",
            "juegos de azar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-662",
        "citation": "18 U.S.C. § 662",
        "sort_key": "018.00662.000",
        "category": "Federal Penal Code",
        "title_en": "Receiving Stolen Property Within Special Maritime and Territorial Jurisdiction",
        "title_es": "Recibir Propiedad Robada Dentro de Jurisdicción Marítima y Territorial Especial",
        "description_en": "Receiving stolen property within special maritime and territorial jurisdiction of the United States.",
        "description_es": "Recibir propiedad robada dentro de la jurisdicción marítima y territorial especial de Estados Unidos.",
        "keywords_en": [
            "receiving stolen property",
            "maritime jurisdiction",
            "territorial jurisdiction",
            "theft",
            "fencing"
        ],
        "keywords_es": [
            "recibir propiedad robada",
            "jurisdicción marítima",
            "jurisdicción territorial",
            "robo",
            "receptación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-663",
        "citation": "18 U.S.C. § 663",
        "sort_key": "018.00663.000",
        "category": "Federal Penal Code",
        "title_en": "Solicitation or Use of Gifts",
        "title_es": "Solicitud o Uso de Regalos",
        "description_en": "Soliciting or using gifts to influence official actions.",
        "description_es": "Solicitar o usar regalos para influir en acciones oficiales.",
        "keywords_en": [
            "solicitation",
            "gifts",
            "influence",
            "official actions",
            "corruption"
        ],
        "keywords_es": [
            "solicitud",
            "regalos",
            "influir",
            "acciones oficiales",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-664",
        "citation": "18 U.S.C. § 664",
        "sort_key": "018.00664.000",
        "category": "Federal Penal Code",
        "title_en": "Theft or Embezzlement from Employee Benefit Plan",
        "title_es": "Robo o Malversación de Plan de Beneficios para Empleados",
        "description_en": "Theft or embezzlement from an employee benefit plan.",
        "description_es": "Robo o malversación de un plan de beneficios para empleados.",
        "keywords_en": [
            "theft",
            "embezzlement",
            "employee benefit plan",
            "pension",
            "retirement"
        ],
        "keywords_es": [
            "robo",
            "malversación",
            "plan de beneficios",
            "pensión",
            "jubilación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-665",
        "citation": "18 U.S.C. § 665",
        "sort_key": "018.00665.000",
        "category": "Federal Penal Code",
        "title_en": "Theft or Embezzlement from Employment and Training Funds",
        "title_es": "Robo o Malversación de Fondos de Empleo y Capacitación",
        "description_en": "Theft or embezzlement from employment and training funds.",
        "description_es": "Robo o malversación de fondos de empleo y capacitación.",
        "keywords_en": [
            "theft",
            "embezzlement",
            "employment funds",
            "training funds",
            "workforce"
        ],
        "keywords_es": [
            "robo",
            "malversación",
            "fondos de empleo",
            "fondos de capacitación",
            "fuerza laboral"
        ],
        "verified": true
    },
    {
        "id": "usc-18-666",
        "citation": "18 U.S.C. § 666",
        "sort_key": "018.00666.000",
        "category": "Federal Penal Code",
        "title_en": "Theft or Bribery Concerning Programs Receiving Federal Funds",
        "title_es": "Robo o Soborno Relacionado con Programas que Reciben Fondos Federales",
        "description_en": "Theft or bribery concerning programs receiving federal funds.",
        "description_es": "Robo o soborno relacionado con programas que reciben fondos federales.",
        "keywords_en": [
            "theft",
            "bribery",
            "federal funds",
            "programs",
            "corruption"
        ],
        "keywords_es": [
            "robo",
            "soborno",
            "fondos federales",
            "programas",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-667",
        "citation": "18 U.S.C. § 667",
        "sort_key": "018.00667.000",
        "category": "Federal Penal Code",
        "title_en": "Theft of Livestock",
        "title_es": "Robo de Ganado",
        "description_en": "Theft of livestock within special maritime and territorial jurisdiction.",
        "description_es": "Robo de ganado dentro de la jurisdicción marítima y territorial especial.",
        "keywords_en": [
            "theft",
            "livestock",
            "cattle",
            "animals",
            "agricultural"
        ],
        "keywords_es": [
            "robo",
            "ganado",
            "vacas",
            "animales",
            "agrícola"
        ],
        "verified": true
    },
    {
        "id": "usc-18-668",
        "citation": "18 U.S.C. § 668",
        "sort_key": "018.00668.000",
        "category": "Federal Penal Code",
        "title_en": "Theft of Major Artwork",
        "title_es": "Robo de Obras de Arte Mayores",
        "description_en": "Theft of major artwork from museums, galleries, or other institutions.",
        "description_es": "Robo de obras de arte mayores de museos, galerías u otras instituciones.",
        "keywords_en": [
            "theft",
            "artwork",
            "museums",
            "galleries",
            "cultural property"
        ],
        "keywords_es": [
            "robo",
            "obras de arte",
            "museos",
            "galerías",
            "propiedad cultural"
        ],
        "verified": true
    },
    {
        "id": "usc-18-669",
        "citation": "18 U.S.C. § 669",
        "sort_key": "018.00669.000",
        "category": "Federal Penal Code",
        "title_en": "Theft or Embezzlement in Connection with Health Care",
        "title_es": "Robo o Malversación en Conexión con Atención Médica",
        "description_en": "Theft or embezzlement in connection with health care programs or services.",
        "description_es": "Robo o malversación en conexión con programas o servicios de atención médica.",
        "keywords_en": [
            "theft",
            "embezzlement",
            "health care",
            "medicare",
            "medicaid"
        ],
        "keywords_es": [
            "robo",
            "malversación",
            "atención médica",
            "medicare",
            "medicaid"
        ],
        "verified": true
    },
    {
        "id": "usc-18-670",
        "citation": "18 U.S.C. § 670",
        "sort_key": "018.00670.000",
        "category": "Federal Penal Code",
        "title_en": "Theft of Medical Products",
        "title_es": "Robo de Productos Médicos",
        "description_en": "Theft of medical products, including drugs, vaccines, and medical devices.",
        "description_es": "Robo de productos médicos, incluyendo medicamentos, vacunas y dispositivos médicos.",
        "keywords_en": [
            "theft",
            "medical products",
            "drugs",
            "vaccines",
            "medical devices"
        ],
        "keywords_es": [
            "robo",
            "productos médicos",
            "medicamentos",
            "vacunas",
            "dispositivos médicos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-671",
        "citation": "18 U.S.C. § 671",
        "sort_key": "018.00671.000",
        "category": "Federal Penal Code",
        "title_en": "Theft of Trade Secrets",
        "title_es": "Robo de Secretos Comerciales",
        "description_en": "Theft of trade secrets for the benefit of a foreign government, instrumentality, or agent.",
        "description_es": "Robo de secretos comerciales para beneficio de un gobierno extranjero, instrumento o agente.",
        "keywords_en": [
            "theft",
            "trade secrets",
            "espionage",
            "foreign government",
            "intellectual property"
        ],
        "keywords_es": [
            "robo",
            "secretos comerciales",
            "espionaje",
            "gobierno extranjero",
            "propiedad intelectual"
        ],
        "verified": true
    },
    {
        "id": "usc-18-672",
        "citation": "18 U.S.C. § 672",
        "sort_key": "018.00672.000",
        "category": "Federal Penal Code",
        "title_en": "Theft of Trade Secrets for Economic Benefit",
        "title_es": "Robo de Secretos Comerciales para Beneficio Económico",
        "description_en": "Theft of trade secrets for economic benefit of anyone other than the owner.",
        "description_es": "Robo de secretos comerciales para beneficio económico de cualquier persona que no sea el propietario.",
        "keywords_en": [
            "theft",
            "trade secrets",
            "economic benefit",
            "commercial",
            "intellectual property"
        ],
        "keywords_es": [
            "robo",
            "secretos comerciales",
            "beneficio económico",
            "comercial",
            "propiedad intelectual"
        ],
        "verified": true
    },
    {
        "id": "usc-18-751",
        "citation": "18 U.S.C. § 751",
        "sort_key": "018.00751.000",
        "category": "Federal Penal Code",
        "title_en": "Prisoners in Custody of Institution or Officer",
        "title_es": "Prisioneros en Custodia de Institución u Oficial",
        "description_en": "Escape from custody of any federal institution or officer.",
        "description_es": "Escape de custodia de cualquier institución u oficial federal.",
        "keywords_en": [
            "escape",
            "prisoners",
            "custody",
            "federal institution",
            "federal officer"
        ],
        "keywords_es": [
            "escape",
            "prisioneros",
            "custodia",
            "institución federal",
            "oficial federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-752",
        "citation": "18 U.S.C. § 752",
        "sort_key": "018.00752.000",
        "category": "Federal Penal Code",
        "title_en": "Instigating or Assisting Escape",
        "title_es": "Instigar o Asistir Escape",
        "description_en": "Instigating, assisting, or attempting to assist any prisoner to escape from custody.",
        "description_es": "Instigar, asistir o intentar asistir a cualquier prisionero a escapar de custodia.",
        "keywords_en": [
            "instigating",
            "assisting",
            "escape",
            "prisoners",
            "custody"
        ],
        "keywords_es": [
            "instigar",
            "asistir",
            "escape",
            "prisioneros",
            "custodia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-753",
        "citation": "18 U.S.C. § 753",
        "sort_key": "018.00753.000",
        "category": "Federal Penal Code",
        "title_en": "Rescue of Prisoner",
        "title_es": "Rescate de Prisionero",
        "description_en": "Rescuing or attempting to rescue any prisoner from custody.",
        "description_es": "Rescatar o intentar rescatar a cualquier prisionero de custodia.",
        "keywords_en": [
            "rescue",
            "prisoner",
            "custody",
            "escape",
            "assistance"
        ],
        "keywords_es": [
            "rescate",
            "prisionero",
            "custodia",
            "escape",
            "asistencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-754",
        "citation": "18 U.S.C. § 754",
        "sort_key": "018.00754.000",
        "category": "Federal Penal Code",
        "title_en": "Fleeing or Attempting to Flee from Officer",
        "title_es": "Huir o Intentar Huir de Oficial",
        "description_en": "Fleeing or attempting to flee from a federal officer while in custody.",
        "description_es": "Huir o intentar huir de un oficial federal mientras está en custodia.",
        "keywords_en": [
            "fleeing",
            "attempting to flee",
            "federal officer",
            "custody",
            "escape"
        ],
        "keywords_es": [
            "huir",
            "intentar huir",
            "oficial federal",
            "custodia",
            "escape"
        ],
        "verified": true
    },
    {
        "id": "usc-18-755",
        "citation": "18 U.S.C. § 755",
        "sort_key": "018.00755.000",
        "category": "Federal Penal Code",
        "title_en": "Officer Permitting Escape",
        "title_es": "Oficial Permitindo Escape",
        "description_en": "A federal officer knowingly permitting a prisoner to escape from custody.",
        "description_es": "Un oficial federal permitiendo a sabiendas que un prisionero escape de custodia.",
        "keywords_en": [
            "officer",
            "permitting escape",
            "prisoner",
            "custody",
            "negligence"
        ],
        "keywords_es": [
            "oficial",
            "permitir escape",
            "prisionero",
            "custodia",
            "negligencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-756",
        "citation": "18 U.S.C. § 756",
        "sort_key": "018.00756.000",
        "category": "Federal Penal Code",
        "title_en": "Escape of Federal Prisoners",
        "title_es": "Escape de Prisioneros Federales",
        "description_en": "Escape of federal prisoners from custody.",
        "description_es": "Escape de prisioneros federales de custodia.",
        "keywords_en": [
            "escape",
            "federal prisoners",
            "custody",
            "prison",
            "jail"
        ],
        "keywords_es": [
            "escape",
            "prisioneros federales",
            "custodia",
            "prisión",
            "cárcel"
        ],
        "verified": true
    },
    {
        "id": "usc-18-757",
        "citation": "18 U.S.C. § 757",
        "sort_key": "018.00757.000",
        "category": "Federal Penal Code",
        "title_en": "Prisoners of War or Enemy Aliens",
        "title_es": "Prisioneros de Guerra o Extranjeros Enemigos",
        "description_en": "Offenses related to prisoners of war or enemy aliens.",
        "description_es": "Delitos relacionados con prisioneros de guerra o extranjeros enemigos.",
        "keywords_en": [
            "prisoners of war",
            "enemy aliens",
            "war",
            "military",
            "custody"
        ],
        "keywords_es": [
            "prisioneros de guerra",
            "extranjeros enemigos",
            "guerra",
            "militar",
            "custodia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-758",
        "citation": "18 U.S.C. § 758",
        "sort_key": "018.00758.000",
        "category": "Federal Penal Code",
        "title_en": "High Speed Flight from Immigration Checkpoint",
        "title_es": "Huida a Alta Velocidad de Punto de Control de Inmigración",
        "description_en": "High speed flight from an immigration checkpoint with willful or wanton disregard for safety.",
        "description_es": "Huida a alta velocidad de un punto de control de inmigración con desprecio deliberado o imprudente por la seguridad.",
        "keywords_en": [
            "high speed flight",
            "immigration checkpoint",
            "fleeing",
            "disregard for safety",
            "border"
        ],
        "keywords_es": [
            "huida a alta velocidad",
            "punto de control de inmigración",
            "huir",
            "desprecio por seguridad",
            "frontera"
        ],
        "verified": true
    },
    {
        "id": "usc-18-759",
        "citation": "18 U.S.C. § 759",
        "sort_key": "018.00759.000",
        "category": "Federal Penal Code",
        "title_en": "Interference with International Boundary Markers",
        "title_es": "Interferencia con Marcadores de Límites Internacionales",
        "description_en": "Interfering with international boundary markers or monuments.",
        "description_es": "Interferir con marcadores o monumentos de límites internacionales.",
        "keywords_en": [
            "interference",
            "boundary markers",
            "international boundary",
            "border",
            "monuments"
        ],
        "keywords_es": [
            "interferencia",
            "marcadores de límite",
            "límite internacional",
            "frontera",
            "monumentos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-793",
        "citation": "18 U.S.C. § 793",
        "sort_key": "018.00793.000",
        "category": "Federal Penal Code",
        "title_en": "Gathering, Transmitting or Losing Defense Information",
        "title_es": "Recopilar, Transmitir o Perder Información de Defensa",
        "description_en": "Gathering, transmitting, or losing defense information with intent or reason to believe it could be used to the injury of the United States.",
        "description_es": "Recopilar, transmitir o perder información de defensa con intención o razón para creer que podría usarse para perjudicar a Estados Unidos.",
        "keywords_en": [
            "defense information",
            "espionage",
            "transmitting",
            "national security",
            "classified"
        ],
        "keywords_es": [
            "información de defensa",
            "espionaje",
            "transmitir",
            "seguridad nacional",
            "clasificado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-794",
        "citation": "18 U.S.C. § 794",
        "sort_key": "018.00794.000",
        "category": "Federal Penal Code",
        "title_en": "Gathering or Delivering Defense Information to Aid Foreign Government",
        "title_es": "Recopilar o Entregar Información de Defensa para Ayudar Gobierno Extranjero",
        "description_en": "Gathering or delivering defense information to aid a foreign government.",
        "description_es": "Recopilar o entregar información de defensa para ayudar a un gobierno extranjero.",
        "keywords_en": [
            "defense information",
            "foreign government",
            "espionage",
            "treason",
            "national security"
        ],
        "keywords_es": [
            "información de defensa",
            "gobierno extranjero",
            "espionaje",
            "traición",
            "seguridad nacional"
        ],
        "verified": true
    },
    {
        "id": "usc-18-795",
        "citation": "18 U.S.C. § 795",
        "sort_key": "018.00795.000",
        "category": "Federal Penal Code",
        "title_en": "Photographing and Sketching Defense Installations",
        "title_es": "Fotografiar y Dibujar Instalaciones de Defensa",
        "description_en": "Photographing, sketching, or mapping defense installations without authorization.",
        "description_es": "Fotografiar, dibujar o mapear instalaciones de defensa sin autorización.",
        "keywords_en": [
            "photographing",
            "sketching",
            "defense installations",
            "unauthorized",
            "military"
        ],
        "keywords_es": [
            "fotografiar",
            "dibujar",
            "instalaciones de defensa",
            "no autorizado",
            "militar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-796",
        "citation": "18 U.S.C. § 796",
        "sort_key": "018.00796.000",
        "category": "Federal Penal Code",
        "title_en": "Use of Aircraft for Photographing Defense Installations",
        "title_es": "Uso de Aeronaves para Fotografiar Instalaciones de Defensa",
        "description_en": "Using aircraft for photographing defense installations without authorization.",
        "description_es": "Usar aeronaves para fotografiar instalaciones de defensa sin autorización.",
        "keywords_en": [
            "aircraft",
            "photographing",
            "defense installations",
            "unauthorized",
            "surveillance"
        ],
        "keywords_es": [
            "aeronaves",
            "fotografiar",
            "instalaciones de defensa",
            "no autorizado",
            "vigilancia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-797",
        "citation": "18 U.S.C. § 797",
        "sort_key": "018.00797.000",
        "category": "Federal Penal Code",
        "title_en": "Publication and Sale of Photographs of Defense Installations",
        "title_es": "Publicación y Venta de Fotografías de Instalaciones de Defensa",
        "description_en": "Publishing or selling photographs of defense installations without authorization.",
        "description_es": "Publicar o vender fotografías de instalaciones de defensa sin autorización.",
        "keywords_en": [
            "publication",
            "sale",
            "photographs",
            "defense installations",
            "unauthorized"
        ],
        "keywords_es": [
            "publicación",
            "venta",
            "fotografías",
            "instalaciones de defensa",
            "no autorizado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-798",
        "citation": "18 U.S.C. § 798",
        "sort_key": "018.00798.000",
        "category": "Federal Penal Code",
        "title_en": "Disclosure of Classified Information",
        "title_es": "Divulgación de Información Clasificada",
        "description_en": "Disclosing classified information concerning communication intelligence activities.",
        "description_es": "Divulgar información clasificada concerniente a actividades de inteligencia de comunicaciones.",
        "keywords_en": [
            "classified information",
            "disclosure",
            "communication intelligence",
            "national security",
            "leaks"
        ],
        "keywords_es": [
            "información clasificada",
            "divulgación",
            "inteligencia de comunicaciones",
            "seguridad nacional",
            "filtraciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-799",
        "citation": "18 U.S.C. § 799",
        "sort_key": "018.00799.000",
        "category": "Federal Penal Code",
        "title_en": "Violation of Regulations of National Aeronautics and Space Administration",
        "title_es": "Violación de Regulaciones de la Administración Nacional de Aeronáutica y del Espacio",
        "description_en": "Violation of regulations of the National Aeronautics and Space Administration (NASA).",
        "description_es": "Violación de regulaciones de la Administración Nacional de Aeronáutica y del Espacio (NASA).",
        "keywords_en": [
            "NASA",
            "violation",
            "regulations",
            "space",
            "aeronautics"
        ],
        "keywords_es": [
            "NASA",
            "violación",
            "regulaciones",
            "espacio",
            "aeronáutica"
        ],
        "verified": true
    },
    {
        "id": "usc-18-831",
        "citation": "18 U.S.C. § 831",
        "sort_key": "018.00831.000",
        "category": "Federal Penal Code",
        "title_en": "Explosives and Other Dangerous Articles on Vessels",
        "title_es": "Explosivos y Otros Artículos Peligrosos en Embarcaciones",
        "description_en": "Transporting explosives or other dangerous articles on vessels without proper authorization.",
        "description_es": "Transportar explosivos u otros artículos peligrosos en embarcaciones sin autorización adecuada.",
        "keywords_en": [
            "explosives",
            "dangerous articles",
            "vessels",
            "maritime",
            "hazmat"
        ],
        "keywords_es": [
            "explosivos",
            "artículos peligrosos",
            "embarcaciones",
            "marítimo",
            "materiales peligrosos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-832",
        "citation": "18 U.S.C. § 832",
        "sort_key": "018.00832.000",
        "category": "Federal Penal Code",
        "title_en": "Participation in Nuclear and Weapons of Mass Destruction Threats to the United States",
        "title_es": "Participación en Amenazas Nucleares y de Armas de Destrucción Masiva a Estados Unidos",
        "description_en": "Participating in threats involving nuclear weapons or weapons of mass destruction against the United States.",
        "description_es": "Participar en amenazas que involucran armas nucleares o armas de destrucción masiva contra Estados Unidos.",
        "keywords_en": [
            "nuclear weapons",
            "weapons of mass destruction",
            "WMD",
            "terrorism",
            "threats"
        ],
        "keywords_es": [
            "armas nucleares",
            "armas de destrucción masiva",
            "ADM",
            "terrorismo",
            "amenazas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-833",
        "citation": "18 U.S.C. § 833",
        "sort_key": "018.00833.000",
        "category": "Federal Penal Code",
        "title_en": "Registration of Whoever Harbors or Conceals Any Person",
        "title_es": "Registro de Quien Alberga u Oculta a Cualquier Persona",
        "description_en": "Registration requirements for persons who harbor or conceal others.",
        "description_es": "Requisitos de registro para personas que albergan u ocultan a otros.",
        "keywords_en": [
            "registration",
            "harboring",
            "concealing",
            "persons",
            "compliance"
        ],
        "keywords_es": [
            "registro",
            "albergar",
            "ocultar",
            "personas",
            "cumplimiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-842",
        "citation": "18 U.S.C. § 842",
        "sort_key": "018.00842.000",
        "category": "Federal Penal Code",
        "title_en": "Unlawful Acts Related to Explosives",
        "title_es": "Actos Ilegales Relacionados con Explosivos",
        "description_en": "Unlawful acts related to explosives, including manufacture, distribution, and storage.",
        "description_es": "Actos ilegales relacionados con explosivos, incluyendo fabricación, distribución y almacenamiento.",
        "keywords_en": [
            "explosives",
            "unlawful acts",
            "manufacture",
            "distribution",
            "storage"
        ],
        "keywords_es": [
            "explosivos",
            "actos ilegales",
            "fabricación",
            "distribución",
            "almacenamiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-843",
        "citation": "18 U.S.C. § 843",
        "sort_key": "018.00843.000",
        "category": "Federal Penal Code",
        "title_en": "Licenses and User Permits for Explosives",
        "title_es": "Licencias y Permisos de Usuario para Explosivos",
        "description_en": "Requirements for licenses and user permits for explosives.",
        "description_es": "Requisitos para licencias y permisos de usuario para explosivos.",
        "keywords_en": [
            "licenses",
            "permits",
            "explosives",
            "regulation",
            "ATF"
        ],
        "keywords_es": [
            "licencias",
            "permisos",
            "explosivos",
            "regulación",
            "ATF"
        ],
        "verified": true
    },
    {
        "id": "usc-18-844",
        "citation": "18 U.S.C. § 844",
        "sort_key": "018.00844.000",
        "category": "Federal Penal Code",
        "title_en": "Penalties for Explosives Violations",
        "title_es": "Penalidades por Violaciones de Explosivos",
        "description_en": "Penalties for violations related to explosives.",
        "description_es": "Penalidades por violaciones relacionadas con explosivos.",
        "keywords_en": [
            "penalties",
            "explosives",
            "violations",
            "punishment",
            "ATF"
        ],
        "keywords_es": [
            "penalidades",
            "explosivos",
            "violaciones",
            "castigo",
            "ATF"
        ],
        "verified": true
    },
    {
        "id": "usc-18-845",
        "citation": "18 U.S.C. § 845",
        "sort_key": "018.00845.000",
        "category": "Federal Penal Code",
        "title_en": "Exceptions; Reliefs from Disabilities for Explosives",
        "title_es": "Excepciones; Alivios de Discapacidades para Explosivos",
        "description_en": "Exceptions and reliefs from disabilities for explosives regulations.",
        "description_es": "Excepciones y alivios de discapacidades para regulaciones de explosivos.",
        "keywords_en": [
            "exceptions",
            "reliefs",
            "disabilities",
            "explosives",
            "regulation"
        ],
        "keywords_es": [
            "excepciones",
            "alivios",
            "discapacidades",
            "explosivos",
            "regulación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-846",
        "citation": "18 U.S.C. § 846",
        "sort_key": "018.00846.000",
        "category": "Federal Penal Code",
        "title_en": "Additional Powers of the Secretary for Explosives",
        "title_es": "Poderes Adicionales del Secretario para Explosivos",
        "description_en": "Additional powers of the Secretary related to explosives regulation.",
        "description_es": "Poderes adicionales del Secretario relacionados con regulación de explosivos.",
        "keywords_en": [
            "powers",
            "Secretary",
            "explosives",
            "regulation",
            "authority"
        ],
        "keywords_es": [
            "poderes",
            "Secretario",
            "explosivos",
            "regulación",
            "autoridad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-847",
        "citation": "18 U.S.C. § 847",
        "sort_key": "018.00847.000",
        "category": "Federal Penal Code",
        "title_en": "Rules and Regulations for Explosives",
        "title_es": "Reglas y Regulaciones para Explosivos",
        "description_en": "Rules and regulations governing explosives.",
        "description_es": "Reglas y regulaciones que rigen los explosivos.",
        "keywords_en": [
            "rules",
            "regulations",
            "explosives",
            "governance",
            "ATF"
        ],
        "keywords_es": [
            "reglas",
            "regulaciones",
            "explosivos",
            "gobernanza",
            "ATF"
        ],
        "verified": true
    },
    {
        "id": "usc-18-848",
        "citation": "18 U.S.C. § 848",
        "sort_key": "018.00848.000",
        "category": "Federal Penal Code",
        "title_en": "Continuing Criminal Enterprise (CCE) - 'Kingpin' Statute",
        "title_es": "Empresa Criminal Continua (CCE) - Estatuto del 'Capo'",
        "description_en": "Engaging in a continuing criminal enterprise involving drug trafficking with five or more people, from which the defendant derives substantial income.",
        "description_es": "Participar en una empresa criminal continua que involucra tráfico de drogas con cinco o más personas, de la cual el acusado obtiene ingresos sustanciales.",
        "keywords_en": [
            "continuing criminal enterprise",
            "CCE",
            "kingpin",
            "drug trafficking",
            "organized crime"
        ],
        "keywords_es": [
            "empresa criminal continua",
            "CCE",
            "capo",
            "tráfico de drogas",
            "crimen organizado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-871",
        "citation": "18 U.S.C. § 871",
        "sort_key": "018.00871.000",
        "category": "Federal Penal Code",
        "title_en": "Threats Against President and Successors to Presidency",
        "title_es": "Amenazas Contra el Presidente y Sucesores a la Presidencia",
        "description_en": "Knowingly and willfully making threats against the President, Vice President, or other successors to the presidency.",
        "description_es": "Hacer a sabiendas y deliberadamente amenazas contra el Presidente, Vicepresidente u otros sucesores a la presidencia.",
        "keywords_en": [
            "threats",
            "President",
            "Vice President",
            "successors",
            "Secret Service"
        ],
        "keywords_es": [
            "amenazas",
            "Presidente",
            "Vicepresidente",
            "sucesores",
            "Servicio Secreto"
        ],
        "verified": true
    },
    {
        "id": "usc-18-872",
        "citation": "18 U.S.C. § 872",
        "sort_key": "018.00872.000",
        "category": "Federal Penal Code",
        "title_en": "Extortion by Officers or Employees of the United States",
        "title_es": "Extorsión por Oficiales o Empleados de Estados Unidos",
        "description_en": "Officers or employees of the United States demanding or receiving money or property for official acts.",
        "description_es": "Oficiales o empleados de Estados Unidos exigiendo o recibiendo dinero o propiedad por actos oficiales.",
        "keywords_en": [
            "extortion",
            "officers",
            "employees",
            "United States",
            "corruption"
        ],
        "keywords_es": [
            "extorsión",
            "oficiales",
            "empleados",
            "Estados Unidos",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-873",
        "citation": "18 U.S.C. § 873",
        "sort_key": "018.00873.000",
        "category": "Federal Penal Code",
        "title_en": "Blackmail",
        "title_es": "Chantaje",
        "description_en": "Demanding or receiving money or other valuable thing under threat of informing or as consideration for not informing against violation of federal law.",
        "description_es": "Exigir o recibir dinero u otra cosa de valor bajo amenaza de informar o como consideración por no informar contra violación de ley federal.",
        "keywords_en": [
            "blackmail",
            "extortion",
            "threats",
            "informing",
            "federal law"
        ],
        "keywords_es": [
            "chantaje",
            "extorsión",
            "amenazas",
            "informar",
            "ley federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-874",
        "citation": "18 U.S.C. § 874",
        "sort_key": "018.00874.000",
        "category": "Federal Penal Code",
        "title_en": "Kickbacks from Public Works Employees",
        "title_es": "Comisiones Ilegales de Empleados de Obras Públicas",
        "description_en": "Kickbacks from employees of public works projects receiving federal funds.",
        "description_es": "Comisiones ilegales de empleados de proyectos de obras públicas que reciben fondos federales.",
        "keywords_en": [
            "kickbacks",
            "public works",
            "employees",
            "federal funds",
            "corruption"
        ],
        "keywords_es": [
            "comisiones ilegales",
            "obras públicas",
            "empleados",
            "fondos federales",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-875",
        "citation": "18 U.S.C. § 875",
        "sort_key": "018.00875.000",
        "category": "Federal Penal Code",
        "title_en": "Interstate Communications (Threats, Extortion, Kidnapping)",
        "title_es": "Comunicaciones Interestatales (Amenazas, Extorsión, Secuestro)",
        "description_en": "Transmitting in interstate or foreign commerce any communication containing any threat to kidnap any person or any threat to injure the person of another.",
        "description_es": "Transmitir en comercio interestatal o extranjero cualquier comunicación que contenga amenaza de secuestrar a cualquier persona o amenaza de lesionar a otra persona.",
        "keywords_en": [
            "interstate communications",
            "threats",
            "extortion",
            "kidnapping",
            "commerce"
        ],
        "keywords_es": [
            "comunicaciones interestatales",
            "amenazas",
            "extorsión",
            "secuestro",
            "comercio"
        ],
        "verified": true
    },
    {
        "id": "usc-18-876",
        "citation": "18 U.S.C. § 876",
        "sort_key": "018.00876.000",
        "category": "Federal Penal Code",
        "title_en": "Mailing Threatening Communications",
        "title_es": "Enviar Comunicaciones Amenazantes por Correo",
        "description_en": "Mailing threatening communications, including threats to kidnap or injure.",
        "description_es": "Enviar comunicaciones amenazantes por correo, incluyendo amenazas de secuestrar o lesionar.",
        "keywords_en": [
            "mailing",
            "threatening communications",
            "threats",
            "kidnapping",
            "injury"
        ],
        "keywords_es": [
            "enviar por correo",
            "comunicaciones amenazantes",
            "amenazas",
            "secuestro",
            "lesión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-877",
        "citation": "18 U.S.C. § 877",
        "sort_key": "018.00877.000",
        "category": "Federal Penal Code",
        "title_en": "Mailing Threatening Communications from Foreign Country",
        "title_es": "Enviar Comunicaciones Amenazantes desde País Extranjero",
        "description_en": "Mailing threatening communications from a foreign country into the United States.",
        "description_es": "Enviar comunicaciones amenazantes desde un país extranjero a Estados Unidos.",
        "keywords_en": [
            "mailing",
            "threatening communications",
            "foreign country",
            "international",
            "threats"
        ],
        "keywords_es": [
            "enviar por correo",
            "comunicaciones amenazantes",
            "país extranjero",
            "internacional",
            "amenazas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-878",
        "citation": "18 U.S.C. § 878",
        "sort_key": "018.00878.000",
        "category": "Federal Penal Code",
        "title_en": "Threats and Extortion Against Foreign Officials",
        "title_es": "Amenazas y Extorsión Contra Funcionarios Extranjeros",
        "description_en": "Threatening or extorting foreign officials, official guests, or internationally protected persons.",
        "description_es": "Amenazar o extorsionar a funcionarios extranjeros, invitados oficiales o personas internacionalmente protegidas.",
        "keywords_en": [
            "threats",
            "extortion",
            "foreign officials",
            "protected persons",
            "international"
        ],
        "keywords_es": [
            "amenazas",
            "extorsión",
            "funcionarios extranjeros",
            "personas protegidas",
            "internacional"
        ],
        "verified": true
    },
    {
        "id": "usc-18-879",
        "citation": "18 U.S.C. § 879",
        "sort_key": "018.00879.000",
        "category": "Federal Penal Code",
        "title_en": "Threats Against Former Presidents and Certain Other Persons",
        "title_es": "Amenazas Contra Ex Presidentes y Ciertas Otras Personas",
        "description_en": "Making threats against former Presidents, Vice Presidents, and their immediate family members.",
        "description_es": "Hacer amenazas contra ex Presidentes, Vicepresidentes y sus familiares inmediatos.",
        "keywords_en": [
            "threats",
            "former Presidents",
            "Vice Presidents",
            "family members",
            "Secret Service"
        ],
        "keywords_es": [
            "amenazas",
            "ex Presidentes",
            "Vicepresidentes",
            "familiares",
            "Servicio Secreto"
        ],
        "verified": true
    },
    {
        "id": "usc-18-880",
        "citation": "18 U.S.C. § 880",
        "sort_key": "018.00880.000",
        "category": "Federal Penal Code",
        "title_en": "Receiving the Proceeds of Extortion",
        "title_es": "Recibir los Productos de la Extorsión",
        "description_en": "Receiving, concealing, or disposing of the proceeds of extortion.",
        "description_es": "Recibir, ocultar o disponer de los productos de la extorsión.",
        "keywords_en": [
            "receiving",
            "proceeds",
            "extortion",
            "concealing",
            "money laundering"
        ],
        "keywords_es": [
            "recibir",
            "productos",
            "extorsión",
            "ocultar",
            "lavado de dinero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-881",
        "citation": "18 U.S.C. § 881",
        "sort_key": "018.00881.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Extortion and Threats",
        "title_es": "Definiciones para Extorsión y Amenazas",
        "description_en": "Definitions applicable to extortion and threats offenses.",
        "description_es": "Definiciones aplicables a delitos de extorsión y amenazas.",
        "keywords_en": [
            "definitions",
            "extortion",
            "threats",
            "legal terms",
            "interpretation"
        ],
        "keywords_es": [
            "definiciones",
            "extorsión",
            "amenazas",
            "términos legales",
            "interpretación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-891",
        "citation": "18 U.S.C. § 891",
        "sort_key": "018.00891.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Loan Sharking",
        "title_es": "Definiciones para Préstamos Usureros",
        "description_en": "Definitions applicable to loan sharking and extortionate credit transactions.",
        "description_es": "Definiciones aplicables a préstamos usureros y transacciones de crédito extorsivas.",
        "keywords_en": [
            "definitions",
            "loan sharking",
            "extortionate credit",
            "usury",
            "interest rates"
        ],
        "keywords_es": [
            "definiciones",
            "préstamos usureros",
            "crédito extorsivo",
            "usura",
            "tasas de interés"
        ],
        "verified": true
    },
    {
        "id": "usc-18-892",
        "citation": "18 U.S.C. § 892",
        "sort_key": "018.00892.000",
        "category": "Federal Penal Code",
        "title_en": "Making Extortionate Extensions of Credit",
        "title_es": "Hacer Extensiones de Crédito Extorsivas",
        "description_en": "Making extortionate extensions of credit, commonly known as loan sharking.",
        "description_es": "Hacer extensiones de crédito extorsivas, comúnmente conocidas como préstamos usureros.",
        "keywords_en": [
            "extortionate credit",
            "loan sharking",
            "lending",
            "usury",
            "interest"
        ],
        "keywords_es": [
            "crédito extorsivo",
            "préstamos usureros",
            "préstamos",
            "usura",
            "interés"
        ],
        "verified": true
    },
    {
        "id": "usc-18-893",
        "citation": "18 U.S.C. § 893",
        "sort_key": "018.00893.000",
        "category": "Federal Penal Code",
        "title_en": "Financing Extortionate Extensions of Credit",
        "title_es": "Financiar Extensiones de Crédito Extorsivas",
        "description_en": "Financing extortionate extensions of credit or participating in the proceeds thereof.",
        "description_es": "Financiar extensiones de crédito extorsivas o participar en sus productos.",
        "keywords_en": [
            "financing",
            "extortionate credit",
            "loan sharking",
            "proceeds",
            "money"
        ],
        "keywords_es": [
            "financiamiento",
            "crédito extorsivo",
            "préstamos usureros",
            "productos",
            "dinero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-894",
        "citation": "18 U.S.C. § 894",
        "sort_key": "018.00894.000",
        "category": "Federal Penal Code",
        "title_en": "Collection of Extensions of Credit by Extortionate Means",
        "title_es": "Cobro de Extensiones de Crédito por Medios Extorsivos",
        "description_en": "Collecting extensions of credit by extortionate means, including threats of violence.",
        "description_es": "Cobrar extensiones de crédito por medios extorsivos, incluyendo amenazas de violencia.",
        "keywords_en": [
            "collection",
            "extortionate means",
            "credit",
            "threats",
            "violence"
        ],
        "keywords_es": [
            "cobro",
            "medios extorsivos",
            "crédito",
            "amenazas",
            "violencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-895",
        "citation": "18 U.S.C. § 895",
        "sort_key": "018.00895.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Extortionate Credit Transactions",
        "title_es": "Definiciones para Transacciones de Crédito Extorsivo",
        "description_en": "Definitions applicable to extortionate credit transactions.",
        "description_es": "Definiciones aplicables a transacciones de crédito extorsivo.",
        "keywords_en": [
            "definitions",
            "extortionate credit",
            "transactions",
            "legal terms",
            "interpretation"
        ],
        "keywords_es": [
            "definiciones",
            "crédito extorsivo",
            "transacciones",
            "términos legales",
            "interpretación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-896",
        "citation": "18 U.S.C. § 896",
        "sort_key": "018.00896.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Extortionate Credit Transactions",
        "title_es": "Definiciones para Transacciones de Crédito Extorsivo",
        "description_en": "Additional definitions applicable to extortionate credit transactions.",
        "description_es": "Definiciones adicionales aplicables a transacciones de crédito extorsivo.",
        "keywords_en": [
            "definitions",
            "extortionate credit",
            "transactions",
            "legal terms",
            "additional"
        ],
        "keywords_es": [
            "definiciones",
            "crédito extorsivo",
            "transacciones",
            "términos legales",
            "adicionales"
        ],
        "verified": true
    },
    {
        "id": "usc-18-911",
        "citation": "18 U.S.C. § 911",
        "sort_key": "018.00911.000",
        "category": "Federal Penal Code",
        "title_en": "False Personation - Citizenship",
        "title_es": "Falsa Personación - Ciudadanía",
        "description_en": "Falsely representing oneself to be a citizen of the United States.",
        "description_es": "Representarse falsamente como ciudadano de Estados Unidos.",
        "keywords_en": [
            "false personation",
            "citizenship",
            "impersonation",
            "fraud",
            "identity"
        ],
        "keywords_es": [
            "falsa personación",
            "ciudadanía",
            "impersonación",
            "fraude",
            "identidad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-912",
        "citation": "18 U.S.C. § 912",
        "sort_key": "018.00912.000",
        "category": "Federal Penal Code",
        "title_en": "False Personation - Officer or Employee of the United States",
        "title_es": "Falsa Personación - Oficial o Empleado de Estados Unidos",
        "description_en": "Falsely pretending to be an officer or employee of the United States to obtain money or property.",
        "description_es": "Fingir falsamente ser un oficial o empleado de Estados Unidos para obtener dinero o propiedad.",
        "keywords_en": [
            "false personation",
            "officer",
            "employee",
            "United States",
            "impersonation"
        ],
        "keywords_es": [
            "falsa personación",
            "oficial",
            "empleado",
            "Estados Unidos",
            "impersonación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-913",
        "citation": "18 U.S.C. § 913",
        "sort_key": "018.00913.000",
        "category": "Federal Penal Code",
        "title_en": "Impersonator Making Arrest or Search",
        "title_es": "Impersonador Haciendo Arresto o Búsqueda",
        "description_en": "Impersonating an officer to make an arrest or conduct a search.",
        "description_es": "Impersonar a un oficial para hacer un arresto o conducir una búsqueda.",
        "keywords_en": [
            "impersonator",
            "arrest",
            "search",
            "false authority",
            "impersonation"
        ],
        "keywords_es": [
            "impersonador",
            "arresto",
            "búsqueda",
            "autoridad falsa",
            "impersonación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-914",
        "citation": "18 U.S.C. § 914",
        "sort_key": "018.00914.000",
        "category": "Federal Penal Code",
        "title_en": "Foreign Diplomatic and Consular Officers",
        "title_es": "Oficiales Diplomáticos y Consulares Extranjeros",
        "description_en": "Offenses related to foreign diplomatic and consular officers.",
        "description_es": "Delitos relacionados con oficiales diplomáticos y consulares extranjeros.",
        "keywords_en": [
            "diplomatic",
            "consular",
            "foreign officers",
            "international law",
            "immunity"
        ],
        "keywords_es": [
            "diplomático",
            "consular",
            "oficiales extranjeros",
            "derecho internacional",
            "inmunidad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-915",
        "citation": "18 U.S.C. § 915",
        "sort_key": "018.00915.000",
        "category": "Federal Penal Code",
        "title_en": "Foreign Diplomatic and Consular Officers - Definitions",
        "title_es": "Oficiales Diplomáticos y Consulares Extranjeros - Definiciones",
        "description_en": "Definitions related to foreign diplomatic and consular officers.",
        "description_es": "Definiciones relacionadas con oficiales diplomáticos y consulares extranjeros.",
        "keywords_en": [
            "definitions",
            "diplomatic",
            "consular",
            "foreign officers",
            "interpretation"
        ],
        "keywords_es": [
            "definiciones",
            "diplomático",
            "consular",
            "oficiales extranjeros",
            "interpretación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-916",
        "citation": "18 U.S.C. § 916",
        "sort_key": "018.00916.000",
        "category": "Federal Penal Code",
        "title_en": "Foreign Diplomatic and Consular Officers - Immunity",
        "title_es": "Oficiales Diplomáticos y Consulares Extranjeros - Inmunidad",
        "description_en": "Immunity provisions for foreign diplomatic and consular officers.",
        "description_es": "Disposiciones de inmunidad para oficiales diplomáticos y consulares extranjeros.",
        "keywords_en": [
            "immunity",
            "diplomatic",
            "consular",
            "foreign officers",
            "privileges"
        ],
        "keywords_es": [
            "inmunidad",
            "diplomático",
            "consular",
            "oficiales extranjeros",
            "privilegios"
        ],
        "verified": true
    },
    {
        "id": "usc-18-917",
        "citation": "18 U.S.C. § 917",
        "sort_key": "018.00917.000",
        "category": "Federal Penal Code",
        "title_en": "Foreign Diplomatic and Consular Officers - Exceptions",
        "title_es": "Oficiales Diplomáticos y Consulares Extranjeros - Excepciones",
        "description_en": "Exceptions to immunity for foreign diplomatic and consular officers.",
        "description_es": "Excepciones a la inmunidad para oficiales diplomáticos y consulares extranjeros.",
        "keywords_en": [
            "exceptions",
            "immunity",
            "diplomatic",
            "consular",
            "liability"
        ],
        "keywords_es": [
            "excepciones",
            "inmunidad",
            "diplomático",
            "consular",
            "responsabilidad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-930",
        "citation": "18 U.S.C. § 930",
        "sort_key": "018.00930.000",
        "category": "Federal Penal Code",
        "title_en": "Possession of Firearms and Dangerous Weapons in Federal Facilities",
        "title_es": "Posesión de Armas de Fuego y Armas Peligrosas en Instalaciones Federales",
        "description_en": "Knowingly possessing or causing to be present a firearm or other dangerous weapon in a federal facility, including federal courthouses, post offices, and military installations. Exception for lawful purposes related to official duties.",
        "description_es": "Poseer a sabiendas o causar la presencia de un arma de fuego u otra arma peligrosa en una instalación federal, incluyendo tribunales federales, oficinas de correos e instalaciones militares. Excepción para propósitos legales relacionados con deberes oficiales.",
        "keywords_en": [
            "firearms",
            "dangerous weapons",
            "federal facilities",
            "possession",
            "courthouses",
            "post offices",
            "military installations"
        ],
        "keywords_es": [
            "armas de fuego",
            "armas peligrosas",
            "instalaciones federales",
            "posesión",
            "tribunales",
            "oficinas de correos",
            "instalaciones militares"
        ],
        "verified": true
    },
    {
        "id": "usc-18-931",
        "citation": "18 U.S.C. § 931",
        "sort_key": "018.00931.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibition on Purchase, Ownership, or Possession of Body Armor by Violent Felons",
        "title_es": "Prohibición de Compra, Propiedad o Posesión de Armadura Corporal por Delincuentes Violentos",
        "description_en": "Violent felons purchasing, owning, or possessing body armor.",
        "description_es": "Delincuentes violentos comprando, poseyendo o teniendo armadura corporal.",
        "keywords_en": [
            "body armor",
            "violent felons",
            "prohibition",
            "purchase",
            "possession"
        ],
        "keywords_es": [
            "armadura corporal",
            "delincuentes violentos",
            "prohibición",
            "compra",
            "posesión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-932",
        "citation": "18 U.S.C. § 932",
        "sort_key": "018.00932.000",
        "category": "Federal Penal Code",
        "title_en": "Straw Purchases",
        "title_es": "Compras de Fachada (Straw Purchases)",
        "description_en": "Purchasing a firearm on behalf of another person who is prohibited from possessing firearms.",
        "description_es": "Comprar un arma de fuego en nombre de otra persona que está prohibida de poseer armas de fuego.",
        "keywords_en": [
            "straw purchase",
            "firearms",
            "prohibited person",
            "proxy purchase",
            "trafficking"
        ],
        "keywords_es": [
            "compra de fachada",
            "armas de fuego",
            "persona prohibida",
            "compra por proxy",
            "tráfico"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1001",
        "citation": "18 U.S.C. § 1001",
        "sort_key": "018.01001.000",
        "category": "Federal Penal Code",
        "title_en": "Statements or Entries Generally (False Statements)",
        "title_es": "Declaraciones o Entradas Generalmente (Declaraciones Falsas)",
        "description_en": "Knowingly and willfully making any materially false, fictitious, or fraudulent statement or representation in any matter within federal jurisdiction.",
        "description_es": "Hacer a sabiendas y deliberadamente cualquier declaración o representación materialmente falsa, ficticia o fraudulenta en cualquier asunto dentro de la jurisdicción federal.",
        "keywords_en": [
            "false statements",
            "fraud",
            "federal jurisdiction",
            "lying to federal agents",
            "materially false"
        ],
        "keywords_es": [
            "declaraciones falsas",
            "fraude",
            "jurisdicción federal",
            "mentir a agentes federales",
            "materialmente falsa"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1002",
        "citation": "18 U.S.C. § 1002",
        "sort_key": "018.01002.000",
        "category": "Federal Penal Code",
        "title_en": "Possession of False Papers to Defraud United States",
        "title_es": "Posesión de Documentos Falsos para Defraudar a Estados Unidos",
        "description_en": "Possessing false papers to defraud the United States.",
        "description_es": "Poseer documentos falsos para defraudar a Estados Unidos.",
        "keywords_en": [
            "false papers",
            "possession",
            "defraud",
            "United States",
            "fraud"
        ],
        "keywords_es": [
            "documentos falsos",
            "posesión",
            "defraudar",
            "Estados Unidos",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1003",
        "citation": "18 U.S.C. § 1003",
        "sort_key": "018.01003.000",
        "category": "Federal Penal Code",
        "title_en": "Claims Against the United States",
        "title_es": "Reclamaciones Contra Estados Unidos",
        "description_en": "Making false claims against the United States.",
        "description_es": "Hacer reclamaciones falsas contra Estados Unidos.",
        "keywords_en": [
            "claims",
            "United States",
            "false claims",
            "fraud",
            "government"
        ],
        "keywords_es": [
            "reclamaciones",
            "Estados Unidos",
            "reclamaciones falsas",
            "fraude",
            "gobierno"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1004",
        "citation": "18 U.S.C. § 1004",
        "sort_key": "018.01004.000",
        "category": "Federal Penal Code",
        "title_en": "Certification of Checks by Disbursing Officers",
        "title_es": "Certificación de Cheques por Oficiales Pagadores",
        "description_en": "Certification of checks by disbursing officers with intent to defraud.",
        "description_es": "Certificación de cheques por oficiales pagadores con intención de defraudar.",
        "keywords_en": [
            "certification",
            "checks",
            "disbursing officers",
            "intent to defraud",
            "financial"
        ],
        "keywords_es": [
            "certificación",
            "cheques",
            "oficiales pagadores",
            "intención de defraudar",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1005",
        "citation": "18 U.S.C. § 1005",
        "sort_key": "018.01005.000",
        "category": "Federal Penal Code",
        "title_en": "Bank Entries, Reports and Transactions",
        "title_es": "Entradas, Reportes y Transacciones Bancarias",
        "description_en": "Making false entries in bank records, reports, or transactions.",
        "description_es": "Hacer entradas falsas en registros, reportes o transacciones bancarias.",
        "keywords_en": [
            "bank entries",
            "false entries",
            "bank records",
            "fraud",
            "financial"
        ],
        "keywords_es": [
            "entradas bancarias",
            "entradas falsas",
            "registros bancarios",
            "fraude",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1006",
        "citation": "18 U.S.C. § 1006",
        "sort_key": "018.01006.000",
        "category": "Federal Penal Code",
        "title_en": "Federal Credit Institution Entries, Reports and Transactions",
        "title_es": "Entradas, Reportes y Transacciones de Instituciones de Crédito Federal",
        "description_en": "Making false entries in federal credit institution records, reports, or transactions.",
        "description_es": "Hacer entradas falsas en registros, reportes o transacciones de instituciones de crédito federal.",
        "keywords_en": [
            "federal credit",
            "false entries",
            "records",
            "fraud",
            "financial"
        ],
        "keywords_es": [
            "crédito federal",
            "entradas falsas",
            "registros",
            "fraude",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1007",
        "citation": "18 U.S.C. § 1007",
        "sort_key": "018.01007.000",
        "category": "Federal Penal Code",
        "title_en": "Federal Deposit Insurance Corporation Transactions",
        "title_es": "Transacciones de la Corporación Federal de Seguro de Depósitos",
        "description_en": "Making false statements or entries in FDIC transactions.",
        "description_es": "Hacer declaraciones o entradas falsas en transacciones de la FDIC.",
        "keywords_en": [
            "FDIC",
            "false statements",
            "transactions",
            "fraud",
            "banking"
        ],
        "keywords_es": [
            "FDIC",
            "declaraciones falsas",
            "transacciones",
            "fraude",
            "banca"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1014",
        "citation": "18 U.S.C. § 1014",
        "sort_key": "018.01014.000",
        "category": "Federal Penal Code",
        "title_en": "Loan and Credit Applications Generally",
        "title_es": "Solicitudes de Préstamo y Crédito Generalmente",
        "description_en": "Making false statements or reports for the purpose of influencing action on loan or credit applications.",
        "description_es": "Hacer declaraciones o reportes falsos con el propósito de influir en la acción sobre solicitudes de préstamo o crédito.",
        "keywords_en": [
            "loan applications",
            "credit applications",
            "false statements",
            "fraud",
            "banking"
        ],
        "keywords_es": [
            "solicitudes de préstamo",
            "solicitudes de crédito",
            "declaraciones falsas",
            "fraude",
            "banca"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1028",
        "citation": "18 U.S.C. § 1028",
        "sort_key": "018.01028.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud and Related Activity in Connection with Identification Documents",
        "title_es": "Fraude y Actividad Relacionada con Documentos de Identificación",
        "description_en": "Producing, transferring, or possessing false identification documents, authentication features, or document-making implements.",
        "description_es": "Producir, transferir o poseer documentos de identificación falsos, características de autenticación o implementos para fabricar documentos.",
        "keywords_en": [
            "identification documents",
            "false ID",
            "fraud",
            "document fraud",
            "identity theft"
        ],
        "keywords_es": [
            "documentos de identificación",
            "ID falsa",
            "fraude",
            "fraude de documentos",
            "robo de identidad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1029",
        "citation": "18 U.S.C. § 1029",
        "sort_key": "018.01029.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud and Related Activity in Connection with Access Devices",
        "title_es": "Fraude y Actividad Relacionada con Dispositivos de Acceso",
        "description_en": "Producing, using, or trafficking in counterfeit access devices, unauthorized access devices, or device-making equipment.",
        "description_es": "Producir, usar o traficar con dispositivos de acceso falsificados, dispositivos de acceso no autorizados o equipo para fabricar dispositivos.",
        "keywords_en": [
            "access devices",
            "credit card fraud",
            "counterfeit",
            "trafficking",
            "device-making"
        ],
        "keywords_es": [
            "dispositivos de acceso",
            "fraude de tarjetas de crédito",
            "falsificación",
            "tráfico",
            "fabricación de dispositivos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1030",
        "citation": "18 U.S.C. § 1030",
        "sort_key": "018.01030.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud and Related Activity in Connection with Computers (CFAA)",
        "title_es": "Fraude y Actividad Relacionada con Computadoras (CFAA)",
        "description_en": "Knowingly accessing a computer without authorization or exceeding authorized access to obtain information, damage computers, or commit fraud. Includes hacking, malware distribution, and unauthorized data access.",
        "description_es": "Acceder a sabiendas a una computadora sin autorización o exceder el acceso autorizado para obtener información, dañar computadoras o cometer fraude. Incluye hackeo, distribución de malware y acceso no autorizado a datos.",
        "keywords_en": [
            "computer fraud",
            "hacking",
            "unauthorized access",
            "CFAA",
            "cybercrime",
            "malware"
        ],
        "keywords_es": [
            "fraude informático",
            "hackeo",
            "acceso no autorizado",
            "CFAA",
            "cibercrimen",
            "malware"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1031",
        "citation": "18 U.S.C. § 1031",
        "sort_key": "018.01031.000",
        "category": "Federal Penal Code",
        "title_en": "Major Fraud Against the United States",
        "title_es": "Fraude Mayor Contra Estados Unidos",
        "description_en": "Major fraud against the United States involving $1,000,000 or more in federal funds.",
        "description_es": "Fraude mayor contra Estados Unidos que involucra $1,000,000 o más en fondos federales.",
        "keywords_en": [
            "major fraud",
            "United States",
            "federal funds",
            "million dollars",
            "government contracts"
        ],
        "keywords_es": [
            "fraude mayor",
            "Estados Unidos",
            "fondos federales",
            "millón de dólares",
            "contratos gubernamentales"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1032",
        "citation": "18 U.S.C. § 1032",
        "sort_key": "018.01032.000",
        "category": "Federal Penal Code",
        "title_en": "Concealment of Assets from Conservator, Receiver, or Liquidating Agent",
        "title_es": "Ocultamiento de Activos de Conservador, Receptor o Agente Liquidador",
        "description_en": "Concealing assets from a conservator, receiver, or liquidating agent of a financial institution.",
        "description_es": "Ocultar activos de un conservador, receptor o agente liquidador de una institución financiera.",
        "keywords_en": [
            "concealment",
            "assets",
            "conservator",
            "receiver",
            "liquidating agent"
        ],
        "keywords_es": [
            "ocultamiento",
            "activos",
            "conservador",
            "receptor",
            "agente liquidador"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1033",
        "citation": "18 U.S.C. § 1033",
        "sort_key": "018.01033.000",
        "category": "Federal Penal Code",
        "title_en": "Crimes by or Affecting Persons Engaged in the Business of Insurance",
        "title_es": "Crímenes por o Afectando Personas Dedicadas al Negocio de Seguros",
        "description_en": "Crimes by or affecting persons engaged in the business of insurance whose activities affect interstate commerce.",
        "description_es": "Crímenes por o afectando personas dedicadas al negocio de seguros cuyas actividades afectan el comercio interestatal.",
        "keywords_en": [
            "insurance",
            "crimes",
            "interstate commerce",
            "fraud",
            "insurance business"
        ],
        "keywords_es": [
            "seguros",
            "crímenes",
            "comercio interestatal",
            "fraude",
            "negocio de seguros"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1034",
        "citation": "18 U.S.C. § 1034",
        "sort_key": "018.01034.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Penalty for Violation of Insurance Regulations",
        "title_es": "Penalidad Civil por Violación de Regulaciones de Seguros",
        "description_en": "Civil penalties for violations of insurance regulations.",
        "description_es": "Penalidades civiles por violaciones de regulaciones de seguros.",
        "keywords_en": [
            "civil penalty",
            "insurance",
            "regulations",
            "violation",
            "fines"
        ],
        "keywords_es": [
            "penalidad civil",
            "seguros",
            "regulaciones",
            "violación",
            "multas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1035",
        "citation": "18 U.S.C. § 1035",
        "sort_key": "018.01035.000",
        "category": "Federal Penal Code",
        "title_en": "False Statements Relating to Health Care Matters",
        "title_es": "Declaraciones Falsas Relacionadas con Asuntos de Atención Médica",
        "description_en": "Making false statements relating to health care matters.",
        "description_es": "Hacer declaraciones falsas relacionadas con asuntos de atención médica.",
        "keywords_en": [
            "false statements",
            "health care",
            "fraud",
            "medicare",
            "medicaid"
        ],
        "keywords_es": [
            "declaraciones falsas",
            "atención médica",
            "fraude",
            "medicare",
            "medicaid"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1036",
        "citation": "18 U.S.C. § 1036",
        "sort_key": "018.01036.000",
        "category": "Federal Penal Code",
        "title_en": "Entry by False Pretenses to Any Real Property, Vessel, or Aircraft of the United States",
        "title_es": "Entrada por Falsedades a Cualquier Propiedad Real, Embarcación o Aeronave de Estados Unidos",
        "description_en": "Entering by false pretenses any real property, vessel, or aircraft of the United States or secure or restricted area of any airport or seaport.",
        "description_es": "Entrar por falsedades a cualquier propiedad real, embarcación o aeronave de Estados Unidos o área segura o restringida de cualquier aeropuerto o puerto marítimo.",
        "keywords_en": [
            "false pretenses",
            "entry",
            "federal property",
            "secure area",
            "airport",
            "seaport"
        ],
        "keywords_es": [
            "falsedades",
            "entrada",
            "propiedad federal",
            "área segura",
            "aeropuerto",
            "puerto marítimo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1037",
        "citation": "18 U.S.C. § 1037",
        "sort_key": "018.01037.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud and Related Activity in Connection with Electronic Mail",
        "title_es": "Fraude y Actividad Relacionada con Correo Electrónico",
        "description_en": "Fraud and related activity in connection with electronic mail (spam, phishing, email fraud).",
        "description_es": "Fraude y actividad relacionada con correo electrónico (spam, phishing, fraude por email).",
        "keywords_en": [
            "email fraud",
            "spam",
            "phishing",
            "electronic mail",
            "CAN-SPAM"
        ],
        "keywords_es": [
            "fraude por email",
            "spam",
            "phishing",
            "correo electrónico",
            "CAN-SPAM"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1038",
        "citation": "18 U.S.C. § 1038",
        "sort_key": "018.01038.000",
        "category": "Federal Penal Code",
        "title_en": "False Information and Hoaxes",
        "title_es": "Información Falsa y Bromas",
        "description_en": "Conveying false information or hoaxes regarding attempts or alleged attempts to kill, injure, or intimidate any individual or unlawfully damage or destroy any building, vehicle, or other real or personal property.",
        "description_es": "Transmitir información falsa o bromas sobre intentos o presuntos intentos de matar, lesionar o intimidar a cualquier individuo o dañar o destruir ilegalmente cualquier edificio, vehículo u otra propiedad real o personal.",
        "keywords_en": [
            "false information",
            "hoaxes",
            "threats",
            "terrorism",
            "intimidation"
        ],
        "keywords_es": [
            "información falsa",
            "bromas",
            "amenazas",
            "terrorismo",
            "intimidación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1039",
        "citation": "18 U.S.C. § 1039",
        "sort_key": "018.01039.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud and Related Activity in Connection with Obtaining Confidential Phone Records",
        "title_es": "Fraude y Actividad Relacionada con Obtener Registros Telefónicos Confidenciales",
        "description_en": "Fraud and related activity in connection with obtaining confidential phone records information of a covered entity.",
        "description_es": "Fraude y actividad relacionada con obtener información de registros telefónicos confidenciales de una entidad cubierta.",
        "keywords_en": [
            "phone records",
            "confidential",
            "fraud",
            "privacy",
            "telecommunications"
        ],
        "keywords_es": [
            "registros telefónicos",
            "confidencial",
            "fraude",
            "privacidad",
            "telecomunicaciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1040",
        "citation": "18 U.S.C. § 1040",
        "sort_key": "018.01040.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud in Connection with Major Disaster or Emergency Benefits",
        "title_es": "Fraude en Conexión con Beneficios por Desastre Mayor o Emergencia",
        "description_en": "Fraud in connection with major disaster or emergency benefits.",
        "description_es": "Fraude en conexión con beneficios por desastre mayor o emergencia.",
        "keywords_en": [
            "fraud",
            "disaster benefits",
            "emergency benefits",
            "FEMA",
            "relief funds"
        ],
        "keywords_es": [
            "fraude",
            "beneficios por desastre",
            "beneficios de emergencia",
            "FEMA",
            "fondos de ayuda"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1071",
        "citation": "18 U.S.C. § 1071",
        "sort_key": "018.01071.000",
        "category": "Federal Penal Code",
        "title_en": "Concealing Person from Arrest",
        "title_es": "Ocultar Persona del Arresto",
        "description_en": "Concealing a person from arrest knowing that a warrant or process has been issued for their apprehension.",
        "description_es": "Ocultar a una persona del arresto sabiendo que se ha emitido una orden o proceso para su aprehensión.",
        "keywords_en": [
            "concealing",
            "arrest",
            "warrant",
            "harboring",
            "fugitive"
        ],
        "keywords_es": [
            "ocultar",
            "arresto",
            "orden",
            "dar refugio",
            "fugitivo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1072",
        "citation": "18 U.S.C. § 1072",
        "sort_key": "018.01072.000",
        "category": "Federal Penal Code",
        "title_en": "Concealing Escaped Prisoner",
        "title_es": "Ocultar Prisionero Escapado",
        "description_en": "Concealing an escaped prisoner knowing them to be such.",
        "description_es": "Ocultar a un prisionero escapado sabiendo que lo es.",
        "keywords_en": [
            "concealing",
            "escaped prisoner",
            "escape",
            "harboring",
            "custody"
        ],
        "keywords_es": [
            "ocultar",
            "prisionero escapado",
            "escape",
            "dar refugio",
            "custodia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1073",
        "citation": "18 U.S.C. § 1073",
        "sort_key": "018.01073.000",
        "category": "Federal Penal Code",
        "title_en": "Flight to Avoid Prosecution or Giving Testimony",
        "title_es": "Huida para Evitar Enjuiciamiento o Dar Testimonio",
        "description_en": "Moving or traveling in interstate or foreign commerce with intent to avoid prosecution, custody, or confinement after conviction, or to avoid giving testimony in any criminal proceeding.",
        "description_es": "Moverse o viajar en comercio interestatal o extranjero con intención de evitar enjuiciamiento, custodia o confinamiento después de condena, o para evitar dar testimonio en cualquier procedimiento criminal.",
        "keywords_en": [
            "flight",
            "avoid prosecution",
            "interstate commerce",
            "testimony",
            "fugitive"
        ],
        "keywords_es": [
            "huida",
            "evitar enjuiciamiento",
            "comercio interestatal",
            "testimonio",
            "fugitivo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1074",
        "citation": "18 U.S.C. § 1074",
        "sort_key": "018.01074.000",
        "category": "Federal Penal Code",
        "title_en": "Flight to Avoid Prosecution for Damaging or Destroying Property",
        "title_es": "Huida para Evitar Enjuiciamiento por Dañar o Destruir Propiedad",
        "description_en": "Moving or traveling in interstate or foreign commerce to avoid prosecution for damaging or destroying property.",
        "description_es": "Moverse o viajar en comercio interestatal o extranjero para evitar enjuiciamiento por dañar o destruir propiedad.",
        "keywords_en": [
            "flight",
            "avoid prosecution",
            "property damage",
            "destruction",
            "interstate commerce"
        ],
        "keywords_es": [
            "huida",
            "evitar enjuiciamiento",
            "daño a propiedad",
            "destrucción",
            "comercio interestatal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1081",
        "citation": "18 U.S.C. § 1081",
        "sort_key": "018.01081.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Gambling Ships",
        "title_es": "Definiciones para Buques de Juegos de Azar",
        "description_en": "Definitions applicable to gambling ships offenses.",
        "description_es": "Definiciones aplicables a delitos de buques de juegos de azar.",
        "keywords_en": [
            "definitions",
            "gambling ships",
            "gambling",
            "maritime",
            "gaming"
        ],
        "keywords_es": [
            "definiciones",
            "buques de juegos de azar",
            "juegos de azar",
            "marítimo",
            "juegos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1082",
        "citation": "18 U.S.C. § 1082",
        "sort_key": "018.01082.000",
        "category": "Federal Penal Code",
        "title_en": "Gambling Ships",
        "title_es": "Buques de Juegos de Azar",
        "description_en": "Operating or being aboard a gambling ship within federal jurisdiction.",
        "description_es": "Operar o estar a bordo de un buque de juegos de azar dentro de la jurisdicción federal.",
        "keywords_en": [
            "gambling ships",
            "gambling",
            "maritime",
            "federal jurisdiction",
            "gaming"
        ],
        "keywords_es": [
            "buques de juegos de azar",
            "juegos de azar",
            "marítimo",
            "jurisdicción federal",
            "juegos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1083",
        "citation": "18 U.S.C. § 1083",
        "sort_key": "018.01083.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation Between Shore and Ship; Penalties",
        "title_es": "Transporte Entre Costa y Buque; Penalidades",
        "description_en": "Transporting persons or property between shore and gambling ships.",
        "description_es": "Transportar personas o propiedad entre costa y buques de juegos de azar.",
        "keywords_en": [
            "transportation",
            "shore",
            "ship",
            "gambling ships",
            "penalties"
        ],
        "keywords_es": [
            "transporte",
            "costa",
            "buque",
            "buques de juegos de azar",
            "penalidades"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1084",
        "citation": "18 U.S.C. § 1084",
        "sort_key": "018.01084.000",
        "category": "Federal Penal Code",
        "title_en": "Transmission of Wagering Information; Penalties",
        "title_es": "Transmisión de Información de Apuestas; Penalidades",
        "description_en": "Transmitting wagering information in interstate or foreign commerce (Wire Act).",
        "description_es": "Transmitir información de apuestas en comercio interestatal o extranjero (Ley de Cable).",
        "keywords_en": [
            "wagering information",
            "transmission",
            "interstate commerce",
            "Wire Act",
            "gambling"
        ],
        "keywords_es": [
            "información de apuestas",
            "transmisión",
            "comercio interestatal",
            "Ley de Cable",
            "juegos de azar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1085",
        "citation": "18 U.S.C. § 1085",
        "sort_key": "018.01085.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Transportation of Wagering Paraphernalia",
        "title_es": "Definiciones para Transporte de Parafernalia de Apuestas",
        "description_en": "Definitions applicable to transportation of wagering paraphernalia.",
        "description_es": "Definiciones aplicables a transporte de parafernalia de apuestas.",
        "keywords_en": [
            "definitions",
            "wagering paraphernalia",
            "gambling equipment",
            "transportation",
            "wagering"
        ],
        "keywords_es": [
            "definiciones",
            "parafernalia de apuestas",
            "equipo de juegos de azar",
            "transporte",
            "apuestas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1086",
        "citation": "18 U.S.C. § 1086",
        "sort_key": "018.01086.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation of Wagering Paraphernalia",
        "title_es": "Transporte de Parafernalia de Apuestas",
        "description_en": "Transporting wagering paraphernalia in interstate or foreign commerce.",
        "description_es": "Transportar parafernalia de apuestas en comercio interestatal o extranjero.",
        "keywords_en": [
            "wagering paraphernalia",
            "transportation",
            "interstate commerce",
            "gambling equipment",
            "wagering"
        ],
        "keywords_es": [
            "parafernalia de apuestas",
            "transporte",
            "comercio interestatal",
            "equipo de juegos de azar",
            "apuestas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1151",
        "citation": "18 U.S.C. § 1151",
        "sort_key": "018.01151.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Gambling on Indian Lands",
        "title_es": "Definiciones para Juegos de Azar en Tierras Indígenas",
        "description_en": "Definitions applicable to gambling on Indian lands.",
        "description_es": "Definiciones aplicables a juegos de azar en tierras indígenas.",
        "keywords_en": [
            "definitions",
            "gambling",
            "Indian lands",
            "Native American",
            "tribal gaming"
        ],
        "keywords_es": [
            "definiciones",
            "juegos de azar",
            "tierras indígenas",
            "Nativo Americano",
            "juegos tribales"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1152",
        "citation": "18 U.S.C. § 1152",
        "sort_key": "018.01152.000",
        "category": "Federal Penal Code",
        "title_en": "Laws Governing",
        "title_es": "Leyes que Rigen",
        "description_en": "Laws governing criminal offenses committed by or against Indians in Indian country.",
        "description_es": "Leyes que rigen delitos cometidos por o contra indígenas en territorio indígena.",
        "keywords_en": [
            "laws governing",
            "Indian country",
            "Native American",
            "jurisdiction",
            "federal law"
        ],
        "keywords_es": [
            "leyes que rigen",
            "territorio indígena",
            "Nativo Americano",
            "jurisdicción",
            "ley federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1153",
        "citation": "18 U.S.C. § 1153",
        "sort_key": "018.01153.000",
        "category": "Federal Penal Code",
        "title_en": "Offenses Committed Within Indian Country",
        "title_es": "Delitos Cometidos Dentro del Territorio Indígena",
        "description_en": "Offenses committed within Indian country by or against Indians.",
        "description_es": "Delitos cometidos dentro del territorio indígena por o contra indígenas.",
        "keywords_en": [
            "offenses",
            "Indian country",
            "Native American",
            "jurisdiction",
            "federal law"
        ],
        "keywords_es": [
            "delitos",
            "territorio indígena",
            "Nativo Americano",
            "jurisdicción",
            "ley federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1154",
        "citation": "18 U.S.C. § 1154",
        "sort_key": "018.01154.000",
        "category": "Federal Penal Code",
        "title_en": "Intoxicants Dispensed in Indian Country",
        "title_es": "Intoxicantes Distribuidos en Territorio Indígena",
        "description_en": "Selling, dispensing, or distributing intoxicants in Indian country.",
        "description_es": "Vender, distribuir o repartir intoxicantes en territorio indígena.",
        "keywords_en": [
            "intoxicants",
            "Indian country",
            "alcohol",
            "distribution",
            "Native American"
        ],
        "keywords_es": [
            "intoxicantes",
            "territorio indígena",
            "alcohol",
            "distribución",
            "Nativo Americano"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1155",
        "citation": "18 U.S.C. § 1155",
        "sort_key": "018.01155.000",
        "category": "Federal Penal Code",
        "title_en": "Intoxicants Dispensed in Indian Country - Definitions",
        "title_es": "Intoxicantes Distribuidos en Territorio Indígena - Definiciones",
        "description_en": "Definitions applicable to intoxicants dispensed in Indian country.",
        "description_es": "Definiciones aplicables a intoxicantes distribuidos en territorio indígena.",
        "keywords_en": [
            "definitions",
            "intoxicants",
            "Indian country",
            "alcohol",
            "interpretation"
        ],
        "keywords_es": [
            "definiciones",
            "intoxicantes",
            "territorio indígena",
            "alcohol",
            "interpretación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1156",
        "citation": "18 U.S.C. § 1156",
        "sort_key": "018.01156.000",
        "category": "Federal Penal Code",
        "title_en": "Intoxicants Dispensed in Indian Country - Exceptions",
        "title_es": "Intoxicantes Distribuidos en Territorio Indígena - Excepciones",
        "description_en": "Exceptions to prohibitions on intoxicants in Indian country.",
        "description_es": "Excepciones a las prohibiciones de intoxicantes en territorio indígena.",
        "keywords_en": [
            "exceptions",
            "intoxicants",
            "Indian country",
            "alcohol",
            "permitted activities"
        ],
        "keywords_es": [
            "excepciones",
            "intoxicantes",
            "territorio indígena",
            "alcohol",
            "actividades permitidas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1161",
        "citation": "18 U.S.C. § 1161",
        "sort_key": "018.01161.000",
        "category": "Federal Penal Code",
        "title_en": "Application of State Liquor Laws to Indian Country",
        "title_es": "Aplicación de Leyes de Licores Estatales al Territorio Indígena",
        "description_en": "Application of state liquor laws to Indian country.",
        "description_es": "Aplicación de leyes de licores estatales al territorio indígena.",
        "keywords_en": [
            "state liquor laws",
            "Indian country",
            "alcohol",
            "jurisdiction",
            "state law"
        ],
        "keywords_es": [
            "leyes de licores estatales",
            "territorio indígena",
            "alcohol",
            "jurisdicción",
            "ley estatal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1162",
        "citation": "18 U.S.C. § 1162",
        "sort_key": "018.01162.000",
        "category": "Federal Penal Code",
        "title_en": "State Jurisdiction Over Offenses Committed by or Against Indians",
        "title_es": "Jurisdicción Estatal Sobre Delitos Cometidos por o Contra Indígenas",
        "description_en": "State jurisdiction over offenses committed by or against Indians in Indian country.",
        "description_es": "Jurisdicción estatal sobre delitos cometidos por o contra indígenas en territorio indígena.",
        "keywords_en": [
            "state jurisdiction",
            "Indians",
            "Indian country",
            "offenses",
            "state law"
        ],
        "keywords_es": [
            "jurisdicción estatal",
            "indígenas",
            "territorio indígena",
            "delitos",
            "ley estatal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1163",
        "citation": "18 U.S.C. § 1163",
        "sort_key": "018.01163.000",
        "category": "Federal Penal Code",
        "title_en": "Embezzlement and Theft from Indian Tribal Organizations",
        "title_es": "Malversación y Robo de Organizaciones Tribales Indígenas",
        "description_en": "Embezzlement or theft from Indian tribal organizations.",
        "description_es": "Malversación o robo de organizaciones tribales indígenas.",
        "keywords_en": [
            "embezzlement",
            "theft",
            "Indian tribal organizations",
            "Native American",
            "fraud"
        ],
        "keywords_es": [
            "malversación",
            "robo",
            "organizaciones tribales indígenas",
            "Nativo Americano",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1164",
        "citation": "18 U.S.C. § 1164",
        "sort_key": "018.01164.000",
        "category": "Federal Penal Code",
        "title_en": "Destroying or Removing Boundary Markers on Indian Lands",
        "title_es": "Destruir o Remover Marcadores de Límite en Tierras Indígenas",
        "description_en": "Destroying or removing boundary markers on Indian lands.",
        "description_es": "Destruir o remover marcadores de límite en tierras indígenas.",
        "keywords_en": [
            "boundary markers",
            "Indian lands",
            "destruction",
            "removal",
            "property"
        ],
        "keywords_es": [
            "marcadores de límite",
            "tierras indígenas",
            "destrucción",
            "remoción",
            "propiedad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1165",
        "citation": "18 U.S.C. § 1165",
        "sort_key": "018.01165.000",
        "category": "Federal Penal Code",
        "title_en": "Hunting, Trapping, or Fishing on Indian Land",
        "title_es": "Cazar, Trampar o Pescar en Tierras Indígenas",
        "description_en": "Hunting, trapping, or fishing on Indian land without authorization.",
        "description_es": "Cazar, trampar o pescar en tierras indígenas sin autorización.",
        "keywords_en": [
            "hunting",
            "trapping",
            "fishing",
            "Indian land",
            "unauthorized"
        ],
        "keywords_es": [
            "cazar",
            "trampar",
            "pescar",
            "tierras indígenas",
            "no autorizado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1166",
        "citation": "18 U.S.C. § 1166",
        "sort_key": "018.01166.000",
        "category": "Federal Penal Code",
        "title_en": "Gambling in Indian Country",
        "title_es": "Juegos de Azar en Territorio Indígena",
        "description_en": "Gambling in Indian country in violation of applicable federal or tribal law.",
        "description_es": "Juegos de azar en territorio indígena en violación de la ley federal o tribal aplicable.",
        "keywords_en": [
            "gambling",
            "Indian country",
            "tribal law",
            "gaming",
            "Native American"
        ],
        "keywords_es": [
            "juegos de azar",
            "territorio indígena",
            "ley tribal",
            "juegos",
            "Nativo Americano"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1167",
        "citation": "18 U.S.C. § 1167",
        "sort_key": "018.01167.000",
        "category": "Federal Penal Code",
        "title_en": "Theft from Gaming Establishments on Indian Lands",
        "title_es": "Robo de Establecimientos de Juegos en Tierras Indígenas",
        "description_en": "Theft from gaming establishments on Indian lands.",
        "description_es": "Robo de establecimientos de juegos en tierras indígenas.",
        "keywords_en": [
            "theft",
            "gaming establishments",
            "Indian lands",
            "casino",
            "fraud"
        ],
        "keywords_es": [
            "robo",
            "establecimientos de juegos",
            "tierras indígenas",
            "casino",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1168",
        "citation": "18 U.S.C. § 1168",
        "sort_key": "018.01168.000",
        "category": "Federal Penal Code",
        "title_en": "Theft by Officers or Employees of Gaming Establishments on Indian Lands",
        "title_es": "Robo por Oficiales o Empleados de Establecimientos de Juegos en Tierras Indígenas",
        "description_en": "Theft by officers or employees of gaming establishments on Indian lands.",
        "description_es": "Robo por oficiales o empleados de establecimientos de juegos en tierras indígenas.",
        "keywords_en": [
            "theft",
            "officers",
            "employees",
            "gaming establishments",
            "Indian lands"
        ],
        "keywords_es": [
            "robo",
            "oficiales",
            "empleados",
            "establecimientos de juegos",
            "tierras indígenas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1169",
        "citation": "18 U.S.C. § 1169",
        "sort_key": "018.01169.000",
        "category": "Federal Penal Code",
        "title_en": "Reporting of Child Abuse on Indian Reservations",
        "title_es": "Reporte de Abuso Infantil en Reservaciones Indígenas",
        "description_en": "Failure to report child abuse on Indian reservations.",
        "description_es": "Incumplimiento de reportar abuso infantil en reservaciones indígenas.",
        "keywords_en": [
            "child abuse",
            "reporting",
            "Indian reservations",
            "mandatory reporting",
            "neglect"
        ],
        "keywords_es": [
            "abuso infantil",
            "reporte",
            "reservaciones indígenas",
            "reporte obligatorio",
            "negligencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1170",
        "citation": "18 U.S.C. § 1170",
        "sort_key": "018.01170.000",
        "category": "Federal Penal Code",
        "title_en": "Illegal Trafficking in Native American Human Remains and Cultural Items",
        "title_es": "Tráfico Ilegal de Restos Humanos y Artículos Culturales Nativos Americanos",
        "description_en": "Illegal trafficking in Native American human remains and cultural items.",
        "description_es": "Tráfico ilegal de restos humanos y artículos culturales de Nativos Americanos.",
        "keywords_en": [
            "trafficking",
            "human remains",
            "cultural items",
            "Native American",
            "NAGPRA"
        ],
        "keywords_es": [
            "tráfico",
            "restos humanos",
            "artículos culturales",
            "Nativo Americano",
            "NAGPRA"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1201",
        "citation": "18 U.S.C. § 1201",
        "sort_key": "018.01201.000",
        "category": "Federal Penal Code",
        "title_en": "Kidnapping",
        "title_es": "Secuestro",
        "description_en": "Unlawfully seizing, confining, inveigling, decoying, kidnapping, abducting, or carrying away and holding for ransom or reward or otherwise any person, except in the case of a minor by the parent thereof.",
        "description_es": "Apoderarse ilegalmente, confinar, engañar, atraer, secuestrar, abducir o llevarse y retener por rescate o recompensa o de otro modo a cualquier persona, excepto en el caso de un menor por su padre.",
        "keywords_en": [
            "kidnapping",
            "abduction",
            "ransom",
            "hostage",
            "unlawful seizure"
        ],
        "keywords_es": [
            "secuestro",
            "abducción",
            "rescate",
            "rehén",
            "apoderamiento ilegal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1202",
        "citation": "18 U.S.C. § 1202",
        "sort_key": "018.01202.000",
        "category": "Federal Penal Code",
        "title_en": "Ransom Money",
        "title_es": "Dinero de Rescate",
        "description_en": "Receiving, possessing, or disposing of ransom money.",
        "description_es": "Recibir, poseer o disponer de dinero de rescate.",
        "keywords_en": [
            "ransom money",
            "receiving",
            "possessing",
            "kidnapping",
            "proceeds"
        ],
        "keywords_es": [
            "dinero de rescate",
            "recibir",
            "poseer",
            "secuestro",
            "productos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1203",
        "citation": "18 U.S.C. § 1203",
        "sort_key": "018.01203.000",
        "category": "Federal Penal Code",
        "title_en": "Hostage Taking",
        "title_es": "Toma de Rehenes",
        "description_en": "Whoever, whether inside or outside the United States, seizes or detains and threatens to kill, to injure, or to continue to detain another person in order to compel a third person or a governmental organization to do or abstain from doing any act as an explicit or implicit condition for the release of the person detained.",
        "description_es": "Quien, ya sea dentro o fuera de Estados Unidos, aprehende o detiene y amenaza con matar, lesionar o continuar deteniendo a otra persona para obligar a una tercera persona u organización gubernamental a hacer o abstenerse de hacer cualquier acto como condición explícita o implícita para la liberación de la persona detenida.",
        "keywords_en": [
            "hostage taking",
            "detention",
            "threats",
            "compel",
            "international"
        ],
        "keywords_es": [
            "toma de rehenes",
            "detención",
            "amenazas",
            "obligar",
            "internacional"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1204",
        "citation": "18 U.S.C. § 1204",
        "sort_key": "018.01204.000",
        "category": "Federal Penal Code",
        "title_en": "International Parental Kidnapping",
        "title_es": "Secuestro Parental Internacional",
        "description_en": "Removing a child from the United States, or retaining a child outside the United States, with intent to obstruct the lawful exercise of parental rights.",
        "description_es": "Remover a un niño de Estados Unidos, o retener a un niño fuera de Estados Unidos, con intención de obstruir el ejercicio legal de derechos parentales.",
        "keywords_en": [
            "parental kidnapping",
            "international",
            "child abduction",
            "parental rights",
            "custody"
        ],
        "keywords_es": [
            "secuestro parental",
            "internacional",
            "abducción de niño",
            "derechos parentales",
            "custodia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1361",
        "citation": "18 U.S.C. § 1361",
        "sort_key": "018.01361.000",
        "category": "Federal Penal Code",
        "title_en": "Government Buildings or Property (Damage to Government Property)",
        "title_es": "Edificios o Propiedad Gubernamental (Daño a Propiedad Gubernamental)",
        "description_en": "Willfully injuring or committing any depredation against any property of the United States, or of any department or agency thereof. Includes damage to government buildings, vehicles, equipment, and other federal property. Applies to military installations, post offices, courthouses, and all federal facilities.",
        "description_es": "Lesionar intencionalmente o cometer cualquier depredación contra cualquier propiedad de Estados Unidos, o de cualquier departamento o agencia del mismo. Incluye daño a edificios gubernamentales, vehículos, equipo y otra propiedad federal. Aplica a instalaciones militares, oficinas de correos, tribunales y todas las instalaciones federales.",
        "keywords_en": [
            "government property",
            "damage",
            "depredation",
            "federal property",
            "vandalism",
            "destruction",
            "military installation"
        ],
        "keywords_es": [
            "propiedad gubernamental",
            "daño",
            "depredación",
            "propiedad federal",
            "vandalismo",
            "destrucción",
            "instalación militar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1362",
        "citation": "18 U.S.C. § 1362",
        "sort_key": "018.01362.000",
        "category": "Federal Penal Code",
        "title_en": "Communication Lines, Stations or Systems",
        "title_es": "Líneas, Estaciones o Sistemas de Comunicación",
        "description_en": "Willfully or maliciously injuring or destroying any of the works, property, or material of any radio, telegraph, telephone, or cable, line, station, or system.",
        "description_es": "Lesionar o destruir intencional o maliciosamente cualquiera de las obras, propiedad o material de cualquier línea, estación o sistema de radio, telégrafo, teléfono o cable.",
        "keywords_en": [
            "communication lines",
            "destruction",
            "telecommunications",
            "infrastructure",
            "damage"
        ],
        "keywords_es": [
            "líneas de comunicación",
            "destrucción",
            "telecomunicaciones",
            "infraestructura",
            "daño"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1363",
        "citation": "18 U.S.C. § 1363",
        "sort_key": "018.01363.000",
        "category": "Federal Penal Code",
        "title_en": "Buildings or Property Within Special Maritime and Territorial Jurisdiction",
        "title_es": "Edificios o Propiedad Dentro de Jurisdicción Marítima y Territorial Especial",
        "description_en": "Willfully or maliciously destroying, damaging, or removing any building, structure, or personal property within special maritime and territorial jurisdiction.",
        "description_es": "Destruir, dañar o remover intencional o maliciosamente cualquier edificio, estructura o propiedad personal dentro de la jurisdicción marítima y territorial especial.",
        "keywords_en": [
            "buildings",
            "property",
            "maritime jurisdiction",
            "damage",
            "destruction"
        ],
        "keywords_es": [
            "edificios",
            "propiedad",
            "jurisdicción marítima",
            "daño",
            "destrucción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1364",
        "citation": "18 U.S.C. § 1364",
        "sort_key": "018.01364.000",
        "category": "Federal Penal Code",
        "title_en": "Interference with Foreign Commerce by Violence",
        "title_es": "Interferencia con Comercio Extranjero por Violencia",
        "description_en": "Using violence to interfere with foreign commerce.",
        "description_es": "Usar violencia para interferir con el comercio extranjero.",
        "keywords_en": [
            "foreign commerce",
            "violence",
            "interference",
            "international trade",
            "sabotage"
        ],
        "keywords_es": [
            "comercio extranjero",
            "violencia",
            "interferencia",
            "comercio internacional",
            "sabotaje"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1365",
        "citation": "18 U.S.C. § 1365",
        "sort_key": "018.01365.000",
        "category": "Federal Penal Code",
        "title_en": "Tampering with Consumer Products",
        "title_es": "Alteración de Productos de Consumo",
        "description_en": "Tampering with consumer products, or rendering materially false or misleading labeling on consumer products.",
        "description_es": "Alterar productos de consumo, o hacer que el etiquetado en productos de consumo sea materialmente falso o engañoso.",
        "keywords_en": [
            "tampering",
            "consumer products",
            "labeling",
            "false",
            "misleading"
        ],
        "keywords_es": [
            "alteración",
            "productos de consumo",
            "etiquetado",
            "falso",
            "engañoso"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1366",
        "citation": "18 U.S.C. § 1366",
        "sort_key": "018.01366.000",
        "category": "Federal Penal Code",
        "title_en": "Destruction of an Energy Facility",
        "title_es": "Destrucción de una Instalación de Energía",
        "description_en": "Attempting or conspiring to damage or destroy an energy facility.",
        "description_es": "Intentar o conspirar para dañar o destruir una instalación de energía.",
        "keywords_en": [
            "energy facility",
            "destruction",
            "damage",
            "conspiracy",
            "terrorism"
        ],
        "keywords_es": [
            "instalación de energía",
            "destrucción",
            "daño",
            "conspiración",
            "terrorismo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1367",
        "citation": "18 U.S.C. § 1367",
        "sort_key": "018.01367.000",
        "category": "Federal Penal Code",
        "title_en": "Interference with the Operation of a Satellite",
        "title_es": "Interferencia con la Operación de un Satélite",
        "description_en": "Interfering with the operation of a satellite.",
        "description_es": "Interferir con la operación de un satélite.",
        "keywords_en": [
            "satellite",
            "interference",
            "space",
            "telecommunications",
            "disruption"
        ],
        "keywords_es": [
            "satélite",
            "interferencia",
            "espacio",
            "telecomunicaciones",
            "disrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1368",
        "citation": "18 U.S.C. § 1368",
        "sort_key": "018.01368.000",
        "category": "Federal Penal Code",
        "title_en": "Harming Animals Used in Law Enforcement",
        "title_es": "Dañar Animales Usados en Aplicación de la Ley",
        "description_en": "Willfully and maliciously harming animals used in law enforcement, including police dogs and horses.",
        "description_es": "Dañar intencional y maliciosamente animales usados en aplicación de la ley, incluyendo perros y caballos policiales.",
        "keywords_en": [
            "animals",
            "law enforcement",
            "police dogs",
            "police horses",
            "harm"
        ],
        "keywords_es": [
            "animales",
            "aplicación de la ley",
            "perros policía",
            "caballos policía",
            "daño"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1369",
        "citation": "18 U.S.C. § 1369",
        "sort_key": "018.01369.000",
        "category": "Federal Penal Code",
        "title_en": "Destruction of Veterans' Memorials",
        "title_es": "Destrucción de Monumentos a Veteranos",
        "description_en": "Destroying or attempting to destroy a veterans' memorial on federal property.",
        "description_es": "Destruir o intentar destruir un monumento a veteranos en propiedad federal.",
        "keywords_en": [
            "veterans memorials",
            "destruction",
            "federal property",
            "monuments",
            "vandalism"
        ],
        "keywords_es": [
            "monumentos a veteranos",
            "destrucción",
            "propiedad federal",
            "monumentos",
            "vandalismo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1501",
        "citation": "18 U.S.C. § 1501",
        "sort_key": "018.01501.000",
        "category": "Federal Penal Code",
        "title_en": "Assault on Process Server",
        "title_es": "Agresión a Servidor de Procesos",
        "description_en": "Assaulting a process server while they are engaged in the performance of their duties.",
        "description_es": "Agredir a un servidor de procesos mientras está dedicado al desempeño de sus deberes.",
        "keywords_en": [
            "assault",
            "process server",
            "duties",
            "federal process",
            "violence"
        ],
        "keywords_es": [
            "agresión",
            "servidor de procesos",
            "deberes",
            "proceso federal",
            "violencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1502",
        "citation": "18 U.S.C. § 1502",
        "sort_key": "018.01502.000",
        "category": "Federal Penal Code",
        "title_en": "Resistance to Extradition Agent",
        "title_es": "Resistencia a Agente de Extradición",
        "description_en": "Resisting or opposing an extradition agent in the execution of their duties.",
        "description_es": "Resistir u oponerse a un agente de extradición en la ejecución de sus deberes.",
        "keywords_en": [
            "resistance",
            "extradition",
            "agent",
            "opposition",
            "fugitive"
        ],
        "keywords_es": [
            "resistencia",
            "extradición",
            "agente",
            "oposición",
            "fugitivo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1503",
        "citation": "18 U.S.C. § 1503",
        "sort_key": "018.01503.000",
        "category": "Federal Penal Code",
        "title_en": "Influencing or Injuring Officer or Juror Generally (Obstruction of Justice)",
        "title_es": "Influir o Lesionar Oficial o Jurado Generalmente (Obstrucción de la Justicia)",
        "description_en": "Corruptly or by threats or force, or by any threatening letter or communication, influencing, obstructing, or impeding, or endeavoring to influence, obstruct, or impede, the due administration of justice.",
        "description_es": "Influir, obstruir o impedir corruptamente o por amenazas o fuerza, o por cualquier carta o comunicación amenazante, o intentar influir, obstruir o impedir, la debida administración de justicia.",
        "keywords_en": [
            "obstruction of justice",
            "influencing",
            "juror",
            "officer",
            "corruptly",
            "threats"
        ],
        "keywords_es": [
            "obstrucción de la justicia",
            "influir",
            "jurado",
            "oficial",
            "corruptamente",
            "amenazas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1504",
        "citation": "18 U.S.C. § 1504",
        "sort_key": "018.01504.000",
        "category": "Federal Penal Code",
        "title_en": "Influencing Juror by Writing",
        "title_es": "Influir en Jurado por Escrito",
        "description_en": "Attempting to influence the action or decision of a juror upon an issue or matter pending before such juror by means of a written communication.",
        "description_es": "Intentar influir en la acción o decisión de un jurado sobre un asunto pendiente ante dicho jurado por medio de una comunicación escrita.",
        "keywords_en": [
            "influencing juror",
            "written communication",
            "jury tampering",
            "corruption",
            "trial"
        ],
        "keywords_es": [
            "influir en jurado",
            "comunicación escrita",
            "manipulación de jurado",
            "corrupción",
            "juicio"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1505",
        "citation": "18 U.S.C. § 1505",
        "sort_key": "018.01505.000",
        "category": "Federal Penal Code",
        "title_en": "Obstruction of Proceedings Before Departments, Agencies, and Committees",
        "title_es": "Obstrucción de Procedimientos Ante Departamentos, Agencias y Comités",
        "description_en": "Corruptly, or by threats or force, or by any threatening letter or communication influencing, obstructing, or impeding any pending proceeding before any department or agency of the United States, or Congress.",
        "description_es": "Influir, obstruir o impedir corruptamente, o por amenazas o fuerza, o por cualquier carta o comunicación amenazante, cualquier procedimiento pendiente ante cualquier departamento o agencia de Estados Unidos, o el Congreso.",
        "keywords_en": [
            "obstruction",
            "proceedings",
            "departments",
            "agencies",
            "congressional",
            "corruptly"
        ],
        "keywords_es": [
            "obstrucción",
            "procedimientos",
            "departamentos",
            "agencias",
            "congresional",
            "corruptamente"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1506",
        "citation": "18 U.S.C. § 1506",
        "sort_key": "018.01506.000",
        "category": "Federal Penal Code",
        "title_en": "Theft or Alteration of Record or Process; False Bail",
        "title_es": "Robo o Alteración de Registro o Proceso; Fianza Falsa",
        "description_en": "Stealing, altering, or falsifying any record, document, or legal process, or filing false bail.",
        "description_es": "Robar, alterar o falsificar cualquier registro, documento o proceso legal, o presentar fianza falsa.",
        "keywords_en": [
            "theft",
            "alteration",
            "record",
            "process",
            "false bail",
            "falsification"
        ],
        "keywords_es": [
            "robo",
            "alteración",
            "registro",
            "proceso",
            "fianza falsa",
            "falsificación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1507",
        "citation": "18 U.S.C. § 1507",
        "sort_key": "018.01507.000",
        "category": "Federal Penal Code",
        "title_en": "Picketing or Parading",
        "title_es": "Piquetes o Desfiles",
        "description_en": "Picketing or parading in or near a building housing a court of the United States with the intent of interfering with, obstructing, or impeding the administration of justice, or with the intent of influencing any judge, juror, witness, or court officer.",
        "description_es": "Hacer piquetes o desfilar en o cerca de un edificio que alberga un tribunal de Estados Unidos con la intención de interferir con, obstruir o impedir la administración de justicia, o con la intención de influir en cualquier juez, jurado, testigo u oficial de corte.",
        "keywords_en": [
            "picketing",
            "parading",
            "court",
            "influencing",
            "administration of justice"
        ],
        "keywords_es": [
            "piquetes",
            "desfiles",
            "tribunal",
            "influir",
            "administración de justicia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1508",
        "citation": "18 U.S.C. § 1508",
        "sort_key": "018.01508.000",
        "category": "Federal Penal Code",
        "title_en": "Recording, Listening to, or Observing Proceedings of Grand or Petit Juries While Deliberating or Voting",
        "title_es": "Grabar, Escuchar u Observar Procedimientos de Jurados Grandes o Pequeños Mientras Deliberan o Votan",
        "description_en": "Recording, listening to, or observing the proceedings of any grand or petit jury while it is deliberating or voting.",
        "description_es": "Grabar, escuchar u observar los procedimientos de cualquier jurado grande o pequeño mientras está deliberando o votando.",
        "keywords_en": [
            "recording",
            "jury",
            "deliberating",
            "voting",
            "grand jury",
            "petit jury"
        ],
        "keywords_es": [
            "grabar",
            "jurado",
            "deliberando",
            "votando",
            "jurado grande",
            "jurado pequeño"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1509",
        "citation": "18 U.S.C. § 1509",
        "sort_key": "018.01509.000",
        "category": "Federal Penal Code",
        "title_en": "Obstruction of Court Orders",
        "title_es": "Obstrucción de Órdenes de Corte",
        "description_en": "Preventing the execution of any process or order of any court of the United States.",
        "description_es": "Prevenir la ejecución de cualquier proceso u orden de cualquier tribunal de Estados Unidos.",
        "keywords_en": [
            "obstruction",
            "court orders",
            "process",
            "execution",
            "federal court"
        ],
        "keywords_es": [
            "obstrucción",
            "órdenes de corte",
            "proceso",
            "ejecución",
            "tribunal federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1510",
        "citation": "18 U.S.C. § 1510",
        "sort_key": "018.01510.000",
        "category": "Federal Penal Code",
        "title_en": "Obstruction of Criminal Investigations",
        "title_es": "Obstrucción de Investigaciones Criminales",
        "description_en": "Obstructing criminal investigations by bribery, force, or threats.",
        "description_es": "Obstruir investigaciones criminales por soborno, fuerza o amenazas.",
        "keywords_en": [
            "obstruction",
            "criminal investigations",
            "bribery",
            "force",
            "threats"
        ],
        "keywords_es": [
            "obstrucción",
            "investigaciones criminales",
            "soborno",
            "fuerza",
            "amenazas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1511",
        "citation": "18 U.S.C. § 1511",
        "sort_key": "018.01511.000",
        "category": "Federal Penal Code",
        "title_en": "Obstruction of State or Local Law Enforcement",
        "title_es": "Obstrucción de Aplicación de la Ley Estatal o Local",
        "description_en": "Obstructing, delaying, or affecting commerce or the movement of any article or commodity in commerce by robbery or extortion, or attempting or conspiring to do so, or committing or threatening physical violence to any person or property in furtherance of a plan or purpose to do anything in violation of this section.",
        "description_es": "Obstruir, retrasar o afectar el comercio o el movimiento de cualquier artículo o mercancía en el comercio por robo o extorsión, o intentar o conspirar para hacerlo, o cometer o amenazar violencia física contra cualquier persona o propiedad en promoción de un plan o propósito de hacer cualquier cosa en violación de esta sección.",
        "keywords_en": [
            "obstruction",
            "state law enforcement",
            "local law enforcement",
            "commerce",
            "robbery",
            "extortion"
        ],
        "keywords_es": [
            "obstrucción",
            "aplicación de la ley estatal",
            "aplicación de la ley local",
            "comercio",
            "robo",
            "extorsión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1512",
        "citation": "18 U.S.C. § 1512",
        "sort_key": "018.01512.000",
        "category": "Federal Penal Code",
        "title_en": "Tampering with a Witness, Victim, or an Informant",
        "title_es": "Alteración de un Testigo, Víctima o Informante",
        "description_en": "Killing or attempting to kill another person with intent to prevent their attendance or testimony in an official proceeding, or to prevent the production of a record, document, or other object in an official proceeding. Also includes using intimidation, threats, or corrupt persuasion to influence, delay, or prevent testimony.",
        "description_es": "Matar o intentar matar a otra persona con intención de prevenir su asistencia o testimonio en un procedimiento oficial, o para prevenir la producción de un registro, documento u otro objeto en un procedimiento oficial. También incluye usar intimidación, amenazas o persuasión corrupta para influir, retrasar o prevenir testimonio.",
        "keywords_en": [
            "witness tampering",
            "intimidation",
            "threats",
            "testimony",
            "official proceeding",
            "corrupt persuasion"
        ],
        "keywords_es": [
            "alteración de testigo",
            "intimidación",
            "amenazas",
            "testimonio",
            "procedimiento oficial",
            "persuasión corrupta"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1513",
        "citation": "18 U.S.C. § 1513",
        "sort_key": "018.01513.000",
        "category": "Federal Penal Code",
        "title_en": "Retaliating Against a Witness, Victim, or an Informant",
        "title_es": "Venganza Contra un Testigo, Víctima o Informante",
        "description_en": "Killing or attempting to kill, or threatening to kill, another person with intent to retaliate for their attendance or testimony in an official proceeding, or for providing information relating to the commission or possible commission of a federal offense.",
        "description_es": "Matar o intentar matar, o amenazar con matar, a otra persona con intención de vengarse por su asistencia o testimonio en un procedimiento oficial, o por proporcionar información relacionada con la comisión o posible comisión de un delito federal.",
        "keywords_en": [
            "retaliation",
            "witness",
            "victim",
            "informant",
            "killing",
            "threats"
        ],
        "keywords_es": [
            "venganza",
            "testigo",
            "víctima",
            "informante",
            "asesinato",
            "amenazas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1514",
        "citation": "18 U.S.C. § 1514",
        "sort_key": "018.01514.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Action to Restrain Harassment of a Victim or Witness",
        "title_es": "Acción Civil para Restringir Acoso de una Víctima o Testigo",
        "description_en": "Civil action to restrain harassment of a victim or witness.",
        "description_es": "Acción civil para restringir el acoso de una víctima o testigo.",
        "keywords_en": [
            "civil action",
            "harassment",
            "victim",
            "witness",
            "restrain"
        ],
        "keywords_es": [
            "acción civil",
            "acoso",
            "víctima",
            "testigo",
            "restringir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1515",
        "citation": "18 U.S.C. § 1515",
        "sort_key": "018.01515.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Obstruction of Justice",
        "title_es": "Definiciones para Obstrucción de la Justicia",
        "description_en": "Definitions applicable to obstruction of justice offenses.",
        "description_es": "Definiciones aplicables a delitos de obstrucción de la justicia.",
        "keywords_en": [
            "definitions",
            "obstruction of justice",
            "legal terms",
            "interpretation"
        ],
        "keywords_es": [
            "definiciones",
            "obstrucción de la justicia",
            "términos legales",
            "interpretación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1516",
        "citation": "18 U.S.C. § 1516",
        "sort_key": "018.01516.000",
        "category": "Federal Penal Code",
        "title_en": "Obstruction of Federal Audit",
        "title_es": "Obstrucción de Auditoría Federal",
        "description_en": "Obstructing a federal audit by bribery, force, or threats.",
        "description_es": "Obstruir una auditoría federal por soborno, fuerza o amenazas.",
        "keywords_en": [
            "obstruction",
            "federal audit",
            "bribery",
            "force",
            "threats"
        ],
        "keywords_es": [
            "obstrucción",
            "auditoría federal",
            "soborno",
            "fuerza",
            "amenazas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1517",
        "citation": "18 U.S.C. § 1517",
        "sort_key": "018.01517.000",
        "category": "Federal Penal Code",
        "title_en": "Obstruction of Examination of Financial Institution",
        "title_es": "Obstrucción de Examen de Institución Financiera",
        "description_en": "Obstructing the examination of a financial institution.",
        "description_es": "Obstruir el examen de una institución financiera.",
        "keywords_en": [
            "obstruction",
            "examination",
            "financial institution",
            "audit",
            "regulation"
        ],
        "keywords_es": [
            "obstrucción",
            "examen",
            "institución financiera",
            "auditoría",
            "regulación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1518",
        "citation": "18 U.S.C. § 1518",
        "sort_key": "018.01518.000",
        "category": "Federal Penal Code",
        "title_en": "Obstruction of Criminal Investigations of Health Care Offenses",
        "title_es": "Obstrucción de Investigaciones Criminales de Delitos de Atención Médica",
        "description_en": "Obstructing criminal investigations of health care offenses.",
        "description_es": "Obstruir investigaciones criminales de delitos de atención médica.",
        "keywords_en": [
            "obstruction",
            "health care offenses",
            "criminal investigations",
            "medicare fraud",
            "medicaid fraud"
        ],
        "keywords_es": [
            "obstrucción",
            "delitos de atención médica",
            "investigaciones criminales",
            "fraude medicare",
            "fraude medicaid"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1519",
        "citation": "18 U.S.C. § 1519",
        "sort_key": "018.01519.000",
        "category": "Federal Penal Code",
        "title_en": "Destruction, Alteration, or Falsification of Records in Federal Investigations and Bankruptcy",
        "title_es": "Destrucción, Alteración o Falsificación de Registros en Investigaciones Federales y Quiebra",
        "description_en": "Knowingly altering, destroying, mutilating, concealing, covering up, falsifying, or making a false entry in any record, document, or tangible object with the intent to impede, obstruct, or influence the investigation or proper administration of any matter within the jurisdiction of any department or agency of the United States.",
        "description_es": "Alterar, destruir, mutilar, ocultar, encubrir, falsificar o hacer una entrada falsa a sabiendas en cualquier registro, documento u objeto tangible con la intención de impedir, obstruir o influir en la investigación o administración adecuada de cualquier asunto dentro de la jurisdicción de cualquier departamento o agencia de Estados Unidos.",
        "keywords_en": [
            "destruction",
            "alteration",
            "falsification",
            "records",
            "federal investigations",
            "bankruptcy"
        ],
        "keywords_es": [
            "destrucción",
            "alteración",
            "falsificación",
            "registros",
            "investigaciones federales",
            "quiebra"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1520",
        "citation": "18 U.S.C. § 1520",
        "sort_key": "018.01520.000",
        "category": "Federal Penal Code",
        "title_en": "Destruction of Corporate Audit Records",
        "title_es": "Destrucción de Registros de Auditoría Corporativa",
        "description_en": "Knowingly and willfully destroying corporate audit records.",
        "description_es": "Destruir a sabiendas y deliberadamente registros de auditoría corporativa.",
        "keywords_en": [
            "destruction",
            "corporate audit records",
            "Sarbanes-Oxley",
            "accounting",
            "financial"
        ],
        "keywords_es": [
            "destrucción",
            "registros de auditoría corporativa",
            "Sarbanes-Oxley",
            "contabilidad",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1521",
        "citation": "18 U.S.C. § 1521",
        "sort_key": "018.01521.000",
        "category": "Federal Penal Code",
        "title_en": "Retaliating Against a Federal Judge or Federal Law Enforcement Officer by False Claim or Slander of Title",
        "title_es": "Venganza Contra Juez Federal u Oficial de Aplicación de la Ley Federal por Reclamación Falsa o Calumnia de Título",
        "description_en": "Filing a false lien or encumbrance against the real or personal property of a federal judge or federal law enforcement officer on account of the performance of their official duties.",
        "description_es": "Presentar un gravamen falso o gravamen contra la propiedad real o personal de un juez federal u oficial de aplicación de la ley federal a cuenta del desempeño de sus deberes oficiales.",
        "keywords_en": [
            "retaliation",
            "federal judge",
            "law enforcement",
            "false lien",
            "slander of title",
            "sovereign citizen"
        ],
        "keywords_es": [
            "venganza",
            "juez federal",
            "aplicación de la ley",
            "gravamen falso",
            "calumnia de título",
            "ciudadano soberano"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1541",
        "citation": "18 U.S.C. § 1541",
        "sort_key": "018.01541.000",
        "category": "Federal Penal Code",
        "title_en": "Issuance of Passports Without Authority",
        "title_es": "Emisión de Pasaportes Sin Autoridad",
        "description_en": "Issuing passports without authority.",
        "description_es": "Emitir pasaportes sin autoridad.",
        "keywords_en": [
            "passports",
            "issuance",
            "without authority",
            "fraud",
            "immigration"
        ],
        "keywords_es": [
            "pasaportes",
            "emisión",
            "sin autoridad",
            "fraude",
            "inmigración"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1542",
        "citation": "18 U.S.C. § 1542",
        "sort_key": "018.01542.000",
        "category": "Federal Penal Code",
        "title_en": "False Statement in Application and Use of Passport",
        "title_es": "Declaración Falsa en Solicitud y Uso de Pasaporte",
        "description_en": "Making any false statement in an application for a passport with intent to induce or secure the issuance of a passport under the authority of the United States.",
        "description_es": "Hacer cualquier declaración falsa en una solicitud de pasaporte con intención de inducir o asegurar la emisión de un pasaporte bajo la autoridad de Estados Unidos.",
        "keywords_en": [
            "false statement",
            "passport application",
            "fraud",
            "identity",
            "immigration"
        ],
        "keywords_es": [
            "declaración falsa",
            "solicitud de pasaporte",
            "fraude",
            "identidad",
            "inmigración"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1543",
        "citation": "18 U.S.C. § 1543",
        "sort_key": "018.01543.000",
        "category": "Federal Penal Code",
        "title_en": "Forgery or False Use of Passport",
        "title_es": "Falsificación o Uso Falso de Pasaporte",
        "description_en": "Forging, counterfeiting, mutilating, or altering any passport or instrument purporting to be a passport.",
        "description_es": "Falsificar, falsificar, mutilar o alterar cualquier pasaporte o instrumento que pretende ser un pasaporte.",
        "keywords_en": [
            "forgery",
            "passport",
            "counterfeiting",
            "altering",
            "fraud"
        ],
        "keywords_es": [
            "falsificación",
            "pasaporte",
            "falsificación",
            "alterar",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1544",
        "citation": "18 U.S.C. § 1544",
        "sort_key": "018.01544.000",
        "category": "Federal Penal Code",
        "title_en": "Misuse of Passport",
        "title_es": "Uso Indebido de Pasaporte",
        "description_en": "Using any passport in violation of the conditions or restrictions therein contained, or which has been procured by fraud.",
        "description_es": "Usar cualquier pasaporte en violación de las condiciones o restricciones contenidas en el mismo, o que ha sido obtenido por fraude.",
        "keywords_en": [
            "misuse",
            "passport",
            "fraud",
            "violations",
            "immigration"
        ],
        "keywords_es": [
            "uso indebido",
            "pasaporte",
            "fraude",
            "violaciones",
            "inmigración"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1545",
        "citation": "18 U.S.C. § 1545",
        "sort_key": "018.01545.000",
        "category": "Federal Penal Code",
        "title_en": "Safe Conduct Violation",
        "title_es": "Violación de Salvoconducto",
        "description_en": "Violating a safe conduct granted by the United States under the authority of the United States.",
        "description_es": "Violar un salvoconducto otorgado por Estados Unidos bajo la autoridad de Estados Unidos.",
        "keywords_en": [
            "safe conduct",
            "violation",
            "diplomatic",
            "immunity",
            "international"
        ],
        "keywords_es": [
            "salvoconducto",
            "violación",
            "diplomático",
            "inmunidad",
            "internacional"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1546",
        "citation": "18 U.S.C. § 1546",
        "sort_key": "018.01546.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud and Misuse of Visas, Permits, and Other Documents",
        "title_es": "Fraude y Uso Indebido de Visas, Permisos y Otros Documentos",
        "description_en": "Fraudulently making, forging, counterfeiting, mutilating, or altering any visa, permit, or other document required for entry into the United States.",
        "description_es": "Hacer, falsificar, falsificar, mutilar o alterar fraudulentamente cualquier visa, permiso u otro documento requerido para entrada a Estados Unidos.",
        "keywords_en": [
            "visa fraud",
            "permit fraud",
            "immigration documents",
            "forgery",
            "counterfeiting"
        ],
        "keywords_es": [
            "fraude de visa",
            "fraude de permiso",
            "documentos de inmigración",
            "falsificación",
            "falsificación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1547",
        "citation": "18 U.S.C. § 1547",
        "sort_key": "018.01547.000",
        "category": "Federal Penal Code",
        "title_en": "Alternative Imprisonment Maximum for Aggravated Identity Theft in Relation to Terrorism",
        "title_es": "Máximo Alternativo de Encarcelamiento por Robo de Identidad Agravado en Relación con Terrorismo",
        "description_en": "Alternative imprisonment maximum for aggravated identity theft in relation to terrorism.",
        "description_es": "Máximo alternativo de encarcelamiento por robo de identidad agravado en relación con terrorismo.",
        "keywords_en": [
            "identity theft",
            "terrorism",
            "aggravated",
            "imprisonment",
            "maximum"
        ],
        "keywords_es": [
            "robo de identidad",
            "terrorismo",
            "agravado",
            "encarcelamiento",
            "máximo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1548",
        "citation": "18 U.S.C. § 1548",
        "sort_key": "018.01548.000",
        "category": "Federal Penal Code",
        "title_en": "Preemption",
        "title_es": "Preempción",
        "description_en": "Preemption of state laws relating to immigration documents.",
        "description_es": "Preempción de leyes estatales relacionadas con documentos de inmigración.",
        "keywords_en": [
            "preemption",
            "state laws",
            "immigration",
            "documents",
            "federal law"
        ],
        "keywords_es": [
            "preempción",
            "leyes estatales",
            "inmigración",
            "documentos",
            "ley federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1549",
        "citation": "18 U.S.C. § 1549",
        "sort_key": "018.01549.000",
        "category": "Federal Penal Code",
        "title_en": "Enforcement of Immigration Laws",
        "title_es": "Aplicación de Leyes de Inmigración",
        "description_en": "Enforcement of immigration laws.",
        "description_es": "Aplicación de leyes de inmigración.",
        "keywords_en": [
            "enforcement",
            "immigration laws",
            "ICE",
            "CBP",
            "DHS"
        ],
        "keywords_es": [
            "aplicación",
            "leyes de inmigración",
            "ICE",
            "CBP",
            "DHS"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1581",
        "citation": "18 U.S.C. § 1581",
        "sort_key": "018.01581.000",
        "category": "Federal Penal Code",
        "title_en": "Peonage; Obstructing Enforcement",
        "title_es": "Peonaje; Obstrucción de Aplicación",
        "description_en": "Holding or returning any person to a condition of peonage, or obstructing the enforcement of laws against peonage.",
        "description_es": "Mantener o regresar a cualquier persona a una condición de peonaje, o obstruir la aplicación de leyes contra el peonaje.",
        "keywords_en": [
            "peonage",
            "slavery",
            "forced labor",
            "obstructing enforcement",
            "human rights"
        ],
        "keywords_es": [
            "peonaje",
            "esclavitud",
            "trabajo forzado",
            "obstrucción de aplicación",
            "derechos humanos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1582",
        "citation": "18 U.S.C. § 1582",
        "sort_key": "018.01582.000",
        "category": "Federal Penal Code",
        "title_en": "Vessels for Slave Trade",
        "title_es": "Embarcaciones para Tráfico de Esclavos",
        "description_en": "Equipping, furnishing, fitting out, or otherwise preparing any vessel for use in the slave trade.",
        "description_es": "Equipar, amueblar, acondicionar o de otro modo preparar cualquier embarcación para uso en el tráfico de esclavos.",
        "keywords_en": [
            "slave trade",
            "vessels",
            "maritime",
            "human trafficking",
            "preparation"
        ],
        "keywords_es": [
            "tráfico de esclavos",
            "embarcaciones",
            "marítimo",
            "tráfico de personas",
            "preparación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1583",
        "citation": "18 U.S.C. § 1583",
        "sort_key": "018.01583.000",
        "category": "Federal Penal Code",
        "title_en": "Enticement into Slavery",
        "title_es": "Atracción hacia la Esclavitud",
        "description_en": "Kidnapping or carrying away any person with intent to hold such person in a condition of involuntary servitude.",
        "description_es": "Secuestrar o llevarse a cualquier persona con intención de mantener a dicha persona en una condición de servidumbre involuntaria.",
        "keywords_en": [
            "enticement",
            "slavery",
            "kidnapping",
            "involuntary servitude",
            "forced labor"
        ],
        "keywords_es": [
            "atracción",
            "esclavitud",
            "secuestro",
            "servidumbre involuntaria",
            "trabajo forzado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1584",
        "citation": "18 U.S.C. § 1584",
        "sort_key": "018.01584.000",
        "category": "Federal Penal Code",
        "title_en": "Sale into Involuntary Servitude",
        "title_es": "Venta a Servidumbre Involuntaria",
        "description_en": "Holding, selling, or conveying any person into involuntary servitude.",
        "description_es": "Mantener, vender o transportar a cualquier persona a servidumbre involuntaria.",
        "keywords_en": [
            "sale",
            "involuntary servitude",
            "human trafficking",
            "forced labor",
            "slavery"
        ],
        "keywords_es": [
            "venta",
            "servidumbre involuntaria",
            "tráfico de personas",
            "trabajo forzado",
            "esclavitud"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1585",
        "citation": "18 U.S.C. § 1585",
        "sort_key": "018.01585.000",
        "category": "Federal Penal Code",
        "title_en": "Seizure, Detention, or Transportation of Slaves",
        "title_es": "Aprehensión, Detención o Transporte de Esclavos",
        "description_en": "Seizing, detaining, or transporting any person with intent to sell such person into slavery or involuntary servitude.",
        "description_es": "Aprehender, detener o transportar a cualquier persona con intención de vender a dicha persona a esclavitud o servidumbre involuntaria.",
        "keywords_en": [
            "seizure",
            "detention",
            "transportation",
            "slaves",
            "slavery"
        ],
        "keywords_es": [
            "aprehensión",
            "detención",
            "transporte",
            "esclavos",
            "esclavitud"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1586",
        "citation": "18 U.S.C. § 1586",
        "sort_key": "018.01586.000",
        "category": "Federal Penal Code",
        "title_en": "Service on Vessels in Slave Trade",
        "title_es": "Servicio en Embarcaciones en Tráfico de Esclavos",
        "description_en": "Serving on board any vessel employed in the slave trade.",
        "description_es": "Servir a bordo de cualquier embarcación empleada en el tráfico de esclavos.",
        "keywords_en": [
            "service",
            "vessels",
            "slave trade",
            "maritime",
            "crew"
        ],
        "keywords_es": [
            "servicio",
            "embarcaciones",
            "tráfico de esclavos",
            "marítimo",
            "tripulación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1587",
        "citation": "18 U.S.C. § 1587",
        "sort_key": "018.01587.000",
        "category": "Federal Penal Code",
        "title_en": "Possession of Slaves Aboard Vessel",
        "title_es": "Posesión de Esclavos a Bordo de Embarcación",
        "description_en": "Taking on board any vessel any person with intent to make such person a slave, or carrying away in any such vessel any person with intent to place such person as a slave.",
        "description_es": "Tomar a bordo de cualquier embarcación a cualquier persona con intención de hacer de dicha persona un esclavo, o llevarse en cualquier dicha embarcación a cualquier persona con intención de colocar a dicha persona como esclavo.",
        "keywords_en": [
            "possession",
            "slaves",
            "vessel",
            "maritime",
            "human trafficking"
        ],
        "keywords_es": [
            "posesión",
            "esclavos",
            "embarcación",
            "marítimo",
            "tráfico de personas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1588",
        "citation": "18 U.S.C. § 1588",
        "sort_key": "018.01588.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation of Slaves from United States",
        "title_es": "Transporte de Esclavos desde Estados Unidos",
        "description_en": "Transporting any person from the United States with intent to sell such person into slavery or involuntary servitude.",
        "description_es": "Transportar a cualquier persona desde Estados Unidos con intención de vender a dicha persona a esclavitud o servidumbre involuntaria.",
        "keywords_en": [
            "transportation",
            "slaves",
            "United States",
            "slavery",
            "export"
        ],
        "keywords_es": [
            "transporte",
            "esclavos",
            "Estados Unidos",
            "esclavitud",
            "exportar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1589",
        "citation": "18 U.S.C. § 1589",
        "sort_key": "018.01589.000",
        "category": "Federal Penal Code",
        "title_en": "Forced Labor",
        "title_es": "Trabajo Forzado",
        "description_en": "Knowingly providing or obtaining the labor or services of a person by any one of, or by any combination of, the following means: (1) by means of force, threats of force, physical restraint, or threats of physical restraint; (2) by means of serious harm or threats of serious harm; (3) by means of the abuse or threatened abuse of law or legal process; or (4) by means of any scheme, plan, or pattern intended to cause the person to believe that, if that person did not perform such labor or services, that person or another person would suffer serious harm or physical restraint.",
        "description_es": "Proporcionar u obtener a sabiendas el trabajo o servicios de una persona por cualquiera de, o por cualquier combinación de, los siguientes medios: (1) por medio de fuerza, amenazas de fuerza, restricción física o amenazas de restricción física; (2) por medio de daño grave o amenazas de daño grave; (3) por medio del abuso o abuso amenazado de ley o proceso legal; o (4) por medio de cualquier esquema, plan o patrón destinado a hacer que la persona crea que, si esa persona no realizara dicho trabajo o servicios, esa persona u otra persona sufriría daño grave o restricción física.",
        "keywords_en": [
            "forced labor",
            "human trafficking",
            "labor exploitation",
            "coercion",
            "threats"
        ],
        "keywords_es": [
            "trabajo forzado",
            "tráfico de personas",
            "explotación laboral",
            "coerción",
            "amenazas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1590",
        "citation": "18 U.S.C. § 1590",
        "sort_key": "018.01590.000",
        "category": "Federal Penal Code",
        "title_en": "Trafficking with Respect to Peonage, Slavery, Involuntary Servitude, or Forced Labor",
        "title_es": "Tráfico Respecto a Peonaje, Esclavitud, Servidumbre Involuntaria o Trabajo Forzado",
        "description_en": "Recruiting, harboring, transporting, providing, or obtaining by any means, any person for labor or services in violation of laws against peonage, slavery, involuntary servitude, or forced labor.",
        "description_es": "Reclutar, albergar, transportar, proporcionar u obtener por cualquier medio, a cualquier persona para trabajo o servicios en violación de leyes contra el peonaje, esclavitud, servidumbre involuntaria o trabajo forzado.",
        "keywords_en": [
            "trafficking",
            "peonage",
            "slavery",
            "involuntary servitude",
            "forced labor",
            "human trafficking"
        ],
        "keywords_es": [
            "tráfico",
            "peonaje",
            "esclavitud",
            "servidumbre involuntaria",
            "trabajo forzado",
            "tráfico de personas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1591",
        "citation": "18 U.S.C. § 1591",
        "sort_key": "018.01591.000",
        "category": "Federal Penal Code",
        "title_en": "Sex Trafficking of Children or by Force, Fraud, or Coercion",
        "title_es": "Tráfico Sexual de Niños o por Fuerza, Fraude o Coerción",
        "description_en": "Recruiting, enticing, harboring, transporting, providing, obtaining, patronizing, or soliciting by any means a person, knowing that force, fraud, or coercion will be used to cause the person to engage in a commercial sex act, or that the person has not attained the age of 18 years and will be caused to engage in a commercial sex act.",
        "description_es": "Reclutar, atraer, albergar, transportar, proporcionar, obtener, patrocinar o solicitar por cualquier medio a una persona, sabiendo que se usará fuerza, fraude o coerción para hacer que la persona se involucre en un acto sexual comercial, o que la persona no ha alcanzado los 18 años y se hará que se involucre en un acto sexual comercial.",
        "keywords_en": [
            "sex trafficking",
            "children",
            "force",
            "fraud",
            "coercion",
            "commercial sex act"
        ],
        "keywords_es": [
            "tráfico sexual",
            "niños",
            "fuerza",
            "fraude",
            "coerción",
            "acto sexual comercial"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1592",
        "citation": "18 U.S.C. § 1592",
        "sort_key": "018.01592.000",
        "category": "Federal Penal Code",
        "title_en": "Unlawful Conduct with Respect to Documents in Furtherance of Trafficking, Peonage, Slavery, Involuntary Servitude, or Forced Labor",
        "title_es": "Conducta Ilegal Respecto a Documentos en Promoción de Tráfico, Peonaje, Esclavitud, Servidumbre Involuntaria o Trabajo Forzado",
        "description_en": "Knowingly destroying, concealing, removing, confiscating, or possessing any actual or purported passport or other immigration document, or any other actual or purported government identification document, of another person in the course of a violation of, or with intent to violate, laws against trafficking, peonage, slavery, involuntary servitude, or forced labor.",
        "description_es": "Destruir, ocultar, remover, confiscar o poseer a sabiendas cualquier pasaporte real o supuesto u otro documento de inmigración, o cualquier otro documento de identificación gubernamental real o supuesto, de otra persona en el curso de una violación de, o con intención de violar, leyes contra el tráfico, peonaje, esclavitud, servidumbre involuntaria o trabajo forzado.",
        "keywords_en": [
            "documents",
            "trafficking",
            "passport",
            "immigration documents",
            "concealing"
        ],
        "keywords_es": [
            "documentos",
            "tráfico",
            "pasaporte",
            "documentos de inmigración",
            "ocultar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1593",
        "citation": "18 U.S.C. § 1593",
        "sort_key": "018.01593.000",
        "category": "Federal Penal Code",
        "title_en": "Mandatory Restitution",
        "title_es": "Restitución Obligatoria",
        "description_en": "Mandatory restitution for victims of trafficking, peonage, slavery, involuntary servitude, or forced labor.",
        "description_es": "Restitución obligatoria para víctimas de tráfico, peonaje, esclavitud, servidumbre involuntaria o trabajo forzado.",
        "keywords_en": [
            "restitution",
            "trafficking victims",
            "compensation",
            "mandatory",
            "victims"
        ],
        "keywords_es": [
            "restitución",
            "víctimas de tráfico",
            "compensación",
            "obligatoria",
            "víctimas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1594",
        "citation": "18 U.S.C. § 1594",
        "sort_key": "018.01594.000",
        "category": "Federal Penal Code",
        "title_en": "General Provisions",
        "title_es": "Disposiciones Generales",
        "description_en": "General provisions relating to offenses under this chapter, including attempt, conspiracy, and venue.",
        "description_es": "Disposiciones generales relacionadas con delitos bajo este capítulo, incluyendo intento, conspiración y jurisdicción.",
        "keywords_en": [
            "general provisions",
            "attempt",
            "conspiracy",
            "venue",
            "jurisdiction"
        ],
        "keywords_es": [
            "disposiciones generales",
            "intento",
            "conspiración",
            "jurisdicción territorial",
            "jurisdicción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1595",
        "citation": "18 U.S.C. § 1595",
        "sort_key": "018.01595.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Remedy",
        "title_es": "Recurso Civil",
        "description_en": "Civil remedy for victims of trafficking, peonage, slavery, involuntary servitude, or forced labor.",
        "description_es": "Recurso civil para víctimas de tráfico, peonaje, esclavitud, servidumbre involuntaria o trabajo forzado.",
        "keywords_en": [
            "civil remedy",
            "trafficking victims",
            "lawsuit",
            "damages",
            "compensation"
        ],
        "keywords_es": [
            "recurso civil",
            "víctimas de tráfico",
            "demanda",
            "daños",
            "compensación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1596",
        "citation": "18 U.S.C. § 1596",
        "sort_key": "018.01596.000",
        "category": "Federal Penal Code",
        "title_en": "Additional Offenses in Territorial Jurisdiction of the United States",
        "title_es": "Delitos Adicionales en Jurisdicción Territorial de Estados Unidos",
        "description_en": "Additional offenses within the territorial jurisdiction of the United States related to trafficking.",
        "description_es": "Delitos adicionales dentro de la jurisdicción territorial de Estados Unidos relacionados con tráfico.",
        "keywords_en": [
            "additional offenses",
            "territorial jurisdiction",
            "trafficking",
            "United States",
            "territories"
        ],
        "keywords_es": [
            "delitos adicionales",
            "jurisdicción territorial",
            "tráfico",
            "Estados Unidos",
            "territorios"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1597",
        "citation": "18 U.S.C. § 1597",
        "sort_key": "018.01597.000",
        "category": "Federal Penal Code",
        "title_en": "Unlawful Conduct with Respect to Immigration Documents",
        "title_es": "Conducta Ilegal Respecto a Documentos de Inmigración",
        "description_en": "Unlawful conduct with respect to immigration documents in connection with trafficking.",
        "description_es": "Conducta ilegal respecto a documentos de inmigración en conexión con tráfico.",
        "keywords_en": [
            "immigration documents",
            "unlawful conduct",
            "trafficking",
            "passports",
            "visas"
        ],
        "keywords_es": [
            "documentos de inmigración",
            "conducta ilegal",
            "tráfico",
            "pasaportes",
            "visas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1751",
        "citation": "18 U.S.C. § 1751",
        "sort_key": "018.01751.000",
        "category": "Federal Penal Code",
        "title_en": "Presidential and Presidential Staff Assassination, Kidnapping, and Assault",
        "title_es": "Asesinato, Secuestro y Agresión Presidencial y de Personal Presidencial",
        "description_en": "Killing, kidnapping, or assaulting the President, President-elect, Vice President, Vice President-elect, or certain other persons protected by the Secret Service.",
        "description_es": "Matar, secuestrar o agredir al Presidente, Presidente electo, Vicepresidente, Vicepresidente electo, o ciertas otras personas protegidas por el Servicio Secreto.",
        "keywords_en": [
            "assassination",
            "kidnapping",
            "assault",
            "President",
            "Vice President",
            "Secret Service"
        ],
        "keywords_es": [
            "asesinato",
            "secuestro",
            "agresión",
            "Presidente",
            "Vicepresidente",
            "Servicio Secreto"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1951",
        "citation": "18 U.S.C. § 1951",
        "sort_key": "018.01951.000",
        "category": "Federal Penal Code",
        "title_en": "Interference with Commerce by Threats or Violence (Hobbs Act)",
        "title_es": "Interferencia con el Comercio por Amenazas o Violencia (Ley Hobbs)",
        "description_en": "Obstructing, delaying, or affecting commerce or the movement of any article or commodity in commerce, by robbery or extortion or attempting or conspiring to do so. The Hobbs Act is commonly used to prosecute public corruption cases involving extortion under color of official right.",
        "description_es": "Obstruir, retrasar o afectar el comercio o el movimiento de cualquier artículo o mercancía en el comercio, por robo o extorsión o intentar o conspirar para hacerlo. La Ley Hobbs se usa comúnmente para enjuiciar casos de corrupción pública que involucran extorsión bajo color de derecho oficial.",
        "keywords_en": [
            "Hobbs Act",
            "interference with commerce",
            "robbery",
            "extortion",
            "public corruption",
            "color of official right"
        ],
        "keywords_es": [
            "Ley Hobbs",
            "interferencia con el comercio",
            "robo",
            "extorsión",
            "corrupción pública",
            "color de derecho oficial"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1952",
        "citation": "18 U.S.C. § 1952",
        "sort_key": "018.01952.000",
        "category": "Federal Penal Code",
        "title_en": "Interstate and Foreign Travel or Transportation in Aid of Racketeering Enterprises (Travel Act)",
        "title_es": "Viaje o Transporte Interestatal y Extranjero en Ayuda de Empresas de Racketeering (Ley de Viaje)",
        "description_en": "Traveling in interstate or foreign commerce or using the mail or any facility in interstate or foreign commerce, with intent to: (1) distribute the proceeds of any unlawful activity; (2) commit any crime of violence in furtherance of an unlawful activity; or (3) otherwise promote, manage, establish, carry on, or facilitate the promotion, management, establishment, or carrying on, of any unlawful activity.",
        "description_es": "Viajar en comercio interestatal o extranjero o usar el correo o cualquier instalación en comercio interestatal o extranjero, con intención de: (1) distribuir los productos de cualquier actividad ilegal; (2) cometer cualquier crimen de violencia en promoción de una actividad ilegal; o (3) de otro modo promover, manejar, establecer, llevar a cabo o facilitar la promoción, manejo, establecimiento o ejecución de cualquier actividad ilegal.",
        "keywords_en": [
            "Travel Act",
            "interstate travel",
            "racketeering",
            "unlawful activity",
            "facilitating crime"
        ],
        "keywords_es": [
            "Ley de Viaje",
            "viaje interestatal",
            "racketeering",
            "actividad ilegal",
            "facilitar crimen"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1953",
        "citation": "18 U.S.C. § 1953",
        "sort_key": "018.01953.000",
        "category": "Federal Penal Code",
        "title_en": "Interstate Transportation of Wagering Paraphernalia",
        "title_es": "Transporte Interestatal de Parafernalia de Apuestas",
        "description_en": "Transporting wagering paraphernalia in interstate or foreign commerce.",
        "description_es": "Transportar parafernalia de apuestas en comercio interestatal o extranjero.",
        "keywords_en": [
            "wagering paraphernalia",
            "interstate transportation",
            "gambling equipment",
            "commerce"
        ],
        "keywords_es": [
            "parafernalia de apuestas",
            "transporte interestatal",
            "equipo de juegos de azar",
            "comercio"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1954",
        "citation": "18 U.S.C. § 1954",
        "sort_key": "018.01954.000",
        "category": "Federal Penal Code",
        "title_en": "Offer, Acceptance, or Solicitation to Influence Operations of Employee Benefit Plan",
        "title_es": "Oferta, Aceptación o Solicitud para Influir en Operaciones de Plan de Beneficios para Empleados",
        "description_en": "Offering, accepting, or soliciting anything of value with intent to influence the action of any person in connection with any transaction involving the assets of an employee benefit plan.",
        "description_es": "Ofrecer, aceptar o solicitar cualquier cosa de valor con intención de influir en la acción de cualquier persona en conexión con cualquier transacción que involucre los activos de un plan de beneficios para empleados.",
        "keywords_en": [
            "employee benefit plan",
            "influence",
            "bribery",
            "corruption",
            "pension"
        ],
        "keywords_es": [
            "plan de beneficios",
            "influir",
            "soborno",
            "corrupción",
            "pensión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1955",
        "citation": "18 U.S.C. § 1955",
        "sort_key": "018.01955.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibition of Illegal Gambling Businesses",
        "title_es": "Prohibición de Negocios de Juegos de Azar Ilegales",
        "description_en": "Conducting, financing, managing, supervising, directing, or owning all or part of an illegal gambling business.",
        "description_es": "Conducir, financiar, manejar, supervisar, dirigir o poseer todo o parte de un negocio de juegos de azar ilegal.",
        "keywords_en": [
            "illegal gambling",
            "gambling business",
            "prohibition",
            "gaming",
            "organized crime"
        ],
        "keywords_es": [
            "juegos de azar ilegales",
            "negocio de juegos de azar",
            "prohibición",
            "juegos",
            "crimen organizado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1956",
        "citation": "18 U.S.C. § 1956",
        "sort_key": "018.01956.000",
        "category": "Federal Penal Code",
        "title_en": "Laundering of Monetary Instruments",
        "title_es": "Lavado de Instrumentos Monetarios",
        "description_en": "Conducting or attempting to conduct a financial transaction involving the proceeds of specified unlawful activity, knowing that the property involved represents proceeds of some form of unlawful activity, with intent to promote the carrying on of specified unlawful activity, or with intent to engage in conduct constituting a violation of sections 7201 or 7206 of the Internal Revenue Code.",
        "description_es": "Conducir o intentar conducir una transacción financiera que involucre los productos de actividad ilegal especificada, sabiendo que la propiedad involucrada representa productos de alguna forma de actividad ilegal, con intención de promover la realización de actividad ilegal especificada, o con intención de participar en conducta que constituya una violación de las secciones 7201 o 7206 del Código de Rentas Internas.",
        "keywords_en": [
            "money laundering",
            "monetary instruments",
            "proceeds",
            "financial transaction",
            "specified unlawful activity"
        ],
        "keywords_es": [
            "lavado de dinero",
            "instrumentos monetarios",
            "productos",
            "transacción financiera",
            "actividad ilegal especificada"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1957",
        "citation": "18 U.S.C. § 1957",
        "sort_key": "018.01957.000",
        "category": "Federal Penal Code",
        "title_en": "Engaging in Monetary Transactions in Property Derived from Specified Unlawful Activity",
        "title_es": "Participar en Transacciones Monetarias en Propiedad Derivada de Actividad Ilegal Especificada",
        "description_en": "Engaging or attempting to engage in a monetary transaction in criminally derived property of a value greater than $10,000.",
        "description_es": "Participar o intentar participar en una transacción monetaria en propiedad derivada criminalmente de un valor mayor a $10,000.",
        "keywords_en": [
            "monetary transactions",
            "criminally derived property",
            "money laundering",
            "$10,000",
            "financial"
        ],
        "keywords_es": [
            "transacciones monetarias",
            "propiedad derivada criminalmente",
            "lavado de dinero",
            "$10,000",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1958",
        "citation": "18 U.S.C. § 1958",
        "sort_key": "018.01958.000",
        "category": "Federal Penal Code",
        "title_en": "Use of Interstate Commerce Facilities in the Commission of Murder-for-Hire",
        "title_es": "Uso de Instalaciones de Comercio Interestatal en la Comisión de Asesinato a Sueldo",
        "description_en": "Using or causing another to use any facility in interstate or foreign commerce, or the mail, with intent that a murder be committed in violation of the laws of any State or the United States as consideration for the receipt of, or as consideration for a promise or agreement to pay, anything of pecuniary value.",
        "description_es": "Usar o hacer que otro use cualquier instalación en comercio interestatal o extranjero, o el correo, con intención de que se cometa un asesinato en violación de las leyes de cualquier Estado o Estados Unidos como consideración por la recepción de, o como consideración por una promesa o acuerdo de pagar, cualquier cosa de valor pecuniario.",
        "keywords_en": [
            "murder-for-hire",
            "interstate commerce",
            "contract killing",
            "assassination",
            "payment"
        ],
        "keywords_es": [
            "asesinato a sueldo",
            "comercio interestatal",
            "asesinato por contrato",
            "asesinato",
            "pago"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1959",
        "citation": "18 U.S.C. § 1959",
        "sort_key": "018.01959.000",
        "category": "Federal Penal Code",
        "title_en": "Violent Crimes in Aid of Racketeering Activity (VICAR)",
        "title_es": "Crímenes Violentos en Ayuda de Actividad de Racketeering (VICAR)",
        "description_en": "Committing or attempting to commit murder, kidnapping, maiming, assault with a dangerous weapon, assault resulting in serious bodily injury, or threatening to commit a crime of violence in violation of the laws of any State or the United States as consideration for the receipt of, or as consideration for a promise or agreement to pay, anything of pecuniary value, or for the purpose of gaining entrance to or maintaining or increasing position in an enterprise engaged in racketeering activity.",
        "description_es": "Cometer o intentar cometer asesinato, secuestro, mutilación, agresión con arma peligrosa, agresión que resulte en lesiones corporales graves, o amenazar con cometer un crimen de violencia en violación de las leyes de cualquier Estado o Estados Unidos como consideración por la recepción de, o como consideración por una promesa o acuerdo de pagar, cualquier cosa de valor pecuniario, o con el propósito de ganar entrada a o mantener o aumentar posición en una empresa dedicada a actividad de racketeering.",
        "keywords_en": [
            "VICAR",
            "violent crimes",
            "racketeering",
            "organized crime",
            "gang violence"
        ],
        "keywords_es": [
            "VICAR",
            "crímenes violentos",
            "racketeering",
            "crimen organizado",
            "violencia de pandillas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1960",
        "citation": "18 U.S.C. § 1960",
        "sort_key": "018.01960.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibition of Unlicensed Money Transmitting Businesses",
        "title_es": "Prohibición de Negocios de Transmisión de Dinero Sin Licencia",
        "description_en": "Knowingly conducting, controlling, managing, supervising, directing, or owning all or part of an unlicensed money transmitting business.",
        "description_es": "Conducir, controlar, manejar, supervisar, dirigir o poseer a sabiendas todo o parte de un negocio de transmisión de dinero sin licencia.",
        "keywords_en": [
            "money transmitting",
            "unlicensed",
            "money services business",
            "MSB",
            "financial"
        ],
        "keywords_es": [
            "transmisión de dinero",
            "sin licencia",
            "negocio de servicios monetarios",
            "MSB",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1961",
        "citation": "18 U.S.C. § 1961",
        "sort_key": "018.01961.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for RICO",
        "title_es": "Definiciones para RICO",
        "description_en": "Definitions for Racketeer Influenced and Corrupt Organizations (RICO) Act, including racketeering activity, pattern of racketeering activity, person, enterprise, and other terms.",
        "description_es": "Definiciones para la Ley de Organizaciones Corruptas y Influenciadas por Racketeers (RICO), incluyendo actividad de racketeering, patrón de actividad de racketeering, persona, empresa y otros términos.",
        "keywords_en": [
            "RICO",
            "definitions",
            "racketeering",
            "enterprise",
            "pattern",
            "organized crime"
        ],
        "keywords_es": [
            "RICO",
            "definiciones",
            "racketeering",
            "empresa",
            "patrón",
            "crimen organizado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1962",
        "citation": "18 U.S.C. § 1962",
        "sort_key": "018.01962.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibited Activities for RICO",
        "title_es": "Actividades Prohibidas para RICO",
        "description_en": "Prohibited activities under RICO, including investing income from racketeering activity, acquiring interest in an enterprise through racketeering activity, conducting affairs of an enterprise through racketeering activity, and conspiring to violate RICO.",
        "description_es": "Actividades prohibidas bajo RICO, incluyendo invertir ingresos de actividad de racketeering, adquirir interés en una empresa a través de actividad de racketeering, conducir los asuntos de una empresa a través de actividad de racketeering y conspirar para violar RICO.",
        "keywords_en": [
            "RICO",
            "prohibited activities",
            "racketeering",
            "enterprise",
            "conspiracy"
        ],
        "keywords_es": [
            "RICO",
            "actividades prohibidas",
            "racketeering",
            "empresa",
            "conspiración"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1963",
        "citation": "18 U.S.C. § 1963",
        "sort_key": "018.01963.000",
        "category": "Federal Penal Code",
        "title_en": "Criminal Penalties for RICO",
        "title_es": "Penalidades Criminales para RICO",
        "description_en": "Criminal penalties for violations of RICO, including fines, imprisonment up to 20 years, and forfeiture of proceeds derived from racketeering activity.",
        "description_es": "Penalidades criminales por violaciones de RICO, incluyendo multas, encarcelamiento hasta 20 años, y decomiso de productos derivados de actividad de racketeering.",
        "keywords_en": [
            "RICO",
            "criminal penalties",
            "forfeiture",
            "imprisonment",
            "fines"
        ],
        "keywords_es": [
            "RICO",
            "penalidades criminales",
            "decomiso",
            "encarcelamiento",
            "multas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1964",
        "citation": "18 U.S.C. § 1964",
        "sort_key": "018.01964.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Remedies for RICO",
        "title_es": "Recursos Civiles para RICO",
        "description_en": "Civil remedies for violations of RICO, including treble damages, attorney's fees, and injunctive relief.",
        "description_es": "Recursos civiles por violaciones de RICO, incluyendo daños triplicados, honorarios de abogados y alivio injuntivo.",
        "keywords_en": [
            "RICO",
            "civil remedies",
            "treble damages",
            "attorney's fees",
            "injunction"
        ],
        "keywords_es": [
            "RICO",
            "recursos civiles",
            "daños triplicados",
            "honorarios de abogados",
            "injunción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1965",
        "citation": "18 U.S.C. § 1965",
        "sort_key": "018.01965.000",
        "category": "Federal Penal Code",
        "title_en": "Venue and Process for RICO",
        "title_es": "Jurisdicción Territorial y Proceso para RICO",
        "description_en": "Venue and process for civil and criminal proceedings under RICO.",
        "description_es": "Jurisdicción territorial y proceso para procedimientos civiles y criminales bajo RICO.",
        "keywords_en": [
            "RICO",
            "venue",
            "process",
            "jurisdiction",
            "proceedings"
        ],
        "keywords_es": [
            "RICO",
            "jurisdicción territorial",
            "proceso",
            "jurisdicción",
            "procedimientos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1966",
        "citation": "18 U.S.C. § 1966",
        "sort_key": "018.01966.000",
        "category": "Federal Penal Code",
        "title_en": "Expedition of Actions for RICO",
        "title_es": "Expedición de Acciones para RICO",
        "description_en": "Expedition of civil and criminal actions under RICO.",
        "description_es": "Expedición de acciones civiles y criminales bajo RICO.",
        "keywords_en": [
            "RICO",
            "expedition",
            "civil actions",
            "criminal actions",
            "speedy trial"
        ],
        "keywords_es": [
            "RICO",
            "expedición",
            "acciones civiles",
            "acciones criminales",
            "juicio rápido"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1967",
        "citation": "18 U.S.C. § 1967",
        "sort_key": "018.01967.000",
        "category": "Federal Penal Code",
        "title_en": "Evidence for RICO",
        "title_es": "Evidencia para RICO",
        "description_en": "Evidence in civil and criminal proceedings under RICO.",
        "description_es": "Evidencia en procedimientos civiles y criminales bajo RICO.",
        "keywords_en": [
            "RICO",
            "evidence",
            "civil proceedings",
            "criminal proceedings",
            "proof"
        ],
        "keywords_es": [
            "RICO",
            "evidencia",
            "procedimientos civiles",
            "procedimientos criminales",
            "prueba"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1968",
        "citation": "18 U.S.C. § 1968",
        "sort_key": "018.01968.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Investigative Demand for RICO",
        "title_es": "Demanda de Investigación Civil para RICO",
        "description_en": "Civil investigative demand for information relating to RICO violations.",
        "description_es": "Demanda de investigación civil para información relacionada con violaciones de RICO.",
        "keywords_en": [
            "RICO",
            "civil investigative demand",
            "CID",
            "investigation",
            "discovery"
        ],
        "keywords_es": [
            "RICO",
            "demanda de investigación civil",
            "CID",
            "investigación",
            "descubrimiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2113",
        "citation": "18 U.S.C. § 2113",
        "sort_key": "018.02113.000",
        "category": "Federal Penal Code",
        "title_en": "Bank Robbery and Incidental Crimes",
        "title_es": "Robo a Banco y Delitos Incidentales",
        "description_en": "Robbery, burglary, larceny, or entering a bank, credit union, or savings and loan association with intent to commit any felony affecting such financial institution.",
        "description_es": "Robo, allanamiento de morada, hurto o entrar a un banco, cooperativa de crédito o asociación de ahorro y préstamo con intención de cometer cualquier delito grave que afecte a dicha institución financiera.",
        "keywords_en": [
            "bank robbery",
            "burglary",
            "larceny",
            "financial institution",
            "federal bank"
        ],
        "keywords_es": [
            "robo a banco",
            "allanamiento",
            "hurto",
            "institución financiera",
            "banco federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2114",
        "citation": "18 U.S.C. § 2114",
        "sort_key": "018.02114.000",
        "category": "Federal Penal Code",
        "title_en": "Mail, Money, or Other Property of United States",
        "title_es": "Correo, Dinero u Otra Propiedad de Estados Unidos",
        "description_en": "Assaulting or putting the life of any person in jeopardy with a dangerous weapon while engaged in the robbery of mail, money, or other property of the United States.",
        "description_es": "Agredir o poner en peligro la vida de cualquier persona con un arma peligrosa mientras está dedicado al robo de correo, dinero u otra propiedad de Estados Unidos.",
        "keywords_en": [
            "mail robbery",
            "federal property",
            "dangerous weapon",
            "assault",
            "postal"
        ],
        "keywords_es": [
            "robo de correo",
            "propiedad federal",
            "arma peligrosa",
            "agresión",
            "postal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2115",
        "citation": "18 U.S.C. § 2115",
        "sort_key": "018.02115.000",
        "category": "Federal Penal Code",
        "title_en": "Post Office",
        "title_es": "Oficina de Correos",
        "description_en": "Breaking into or attempting to break into any post office, or any building used in whole or in part as a post office, with intent to commit larceny or other depredation.",
        "description_es": "Forzar o intentar forzar cualquier oficina de correos, o cualquier edificio usado en todo o en parte como oficina de correos, con intención de cometer hurto u otra depredación.",
        "keywords_en": [
            "post office",
            "breaking in",
            "larceny",
            "postal",
            "burglary"
        ],
        "keywords_es": [
            "oficina de correos",
            "forzar",
            "hurto",
            "postal",
            "allanamiento"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2116",
        "citation": "18 U.S.C. § 2116",
        "sort_key": "018.02116.000",
        "category": "Federal Penal Code",
        "title_en": "Railway or Steamboat Post Office",
        "title_es": "Oficina de Correos de Ferrocarril o Barco de Vapor",
        "description_en": "Breaking into or attempting to break into any railway post office or steamboat post office.",
        "description_es": "Forzar o intentar forzar cualquier oficina de correos de ferrocarril o barco de vapor.",
        "keywords_en": [
            "railway post office",
            "steamboat post office",
            "breaking in",
            "postal",
            "transportation"
        ],
        "keywords_es": [
            "oficina de correos de ferrocarril",
            "oficina de correos de barco de vapor",
            "forzar",
            "postal",
            "transporte"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2117",
        "citation": "18 U.S.C. § 2117",
        "sort_key": "018.02117.000",
        "category": "Federal Penal Code",
        "title_en": "Breaking or Entering Carrier Facilities",
        "title_es": "Forzar o Entrar a Instalaciones de Transportista",
        "description_en": "Breaking the seal or lock of any railroad car, vessel, aircraft, motortruck, wagon, or other vehicle or of any pipeline system containing interstate or foreign shipments of freight or express or other property.",
        "description_es": "Forzar el sello o candado de cualquier vagón de ferrocarril, embarcación, aeronave, camión, vagón u otro vehículo o de cualquier sistema de tuberías que contenga envíos interestatales o extranjeros de carga o expreso u otra propiedad.",
        "keywords_en": [
            "breaking",
            "entering",
            "carrier facilities",
            "interstate commerce",
            "freight"
        ],
        "keywords_es": [
            "forzar",
            "entrar",
            "instalaciones de transportista",
            "comercio interestatal",
            "carga"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2118",
        "citation": "18 U.S.C. § 2118",
        "sort_key": "018.02118.000",
        "category": "Federal Penal Code",
        "title_en": "Robberies and Burglaries Involving Controlled Substances",
        "title_es": "Robos y Allanamientos que Involucran Sustancias Controladas",
        "description_en": "Robbery or burglary of any person or entity registered under the Controlled Substances Act involving controlled substances.",
        "description_es": "Robo o allanamiento de cualquier persona o entidad registrada bajo la Ley de Sustancias Controladas que involucre sustancias controladas.",
        "keywords_en": [
            "robbery",
            "burglary",
            "controlled substances",
            "DEA",
            "pharmacy"
        ],
        "keywords_es": [
            "robo",
            "allanamiento",
            "sustancias controladas",
            "DEA",
            "farmacia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2119",
        "citation": "18 U.S.C. § 2119",
        "sort_key": "018.02119.000",
        "category": "Federal Penal Code",
        "title_en": "Motor Vehicle Theft (Carjacking)",
        "title_es": "Robo de Vehículo Motorizado (Carjacking)",
        "description_en": "Taking a motor vehicle from the person or presence of another by force and violence or by intimidation, with intent to cause death or serious bodily harm.",
        "description_es": "Tomar un vehículo motorizado de la persona o presencia de otro por fuerza y violencia o por intimidación, con intención de causar muerte o lesiones corporales graves.",
        "keywords_en": [
            "carjacking",
            "motor vehicle theft",
            "force",
            "violence",
            "intimidation"
        ],
        "keywords_es": [
            "carjacking",
            "robo de vehículo motorizado",
            "fuerza",
            "violencia",
            "intimidación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2241",
        "citation": "18 U.S.C. § 2241",
        "sort_key": "018.02241.000",
        "category": "Federal Penal Code",
        "title_en": "Aggravated Sexual Abuse",
        "title_es": "Abuso Sexual Agravado",
        "description_en": "Causing another person to engage in a sexual act by using force against that person, or by threatening or placing that person in fear that any person will be subjected to death, serious bodily injury, or kidnapping.",
        "description_es": "Hacer que otra persona se involucre en un acto sexual usando fuerza contra esa persona, o amenazando o colocando a esa persona en temor de que cualquier persona será sometida a muerte, lesiones corporales graves o secuestro.",
        "keywords_en": [
            "aggravated sexual abuse",
            "force",
            "threats",
            "sexual act",
            "fear"
        ],
        "keywords_es": [
            "abuso sexual agravado",
            "fuerza",
            "amenazas",
            "acto sexual",
            "temor"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2242",
        "citation": "18 U.S.C. § 2242",
        "sort_key": "018.02242.000",
        "category": "Federal Penal Code",
        "title_en": "Sexual Abuse",
        "title_es": "Abuso Sexual",
        "description_en": "Causing another person to engage in a sexual act by threatening or placing that person in fear (other than fear of the types described in section 2241), or engaging in a sexual act with another person who is incapable of appraising the nature of the conduct or physically incapable of declining participation.",
        "description_es": "Hacer que otra persona se involucre en un acto sexual amenazando o colocando a esa persona en temor (que no sea temor de los tipos descritos en la sección 2241), o participar en un acto sexual con otra persona que es incapaz de evaluar la naturaleza de la conducta o físicamente incapaz de rechazar la participación.",
        "keywords_en": [
            "sexual abuse",
            "threats",
            "fear",
            "incapable",
            "sexual act"
        ],
        "keywords_es": [
            "abuso sexual",
            "amenazas",
            "temor",
            "incapaz",
            "acto sexual"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2243",
        "citation": "18 U.S.C. § 2243",
        "sort_key": "018.02243.000",
        "category": "Federal Penal Code",
        "title_en": "Sexual Abuse of a Minor or Ward",
        "title_es": "Abuso Sexual de un Menor o Pupilo",
        "description_en": "Engaging in a sexual act with another person who has not attained the age of 16 years, or is in official detention and under the custodial, supervisory, or disciplinary authority of the person.",
        "description_es": "Participar en un acto sexual con otra persona que no ha alcanzado los 16 años, o está en detención oficial y bajo la autoridad custodial, supervisora o disciplinaria de la persona.",
        "keywords_en": [
            "sexual abuse",
            "minor",
            "ward",
            "underage",
            "official detention"
        ],
        "keywords_es": [
            "abuso sexual",
            "menor",
            "pupilo",
            "menor de edad",
            "detención oficial"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2244",
        "citation": "18 U.S.C. § 2244",
        "sort_key": "018.02244.000",
        "category": "Federal Penal Code",
        "title_en": "Abusive Sexual Contact",
        "title_es": "Contacto Sexual Abusivo",
        "description_en": "Engaging in or causing sexual contact with or by another person, if to do so would violate sections 2241, 2242, or 2243 if the sexual contact had been a sexual act.",
        "description_es": "Participar en o causar contacto sexual con o por otra persona, si hacerlo violaría las secciones 2241, 2242 o 2243 si el contacto sexual hubiera sido un acto sexual.",
        "keywords_en": [
            "abusive sexual contact",
            "sexual contact",
            "minor",
            "force",
            "fear"
        ],
        "keywords_es": [
            "contacto sexual abusivo",
            "contacto sexual",
            "menor",
            "fuerza",
            "temor"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2245",
        "citation": "18 U.S.C. § 2245",
        "sort_key": "018.02245.000",
        "category": "Federal Penal Code",
        "title_en": "Offenses Resulting in Death",
        "title_es": "Delitos que Resultan en Muerte",
        "description_en": "If death results from conduct violating sections 2241, 2242, 2243, or 2244, the offender shall be fined, imprisoned for any term of years or life, or both.",
        "description_es": "Si la muerte resulta de conducta que viola las secciones 2241, 2242, 2243 o 2244, el delincuente será multado, encarcelado por cualquier término de años o de por vida, o ambos.",
        "keywords_en": [
            "death",
            "sexual abuse",
            "homicide",
            "aggravated",
            "life imprisonment"
        ],
        "keywords_es": [
            "muerte",
            "abuso sexual",
            "homicidio",
            "agravado",
            "encarcelamiento de por vida"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2246",
        "citation": "18 U.S.C. § 2246",
        "sort_key": "018.02246.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Sexual Abuse",
        "title_es": "Definiciones para Abuso Sexual",
        "description_en": "Definitions for sexual abuse offenses, including sexual act, sexual contact, serious bodily injury, and official detention.",
        "description_es": "Definiciones para delitos de abuso sexual, incluyendo acto sexual, contacto sexual, lesiones corporales graves y detención oficial.",
        "keywords_en": [
            "definitions",
            "sexual abuse",
            "sexual act",
            "sexual contact",
            "serious bodily injury"
        ],
        "keywords_es": [
            "definiciones",
            "abuso sexual",
            "acto sexual",
            "contacto sexual",
            "lesiones corporales graves"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2247",
        "citation": "18 U.S.C. § 2247",
        "sort_key": "018.02247.000",
        "category": "Federal Penal Code",
        "title_en": "Repeat Offenders",
        "title_es": "Reincidentes",
        "description_en": "Enhanced penalties for repeat offenders of sexual abuse offenses.",
        "description_es": "Penalidades aumentadas para reincidentes de delitos de abuso sexual.",
        "keywords_en": [
            "repeat offenders",
            "sexual abuse",
            "enhanced penalties",
            "prior convictions",
            "predicate"
        ],
        "keywords_es": [
            "reincidentes",
            "abuso sexual",
            "penalidades aumentadas",
            "condenas previas",
            "predicado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2248",
        "citation": "18 U.S.C. § 2248",
        "sort_key": "018.02248.000",
        "category": "Federal Penal Code",
        "title_en": "Mandatory Restitution",
        "title_es": "Restitución Obligatoria",
        "description_en": "Mandatory restitution for victims of sexual abuse offenses.",
        "description_es": "Restitución obligatoria para víctimas de delitos de abuso sexual.",
        "keywords_en": [
            "mandatory restitution",
            "sexual abuse victims",
            "compensation",
            "damages"
        ],
        "keywords_es": [
            "restitución obligatoria",
            "víctimas de abuso sexual",
            "compensación",
            "daños"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2251",
        "citation": "18 U.S.C. § 2251",
        "sort_key": "018.02251.000",
        "category": "Federal Penal Code",
        "title_en": "Sexual Exploitation of Children",
        "title_es": "Explotación Sexual de Niños",
        "description_en": "Employing, using, persuading, inducing, enticing, or coercing any minor to engage in sexually explicit conduct for the purpose of producing any visual depiction of such conduct.",
        "description_es": "Emplear, usar, persuadir, inducir, atraer o coaccionar a cualquier menor a participar en conducta sexualmente explícita con el propósito de producir cualquier representación visual de dicha conducta.",
        "keywords_en": [
            "sexual exploitation",
            "children",
            "child pornography",
            "minor",
            "visual depiction"
        ],
        "keywords_es": [
            "explotación sexual",
            "niños",
            "pornografía infantil",
            "menor",
            "representación visual"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2252",
        "citation": "18 U.S.C. § 2252",
        "sort_key": "018.02252.000",
        "category": "Federal Penal Code",
        "title_en": "Certain Activities Relating to Material Involving the Sexual Exploitation of Minors",
        "title_es": "Ciertas Actividades Relacionadas con Material que Involucre la Explotación Sexual de Menores",
        "description_en": "Transporting, shipping, receiving, distributing, or reproducing child pornography, or possessing child pornography with intent to sell or distribute.",
        "description_es": "Transportar, enviar, recibir, distribuir o reproducir pornografía infantil, o poseer pornografía infantil con intención de vender o distribuir.",
        "keywords_en": [
            "child pornography",
            "transporting",
            "distributing",
            "possessing",
            "sexual exploitation"
        ],
        "keywords_es": [
            "pornografía infantil",
            "transportar",
            "distribuir",
            "poseer",
            "explotación sexual"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2256",
        "citation": "18 U.S.C. § 2256",
        "sort_key": "018.02256.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Child Exploitation",
        "title_es": "Definiciones para Explotación Infantil",
        "description_en": "Definitions for child exploitation offenses, including minor, sexually explicit conduct, visual depiction, and other terms.",
        "description_es": "Definiciones para delitos de explotación infantil, incluyendo menor, conducta sexualmente explícita, representación visual y otros términos.",
        "keywords_en": [
            "definitions",
            "child exploitation",
            "minor",
            "sexually explicit conduct",
            "visual depiction"
        ],
        "keywords_es": [
            "definiciones",
            "explotación infantil",
            "menor",
            "conducta sexualmente explícita",
            "representación visual"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2261",
        "citation": "18 U.S.C. § 2261",
        "sort_key": "018.02261.000",
        "category": "Federal Penal Code",
        "title_en": "Interstate Domestic Violence",
        "title_es": "Violencia Doméstica Interestatal",
        "description_en": "Traveling in interstate or foreign commerce with intent to kill, injure, harass, or intimidate a spouse or intimate partner, and committing or attempting to commit a crime of violence against that person.",
        "description_es": "Viajar en comercio interestatal o extranjero con intención de matar, lesionar, acosar o intimidar a un cónyuge o pareja íntima, y cometer o intentar cometer un crimen de violencia contra esa persona.",
        "keywords_en": [
            "interstate domestic violence",
            "spouse",
            "intimate partner",
            "traveling",
            "violence"
        ],
        "keywords_es": [
            "violencia doméstica interestatal",
            "cónyuge",
            "pareja íntima",
            "viajar",
            "violencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2262",
        "citation": "18 U.S.C. § 2262",
        "sort_key": "018.02262.000",
        "category": "Federal Penal Code",
        "title_en": "Interstate Violation of Protection Order",
        "title_es": "Violación Interestatal de Orden de Protección",
        "description_en": "Traveling in interstate or foreign commerce with intent to engage in conduct that violates a protection order, and subsequently engaging in such conduct.",
        "description_es": "Viajar en comercio interestatal o extranjero con intención de participar en conducta que viole una orden de protección, y posteriormente participar en dicha conducta.",
        "keywords_en": [
            "interstate",
            "protection order",
            "violation",
            "domestic violence",
            "restraining order"
        ],
        "keywords_es": [
            "interestatal",
            "orden de protección",
            "violación",
            "violencia doméstica",
            "orden de restricción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2312",
        "citation": "18 U.S.C. § 2312",
        "sort_key": "018.02312.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation of Stolen Vehicles",
        "title_es": "Transporte de Vehículos Robados",
        "description_en": "Transporting in interstate or foreign commerce a motor vehicle, vessel, or aircraft, knowing the same to have been stolen.",
        "description_es": "Transportar en comercio interestatal o extranjero un vehículo motorizado, embarcación o aeronave, sabiendo que el mismo ha sido robado.",
        "keywords_en": [
            "transportation",
            "stolen vehicles",
            "interstate commerce",
            "motor vehicle",
            "aircraft"
        ],
        "keywords_es": [
            "transporte",
            "vehículos robados",
            "comercio interestatal",
            "vehículo motorizado",
            "aeronave"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2313",
        "citation": "18 U.S.C. § 2313",
        "sort_key": "018.02313.000",
        "category": "Federal Penal Code",
        "title_en": "Sale or Receipt of Stolen Vehicles",
        "title_es": "Venta o Recepción de Vehículos Robados",
        "description_en": "Receiving, possessing, concealing, storing, bartering, selling, or disposing of any motor vehicle, vessel, or aircraft which has crossed a State or United States boundary after being stolen.",
        "description_es": "Recibir, poseer, ocultar, almacenar, trueque, vender o disponer de cualquier vehículo motorizado, embarcación o aeronave que ha cruzado un límite estatal o de Estados Unidos después de ser robado.",
        "keywords_en": [
            "sale",
            "receipt",
            "stolen vehicles",
            "interstate",
            "possessing"
        ],
        "keywords_es": [
            "venta",
            "recepción",
            "vehículos robados",
            "interestatal",
            "poseer"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2314",
        "citation": "18 U.S.C. § 2314",
        "sort_key": "018.02314.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation of Stolen Goods, Securities, Moneys",
        "title_es": "Transporte de Mercancías, Valores, Dinero Robados",
        "description_en": "Transporting, transmitting, or transferring in interstate or foreign commerce any goods, wares, merchandise, securities or money, of the value of $5,000 or more, knowing the same to have been stolen, converted or taken by fraud.",
        "description_es": "Transportar, transmitir o transferir en comercio interestatal o extranjero cualquier mercancía, valores o dinero, del valor de $5,000 o más, sabiendo que el mismo ha sido robado, convertido o tomado por fraude.",
        "keywords_en": [
            "transportation",
            "stolen goods",
            "interstate commerce",
            "$5,000",
            "fraud"
        ],
        "keywords_es": [
            "transporte",
            "mercancías robadas",
            "comercio interestatal",
            "$5,000",
            "fraude"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2315",
        "citation": "18 U.S.C. § 2315",
        "sort_key": "018.02315.000",
        "category": "Federal Penal Code",
        "title_en": "Sale or Receipt of Stolen Goods, Securities, Moneys",
        "title_es": "Venta o Recepción de Mercancías, Valores, Dinero Robados",
        "description_en": "Receiving, possessing, concealing, storing, bartering, selling, or disposing of any goods, wares, or merchandise, securities, or money of the value of $5,000 or more, which have crossed a State or United States boundary after being stolen, unlawfully converted, or taken.",
        "description_es": "Recibir, poseer, ocultar, almacenar, trueque, vender o disponer de cualquier mercancía, valores o dinero del valor de $5,000 o más, que han cruzado un límite estatal o de Estados Unidos después de ser robados, convertidos ilegalmente o tomados.",
        "keywords_en": [
            "sale",
            "receipt",
            "stolen goods",
            "interstate",
            "$5,000",
            "possessing"
        ],
        "keywords_es": [
            "venta",
            "recepción",
            "mercancías robadas",
            "interestatal",
            "$5,000",
            "poseer"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2318",
        "citation": "18 U.S.C. § 2318",
        "sort_key": "018.02318.000",
        "category": "Federal Penal Code",
        "title_en": "Trafficking in Counterfeit Labels for Copyrighted Works",
        "title_es": "Tráfico de Etiquetas Falsificadas para Obras con Derechos de Autor",
        "description_en": "Trafficking in counterfeit labels, illicit labels, or counterfeit documentation or packaging for copyrighted works.",
        "description_es": "Traficar con etiquetas falsificadas, etiquetas ilícitas o documentación o empaques falsificados para obras con derechos de autor.",
        "keywords_en": [
            "counterfeit labels",
            "copyright",
            "trafficking",
            "intellectual property",
            "piracy"
        ],
        "keywords_es": [
            "etiquetas falsificadas",
            "derechos de autor",
            "tráfico",
            "propiedad intelectual",
            "piratería"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2319",
        "citation": "18 U.S.C. § 2319",
        "sort_key": "018.02319.000",
        "category": "Federal Penal Code",
        "title_en": "Criminal Infringement of a Copyright",
        "title_es": "Infracción Criminal de un Derecho de Autor",
        "description_en": "Willfully infringing a copyright for purposes of commercial advantage or private financial gain.",
        "description_es": "Infringir deliberadamente un derecho de autor con fines de ventaja comercial o ganancia financiera privada.",
        "keywords_en": [
            "copyright infringement",
            "criminal",
            "intellectual property",
            "piracy",
            "commercial advantage"
        ],
        "keywords_es": [
            "infracción de derechos de autor",
            "criminal",
            "propiedad intelectual",
            "piratería",
            "ventaja comercial"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2320",
        "citation": "18 U.S.C. § 2320",
        "sort_key": "018.02320.000",
        "category": "Federal Penal Code",
        "title_en": "Trafficking in Counterfeit Goods or Services",
        "title_es": "Tráfico de Bienes o Servicios Falsificados",
        "description_en": "Trafficking in goods or services knowing that such goods or services bear a counterfeit mark.",
        "description_es": "Traficar con bienes o servicios sabiendo que dichos bienes o servicios llevan una marca falsificada.",
        "keywords_en": [
            "counterfeit goods",
            "trafficking",
            "trademark",
            "intellectual property",
            "knockoffs"
        ],
        "keywords_es": [
            "bienes falsificados",
            "tráfico",
            "marca registrada",
            "propiedad intelectual",
            "imitaciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2321",
        "citation": "18 U.S.C. § 2321",
        "sort_key": "018.02321.000",
        "category": "Federal Penal Code",
        "title_en": "Trafficking in Certain Motor Vehicles or Motor Vehicle Parts",
        "title_es": "Tráfico de Ciertos Vehículos Motorizados o Partes de Vehículos Motorizados",
        "description_en": "Trafficking in counterfeit motor vehicles or motor vehicle parts.",
        "description_es": "Traficar con vehículos motorizados falsificados o partes de vehículos motorizados.",
        "keywords_en": [
            "counterfeit",
            "motor vehicles",
            "auto parts",
            "trafficking",
            "automotive"
        ],
        "keywords_es": [
            "falsificado",
            "vehículos motorizados",
            "partes de autos",
            "tráfico",
            "automotriz"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2322",
        "citation": "18 U.S.C. § 2322",
        "sort_key": "018.02322.000",
        "category": "Federal Penal Code",
        "title_en": "Trafficking in Counterfeit Labels for Computer Programs",
        "title_es": "Tráfico de Etiquetas Falsificadas para Programas de Computadora",
        "description_en": "Trafficking in counterfeit labels, documentation, or packaging for computer programs.",
        "description_es": "Traficar con etiquetas, documentación o empaques falsificados para programas de computadora.",
        "keywords_en": [
            "counterfeit labels",
            "computer programs",
            "software piracy",
            "packaging",
            "documentation"
        ],
        "keywords_es": [
            "etiquetas falsificadas",
            "programas de computadora",
            "piratería de software",
            "empaque",
            "documentación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2323",
        "citation": "18 U.S.C. § 2323",
        "sort_key": "018.02323.000",
        "category": "Federal Penal Code",
        "title_en": "Forfeiture, Destruction, and Restitution",
        "title_es": "Decomiso, Destrucción y Restitución",
        "description_en": "Forfeiture, destruction, and restitution for intellectual property offenses.",
        "description_es": "Decomiso, destrucción y restitución para delitos de propiedad intelectual.",
        "keywords_en": [
            "forfeiture",
            "destruction",
            "restitution",
            "intellectual property",
            "counterfeit"
        ],
        "keywords_es": [
            "decomiso",
            "destrucción",
            "restitución",
            "propiedad intelectual",
            "falsificado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2331",
        "citation": "18 U.S.C. § 2331",
        "sort_key": "018.02331.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Terrorism",
        "title_es": "Definiciones para Terrorismo",
        "description_en": "Definitions for international terrorism, domestic terrorism, terrorist activity, and other terms related to terrorism offenses.",
        "description_es": "Definiciones para terrorismo internacional, terrorismo doméstico, actividad terrorista y otros términos relacionados con delitos de terrorismo.",
        "keywords_en": [
            "terrorism",
            "definitions",
            "international terrorism",
            "domestic terrorism",
            "terrorist activity"
        ],
        "keywords_es": [
            "terrorismo",
            "definiciones",
            "terrorismo internacional",
            "terrorismo doméstico",
            "actividad terrorista"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2332",
        "citation": "18 U.S.C. § 2332",
        "sort_key": "018.02332.000",
        "category": "Federal Penal Code",
        "title_en": "Criminal Penalties for Terrorism",
        "title_es": "Penalidades Criminales para Terrorismo",
        "description_en": "Criminal penalties for terrorism offenses, including homicide, assault, and other violent acts.",
        "description_es": "Penalidades criminales para delitos de terrorismo, incluyendo homicidio, agresión y otros actos violentos.",
        "keywords_en": [
            "terrorism",
            "criminal penalties",
            "homicide",
            "assault",
            "violence"
        ],
        "keywords_es": [
            "terrorismo",
            "penalidades criminales",
            "homicidio",
            "agresión",
            "violencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2340",
        "citation": "18 U.S.C. § 2340",
        "sort_key": "018.02340.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Torture",
        "title_es": "Definiciones para Tortura",
        "description_en": "Definitions for torture, including severe pain or suffering, mental pain or suffering, and other terms.",
        "description_es": "Definiciones para tortura, incluyendo dolor o sufrimiento severo, dolor o sufrimiento mental y otros términos.",
        "keywords_en": [
            "torture",
            "definitions",
            "severe pain",
            "mental suffering",
            "cruel treatment"
        ],
        "keywords_es": [
            "tortura",
            "definiciones",
            "dolor severo",
            "sufrimiento mental",
            "trato cruel"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2381",
        "citation": "18 U.S.C. § 2381",
        "sort_key": "018.02381.000",
        "category": "Federal Penal Code",
        "title_en": "Treason",
        "title_es": "Traición",
        "description_en": "Levying war against the United States, or adhering to their enemies, giving them aid and comfort.",
        "description_es": "Levantar guerra contra Estados Unidos, o adherirse a sus enemigos, dándoles ayuda y comodidad.",
        "keywords_en": [
            "treason",
            "levying war",
            "enemies",
            "aid and comfort",
            "betrayal"
        ],
        "keywords_es": [
            "traición",
            "levantar guerra",
            "enemigos",
            "ayuda y comodidad",
            "traición"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2382",
        "citation": "18 U.S.C. § 2382",
        "sort_key": "018.02382.000",
        "category": "Federal Penal Code",
        "title_en": "Misprision of Treason",
        "title_es": "Encubrimiento de Traición",
        "description_en": "Having knowledge of the commission of treason and concealing and not making known the same to the President, a judge, or a governor.",
        "description_es": "Tener conocimiento de la comisión de traición y ocultar y no dar a conocer lo mismo al Presidente, un juez o un gobernador.",
        "keywords_en": [
            "misprision",
            "treason",
            "concealing",
            "knowledge",
            "failure to report"
        ],
        "keywords_es": [
            "encubrimiento",
            "traición",
            "ocultar",
            "conocimiento",
            "incumplimiento de reportar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2383",
        "citation": "18 U.S.C. § 2383",
        "sort_key": "018.02383.000",
        "category": "Federal Penal Code",
        "title_en": "Rebellion or Insurrection",
        "title_es": "Rebelión o Insurrección",
        "description_en": "Inciting, setting on foot, assisting, or engaging in any rebellion or insurrection against the authority of the United States or the laws thereof.",
        "description_es": "Incitar, iniciar, asistir o participar en cualquier rebelión o insurrección contra la autoridad de Estados Unidos o sus leyes.",
        "keywords_en": [
            "rebellion",
            "insurrection",
            "authority",
            "overthrow",
            "sedition"
        ],
        "keywords_es": [
            "rebelión",
            "insurrección",
            "autoridad",
            "derrocar",
            "sedicción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2384",
        "citation": "18 U.S.C. § 2384",
        "sort_key": "018.02384.000",
        "category": "Federal Penal Code",
        "title_en": "Seditious Conspiracy",
        "title_es": "Conspiración Sedicciosa",
        "description_en": "Conspiring to overthrow, put down, or destroy the government of the United States, or to prevent, hinder, or delay the execution of any law of the United States.",
        "description_es": "Conspirar para derrocar, deponer o destruir el gobierno de Estados Unidos, o para prevenir, obstaculizar o retrasar la ejecución de cualquier ley de Estados Unidos.",
        "keywords_en": [
            "seditious conspiracy",
            "overthrow",
            "government",
            "conspiracy",
            "sedition"
        ],
        "keywords_es": [
            "conspiración sedicciosa",
            "derrocar",
            "gobierno",
            "conspiración",
            "sedicción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2385",
        "citation": "18 U.S.C. § 2385",
        "sort_key": "018.02385.000",
        "category": "Federal Penal Code",
        "title_en": "Advocating Overthrow of Government",
        "title_es": "Abogar por el Derrocamiento del Gobierno",
        "description_en": "Knowingly or willfully advocating, abetting, advising, or teaching the duty, necessity, desirability, or propriety of overthrowing or destroying the government of the United States.",
        "description_es": "Abogar, ayudar, aconsejar o enseñar a sabiendas y deliberadamente el deber, necesidad, deseabilidad o conveniencia de derrocar o destruir el gobierno de Estados Unidos.",
        "keywords_en": [
            "advocating",
            "overthrow",
            "government",
            "teaching",
            "sedition"
        ],
        "keywords_es": [
            "abogar",
            "derrocar",
            "gobierno",
            "enseñar",
            "sedicción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2387",
        "citation": "18 U.S.C. § 2387",
        "sort_key": "018.02387.000",
        "category": "Federal Penal Code",
        "title_en": "Activities Affecting Armed Forces Generally",
        "title_es": "Actividades que Afectan a las Fuerzas Armadas Generalmente",
        "description_en": "Willfully causing or attempting to cause insubordination, disloyalty, mutiny, or refusal of duty in the armed forces.",
        "description_es": "Causar o intentar causar deliberadamente insubordinación, deslealtad, motín o negativa de deber en las fuerzas armadas.",
        "keywords_en": [
            "armed forces",
            "insubordination",
            "disloyalty",
            "mutiny",
            "refusal of duty"
        ],
        "keywords_es": [
            "fuerzas armadas",
            "insubordinación",
            "deslealtad",
            "motín",
            "negativa de deber"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2388",
        "citation": "18 U.S.C. § 2388",
        "sort_key": "018.02388.000",
        "category": "Federal Penal Code",
        "title_en": "Activities Affecting Armed Forces During War",
        "title_es": "Actividades que Afectan a las Fuerzas Armadas Durante la Guerra",
        "description_en": "Willfully causing or attempting to cause insubordination, disloyalty, mutiny, or refusal of duty in the armed forces during time of war.",
        "description_es": "Causar o intentar causar deliberadamente insubordinación, deslealtad, motín o negativa de deber en las fuerzas armadas durante tiempo de guerra.",
        "keywords_en": [
            "armed forces",
            "war",
            "insubordination",
            "mutiny",
            "disloyalty"
        ],
        "keywords_es": [
            "fuerzas armadas",
            "guerra",
            "insubordinación",
            "motín",
            "deslealtad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2389",
        "citation": "18 U.S.C. § 2389",
        "sort_key": "018.02389.000",
        "category": "Federal Penal Code",
        "title_en": "Recruiting for Service Against United States",
        "title_es": "Reclutamiento para Servicio Contra Estados Unidos",
        "description_en": "Recruiting soldiers or sailors to serve against the United States.",
        "description_es": "Reclutar soldados o marineros para servir contra Estados Unidos.",
        "keywords_en": [
            "recruiting",
            "service against",
            "soldiers",
            "sailors",
            "treason"
        ],
        "keywords_es": [
            "reclutamiento",
            "servicio contra",
            "soldados",
            "marineros",
            "traición"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2390",
        "citation": "18 U.S.C. § 2390",
        "sort_key": "018.02390.000",
        "category": "Federal Penal Code",
        "title_en": "Enlistment to Serve Against United States",
        "title_es": "Alistamiento para Servir Contra Estados Unidos",
        "description_en": "Enlisting or entering into any armed service to serve against the United States.",
        "description_es": "Alistarse o entrar en cualquier servicio armado para servir contra Estados Unidos.",
        "keywords_en": [
            "enlistment",
            "service against",
            "armed service",
            "treason",
            "military"
        ],
        "keywords_es": [
            "alistamiento",
            "servicio contra",
            "servicio armado",
            "traición",
            "militar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2421",
        "citation": "18 U.S.C. § 2421",
        "sort_key": "018.02421.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation for Illegal Sexual Activity and Related Crimes",
        "title_es": "Transporte para Actividad Sexual Ilegal y Delitos Relacionados",
        "description_en": "Transporting any individual in interstate or foreign commerce with intent that such individual engage in prostitution, or in any sexual activity for which any person can be charged with a criminal offense.",
        "description_es": "Transportar a cualquier individuo en comercio interestatal o extranjero con intención de que dicho individuo se involucre en prostitución, o en cualquier actividad sexual por la cual cualquier persona pueda ser acusada con un delito criminal.",
        "keywords_en": [
            "transportation",
            "illegal sexual activity",
            "prostitution",
            "interstate commerce",
            "Mann Act"
        ],
        "keywords_es": [
            "transporte",
            "actividad sexual ilegal",
            "prostitución",
            "comercio interestatal",
            "Ley Mann"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2422",
        "citation": "18 U.S.C. § 2422",
        "sort_key": "018.02422.000",
        "category": "Federal Penal Code",
        "title_en": "Coercion and Enticement",
        "title_es": "Coerción y Atracción",
        "description_en": "Knowingly persuading, inducing, enticing, or coercing any individual to travel in interstate or foreign commerce to engage in prostitution or any sexual activity for which any person can be charged with a criminal offense.",
        "description_es": "Persuadir, inducir, atraer o coaccionar a sabiendas a cualquier individuo a viajar en comercio interestatal o extranjero para participar en prostitución o cualquier actividad sexual por la cual cualquier persona pueda ser acusada con un delito criminal.",
        "keywords_en": [
            "coercion",
            "enticement",
            "prostitution",
            "interstate commerce",
            "persuading"
        ],
        "keywords_es": [
            "coerción",
            "atracción",
            "prostitución",
            "comercio interestatal",
            "persuadir"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2423",
        "citation": "18 U.S.C. § 2423",
        "sort_key": "018.02423.000",
        "category": "Federal Penal Code",
        "title_en": "Transportation of Minors",
        "title_es": "Transporte de Menores",
        "description_en": "Transporting a minor in interstate or foreign commerce with intent that the minor engage in prostitution or any sexual activity for which any person can be charged with a criminal offense.",
        "description_es": "Transportar a un menor en comercio interestatal o extranjero con intención de que el menor se involucre en prostitución o cualquier actividad sexual por la cual cualquier persona pueda ser acusada con un delito criminal.",
        "keywords_en": [
            "transportation",
            "minors",
            "child prostitution",
            "interstate commerce",
            "sexual activity"
        ],
        "keywords_es": [
            "transporte",
            "menores",
            "prostitución infantil",
            "comercio interestatal",
            "actividad sexual"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2424",
        "citation": "18 U.S.C. § 2424",
        "sort_key": "018.02424.000",
        "category": "Federal Penal Code",
        "title_en": "Filing Factual Statement About Alien Individual",
        "title_es": "Presentar Declaración Factual Sobre Individuo Extranjero",
        "description_en": "Filing a factual statement about an alien individual transported for prostitution or other immoral purposes.",
        "description_es": "Presentar una declaración factual sobre un individuo extranjero transportado para prostitución u otros propósitos inmorales.",
        "keywords_en": [
            "filing",
            "alien individual",
            "prostitution",
            "immoral purposes",
            "statement"
        ],
        "keywords_es": [
            "presentar",
            "individuo extranjero",
            "prostitución",
            "propósitos inmorales",
            "declaración"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2425",
        "citation": "18 U.S.C. § 2425",
        "sort_key": "018.02425.000",
        "category": "Federal Penal Code",
        "title_en": "Use of Interstate Facilities to Transmit Information About a Minor",
        "title_es": "Uso de Instalaciones Interestatales para Transmitir Información Sobre un Menor",
        "description_en": "Using the mail or any facility in interstate or foreign commerce to transmit information about a minor with intent to entice, encourage, offer, or solicit any person to engage in sexual activity with the minor.",
        "description_es": "Usar el correo o cualquier instalación en comercio interestatal o extranjero para transmitir información sobre un menor con intención de atraer, alentar, ofrecer o solicitar a cualquier persona a participar en actividad sexual con el menor.",
        "keywords_en": [
            "interstate facilities",
            "minor",
            "transmit information",
            "sexual activity",
            "internet"
        ],
        "keywords_es": [
            "instalaciones interestatales",
            "menor",
            "transmitir información",
            "actividad sexual",
            "internet"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2511",
        "citation": "18 U.S.C. § 2511",
        "sort_key": "018.02511.000",
        "category": "Federal Penal Code",
        "title_en": "Interception and Disclosure of Wire, Oral, or Electronic Communications",
        "title_es": "Intercepción y Divulgación de Comunicaciones por Cable, Oral o Electrónica",
        "description_en": "Intentionally intercepting, endeavoring to intercept, or procuring any other person to intercept any wire, oral, or electronic communication. Also prohibits disclosing or using the contents of any intercepted communication.",
        "description_es": "Interceptar intencionalmente, intentar interceptar, o procurar que cualquier otra persona intercepte cualquier comunicación por cable, oral o electrónica. También prohíbe divulgar o usar el contenido de cualquier comunicación interceptada.",
        "keywords_en": [
            "wiretapping",
            "interception",
            "electronic communications",
            "privacy",
            "surveillance"
        ],
        "keywords_es": [
            "intervención telefónica",
            "intercepción",
            "comunicaciones electrónicas",
            "privacidad",
            "vigilancia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2512",
        "citation": "18 U.S.C. § 2512",
        "sort_key": "018.02512.000",
        "category": "Federal Penal Code",
        "title_en": "Manufacture, Distribution, Possession of Intercepting Devices",
        "title_es": "Fabricación, Distribución, Posesión de Dispositivos de Intercepción",
        "description_en": "Manufacturing, distributing, possessing, or advertising devices primarily useful for the surreptitious interception of wire, oral, or electronic communications.",
        "description_es": "Fabricar, distribuir, poseer o anunciar dispositivos útiles principalmente para la interceptación subrepticia de comunicaciones por cable, oral o electrónica.",
        "keywords_en": [
            "intercepting devices",
            "wiretapping equipment",
            "surveillance",
            "bugs",
            "pen registers"
        ],
        "keywords_es": [
            "dispositivos de intercepción",
            "equipo de intervención telefónica",
            "vigilancia",
            "chicharras",
            "registros de llamadas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2701",
        "citation": "18 U.S.C. § 2701",
        "sort_key": "018.02701.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for Stored Communications Access (SCA)",
        "title_es": "Definiciones para Acceso a Comunicaciones Almacenadas (SCA)",
        "description_en": "Definitions for the Stored Communications Act, including electronic communication service, remote computing service, and other terms.",
        "description_es": "Definiciones para la Ley de Comunicaciones Almacenadas, incluyendo servicio de comunicación electrónica, servicio de computación remota y otros términos.",
        "keywords_en": [
            "SCA",
            "definitions",
            "stored communications",
            "electronic communication service",
            "ECS"
        ],
        "keywords_es": [
            "SCA",
            "definiciones",
            "comunicaciones almacenadas",
            "servicio de comunicación electrónica",
            "ECS"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2702",
        "citation": "18 U.S.C. § 2702",
        "sort_key": "018.02702.000",
        "category": "Federal Penal Code",
        "title_en": "Voluntary Disclosure of Customer Communications or Records",
        "title_es": "Divulgación Voluntaria de Comunicaciones o Registros de Clientes",
        "description_en": "Provisions regarding voluntary disclosure of customer communications or records by providers of electronic communication service or remote computing service.",
        "description_es": "Disposiciones respecto a la divulgación voluntaria de comunicaciones o registros de clientes por proveedores de servicio de comunicación electrónica o servicio de computación remota.",
        "keywords_en": [
            "voluntary disclosure",
            "customer communications",
            "records",
            "privacy",
            "service providers"
        ],
        "keywords_es": [
            "divulgación voluntaria",
            "comunicaciones de clientes",
            "registros",
            "privacidad",
            "proveedores de servicios"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2703",
        "citation": "18 U.S.C. § 2703",
        "sort_key": "018.02703.000",
        "category": "Federal Penal Code",
        "title_en": "Required Disclosure of Customer Communications or Records",
        "title_es": "Divulgación Requerida de Comunicaciones o Registros de Clientes",
        "description_en": "Requirements for governmental access to customer communications or records stored by providers of electronic communication service or remote computing service.",
        "description_es": "Requisitos para acceso gubernamental a comunicaciones o registros de clientes almacenados por proveedores de servicio de comunicación electrónica o servicio de computación remota.",
        "keywords_en": [
            "required disclosure",
            "customer communications",
            "government access",
            "warrant",
            "subpoena"
        ],
        "keywords_es": [
            "divulgación requerida",
            "comunicaciones de clientes",
            "acceso gubernamental",
            "orden",
            "citación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3146",
        "citation": "18 U.S.C. § 3146",
        "sort_key": "018.03146.000",
        "category": "Federal Penal Code",
        "title_en": "Penalty for Failure to Appear",
        "title_es": "Penalidad por Incumplimiento de Comparecencia",
        "description_en": "Knowingly failing to appear before any court or judicial officer as required after having been released from custody.",
        "description_es": "Incumplir a sabiendas de comparecer ante cualquier tribunal u oficial judicial según lo requerido después de haber sido liberado de custodia.",
        "keywords_en": [
            "failure to appear",
            "FTA",
            "court",
            "judicial officer",
            "bail jumping"
        ],
        "keywords_es": [
            "incumplimiento de comparecencia",
            "FTA",
            "tribunal",
            "oficial judicial",
            "fuga de fianza"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3147",
        "citation": "18 U.S.C. § 3147",
        "sort_key": "018.03147.000",
        "category": "Federal Penal Code",
        "title_en": "Penalty for an Offense Committed While on Release",
        "title_es": "Penalidad por un Delito Cometido Mientras Estaba en Libertad",
        "description_en": "Committing an offense while on release pending trial, sentencing, appeal, or correction of sentence.",
        "description_es": "Cometer un delito mientras está en libertad a la espera de juicio, sentencia, apelación o corrección de sentencia.",
        "keywords_en": [
            "offense while on release",
            "pending trial",
            "enhancement",
            "bail violation",
            "sentencing"
        ],
        "keywords_es": [
            "delito mientras en libertad",
            "a la espera de juicio",
            "agravante",
            "violación de fianza",
            "sentencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3161",
        "citation": "18 U.S.C. § 3161",
        "sort_key": "018.03161.000",
        "category": "Federal Penal Code",
        "title_en": "Speedy Trial Act",
        "title_es": "Ley de Juicio Rápido",
        "description_en": "Time limits for bringing a defendant to trial in federal criminal cases.",
        "description_es": "Límites de tiempo para llevar a un acusado a juicio en casos criminales federales.",
        "keywords_en": [
            "speedy trial",
            "time limits",
            "federal criminal",
            "defendant",
            "trial"
        ],
        "keywords_es": [
            "juicio rápido",
            "límites de tiempo",
            "criminal federal",
            "acusado",
            "juicio"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3282",
        "citation": "18 U.S.C. § 3282",
        "sort_key": "018.03282.000",
        "category": "Federal Penal Code",
        "title_en": "Offenses Not Capital - Statute of Limitations",
        "title_es": "Delitos No Capitales - Estatuto de Limitaciones",
        "description_en": "Except as otherwise expressly provided by law, no person shall be prosecuted, tried, or punished for any offense, not capital, unless the indictment is found or the information is instituted within five years next after such offense shall have been committed.",
        "description_es": "Excepto como de otro modo se dispone expresamente por ley, ninguna persona será enjuiciada, juzgada o castigada por cualquier delito, no capital, a menos que la acusación se encuentre o la información se instaure dentro de cinco años después de que dicho delito haya sido cometido.",
        "keywords_en": [
            "statute of limitations",
            "five years",
            "non-capital",
            "prosecution",
            "time limit"
        ],
        "keywords_es": [
            "estatuto de limitaciones",
            "cinco años",
            "no capital",
            "enjuiciamiento",
            "límite de tiempo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3283",
        "citation": "18 U.S.C. § 3283",
        "sort_key": "018.03283.000",
        "category": "Federal Penal Code",
        "title_en": "Offenses Against Children - Statute of Limitations",
        "title_es": "Delitos Contra Niños - Estatuto de Limitaciones",
        "description_en": "No statute of limitations for certain offenses against children, or extended limitations periods.",
        "description_es": "No hay estatuto de limitaciones para ciertos delitos contra niños, o períodos de limitación extendidos.",
        "keywords_en": [
            "statute of limitations",
            "children",
            "child abuse",
            "extended",
            "no limitation"
        ],
        "keywords_es": [
            "estatuto de limitaciones",
            "niños",
            "abuso infantil",
            "extendido",
            "sin limitación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3284",
        "citation": "18 U.S.C. § 3284",
        "sort_key": "018.03284.000",
        "category": "Federal Penal Code",
        "title_en": "Concealment of Bank Assets - Statute of Limitations",
        "title_es": "Ocultamiento de Activos Bancarios - Estatuto de Limitaciones",
        "description_en": "Statute of limitations for concealment of bank assets.",
        "description_es": "Estatuto de limitaciones para ocultamiento de activos bancarios.",
        "keywords_en": [
            "concealment",
            "bank assets",
            "statute of limitations",
            "fraud",
            "financial"
        ],
        "keywords_es": [
            "ocultamiento",
            "activos bancarios",
            "estatuto de limitaciones",
            "fraude",
            "financiero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3285",
        "citation": "18 U.S.C. § 3285",
        "sort_key": "018.03285.000",
        "category": "Federal Penal Code",
        "title_en": "Criminal Contempt - Statute of Limitations",
        "title_es": "Desacato Criminal - Estatuto de Limitaciones",
        "description_en": "Statute of limitations for criminal contempt.",
        "description_es": "Estatuto de limitaciones para desacato criminal.",
        "keywords_en": [
            "criminal contempt",
            "statute of limitations",
            "court",
            "violation",
            "disobedience"
        ],
        "keywords_es": [
            "desacato criminal",
            "estatuto de limitaciones",
            "tribunal",
            "violación",
            "desobediencia"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3286",
        "citation": "18 U.S.C. § 3286",
        "sort_key": "018.03286.000",
        "category": "Federal Penal Code",
        "title_en": "Extension of Statute of Limitations for Certain Terrorism Offenses",
        "title_es": "Extensión del Estatuto de Limitaciones para Ciertos Delitos de Terrorismo",
        "description_en": "Extended statute of limitations for certain terrorism offenses.",
        "description_es": "Estatuto de limitaciones extendido para ciertos delitos de terrorismo.",
        "keywords_en": [
            "statute of limitations",
            "terrorism",
            "extension",
            "eight years",
            "national security"
        ],
        "keywords_es": [
            "estatuto de limitaciones",
            "terrorismo",
            "extensión",
            "ocho años",
            "seguridad nacional"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3287",
        "citation": "18 U.S.C. § 3287",
        "sort_key": "018.03287.000",
        "category": "Federal Penal Code",
        "title_en": "Wartime Suspension of Limitations",
        "title_es": "Suspensión de Limitaciones en Tiempo de Guerra",
        "description_en": "Suspension of statute of limitations during time of war.",
        "description_es": "Suspensión del estatuto de limitaciones durante tiempo de guerra.",
        "keywords_en": [
            "wartime",
            "suspension",
            "statute of limitations",
            "war",
            "military"
        ],
        "keywords_es": [
            "tiempo de guerra",
            "suspensión",
            "estatuto de limitaciones",
            "guerra",
            "militar"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3293",
        "citation": "18 U.S.C. § 3293",
        "sort_key": "018.03293.000",
        "category": "Federal Penal Code",
        "title_en": "Financial Institution Fraud Offenses - Statute of Limitations",
        "title_es": "Delitos de Fraude de Instituciones Financieras - Estatuto de Limitaciones",
        "description_en": "Ten-year statute of limitations for certain financial institution fraud offenses.",
        "description_es": "Estatuto de limitaciones de diez años para ciertos delitos de fraude de instituciones financieras.",
        "keywords_en": [
            "financial institution fraud",
            "statute of limitations",
            "ten years",
            "bank fraud",
            "enhanced"
        ],
        "keywords_es": [
            "fraude de institución financiera",
            "estatuto de limitaciones",
            "diez años",
            "fraude bancario",
            "aumentado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3294",
        "citation": "18 U.S.C. § 3294",
        "sort_key": "018.03294.000",
        "category": "Federal Penal Code",
        "title_en": "Arson Offenses - Statute of Limitations",
        "title_es": "Delitos de Incendio Prendido - Estatuto de Limitaciones",
        "description_en": "Ten-year statute of limitations for arson offenses.",
        "description_es": "Estatuto de limitaciones de diez años para delitos de incendio prendido.",
        "keywords_en": [
            "arson",
            "statute of limitations",
            "ten years",
            "fire",
            "property damage"
        ],
        "keywords_es": [
            "incendio prendido",
            "estatuto de limitaciones",
            "diez años",
            "fuego",
            "daño a propiedad"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3295",
        "citation": "18 U.S.C. § 3295",
        "sort_key": "018.03295.000",
        "category": "Federal Penal Code",
        "title_en": "Sexual Offenses - Statute of Limitations",
        "title_es": "Delitos Sexuales - Estatuto de Limitaciones",
        "description_en": "Extended statute of limitations for certain sexual offenses.",
        "description_es": "Estatuto de limitaciones extendido para ciertos delitos sexuales.",
        "keywords_en": [
            "sexual offenses",
            "statute of limitations",
            "extended",
            "sexual abuse",
            "child exploitation"
        ],
        "keywords_es": [
            "delitos sexuales",
            "estatuto de limitaciones",
            "extendido",
            "abuso sexual",
            "explotación infantil"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3296",
        "citation": "18 U.S.C. § 3296",
        "sort_key": "018.03296.000",
        "category": "Federal Penal Code",
        "title_en": "Counting of Time During Which Defendant Is a Fugitive",
        "title_es": "Cuenta de Tiempo Durante el Cual el Acusado Es Fugitivo",
        "description_en": "Time during which a defendant is a fugitive shall not be counted toward the statute of limitations.",
        "description_es": "El tiempo durante el cual un acusado es fugitivo no se contará hacia el estatuto de limitaciones.",
        "keywords_en": [
            "fugitive",
            "statute of limitations",
            "tolling",
            "time counting",
            "evasion"
        ],
        "keywords_es": [
            "fugitivo",
            "estatuto de limitaciones",
            "suspensión",
            "cuenta de tiempo",
            "evasión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3551",
        "citation": "18 U.S.C. § 3551",
        "sort_key": "018.03551.000",
        "category": "Federal Penal Code",
        "title_en": "Authorized Sentences",
        "title_es": "Sentencias Autorizadas",
        "description_en": "Authorized sentences for federal criminal offenses, including probation, fine, and imprisonment.",
        "description_es": "Sentencias autorizadas para delitos criminales federales, incluyendo libertad condicional, multa y encarcelamiento.",
        "keywords_en": [
            "sentencing",
            "probation",
            "fine",
            "imprisonment",
            "federal criminal"
        ],
        "keywords_es": [
            "sentencia",
            "libertad condicional",
            "multa",
            "encarcelamiento",
            "criminal federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3553",
        "citation": "18 U.S.C. § 3553",
        "sort_key": "018.03553.000",
        "category": "Federal Penal Code",
        "title_en": "Imposition of a Sentence",
        "title_es": "Imposición de una Sentencia",
        "description_en": "Factors to be considered in imposing a sentence in federal criminal cases.",
        "description_es": "Factores a considerar al imponer una sentencia en casos criminales federales.",
        "keywords_en": [
            "sentencing",
            "factors",
            "guidelines",
            "federal criminal",
            "imposition"
        ],
        "keywords_es": [
            "sentencia",
            "factores",
            "guías",
            "criminal federal",
            "imposición"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3561",
        "citation": "18 U.S.C. § 3561",
        "sort_key": "018.03561.000",
        "category": "Federal Penal Code",
        "title_en": "Sentence of Probation",
        "title_es": "Sentencia de Libertad Condicional",
        "description_en": "Provisions regarding the imposition of probation sentences.",
        "description_es": "Disposiciones respecto a la imposición de sentencias de libertad condicional.",
        "keywords_en": [
            "probation",
            "sentencing",
            "supervision",
            "conditions",
            "federal criminal"
        ],
        "keywords_es": [
            "libertad condicional",
            "sentencia",
            "supervisión",
            "condiciones",
            "criminal federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3571",
        "citation": "18 U.S.C. § 3571",
        "sort_key": "018.03571.000",
        "category": "Federal Penal Code",
        "title_en": "Sentence of Fine",
        "title_es": "Sentencia de Multa",
        "description_en": "Provisions regarding the imposition of fines as sentences.",
        "description_es": "Disposiciones respecto a la imposición de multas como sentencias.",
        "keywords_en": [
            "fine",
            "sentencing",
            "monetary penalty",
            "federal criminal",
            "payment"
        ],
        "keywords_es": [
            "multa",
            "sentencia",
            "penalidad monetaria",
            "criminal federal",
            "pago"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3581",
        "citation": "18 U.S.C. § 3581",
        "sort_key": "018.03581.000",
        "category": "Federal Penal Code",
        "title_en": "Sentence of Imprisonment",
        "title_es": "Sentencia de Encarcelamiento",
        "description_en": "Provisions regarding the imposition of imprisonment sentences.",
        "description_es": "Disposiciones respecto a la imposición de sentencias de encarcelamiento.",
        "keywords_en": [
            "imprisonment",
            "sentencing",
            "incarceration",
            "prison",
            "federal criminal"
        ],
        "keywords_es": [
            "encarcelamiento",
            "sentencia",
            "encarcelación",
            "prisión",
            "criminal federal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3583",
        "citation": "18 U.S.C. § 3583",
        "sort_key": "018.03583.000",
        "category": "Federal Penal Code",
        "title_en": "Inclusion of a Term of Supervised Release After Imprisonment",
        "title_es": "Inclusión de un Término de Liberación Supervisada Después del Encarcelamiento",
        "description_en": "Provisions regarding supervised release following imprisonment.",
        "description_es": "Disposiciones respecto a la liberación supervisada después del encarcelamiento.",
        "keywords_en": [
            "supervised release",
            "parole",
            "post-imprisonment",
            "supervision",
            "conditions"
        ],
        "keywords_es": [
            "liberación supervisada",
            "libertad condicional",
            "post-encarcelamiento",
            "supervisión",
            "condiciones"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3591",
        "citation": "18 U.S.C. § 3591",
        "sort_key": "018.03591.000",
        "category": "Federal Penal Code",
        "title_en": "Sentence of Death",
        "title_es": "Sentencia de Muerte",
        "description_en": "Provisions regarding the imposition of the death penalty for certain federal offenses.",
        "description_es": "Disposiciones respecto a la imposición de la pena de muerte para ciertos delitos federales.",
        "keywords_en": [
            "death penalty",
            "capital punishment",
            "sentencing",
            "federal offenses",
            "execution"
        ],
        "keywords_es": [
            "pena de muerte",
            "castigo capital",
            "sentencia",
            "delitos federales",
            "ejecución"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3601",
        "citation": "18 U.S.C. § 3601",
        "sort_key": "018.03601.000",
        "category": "Federal Penal Code",
        "title_en": "Probation and Supervised Release Administration",
        "title_es": "Administración de Libertad Condicional y Liberación Supervisada",
        "description_en": "Administration of probation and supervised release by the court and probation officers.",
        "description_es": "Administración de libertad condicional y liberación supervisada por el tribunal y oficiales de libertad condicional.",
        "keywords_en": [
            "probation",
            "supervised release",
            "administration",
            "probation officers",
            "court"
        ],
        "keywords_es": [
            "libertad condicional",
            "liberación supervisada",
            "administración",
            "oficiales de libertad condicional",
            "tribunal"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3663",
        "citation": "18 U.S.C. § 3663",
        "sort_key": "018.03663.000",
        "category": "Federal Penal Code",
        "title_en": "Order of Restitution",
        "title_es": "Orden de Restitución",
        "description_en": "Ordering restitution to victims of federal offenses.",
        "description_es": "Ordenar restitución a víctimas de delitos federales.",
        "keywords_en": [
            "restitution",
            "victims",
            "compensation",
            "federal offenses",
            "payment"
        ],
        "keywords_es": [
            "restitución",
            "víctimas",
            "compensación",
            "delitos federales",
            "pago"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3664",
        "citation": "18 U.S.C. § 3664",
        "sort_key": "018.03664.000",
        "category": "Federal Penal Code",
        "title_en": "Procedure for Issuing Order of Restitution",
        "title_es": "Procedimiento para Emitir Orden de Restitución",
        "description_en": "Procedures for determining and issuing orders of restitution.",
        "description_es": "Procedimientos para determinar y emitir órdenes de restitución.",
        "keywords_en": [
            "restitution procedure",
            "hearing",
            "determination",
            "order",
            "victims"
        ],
        "keywords_es": [
            "procedimiento de restitución",
            "audiencia",
            "determinación",
            "orden",
            "víctimas"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3665",
        "citation": "18 U.S.C. § 3665",
        "sort_key": "018.03665.000",
        "category": "Federal Penal Code",
        "title_en": "Firearms; Property Taken or Used in Commission of Crime",
        "title_es": "Armas de Fuego; Propiedad Tomada o Usada en Comisión de Delito",
        "description_en": "Disposition of firearms and property taken or used in the commission of a crime.",
        "description_es": "Disposición de armas de fuego y propiedad tomada o usada en la comisión de un delito.",
        "keywords_en": [
            "firearms",
            "property",
            "commission of crime",
            "disposition",
            "forfeiture"
        ],
        "keywords_es": [
            "armas de fuego",
            "propiedad",
            "comisión de delito",
            "disposición",
            "decomiso"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3666",
        "citation": "18 U.S.C. § 3666",
        "sort_key": "018.03666.000",
        "category": "Federal Penal Code",
        "title_en": "Bribes and Other Unlawful Gifts",
        "title_es": "Sobornos y Otros Regalos Ilegales",
        "description_en": "Disposition of bribes and other unlawful gifts.",
        "description_es": "Disposición de sobornos y otros regalos ilegales.",
        "keywords_en": [
            "bribes",
            "unlawful gifts",
            "disposition",
            "forfeiture",
            "corruption"
        ],
        "keywords_es": [
            "sobornos",
            "regalos ilegales",
            "disposición",
            "decomiso",
            "corrupción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3667",
        "citation": "18 U.S.C. § 3667",
        "sort_key": "018.03667.000",
        "category": "Federal Penal Code",
        "title_en": "Firearms; Property Taken or Used in Commission of Crime",
        "title_es": "Armas de Fuego; Propiedad Tomada o Usada en Comisión de Delito",
        "description_en": "Disposition of firearms and property taken or used in commission of crime.",
        "description_es": "Disposición de armas de fuego y propiedad tomada o usada en comisión de delito.",
        "keywords_en": [
            "firearms",
            "property",
            "commission of crime",
            "disposition",
            "forfeiture"
        ],
        "keywords_es": [
            "armas de fuego",
            "propiedad",
            "comisión de delito",
            "disposición",
            "decomiso"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3668",
        "citation": "18 U.S.C. § 3668",
        "sort_key": "018.03668.000",
        "category": "Federal Penal Code",
        "title_en": "Remission or Mitigation of Forfeitures Under the Liquor Laws",
        "title_es": "Remisión o Mitigación de Decomisos Bajo las Leyes de Licores",
        "description_en": "Remission or mitigation of forfeitures under liquor laws.",
        "description_es": "Remisión o mitigación de decomisos bajo leyes de licores.",
        "keywords_en": [
            "remission",
            "mitigation",
            "forfeiture",
            "liquor laws",
            "alcohol"
        ],
        "keywords_es": [
            "remisión",
            "mitigación",
            "decomiso",
            "leyes de licores",
            "alcohol"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3669",
        "citation": "18 U.S.C. § 3669",
        "sort_key": "018.03669.000",
        "category": "Federal Penal Code",
        "title_en": "Conveyances Seized in Connection with Transportation of Contraband Liquor",
        "title_es": "Transportes Decomisados en Conexión con Transporte de Licor de Contrabando",
        "description_en": "Disposition of conveyances seized in connection with transportation of contraband liquor.",
        "description_es": "Disposición de transportes decomisados en conexión con transporte de licor de contrabando.",
        "keywords_en": [
            "conveyances",
            "seized",
            "contraband liquor",
            "transportation",
            "forfeiture"
        ],
        "keywords_es": [
            "transportes",
            "decomisados",
            "licor de contrabando",
            "transporte",
            "decomiso"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3671",
        "citation": "18 U.S.C. § 3671",
        "sort_key": "018.03671.000",
        "category": "Federal Penal Code",
        "title_en": "Vessels Carrying Explosives or Inflammable Liquids",
        "title_es": "Embarcaciones Transportando Explosivos o Líquidos Inflamables",
        "description_en": "Regulation of vessels carrying explosives or inflammable or combustible liquids.",
        "description_es": "Regulación de embarcaciones transportando explosivos o líquidos inflamables o combustibles.",
        "keywords_en": [
            "vessels",
            "explosives",
            "inflammable liquids",
            "combustible",
            "maritime safety"
        ],
        "keywords_es": [
            "embarcaciones",
            "explosivos",
            "líquidos inflamables",
            "combustibles",
            "seguridad marítima"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3731",
        "citation": "18 U.S.C. § 3731",
        "sort_key": "018.03731.000",
        "category": "Federal Penal Code",
        "title_en": "Appeals by United States",
        "title_es": "Apelaciones por Estados Unidos",
        "description_en": "Right of the United States to appeal from a district court in criminal cases.",
        "description_es": "Derecho de Estados Unidos de apelar de un tribunal de distrito en casos criminales.",
        "keywords_en": [
            "appeals",
            "United States",
            "criminal cases",
            "district court",
            "government appeal"
        ],
        "keywords_es": [
            "apelaciones",
            "Estados Unidos",
            "casos criminales",
            "tribunal de distrito",
            "apelación del gobierno"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3732",
        "citation": "18 U.S.C. § 3732",
        "sort_key": "018.03732.000",
        "category": "Federal Penal Code",
        "title_en": "Appeals by Defendants",
        "title_es": "Apelaciones por Acusados",
        "description_en": "Right of defendants to appeal in federal criminal cases.",
        "description_es": "Derecho de acusados de apelar en casos criminales federales.",
        "keywords_en": [
            "appeals",
            "defendants",
            "criminal cases",
            "appellate",
            "review"
        ],
        "keywords_es": [
            "apelaciones",
            "acusados",
            "casos criminales",
            "apelación",
            "revisión"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3742",
        "citation": "18 U.S.C. § 3742",
        "sort_key": "018.03742.000",
        "category": "Federal Penal Code",
        "title_en": "Review of a Sentence",
        "title_es": "Revisión de una Sentencia",
        "description_en": "Review of sentences by appellate courts.",
        "description_es": "Revisión de sentencias por tribunales de apelaciones.",
        "keywords_en": [
            "sentence review",
            "appellate",
            "sentencing",
            "appeal",
            "modification"
        ],
        "keywords_es": [
            "revisión de sentencia",
            "apelación",
            "sentencia",
            "apelación",
            "modificación"
        ],
        "verified": true
    },
    {
        "id": "usc-18-511A",
        "citation": "18 U.S.C. § 511A",
        "sort_key": "018.0511A.000",
        "category": "Federal Penal Code",
        "title_en": "Unauthorized Application of Theft Prevention Device or Protocol",
        "title_es": "Aplicación No Autorizada de Dispositivo o Protocolo de Prevención de Robo",
        "description_en": "Unauthorized application of theft prevention device or protocol to a motor vehicle or motor vehicle part.",
        "description_es": "Aplicación no autorizada de dispositivo o protocolo de prevención de roo a un vehículo motorizado o parte de vehículo motorizado.",
        "keywords_en": [
            "theft prevention",
            "device",
            "protocol",
            "unauthorized",
            "motor vehicle"
        ],
        "keywords_es": [
            "prevención de robo",
            "dispositivo",
            "protocolo",
            "no autorizado",
            "vehículo motorizado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1028A",
        "citation": "18 U.S.C. § 1028A",
        "sort_key": "018.1028A.000",
        "category": "Federal Penal Code",
        "title_en": "Aggravated Identity Theft",
        "title_es": "Robo de Identidad Agravado",
        "description_en": "Knowingly transferring, possessing, or using, without lawful authority, a means of identification of another person during and in relation to specified felony violations.",
        "description_es": "Transferir, poseer o usar a sabiendas, sin autoridad legal, un medio de identificación de otra persona durante y en relación con violaciones de delitos especificados.",
        "keywords_en": [
            "aggravated identity theft",
            "means of identification",
            "felony",
            "identity theft",
            "enhancement"
        ],
        "keywords_es": [
            "robo de identidad agravado",
            "medios de identificación",
            "delito grave",
            "robo de identidad",
            "agravante"
        ],
        "verified": true
    },
    {
        "id": "usc-18-1593A",
        "citation": "18 U.S.C. § 1593A",
        "sort_key": "018.1593A.000",
        "category": "Federal Penal Code",
        "title_en": "Benefitting Financially from Peonage, Slavery, and Trafficking in Persons",
        "title_es": "Beneficiarse Financieramente del Peonaje, Esclavitud y Tráfico de Personas",
        "description_en": "Benefitting financially from peonage, slavery, or trafficking in persons.",
        "description_es": "Beneficiarse financieramente del peonaje, esclavitud o tráfico de personas.",
        "keywords_en": [
            "benefitting",
            "financially",
            "peonage",
            "slavery",
            "trafficking",
            "proceeds"
        ],
        "keywords_es": [
            "beneficiarse",
            "financieramente",
            "peonaje",
            "esclavitud",
            "tráfico",
            "productos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2252A",
        "citation": "18 U.S.C. § 2252A",
        "sort_key": "018.2252A.000",
        "category": "Federal Penal Code",
        "title_en": "Certain Activities Relating to Material Constituting or Containing Child Pornography",
        "title_es": "Ciertas Actividades Relacionadas con Material que Constituya o Contenga Pornografía Infantil",
        "description_en": "Mailing, shipping, or transporting child pornography by any means, including by computer, or reproducing child pornography for distribution.",
        "description_es": "Enviar por correo, enviar o transportar pornografía infantil por cualquier medio, incluyendo por computadora, o reproducir pornografía infantil para distribución.",
        "keywords_en": [
            "child pornography",
            "mailing",
            "shipping",
            "computer",
            "distribution"
        ],
        "keywords_es": [
            "pornografía infantil",
            "enviar por correo",
            "enviar",
            "computadora",
            "distribución"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2261A",
        "citation": "18 U.S.C. § 2261A",
        "sort_key": "018.2261A.000",
        "category": "Federal Penal Code",
        "title_en": "Stalking",
        "title_es": "Acoso (Stalking)",
        "description_en": "Traveling in interstate or foreign commerce with intent to kill, injure, harass, or intimidate another person, or placing that person in reasonable fear of death or serious bodily injury to themselves or their immediate family, or to a spouse or intimate partner.",
        "description_es": "Viajar en comercio interestatal o extranjero con intención de matar, lesionar, acosar o intimidar a otra persona, o colocar a esa persona en temor razonable de muerte o lesiones corporales graves para ellos mismos o su familia inmediata, o para un cónyuge o pareja íntima.",
        "keywords_en": [
            "stalking",
            "harassment",
            "interstate commerce",
            "intimidation",
            "fear"
        ],
        "keywords_es": [
            "acoso",
            "hostigamiento",
            "comercio interestatal",
            "intimidación",
            "temor"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2319A",
        "citation": "18 U.S.C. § 2319A",
        "sort_key": "018.2319A.000",
        "category": "Federal Penal Code",
        "title_en": "Unauthorized Fixation and Trafficking in Sound Recordings and Music Videos",
        "title_es": "Fijación No Autorizada y Tráfico de Grabaciones de Sonido y Videos Musicales",
        "description_en": "Unauthorized fixation of and trafficking in sound recordings and music videos of live musical performances.",
        "description_es": "Fijación no autorizada y tráfico de grabaciones de sonido y videos musicales de presentaciones musicales en vivo.",
        "keywords_en": [
            "unauthorized fixation",
            "sound recordings",
            "music videos",
            "live performances",
            "bootleg"
        ],
        "keywords_es": [
            "fijación no autorizada",
            "grabaciones de sonido",
            "videos musicales",
            "presentaciones en vivo",
            "piratería"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2319B",
        "citation": "18 U.S.C. § 2319B",
        "sort_key": "018.2319B.000",
        "category": "Federal Penal Code",
        "title_en": "Unauthorized Recording of Motion Pictures in a Motion Picture Exhibition Facility",
        "title_es": "Grabación No Autorizada de Películas en Instalación de Exhibición de Películas",
        "description_en": "Using a audiovisual recording device to transmit or make a copy of a motion picture in a motion picture exhibition facility.",
        "description_es": "Usar un dispositivo de grabación audiovisual para transmitir o hacer una copia de una película en una instalación de exhibición de películas.",
        "keywords_en": [
            "unauthorized recording",
            "motion pictures",
            "theater",
            "camcording",
            "piracy"
        ],
        "keywords_es": [
            "grabación no autorizada",
            "películas",
            "cine",
            "grabación con cámara",
            "piratería"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2332a",
        "citation": "18 U.S.C. § 2332a",
        "sort_key": "018.2332a.000",
        "category": "Federal Penal Code",
        "title_en": "Use of Weapons of Mass Destruction",
        "title_es": "Uso de Armas de Destrucción Masiva",
        "description_en": "Using, threatening, or attempting or conspiring to use a weapon of mass destruction against any person or property within the United States.",
        "description_es": "Usar, amenazar, o intentar o conspirar para usar un arma de destrucción masiva contra cualquier persona o propiedad dentro de Estados Unidos.",
        "keywords_en": [
            "weapons of mass destruction",
            "WMD",
            "terrorism",
            "destruction",
            "explosives"
        ],
        "keywords_es": [
            "armas de destrucción masiva",
            "ADM",
            "terrorismo",
            "destrucción",
            "explosivos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2332b",
        "citation": "18 U.S.C. § 2332b",
        "sort_key": "018.2332b.000",
        "category": "Federal Penal Code",
        "title_en": "Acts of Terrorism Transcending National Boundaries",
        "title_es": "Actos de Terrorismo que Trascienden Fronteras Nacionales",
        "description_en": "Committing acts of terrorism that transcend national boundaries.",
        "description_es": "Cometer actos de terrorismo que trascienden fronteras nacionales.",
        "keywords_en": [
            "terrorism",
            "transnational",
            "international",
            "boundaries",
            "jurisdiction"
        ],
        "keywords_es": [
            "terrorismo",
            "transnacional",
            "internacional",
            "fronteras",
            "jurisdicción"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2332d",
        "citation": "18 U.S.C. § 2332d",
        "sort_key": "018.2332d.000",
        "category": "Federal Penal Code",
        "title_en": "Financial Transactions",
        "title_es": "Transacciones Financieras",
        "description_en": "Financial transactions related to terrorism offenses.",
        "description_es": "Transacciones financieras relacionadas con delitos de terrorismo.",
        "keywords_en": [
            "financial transactions",
            "terrorism",
            "funding",
            "terrorist financing",
            "money"
        ],
        "keywords_es": [
            "transacciones financieras",
            "terrorismo",
            "financiamiento",
            "financiamiento terrorista",
            "dinero"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2332f",
        "citation": "18 U.S.C. § 2332f",
        "sort_key": "018.2332f.000",
        "category": "Federal Penal Code",
        "title_en": "Bombings of Places of Public Use, Government Facilities, Public Transportation",
        "title_es": "Atentados con Bombas de Lugares de Uso Público, Instalaciones Gubernamentales, Transporte Público",
        "description_en": "Bombings of places of public use, government facilities, public transportation systems, and infrastructure facilities.",
        "description_es": "Atentados con bombas de lugares de uso público, instalaciones gubernamentales, sistemas de transporte público e instalaciones de infraestructura.",
        "keywords_en": [
            "bombings",
            "public places",
            "government facilities",
            "transportation",
            "terrorism"
        ],
        "keywords_es": [
            "atentados con bombas",
            "lugares públicos",
            "instalaciones gubernamentales",
            "transporte",
            "terrorismo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2332g",
        "citation": "18 U.S.C. § 2332g",
        "sort_key": "018.2332g.000",
        "category": "Federal Penal Code",
        "title_en": "Missile Systems Designed to Destroy Aircraft",
        "title_es": "Sistemas de Misiles Diseñados para Destruir Aeronaves",
        "description_en": "Using, threatening to use, or conspiring to use missile systems designed to destroy aircraft.",
        "description_es": "Usar, amenazar con usar, o conspirar para usar sistemas de misiles diseñados para destruir aeronaves.",
        "keywords_en": [
            "missile systems",
            "aircraft",
            "destruction",
            "terrorism",
            "MANPADS"
        ],
        "keywords_es": [
            "sistemas de misiles",
            "aeronaves",
            "destrucción",
            "terrorismo",
            "MANPADS"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2332h",
        "citation": "18 U.S.C. § 2332h",
        "sort_key": "018.2332h.000",
        "category": "Federal Penal Code",
        "title_en": "Radiological Dispersal Devices",
        "title_es": "Dispositivos de Dispersión Radiológica",
        "description_en": "Using, threatening to use, or conspiring to use radiological dispersal devices (dirty bombs).",
        "description_es": "Usar, amenazar con usar, o conspirar para usar dispositivos de dispersión radiológica (bombas sucias).",
        "keywords_en": [
            "radiological dispersal devices",
            "dirty bombs",
            "nuclear",
            "terrorism",
            "WMD"
        ],
        "keywords_es": [
            "dispositivos de dispersión radiológica",
            "bombas sucias",
            "nuclear",
            "terrorismo",
            "ADM"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2339A",
        "citation": "18 U.S.C. § 2339A",
        "sort_key": "018.2339A.000",
        "category": "Federal Penal Code",
        "title_en": "Providing Material Support to Terrorists",
        "title_es": "Proporcionar Apoyo Material a Terroristas",
        "description_en": "Providing material support or resources knowing or intending that they are to be used in preparation for, or in carrying out, a violation of certain terrorism offenses.",
        "description_es": "Proporcionar apoyo material o recursos sabiendo o pretendiendo que sean usados en preparación para, o en ejecución de, una violación de ciertos delitos de terrorismo.",
        "keywords_en": [
            "material support",
            "terrorists",
            "resources",
            "aiding",
            "terrorism"
        ],
        "keywords_es": [
            "apoyo material",
            "terroristas",
            "recursos",
            "ayudar",
            "terrorismo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2339B",
        "citation": "18 U.S.C. § 2339B",
        "sort_key": "018.2339B.000",
        "category": "Federal Penal Code",
        "title_en": "Providing Material Support to Designated Foreign Terrorist Organizations",
        "title_es": "Proporcionar Apoyo Material a Organizaciones Terroristas Extranjeras Designadas",
        "description_en": "Knowingly providing material support or resources to a foreign terrorist organization designated by the Secretary of State.",
        "description_es": "Proporcionar a sabiendas apoyo material o recursos a una organización terrorista extranjera designada por el Secretario de Estado.",
        "keywords_en": [
            "material support",
            "foreign terrorist organization",
            "FTO",
            "designated",
            "State Department"
        ],
        "keywords_es": [
            "apoyo material",
            "organización terrorista extranjera",
            "FTO",
            "designada",
            "Departamento de Estado"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2339C",
        "citation": "18 U.S.C. § 2339C",
        "sort_key": "018.2339C.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibitions Against the Financing of Terrorism",
        "title_es": "Prohibiciones Contra el Financiamiento del Terrorismo",
        "description_en": "Prohibitions against the financing of terrorism, including collecting or providing funds with the intention that they be used to carry out terrorist acts.",
        "description_es": "Prohibiciones contra el financiamiento del terrorismo, incluyendo recolectar o proporcionar fondos con la intención de que sean usados para llevar a cabo actos terroristas.",
        "keywords_en": [
            "financing terrorism",
            "funds",
            "terrorist acts",
            "money",
            "prohibition"
        ],
        "keywords_es": [
            "financiamiento del terrorismo",
            "fondos",
            "actos terroristas",
            "dinero",
            "prohibición"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2339D",
        "citation": "18 U.S.C. § 2339D",
        "sort_key": "018.2339D.000",
        "category": "Federal Penal Code",
        "title_en": "Receiving Military-Type Training from a Foreign Terrorist Organization",
        "title_es": "Recibir Entrenamiento Tipo Militar de una Organización Terrorista Extranjera",
        "description_en": "Receiving military-type training from or on behalf of a foreign terrorist organization.",
        "description_es": "Recibir entrenamiento tipo militar de o en nombre de una organización terrorista extranjera.",
        "keywords_en": [
            "military training",
            "foreign terrorist organization",
            "FTO",
            "training",
            "terrorism"
        ],
        "keywords_es": [
            "entrenamiento militar",
            "organización terrorista extranjera",
            "FTO",
            "entrenamiento",
            "terrorismo"
        ],
        "verified": true
    },
    {
        "id": "usc-18-2340A",
        "citation": "18 U.S.C. § 2340A",
        "sort_key": "018.2340A.000",
        "category": "Federal Penal Code",
        "title_en": "Torture",
        "title_es": "Tortura",
        "description_en": "Committing or attempting to commit torture outside the United States.",
        "description_es": "Cometer o intentar cometer tortura fuera de Estados Unidos.",
        "keywords_en": [
            "torture",
            "outside United States",
            "cruel treatment",
            "severe pain",
            "human rights"
        ],
        "keywords_es": [
            "tortura",
            "fuera de Estados Unidos",
            "trato cruel",
            "dolor severo",
            "derechos humanos"
        ],
        "verified": true
    },
    {
        "id": "usc-18-3663A",
        "citation": "18 U.S.C. § 3663A",
        "sort_key": "018.3663A.000",
        "category": "Federal Penal Code",
        "title_en": "Mandatory Restitution to Victims of Certain Crimes",
        "title_es": "Restitución Obligatoria a Víctimas de Ciertos Crímenes",
        "description_en": "Mandatory restitution to victims of certain specified federal crimes.",
        "description_es": "Restitución obligatoria a víctimas de ciertos crímenes federales especificados.",
        "keywords_en": [
            "mandatory restitution",
            "victims",
            "specified crimes",
            "compensation",
            "full amount"
        ],
        "keywords_es": [
            "restitución obligatoria",
            "víctimas",
            "crímenes especificados",
            "compensación",
            "monto completo"
        ],
        "verified": true
    },
    {
        "id": "usc-21-841",
        "citation": "21 U.S.C. § 841",
        "sort_key": "021.00841.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibited Acts A - Unlawful Manufacture, Distribution, or Dispensing",
        "title_es": "Actos Prohibidos A - Fabricación, Distribución o Dispensación Ilegal",
        "description_en": "Except as authorized by this subchapter, it shall be unlawful for any person knowingly or intentionally to manufacture, distribute, or dispense, or possess with intent to manufacture, distribute, or dispense, a controlled substance.",
        "description_es": "Excepto como autorizado por este subcapítulo, será ilegal para cualquier persona fabricar, distribuir o dispensar a sabiendas o intencionalmente, o poseer con intención de fabricar, distribuir o dispensar, una sustancia controlada.",
        "keywords_en": [
            "controlled substances",
            "manufacture",
            "distribution",
            "dispensing",
            "possession with intent",
            "CSA"
        ],
        "keywords_es": [
            "sustancias controladas",
            "fabricación",
            "distribución",
            "dispensación",
            "posesión con intención",
            "LSC"
        ],
        "verified": true
    },
    {
        "id": "usc-21-841b",
        "citation": "21 U.S.C. § 841(b)",
        "sort_key": "021.00841.b",
        "category": "Federal Penal Code",
        "title_en": "Penalties for Prohibited Acts - Controlled Substances",
        "title_es": "Penalidades para Actos Prohibidos - Sustancias Controladas",
        "description_en": "Penalties for violations of section 841(a), including mandatory minimum sentences based on drug type and quantity, prior convictions, and death or serious bodily injury resulting from the use of the substance distributed.",
        "description_es": "Penalidades por violaciones de la sección 841(a), incluyendo sentencias mínimas obligatorias basadas en tipo y cantidad de droga, condenas previas, y muerte o lesiones corporales graves resultantes del uso de la sustancia distribuida.",
        "keywords_en": [
            "penalties",
            "controlled substances",
            "mandatory minimum",
            "drug trafficking",
            "quantity-based"
        ],
        "keywords_es": [
            "penalidades",
            "sustancias controladas",
            "mínima obligatoria",
            "tráfico de drogas",
            "basado en cantidad"
        ],
        "verified": true
    },
    {
        "id": "usc-21-842",
        "citation": "21 U.S.C. § 842",
        "sort_key": "021.00842.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibited Acts B - Violations by Registrants",
        "title_es": "Actos Prohibidos B - Violaciones por Registrados",
        "description_en": "It shall be unlawful for any registrant to distribute or dispense a controlled substance in violation of section 841(b)(2), or to manufacture or distribute a controlled substance in a manner not authorized by his registration.",
        "description_es": "Será ilegal para cualquier registrado distribuir o dispensar una sustancia controlada en violación de la sección 841(b)(2), o fabricar o distribuir una sustancia controlada de una manera no autorizada por su registro.",
        "keywords_en": [
            "registrants",
            "violations",
            "controlled substances",
            "distribution",
            "unauthorized"
        ],
        "keywords_es": [
            "registrados",
            "violaciones",
            "sustancias controladas",
            "distribución",
            "no autorizado"
        ],
        "verified": true
    },
    {
        "id": "usc-21-843",
        "citation": "21 U.S.C. § 843",
        "sort_key": "021.00843.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibited Acts C - Fraudulent Prescriptions and Documentation",
        "title_es": "Actos Prohibidos C - Recetas y Documentación Fraudulentas",
        "description_en": "It shall be unlawful to acquire or obtain possession of a controlled substance by misrepresentation, fraud, forgery, deception, or subterfuge, or to furnish false or fraudulent material information in any prescription, order, report, or other document required by this subchapter.",
        "description_es": "Será ilegal adquirir u obtener posesión de una sustancia controlada por tergiversación, fraude, falsificación, engaño o subterfugio, o proporcionar información material falsa o fraudulenta en cualquier receta, orden, reporte u otro documento requerido por este subcapítulo.",
        "keywords_en": [
            "fraudulent prescriptions",
            "misrepresentation",
            "forgery",
            "controlled substances",
            "CSA"
        ],
        "keywords_es": [
            "recetas fraudulentas",
            "tergiversación",
            "falsificación",
            "sustancias controladas",
            "LSC"
        ],
        "verified": true
    },
    {
        "id": "usc-21-844",
        "citation": "21 U.S.C. § 844",
        "sort_key": "021.00844.000",
        "category": "Federal Penal Code",
        "title_en": "Penalties for Simple Possession",
        "title_es": "Penalidades por Posesión Simple",
        "description_en": "It shall be unlawful for any person knowingly or intentionally to possess a controlled substance unless such substance was obtained directly, or pursuant to a valid prescription or order, from a practitioner.",
        "description_es": "Será ilegal para cualquier persona poseer a sabiendas o intencionalmente una sustancia controlada a menos que dicha sustancia haya sido obtenida directamente, o conforme a una receta u orden válida, de un profesional.",
        "keywords_en": [
            "simple possession",
            "controlled substances",
            "personal use",
            "misdemeanor",
            "CSA"
        ],
        "keywords_es": [
            "posesión simple",
            "sustancias controladas",
            "uso personal",
            "delito menor",
            "LSC"
        ],
        "verified": true
    },
    {
        "id": "usc-21-845",
        "citation": "21 U.S.C. § 845",
        "sort_key": "021.00845.000",
        "category": "Federal Penal Code",
        "title_en": "Distribution to Persons Under Age Twenty-One",
        "title_es": "Distribución a Personas Menores de Veintiún Años",
        "description_en": "Any person who violates section 841(a)(1) by distributing a controlled substance to a person under twenty-one years of age is subject to twice the maximum punishment.",
        "description_es": "Cualquier persona que viole la sección 841(a)(1) distribuyendo una sustancia controlada a una persona menor de veintiún años está sujeta al doble del castigo máximo.",
        "keywords_en": [
            "distribution",
            "minors",
            "under 21",
            "enhanced penalties",
            "controlled substances"
        ],
        "keywords_es": [
            "distribución",
            "menores",
            "menos de 21",
            "penalidades aumentadas",
            "sustancias controladas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-846",
        "citation": "21 U.S.C. § 846",
        "sort_key": "021.00846.000",
        "category": "Federal Penal Code",
        "title_en": "Attempt and Conspiracy - Controlled Substances",
        "title_es": "Intento y Conspiración - Sustancias Controladas",
        "description_en": "Any person who attempts or conspires to commit any offense defined in this subchapter shall be subject to the same penalties as those prescribed for the offense, the commission of which was the object of the attempt or conspiracy.",
        "description_es": "Cualquier persona que intente o conspire cometer cualquier delito definido en este subcapítulo estará sujeta a las mismas penalidades que las prescritas para el delito, cuya comisión fue el objeto del intento o conspiración.",
        "keywords_en": [
            "attempt",
            "conspiracy",
            "controlled substances",
            "same penalties",
            "CSA"
        ],
        "keywords_es": [
            "intento",
            "conspiración",
            "sustancias controladas",
            "mismas penalidades",
            "LSC"
        ],
        "verified": true
    },
    {
        "id": "usc-21-848",
        "citation": "21 U.S.C. § 848",
        "sort_key": "021.00848.000",
        "category": "Federal Penal Code",
        "title_en": "Continuing Criminal Enterprise (Kingpin) - Controlled Substances",
        "title_es": "Empresa Criminal Continua (Capo) - Sustancias Controladas",
        "description_en": "Engaging in a continuing criminal enterprise involving controlled substances. A CCE is defined as a violation of 21 U.S.C. 841(a) that is part of a series of such violations undertaken in concert with five or more other persons with respect to whom the defendant occupies a position of organizer, supervisor, or manager.",
        "description_es": "Participar en una empresa criminal continua que involucre sustancias controladas. Una ECC se define como una violación de 21 U.S.C. 841(a) que es parte de una serie de tales violaciones emprendidas en concierto con cinco o más otras personas respecto a las cuales el acusado ocupa una posición de organizador, supervisor o gerente.",
        "keywords_en": [
            "continuing criminal enterprise",
            "CCE",
            "kingpin",
            "drug trafficking",
            "organizer"
        ],
        "keywords_es": [
            "empresa criminal continua",
            "ECC",
            "capo",
            "tráfico de drogas",
            "organizador"
        ],
        "verified": true
    },
    {
        "id": "usc-21-853",
        "citation": "21 U.S.C. § 853",
        "sort_key": "021.00853.000",
        "category": "Federal Penal Code",
        "title_en": "Criminal Forfeitures - Controlled Substances",
        "title_es": "Decomisos Criminales - Sustancias Controladas",
        "description_en": "Criminal forfeiture of property derived from or used in violation of the Controlled Substances Act, including proceeds, real property, and conveyances.",
        "description_es": "Decomiso criminal de propiedad derivada de o usada en violación de la Ley de Sustancias Controladas, incluyendo productos, propiedad real y transportes.",
        "keywords_en": [
            "criminal forfeiture",
            "controlled substances",
            "proceeds",
            "property",
            "CSA"
        ],
        "keywords_es": [
            "decomiso criminal",
            "sustancias controladas",
            "productos",
            "propiedad",
            "LSC"
        ],
        "verified": true
    },
    {
        "id": "usc-21-856",
        "citation": "21 U.S.C. § 856",
        "sort_key": "021.00856.000",
        "category": "Federal Penal Code",
        "title_en": "Maintaining Drug-Involved Premises (Crack House Statute)",
        "title_es": "Mantenimiento de Propiedades Involucradas con Drogas (Estatuto de Casa de Crack)",
        "description_en": "Knowingly opening, leasing, renting, using, or maintaining any place for the purpose of manufacturing, distributing, or using any controlled substance. Also prohibits managing or controlling any building, room, or enclosure as a storage facility or distribution hub for controlled substances.",
        "description_es": "Abrir, arrendar, alquilar, usar o mantener a sabiendas cualquier lugar con el propósito de fabricar, distribuir o usar cualquier sustancia controlada. También prohíbe manejar o controlar cualquier edificio, cuarto o recinto como instalación de almacenamiento o centro de distribución para sustancias controladas.",
        "keywords_en": [
            "drug house",
            "crack house",
            "maintaining premises",
            "controlled substances",
            "distribution hub"
        ],
        "keywords_es": [
            "casa de drogas",
            "casa de crack",
            "mantenimiento de propiedades",
            "sustancias controladas",
            "centro de distribución"
        ],
        "verified": true
    },
    {
        "id": "usc-21-859",
        "citation": "21 U.S.C. § 859",
        "sort_key": "021.00859.000",
        "category": "Federal Penal Code",
        "title_en": "Distribution to Persons Under Age Twenty-One",
        "title_es": "Distribución a Personas Menores de Veintiún Años",
        "description_en": "Distribution of controlled substances to persons under age twenty-one.",
        "description_es": "Distribución de sustancias controladas a personas menores de veintiún años.",
        "keywords_en": [
            "distribution",
            "minors",
            "under 21",
            "controlled substances",
            "enhanced penalties"
        ],
        "keywords_es": [
            "distribución",
            "menores",
            "menos de 21",
            "sustancias controladas",
            "penalidades aumentadas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-860",
        "citation": "21 U.S.C. § 860",
        "sort_key": "021.00860.000",
        "category": "Federal Penal Code",
        "title_en": "Distribution or Manufacturing in or Near Schools and Colleges",
        "title_es": "Distribución o Fabricación en o Cerca de Escuelas y Colegios",
        "description_en": "Distributing, manufacturing, or dispensing controlled substances in or within 1,000 feet of a school, college, or playground, or within 100 feet of a youth center, public swimming pool, or video arcade facility.",
        "description_es": "Distribuir, fabricar o dispensar sustancias controladas en o dentro de 1,000 pies de una escuela, colegio o parque de juegos, o dentro de 100 pies de un centro juvenil, piscina pública o instalación de videojuegos.",
        "keywords_en": [
            "school zone",
            "drug-free zone",
            "distribution",
            "manufacturing",
            "enhanced penalties"
        ],
        "keywords_es": [
            "zona escolar",
            "zona libre de drogas",
            "distribución",
            "fabricación",
            "penalidades aumentadas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-861",
        "citation": "21 U.S.C. § 861",
        "sort_key": "021.00861.000",
        "category": "Federal Penal Code",
        "title_en": "Employment or Use of Persons Under 18 Years of Age",
        "title_es": "Empleo o Uso de Personas Menores de 18 Años",
        "description_en": "Knowingly and intentionally employing, hiring, using, persuading, inducing, enticing, or coercing a person under 18 years of age to violate provisions of the Controlled Substances Act.",
        "description_es": "Emplear, contratar, usar, persuadir, inducir, atraer o coaccionar a sabiendas e intencionalmente a una persona menor de 18 años para violar disposiciones de la Ley de Sustancias Controladas.",
        "keywords_en": [
            "employment of minors",
            "under 18",
            "controlled substances",
            "coercion",
            "drug trafficking"
        ],
        "keywords_es": [
            "empleo de menores",
            "menos de 18",
            "sustancias controladas",
            "coerción",
            "tráfico de drogas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-863",
        "citation": "21 U.S.C. § 863",
        "sort_key": "021.00863.000",
        "category": "Federal Penal Code",
        "title_en": "Importation of Controlled Substances",
        "title_es": "Importación de Sustancias Controladas",
        "description_en": "Importing or exporting controlled substances in violation of the Controlled Substances Act.",
        "description_es": "Importar o exportar sustancias controladas en violación de la Ley de Sustancias Controladas.",
        "keywords_en": [
            "importation",
            "exportation",
            "controlled substances",
            "customs",
            "CSA"
        ],
        "keywords_es": [
            "importación",
            "exportación",
            "sustancias controladas",
            "aduanas",
            "LSC"
        ],
        "verified": true
    },
    {
        "id": "usc-21-952",
        "citation": "21 U.S.C. § 952",
        "sort_key": "021.00952.000",
        "category": "Federal Penal Code",
        "title_en": "Importation of Controlled Substances",
        "title_es": "Importación de Sustancias Controladas",
        "description_en": "It shall be unlawful to import into the customs territory of the United States from any place outside thereof, any controlled substance in schedule I or II of subchapter I, or any narcotic drug in schedule III or IV.",
        "description_es": "Será ilegal importar al territorio aduanero de Estados Unidos desde cualquier lugar fuera del mismo, cualquier sustancia controlada en la lista I o II del subcapítulo I, o cualquier droga narcótica en la lista III o IV.",
        "keywords_en": [
            "importation",
            "controlled substances",
            "schedule I",
            "schedule II",
            "narcotic drugs"
        ],
        "keywords_es": [
            "importación",
            "sustancias controladas",
            "lista I",
            "lista II",
            "drogas narcóticas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-953",
        "citation": "21 U.S.C. § 953",
        "sort_key": "021.00953.000",
        "category": "Federal Penal Code",
        "title_en": "Exportation of Controlled Substances",
        "title_es": "Exportación de Sustancias Controladas",
        "description_en": "It shall be unlawful to export from the United States any controlled substance in schedule I or II of subchapter I, or any narcotic drug in schedule III or IV.",
        "description_es": "Será ilegal exportar de Estados Unidos cualquier sustancia controlada en la lista I o II del subcapítulo I, o cualquier droga narcótica en la lista III o IV.",
        "keywords_en": [
            "exportation",
            "controlled substances",
            "schedule I",
            "schedule II",
            "narcotic drugs"
        ],
        "keywords_es": [
            "exportación",
            "sustancias controladas",
            "lista I",
            "lista II",
            "drogas narcóticas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-954",
        "citation": "21 U.S.C. § 954",
        "sort_key": "021.00954.000",
        "category": "Federal Penal Code",
        "title_en": "Transshipment and In-Transit Shipment of Controlled Substances",
        "title_es": "Transbordo y Envío en Tránsito de Sustancias Controladas",
        "description_en": "Transshipment and in-transit shipment of controlled substances through the United States.",
        "description_es": "Transbordo y envío en tránsito de sustancias controladas a través de Estados Unidos.",
        "keywords_en": [
            "transshipment",
            "in-transit",
            "controlled substances",
            "shipment",
            "customs"
        ],
        "keywords_es": [
            "transbordo",
            "en tránsito",
            "sustancias controladas",
            "envío",
            "aduanas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-955",
        "citation": "21 U.S.C. § 955",
        "sort_key": "021.00955.000",
        "category": "Federal Penal Code",
        "title_en": "Possession on Board Vessels, Etc.",
        "title_es": "Posesión a Bordo de Embarcaciones, Etc.",
        "description_en": "Possession of controlled substances on board vessels, aircraft, or vehicles entering or departing the United States.",
        "description_es": "Posesión de sustancias controladas a bordo de embarcaciones, aeronaves o vehículos que entran o salen de Estados Unidos.",
        "keywords_en": [
            "possession",
            "vessels",
            "aircraft",
            "controlled substances",
            "maritime"
        ],
        "keywords_es": [
            "posesión",
            "embarcaciones",
            "aeronaves",
            "sustancias controladas",
            "marítimo"
        ],
        "verified": true
    },
    {
        "id": "usc-21-959",
        "citation": "21 U.S.C. § 959",
        "sort_key": "021.00959.000",
        "category": "Federal Penal Code",
        "title_en": "Possession, Manufacture, or Distribution for Purpose of Unlawful Importation",
        "title_es": "Posesión, Fabricación o Distribución para Propósito de Importación Ilegal",
        "description_en": "Possession, manufacture, or distribution of controlled substances for the purpose of unlawful importation into the United States.",
        "description_es": "Posesión, fabricación o distribución de sustancias controladas con el propósito de importación ilegal a Estados Unidos.",
        "keywords_en": [
            "possession",
            "manufacture",
            "distribution",
            "unlawful importation",
            "controlled substances"
        ],
        "keywords_es": [
            "posesión",
            "fabricación",
            "distribución",
            "importación ilegal",
            "sustancias controladas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-960",
        "citation": "21 U.S.C. § 960",
        "sort_key": "021.00960.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibited Acts A - Importation and Exportation",
        "title_es": "Actos Prohibidos A - Importación y Exportación",
        "description_en": "Unlawful acts related to the importation and exportation of controlled substances.",
        "description_es": "Actos ilegales relacionados con la importación y exportación de sustancias controladas.",
        "keywords_en": [
            "importation",
            "exportation",
            "controlled substances",
            "prohibited acts",
            "CSA"
        ],
        "keywords_es": [
            "importación",
            "exportación",
            "sustancias controladas",
            "actos prohibidos",
            "LSC"
        ],
        "verified": true
    },
    {
        "id": "usc-21-961",
        "citation": "21 U.S.C. § 961",
        "sort_key": "021.00961.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibited Acts B - Violations by Registrants - Import/Export",
        "title_es": "Actos Prohibidos B - Violaciones por Registrados - Import/Export",
        "description_en": "Violations by registrants related to importation and exportation of controlled substances.",
        "description_es": "Violaciones por registrados relacionadas con la importación y exportación de sustancias controladas.",
        "keywords_en": [
            "registrants",
            "violations",
            "importation",
            "exportation",
            "controlled substances"
        ],
        "keywords_es": [
            "registrados",
            "violaciones",
            "importación",
            "exportación",
            "sustancias controladas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-962",
        "citation": "21 U.S.C. § 962",
        "sort_key": "021.00962.000",
        "category": "Federal Penal Code",
        "title_en": "Second or Subsequent Offenses - Import/Export",
        "title_es": "Segundos o Subsiguientes Delitos - Import/Export",
        "description_en": "Enhanced penalties for second or subsequent offenses involving importation or exportation of controlled substances.",
        "description_es": "Penalidades aumentadas para segundos o subsiguientes delitos que involucren importación o exportación de sustancias controladas.",
        "keywords_en": [
            "second offense",
            "subsequent offense",
            "enhanced penalties",
            "importation",
            "exportation"
        ],
        "keywords_es": [
            "segundo delito",
            "subsiguiente delito",
            "penalidades aumentadas",
            "importación",
            "exportación"
        ],
        "verified": true
    },
    {
        "id": "usc-21-963",
        "citation": "21 U.S.C. § 963",
        "sort_key": "021.00963.000",
        "category": "Federal Penal Code",
        "title_en": "Attempt and Conspiracy - Import/Export",
        "title_es": "Intento y Conspiración - Import/Export",
        "description_en": "Attempt and conspiracy to commit offenses related to importation and exportation of controlled substances.",
        "description_es": "Intento y conspiración para cometer delitos relacionados con importación y exportación de sustancias controladas.",
        "keywords_en": [
            "attempt",
            "conspiracy",
            "importation",
            "exportation",
            "controlled substances"
        ],
        "keywords_es": [
            "intento",
            "conspiración",
            "importación",
            "exportación",
            "sustancias controladas"
        ],
        "verified": true
    },
    {
        "id": "usc-21-844A",
        "citation": "21 U.S.C. § 844A",
        "sort_key": "021.0844A.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Penalty for Possession of Small Amounts",
        "title_es": "Penalidad Civil por Posesión de Pequeñas Cantidades",
        "description_en": "Civil penalty for possession of small amounts of certain controlled substances.",
        "description_es": "Penalidad civil por posesión de pequeñas cantidades de ciertas sustancias controladas.",
        "keywords_en": [
            "civil penalty",
            "small amounts",
            "controlled substances",
            "possession",
            "fine"
        ],
        "keywords_es": [
            "penalidad civil",
            "pequeñas cantidades",
            "sustancias controladas",
            "posesión",
            "multa"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5801",
        "citation": "26 U.S.C. § 5801",
        "sort_key": "026.05801.000",
        "category": "Federal Penal Code",
        "title_en": "Registration of Firearms (NFA)",
        "title_es": "Registro de Armas de Fuego (NFA)",
        "description_en": "Registration of firearms under the National Firearms Act (NFA), including machine guns, short-barreled rifles, short-barreled shotguns, silencers, destructive devices, and any other weapons (AOW). All NFA firearms must be registered in the National Firearms Registration and Transfer Record.",
        "description_es": "Registro de armas de fuego bajo la Ley Nacional de Armas de Fuego (NFA), incluyendo ametralladoras, rifles de cañón corto, escopetas de cañón corto, silenciadores, dispositivos destructivos y cualquier otra arma (AOW). Todas las armas NFA deben registrarse en el Registro Nacional de Armas de Fuego y Transferencia.",
        "keywords_en": [
            "NFA",
            "National Firearms Act",
            "registration",
            "machine gun",
            "silencer",
            "SBR",
            "SBS",
            "destructive device",
            "AOW"
        ],
        "keywords_es": [
            "NFA",
            "Ley Nacional de Armas",
            "registro",
            "ametralladora",
            "silenciador",
            "rifle de cañón corto",
            "escopeta de cañón corto",
            "dispositivo destructivo",
            "AOW"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5802",
        "citation": "26 U.S.C. § 5802",
        "sort_key": "026.05802.000",
        "category": "Federal Penal Code",
        "title_en": "Registration of Firearms - Manufacturers (NFA)",
        "title_es": "Registro de Armas de Fuego - Fabricantes (NFA)",
        "description_en": "Registration requirements for manufacturers of NFA firearms. Manufacturers must register and pay occupational tax.",
        "description_es": "Requisitos de registro para fabricantes de armas NFA. Los fabricantes deben registrarse y pagar impuesto ocupacional.",
        "keywords_en": [
            "NFA",
            "manufacturers",
            "registration",
            "occupational tax",
            "firearms manufacturing"
        ],
        "keywords_es": [
            "NFA",
            "fabricantes",
            "registro",
            "impuesto ocupacional",
            "fabricación de armas"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5803",
        "citation": "26 U.S.C. § 5803",
        "sort_key": "026.05803.000",
        "category": "Federal Penal Code",
        "title_en": "Registration of Firearms - Importers (NFA)",
        "title_es": "Registro de Armas de Fuego - Importadores (NFA)",
        "description_en": "Registration requirements for importers of NFA firearms. Importers must register and pay occupational tax.",
        "description_es": "Requisitos de registro para importadores de armas NFA. Los importadores deben registrarse y pagar impuesto ocupacional.",
        "keywords_en": [
            "NFA",
            "importers",
            "registration",
            "occupational tax",
            "firearms importation"
        ],
        "keywords_es": [
            "NFA",
            "importadores",
            "registro",
            "impuesto ocupacional",
            "importación de armas"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5804",
        "citation": "26 U.S.C. § 5804",
        "sort_key": "026.05804.000",
        "category": "Federal Penal Code",
        "title_en": "Registration of Firearms - Dealers (NFA)",
        "title_es": "Registro de Armas de Fuego - Distribuidores (NFA)",
        "description_en": "Registration requirements for dealers in NFA firearms. Dealers must register and pay occupational tax.",
        "description_es": "Requisitos de registro para distribuidores de armas NFA. Los distribuidores deben registrarse y pagar impuesto ocupacional.",
        "keywords_en": [
            "NFA",
            "dealers",
            "registration",
            "occupational tax",
            "firearms dealing"
        ],
        "keywords_es": [
            "NFA",
            "distribuidores",
            "registro",
            "impuesto ocupacional",
            "distribución de armas"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5811",
        "citation": "26 U.S.C. § 5811",
        "sort_key": "026.05811.000",
        "category": "Federal Penal Code",
        "title_en": "Transfer Tax (NFA)",
        "title_es": "Impuesto de Transferencia (NFA)",
        "description_en": "Transfer tax on NFA firearms. A tax is imposed on the transfer of NFA firearms, payable by the transferor. The tax rate is $200 for most NFA items (machine guns, silencers, SBRs, SBSs, destructive devices) and $5 for Any Other Weapons (AOW).",
        "description_es": "Impuesto de transferencia sobre armas NFA. Se impone un impuesto sobre la transferencia de armas NFA, pagadero por el transferente. La tasa impositiva es $200 para la mayoría de artículos NFA (ametralladoras, silenciadores, rifles de cañón corto, escopetas de cañón corto, dispositivos destructivos) y $5 para Cualquier Otra Arma (AOW).",
        "keywords_en": [
            "NFA",
            "transfer tax",
            "$200 tax",
            "$5 tax",
            "ATF Form 4",
            "stamp"
        ],
        "keywords_es": [
            "NFA",
            "impuesto de transferencia",
            "impuesto de $200",
            "impuesto de $5",
            "Formulario 4 ATF",
            "sello"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5812",
        "citation": "26 U.S.C. § 5812",
        "sort_key": "026.05812.000",
        "category": "Federal Penal Code",
        "title_en": "Transfer Tax Exemptions (NFA)",
        "title_es": "Exenciones de Impuesto de Transferencia (NFA)",
        "description_en": "Exemptions from the NFA transfer tax for certain transfers, including transfers to government agencies, transfers to museums, and transfers between licensed manufacturers, importers, and dealers.",
        "description_es": "Exenciones del impuesto de transferencia NFA para ciertas transferencias, incluyendo transferencias a agencias gubernamentales, transferencias a museos, y transferencias entre fabricantes, importadores y distribuidores licenciados.",
        "keywords_en": [
            "NFA",
            "transfer tax exemption",
            "government agencies",
            "museums",
            "licensed dealers"
        ],
        "keywords_es": [
            "NFA",
            "exención de impuesto de transferencia",
            "agencias gubernamentales",
            "museos",
            "distribuidores licenciados"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5821",
        "citation": "26 U.S.C. § 5821",
        "sort_key": "026.05821.000",
        "category": "Federal Penal Code",
        "title_en": "Making Tax (NFA)",
        "title_es": "Impuesto de Fabricación (NFA)",
        "description_en": "Making tax on NFA firearms. A tax is imposed on the making of NFA firearms, payable by the maker. The tax rate is $200 for most NFA items and $5 for AOW. Making includes manufacturing, putting together, altering, or producing.",
        "description_es": "Impuesto de fabricación sobre armas NFA. Se impone un impuesto sobre la fabricación de armas NFA, pagadero por el fabricante. La tasa impositiva es $200 para la mayoría de artículos NFA y $5 para AOW. Fabricar incluye manufacturar, ensamblar, alterar o producir.",
        "keywords_en": [
            "NFA",
            "making tax",
            "$200 tax",
            "$5 tax",
            "ATF Form 1",
            "manufacturing"
        ],
        "keywords_es": [
            "NFA",
            "impuesto de fabricación",
            "impuesto de $200",
            "impuesto de $5",
            "Formulario 1 ATF",
            "fabricación"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5822",
        "citation": "26 U.S.C. § 5822",
        "sort_key": "026.05822.000",
        "category": "Federal Penal Code",
        "title_en": "Making Tax Exemptions (NFA)",
        "title_es": "Exenciones de Impuesto de Fabricación (NFA)",
        "description_en": "Exemptions from the NFA making tax for certain makers, including government agencies and certain qualified manufacturers.",
        "description_es": "Exenciones del impuesto de fabricación NFA para ciertos fabricantes, incluyendo agencias gubernamentales y ciertos fabricantes calificados.",
        "keywords_en": [
            "NFA",
            "making tax exemption",
            "government agencies",
            "qualified manufacturers"
        ],
        "keywords_es": [
            "NFA",
            "exención de impuesto de fabricación",
            "agencias gubernamentales",
            "fabricantes calificados"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5841",
        "citation": "26 U.S.C. § 5841",
        "sort_key": "026.05841.000",
        "category": "Federal Penal Code",
        "title_en": "Registration of Firearms - General Requirements (NFA)",
        "title_es": "Registro de Armas de Fuego - Requisitos Generales (NFA)",
        "description_en": "General registration requirements for NFA firearms. Each firearm must be registered to the person who possesses it, and the registration must include identification of the firearm, the date of registration, and identification of the registrant.",
        "description_es": "Requisitos generales de registro para armas NFA. Cada arma debe registrarse a la persona que la posee, y el registro debe incluir identificación del arma, la fecha de registro e identificación del registrante.",
        "keywords_en": [
            "NFA",
            "registration requirements",
            "identification",
            "possessor",
            "NFRTR"
        ],
        "keywords_es": [
            "NFA",
            "requisitos de registro",
            "identificación",
            "poseedor",
            "NFRTR"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5844",
        "citation": "26 U.S.C. § 5844",
        "sort_key": "026.05844.000",
        "category": "Federal Penal Code",
        "title_en": "Importation of Firearms (NFA)",
        "title_es": "Importación de Armas de Fuego (NFA)",
        "description_en": "Importation of NFA firearms. No firearm shall be imported or brought into the United States unless the importer registers the firearm and pays the required tax. Importation also requires ATF approval and compliance with the Arms Export Control Act.",
        "description_es": "Importación de armas NFA. Ningún arma será importada o traída a Estados Unidos a menos que el importador registre el arma y pague el impuesto requerido. La importación también requiere aprobación de ATF y cumplimiento con la Ley de Control de Exportación de Armas.",
        "keywords_en": [
            "NFA",
            "importation",
            "ATF approval",
            "Arms Export Control Act",
            "customs"
        ],
        "keywords_es": [
            "NFA",
            "importación",
            "aprobación ATF",
            "Ley de Control de Exportación de Armas",
            "aduanas"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5845",
        "citation": "26 U.S.C. § 5845",
        "sort_key": "026.05845.000",
        "category": "Federal Penal Code",
        "title_en": "Definitions for NFA",
        "title_es": "Definiciones para NFA",
        "description_en": "Definitions for National Firearms Act terms, including: firearm, machine gun, rifle, shotgun, short-barreled rifle (SBR), short-barreled shotgun (SBS), silencer, destructive device, antique firearm, and any other weapon (AOW).",
        "description_es": "Definiciones para términos de la Ley Nacional de Armas de Fuego, incluyendo: arma de fuego, ametralladora, rifle, escopeta, rifle de cañón corto (SBR), escopeta de cañón corto (SBS), silenciador, dispositivo destructivo, arma de fuego antigua y cualquier otra arma (AOW).",
        "keywords_en": [
            "NFA",
            "definitions",
            "machine gun",
            "SBR",
            "SBS",
            "silencer",
            "destructive device",
            "AOW"
        ],
        "keywords_es": [
            "NFA",
            "definiciones",
            "ametralladora",
            "rifle de cañón corto",
            "escopeta de cañón corto",
            "silenciador",
            "dispositivo destructivo",
            "AOW"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5851",
        "citation": "26 U.S.C. § 5851",
        "sort_key": "026.05851.000",
        "category": "Federal Penal Code",
        "title_en": "Possession of Unregistered Firearms (NFA)",
        "title_es": "Posesión de Armas de Fuego No Registradas (NFA)",
        "description_en": "It shall be unlawful for any person to receive or possess a firearm which is not registered to him in the National Firearms Registration and Transfer Record. Possession of an unregistered NFA firearm is a felony punishable by up to 10 years imprisonment and/or $10,000 fine.",
        "description_es": "Será ilegal para cualquier persona recibir o poseer un arma de fuego que no esté registrada a su nombre en el Registro Nacional de Armas de Fuego y Transferencia. La posesión de un arma NFA no registrada es un delito grave castigable con hasta 10 años de encarcelamiento y/o multa de $10,000.",
        "keywords_en": [
            "NFA",
            "unregistered firearm",
            "possession",
            "felony",
            "NFRTR",
            "violation"
        ],
        "keywords_es": [
            "NFA",
            "arma no registrada",
            "posesión",
            "delito grave",
            "NFRTR",
            "violación"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5852",
        "citation": "26 U.S.C. § 5852",
        "sort_key": "026.05852.000",
        "category": "Federal Penal Code",
        "title_en": "General Exceptions and Exemptions (NFA)",
        "title_es": "Excepciones y Exenciones Generales (NFA)",
        "description_en": "General exceptions and exemptions from NFA requirements, including transfers to or by the United States, transfers to state governments, and certain temporary transfers.",
        "description_es": "Excepciones y exenciones generales de los requisitos NFA, incluyendo transferencias a o por Estados Unidos, transferencias a gobiernos estatales, y ciertas transferencias temporales.",
        "keywords_en": [
            "NFA",
            "exceptions",
            "exemptions",
            "government transfers",
            "temporary transfers"
        ],
        "keywords_es": [
            "NFA",
            "excepciones",
            "exenciones",
            "transferencias gubernamentales",
            "transferencias temporales"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5861",
        "citation": "26 U.S.C. § 5861",
        "sort_key": "026.05861.000",
        "category": "Federal Penal Code",
        "title_en": "Prohibited Acts - NFA Violations",
        "title_es": "Actos Prohibidos - Violaciones NFA",
        "description_en": "Prohibited acts under the NFA, including: engaging in business as an importer, manufacturer, or dealer without registration; receiving or possessing firearms not registered; receiving or possessing firearms made in violation of the NFA; receiving or possessing firearms on which the tax has not been paid; making or transferring firearms in violation of the NFA; and other violations.",
        "description_es": "Actos prohibidos bajo la NFA, incluyendo: dedicarse al negocio como importador, fabricante o distribuidor sin registro; recibir o poseer armas no registradas; recibir o poseer armas fabricadas en violación de la NFA; recibir o poseer armas sobre las cuales no se ha pagado el impuesto; fabricar o transferir armas en violación de la NFA; y otras violaciones.",
        "keywords_en": [
            "NFA",
            "prohibited acts",
            "violations",
            "unregistered",
            "unpaid tax",
            "business without registration"
        ],
        "keywords_es": [
            "NFA",
            "actos prohibidos",
            "violaciones",
            "no registrada",
            "impuesto no pagado",
            "negocio sin registro"
        ],
        "verified": true
    },
    {
        "id": "usc-26-5871",
        "citation": "26 U.S.C. § 5871",
        "sort_key": "026.05871.000",
        "category": "Federal Penal Code",
        "title_en": "Penalties for NFA Violations",
        "title_es": "Penalidades por Violaciones NFA",
        "description_en": "Penalties for violations of the National Firearms Act. Any person who violates or fails to comply with any provision of this chapter shall be fined up to $10,000, or imprisoned not more than 10 years, or both. The firearm involved is subject to seizure and forfeiture.",
        "description_es": "Penalidades por violaciones de la Ley Nacional de Armas de Fuego. Cualquier persona que viole o incumpla con cualquier disposición de este capítulo será multada hasta $10,000, o encarcelada no más de 10 años, o ambas. El arma involucrada está sujeta a decomiso.",
        "keywords_en": [
            "NFA",
            "penalties",
            "$10,000 fine",
            "10 years imprisonment",
            "forfeiture",
            "violation"
        ],
        "keywords_es": [
            "NFA",
            "penalidades",
            "multa de $10,000",
            "10 años de encarcelamiento",
            "decomiso",
            "violación"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7201",
        "citation": "26 U.S.C. § 7201",
        "sort_key": "026.07201.000",
        "category": "Federal Penal Code",
        "title_en": "Attempt to Evade or Defeat Tax",
        "title_es": "Intento de Evadir o Derrotar Impuesto",
        "description_en": "Willfully attempting in any manner to evade or defeat any tax imposed by this title or the payment thereof. This is a felony punishable by a fine of up to $100,000 ($500,000 for corporations), imprisonment up to 5 years, or both, plus costs of prosecution.",
        "description_es": "Intentar deliberadamente de cualquier manera evadir o derrotar cualquier impuesto impuesto por este título o el pago del mismo. Esto es un delito grave castigable con multa de hasta $100,000 ($500,000 para corporaciones), encarcelamiento hasta 5 años, o ambos, más costos de enjuiciamiento.",
        "keywords_en": [
            "tax evasion",
            "willful",
            "felony",
            "defeat tax",
            "Internal Revenue Code"
        ],
        "keywords_es": [
            "evasión fiscal",
            "deliberado",
            "delito grave",
            "derrotar impuesto",
            "Código de Rentas Internas"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7202",
        "citation": "26 U.S.C. § 7202",
        "sort_key": "026.07202.000",
        "category": "Federal Penal Code",
        "title_en": "Willful Failure to Collect or Pay Over Tax",
        "title_es": "Incumplimiento Deliberado de Recaudar o Pagar Impuesto",
        "description_en": "Willfully failing to collect, account for, and pay over any tax imposed by this title. This is a felony punishable by fine up to $10,000, imprisonment up to 5 years, or both, plus costs of prosecution.",
        "description_es": "Incumplir deliberadamente en recaudar, dar cuenta y pagar cualquier impuesto impuesto por este título. Esto es un delito grave castigable con multa hasta $10,000, encarcelamiento hasta 5 años, o ambos, más costos de enjuiciamiento.",
        "keywords_en": [
            "failure to pay tax",
            "willful",
            "employment taxes",
            "withholding",
            "felony"
        ],
        "keywords_es": [
            "incumplimiento de pago de impuestos",
            "deliberado",
            "impuestos de empleo",
            "retención",
            "delito grave"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7203",
        "citation": "26 U.S.C. § 7203",
        "sort_key": "026.07203.000",
        "category": "Federal Penal Code",
        "title_en": "Willful Failure to File Return, Supply Information, or Pay Tax",
        "title_es": "Incumplimiento Deliberado de Presentar Declaración, Suministrar Información o Pagar Impuesto",
        "description_en": "Willfully failing to file any return, keep any records, or supply any information required by this title at the time or times required by law or regulations, or willfully paying estimated tax or tax. This is a misdemeanor punishable by fine up to $25,000 ($100,000 for corporations), imprisonment up to 1 year, or both, plus costs of prosecution.",
        "description_es": "Incumplir deliberadamente en presentar cualquier declaración, mantener cualquier registro, o suministrar cualquier información requerida por este título en el tiempo o tiempos requeridos por ley o regulaciones, o pagar deliberadamente impuesto estimado o impuesto. Esto es un delito menor castigable con multa hasta $25,000 ($100,000 para corporaciones), encarcelamiento hasta 1 año, o ambos, más costos de enjuiciamiento.",
        "keywords_en": [
            "failure to file",
            "willful",
            "tax return",
            "misdemeanor",
            "non-filing"
        ],
        "keywords_es": [
            "incumplimiento de presentar",
            "deliberado",
            "declaración de impuestos",
            "delito menor",
            "no presentación"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7206",
        "citation": "26 U.S.C. § 7206",
        "sort_key": "026.07206.000",
        "category": "Federal Penal Code",
        "title_en": "Fraud and False Statements",
        "title_es": "Fraude y Declaraciones Falsas",
        "description_en": "Willfully making and subscribing any return, statement, or other document which contains or is verified by a written declaration that it is made under the penalties of perjury, and which the person does not believe to be true and correct as to every material matter. This is a felony punishable by fine up to $100,000 ($500,000 for corporations), imprisonment up to 3 years, or both, plus costs of prosecution.",
        "description_es": "Hacer y suscribir deliberadamente cualquier declaración, estado u otro documento que contenga o sea verificado por una declaración escrita de que se hace bajo pena de perjurio, y que la persona no cree ser verdadero y correcto en cuanto a cada asunto material. Esto es un delito grave castigable con multa hasta $100,000 ($500,000 para corporaciones), encarcelamiento hasta 3 años, o ambos, más costos de enjuiciamiento.",
        "keywords_en": [
            "tax fraud",
            "false statements",
            "perjury",
            "felony",
            "material matter"
        ],
        "keywords_es": [
            "fraude fiscal",
            "declaraciones falsas",
            "perjurio",
            "delito grave",
            "asunto material"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7207",
        "citation": "26 U.S.C. § 7207",
        "sort_key": "026.07207.000",
        "category": "Federal Penal Code",
        "title_en": "Fraudulent Returns, Statements, or Other Documents",
        "title_es": "Declaraciones, Estados u Otros Documentos Fraudulentos",
        "description_en": "Willfully delivering or disclosing to the Secretary any list, return, account, statement, or other document known by the person to be fraudulent or false as to any material matter. This is a misdemeanor punishable by fine up to $10,000 ($50,000 for corporations), imprisonment up to 1 year, or both.",
        "description_es": "Entregar o divulgar deliberadamente al Secretario cualquier lista, declaración, cuenta, estado u otro documento conocido por la persona como fraudulento o falso en cuanto a cualquier asunto material. Esto es un delito menor castigable con multa hasta $10,000 ($50,000 para corporaciones), encarcelamiento hasta 1 año, o ambos.",
        "keywords_en": [
            "fraudulent documents",
            "false returns",
            "misdemeanor",
            "tax fraud",
            "material matter"
        ],
        "keywords_es": [
            "documentos fraudulentos",
            "declaraciones falsas",
            "delito menor",
            "fraude fiscal",
            "asunto material"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7210",
        "citation": "26 U.S.C. § 7210",
        "sort_key": "026.07210.000",
        "category": "Federal Penal Code",
        "title_en": "Failure to Obey Summons",
        "title_es": "Incumplimiento de Obedecer Citación",
        "description_en": "Willfully failing to obey a summons issued under authority of this title to appear, testify, or produce books and records. This is punishable by fine up to $1,000, imprisonment up to 1 year, or both, plus costs of prosecution.",
        "description_es": "Incumplir deliberadamente en obedecer una citación emitida bajo autoridad de este título para comparecer, testificar o producir libros y registros. Esto es castigable con multa hasta $1,000, encarcelamiento hasta 1 año, o ambos, más costos de enjuiciamiento.",
        "keywords_en": [
            "failure to obey",
            "summons",
            "IRS",
            "testimony",
            "records"
        ],
        "keywords_es": [
            "incumplimiento de obedecer",
            "citación",
            "IRS",
            "testimonio",
            "registros"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7212",
        "citation": "26 U.S.C. § 7212",
        "sort_key": "026.07212.000",
        "category": "Federal Penal Code",
        "title_en": "Attempts to Interfere with Administration of Internal Revenue Laws",
        "title_es": "Intentos de Interferir con la Administración de Leyes de Rentas Internas",
        "description_en": "Corruptly or by force or threats of force endeavoring to obstruct or impede the due administration of this title, or forcibly rescuing or causing the rescue of any property after it has been seized under this title. This is a felony punishable by fine up to $5,000, imprisonment up to 3 years, or both.",
        "description_es": "Intentar corruptamente o por fuerza o amenazas de fuerza obstruir o impedir la debida administración de este título, o rescatar forzosamente o causar el rescate de cualquier propiedad después de que ha sido decomisada bajo este título. Esto es un delito grave castigable con multa hasta $5,000, encarcelamiento hasta 3 años, o ambos.",
        "keywords_en": [
            "interference",
            "IRS",
            "obstruction",
            "corruptly",
            "force",
            "rescuing property"
        ],
        "keywords_es": [
            "interferencia",
            "IRS",
            "obstrucción",
            "corruptamente",
            "fuerza",
            "rescate de propiedad"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7214",
        "citation": "26 U.S.C. § 7214",
        "sort_key": "026.07214.000",
        "category": "Federal Penal Code",
        "title_en": "Offenses by Officers and Employees of the United States",
        "title_es": "Delitos por Oficiales y Empleados de Estados Unidos",
        "description_en": "Offenses committed by IRS officers and employees, including extortion, willful oppression under color of law, and demanding payment for services not rendered. This is a felony punishable by fine up to $10,000, imprisonment up to 5 years, or both.",
        "description_es": "Delitos cometidos por oficiales y empleados del IRS, incluyendo extorsión, opresión deliberada bajo color de ley, y exigir pago por servicios no prestados. Esto es un delito grave castigable con multa hasta $10,000, encarcelamiento hasta 5 años, o ambos.",
        "keywords_en": [
            "IRS officers",
            "extortion",
            "oppression",
            "color of law",
            "federal employees"
        ],
        "keywords_es": [
            "oficiales del IRS",
            "extorsión",
            "opresión",
            "color de ley",
            "empleados federales"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7216",
        "citation": "26 U.S.C. § 7216",
        "sort_key": "026.07216.000",
        "category": "Federal Penal Code",
        "title_en": "Disclosure or Use of Information by Preparers of Returns",
        "title_es": "Divulgación o Uso de Información por Preparadores de Declaraciones",
        "description_en": "Disclosure or use of information by tax return preparers. Tax return preparers are prohibited from disclosing or using information furnished in connection with the preparation of a tax return, except as expressly permitted.",
        "description_es": "Divulgación o uso de información por preparadores de declaraciones de impuestos. Los preparadores de declaraciones de impuestos están prohibidos de divulgar o usar información proporcionada en conexión con la preparación de una declaración de impuestos, excepto como expresamente permitido.",
        "keywords_en": [
            "tax preparers",
            "disclosure",
            "privacy",
            "confidentiality",
            "return information"
        ],
        "keywords_es": [
            "preparadores de impuestos",
            "divulgación",
            "privacidad",
            "confidencialidad",
            "información de declaración"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7342",
        "citation": "26 U.S.C. § 7342",
        "sort_key": "026.07342.000",
        "category": "Federal Penal Code",
        "title_en": "Penalty for Refusal to Permit Entry or Inspection",
        "title_es": "Penalidad por Negativa de Permitir Entrada o Inspección",
        "description_en": "Refusing to admit any officer or employee of the Treasury Department acting under authority of this title, or refusing to permit inspection of books and records. This is punishable by fine of up to $1,000, imprisonment up to 1 year, or both.",
        "description_es": "Negarse a admitir a cualquier oficial o empleado del Departamento del Tesoro actuando bajo autoridad de este título, o negarse a permitir inspección de libros y registros. Esto es castigable con multa de hasta $1,000, encarcelamiento hasta 1 año, o ambos.",
        "keywords_en": [
            "refusal",
            "inspection",
            "books and records",
            "Treasury Department",
            "IRS"
        ],
        "keywords_es": [
            "negativa",
            "inspección",
            "libros y registros",
            "Departamento del Tesoro",
            "IRS"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7431",
        "citation": "26 U.S.C. § 7431",
        "sort_key": "026.07431.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Damages for Unauthorized Disclosure of Returns and Return Information",
        "title_es": "Daños Civiles por Divulgación No Autorizada de Declaraciones e Información de Declaración",
        "description_en": "Civil damages for unauthorized disclosure of returns and return information by IRS officers or employees. Damages may include actual damages plus punitive damages, and costs of the action.",
        "description_es": "Daños civiles por divulgación no autorizada de declaraciones e información de declaración por oficiales o empleados del IRS. Los daños pueden incluir daños reales más daños punitivos, y costos de la acción.",
        "keywords_en": [
            "civil damages",
            "unauthorized disclosure",
            "IRS",
            "privacy",
            "return information"
        ],
        "keywords_es": [
            "daños civiles",
            "divulgación no autorizada",
            "IRS",
            "privacidad",
            "información de declaración"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7432",
        "citation": "26 U.S.C. § 7432",
        "sort_key": "026.07432.000",
        "category": "Federal Penal Code",
        "title_en": "Civil Damages for Failure to Release Lien",
        "title_es": "Daños Civiles por Incumplimiento de Liberar Gravamen",
        "description_en": "Civil damages for failure to release a tax lien after the liability has been satisfied or has become unenforceable.",
        "description_es": "Daños civiles por incumplimiento de liberar un gravamen fiscal después de que la responsabilidad ha sido satisfecha o se ha vuelto inaplicable.",
        "keywords_en": [
            "civil damages",
            "tax lien",
            "failure to release",
            "IRS",
            "property"
        ],
        "keywords_es": [
            "daños civiles",
            "gravamen fiscal",
            "incumplimiento de liberar",
            "IRS",
            "propiedad"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7608",
        "citation": "26 U.S.C. § 7608",
        "sort_key": "026.07608.000",
        "category": "Federal Penal Code",
        "title_en": "Authority of Internal Revenue Enforcement Officers",
        "title_es": "Autoridad de Oficiales de Aplicación de Rentas Internas",
        "description_en": "Authority of Internal Revenue enforcement officers to carry firearms, execute and serve search warrants and arrest warrants, and make arrests without warrant for offenses against the United States committed in their presence.",
        "description_es": "Autoridad de oficiales de aplicación de rentas internas para portar armas de fuego, ejecutar y servir órdenes de registro y órdenes de arresto, y hacer arrestos sin ordena por delitos contra Estados Unidos cometidos en su presencia.",
        "keywords_en": [
            "IRS",
            "enforcement officers",
            "firearms",
            "arrest authority",
            "search warrants"
        ],
        "keywords_es": [
            "IRS",
            "oficiales de aplicación",
            "armas de fuego",
            "autoridad de arresto",
            "órdenes de registro"
        ],
        "verified": true
    },
    {
        "id": "usc-26-7609",
        "citation": "26 U.S.C. § 7609",
        "sort_key": "026.07609.000",
        "category": "Federal Penal Code",
        "title_en": "Special Procedures for Third-Party Summonses",
        "title_es": "Procedimientos Especiales para Citaciones a Terceros",
        "description_en": "Special procedures for third-party summonses issued by the IRS to obtain information about a taxpayer from third parties such as banks, employers, and financial institutions.",
        "description_es": "Procedimientos especiales para citaciones a terceros emitidas por el IRS para obtener información sobre un contribuyente de terceros como bancos, empleadores e instituciones financieras.",
        "keywords_en": [
            "third-party summons",
            "IRS",
            "bank records",
            "financial records",
            "notification"
        ],
        "keywords_es": [
            "citación a terceros",
            "IRS",
            "registros bancarios",
            "registros financieros",
            "notificación"
        ],
        "verified": true
    }
];


// ============================================
// PR PENAL CODE - PUERTO RICO PENAL CODE
// Código Penal de Puerto Rico (33 L.P.R.A.)
// Artículos 92-300 con sub-artículos
// ============================================
const prPenalCodeStatutes = [
    {
        "id": "pr-penal-92",
        "article_number": "92",
        "citation": "33 L.P.R.A. § 5141",
        "display_title_es": "Artículo 92 Asesinato — 33 L.P.R.A. § 5141",
        "display_title_en": "Article 92 Murder — 33 L.P.R.A. § 5141",
        "sort_key": "092.000",
        "category": "pr-penal",
        "title_es": "Asesinato",
        "title_en": "Murder",
        "description_es": "Matrimonio intencional de una persona sin justificación legal. Incluye primer y segundo grado según la premeditación.",
        "description_en": "Intentional killing of a person without legal justification. Includes first and second degree based on premeditation.",
        "keywords_es": ["homicidio", "matar", "muerte", "asesinato", "primer grado", "segundo grado"],
        "keywords_en": ["homicide", "kill", "death", "murder", "first degree", "second degree"],
        "verified": true
    },
    {
        "id": "pr-penal-93",
        "article_number": "93",
        "citation": "33 L.P.R.A. § 5142",
        "display_title_es": "Artículo 93 Asesinato agravado — 33 L.P.R.A. § 5142",
        "display_title_en": "Article 93 Aggravated Murder — 33 L.P.R.A. § 5142",
        "sort_key": "093.000",
        "category": "pr-penal",
        "title_es": "Asesinato agravado",
        "title_en": "Aggravated Murder",
        "description_es": "Asesinato cometido con circunstancias agravantes: lucro, placer, odio racial/religioso, múltiples víctimas, o funcionario público.",
        "description_en": "Murder committed with aggravating circumstances: profit, pleasure, racial/religious hatred, multiple victims, or public official.",
        "keywords_es": ["agravado", "circunstancias", "lucro", "funcionario", "múltiples víctimas"],
        "keywords_en": ["aggravated", "circumstances", "profit", "official", "multiple victims"],
        "verified": true
    },
    {
        "id": "pr-penal-94",
        "article_number": "94",
        "citation": "33 L.P.R.A. § 5143",
        "display_title_es": "Artículo 94 Homicidio involuntario — 33 L.P.R.A. § 5143",
        "display_title_en": "Article 94 Involuntary Manslaughter — 33 L.P.R.A. § 5143",
        "sort_key": "094.000",
        "category": "pr-penal",
        "title_es": "Homicidio involuntario",
        "title_en": "Involuntary Manslaughter",
        "description_es": "Muerte causada sin intención de matar, por negligencia grave o actos imprudentes.",
        "description_en": "Death caused without intent to kill, through gross negligence or reckless acts.",
        "keywords_es": ["negligencia", "imprudencia", "sin intención", "accidente"],
        "keywords_en": ["negligence", "reckless", "unintentional", "accident"],
        "verified": true
    },
    {
        "id": "pr-penal-95",
        "article_number": "95",
        "citation": "33 L.P.R.A. § 5144",
        "display_title_es": "Artículo 95 Homicidio justificado — 33 L.P.R.A. § 5144",
        "display_title_en": "Article 95 Justifiable Homicide — 33 L.P.R.A. § 5144",
        "sort_key": "095.000",
        "category": "pr-penal",
        "title_es": "Homicidio justificado",
        "title_en": "Justifiable Homicide",
        "description_es": "Muerte causada en defensa propia legítima, defensa de terceros, o cumplimiento de deber legal.",
        "description_en": "Death caused in legitimate self-defense, defense of others, or performance of legal duty.",
        "keywords_es": ["defensa propia", "legítima", "justificado", "deber"],
        "keywords_en": ["self-defense", "justified", "legitimate", "duty"],
        "verified": true
    },
    {
        "id": "pr-penal-96",
        "article_number": "96",
        "citation": "33 L.P.R.A. § 5145",
        "display_title_es": "Artículo 96 Homicidio excusable — 33 L.P.R.A. § 5145",
        "display_title_en": "Article 96 Excusable Homicide — 33 L.P.R.A. § 5145",
        "sort_key": "096.000",
        "category": "pr-penal",
        "title_es": "Homicidio excusable",
        "title_en": "Excusable Homicide",
        "description_es": "Muerte causada accidentalmente sin negligencia, o en calor de pasión irresistible.",
        "description_en": "Death caused accidentally without negligence, or in the heat of irresistible passion.",
        "keywords_es": ["excusable", "accidental", "pasión", "irresistible"],
        "keywords_en": ["excusable", "accidental", "passion", "irresistible"],
        "verified": true
    },
    {
        "id": "pr-penal-97",
        "article_number": "97",
        "citation": "33 L.P.R.A. § 5146",
        "display_title_es": "Artículo 97 Asistencia o inducción al suicidio — 33 L.P.R.A. § 5146",
        "display_title_en": "Article 97 Assisting or Inducing Suicide — 33 L.P.R.A. § 5146",
        "sort_key": "097.000",
        "category": "pr-penal",
        "title_es": "Asistencia o inducción al suicidio",
        "title_en": "Assisting or Inducing Suicide",
        "description_es": "Ayudar o inducir a otra persona a cometer suicidio, ya sea proporcionando medios o persuadiendo.",
        "description_en": "Helping or inducing another person to commit suicide, either by providing means or persuading.",
        "keywords_es": ["suicidio", "inducir", "asistir", "ayudar"],
        "keywords_en": ["suicide", "induce", "assist", "help"],
        "verified": true
    },
    {
        "id": "pr-penal-98",
        "article_number": "98",
        "citation": "33 L.P.R.A. § 5147",
        "display_title_es": "Artículo 98 Lesiones graves — 33 L.P.R.A. § 5147",
        "display_title_en": "Article 98 Serious Bodily Injury — 33 L.P.R.A. § 5147",
        "sort_key": "098.000",
        "category": "pr-penal",
        "title_es": "Lesiones graves",
        "title_en": "Serious Bodily Injury",
        "description_es": "Causar lesiones físicas que ponen en peligro la vida, causan desfiguración permanente, o incapacidad prolongada.",
        "description_en": "Causing physical injuries that endanger life, cause permanent disfigurement, or prolonged incapacity.",
        "keywords_es": ["lesiones", "daños", "heridas", "graves", "desfiguración"],
        "keywords_en": ["injuries", "damage", "wounds", "serious", "disfigurement"],
        "verified": true
    },
    {
        "id": "pr-penal-99",
        "article_number": "99",
        "citation": "33 L.P.R.A. § 5148",
        "display_title_es": "Artículo 99 Lesiones menos graves — 33 L.P.R.A. § 5148",
        "display_title_en": "Article 99 Less Serious Injuries — 33 L.P.R.A. § 5148",
        "sort_key": "099.000",
        "category": "pr-penal",
        "title_es": "Lesiones menos graves",
        "title_en": "Less Serious Injuries",
        "description_es": "Causar lesiones que no ponen en peligro la vida pero causan incapacidad temporal o dolor significativo.",
        "description_en": "Causing injuries that don't endanger life but cause temporary incapacity or significant pain.",
        "keywords_es": ["lesiones", "menos graves", "incapacidad temporal"],
        "keywords_en": ["injuries", "less serious", "temporary incapacity"],
        "verified": true
    },
    {
        "id": "pr-penal-100",
        "article_number": "100",
        "citation": "33 L.P.R.A. § 5149",
        "display_title_es": "Artículo 100 Lesiones leves — 33 L.P.R.A. § 5149",
        "display_title_en": "Article 100 Minor Injuries — 33 L.P.R.A. § 5149",
        "sort_key": "100.000",
        "category": "pr-penal",
        "title_es": "Lesiones leves",
        "title_en": "Minor Injuries",
        "description_es": "Causar lesiones superficiales que no causan incapacidad ni ponen en peligro la vida.",
        "description_en": "Causing superficial injuries that don't cause incapacity or endanger life.",
        "keywords_es": ["lesiones", "leves", "superficiales"],
        "keywords_en": ["injuries", "minor", "superficial"],
        "verified": true
    },
    {
        "id": "pr-penal-101",
        "article_number": "101",
        "citation": "33 L.P.R.A. § 5150",
        "display_title_es": "Artículo 101 Lesiones con arma mortal — 33 L.P.R.A. § 5150",
        "display_title_en": "Article 101 Injuries with Deadly Weapon — 33 L.P.R.A. § 5150",
        "sort_key": "101.000",
        "category": "pr-penal",
        "title_es": "Lesiones con arma mortal",
        "title_en": "Injuries with Deadly Weapon",
        "description_es": "Causar lesiones usando arma mortal o con potencial de causar muerte.",
        "description_en": "Causing injuries using a deadly weapon or with potential to cause death.",
        "keywords_es": ["arma", "mortal", "arma blanca", "arma de fuego"],
        "keywords_en": ["weapon", "deadly", "knife", "firearm"],
        "verified": true
    },
    {
        "id": "pr-penal-102",
        "article_number": "102",
        "citation": "33 L.P.R.A. § 5151",
        "display_title_es": "Artículo 102 Lesiones a menor de edad — 33 L.P.R.A. § 5151",
        "display_title_en": "Article 102 Injuries to Minor — 33 L.P.R.A. § 5151",
        "sort_key": "102.000",
        "category": "pr-penal",
        "title_es": "Lesiones a menor de edad",
        "title_en": "Injuries to Minor",
        "description_es": "Causar lesiones físicas a un menor de edad, con agravantes según la edad y relación.",
        "description_en": "Causing physical injuries to a minor, with aggravating factors based on age and relationship.",
        "keywords_es": ["menor", "niño", "abuso", "lesiones"],
        "keywords_en": ["minor", "child", "abuse", "injuries"],
        "verified": true
    },
    {
        "id": "pr-penal-103",
        "article_number": "103",
        "citation": "33 L.P.R.A. § 5152",
        "display_title_es": "Artículo 103 Lesiones a persona mayor — 33 L.P.R.A. § 5152",
        "display_title_en": "Article 103 Injuries to Elderly Person — 33 L.P.R.A. § 5152",
        "sort_key": "103.000",
        "category": "pr-penal",
        "title_es": "Lesiones a persona mayor",
        "title_en": "Injuries to Elderly Person",
        "description_es": "Causar lesiones físicas a persona de 60 años o más.",
        "description_en": "Causing physical injuries to a person 60 years or older.",
        "keywords_es": ["anciano", "adulto mayor", "tercera edad", "lesiones"],
        "keywords_en": ["elderly", "senior", "older adult", "injuries"],
        "verified": true
    },
    {
        "id": "pr-penal-104",
        "article_number": "104",
        "citation": "33 L.P.R.A. § 5153",
        "display_title_es": "Artículo 104 Lesiones en riña — 33 L.P.R.A. § 5153",
        "display_title_en": "Article 104 Injuries in Brawl — 33 L.P.R.A. § 5153",
        "sort_key": "104.000",
        "category": "pr-penal",
        "title_es": "Lesiones en riña",
        "title_en": "Injuries in Brawl",
        "description_es": "Causar lesiones durante una pelea o riña entre múltiples personas.",
        "description_en": "Causing injuries during a fight or brawl between multiple persons.",
        "keywords_es": ["riña", "pelea", "altercado", "lesiones"],
        "keywords_en": ["brawl", "fight", "altercation", "injuries"],
        "verified": true
    },
    {
        "id": "pr-penal-105",
        "article_number": "105",
        "citation": "33 L.P.R.A. § 5154",
        "display_title_es": "Artículo 105 Tortura — 33 L.P.R.A. § 5154",
        "display_title_en": "Article 105 Torture — 33 L.P.R.A. § 5154",
        "sort_key": "105.000",
        "category": "pr-penal",
        "title_es": "Tortura",
        "title_en": "Torture",
        "description_es": "Infligir dolor físico o psicológico severo a una persona con propósito de castigo, obtener información, o intimidar.",
        "description_en": "Inflicting severe physical or psychological pain on a person for punishment, obtaining information, or intimidation.",
        "keywords_es": ["tortura", "dolor", "castigo", "intimidación"],
        "keywords_en": ["torture", "pain", "punishment", "intimidation"],
        "verified": true
    },
    {
        "id": "pr-penal-106",
        "article_number": "106",
        "citation": "33 L.P.R.A. § 5155",
        "display_title_es": "Artículo 106 Maltrato de menores — 33 L.P.R.A. § 5155",
        "display_title_en": "Article 106 Child Abuse — 33 L.P.R.A. § 5155",
        "sort_key": "106.000",
        "category": "pr-penal",
        "title_es": "Maltrato de menores",
        "title_en": "Child Abuse",
        "description_es": "Causar daño físico, emocional o psicológico a un menor de edad, o exponerlo a riesgo de daño.",
        "description_en": "Causing physical, emotional, or psychological harm to a minor, or exposing them to risk of harm.",
        "keywords_es": ["maltrato", "abuso", "niño", "menor", "daño"],
        "keywords_en": ["abuse", "mistreatment", "child", "minor", "harm"],
        "verified": true
    },
    {
        "id": "pr-penal-107",
        "article_number": "107",
        "citation": "33 L.P.R.A. § 5156",
        "display_title_es": "Artículo 107 Abandono de menores — 33 L.P.R.A. § 5156",
        "display_title_en": "Article 107 Child Abandonment — 33 L.P.R.A. § 5156",
        "sort_key": "107.000",
        "category": "pr-penal",
        "title_es": "Abandono de menores",
        "title_en": "Child Abandonment",
        "description_es": "Abandonar a un menor de edad sin supervisión adecuada o sin proporcionar cuidados necesarios.",
        "description_en": "Abandoning a minor without adequate supervision or without providing necessary care.",
        "keywords_es": ["abandono", "niño", "menor", "descuido"],
        "keywords_en": ["abandonment", "child", "minor", "neglect"],
        "verified": true
    },
    {
        "id": "pr-penal-108",
        "article_number": "108",
        "citation": "33 L.P.R.A. § 5157",
        "display_title_es": "Artículo 108 Secuestro — 33 L.P.R.A. § 5157",
        "display_title_en": "Article 108 Kidnapping — 33 L.P.R.A. § 5157",
        "sort_key": "108.000",
        "category": "pr-penal",
        "title_es": "Secuestro",
        "title_en": "Kidnapping",
        "description_es": "Privar ilegalmente de la libertad a una persona mediante violencia, intimidación o engaño, con fines de lucro, recompensa o cometer otro delito.",
        "description_en": "Illegally depriving a person of liberty through violence, intimidation, or deception, for profit, reward, or to commit another crime.",
        "keywords_es": ["secuestro", "rapto", "privación libertad", "plagio"],
        "keywords_en": ["kidnapping", "abduction", "deprivation of liberty", "abduction"],
        "verified": true
    },
    {
        "id": "pr-penal-108A",
        "article_number": "108A",
        "citation": "33 L.P.R.A. § 5157a",
        "display_title_es": "Artículo 108A Secuestro agravado — 33 L.P.R.A. § 5157a",
        "display_title_en": "Article 108A Aggravated Kidnapping — 33 L.P.R.A. § 5157a",
        "sort_key": "108.001",
        "category": "pr-penal",
        "title_es": "Secuestro agravado",
        "title_en": "Aggravated Kidnapping",
        "description_es": "Secuestro con circunstancias agravantes: víctima menor, funcionario público, o con fines de extorsión.",
        "description_en": "Kidnapping with aggravating circumstances: minor victim, public official, or for extortion purposes.",
        "keywords_es": ["secuestro agravado", "menor", "extorsión"],
        "keywords_en": ["aggravated kidnapping", "minor", "extortion"],
        "verified": true
    },
    {
        "id": "pr-penal-109",
        "article_number": "109",
        "citation": "33 L.P.R.A. § 5158",
        "display_title_es": "Artículo 109 Privación ilegal de libertad — 33 L.P.R.A. § 5158",
        "display_title_en": "Article 109 False Imprisonment — 33 L.P.R.A. § 5158",
        "sort_key": "109.000",
        "category": "pr-penal",
        "title_es": "Privación ilegal de libertad",
        "title_en": "False Imprisonment",
        "description_es": "Privar de libertad a una persona sin autoridad legal, sin los elementos de secuestro.",
        "description_en": "Depriving a person of liberty without legal authority, without the elements of kidnapping.",
        "keywords_es": ["privación libertad", "encierro", "detención ilegal"],
        "keywords_en": ["false imprisonment", "confinement", "illegal detention"],
        "verified": true
    },
    {
        "id": "pr-penal-109A",
        "article_number": "109A",
        "citation": "33 L.P.R.A. § 5158a",
        "display_title_es": "Artículo 109A Privación ilegal de libertad agravada — 33 L.P.R.A. § 5158a",
        "display_title_en": "Article 109A Aggravated False Imprisonment — 33 L.P.R.A. § 5158a",
        "sort_key": "109.001",
        "category": "pr-penal",
        "title_es": "Privación ilegal de libertad agravada",
        "title_en": "Aggravated False Imprisonment",
        "description_es": "Privación ilegal con violencia, amenazas, o contra menor de edad.",
        "description_en": "Illegal deprivation with violence, threats, or against a minor.",
        "keywords_es": ["agravada", "violencia", "menor"],
        "keywords_en": ["aggravated", "violence", "minor"],
        "verified": true
    },
    {
        "id": "pr-penal-110",
        "article_number": "110",
        "citation": "33 L.P.R.A. § 5159",
        "display_title_es": "Artículo 110 Sustracción de menores — 33 L.P.R.A. § 5159",
        "display_title_en": "Article 110 Child Abduction — 33 L.P.R.A. § 5159",
        "sort_key": "110.000",
        "category": "pr-penal",
        "title_es": "Sustracción de menores",
        "title_en": "Child Abduction",
        "description_es": "Quitar a un menor de la custodia legal de sus padres o tutor sin consentimiento.",
        "description_en": "Removing a minor from the legal custody of parents or guardian without consent.",
        "keywords_es": ["sustracción", "rapto", "menor", "custodia"],
        "keywords_en": ["abduction", "kidnapping", "minor", "custody"],
        "verified": true
    },
    {
        "id": "pr-penal-111",
        "article_number": "111",
        "citation": "33 L.P.R.A. § 5160",
        "display_title_es": "Artículo 111 Trata de personas — 33 L.P.R.A. § 5160",
        "display_title_en": "Article 111 Human Trafficking — 33 L.P.R.A. § 5160",
        "sort_key": "111.000",
        "category": "pr-penal",
        "title_es": "Trata de personas",
        "title_en": "Human Trafficking",
        "description_es": "Reclutar, transportar, transferir o albergar personas mediante fuerza, fraude o coerción para explotación laboral o sexual.",
        "description_en": "Recruiting, transporting, transferring, or harboring persons through force, fraud, or coercion for labor or sexual exploitation.",
        "keywords_es": ["trata", "tráfico", "personas", "explotación", "esclavitud"],
        "keywords_en": ["trafficking", "trade", "persons", "exploitation", "slavery"],
        "verified": true
    },
    {
        "id": "pr-penal-112",
        "article_number": "112",
        "citation": "33 L.P.R.A. § 5161",
        "display_title_es": "Artículo 112 Esclavitud o servidumbre — 33 L.P.R.A. § 5161",
        "display_title_en": "Article 112 Slavery or Servitude — 33 L.P.R.A. § 5161",
        "sort_key": "112.000",
        "category": "pr-penal",
        "title_es": "Esclavitud o servidumbre",
        "title_en": "Slavery or Servitude",
        "description_es": "Someter a una persona a esclavitud, servidumbre o trabajo forzado.",
        "description_en": "Subjecting a person to slavery, servitude, or forced labor.",
        "keywords_es": ["esclavitud", "servidumbre", "trabajo forzado"],
        "keywords_en": ["slavery", "servitude", "forced labor"],
        "verified": true
    },
    {
        "id": "pr-penal-113",
        "article_number": "113",
        "citation": "33 L.P.R.A. § 5162",
        "display_title_es": "Artículo 113 Coacción — 33 L.P.R.A. § 5162",
        "display_title_en": "Article 113 Coercion — 33 L.P.R.A. § 5162",
        "sort_key": "113.000",
        "category": "pr-penal",
        "title_es": "Coacción",
        "title_en": "Coercion",
        "description_es": "Forzar a una persona a realizar o abstenerse de un acto mediante violencia, amenazas o intimidación.",
        "description_en": "Forcing a person to perform or abstain from an act through violence, threats, or intimidation.",
        "keywords_es": ["coacción", "forzar", "intimidación", "amenazas"],
        "keywords_en": ["coercion", "force", "intimidation", "threats"],
        "verified": true
    },
    {
        "id": "pr-penal-114",
        "article_number": "114",
        "citation": "33 L.P.R.A. § 5163",
        "display_title_es": "Artículo 114 Amenazas — 33 L.P.R.A. § 5163",
        "display_title_en": "Article 114 Threats — 33 L.P.R.A. § 5163",
        "sort_key": "114.000",
        "category": "pr-penal",
        "title_es": "Amenazas",
        "title_en": "Threats",
        "description_es": "Expresar intención de causar daño físico, daño a propiedad, o perjuicio a otra persona.",
        "description_en": "Expressing intention to cause physical harm, property damage, or injury to another person.",
        "keywords_es": ["amenazas", "intimidar", "daño", "perjuicio"],
        "keywords_en": ["threats", "intimidate", "harm", "injury"],
        "verified": true
    },
    {
        "id": "pr-penal-115",
        "article_number": "115",
        "citation": "33 L.P.R.A. § 5164",
        "display_title_es": "Artículo 115 Amenazas agravadas — 33 L.P.R.A. § 5164",
        "display_title_en": "Article 115 Aggravated Threats — 33 L.P.R.A. § 5164",
        "sort_key": "115.000",
        "category": "pr-penal",
        "title_es": "Amenazas agravadas",
        "title_en": "Aggravated Threats",
        "description_es": "Amenazas con arma mortal, contra funcionario público, o con fines de extorsión.",
        "description_en": "Threats with deadly weapon, against public official, or for extortion purposes.",
        "keywords_es": ["amenazas agravadas", "arma", "funcionario", "extorsión"],
        "keywords_en": ["aggravated threats", "weapon", "official", "extortion"],
        "verified": true
    },
    {
        "id": "pr-penal-116",
        "article_number": "116",
        "citation": "33 L.P.R.A. § 5165",
        "display_title_es": "Artículo 116 Violación — 33 L.P.R.A. § 5165",
        "display_title_en": "Article 116 Rape — 33 L.P.R.A. § 5165",
        "sort_key": "116.000",
        "category": "pr-penal",
        "title_es": "Violación",
        "title_en": "Rape",
        "description_es": "Tener acceso carnal con una persona mediante fuerza, intimidación o cuando la víctima no puede consentir.",
        "description_en": "Having carnal access with a person through force, intimidation, or when the victim cannot consent.",
        "keywords_es": ["violación", "acceso carnal", "fuerza", "agresión sexual"],
        "keywords_en": ["rape", "carnal access", "force", "sexual assault"],
        "verified": true
    },
    {
        "id": "pr-penal-117",
        "article_number": "117",
        "citation": "33 L.P.R.A. § 5166",
        "display_title_es": "Artículo 117 Violación agravada — 33 L.P.R.A. § 5166",
        "display_title_en": "Article 117 Aggravated Rape — 33 L.P.R.A. § 5166",
        "sort_key": "117.000",
        "category": "pr-penal",
        "title_es": "Violación agravada",
        "title_en": "Aggravated Rape",
        "description_es": "Violación con circunstancias agravantes: víctima menor, múltiples agresores, arma mortal, o lesiones graves.",
        "description_en": "Rape with aggravating circumstances: minor victim, multiple aggressors, deadly weapon, or serious injuries.",
        "keywords_es": ["violación agravada", "menor", "arma", "lesiones"],
        "keywords_en": ["aggravated rape", "minor", "weapon", "injuries"],
        "verified": true
    },
    {
        "id": "pr-penal-118",
        "article_number": "118",
        "citation": "33 L.P.R.A. § 5167",
        "display_title_es": "Artículo 118 Relaciones sexuales con menor — 33 L.P.R.A. § 5167",
        "display_title_en": "Article 118 Sexual Relations with Minor — 33 L.P.R.A. § 5167",
        "sort_key": "118.000",
        "category": "pr-penal",
        "title_es": "Relaciones sexuales con menor",
        "title_en": "Sexual Relations with Minor",
        "description_es": "Tener relaciones sexuales con persona menor de 16 años, independientemente del consentimiento.",
        "description_en": "Having sexual relations with a person under 16 years, regardless of consent.",
        "keywords_es": ["menor", "relaciones sexuales", "edad consentimiento"],
        "keywords_en": ["minor", "sexual relations", "age of consent"],
        "verified": true
    },
    {
        "id": "pr-penal-119",
        "article_number": "119",
        "citation": "33 L.P.R.A. § 5168",
        "display_title_es": "Artículo 119 Actos lascivos con menor — 33 L.P.R.A. § 5168",
        "display_title_en": "Article 119 Lewd Acts with Minor — 33 L.P.R.A. § 5168",
        "sort_key": "119.000",
        "category": "pr-penal",
        "title_es": "Actos lascivos con menor",
        "title_en": "Lewd Acts with Minor",
        "description_es": "Realizar actos de naturaleza sexual con menor de 16 años sin llegar a relaciones sexuales.",
        "description_en": "Performing acts of sexual nature with minor under 16 without sexual intercourse.",
        "keywords_es": ["actos lascivos", "menor", "sexual", "tocamiento"],
        "keywords_en": ["lewd acts", "minor", "sexual", "touching"],
        "verified": true
    },
    {
        "id": "pr-penal-120",
        "article_number": "120",
        "citation": "33 L.P.R.A. § 5169",
        "display_title_es": "Artículo 120 Incesto — 33 L.P.R.A. § 5169",
        "display_title_en": "Article 120 Incest — 33 L.P.R.A. § 5169",
        "sort_key": "120.000",
        "category": "pr-penal",
        "title_es": "Incesto",
        "title_en": "Incest",
        "description_es": "Tener relaciones sexuales con pariente cercano prohibido por ley (padre, hijo, hermano, etc.).",
        "description_en": "Having sexual relations with close relative prohibited by law (parent, child, sibling, etc.).",
        "keywords_es": ["incesto", "pariente", "familiar", "prohibido"],
        "keywords_en": ["incest", "relative", "family", "prohibited"],
        "verified": true
    },
    {
        "id": "pr-penal-121",
        "article_number": "121",
        "citation": "33 L.P.R.A. § 5170",
        "display_title_es": "Artículo 121 Prostitución forzada — 33 L.P.R.A. § 5170",
        "display_title_en": "Article 121 Forced Prostitution — 33 L.P.R.A. § 5170",
        "sort_key": "121.000",
        "category": "pr-penal",
        "title_es": "Prostitución forzada",
        "title_en": "Forced Prostitution",
        "description_es": "Forzar a una persona a ejercer la prostitución mediante violencia, amenazas o coerción.",
        "description_en": "Forcing a person to engage in prostitution through violence, threats, or coercion.",
        "keywords_es": ["prostitución", "forzada", "trata", "explotación"],
        "keywords_en": ["prostitution", "forced", "trafficking", "exploitation"],
        "verified": true
    },
    {
        "id": "pr-penal-122",
        "article_number": "122",
        "citation": "33 L.P.R.A. § 5171",
        "display_title_es": "Artículo 122 Proxenetismo — 33 L.P.R.A. § 5171",
        "display_title_en": "Article 122 Pimping — 33 L.P.R.A. § 5171",
        "sort_key": "122.000",
        "category": "pr-penal",
        "title_es": "Proxenetismo",
        "title_en": "Pimping",
        "description_es": "Lucrarse o facilitar la prostitución de otras personas, mantener establecimiento de prostitución.",
        "description_en": "Profiting from or facilitating prostitution of others, maintaining prostitution establishment.",
        "keywords_es": ["proxenetismo", "chulo", "prostitución", "lucro"],
        "keywords_en": ["pimping", "pimp", "prostitution", "profit"],
        "verified": true
    },
    {
        "id": "pr-penal-123",
        "article_number": "123",
        "citation": "33 L.P.R.A. § 5172",
        "display_title_es": "Artículo 123 Proxenetismo agravado — 33 L.P.R.A. § 5172",
        "display_title_en": "Article 123 Aggravated Pimping — 33 L.P.R.A. § 5172",
        "sort_key": "123.000",
        "category": "pr-penal",
        "title_es": "Proxenetismo agravado",
        "title_en": "Aggravated Pimping",
        "description_es": "Proxenetismo con víctima menor, mediante violencia, o tráfico internacional.",
        "description_en": "Pimping with minor victim, through violence, or international trafficking.",
        "keywords_es": ["proxenetismo agravado", "menor", "tráfico"],
        "keywords_en": ["aggravated pimping", "minor", "trafficking"],
        "verified": true
    },
    {
        "id": "pr-penal-124",
        "article_number": "124",
        "citation": "33 L.P.R.A. § 5173",
        "display_title_es": "Artículo 124 Exhibicionismo obsceno — 33 L.P.R.A. § 5173",
        "display_title_en": "Article 124 Obscene Exhibitionism — 33 L.P.R.A. § 5173",
        "sort_key": "124.000",
        "category": "pr-penal",
        "title_es": "Exhibicionismo obsceno",
        "title_en": "Obscene Exhibitionism",
        "description_es": "Exhibir los genitales en público de manera ofensiva o para satisfacción sexual.",
        "description_en": "Exhibiting genitals in public in an offensive manner or for sexual gratification.",
        "keywords_es": ["exhibicionismo", "obsceno", "genitales", "público"],
        "keywords_en": ["exhibitionism", "obscene", "genitals", "public"],
        "verified": true
    },
    {
        "id": "pr-penal-125",
        "article_number": "125",
        "citation": "33 L.P.R.A. § 5174",
        "display_title_es": "Artículo 125 Acoso sexual — 33 L.P.R.A. § 5174",
        "display_title_en": "Article 125 Sexual Harassment — 33 L.P.R.A. § 5174",
        "sort_key": "125.000",
        "category": "pr-penal",
        "title_es": "Acoso sexual",
        "title_en": "Sexual Harassment",
        "description_es": "Realizar conductas sexuales no deseadas que intimidan, hostigan o crean ambiente ofensivo.",
        "description_en": "Engaging in unwanted sexual conduct that intimidates, harasses, or creates offensive environment.",
        "keywords_es": ["acoso", "hostigamiento", "sexual", "intimidar"],
        "keywords_en": ["harassment", "sexual", "intimidate", "hostile"],
        "verified": true
    },
    {
        "id": "pr-penal-126",
        "article_number": "126",
        "citation": "33 L.P.R.A. § 5175",
        "display_title_es": "Artículo 126 Voyeurismo — 33 L.P.R.A. § 5175",
        "display_title_en": "Article 126 Voyeurism — 33 L.P.R.A. § 5175",
        "sort_key": "126.000",
        "category": "pr-penal",
        "title_es": "Voyeurismo",
        "title_en": "Voyeurism",
        "description_es": "Observar a persona desnuda o realizando actos íntimos sin su consentimiento, en lugar privado.",
        "description_en": "Observing a naked person or engaging in intimate acts without consent, in private place.",
        "keywords_es": ["voyeurismo", "mirón", "espiar", "privacidad"],
        "keywords_en": ["voyeurism", "peeping", "spy", "privacy"],
        "verified": true
    },
    {
        "id": "pr-penal-127",
        "article_number": "127",
        "citation": "33 L.P.R.A. § 5176",
        "display_title_es": "Artículo 127 Pornografía infantil — 33 L.P.R.A. § 5176",
        "display_title_en": "Article 127 Child Pornography — 33 L.P.R.A. § 5176",
        "sort_key": "127.000",
        "category": "pr-penal",
        "title_es": "Pornografía infantil",
        "title_en": "Child Pornography",
        "description_es": "Producir, distribuir, poseer o visualizar material sexual con menores de edad.",
        "description_en": "Producing, distributing, possessing, or viewing sexual material with minors.",
        "keywords_es": ["pornografía", "infantil", "menor", "material sexual"],
        "keywords_en": ["pornography", "child", "minor", "sexual material"],
        "verified": true
    },
    {
        "id": "pr-penal-127A",
        "article_number": "127-A",
        "citation": "33 L.P.R.A. § 5176a",
        "display_title_es": "Artículo 127-A Pornografía infantil - Producción — 33 L.P.R.A. § 5176a",
        "display_title_en": "Article 127-A Child Pornography - Production — 33 L.P.R.A. § 5176a",
        "sort_key": "127.001",
        "category": "pr-penal",
        "title_es": "Pornografía infantil - Producción",
        "title_en": "Child Pornography - Production",
        "description_es": "Producir, crear, o fabricar material pornográfico con participación de menores.",
        "description_en": "Producing, creating, or manufacturing pornographic material with minor participation.",
        "keywords_es": ["producción", "pornografía infantil", "crear", "fabricar"],
        "keywords_en": ["production", "child pornography", "create", "manufacture"],
        "verified": true
    },
    {
        "id": "pr-penal-127B",
        "article_number": "127-B",
        "citation": "33 L.P.R.A. § 5176b",
        "display_title_es": "Artículo 127-B Pornografía infantil - Distribución — 33 L.P.R.A. § 5176b",
        "display_title_en": "Article 127-B Child Pornography - Distribution — 33 L.P.R.A. § 5176b",
        "sort_key": "127.002",
        "category": "pr-penal",
        "title_es": "Pornografía infantil - Distribución",
        "title_en": "Child Pornography - Distribution",
        "description_es": "Distribuir, vender, enviar, o transmitir material pornográfico infantil.",
        "description_en": "Distributing, selling, sending, or transmitting child pornography material.",
        "keywords_es": ["distribución", "venta", "transmisión", "pornografía infantil"],
        "keywords_en": ["distribution", "selling", "transmission", "child pornography"],
        "verified": true
    },
    {
        "id": "pr-penal-127C",
        "article_number": "127-C",
        "citation": "33 L.P.R.A. § 5176c",
        "display_title_es": "Artículo 127-C Pornografía infantil - Posesión — 33 L.P.R.A. § 5176c",
        "display_title_en": "Article 127-C Child Pornography - Possession — 33 L.P.R.A. § 5176c",
        "sort_key": "127.003",
        "category": "pr-penal",
        "title_es": "Pornografía infantil - Posesión",
        "title_en": "Child Pornography - Possession",
        "description_es": "Poseer, tener bajo control, o almacenar material pornográfico infantil.",
        "description_en": "Possessing, having control of, or storing child pornography material.",
        "keywords_es": ["posesión", "tener", "almacenar", "pornografía infantil"],
        "keywords_en": ["possession", "have", "store", "child pornography"],
        "verified": true
    },
    {
        "id": "pr-penal-127D",
        "article_number": "127-D",
        "citation": "33 L.P.R.A. § 5176d",
        "display_title_es": "Artículo 127-D Pornografía infantil - Visualización — 33 L.P.R.A. § 5176d",
        "display_title_en": "Article 127-D Child Pornography - Viewing — 33 L.P.R.A. § 5176d",
        "sort_key": "127.004",
        "category": "pr-penal",
        "title_es": "Pornografía infantil - Visualización",
        "title_en": "Child Pornography - Viewing",
        "description_es": "Ver, observar, o acceder intencionalmente material pornográfico infantil.",
        "description_en": "Viewing, observing, or intentionally accessing child pornography material.",
        "keywords_es": ["visualización", "ver", "acceso", "pornografía infantil"],
        "keywords_en": ["viewing", "see", "access", "child pornography"],
        "verified": true
    },
    {
        "id": "pr-penal-128",
        "article_number": "128",
        "citation": "33 L.P.R.A. § 5177",
        "display_title_es": "Artículo 128 Corrupción de menores — 33 L.P.R.A. § 5177",
        "display_title_en": "Article 128 Corruption of Minors — 33 L.P.R.A. § 5177",
        "sort_key": "128.000",
        "category": "pr-penal",
        "title_es": "Corrupción de menores",
        "title_en": "Corruption of Minors",
        "description_es": "Inducir o facilitar a menor a participar en conductas sexuales o delictivas.",
        "description_en": "Inducing or facilitating a minor to participate in sexual or criminal conduct.",
        "keywords_es": ["corrupción", "menor", "inducir", "facilitar"],
        "keywords_en": ["corruption", "minor", "induce", "facilitate"],
        "verified": true
    },
    {
        "id": "pr-penal-129",
        "article_number": "129",
        "citation": "33 L.P.R.A. § 5178",
        "display_title_es": "Artículo 129 Seducción de menor — 33 L.P.R.A. § 5178",
        "display_title_en": "Article 129 Seduction of Minor — 33 L.P.R.A. § 5178",
        "sort_key": "129.000",
        "category": "pr-penal",
        "title_es": "Seducción de menor",
        "title_en": "Seduction of Minor",
        "description_es": "Seducir o persuadir a menor para fines sexuales mediante engaño o promesas.",
        "description_en": "Seducing or persuading a minor for sexual purposes through deception or promises.",
        "keywords_es": ["seducción", "menor", "engaño", "persuadir"],
        "keywords_en": ["seduction", "minor", "deception", "persuade"],
        "verified": true
    },
    {
        "id": "pr-penal-130",
        "article_number": "130",
        "citation": "33 L.P.R.A. § 5179",
        "display_title_es": "Artículo 130 Abuso sexual con incapaz — 33 L.P.R.A. § 5179",
        "display_title_en": "Article 130 Sexual Abuse with Incapacitated Person — 33 L.P.R.A. § 5179",
        "sort_key": "130.000",
        "category": "pr-penal",
        "title_es": "Abuso sexual con incapaz",
        "title_en": "Sexual Abuse with Incapacitated Person",
        "description_es": "Tener relaciones sexuales o realizar actos lascivos con persona incapaz de resistir o consentir.",
        "description_en": "Having sexual relations or performing lewd acts with person unable to resist or consent.",
        "keywords_es": ["abuso", "incapaz", "discapacidad", "consentimiento"],
        "keywords_en": ["abuse", "incapacitated", "disability", "consent"],
        "verified": true
    },
    {
        "id": "pr-penal-131",
        "article_number": "131",
        "citation": "33 L.P.R.A. § 5180",
        "display_title_es": "Artículo 131 Robo — 33 L.P.R.A. § 5180",
        "display_title_en": "Article 131 Robbery — 33 L.P.R.A. § 5180",
        "sort_key": "131.000",
        "category": "pr-penal",
        "title_es": "Robo",
        "title_en": "Robbery",
        "description_es": "Tomar propiedad de otro con intención de apropiarse, sin consentimiento y sin violencia.",
        "description_en": "Taking another's property with intent to appropriate, without consent and without violence.",
        "keywords_es": ["robo", "hurto", "propiedad", "apropiación"],
        "keywords_en": ["robbery", "theft", "property", "appropriation"],
        "verified": true
    },
    {
        "id": "pr-penal-132",
        "article_number": "132",
        "citation": "33 L.P.R.A. § 5181",
        "display_title_es": "Artículo 132 Robo agravado — 33 L.P.R.A. § 5181",
        "display_title_en": "Article 132 Aggravated Robbery — 33 L.P.R.A. § 5181",
        "sort_key": "132.000",
        "category": "pr-penal",
        "title_es": "Robo agravado",
        "title_en": "Aggravated Robbery",
        "description_es": "Robo con circunstancias agravantes: arma mortal, múltiples delincuentes, o en lugar público.",
        "description_en": "Robbery with aggravating circumstances: deadly weapon, multiple offenders, or public place.",
        "keywords_es": ["robo agravado", "arma", "violencia"],
        "keywords_en": ["aggravated robbery", "weapon", "violence"],
        "verified": true
    },
    {
        "id": "pr-penal-133",
        "article_number": "133",
        "citation": "33 L.P.R.A. § 5182",
        "display_title_es": "Artículo 133 Robo con violencia — 33 L.P.R.A. § 5182",
        "display_title_en": "Article 133 Robbery with Violence — 33 L.P.R.A. § 5182",
        "sort_key": "133.000",
        "category": "pr-penal",
        "title_es": "Robo con violencia",
        "title_en": "Robbery with Violence",
        "description_es": "Tomar propiedad usando fuerza física o intimidación contra la víctima.",
        "description_en": "Taking property using physical force or intimidation against the victim.",
        "keywords_es": ["robo violento", "fuerza", "intimidación"],
        "keywords_en": ["violent robbery", "force", "intimidation"],
        "verified": true
    },
    {
        "id": "pr-penal-134",
        "article_number": "134",
        "citation": "33 L.P.R.A. § 5183",
        "display_title_es": "Artículo 134 Hurto — 33 L.P.R.A. § 5183",
        "display_title_en": "Article 134 Larceny/Theft — 33 L.P.R.A. § 5183",
        "sort_key": "134.000",
        "category": "pr-penal",
        "title_es": "Hurto",
        "title_en": "Larceny/Theft",
        "description_es": "Tomar propiedad mueble de otro sin consentimiento, sin violencia ni intimidación.",
        "description_en": "Taking another's movable property without consent, without violence or intimidation.",
        "keywords_es": ["hurto", "robo simple", "propiedad"],
        "keywords_en": ["larceny", "theft", "property"],
        "verified": true
    },
    {
        "id": "pr-penal-135",
        "article_number": "135",
        "citation": "33 L.P.R.A. § 5184",
        "display_title_es": "Artículo 135 Hurto agravado — 33 L.P.R.A. § 5184",
        "display_title_en": "Article 135 Aggravated Larceny — 33 L.P.R.A. § 5184",
        "sort_key": "135.000",
        "category": "pr-penal",
        "title_es": "Hurto agravado",
        "title_en": "Aggravated Larceny",
        "description_es": "Hurto con circunstancias agravantes: valor elevado, lugar especial, o método sofisticado.",
        "description_en": "Larceny with aggravating circumstances: high value, special place, or sophisticated method.",
        "keywords_es": ["hurto agravado", "valor", "lugar especial"],
        "keywords_en": ["aggravated larceny", "value", "special place"],
        "verified": true
    },
    {
        "id": "pr-penal-136",
        "article_number": "136",
        "citation": "33 L.P.R.A. § 5185",
        "display_title_es": "Artículo 136 Fraude — 33 L.P.R.A. § 5185",
        "display_title_en": "Article 136 Fraud — 33 L.P.R.A. § 5185",
        "sort_key": "136.000",
        "category": "pr-penal",
        "title_es": "Fraude",
        "title_en": "Fraud",
        "description_es": "Obtener beneficio indebido mediante engaño, artimaña o representación falsa.",
        "description_en": "Obtaining undue benefit through deception, trickery, or false representation.",
        "keywords_es": ["fraude", "engaño", "estafa", "mentira"],
        "keywords_en": ["fraud", "deception", "scam", "lie"],
        "verified": true
    },
    {
        "id": "pr-penal-137",
        "article_number": "137",
        "citation": "33 L.P.R.A. § 5186",
        "display_title_es": "Artículo 137 Fraude bancario — 33 L.P.R.A. § 5186",
        "display_title_en": "Article 137 Bank Fraud — 33 L.P.R.A. § 5186",
        "sort_key": "137.000",
        "category": "pr-penal",
        "title_es": "Fraude bancario",
        "title_en": "Bank Fraud",
        "description_es": "Defraudar a institución financiera mediante documentos falsos, cheques sin fondos, o manipulación.",
        "description_en": "Defrauding a financial institution through false documents, bad checks, or manipulation.",
        "keywords_es": ["fraude bancario", "banco", "cheque", "documentos falsos"],
        "keywords_en": ["bank fraud", "bank", "check", "false documents"],
        "verified": true
    },
    {
        "id": "pr-penal-138",
        "article_number": "138",
        "citation": "33 L.P.R.A. § 5187",
        "display_title_es": "Artículo 138 Fraude al seguro — 33 L.P.R.A. § 5187",
        "display_title_en": "Article 138 Insurance Fraud — 33 L.P.R.A. § 5187",
        "sort_key": "138.000",
        "category": "pr-penal",
        "title_es": "Fraude al seguro",
        "title_en": "Insurance Fraud",
        "description_es": "Presentar reclamaciones falsas o exageradas a compañías de seguros.",
        "description_en": "Submitting false or exaggerated claims to insurance companies.",
        "keywords_es": ["fraude seguro", "seguro", "reclamación falsa"],
        "keywords_en": ["insurance fraud", "insurance", "false claim"],
        "verified": true
    },
    {
        "id": "pr-penal-139",
        "article_number": "139",
        "citation": "33 L.P.R.A. § 5188",
        "display_title_es": "Artículo 139 Estafa — 33 L.P.R.A. § 5188",
        "display_title_en": "Article 139 Swindling — 33 L.P.R.A. § 5188",
        "sort_key": "139.000",
        "category": "pr-penal",
        "title_es": "Estafa",
        "title_en": "Swindling",
        "description_es": "Obtener dinero o bienes de otro mediante engaño sofisticado o esquema fraudulento.",
        "description_en": "Obtaining money or goods from another through sophisticated deception or fraudulent scheme.",
        "keywords_es": ["estafa", "engaño", "dinero", "bienes"],
        "keywords_en": ["swindling", "deception", "money", "goods"],
        "verified": true
    },
    {
        "id": "pr-penal-140",
        "article_number": "140",
        "citation": "33 L.P.R.A. § 5189",
        "display_title_es": "Artículo 140 Apropiación ilegal — 33 L.P.R.A. § 5189",
        "display_title_en": "Article 140 Illegal Appropriation — 33 L.P.R.A. § 5189",
        "sort_key": "140.000",
        "category": "pr-penal",
        "title_es": "Apropiación ilegal",
        "title_en": "Illegal Appropriation",
        "description_es": "Apropiarse de bienes o dinero que están bajo custodia o administración.",
        "description_en": "Appropriating goods or money that are under custody or administration.",
        "keywords_es": ["apropiación", "custodia", "administración", "dinero"],
        "keywords_en": ["appropriation", "custody", "administration", "money"],
        "verified": true
    },
    {
        "id": "pr-penal-141",
        "article_number": "141",
        "citation": "33 L.P.R.A. § 5190",
        "display_title_es": "Artículo 141 Apropiación ilegal agravada — 33 L.P.R.A. § 5190",
        "display_title_en": "Article 141 Aggravated Illegal Appropriation — 33 L.P.R.A. § 5190",
        "sort_key": "141.000",
        "category": "pr-penal",
        "title_es": "Apropiación ilegal agravada",
        "title_en": "Aggravated Illegal Appropriation",
        "description_es": "Apropiación ilegal con valor elevado, abuso de confianza, o contra persona vulnerable.",
        "description_en": "Illegal appropriation with high value, breach of trust, or against vulnerable person.",
        "keywords_es": ["apropiación agravada", "confianza", "vulnerable"],
        "keywords_en": ["aggravated appropriation", "trust", "vulnerable"],
        "verified": true
    },
    {
        "id": "pr-penal-142",
        "article_number": "142",
        "citation": "33 L.P.R.A. § 5191",
        "display_title_es": "Artículo 142 Extorsión — 33 L.P.R.A. § 5191",
        "display_title_en": "Article 142 Extortion — 33 L.P.R.A. § 5191",
        "sort_key": "142.000",
        "category": "pr-penal",
        "title_es": "Extorsión",
        "title_en": "Extortion",
        "description_es": "Obtener dinero, bienes o servicios mediante amenazas de daño físico, revelación de información, o perjuicio.",
        "description_en": "Obtaining money, goods, or services through threats of physical harm, information disclosure, or injury.",
        "keywords_es": ["extorsión", "amenazas", "chantaje", "coerción"],
        "keywords_en": ["extortion", "threats", "blackmail", "coercion"],
        "verified": true
    },
    {
        "id": "pr-penal-143",
        "article_number": "143",
        "citation": "33 L.P.R.A. § 5192",
        "display_title_es": "Artículo 143 Daños a la propiedad — 33 L.P.R.A. § 5192",
        "display_title_en": "Article 143 Property Damage — 33 L.P.R.A. § 5192",
        "sort_key": "143.000",
        "category": "pr-penal",
        "title_es": "Daños a la propiedad",
        "title_en": "Property Damage",
        "description_es": "Causar daño intencional a propiedad ajena, destruyendo, dañando o deteriorando bienes.",
        "description_en": "Intentionally causing damage to another's property, destroying, damaging, or deteriorating goods.",
        "keywords_es": ["daños", "propiedad", "destrucción", "vandalismo"],
        "keywords_en": ["damage", "property", "destruction", "vandalism"],
        "verified": true
    },
    {
        "id": "pr-penal-144",
        "article_number": "144",
        "citation": "33 L.P.R.A. § 5193",
        "display_title_es": "Artículo 144 Daños agravados — 33 L.P.R.A. § 5193",
        "display_title_en": "Article 144 Aggravated Property Damage — 33 L.P.R.A. § 5193",
        "sort_key": "144.000",
        "category": "pr-penal",
        "title_es": "Daños agravados",
        "title_en": "Aggravated Property Damage",
        "description_es": "Daños a propiedad con valor elevado, lugar especial, o método peligroso.",
        "description_en": "Property damage with high value, special place, or dangerous method.",
        "keywords_es": ["daños agravados", "valor elevado", "lugar especial"],
        "keywords_en": ["aggravated damage", "high value", "special place"],
        "verified": true
    },
    {
        "id": "pr-penal-145",
        "article_number": "145",
        "citation": "33 L.P.R.A. § 5194",
        "display_title_es": "Artículo 145 Incendio provocado — 33 L.P.R.A. § 5194",
        "display_title_en": "Article 145 Arson — 33 L.P.R.A. § 5194",
        "sort_key": "145.000",
        "category": "pr-penal",
        "title_es": "Incendio provocado",
        "title_en": "Arson",
        "description_es": "Quemar o causar incendio intencionalmente en edificio, vehículo o propiedad.",
        "description_en": "Intentionally burning or causing fire in building, vehicle, or property.",
        "keywords_es": ["incendio", "fuego", "quemar", "arson"],
        "keywords_en": ["arson", "fire", "burn", "incendiary"],
        "verified": true
    },
    {
        "id": "pr-penal-146",
        "article_number": "146",
        "citation": "33 L.P.R.A. § 5195",
        "display_title_es": "Artículo 146 Allanamiento de morada — 33 L.P.R.A. § 5195",
        "display_title_en": "Article 146 Burglary/Home Invasion — 33 L.P.R.A. § 5195",
        "sort_key": "146.000",
        "category": "pr-penal",
        "title_es": "Allanamiento de morada",
        "title_en": "Burglary/Home Invasion",
        "description_es": "Entrar a vivienda o edificio sin consentimiento, con intención de cometer delito.",
        "description_en": "Entering dwelling or building without consent, with intent to commit crime.",
        "keywords_es": ["allanamiento", "morada", "casa", "entrada ilegal"],
        "keywords_en": ["burglary", "home invasion", "house", "illegal entry"],
        "verified": true
    },
    {
        "id": "pr-penal-147",
        "article_number": "147",
        "citation": "33 L.P.R.A. § 5196",
        "display_title_es": "Artículo 147 Allanamiento agravado — 33 L.P.R.A. § 5196",
        "display_title_en": "Article 147 Aggravated Burglary — 33 L.P.R.A. § 5196",
        "sort_key": "147.000",
        "category": "pr-penal",
        "title_es": "Allanamiento agravado",
        "title_en": "Aggravated Burglary",
        "description_es": "Allanamiento con personas presentes, arma mortal, o en horario nocturno.",
        "description_en": "Burglary with persons present, deadly weapon, or during nighttime.",
        "keywords_es": ["allanamiento agravado", "arma", "nocturno"],
        "keywords_en": ["aggravated burglary", "weapon", "nighttime"],
        "verified": true
    },
    {
        "id": "pr-penal-148",
        "article_number": "148",
        "citation": "33 L.P.R.A. § 5197",
        "display_title_es": "Artículo 148 Entrada ilegal — 33 L.P.R.A. § 5197",
        "display_title_en": "Article 148 Trespassing — 33 L.P.R.A. § 5197",
        "sort_key": "148.000",
        "category": "pr-penal",
        "title_es": "Entrada ilegal",
        "title_en": "Trespassing",
        "description_es": "Entrar o permanecer en propiedad sin autorización del dueño.",
        "description_en": "Entering or remaining on property without owner's authorization.",
        "keywords_es": ["entrada ilegal", "propiedad", "sin autorización"],
        "keywords_en": ["trespassing", "property", "unauthorized"],
        "verified": true
    },
    {
        "id": "pr-penal-149",
        "article_number": "149",
        "citation": "33 L.P.R.A. § 5198",
        "display_title_es": "Artículo 149 Posesión de bienes robados — 33 L.P.R.A. § 5198",
        "display_title_en": "Article 149 Possession of Stolen Goods — 33 L.P.R.A. § 5198",
        "sort_key": "149.000",
        "category": "pr-penal",
        "title_es": "Posesión de bienes robados",
        "title_en": "Possession of Stolen Goods",
        "description_es": "Poseer, recibir o comprar bienes sabiendo que son producto de robo o hurto.",
        "description_en": "Possessing, receiving, or buying goods knowing they are product of robbery or theft.",
        "keywords_es": ["posesión", "bienes robados", "recibir", "comprar"],
        "keywords_en": ["possession", "stolen goods", "receiving", "buying"],
        "verified": true
    },
    {
        "id": "pr-penal-150",
        "article_number": "150",
        "citation": "33 L.P.R.A. § 5199",
        "display_title_es": "Artículo 150 Falsificación — 33 L.P.R.A. § 5199",
        "display_title_en": "Article 150 Forgery — 33 L.P.R.A. § 5199",
        "sort_key": "150.000",
        "category": "pr-penal",
        "title_es": "Falsificación",
        "title_en": "Forgery",
        "description_es": "Crear, alterar o usar documento falso con intención de defraudar.",
        "description_en": "Creating, altering, or using false document with intent to defraud.",
        "keywords_es": ["falsificación", "documento falso", "alterar", "firma"],
        "keywords_en": ["forgery", "false document", "alter", "signature"],
        "verified": true
    },
    {
        "id": "pr-penal-151",
        "article_number": "151",
        "citation": "33 L.P.R.A. § 5200",
        "display_title_es": "Artículo 151 Falsificación de moneda — 33 L.P.R.A. § 5200",
        "display_title_en": "Article 151 Counterfeiting Currency — 33 L.P.R.A. § 5200",
        "sort_key": "151.000",
        "category": "pr-penal",
        "title_es": "Falsificación de moneda",
        "title_en": "Counterfeiting Currency",
        "description_es": "Fabricar, alterar o distribuir moneda falsa o billetes falsificados.",
        "description_en": "Manufacturing, altering, or distributing counterfeit currency or fake bills.",
        "keywords_es": ["falsificación moneda", "billetes falsos", "moneda falsa"],
        "keywords_en": ["counterfeiting", "fake bills", "false currency"],
        "verified": true
    },
    {
        "id": "pr-penal-152",
        "article_number": "152",
        "citation": "33 L.P.R.A. § 5201",
        "display_title_es": "Artículo 152 Falsificación de documentos públicos — 33 L.P.R.A. § 5201",
        "display_title_en": "Article 152 Forgery of Public Documents — 33 L.P.R.A. § 5201",
        "sort_key": "152.000",
        "category": "pr-penal",
        "title_es": "Falsificación de documentos públicos",
        "title_en": "Forgery of Public Documents",
        "description_es": "Falsificar documentos oficiales del gobierno, certificados, o registros públicos.",
        "description_en": "Falsifying government official documents, certificates, or public records.",
        "keywords_es": ["documentos públicos", "oficial", "certificado", "registro"],
        "keywords_en": ["public documents", "official", "certificate", "record"],
        "verified": true
    },
    {
        "id": "pr-penal-153",
        "article_number": "153",
        "citation": "33 L.P.R.A. § 5202",
        "display_title_es": "Artículo 153 Usurpación de identidad — 33 L.P.R.A. § 5202",
        "display_title_en": "Article 153 Identity Theft — 33 L.P.R.A. § 5202",
        "sort_key": "153.000",
        "category": "pr-penal",
        "title_es": "Usurpación de identidad",
        "title_en": "Identity Theft",
        "description_es": "Usar información personal de otra persona sin autorización para obtener beneficios.",
        "description_en": "Using another person's personal information without authorization to obtain benefits.",
        "keywords_es": ["usurpación", "identidad", "robo identidad", "información personal"],
        "keywords_en": ["identity theft", "identity", "personal information", "impersonation"],
        "verified": true
    },
    {
        "id": "pr-penal-154",
        "article_number": "154",
        "citation": "33 L.P.R.A. § 5203",
        "display_title_es": "Artículo 154 Receptación — 33 L.P.R.A. § 5203",
        "display_title_en": "Article 154 Receiving Stolen Property — 33 L.P.R.A. § 5203",
        "sort_key": "154.000",
        "category": "pr-penal",
        "title_es": "Receptación",
        "title_en": "Receiving Stolen Property",
        "description_es": "Comprar, recibir o ocultar bienes sabiendo que provienen de actividad delictiva.",
        "description_en": "Buying, receiving, or concealing goods knowing they come from criminal activity.",
        "keywords_es": ["receptación", "bienes robados", "ocultar", "comprar"],
        "keywords_en": ["receiving", "stolen property", "conceal", "buy"],
        "verified": true
    },
    {
        "id": "pr-penal-155",
        "article_number": "155",
        "citation": "33 L.P.R.A. § 5204",
        "display_title_es": "Artículo 155 Defraudación de acreedores — 33 L.P.R.A. § 5204",
        "display_title_en": "Article 155 Defrauding Creditors — 33 L.P.R.A. § 5204",
        "sort_key": "155.000",
        "category": "pr-penal",
        "title_es": "Defraudación de acreedores",
        "title_en": "Defrauding Creditors",
        "description_es": "Ocultar bienes o transferirlos para evadir obligaciones de pago a acreedores.",
        "description_en": "Concealing assets or transferring them to evade payment obligations to creditors.",
        "keywords_es": ["defraudación", "acreedores", "ocultar bienes", "deudas"],
        "keywords_en": ["defrauding", "creditors", "conceal assets", "debts"],
        "verified": true
    },
    {
        "id": "pr-penal-156",
        "article_number": "156",
        "citation": "33 L.P.R.A. § 5205",
        "display_title_es": "Artículo 156 Quiebra fraudulenta — 33 L.P.R.A. § 5205",
        "display_title_en": "Article 156 Fraudulent Bankruptcy — 33 L.P.R.A. § 5205",
        "sort_key": "156.000",
        "category": "pr-penal",
        "title_es": "Quiebra fraudulenta",
        "title_en": "Fraudulent Bankruptcy",
        "description_es": "Declarar quiebra fraudulentamente, ocultando activos o proporcionando información falsa.",
        "description_en": "Declaring bankruptcy fraudulently, concealing assets or providing false information.",
        "keywords_es": ["quiebra", "bancarrota", "fraudulenta", "ocultar"],
        "keywords_en": ["bankruptcy", "fraudulent", "conceal", "false information"],
        "verified": true
    },
    {
        "id": "pr-penal-157",
        "article_number": "157",
        "citation": "33 L.P.R.A. § 5206",
        "display_title_es": "Artículo 157 Abuso de confianza — 33 L.P.R.A. § 5206",
        "display_title_en": "Article 157 Breach of Trust — 33 L.P.R.A. § 5206",
        "sort_key": "157.000",
        "category": "pr-penal",
        "title_es": "Abuso de confianza",
        "title_en": "Breach of Trust",
        "description_es": "Apropiarse de bienes o dinero confiados para administración o custodia.",
        "description_en": "Appropriating goods or money entrusted for administration or custody.",
        "keywords_es": ["abuso confianza", "apropiación", "custodia", "administración"],
        "keywords_en": ["breach of trust", "appropriation", "custody", "administration"],
        "verified": true
    },
    {
        "id": "pr-penal-158",
        "article_number": "158",
        "citation": "33 L.P.R.A. § 5207",
        "display_title_es": "Artículo 158 Abuso de confianza agravado — 33 L.P.R.A. § 5207",
        "display_title_en": "Article 158 Aggravated Breach of Trust — 33 L.P.R.A. § 5207",
        "sort_key": "158.000",
        "category": "pr-penal",
        "title_es": "Abuso de confianza agravado",
        "title_en": "Aggravated Breach of Trust",
        "description_es": "Abuso de confianza con valor elevado, función pública, o contra persona vulnerable.",
        "description_en": "Breach of trust with high value, public function, or against vulnerable person.",
        "keywords_es": ["abuso confianza agravado", "función pública", "vulnerable"],
        "keywords_en": ["aggravated breach", "public function", "vulnerable"],
        "verified": true
    },
    {
        "id": "pr-penal-159",
        "article_number": "159",
        "citation": "33 L.P.R.A. § 5208",
        "display_title_es": "Artículo 159 Piratería informática — 33 L.P.R.A. § 5208",
        "display_title_en": "Article 159 Computer Piracy/Hacking — 33 L.P.R.A. § 5208",
        "sort_key": "159.000",
        "category": "pr-penal",
        "title_es": "Piratería informática",
        "title_en": "Computer Piracy/Hacking",
        "description_es": "Acceder sin autorización a sistemas informáticos, robar datos o causar daños digitales.",
        "description_en": "Unauthorized access to computer systems, stealing data or causing digital damage.",
        "keywords_es": ["piratería", "hacking", "computadora", "acceso ilegal"],
        "keywords_en": ["piracy", "hacking", "computer", "unauthorized access"],
        "verified": true
    },
    {
        "id": "pr-penal-160",
        "article_number": "160",
        "citation": "33 L.P.R.A. § 5209",
        "display_title_es": "Artículo 160 Fraude electrónico — 33 L.P.R.A. § 5209",
        "display_title_en": "Article 160 Electronic Fraud — 33 L.P.R.A. § 5209",
        "sort_key": "160.000",
        "category": "pr-penal",
        "title_es": "Fraude electrónico",
        "title_en": "Electronic Fraud",
        "description_es": "Usar medios electrónicos para cometer fraudes, phishing, o estafas en línea.",
        "description_en": "Using electronic means to commit frauds, phishing, or online scams.",
        "keywords_es": ["fraude electrónico", "phishing", "estafa online", "internet"],
        "keywords_en": ["electronic fraud", "phishing", "online scam", "internet"],
        "verified": true
    },
    {
        "id": "pr-penal-161",
        "article_number": "161",
        "citation": "33 L.P.R.A. § 5210",
        "display_title_es": "Artículo 161 Sabotaje — 33 L.P.R.A. § 5210",
        "display_title_en": "Article 161 Sabotage — 33 L.P.R.A. § 5210",
        "sort_key": "161.000",
        "category": "pr-penal",
        "title_es": "Sabotaje",
        "title_en": "Sabotage",
        "description_es": "Dañar intencionalmente infraestructura, equipos o instalaciones para obstaculizar operaciones.",
        "description_en": "Intentionally damaging infrastructure, equipment, or facilities to obstruct operations.",
        "keywords_es": ["sabotaje", "dañar", "infraestructura", "obstaculizar"],
        "keywords_en": ["sabotage", "damage", "infrastructure", "obstruct"],
        "verified": true
    },
    {
        "id": "pr-penal-162",
        "article_number": "162",
        "citation": "33 L.P.R.A. § 5211",
        "display_title_es": "Artículo 162 Vandalismo — 33 L.P.R.A. § 5211",
        "display_title_en": "Article 162 Vandalism — 33 L.P.R.A. § 5211",
        "sort_key": "162.000",
        "category": "pr-penal",
        "title_es": "Vandalismo",
        "title_en": "Vandalism",
        "description_es": "Destruir o dañar propiedad pública o privada por diversión, protesta o rebeldía.",
        "description_en": "Destroying or damaging public or private property for fun, protest, or rebellion.",
        "keywords_es": ["vandalismo", "destruir", "dañar", "propiedad"],
        "keywords_en": ["vandalism", "destroy", "damage", "property"],
        "verified": true
    },
    {
        "id": "pr-penal-163",
        "article_number": "163",
        "citation": "33 L.P.R.A. § 5212",
        "display_title_es": "Artículo 163 Caza furtiva — 33 L.P.R.A. § 5212",
        "display_title_en": "Article 163 Poaching — 33 L.P.R.A. § 5212",
        "sort_key": "163.000",
        "category": "pr-penal",
        "title_es": "Caza furtiva",
        "title_en": "Poaching",
        "description_es": "Cazar, pescar o capturar animales en propiedad ajena o áreas protegidas sin autorización.",
        "description_en": "Hunting, fishing, or capturing animals on another's property or protected areas without authorization.",
        "keywords_es": ["caza furtiva", "pesca ilegal", "animales", "protegido"],
        "keywords_en": ["poaching", "illegal fishing", "animals", "protected"],
        "verified": true
    },
    {
        "id": "pr-penal-164",
        "article_number": "164",
        "citation": "33 L.P.R.A. § 5213",
        "display_title_es": "Artículo 164 Tala ilegal — 33 L.P.R.A. § 5213",
        "display_title_en": "Article 164 Illegal Logging — 33 L.P.R.A. § 5213",
        "sort_key": "164.000",
        "category": "pr-penal",
        "title_es": "Tala ilegal",
        "title_en": "Illegal Logging",
        "description_es": "Cortar árboles o destruir vegetación en terrenos ajenos o áreas protegidas sin permiso.",
        "description_en": "Cutting trees or destroying vegetation on others' land or protected areas without permit.",
        "keywords_es": ["tala", "árboles", "ilegal", "deforestación"],
        "keywords_en": ["logging", "trees", "illegal", "deforestation"],
        "verified": true
    },
    {
        "id": "pr-penal-165",
        "article_number": "165",
        "citation": "33 L.P.R.A. § 5214",
        "display_title_es": "Artículo 165 Invasión de terrenos — 33 L.P.R.A. § 5214",
        "display_title_en": "Article 165 Land Invasion — 33 L.P.R.A. § 5214",
        "sort_key": "165.000",
        "category": "pr-penal",
        "title_es": "Invasión de terrenos",
        "title_en": "Land Invasion",
        "description_es": "Ocupar ilegalmente terrenos ajenos o propiedad pública sin derecho o autorización.",
        "description_en": "Illegally occupying others' land or public property without right or authorization.",
        "keywords_es": ["invasión", "terrenos", "ocupación ilegal", "propiedad"],
        "keywords_en": ["invasion", "land", "illegal occupation", "property"],
        "verified": true
    },
    {
        "id": "pr-penal-166",
        "article_number": "166",
        "citation": "33 L.P.R.A. § 5215",
        "display_title_es": "Artículo 166 Cohecho — 33 L.P.R.A. § 5215",
        "display_title_en": "Article 166 Bribery — 33 L.P.R.A. § 5215",
        "sort_key": "166.000",
        "category": "pr-penal",
        "title_es": "Cohecho",
        "title_en": "Bribery",
        "description_es": "Ofrecer, dar o recibir dinero o beneficios para influir en decisiones de funcionario público.",
        "description_en": "Offering, giving, or receiving money or benefits to influence public official decisions.",
        "keywords_es": ["cohecho", "soborno", "corrupción", "funcionario"],
        "keywords_en": ["bribery", "corruption", "public official", "kickback"],
        "verified": true
    },
    {
        "id": "pr-penal-166A",
        "article_number": "166A",
        "citation": "33 L.P.R.A. § 5215a",
        "display_title_es": "Artículo 166A Cohecho transnacional — 33 L.P.R.A. § 5215a",
        "display_title_en": "Article 166A Transnational Bribery — 33 L.P.R.A. § 5215a",
        "sort_key": "166.001",
        "category": "pr-penal",
        "title_es": "Cohecho transnacional",
        "title_en": "Transnational Bribery",
        "description_es": "Cohecho que involucra a funcionarios extranjeros o transacciones internacionales.",
        "description_en": "Bribery involving foreign officials or international transactions.",
        "keywords_es": ["cohecho transnacional", "extranjero", "internacional"],
        "keywords_en": ["transnational bribery", "foreign", "international"],
        "verified": true
    },
    {
        "id": "pr-penal-167",
        "article_number": "167",
        "citation": "33 L.P.R.A. § 5216",
        "display_title_es": "Artículo 167 Concusión — 33 L.P.R.A. § 5216",
        "display_title_en": "Article 167 Extortion by Public Official — 33 L.P.R.A. § 5216",
        "sort_key": "167.000",
        "category": "pr-penal",
        "title_es": "Concusión",
        "title_en": "Extortion by Public Official",
        "description_es": "Funcionario público que exige o recibe pagos indebidos para realizar sus funciones.",
        "description_en": "Public official demanding or receiving undue payments to perform their functions.",
        "keywords_es": ["concusión", "funcionario", "exigir", "pago indebido"],
        "keywords_en": ["extortion", "public official", "demand", "undue payment"],
        "verified": true
    },
    {
        "id": "pr-penal-168",
        "article_number": "168",
        "citation": "33 L.P.R.A. § 5217",
        "display_title_es": "Artículo 168 Peculado — 33 L.P.R.A. § 5217",
        "display_title_en": "Article 168 Embezzlement/Peculation — 33 L.P.R.A. § 5217",
        "sort_key": "168.000",
        "category": "pr-penal",
        "title_es": "Peculado",
        "title_en": "Embezzlement/Peculation",
        "description_es": "Apropiación indebida de fondos o bienes públicos por parte de funcionario.",
        "description_en": "Improper appropriation of public funds or goods by public official.",
        "keywords_es": ["peculado", "malversación", "fondos públicos", "dinero"],
        "keywords_en": ["embezzlement", "peculation", "public funds", "money"],
        "verified": true
    },
    {
        "id": "pr-penal-169",
        "article_number": "169",
        "citation": "33 L.P.R.A. § 5218",
        "display_title_es": "Artículo 169 Peculado agravado — 33 L.P.R.A. § 5218",
        "display_title_en": "Article 169 Aggravated Embezzlement — 33 L.P.R.A. § 5218",
        "sort_key": "169.000",
        "category": "pr-penal",
        "title_es": "Peculado agravado",
        "title_en": "Aggravated Embezzlement",
        "description_es": "Peculado con valor elevado, método sofisticado, o daño grave al servicio público.",
        "description_en": "Embezzlement with high value, sophisticated method, or serious damage to public service.",
        "keywords_es": ["peculado agravado", "valor elevado", "daño"],
        "keywords_en": ["aggravated embezzlement", "high value", "damage"],
        "verified": true
    },
    {
        "id": "pr-penal-170",
        "article_number": "170",
        "citation": "33 L.P.R.A. § 5219",
        "display_title_es": "Artículo 170 Negociaciones ilícitas — 33 L.P.R.A. § 5219",
        "display_title_en": "Article 170 Illegal Negotiations — 33 L.P.R.A. § 5219",
        "sort_key": "170.000",
        "category": "pr-penal",
        "title_es": "Negociaciones ilícitas",
        "title_en": "Illegal Negotiations",
        "description_es": "Funcionario que participa en negocios que crean conflicto de interés con sus funciones.",
        "description_en": "Official participating in businesses creating conflict of interest with their functions.",
        "keywords_es": ["negociaciones", "conflicto intereses", "funcionario"],
        "keywords_en": ["negotiations", "conflict of interest", "official"],
        "verified": true
    },
    {
        "id": "pr-penal-171",
        "article_number": "171",
        "citation": "33 L.P.R.A. § 5220",
        "display_title_es": "Artículo 171 Tráfico de influencias — 33 L.P.R.A. § 5220",
        "display_title_en": "Article 171 Influence Peddling — 33 L.P.R.A. § 5220",
        "sort_key": "171.000",
        "category": "pr-penal",
        "title_es": "Tráfico de influencias",
        "title_en": "Influence Peddling",
        "description_es": "Usar posición o influencia para obtener beneficios indebidos para terceros.",
        "description_en": "Using position or influence to obtain undue benefits for third parties.",
        "keywords_es": ["tráfico influencias", "influencia", "beneficios"],
        "keywords_en": ["influence peddling", "influence", "benefits"],
        "verified": true
    },
    {
        "id": "pr-penal-172",
        "article_number": "172",
        "citation": "33 L.P.R.A. § 5221",
        "display_title_es": "Artículo 172 Prevaricato — 33 L.P.R.A. § 5221",
        "display_title_en": "Article 172 Prevarication/Malfeasance — 33 L.P.R.A. § 5221",
        "sort_key": "172.000",
        "category": "pr-penal",
        "title_es": "Prevaricato",
        "title_en": "Prevarication/Malfeasance",
        "description_es": "Funcionario que dicta resolución arbitraria a sabiendas de su injusticia.",
        "description_en": "Official issuing arbitrary resolution knowingly of its injustice.",
        "keywords_es": ["prevaricato", "arbitrario", "injusticia", "funcionario"],
        "keywords_en": ["prevarication", "arbitrary", "injustice", "official"],
        "verified": true
    },
    {
        "id": "pr-penal-173",
        "article_number": "173",
        "citation": "33 L.P.R.A. § 5222",
        "display_title_es": "Artículo 173 Abandono de funciones — 33 L.P.R.A. § 5222",
        "display_title_en": "Article 173 Abandonment of Duties — 33 L.P.R.A. § 5222",
        "sort_key": "173.000",
        "category": "pr-penal",
        "title_es": "Abandono de funciones",
        "title_en": "Abandonment of Duties",
        "description_es": "Funcionario que abandona sus deberes o se niega a cumplir obligaciones legales.",
        "description_en": "Official abandoning their duties or refusing to fulfill legal obligations.",
        "keywords_es": ["abandono", "funciones", "deberes", "negarse"],
        "keywords_en": ["abandonment", "duties", "functions", "refuse"],
        "verified": true
    },
    {
        "id": "pr-penal-174",
        "article_number": "174",
        "citation": "33 L.P.R.A. § 5223",
        "display_title_es": "Artículo 174 Omisión de denuncia — 33 L.P.R.A. § 5223",
        "display_title_en": "Article 174 Failure to Report — 33 L.P.R.A. § 5223",
        "sort_key": "174.000",
        "category": "pr-penal",
        "title_es": "Omisión de denuncia",
        "title_en": "Failure to Report",
        "description_es": "Funcionario que omite denunciar delito que conoce por razón de su cargo.",
        "description_en": "Official omitting to report crime known by reason of their position.",
        "keywords_es": ["omisión", "denuncia", "reportar", "delito"],
        "keywords_en": ["omission", "report", "crime", "failure"],
        "verified": true
    },
    {
        "id": "pr-penal-175",
        "article_number": "175",
        "citation": "33 L.P.R.A. § 5224",
        "display_title_es": "Artículo 175 Desobediencia — 33 L.P.R.A. § 5224",
        "display_title_en": "Article 175 Disobedience — 33 L.P.R.A. § 5224",
        "sort_key": "175.000",
        "category": "pr-penal",
        "title_es": "Desobediencia",
        "title_en": "Disobedience",
        "description_es": "Desobedecer órdenes legales de autoridad competente.",
        "description_en": "Disobeying lawful orders from competent authority.",
        "keywords_es": ["desobediencia", "órdenes", "autoridad", "negarse"],
        "keywords_en": ["disobedience", "orders", "authority", "refuse"],
        "verified": true
    },
    {
        "id": "pr-penal-176",
        "article_number": "176",
        "citation": "33 L.P.R.A. § 5225",
        "display_title_es": "Artículo 176 Resistencia a la autoridad — 33 L.P.R.A. § 5225",
        "display_title_en": "Article 176 Resisting Authority — 33 L.P.R.A. § 5225",
        "sort_key": "176.000",
        "category": "pr-penal",
        "title_es": "Resistencia a la autoridad",
        "title_en": "Resisting Authority",
        "description_es": "Oponer resistencia física o violenta a funcionario público en ejercicio de sus funciones.",
        "description_en": "Opposing physical or violent resistance to public official in exercise of their functions.",
        "keywords_es": ["resistencia", "autoridad", "violencia", "oponerse"],
        "keywords_en": ["resistance", "authority", "violence", "oppose"],
        "verified": true
    },
    {
        "id": "pr-penal-177",
        "article_number": "177",
        "citation": "33 L.P.R.A. § 5226",
        "display_title_es": "Artículo 177 Atentado contra autoridad — 33 L.P.R.A. § 5226",
        "display_title_en": "Article 177 Assault on Authority — 33 L.P.R.A. § 5226",
        "sort_key": "177.000",
        "category": "pr-penal",
        "title_es": "Atentado contra autoridad",
        "title_en": "Assault on Authority",
        "description_es": "Atacar o agredir a funcionario público en ejercicio de sus funciones.",
        "description_en": "Attacking or assaulting public official in exercise of their functions.",
        "keywords_es": ["atentado", "autoridad", "agredir", "funcionario"],
        "keywords_en": ["assault", "authority", "attack", "official"],
        "verified": true
    },
    {
        "id": "pr-penal-178",
        "article_number": "178",
        "citation": "33 L.P.R.A. § 5227",
        "display_title_es": "Artículo 178 Desacato — 33 L.P.R.A. § 5227",
        "display_title_en": "Article 178 Contempt — 33 L.P.R.A. § 5227",
        "sort_key": "178.000",
        "category": "pr-penal",
        "title_es": "Desacato",
        "title_en": "Contempt",
        "description_es": "Faltar al respeto o desobedecer órdenes de tribunal o autoridad judicial.",
        "description_en": "Showing disrespect or disobeying orders from court or judicial authority.",
        "keywords_es": ["desacato", "tribunal", "juez", "falta respeto"],
        "keywords_en": ["contempt", "court", "judge", "disrespect"],
        "verified": true
    },
    {
        "id": "pr-penal-179",
        "article_number": "179",
        "citation": "33 L.P.R.A. § 5228",
        "display_title_es": "Artículo 179 Falsedad ante autoridad — 33 L.P.R.A. § 5228",
        "display_title_en": "Article 179 False Statement to Authority — 33 L.P.R.A. § 5228",
        "sort_key": "179.000",
        "category": "pr-penal",
        "title_es": "Falsedad ante autoridad",
        "title_en": "False Statement to Authority",
        "description_es": "Proporcionar información falsa o documentos falsos ante autoridad pública.",
        "description_en": "Providing false information or documents to public authority.",
        "keywords_es": ["falsedad", "autoridad", "información falsa", "documentos"],
        "keywords_en": ["false statement", "authority", "false information", "documents"],
        "verified": true
    },
    {
        "id": "pr-penal-180",
        "article_number": "180",
        "citation": "33 L.P.R.A. § 5229",
        "display_title_es": "Artículo 180 Obstrucción a la investigación — 33 L.P.R.A. § 5229",
        "display_title_en": "Article 180 Obstruction of Investigation — 33 L.P.R.A. § 5229",
        "sort_key": "180.000",
        "category": "pr-penal",
        "title_es": "Obstrucción a la investigación",
        "title_en": "Obstruction of Investigation",
        "description_es": "Obstaculizar, impedir o dificultar investigación de delitos por parte de autoridades.",
        "description_en": "Obstructing, preventing, or hindering crime investigation by authorities.",
        "keywords_es": ["obstrucción", "investigación", "impedir", "dificultar"],
        "keywords_en": ["obstruction", "investigation", "prevent", "hinder"],
        "verified": true
    },
    {
        "id": "pr-penal-181",
        "article_number": "181",
        "citation": "33 L.P.R.A. § 5230",
        "display_title_es": "Artículo 181 Fuga de preso — 33 L.P.R.A. § 5230",
        "display_title_en": "Article 181 Prison Escape — 33 L.P.R.A. § 5230",
        "sort_key": "181.000",
        "category": "pr-penal",
        "title_es": "Fuga de preso",
        "title_en": "Prison Escape",
        "description_es": "Escapar o intentar escapar de establecimiento penal o custodia policial.",
        "description_en": "Escaping or attempting to escape from penal establishment or police custody.",
        "keywords_es": ["fuga", "preso", "escapar", "prisión"],
        "keywords_en": ["escape", "prisoner", "flee", "prison"],
        "verified": true
    },
    {
        "id": "pr-penal-182",
        "article_number": "182",
        "citation": "33 L.P.R.A. § 5231",
        "display_title_es": "Artículo 182 Evasión de preso — 33 L.P.R.A. § 5231",
        "display_title_en": "Article 182 Prison Evasion — 33 L.P.R.A. § 5231",
        "sort_key": "182.000",
        "category": "pr-penal",
        "title_es": "Evasión de preso",
        "title_en": "Prison Evasion",
        "description_es": "Evadir custodia legal durante traslado, audiencia o permiso temporal.",
        "description_en": "Evading legal custody during transfer, hearing, or temporary permit.",
        "keywords_es": ["evasión", "preso", "custodia", "traslado"],
        "keywords_en": ["evasion", "prisoner", "custody", "transfer"],
        "verified": true
    },
    {
        "id": "pr-penal-183",
        "article_number": "183",
        "citation": "33 L.P.R.A. § 5232",
        "display_title_es": "Artículo 183 Motín carcelario — 33 L.P.R.A. § 5232",
        "display_title_en": "Article 183 Prison Riot — 33 L.P.R.A. § 5232",
        "sort_key": "183.000",
        "category": "pr-penal",
        "title_es": "Motín carcelario",
        "title_en": "Prison Riot",
        "description_es": "Participar en altercado colectivo que perturbe orden en establecimiento penal.",
        "description_en": "Participating in collective disturbance disrupting order in penal establishment.",
        "keywords_es": ["motín", "carcelario", "prisión", "disturbio"],
        "keywords_en": ["riot", "prison", "jail", "disturbance"],
        "verified": true
    },
    {
        "id": "pr-penal-184",
        "article_number": "184",
        "citation": "33 L.P.R.A. § 5233",
        "display_title_es": "Artículo 184 Introducción de objetos prohibidos — 33 L.P.R.A. § 5233",
        "display_title_en": "Article 184 Introduction of Prohibited Items — 33 L.P.R.A. § 5233",
        "sort_key": "184.000",
        "category": "pr-penal",
        "title_es": "Introducción de objetos prohibidos",
        "title_en": "Introduction of Prohibited Items",
        "description_es": "Introducir armas, drogas, teléfonos u objetos prohibidos a establecimiento penal.",
        "description_en": "Introducing weapons, drugs, phones, or prohibited items into penal establishment.",
        "keywords_es": ["introducción", "objetos prohibidos", "prisión", "contrabando"],
        "keywords_en": ["introduction", "prohibited items", "prison", "contraband"],
        "verified": true
    },
    {
        "id": "pr-penal-185",
        "article_number": "185",
        "citation": "33 L.P.R.A. § 5234",
        "display_title_es": "Artículo 185 Corrupción de funcionarios — 33 L.P.R.A. § 5234",
        "display_title_en": "Article 185 Corruption of Officials — 33 L.P.R.A. § 5234",
        "sort_key": "185.000",
        "category": "pr-penal",
        "title_es": "Corrupción de funcionarios",
        "title_en": "Corruption of Officials",
        "description_es": "Corromper o intentar corromper a funcionario público para obtener beneficios.",
        "description_en": "Corrupting or attempting to corrupt public official to obtain benefits.",
        "keywords_es": ["corrupción", "funcionario", "sobornar", "beneficios"],
        "keywords_en": ["corruption", "official", "bribe", "benefits"],
        "verified": true
    },
    {
        "id": "pr-penal-186",
        "article_number": "186",
        "citation": "33 L.P.R.A. § 5235",
        "display_title_es": "Artículo 186 Enriquecimiento ilícito — 33 L.P.R.A. § 5235",
        "display_title_en": "Article 186 Illicit Enrichment — 33 L.P.R.A. § 5235",
        "sort_key": "186.000",
        "category": "pr-penal",
        "title_es": "Enriquecimiento ilícito",
        "title_en": "Illicit Enrichment",
        "description_es": "Funcionario que aumenta patrimonio de manera desproporcionada a sus ingresos legítimos.",
        "description_en": "Official increasing assets disproportionately to their legitimate income.",
        "keywords_es": ["enriquecimiento", "ilícito", "patrimonio", "dinero"],
        "keywords_en": ["enrichment", "illicit", "assets", "money"],
        "verified": true
    },
    {
        "id": "pr-penal-187",
        "article_number": "187",
        "citation": "33 L.P.R.A. § 5236",
        "display_title_es": "Artículo 187 Abuso de autoridad — 33 L.P.R.A. § 5236",
        "display_title_en": "Article 187 Abuse of Authority — 33 L.P.R.A. § 5236",
        "sort_key": "187.000",
        "category": "pr-penal",
        "title_es": "Abuso de autoridad",
        "title_en": "Abuse of Authority",
        "description_es": "Funcionario que excede sus atribuciones o usa su cargo para causar daño.",
        "description_en": "Official exceeding their powers or using position to cause harm.",
        "keywords_es": ["abuso", "autoridad", "exceder", "daño"],
        "keywords_en": ["abuse", "authority", "exceed", "harm"],
        "verified": true
    },
    {
        "id": "pr-penal-188",
        "article_number": "188",
        "citation": "33 L.P.R.A. § 5237",
        "display_title_es": "Artículo 188 Negligencia en el servicio — 33 L.P.R.A. § 5237",
        "display_title_en": "Article 188 Negligence in Service — 33 L.P.R.A. § 5237",
        "sort_key": "188.000",
        "category": "pr-penal",
        "title_es": "Negligencia en el servicio",
        "title_en": "Negligence in Service",
        "description_es": "Funcionario que por negligencia causa daño al servicio público o a terceros.",
        "description_en": "Official causing damage to public service or third parties through negligence.",
        "keywords_es": ["negligencia", "servicio", "funcionario", "descuido"],
        "keywords_en": ["negligence", "service", "official", "carelessness"],
        "verified": true
    },
    {
        "id": "pr-penal-189",
        "article_number": "189",
        "citation": "33 L.P.R.A. § 5238",
        "display_title_es": "Artículo 189 Violación de secreto — 33 L.P.R.A. § 5238",
        "display_title_en": "Article 189 Breach of Secrecy — 33 L.P.R.A. § 5238",
        "sort_key": "189.000",
        "category": "pr-penal",
        "title_es": "Violación de secreto",
        "title_en": "Breach of Secrecy",
        "description_es": "Revelar información confidencial conocida por razón de cargo o profesión.",
        "description_en": "Revealing confidential information known by reason of position or profession.",
        "keywords_es": ["violación", "secreto", "confidencial", "revelar"],
        "keywords_en": ["breach", "secrecy", "confidential", "reveal"],
        "verified": true
    },
    {
        "id": "pr-penal-190",
        "article_number": "190",
        "citation": "33 L.P.R.A. § 5239",
        "display_title_es": "Artículo 190 Simulación de delito — 33 L.P.R.A. § 5239",
        "display_title_en": "Article 190 Simulation of Crime — 33 L.P.R.A. § 5239",
        "sort_key": "190.000",
        "category": "pr-penal",
        "title_es": "Simulación de delito",
        "title_en": "Simulation of Crime",
        "description_es": "Simular comisión de delito o crear evidencia falsa para incriminar a inocente.",
        "description_en": "Simulating crime commission or creating false evidence to incriminate innocent person.",
        "keywords_es": ["simulación", "delito", "evidencia falsa", "incriminar"],
        "keywords_en": ["simulation", "crime", "false evidence", "incriminate"],
        "verified": true
    },
    {
        "id": "pr-penal-191",
        "article_number": "191",
        "citation": "33 L.P.R.A. § 5240",
        "display_title_es": "Artículo 191 Terrorismo — 33 L.P.R.A. § 5240",
        "display_title_en": "Article 191 Terrorism — 33 L.P.R.A. § 5240",
        "sort_key": "191.000",
        "category": "pr-penal",
        "title_es": "Terrorismo",
        "title_en": "Terrorism",
        "description_es": "Cometer actos violentos para intimidar población, alterar orden constitucional, o forzar decisiones gubernamentales.",
        "description_en": "Committing violent acts to intimidate population, alter constitutional order, or force government decisions.",
        "keywords_es": ["terrorismo", "violencia", "intimidar", "seguridad"],
        "keywords_en": ["terrorism", "violence", "intimidate", "security"],
        "verified": true
    },
    {
        "id": "pr-penal-192",
        "article_number": "192",
        "citation": "33 L.P.R.A. § 5241",
        "display_title_es": "Artículo 192 Financiamiento al terrorismo — 33 L.P.R.A. § 5241",
        "display_title_en": "Article 192 Terrorism Financing — 33 L.P.R.A. § 5241",
        "sort_key": "192.000",
        "category": "pr-penal",
        "title_es": "Financiamiento al terrorismo",
        "title_en": "Terrorism Financing",
        "description_es": "Proporcionar fondos o recursos para actividades terroristas.",
        "description_en": "Providing funds or resources for terrorist activities.",
        "keywords_es": ["financiamiento", "terrorismo", "dinero", "recursos"],
        "keywords_en": ["financing", "terrorism", "money", "resources"],
        "verified": true
    },
    {
        "id": "pr-penal-193",
        "article_number": "193",
        "citation": "33 L.P.R.A. § 5242",
        "display_title_es": "Artículo 193 Asociación ilícita — 33 L.P.R.A. § 5242",
        "display_title_en": "Article 193 Criminal Association — 33 L.P.R.A. § 5242",
        "sort_key": "193.000",
        "category": "pr-penal",
        "title_es": "Asociación ilícita",
        "title_en": "Criminal Association",
        "description_es": "Formar parte de organización dedicada a cometer delitos de manera habitual.",
        "description_en": "Being part of organization dedicated to habitually committing crimes.",
        "keywords_es": ["asociación", "ilícita", "organización", "criminal"],
        "keywords_en": ["association", "illicit", "organization", "criminal"],
        "verified": true
    },
    {
        "id": "pr-penal-194",
        "article_number": "194",
        "citation": "33 L.P.R.A. § 5243",
        "display_title_es": "Artículo 194 Asociación ilícita agravada — 33 L.P.R.A. § 5243",
        "display_title_en": "Article 194 Aggravated Criminal Association — 33 L.P.R.A. § 5243",
        "sort_key": "194.000",
        "category": "pr-penal",
        "title_es": "Asociación ilícita agravada",
        "title_en": "Aggravated Criminal Association",
        "description_es": "Asociación ilícita con fines de narcotráfico, trata de personas, o terrorismo.",
        "description_en": "Criminal association for drug trafficking, human trafficking, or terrorism purposes.",
        "keywords_es": ["asociación agravada", "narcotráfico", "trata personas"],
        "keywords_en": ["aggravated association", "drug trafficking", "human trafficking"],
        "verified": true
    },
    {
        "id": "pr-penal-195",
        "article_number": "195",
        "citation": "33 L.P.R.A. § 5244",
        "display_title_es": "Artículo 195 Conspiración — 33 L.P.R.A. § 5244",
        "display_title_en": "Article 195 Conspiracy — 33 L.P.R.A. § 5244",
        "sort_key": "195.000",
        "category": "pr-penal",
        "title_es": "Conspiración",
        "title_en": "Conspiracy",
        "description_es": "Acordar con otras personas cometer un delito, aunque no se ejecute.",
        "description_en": "Agreeing with others to commit a crime, even if not executed.",
        "keywords_es": ["conspiración", "acuerdo", "planear", "delito"],
        "keywords_en": ["conspiracy", "agreement", "plan", "crime"],
        "verified": true
    },
    {
        "id": "pr-penal-196",
        "article_number": "196",
        "citation": "33 L.P.R.A. § 5245",
        "display_title_es": "Artículo 196 Posesión ilegal de armas — 33 L.P.R.A. § 5245",
        "display_title_en": "Article 196 Illegal Possession of Weapons — 33 L.P.R.A. § 5245",
        "sort_key": "196.000",
        "category": "pr-penal",
        "title_es": "Posesión ilegal de armas",
        "title_en": "Illegal Possession of Weapons",
        "description_es": "Poseer armas de fuego, municiones o explosivos sin licencia o autorización legal.",
        "description_en": "Possessing firearms, ammunition, or explosives without license or legal authorization.",
        "keywords_es": ["armas", "posesión ilegal", "arma de fuego", "licencia"],
        "keywords_en": ["weapons", "illegal possession", "firearm", "license"],
        "verified": true
    },
    {
        "id": "pr-penal-197",
        "article_number": "197",
        "citation": "33 L.P.R.A. § 5246",
        "display_title_es": "Artículo 197 Trafico de armas — 33 L.P.R.A. § 5246",
        "display_title_en": "Article 197 Arms Trafficking — 33 L.P.R.A. § 5246",
        "sort_key": "197.000",
        "category": "pr-penal",
        "title_es": "Trafico de armas",
        "title_en": "Arms Trafficking",
        "description_es": "Comprar, vender, transportar o distribuir armas ilegalmente.",
        "description_en": "Buying, selling, transporting, or distributing weapons illegally.",
        "keywords_es": ["tráfico", "armas", "venta ilegal", "distribución"],
        "keywords_en": ["trafficking", "arms", "illegal sale", "distribution"],
        "verified": true
    },
    {
        "id": "pr-penal-198",
        "article_number": "198",
        "citation": "33 L.P.R.A. § 5247",
        "display_title_es": "Artículo 198 Fabricación ilegal de armas — 33 L.P.R.A. § 5247",
        "display_title_en": "Article 198 Illegal Manufacturing of Weapons — 33 L.P.R.A. § 5247",
        "sort_key": "198.000",
        "category": "pr-penal",
        "title_es": "Fabricación ilegal de armas",
        "title_en": "Illegal Manufacturing of Weapons",
        "description_es": "Fabricar, modificar o reparar armas sin autorización legal.",
        "description_en": "Manufacturing, modifying, or repairing weapons without legal authorization.",
        "keywords_es": ["fabricación", "armas", "ilegal", "modificar"],
        "keywords_en": ["manufacturing", "weapons", "illegal", "modify"],
        "verified": true
    },
    {
        "id": "pr-penal-199",
        "article_number": "199",
        "citation": "33 L.P.R.A. § 5248",
        "display_title_es": "Artículo 199 Porte ilegal de armas — 33 L.P.R.A. § 5248",
        "display_title_en": "Article 199 Illegal Carrying of Weapons — 33 L.P.R.A. § 5248",
        "sort_key": "199.000",
        "category": "pr-penal",
        "title_es": "Porte ilegal de armas",
        "title_en": "Illegal Carrying of Weapons",
        "description_es": "Portar armas de fuego en público sin permiso o licencia válida.",
        "description_en": "Carrying firearms in public without valid permit or license.",
        "keywords_es": ["porte", "armas", "ilegal", "público"],
        "keywords_en": ["carrying", "weapons", "illegal", "public"],
        "verified": true
    },
    {
        "id": "pr-penal-200",
        "article_number": "200",
        "citation": "33 L.P.R.A. § 5249",
        "display_title_es": "Artículo 200 Uso ilegal de explosivos — 33 L.P.R.A. § 5249",
        "display_title_en": "Article 200 Illegal Use of Explosives — 33 L.P.R.A. § 5249",
        "sort_key": "200.000",
        "category": "pr-penal",
        "title_es": "Uso ilegal de explosivos",
        "title_en": "Illegal Use of Explosives",
        "description_es": "Usar, poseer o detonar explosivos sin autorización o para fines delictivos.",
        "description_en": "Using, possessing, or detonating explosives without authorization or for criminal purposes.",
        "keywords_es": ["explosivos", "uso ilegal", "detonar", "bombas"],
        "keywords_en": ["explosives", "illegal use", "detonate", "bombs"],
        "verified": true
    },
    {
        "id": "pr-penal-200A",
        "article_number": "200A",
        "citation": "33 L.P.R.A. § 5249a",
        "display_title_es": "Artículo 200A Fabricación de explosivos caseros — 33 L.P.R.A. § 5249a",
        "display_title_en": "Article 200A Manufacture of Homemade Explosives — 33 L.P.R.A. § 5249a",
        "sort_key": "200.001",
        "category": "pr-penal",
        "title_es": "Fabricación de explosivos caseros",
        "title_en": "Manufacture of Homemade Explosives",
        "description_es": "Fabricar explosivos artesanales o dispositivos explosivos improvisados.",
        "description_en": "Manufacturing homemade explosives or improvised explosive devices.",
        "keywords_es": ["explosivos caseros", "IED", "bombas caseras"],
        "keywords_en": ["homemade explosives", "IED", "pipe bombs"],
        "verified": true
    },
    {
        "id": "pr-penal-201",
        "article_number": "201",
        "citation": "33 L.P.R.A. § 5250",
        "display_title_es": "Artículo 201 Amenaza de bomba — 33 L.P.R.A. § 5250",
        "display_title_en": "Article 201 Bomb Threat — 33 L.P.R.A. § 5250",
        "sort_key": "201.000",
        "category": "pr-penal",
        "title_es": "Amenaza de bomba",
        "title_en": "Bomb Threat",
        "description_es": "Amenazar con colocar o detonar explosivos, aunque no existan.",
        "description_en": "Threatening to place or detonate explosives, even if they don't exist.",
        "keywords_es": ["bomba", "amenaza", "explosivo", "terrorismo"],
        "keywords_en": ["bomb", "threat", "explosive", "terrorism"],
        "verified": true
    },
    {
        "id": "pr-penal-202",
        "article_number": "202",
        "citation": "33 L.P.R.A. § 5251",
        "display_title_es": "Artículo 202 Posesión de sustancias peligrosas — 33 L.P.R.A. § 5251",
        "display_title_en": "Article 202 Possession of Dangerous Substances — 33 L.P.R.A. § 5251",
        "sort_key": "202.000",
        "category": "pr-penal",
        "title_es": "Posesión de sustancias peligrosas",
        "title_en": "Possession of Dangerous Substances",
        "description_es": "Poseer sustancias tóxicas, químicas peligrosas o materiales radiactivos sin autorización.",
        "description_en": "Possessing toxic substances, hazardous chemicals, or radioactive materials without authorization.",
        "keywords_es": ["sustancias peligrosas", "tóxicas", "químicos", "radiactivos"],
        "keywords_en": ["dangerous substances", "toxic", "chemicals", "radioactive"],
        "verified": true
    },
    {
        "id": "pr-penal-203",
        "article_number": "203",
        "citation": "33 L.P.R.A. § 5252",
        "display_title_es": "Artículo 203 Contaminación ambiental — 33 L.P.R.A. § 5252",
        "display_title_en": "Article 203 Environmental Contamination — 33 L.P.R.A. § 5252",
        "sort_key": "203.000",
        "category": "pr-penal",
        "title_es": "Contaminación ambiental",
        "title_en": "Environmental Contamination",
        "description_es": "Contaminar aire, agua o suelo de manera que ponga en riesgo salud pública.",
        "description_en": "Contaminating air, water, or soil in a way that puts public health at risk.",
        "keywords_es": ["contaminación", "medio ambiente", "polución", "riesgo"],
        "keywords_en": ["contamination", "environment", "pollution", "risk"],
        "verified": true
    },
    {
        "id": "pr-penal-204",
        "article_number": "204",
        "citation": "33 L.P.R.A. § 5253",
        "display_title_es": "Artículo 204 Tráfico de desechos peligrosos — 33 L.P.R.A. § 5253",
        "display_title_en": "Article 204 Trafficking of Hazardous Waste — 33 L.P.R.A. § 5253",
        "sort_key": "204.000",
        "category": "pr-penal",
        "title_es": "Tráfico de desechos peligrosos",
        "title_en": "Trafficking of Hazardous Waste",
        "description_es": "Transportar, almacenar o eliminar desechos peligrosos de manera ilegal.",
        "description_en": "Transporting, storing, or disposing of hazardous waste illegally.",
        "keywords_es": ["desechos peligrosos", "tráfico", "tóxicos", "basura"],
        "keywords_en": ["hazardous waste", "trafficking", "toxic", "garbage"],
        "verified": true
    },
    {
        "id": "pr-penal-205",
        "article_number": "205",
        "citation": "33 L.P.R.A. § 5254",
        "display_title_es": "Artículo 205 Piratería — 33 L.P.R.A. § 5254",
        "display_title_en": "Article 205 Piracy — 33 L.P.R.A. § 5254",
        "sort_key": "205.000",
        "category": "pr-penal",
        "title_es": "Piratería",
        "title_en": "Piracy",
        "description_es": "Atacar o apoderarse de embarcación o aeronave por medio de violencia.",
        "description_en": "Attacking or seizing vessel or aircraft through violence.",
        "keywords_es": ["piratería", "embarcación", "barco", "secuestro"],
        "keywords_en": ["piracy", "vessel", "ship", "hijacking"],
        "verified": true
    },
    {
        "id": "pr-penal-206",
        "article_number": "206",
        "citation": "33 L.P.R.A. § 5255",
        "display_title_es": "Artículo 206 Secuestro aéreo — 33 L.P.R.A. § 5255",
        "display_title_en": "Article 206 Aircraft Hijacking — 33 L.P.R.A. § 5255",
        "sort_key": "206.000",
        "category": "pr-penal",
        "title_es": "Secuestro aéreo",
        "title_en": "Aircraft Hijacking",
        "description_es": "Apoderarse ilegalmente de aeronave en vuelo mediante violencia o amenazas.",
        "description_en": "Illegally seizing aircraft in flight through violence or threats.",
        "keywords_es": ["secuestro aéreo", "avión", "hijacking", "aeronave"],
        "keywords_en": ["aircraft hijacking", "airplane", "hijacking", "aircraft"],
        "verified": true
    },
    {
        "id": "pr-penal-207",
        "article_number": "207",
        "citation": "33 L.P.R.A. § 5256",
        "display_title_es": "Artículo 207 Sabotaje a infraestructura crítica — 33 L.P.R.A. § 5256",
        "display_title_en": "Article 207 Sabotage of Critical Infrastructure — 33 L.P.R.A. § 5256",
        "sort_key": "207.000",
        "category": "pr-penal",
        "title_es": "Sabotaje a infraestructura crítica",
        "title_en": "Sabotage of Critical Infrastructure",
        "description_es": "Dañar o destruir infraestructura esencial como plantas eléctricas, agua, o comunicaciones.",
        "description_en": "Damaging or destroying essential infrastructure such as power plants, water, or communications.",
        "keywords_es": ["sabotaje", "infraestructura", "eléctrica", "agua"],
        "keywords_en": ["sabotage", "infrastructure", "electric", "water"],
        "verified": true
    },
    {
        "id": "pr-penal-208",
        "article_number": "208",
        "citation": "33 L.P.R.A. § 5257",
        "display_title_es": "Artículo 208 Atentado con explosivos — 33 L.P.R.A. § 5257",
        "display_title_en": "Article 208 Explosive Attack — 33 L.P.R.A. § 5257",
        "sort_key": "208.000",
        "category": "pr-penal",
        "title_es": "Atentado con explosivos",
        "title_en": "Explosive Attack",
        "description_es": "Colocar o detonar explosivos para causar daño a personas o propiedad.",
        "description_en": "Placing or detonating explosives to cause damage to persons or property.",
        "keywords_es": ["atentado", "explosivos", "bomba", "detonar"],
        "keywords_en": ["attack", "explosives", "bomb", "detonate"],
        "verified": true
    },
    {
        "id": "pr-penal-208A",
        "article_number": "208-A",
        "citation": "33 L.P.R.A. § 5257a",
        "display_title_es": "Artículo 208-A Uso de artefactos incendiarios — 33 L.P.R.A. § 5257a",
        "display_title_en": "Article 208-A Use of Incendiary Devices — 33 L.P.R.A. § 5257a",
        "sort_key": "208.001",
        "category": "pr-penal",
        "title_es": "Uso de artefactos incendiarios",
        "title_en": "Use of Incendiary Devices",
        "description_es": "Fabricar o usar bombas molotov, cócteles molotov o dispositivos incendiarios.",
        "description_en": "Manufacturing or using molotov cocktails or incendiary devices.",
        "keywords_es": ["molotov", "incendiario", "bomba casera"],
        "keywords_en": ["molotov", "incendiary", "homemade bomb"],
        "verified": true
    },
    {
        "id": "pr-penal-209",
        "article_number": "209",
        "citation": "33 L.P.R.A. § 5258",
        "display_title_es": "Artículo 209 Amenazas de violencia masiva — 33 L.P.R.A. § 5258",
        "display_title_en": "Article 209 Mass Violence Threats — 33 L.P.R.A. § 5258",
        "sort_key": "209.000",
        "category": "pr-penal",
        "title_es": "Amenazas de violencia masiva",
        "title_en": "Mass Violence Threats",
        "description_es": "Amenazar con causar daño a múltiples personas en lugares públicos.",
        "description_en": "Threatening to cause harm to multiple persons in public places.",
        "keywords_es": ["amenazas", "violencia masiva", "público", "masacre"],
        "keywords_en": ["threats", "mass violence", "public", "massacre"],
        "verified": true
    },
    {
        "id": "pr-penal-210",
        "article_number": "210",
        "citation": "33 L.P.R.A. § 5259",
        "display_title_es": "Artículo 210 Riesgo catastrófico — 33 L.P.R.A. § 5259",
        "display_title_en": "Article 210 Catastrophic Risk — 33 L.P.R.A. § 5259",
        "sort_key": "210.000",
        "category": "pr-penal",
        "title_es": "Riesgo catastrófico",
        "title_en": "Catastrophic Risk",
        "description_es": "Crear riesgo de desastre mayor mediante manipulación de sistemas críticos.",
        "description_en": "Creating risk of major disaster through manipulation of critical systems.",
        "keywords_es": ["riesgo", "catástrofe", "desastre", "sistemas críticos"],
        "keywords_en": ["risk", "catastrophe", "disaster", "critical systems"],
        "verified": true
    },
    {
        "id": "pr-penal-211",
        "article_number": "211",
        "citation": "33 L.P.R.A. § 5260",
        "display_title_es": "Artículo 211  posesión de sustancias controladas — 33 L.P.R.A. § 5260",
        "display_title_en": "Article 211 Possession of Controlled Substances — 33 L.P.R.A. § 5260",
        "sort_key": "211.000",
        "category": "pr-penal",
        "title_es": " posesión de sustancias controladas",
        "title_en": "Possession of Controlled Substances",
        "description_es": "Poseer drogas ilegales o sustancias controladas sin prescripción médica válida.",
        "description_en": "Possessing illegal drugs or controlled substances without valid medical prescription.",
        "keywords_es": ["drogas", "posesión", "sustancias controladas", "narcóticos"],
        "keywords_en": ["drugs", "possession", "controlled substances", "narcotics"],
        "verified": true
    },
    {
        "id": "pr-penal-212",
        "article_number": "212",
        "citation": "33 L.P.R.A. § 5261",
        "display_title_es": "Artículo 212 Posesión con intento de distribución — 33 L.P.R.A. § 5261",
        "display_title_en": "Article 212 Possession with Intent to Distribute — 33 L.P.R.A. § 5261",
        "sort_key": "212.000",
        "category": "pr-penal",
        "title_es": "Posesión con intento de distribución",
        "title_en": "Possession with Intent to Distribute",
        "description_es": "Poseer drogas en cantidad o condiciones que indiquen intención de vender o distribuir.",
        "description_en": "Possessing drugs in quantity or conditions indicating intent to sell or distribute.",
        "keywords_es": ["posesión", "distribución", "venta", "narcotráfico"],
        "keywords_en": ["possession", "distribution", "sale", "drug trafficking"],
        "verified": true
    },
    {
        "id": "pr-penal-213",
        "article_number": "213",
        "citation": "33 L.P.R.A. § 5262",
        "display_title_es": "Artículo 213 Distribución de drogas — 33 L.P.R.A. § 5262",
        "display_title_en": "Article 213 Drug Distribution — 33 L.P.R.A. § 5262",
        "sort_key": "213.000",
        "category": "pr-penal",
        "title_es": "Distribución de drogas",
        "title_en": "Drug Distribution",
        "description_es": "Vender, entregar o distribuir drogas ilegales a otras personas.",
        "description_en": "Selling, delivering, or distributing illegal drugs to other persons.",
        "keywords_es": ["distribución", "droga", "venta", "tráfico"],
        "keywords_en": ["distribution", "drug", "sale", "trafficking"],
        "verified": true
    },
    {
        "id": "pr-penal-214",
        "article_number": "214",
        "citation": "33 L.P.R.A. § 5263",
        "display_title_es": "Artículo 214 Fabricación de drogas — 33 L.P.R.A. § 5263",
        "display_title_en": "Article 214 Drug Manufacturing — 33 L.P.R.A. § 5263",
        "sort_key": "214.000",
        "category": "pr-penal",
        "title_es": "Fabricación de drogas",
        "title_en": "Drug Manufacturing",
        "description_es": "Producir, procesar o fabricar drogas ilegales o sustancias controladas.",
        "description_en": "Producing, processing, or manufacturing illegal drugs or controlled substances.",
        "keywords_es": ["fabricación", "droga", "producir", "laboratorio"],
        "keywords_en": ["manufacturing", "drug", "produce", "laboratory"],
        "verified": true
    },
    {
        "id": "pr-penal-215",
        "article_number": "215",
        "citation": "33 L.P.R.A. § 5264",
        "display_title_es": "Artículo 215 Cultivo de marihuana — 33 L.P.R.A. § 5264",
        "display_title_en": "Article 215 Marijuana Cultivation — 33 L.P.R.A. § 5264",
        "sort_key": "215.000",
        "category": "pr-penal",
        "title_es": "Cultivo de marihuana",
        "title_en": "Marijuana Cultivation",
        "description_es": "Cultivar plantas de cannabis/marihuana de manera ilegal.",
        "description_en": "Cultivating cannabis/marijuana plants illegally.",
        "keywords_es": ["cultivo", "marihuana", "cannabis", "plantas"],
        "keywords_en": ["cultivation", "marijuana", "cannabis", "plants"],
        "verified": true
    },
    {
        "id": "pr-penal-216",
        "article_number": "216",
        "citation": "33 L.P.R.A. § 5265",
        "display_title_es": "Artículo 216 Tráfico de drogas — 33 L.P.R.A. § 5265",
        "display_title_en": "Article 216 Drug Trafficking — 33 L.P.R.A. § 5265",
        "sort_key": "216.000",
        "category": "pr-penal",
        "title_es": "Tráfico de drogas",
        "title_en": "Drug Trafficking",
        "description_es": "Transportar, importar, exportar o comercializar drogas ilegales a gran escala.",
        "description_en": "Transporting, importing, exporting, or commercializing illegal drugs on large scale.",
        "keywords_es": ["tráfico", "droga", "narcotráfico", "transportar"],
        "keywords_en": ["trafficking", "drug", "narcotics", "transport"],
        "verified": true
    },
    {
        "id": "pr-penal-217",
        "article_number": "217",
        "citation": "33 L.P.R.A. § 5266",
        "display_title_es": "Artículo 217 Tráfico de drogas agravado — 33 L.P.R.A. § 5266",
        "display_title_en": "Article 217 Aggravated Drug Trafficking — 33 L.P.R.A. § 5266",
        "sort_key": "217.000",
        "category": "pr-penal",
        "title_es": "Tráfico de drogas agravado",
        "title_en": "Aggravated Drug Trafficking",
        "description_es": "Tráfico de drogas con armas, cerca de escuelas, o involucrando menores.",
        "description_en": "Drug trafficking with weapons, near schools, or involving minors.",
        "keywords_es": ["tráfico agravado", "armas", "escuela", "menor"],
        "keywords_en": ["aggravated trafficking", "weapons", "school", "minor"],
        "verified": true
    },
    {
        "id": "pr-penal-218",
        "article_number": "218",
        "citation": "33 L.P.R.A. § 5267",
        "display_title_es": "Artículo 218 Lavado de dinero de drogas — 33 L.P.R.A. § 5267",
        "display_title_en": "Article 218 Drug Money Laundering — 33 L.P.R.A. § 5267",
        "sort_key": "218.000",
        "category": "pr-penal",
        "title_es": "Lavado de dinero de drogas",
        "title_en": "Drug Money Laundering",
        "description_es": "Ocultar origen de dinero proveniente de actividades de narcotráfico.",
        "description_en": "Concealing origin of money from drug trafficking activities.",
        "keywords_es": ["lavado", "dinero", "narcotráfico", "ocultar"],
        "keywords_en": ["laundering", "money", "drug trafficking", "conceal"],
        "verified": true
    },
    {
        "id": "pr-penal-219",
        "article_number": "219",
        "citation": "33 L.P.R.A. § 5268",
        "display_title_es": "Artículo 219 Conspiración de drogas — 33 L.P.R.A. § 5268",
        "display_title_en": "Article 219 Drug Conspiracy — 33 L.P.R.A. § 5268",
        "sort_key": "219.000",
        "category": "pr-penal",
        "title_es": "Conspiración de drogas",
        "title_en": "Drug Conspiracy",
        "description_es": "Acordar con otros participar en actividades de narcotráfico.",
        "description_en": "Agreeing with others to participate in drug trafficking activities.",
        "keywords_es": ["conspiración", "droga", "acuerdo", "narcotráfico"],
        "keywords_en": ["conspiracy", "drug", "agreement", "trafficking"],
        "verified": true
    },
    {
        "id": "pr-penal-220",
        "article_number": "220",
        "citation": "33 L.P.R.A. § 5269",
        "display_title_es": "Artículo 220 Introducción de drogas a cárceles — 33 L.P.R.A. § 5269",
        "display_title_en": "Article 220 Drug Introduction to Prisons — 33 L.P.R.A. § 5269",
        "sort_key": "220.000",
        "category": "pr-penal",
        "title_es": "Introducción de drogas a cárceles",
        "title_en": "Drug Introduction to Prisons",
        "description_es": "Introducir drogas a establecimientos penales o centros de detención.",
        "description_en": "Introducing drugs into penal establishments or detention centers.",
        "keywords_es": ["introducción", "droga", "prisión", "cárcel"],
        "keywords_en": ["introduction", "drug", "prison", "jail"],
        "verified": true
    },
    {
        "id": "pr-penal-221",
        "article_number": "221",
        "citation": "33 L.P.R.A. § 5270",
        "display_title_es": "Artículo 221 Venta de drogas a menores — 33 L.P.R.A. § 5270",
        "display_title_en": "Article 221 Drug Sale to Minors — 33 L.P.R.A. § 5270",
        "sort_key": "221.000",
        "category": "pr-penal",
        "title_es": "Venta de drogas a menores",
        "title_en": "Drug Sale to Minors",
        "description_es": "Vender o distribuir drogas ilegales a personas menores de edad.",
        "description_en": "Selling or distributing illegal drugs to persons under age.",
        "keywords_es": ["venta", "droga", "menor", "niño"],
        "keywords_en": ["sale", "drug", "minor", "child"],
        "verified": true
    },
    {
        "id": "pr-penal-222",
        "article_number": "222",
        "citation": "33 L.P.R.A. § 5271",
        "display_title_es": "Artículo 222 Distribución cerca de escuelas — 33 L.P.R.A. § 5271",
        "display_title_en": "Article 222 Distribution Near Schools — 33 L.P.R.A. § 5271",
        "sort_key": "222.000",
        "category": "pr-penal",
        "title_es": "Distribución cerca de escuelas",
        "title_en": "Distribution Near Schools",
        "description_es": "Vender o distribuir drogas dentro de zona escolar o cerca de instalaciones educativas.",
        "description_en": "Selling or distributing drugs within school zone or near educational facilities.",
        "keywords_es": ["distribución", "escuela", "zona escolar", "droga"],
        "keywords_en": ["distribution", "school", "school zone", "drug"],
        "verified": true
    },
    {
        "id": "pr-penal-223",
        "article_number": "223",
        "citation": "33 L.P.R.A. § 5272",
        "display_title_es": "Artículo 223 Posesión de precursores químicos — 33 L.P.R.A. § 5272",
        "display_title_en": "Article 223 Possession of Chemical Precursors — 33 L.P.R.A. § 5272",
        "sort_key": "223.000",
        "category": "pr-penal",
        "title_es": "Posesión de precursores químicos",
        "title_en": "Possession of Chemical Precursors",
        "description_es": "Poseer sustancias químicas usadas para fabricar drogas sintéticas.",
        "description_en": "Possessing chemical substances used to manufacture synthetic drugs.",
        "keywords_es": ["precursores", "químicos", "fabricar drogas", "sustancias"],
        "keywords_en": ["precursors", "chemicals", "manufacture drugs", "substances"],
        "verified": true
    },
    {
        "id": "pr-penal-224",
        "article_number": "224",
        "citation": "33 L.P.R.A. § 5273",
        "display_title_es": "Artículo 224 Operación de laboratorio de drogas — 33 L.P.R.A. § 5273",
        "display_title_en": "Article 224 Drug Lab Operation — 33 L.P.R.A. § 5273",
        "sort_key": "224.000",
        "category": "pr-penal",
        "title_es": "Operación de laboratorio de drogas",
        "title_en": "Drug Lab Operation",
        "description_es": "Operar laboratorio clandestino para fabricación de drogas sintéticas.",
        "description_en": "Operating clandestine laboratory for manufacturing synthetic drugs.",
        "keywords_es": ["laboratorio", "droga", "clandestino", "metanfetamina"],
        "keywords_en": ["laboratory", "drug", "clandestine", "methamphetamine"],
        "verified": true
    },
    {
        "id": "pr-penal-225",
        "article_number": "225",
        "citation": "33 L.P.R.A. § 5274",
        "display_title_es": "Artículo 225 Tráfico internacional de drogas — 33 L.P.R.A. § 5274",
        "display_title_en": "Article 225 International Drug Trafficking — 33 L.P.R.A. § 5274",
        "sort_key": "225.000",
        "category": "pr-penal",
        "title_es": "Tráfico internacional de drogas",
        "title_en": "International Drug Trafficking",
        "description_es": "Importar o exportar drogas ilegales a través de fronteras internacionales.",
        "description_en": "Importing or exporting illegal drugs across international borders.",
        "keywords_es": ["tráfico internacional", "droga", "frontera", "importar"],
        "keywords_en": ["international trafficking", "drug", "border", "import"],
        "verified": true
    },
    {
        "id": "pr-penal-226",
        "article_number": "226",
        "citation": "33 L.P.R.A. § 5275",
        "display_title_es": "Artículo 226 Uso de comunicaciones en narcotráfico — 33 L.P.R.A. § 5275",
        "display_title_en": "Article 226 Use of Communications in Drug Trafficking — 33 L.P.R.A. § 5275",
        "sort_key": "226.000",
        "category": "pr-penal",
        "title_es": "Uso de comunicaciones en narcotráfico",
        "title_en": "Use of Communications in Drug Trafficking",
        "description_es": "Usar teléfono, radio o internet para coordinar actividades de narcotráfico.",
        "description_en": "Using phone, radio, or internet to coordinate drug trafficking activities.",
        "keywords_es": ["comunicaciones", "teléfono", "narcotráfico", "coordinar"],
        "keywords_en": ["communications", "phone", "drug trafficking", "coordinate"],
        "verified": true
    },
    {
        "id": "pr-penal-227",
        "article_number": "227",
        "citation": "33 L.P.R.A. § 5276",
        "display_title_es": "Artículo 227 Corrupción relacionada con drogas — 33 L.P.R.A. § 5276",
        "display_title_en": "Article 227 Drug-Related Corruption — 33 L.P.R.A. § 5276",
        "sort_key": "227.000",
        "category": "pr-penal",
        "title_es": "Corrupción relacionada con drogas",
        "title_en": "Drug-Related Corruption",
        "description_es": "Sobornar funcionarios para facilitar actividades de narcotráfico.",
        "description_en": "Bribing officials to facilitate drug trafficking activities.",
        "keywords_es": ["corrupción", "droga", "soborno", "funcionario"],
        "keywords_en": ["corruption", "drug", "bribe", "official"],
        "verified": true
    },
    {
        "id": "pr-penal-228",
        "article_number": "228",
        "citation": "33 L.P.R.A. § 5277",
        "display_title_es": "Artículo 228 Enriquecimiento de narcotráfico — 33 L.P.R.A. § 5277",
        "display_title_en": "Article 228 Drug Trafficking Enrichment — 33 L.P.R.A. § 5277",
        "sort_key": "228.000",
        "category": "pr-penal",
        "title_es": "Enriquecimiento de narcotráfico",
        "title_en": "Drug Trafficking Enrichment",
        "description_es": "Obtener beneficios económicos significativos de actividades de narcotráfico.",
        "description_en": "Obtaining significant economic benefits from drug trafficking activities.",
        "keywords_es": ["enriquecimiento", "narcotráfico", "dinero", "beneficios"],
        "keywords_en": ["enrichment", "drug trafficking", "money", "benefits"],
        "verified": true
    },
    {
        "id": "pr-penal-229",
        "article_number": "229",
        "citation": "33 L.P.R.A. § 5278",
        "display_title_es": "Artículo 229 Asociación para narcotráfico — 33 L.P.R.A. § 5278",
        "display_title_en": "Article 229 Association for Drug Trafficking — 33 L.P.R.A. § 5278",
        "sort_key": "229.000",
        "category": "pr-penal",
        "title_es": "Asociación para narcotráfico",
        "title_en": "Association for Drug Trafficking",
        "description_es": "Formar parte de organización dedicada específicamente al narcotráfico.",
        "description_en": "Being part of organization dedicated specifically to drug trafficking.",
        "keywords_es": ["asociación", "narcotráfico", "organización", "cartel"],
        "keywords_en": ["association", "drug trafficking", "organization", "cartel"],
        "verified": true
    },
    {
        "id": "pr-penal-230",
        "article_number": "230",
        "citation": "33 L.P.R.A. § 5279",
        "display_title_es": "Artículo 230 Delitos relacionados con drogas sintéticas — 33 L.P.R.A. § 5279",
        "display_title_en": "Article 230 Synthetic Drug Offenses — 33 L.P.R.A. § 5279",
        "sort_key": "230.000",
        "category": "pr-penal",
        "title_es": "Delitos relacionados con drogas sintéticas",
        "title_en": "Synthetic Drug Offenses",
        "description_es": "Fabricar, distribuir o poseer drogas sintéticas como fentanilo, éxtasis, o anfetaminas.",
        "description_en": "Manufacturing, distributing, or possessing synthetic drugs like fentanyl, ecstasy, or amphetamines.",
        "keywords_es": ["drogas sintéticas", "fentanilo", "éxtasis", "anfetaminas"],
        "keywords_en": ["synthetic drugs", "fentanyl", "ecstasy", "amphetamines"],
        "verified": true
    },
    {
        "id": "pr-penal-231",
        "article_number": "231",
        "citation": "33 L.P.R.A. § 5280",
        "display_title_es": "Artículo 231 Monopolio ilegal — 33 L.P.R.A. § 5280",
        "display_title_en": "Article 231 Illegal Monopoly — 33 L.P.R.A. § 5280",
        "sort_key": "231.000",
        "category": "pr-penal",
        "title_es": "Monopolio ilegal",
        "title_en": "Illegal Monopoly",
        "description_es": "Controlar o dominar mercado de manera ilegal para eliminar competencia.",
        "description_en": "Controlling or dominating market illegally to eliminate competition.",
        "keywords_es": ["monopolio", "ilegal", "mercado", "competencia"],
        "keywords_en": ["monopoly", "illegal", "market", "competition"],
        "verified": true
    },
    {
        "id": "pr-penal-232",
        "article_number": "232",
        "citation": "33 L.P.R.A. § 5281",
        "display_title_es": "Artículo 232 Prácticas restrictivas — 33 L.P.R.A. § 5281",
        "display_title_en": "Article 232 Restrictive Practices — 33 L.P.R.A. § 5281",
        "sort_key": "232.000",
        "category": "pr-penal",
        "title_es": "Prácticas restrictivas",
        "title_en": "Restrictive Practices",
        "description_es": "Acordar con competidores fijar precios, dividir mercados o limitar producción.",
        "description_en": "Agreeing with competitors to fix prices, divide markets, or limit production.",
        "keywords_es": ["prácticas restrictivas", "precios", "mercado", "acuerdo"],
        "keywords_en": ["restrictive practices", "prices", "market", "agreement"],
        "verified": true
    },
    {
        "id": "pr-penal-233",
        "article_number": "233",
        "citation": "33 L.P.R.A. § 5282",
        "display_title_es": "Artículo 233 Competencia desleal — 33 L.P.R.A. § 5282",
        "display_title_en": "Article 233 Unfair Competition — 33 L.P.R.A. § 5282",
        "sort_key": "233.000",
        "category": "pr-penal",
        "title_es": "Competencia desleal",
        "title_en": "Unfair Competition",
        "description_es": "Usar métodos deshonestos o ilícitos para obtener ventaja sobre competidores.",
        "description_en": "Using dishonest or illicit methods to gain advantage over competitors.",
        "keywords_es": ["competencia", "desleal", "deshonesto", "ventaja"],
        "keywords_en": ["competition", "unfair", "dishonest", "advantage"],
        "verified": true
    },
    {
        "id": "pr-penal-234",
        "article_number": "234",
        "citation": "33 L.P.R.A. § 5283",
        "display_title_es": "Artículo 234 Especulación de precios — 33 L.P.R.A. § 5283",
        "display_title_en": "Article 234 Price Speculation — 33 L.P.R.A. § 5283",
        "sort_key": "234.000",
        "category": "pr-penal",
        "title_es": "Especulación de precios",
        "title_en": "Price Speculation",
        "description_es": "Manipular artificialmente precios de bienes o servicios esenciales.",
        "description_en": "Artificially manipulating prices of essential goods or services.",
        "keywords_es": ["especulación", "precios", "manipular", "bienes"],
        "keywords_en": ["speculation", "prices", "manipulate", "goods"],
        "verified": true
    },
    {
        "id": "pr-penal-235",
        "article_number": "235",
        "citation": "33 L.P.R.A. § 5284",
        "display_title_es": "Artículo 235 Acaparamiento — 33 L.P.R.A. § 5284",
        "display_title_en": "Article 235 Hoarding — 33 L.P.R.A. § 5284",
        "sort_key": "235.000",
        "category": "pr-penal",
        "title_es": "Acaparamiento",
        "title_en": "Hoarding",
        "description_es": "Acumular bienes esenciales para crear escasez artificial y aumentar precios.",
        "description_en": "Accumulating essential goods to create artificial scarcity and increase prices.",
        "keywords_es": ["acaparamiento", "bienes", "escasez", "precios"],
        "keywords_en": ["hoarding", "goods", "scarcity", "prices"],
        "verified": true
    },
    {
        "id": "pr-penal-236",
        "article_number": "236",
        "citation": "33 L.P.R.A. § 5285",
        "display_title_es": "Artículo 236 Venta de productos falsificados — 33 L.P.R.A. § 5285",
        "display_title_en": "Article 236 Sale of Counterfeit Products — 33 L.P.R.A. § 5285",
        "sort_key": "236.000",
        "category": "pr-penal",
        "title_es": "Venta de productos falsificados",
        "title_en": "Sale of Counterfeit Products",
        "description_es": "Vender productos que imitan marcas o patentes sin autorización.",
        "description_en": "Selling products that imitate brands or patents without authorization.",
        "keywords_es": ["productos falsificados", "imitación", "marca", "patente"],
        "keywords_en": ["counterfeit products", "imitation", "brand", "patent"],
        "verified": true
    },
    {
        "id": "pr-penal-237",
        "article_number": "237",
        "citation": "33 L.P.R.A. § 5286",
        "display_title_es": "Artículo 237 Violación de derechos de autor — 33 L.P.R.A. § 5286",
        "display_title_en": "Article 237 Copyright Infringement — 33 L.P.R.A. § 5286",
        "sort_key": "237.000",
        "category": "pr-penal",
        "title_es": "Violación de derechos de autor",
        "title_en": "Copyright Infringement",
        "description_es": "Usar o distribuir obras protegidas por derechos de autor sin permiso.",
        "description_en": "Using or distributing works protected by copyright without permission.",
        "keywords_es": ["derechos autor", "copyright", "piratería", "obra"],
        "keywords_en": ["copyright", "infringement", "piracy", "work"],
        "verified": true
    },
    {
        "id": "pr-penal-238",
        "article_number": "238",
        "citation": "33 L.P.R.A. § 5287",
        "display_title_es": "Artículo 238 Violación de marcas comerciales — 33 L.P.R.A. § 5287",
        "display_title_en": "Article 238 Trademark Infringement — 33 L.P.R.A. § 5287",
        "sort_key": "238.000",
        "category": "pr-penal",
        "title_es": "Violación de marcas comerciales",
        "title_en": "Trademark Infringement",
        "description_es": "Usar marca registrada sin autorización para confundir a consumidores.",
        "description_en": "Using registered trademark without authorization to confuse consumers.",
        "keywords_es": ["marca comercial", "trademark", "registrada", "imitar"],
        "keywords_en": ["trademark", "infringement", "registered", "imitate"],
        "verified": true
    },
    {
        "id": "pr-penal-239",
        "article_number": "239",
        "citation": "33 L.P.R.A. § 5288",
        "display_title_es": "Artículo 239 Publicidad engañosa — 33 L.P.R.A. § 5288",
        "display_title_en": "Article 239 False Advertising — 33 L.P.R.A. § 5288",
        "sort_key": "239.000",
        "category": "pr-penal",
        "title_es": "Publicidad engañosa",
        "title_en": "False Advertising",
        "description_es": "Hacer afirmaciones falsas o engañosas en publicidad de productos o servicios.",
        "description_en": "Making false or misleading claims in advertising of products or services.",
        "keywords_es": ["publicidad", "engañosa", "falsa", "anuncio"],
        "keywords_en": ["advertising", "false", "misleading", "ad"],
        "verified": true
    },
    {
        "id": "pr-penal-240",
        "article_number": "240",
        "citation": "33 L.P.R.A. § 5289",
        "display_title_es": "Artículo 240 Prácticas de pirámide — 33 L.P.R.A. § 5289",
        "display_title_en": "Article 240 Pyramid Schemes — 33 L.P.R.A. § 5289",
        "sort_key": "240.000",
        "category": "pr-penal",
        "title_es": "Prácticas de pirámide",
        "title_en": "Pyramid Schemes",
        "description_es": "Operar esquemas donde ganancias dependen de reclutar nuevos participantes.",
        "description_en": "Operating schemes where profits depend on recruiting new participants.",
        "keywords_es": ["pirámide", "esquema", "reclutar", "estafa"],
        "keywords_en": ["pyramid", "scheme", "recruit", "scam"],
        "verified": true
    },
    {
        "id": "pr-penal-241",
        "article_number": "241",
        "citation": "33 L.P.R.A. § 5290",
        "display_title_es": "Artículo 241 Fraude en valores — 33 L.P.R.A. § 5290",
        "display_title_en": "Article 241 Securities Fraud — 33 L.P.R.A. § 5290",
        "sort_key": "241.000",
        "category": "pr-penal",
        "title_es": "Fraude en valores",
        "title_en": "Securities Fraud",
        "description_es": "Manipular información sobre acciones, bonos u otros valores financieros.",
        "description_en": "Manipulating information about stocks, bonds, or other financial securities.",
        "keywords_es": ["fraude", "valores", "acciones", "bonos"],
        "keywords_en": ["fraud", "securities", "stocks", "bonds"],
        "verified": true
    },
    {
        "id": "pr-penal-242",
        "article_number": "242",
        "citation": "33 L.P.R.A. § 5291",
        "display_title_es": "Artículo 242 Insider trading — 33 L.P.R.A. § 5291",
        "display_title_en": "Article 242 Insider Trading — 33 L.P.R.A. § 5291",
        "sort_key": "242.000",
        "category": "pr-penal",
        "title_es": "Insider trading",
        "title_en": "Insider Trading",
        "description_es": "Usar información confidencial para comprar o vender valores financieros.",
        "description_en": "Using confidential information to buy or sell financial securities.",
        "keywords_es": ["insider trading", "información confidencial", "valores", "acciones"],
        "keywords_en": ["insider trading", "confidential information", "securities", "stocks"],
        "verified": true
    },
    {
        "id": "pr-penal-242A",
        "article_number": "242A",
        "citation": "33 L.P.R.A. § 5291a",
        "display_title_es": "Artículo 242A Manipulación de mercado — 33 L.P.R.A. § 5291a",
        "display_title_en": "Article 242A Market Manipulation — 33 L.P.R.A. § 5291a",
        "sort_key": "242.001",
        "category": "pr-penal",
        "title_es": "Manipulación de mercado",
        "title_en": "Market Manipulation",
        "description_es": "Manipular artificialmente precios de valores para obtener ganancias ilícitas.",
        "description_en": "Artificially manipulating securities prices to obtain illicit gains.",
        "keywords_es": ["manipulación", "mercado", "precios", "valores"],
        "keywords_en": ["manipulation", "market", "prices", "securities"],
        "verified": true
    },
    {
        "id": "pr-penal-243",
        "article_number": "243",
        "citation": "33 L.P.R.A. § 5292",
        "display_title_es": "Artículo 243 Fraude fiscal — 33 L.P.R.A. § 5292",
        "display_title_en": "Article 243 Tax Fraud — 33 L.P.R.A. § 5292",
        "sort_key": "243.000",
        "category": "pr-penal",
        "title_es": "Fraude fiscal",
        "title_en": "Tax Fraud",
        "description_es": "Evadir impuestos mediante declaraciones falsas u ocultación de ingresos.",
        "description_en": "Evading taxes through false declarations or concealment of income.",
        "keywords_es": ["fraude fiscal", "evasión", "impuestos", "Hacienda"],
        "keywords_en": ["tax fraud", "evasion", "taxes", "IRS"],
        "verified": true
    },
    {
        "id": "pr-penal-244",
        "article_number": "244",
        "citation": "33 L.P.R.A. § 5293",
        "display_title_es": "Artículo 244 Contrabando — 33 L.P.R.A. § 5293",
        "display_title_en": "Article 244 Smuggling — 33 L.P.R.A. § 5293",
        "sort_key": "244.000",
        "category": "pr-penal",
        "title_es": "Contrabando",
        "title_en": "Smuggling",
        "description_es": "Introducir o sacar mercancía del país evadiendo impuestos o controles aduaneros.",
        "description_en": "Bringing merchandise into or out of country evading taxes or customs controls.",
        "keywords_es": ["contrabando", "aduana", "impuestos", "mercancía"],
        "keywords_en": ["smuggling", "customs", "taxes", "merchandise"],
        "verified": true
    },
    {
        "id": "pr-penal-245",
        "article_number": "245",
        "citation": "33 L.P.R.A. § 5294",
        "display_title_es": "Artículo 245 Contrabando de drogas — 33 L.P.R.A. § 5294",
        "display_title_en": "Article 245 Drug Smuggling — 33 L.P.R.A. § 5294",
        "sort_key": "245.000",
        "category": "pr-penal",
        "title_es": "Contrabando de drogas",
        "title_en": "Drug Smuggling",
        "description_es": "Introducir drogas al país ocultándolas en mercancía o equipaje.",
        "description_en": "Bringing drugs into country concealed in merchandise or luggage.",
        "keywords_es": ["contrabando", "droga", "narcóticos", "frontera"],
        "keywords_en": ["smuggling", "drug", "narcotics", "border"],
        "verified": true
    },
    {
        "id": "pr-penal-246",
        "article_number": "246",
        "citation": "33 L.P.R.A. § 5295",
        "display_title_es": "Artículo 246 Evasión de impuestos — 33 L.P.R.A. § 5295",
        "display_title_en": "Article 246 Tax Evasion — 33 L.P.R.A. § 5295",
        "sort_key": "246.000",
        "category": "pr-penal",
        "title_es": "Evasión de impuestos",
        "title_en": "Tax Evasion",
        "description_es": "No pagar impuestos legalmente debidos mediante engaño o ocultación.",
        "description_en": "Not paying legally due taxes through deception or concealment.",
        "keywords_es": ["evasión", "impuestos", "no pagar", "engaño"],
        "keywords_en": ["evasion", "taxes", "not pay", "deception"],
        "verified": true
    },
    {
        "id": "pr-penal-247",
        "article_number": "247",
        "citation": "33 L.P.R.A. § 5296",
        "display_title_es": "Artículo 247 Defraudación fiscal — 33 L.P.R.A. § 5296",
        "display_title_en": "Article 247 Tax Defraudation — 33 L.P.R.A. § 5296",
        "sort_key": "247.000",
        "category": "pr-penal",
        "title_es": "Defraudación fiscal",
        "title_en": "Tax Defraudation",
        "description_es": "Presentar declaraciones de impuestos falsas o fraudulentas.",
        "description_en": "Submitting false or fraudulent tax declarations.",
        "keywords_es": ["defraudación", "fiscal", "impuestos", "declaración falsa"],
        "keywords_en": ["defraudation", "fiscal", "taxes", "false declaration"],
        "verified": true
    },
    {
        "id": "pr-penal-248",
        "article_number": "248",
        "citation": "33 L.P.R.A. § 5297",
        "display_title_es": "Artículo 248 Operaciones con dinero ilícito — 33 L.P.R.A. § 5297",
        "display_title_en": "Article 248 Operations with Illicit Money — 33 L.P.R.A. § 5297",
        "sort_key": "248.000",
        "category": "pr-penal",
        "title_es": "Operaciones con dinero ilícito",
        "title_en": "Operations with Illicit Money",
        "description_es": "Realizar transacciones financieras usando dinero de origen ilícito.",
        "description_en": "Conducting financial transactions using money of illicit origin.",
        "keywords_es": ["dinero ilícito", "transacciones", "financieras", "ilegal"],
        "keywords_en": ["illicit money", "transactions", "financial", "illegal"],
        "verified": true
    },
    {
        "id": "pr-penal-249",
        "article_number": "249",
        "citation": "33 L.P.R.A. § 5298",
        "display_title_es": "Artículo 249 Lavado de activos — 33 L.P.R.A. § 5298",
        "display_title_en": "Article 249 Money Laundering — 33 L.P.R.A. § 5298",
        "sort_key": "249.000",
        "category": "pr-penal",
        "title_es": "Lavado de activos",
        "title_en": "Money Laundering",
        "description_es": "Ocultar origen de dinero obtenido ilegalmente mediante transacciones complejas.",
        "description_en": "Concealing origin of illegally obtained money through complex transactions.",
        "keywords_es": ["lavado", "activos", "dinero", "ocultar origen"],
        "keywords_en": ["laundering", "assets", "money", "conceal origin"],
        "verified": true
    },
    {
        "id": "pr-penal-250",
        "article_number": "250",
        "citation": "33 L.P.R.A. § 5299",
        "display_title_es": "Artículo 250 Financiamiento ilegal de campañas — 33 L.P.R.A. § 5299",
        "display_title_en": "Article 250 Illegal Campaign Financing — 33 L.P.R.A. § 5299",
        "sort_key": "250.000",
        "category": "pr-penal",
        "title_es": "Financiamiento ilegal de campañas",
        "title_en": "Illegal Campaign Financing",
        "description_es": "Financiar campañas políticas con dinero de origen ilícito o excediendo límites legales.",
        "description_en": "Financing political campaigns with money of illicit origin or exceeding legal limits.",
        "keywords_es": ["financiamiento", "campaña", "política", "dinero ilegal"],
        "keywords_en": ["financing", "campaign", "political", "illegal money"],
        "verified": true
    },
    {
        "id": "pr-penal-251",
        "article_number": "251",
        "citation": "33 L.P.R.A. § 5300",
        "display_title_es": "Artículo 251 Falsedad documental — 33 L.P.R.A. § 5300",
        "display_title_en": "Article 251 Documentary Falsehood — 33 L.P.R.A. § 5300",
        "sort_key": "251.000",
        "category": "pr-penal",
        "title_es": "Falsedad documental",
        "title_en": "Documentary Falsehood",
        "description_es": "Crear, alterar o usar documentos falsos para inducir a error.",
        "description_en": "Creating, altering, or using false documents to induce error.",
        "keywords_es": ["falsedad", "documento", "falso", "alterar"],
        "keywords_en": ["falsehood", "document", "false", "alter"],
        "verified": true
    },
    {
        "id": "pr-penal-252",
        "article_number": "252",
        "citation": "33 L.P.R.A. § 5301",
        "display_title_es": "Artículo 252 Falsedad en documento privado — 33 L.P.R.A. § 5301",
        "display_title_en": "Article 252 Falsehood in Private Document — 33 L.P.R.A. § 5301",
        "sort_key": "252.000",
        "category": "pr-penal",
        "title_es": "Falsedad en documento privado",
        "title_en": "Falsehood in Private Document",
        "description_es": "Falsificar documentos privados como contratos, cheques o cartas.",
        "description_en": "Falsifying private documents such as contracts, checks, or letters.",
        "keywords_es": ["falsedad", "documento privado", "contrato", "cheque"],
        "keywords_en": ["falsehood", "private document", "contract", "check"],
        "verified": true
    },
    {
        "id": "pr-penal-253",
        "article_number": "253",
        "citation": "33 L.P.R.A. § 5302",
        "display_title_es": "Artículo 253 Falsedad en documento público — 33 L.P.R.A. § 5302",
        "display_title_en": "Article 253 Falsehood in Public Document — 33 L.P.R.A. § 5302",
        "sort_key": "253.000",
        "category": "pr-penal",
        "title_es": "Falsedad en documento público",
        "title_en": "Falsehood in Public Document",
        "description_es": "Falsificar documentos oficiales del gobierno, certificados o registros.",
        "description_en": "Falsifying government official documents, certificates, or records.",
        "keywords_es": ["falsedad", "documento público", "oficial", "certificado"],
        "keywords_en": ["falsehood", "public document", "official", "certificate"],
        "verified": true
    },
    {
        "id": "pr-penal-254",
        "article_number": "254",
        "citation": "33 L.P.R.A. § 5303",
        "display_title_es": "Artículo 254 Falsificación de firma — 33 L.P.R.A. § 5303",
        "display_title_en": "Article 254 Signature Forgery — 33 L.P.R.A. § 5303",
        "sort_key": "254.000",
        "category": "pr-penal",
        "title_es": "Falsificación de firma",
        "title_en": "Signature Forgery",
        "description_es": "Imitar o falsificar firma de otra persona sin autorización.",
        "description_en": "Imitating or falsifying another person's signature without authorization.",
        "keywords_es": ["falsificación", "firma", "imitar", "autorización"],
        "keywords_en": ["forgery", "signature", "imitate", "authorization"],
        "verified": true
    },
    {
        "id": "pr-penal-255",
        "article_number": "255",
        "citation": "33 L.P.R.A. § 5304",
        "display_title_es": "Artículo 255 Suplantación de identidad — 33 L.P.R.A. § 5304",
        "display_title_en": "Article 255 Identity Impersonation — 33 L.P.R.A. § 5304",
        "sort_key": "255.000",
        "category": "pr-penal",
        "title_es": "Suplantación de identidad",
        "title_en": "Identity Impersonation",
        "description_es": "Hacerse pasar por otra persona para obtener beneficios o causar daño.",
        "description_en": "Passing oneself off as another person to obtain benefits or cause harm.",
        "keywords_es": ["suplantación", "identidad", "hacerse pasar", "persona"],
        "keywords_en": ["impersonation", "identity", "pass off", "person"],
        "verified": true
    },
    {
        "id": "pr-penal-256",
        "article_number": "256",
        "citation": "33 L.P.R.A. § 5305",
        "display_title_es": "Artículo 256 Falso testimonio — 33 L.P.R.A. § 5305",
        "display_title_en": "Article 256 False Testimony — 33 L.P.R.A. § 5305",
        "sort_key": "256.000",
        "category": "pr-penal",
        "title_es": "Falso testimonio",
        "title_en": "False Testimony",
        "description_es": "Declarar falsamente bajo juramento en procedimiento judicial o administrativo.",
        "description_en": "Falsely testifying under oath in judicial or administrative proceeding.",
        "keywords_es": ["falso testimonio", "juramento", "declarar", "mentir"],
        "keywords_en": ["false testimony", "oath", "declare", "lie"],
        "verified": true
    },
    {
        "id": "pr-penal-257",
        "article_number": "257",
        "citation": "33 L.P.R.A. § 5306",
        "display_title_es": "Artículo 257 Perjurio — 33 L.P.R.A. § 5306",
        "display_title_en": "Article 257 Perjury — 33 L.P.R.A. § 5306",
        "sort_key": "257.000",
        "category": "pr-penal",
        "title_es": "Perjurio",
        "title_en": "Perjury",
        "description_es": "Mentir deliberadamente bajo juramento en tribunal o procedimiento legal.",
        "description_en": "Deliberately lying under oath in court or legal proceeding.",
        "keywords_es": ["perjurio", "juramento", "tribunal", "mentira"],
        "keywords_en": ["perjury", "oath", "court", "lie"],
        "verified": true
    },
    {
        "id": "pr-penal-258",
        "article_number": "258",
        "citation": "33 L.P.R.A. § 5307",
        "display_title_es": "Artículo 258 Suborno de testigo — 33 L.P.R.A. § 5307",
        "display_title_en": "Article 258 Witness Bribery — 33 L.P.R.A. § 5307",
        "sort_key": "258.000",
        "category": "pr-penal",
        "title_es": "Suborno de testigo",
        "title_en": "Witness Bribery",
        "description_es": "Ofrecer dinero o beneficios para influir en testimonio de testigo.",
        "description_en": "Offering money or benefits to influence witness testimony.",
        "keywords_es": ["suborno", "testigo", "soborno", "testimonio"],
        "keywords_en": ["bribery", "witness", "bribe", "testimony"],
        "verified": true
    },
    {
        "id": "pr-penal-259",
        "article_number": "259",
        "citation": "33 L.P.R.A. § 5308",
        "display_title_es": "Artículo 259 Coacción a testigo — 33 L.P.R.A. § 5308",
        "display_title_en": "Article 259 Witness Coercion — 33 L.P.R.A. § 5308",
        "sort_key": "259.000",
        "category": "pr-penal",
        "title_es": "Coacción a testigo",
        "title_en": "Witness Coercion",
        "description_es": "Amenazar o intimidar a testigo para que no testifique o cambie su declaración.",
        "description_en": "Threatening or intimidating witness to not testify or change their statement.",
        "keywords_es": ["coacción", "testigo", "amenazar", "intimidar"],
        "keywords_en": ["coercion", "witness", "threaten", "intimidate"],
        "verified": true
    },
    {
        "id": "pr-penal-260",
        "article_number": "260",
        "citation": "33 L.P.R.A. § 5309",
        "display_title_es": "Artículo 260 Obstrucción a la justicia — 33 L.P.R.A. § 5309",
        "display_title_en": "Article 260 Obstruction of Justice — 33 L.P.R.A. § 5309",
        "sort_key": "260.000",
        "category": "pr-penal",
        "title_es": "Obstrucción a la justicia",
        "title_en": "Obstruction of Justice",
        "description_es": "Obstaculizar investigación judicial, ocultar evidencia o influir en testigos.",
        "description_en": "Obstructing judicial investigation, concealing evidence, or influencing witnesses.",
        "keywords_es": ["obstrucción", "justicia", "investigación", "evidencia"],
        "keywords_en": ["obstruction", "justice", "investigation", "evidence"],
        "verified": true
    },
    {
        "id": "pr-penal-261",
        "article_number": "261",
        "citation": "33 L.P.R.A. § 5310",
        "display_title_es": "Artículo 261 Fuga de información judicial — 33 L.P.R.A. § 5310",
        "display_title_en": "Article 261 Leak of Judicial Information — 33 L.P.R.A. § 5310",
        "sort_key": "261.000",
        "category": "pr-penal",
        "title_es": "Fuga de información judicial",
        "title_en": "Leak of Judicial Information",
        "description_es": "Revelar información confidencial de investigación o proceso judicial.",
        "description_en": "Revealing confidential information from investigation or judicial process.",
        "keywords_es": ["fuga", "información", "judicial", "confidencial"],
        "keywords_en": ["leak", "information", "judicial", "confidential"],
        "verified": true
    },
    {
        "id": "pr-penal-262",
        "article_number": "262",
        "citation": "33 L.P.R.A. § 5311",
        "display_title_es": "Artículo 262 Simulación de pruebas — 33 L.P.R.A. § 5311",
        "display_title_en": "Article 262 Evidence Simulation — 33 L.P.R.A. § 5311",
        "sort_key": "262.000",
        "category": "pr-penal",
        "title_es": "Simulación de pruebas",
        "title_en": "Evidence Simulation",
        "description_es": "Crear, alterar o plantar evidencia falsa en investigación o proceso.",
        "description_en": "Creating, altering, or planting false evidence in investigation or process.",
        "keywords_es": ["simulación", "pruebas", "evidencia falsa", "alterar"],
        "keywords_en": ["simulation", "evidence", "false evidence", "alter"],
        "verified": true
    },
    {
        "id": "pr-penal-263",
        "article_number": "263",
        "citation": "33 L.P.R.A. § 5312",
        "display_title_es": "Artículo 263 Destrucción de evidencia — 33 L.P.R.A. § 5312",
        "display_title_en": "Article 263 Evidence Destruction — 33 L.P.R.A. § 5312",
        "sort_key": "263.000",
        "category": "pr-penal",
        "title_es": "Destrucción de evidencia",
        "title_en": "Evidence Destruction",
        "description_es": "Destruir, ocultar o alterar evidencia relevante para investigación o juicio.",
        "description_en": "Destroying, concealing, or altering evidence relevant to investigation or trial.",
        "keywords_es": ["destrucción", "evidencia", "ocultar", "alterar"],
        "keywords_en": ["destruction", "evidence", "conceal", "alter"],
        "verified": true
    },
    {
        "id": "pr-penal-264",
        "article_number": "264",
        "citation": "33 L.P.R.A. § 5313",
        "display_title_es": "Artículo 264 Fuga de información clasificada — 33 L.P.R.A. § 5313",
        "display_title_en": "Article 264 Leak of Classified Information — 33 L.P.R.A. § 5313",
        "sort_key": "264.000",
        "category": "pr-penal",
        "title_es": "Fuga de información clasificada",
        "title_en": "Leak of Classified Information",
        "description_es": "Revelar información clasificada del gobierno que pone en riesgo seguridad nacional.",
        "description_en": "Revealing classified government information that puts national security at risk.",
        "keywords_es": ["fuga", "información clasificada", "secreto", "seguridad"],
        "keywords_en": ["leak", "classified information", "secret", "security"],
        "verified": true
    },
    {
        "id": "pr-penal-265",
        "article_number": "265",
        "citation": "33 L.P.R.A. § 5314",
        "display_title_es": "Artículo 265 Espionaje — 33 L.P.R.A. § 5314",
        "display_title_en": "Article 265 Espionage — 33 L.P.R.A. § 5314",
        "sort_key": "265.000",
        "category": "pr-penal",
        "title_es": "Espionaje",
        "title_en": "Espionage",
        "description_es": "Obtener información secreta de gobierno o entidad para beneficio extranjero.",
        "description_en": "Obtaining secret information from government or entity for foreign benefit.",
        "keywords_es": ["espionaje", "espía", "información secreta", "extranjero"],
        "keywords_en": ["espionage", "spy", "secret information", "foreign"],
        "verified": true
    },
    {
        "id": "pr-penal-266",
        "article_number": "266",
        "citation": "33 L.P.R.A. § 5315",
        "display_title_es": "Artículo 266 Traición — 33 L.P.R.A. § 5315",
        "display_title_en": "Article 266 Treason — 33 L.P.R.A. § 5315",
        "sort_key": "266.000",
        "category": "pr-penal",
        "title_es": "Traición",
        "title_en": "Treason",
        "description_es": "Actuar contra seguridad o soberanía del Estado, ayudando a enemigo.",
        "description_en": "Acting against security or sovereignty of the State, aiding enemy.",
        "keywords_es": ["traición", "enemigo", "soberanía", "Estado"],
        "keywords_en": ["treason", "enemy", "sovereignty", "State"],
        "verified": true
    },
    {
        "id": "pr-penal-267",
        "article_number": "267",
        "citation": "33 L.P.R.A. § 5316",
        "display_title_es": "Artículo 267 Sedicción — 33 L.P.R.A. § 5316",
        "display_title_en": "Article 267 Sedition — 33 L.P.R.A. § 5316",
        "sort_key": "267.000",
        "category": "pr-penal",
        "title_es": "Sedicción",
        "title_en": "Sedition",
        "description_es": "Promover disturbios o rebelión contra autoridad gubernamental establecida.",
        "description_en": "Promoting disturbances or rebellion against established governmental authority.",
        "keywords_es": ["sedicción", "rebelión", "disturbios", "gobierno"],
        "keywords_en": ["sedition", "rebellion", "disturbances", "government"],
        "verified": true
    },
    {
        "id": "pr-penal-268",
        "article_number": "268",
        "citation": "33 L.P.R.A. § 5317",
        "display_title_es": "Artículo 268 Atentado contra el Estado — 33 L.P.R.A. § 5317",
        "display_title_en": "Article 268 Attack Against the State — 33 L.P.R.A. § 5317",
        "sort_key": "268.000",
        "category": "pr-penal",
        "title_es": "Atentado contra el Estado",
        "title_en": "Attack Against the State",
        "description_es": "Atacar instituciones gubernamentales o símbolos nacionales.",
        "description_en": "Attacking governmental institutions or national symbols.",
        "keywords_es": ["atentado", "Estado", "gobierno", "instituciones"],
        "keywords_en": ["attack", "State", "government", "institutions"],
        "verified": true
    },
    {
        "id": "pr-penal-269",
        "article_number": "269",
        "citation": "33 L.P.R.A. § 5318",
        "display_title_es": "Artículo 269 Conspiración contra el gobierno — 33 L.P.R.A. § 5318",
        "display_title_en": "Article 269 Conspiracy Against Government — 33 L.P.R.A. § 5318",
        "sort_key": "269.000",
        "category": "pr-penal",
        "title_es": "Conspiración contra el gobierno",
        "title_en": "Conspiracy Against Government",
        "description_es": "Acordar con otros derrocar gobierno o impedir ejercicio de autoridad.",
        "description_en": "Agreeing with others to overthrow government or prevent exercise of authority.",
        "keywords_es": ["conspiración", "gobierno", "derrocar", "autoridad"],
        "keywords_en": ["conspiracy", "government", "overthrow", "authority"],
        "verified": true
    },
    {
        "id": "pr-penal-270",
        "article_number": "270",
        "citation": "33 L.P.R.A. § 5319",
        "display_title_es": "Artículo 270 Apología del delito — 33 L.P.R.A. § 5319",
        "display_title_en": "Article 270 Apology of Crime — 33 L.P.R.A. § 5319",
        "sort_key": "270.000",
        "category": "pr-penal",
        "title_es": "Apología del delito",
        "title_en": "Apology of Crime",
        "description_es": "Justificar o alabar públicamente delitos graves o actividades criminales.",
        "description_en": "Justifying or publicly praising serious crimes or criminal activities.",
        "keywords_es": ["apología", "delito", "justificar", "alabar"],
        "keywords_en": ["apology", "crime", "justify", "praise"],
        "verified": true
    },
    {
        "id": "pr-penal-271",
        "article_number": "271",
        "citation": "33 L.P.R.A. § 5320",
        "display_title_es": "Artículo 271 Conducción temeraria — 33 L.P.R.A. § 5320",
        "display_title_en": "Article 271 Reckless Driving — 33 L.P.R.A. § 5320",
        "sort_key": "271.000",
        "category": "pr-penal",
        "title_es": "Conducción temeraria",
        "title_en": "Reckless Driving",
        "description_es": "Conducir vehículo con desprecio total por seguridad de personas o propiedad.",
        "description_en": "Driving vehicle with total disregard for safety of persons or property.",
        "keywords_es": ["conducción", "temeraria", "vehículo", "seguridad"],
        "keywords_en": ["driving", "reckless", "vehicle", "safety"],
        "verified": true
    },
    {
        "id": "pr-penal-272",
        "article_number": "272",
        "citation": "33 L.P.R.A. § 5321",
        "display_title_es": "Artículo 272 Conducción bajo influencia — 33 L.P.R.A. § 5321",
        "display_title_en": "Article 272 Driving Under Influence — 33 L.P.R.A. § 5321",
        "sort_key": "272.000",
        "category": "pr-penal",
        "title_es": "Conducción bajo influencia",
        "title_en": "Driving Under Influence",
        "description_es": "Conducir vehículo bajo efectos de alcohol, drogas o sustancias que afecten capacidad.",
        "description_en": "Driving vehicle under effects of alcohol, drugs, or substances affecting capacity.",
        "keywords_es": ["conducción", "alcohol", "droga", "ebriedad"],
        "keywords_en": ["driving", "alcohol", "drug", "intoxication"],
        "verified": true
    },
    {
        "id": "pr-penal-273",
        "article_number": "273",
        "citation": "33 L.P.R.A. § 5322",
        "display_title_es": "Artículo 273 Homicidio vehicular — 33 L.P.R.A. § 5322",
        "display_title_en": "Article 273 Vehicular Homicide — 33 L.P.R.A. § 5322",
        "sort_key": "273.000",
        "category": "pr-penal",
        "title_es": "Homicidio vehicular",
        "title_en": "Vehicular Homicide",
        "description_es": "Causar muerte de persona por conducción negligente, temeraria o bajo influencia.",
        "description_en": "Causing death of person through negligent, reckless, or intoxicated driving.",
        "keywords_es": ["homicidio", "vehicular", "accidente", "muerte"],
        "keywords_en": ["homicide", "vehicular", "accident", "death"],
        "verified": true
    },
    {
        "id": "pr-penal-274",
        "article_number": "274",
        "citation": "33 L.P.R.A. § 5323",
        "display_title_es": "Artículo 274 Lesiones vehiculares — 33 L.P.R.A. § 5323",
        "display_title_en": "Article 274 Vehicular Injuries — 33 L.P.R.A. § 5323",
        "sort_key": "274.000",
        "category": "pr-penal",
        "title_es": "Lesiones vehiculares",
        "title_en": "Vehicular Injuries",
        "description_es": "Causar lesiones a persona por conducción negligente o temeraria.",
        "description_en": "Causing injuries to person through negligent or reckless driving.",
        "keywords_es": ["lesiones", "vehiculares", "accidente", "heridas"],
        "keywords_en": ["injuries", "vehicular", "accident", "wounds"],
        "verified": true
    },
    {
        "id": "pr-penal-275",
        "article_number": "275",
        "citation": "33 L.P.R.A. § 5324",
        "display_title_es": "Artículo 275 Fuga del lugar de accidente — 33 L.P.R.A. § 5324",
        "display_title_en": "Article 275 Hit and Run — 33 L.P.R.A. § 5324",
        "sort_key": "275.000",
        "category": "pr-penal",
        "title_es": "Fuga del lugar de accidente",
        "title_en": "Hit and Run",
        "description_es": "Abandonar lugar de accidente vehicular sin proporcionar información o auxilio.",
        "description_en": "Abandoning scene of vehicle accident without providing information or assistance.",
        "keywords_es": ["fuga", "accidente", "vehicular", "abandonar"],
        "keywords_en": ["hit and run", "accident", "vehicular", "abandon"],
        "verified": true
    },
    {
        "id": "pr-penal-276",
        "article_number": "276",
        "citation": "33 L.P.R.A. § 5325",
        "display_title_es": "Artículo 276 Exceso de velocidad grave — 33 L.P.R.A. § 5325",
        "display_title_en": "Article 276 Serious Speeding — 33 L.P.R.A. § 5325",
        "sort_key": "276.000",
        "category": "pr-penal",
        "title_es": "Exceso de velocidad grave",
        "title_en": "Serious Speeding",
        "description_es": "Exceder límite de velocidad en forma que pone en grave riesgo seguridad.",
        "description_en": "Exceeding speed limit in way that puts safety at serious risk.",
        "keywords_es": ["exceso", "velocidad", "rápido", "riesgo"],
        "keywords_en": ["speeding", "speed", "fast", "risk"],
        "verified": true
    },
    {
        "id": "pr-penal-277",
        "article_number": "277",
        "citation": "33 L.P.R.A. § 5326",
        "display_title_es": "Artículo 277 Conducción sin licencia — 33 L.P.R.A. § 5326",
        "display_title_en": "Article 277 Driving Without License — 33 L.P.R.A. § 5326",
        "sort_key": "277.000",
        "category": "pr-penal",
        "title_es": "Conducción sin licencia",
        "title_en": "Driving Without License",
        "description_es": "Conducir vehículo sin licencia válida o con licencia suspendida/revocada.",
        "description_en": "Driving vehicle without valid license or with suspended/revoked license.",
        "keywords_es": ["conducción", "sin licencia", "suspendida", "revocada"],
        "keywords_en": ["driving", "without license", "suspended", "revoked"],
        "verified": true
    },
    {
        "id": "pr-penal-278",
        "article_number": "278",
        "citation": "33 L.P.R.A. § 5327",
        "display_title_es": "Artículo 278 Vehículo no registrado — 33 L.P.R.A. § 5327",
        "display_title_en": "Article 278 Unregistered Vehicle — 33 L.P.R.A. § 5327",
        "sort_key": "278.000",
        "category": "pr-penal",
        "title_es": "Vehículo no registrado",
        "title_en": "Unregistered Vehicle",
        "description_es": "Operar vehículo que no está debidamente registrado o con placas falsas.",
        "description_en": "Operating vehicle that is not properly registered or with false plates.",
        "keywords_es": ["vehículo", "no registrado", "placas", "falsas"],
        "keywords_en": ["vehicle", "unregistered", "plates", "false"],
        "verified": true
    },
    {
        "id": "pr-penal-279",
        "article_number": "279",
        "citation": "33 L.P.R.A. § 5328",
        "display_title_es": "Artículo 279 Conducción peligrosa — 33 L.P.R.A. § 5328",
        "display_title_en": "Article 279 Dangerous Driving — 33 L.P.R.A. § 5328",
        "sort_key": "279.000",
        "category": "pr-penal",
        "title_es": "Conducción peligrosa",
        "title_en": "Dangerous Driving",
        "description_es": "Conducir de manera que pone en peligro inminente a peatones u otros vehículos.",
        "description_en": "Driving in way that puts pedestrians or other vehicles in imminent danger.",
        "keywords_es": ["conducción", "peligrosa", "peatones", "vehículos"],
        "keywords_en": ["driving", "dangerous", "pedestrians", "vehicles"],
        "verified": true
    },
    {
        "id": "pr-penal-280",
        "article_number": "280",
        "citation": "33 L.P.R.A. § 5329",
        "display_title_es": "Artículo 280 Carreras ilegales — 33 L.P.R.A. § 5329",
        "display_title_en": "Article 280 Illegal Racing — 33 L.P.R.A. § 5329",
        "sort_key": "280.000",
        "category": "pr-penal",
        "title_es": "Carreras ilegales",
        "title_en": "Illegal Racing",
        "description_es": "Participar en carreras de vehículos en vías públicas no autorizadas.",
        "description_en": "Participating in vehicle races on unauthorized public roads.",
        "keywords_es": ["carreras", "ilegales", "vehículos", "piques"],
        "keywords_en": ["racing", "illegal", "vehicles", "street racing"],
        "verified": true
    },
    {
        "id": "pr-penal-281",
        "article_number": "281",
        "citation": "33 L.P.R.A. § 5330",
        "display_title_es": "Artículo 281 Alteración del orden público — 33 L.P.R.A. § 5330",
        "display_title_en": "Article 281 Disturbance of Public Order — 33 L.P.R.A. § 5330",
        "sort_key": "281.000",
        "category": "pr-penal",
        "title_es": "Alteración del orden público",
        "title_en": "Disturbance of Public Order",
        "description_es": "Participar en disturbios o altercados que perturban paz pública.",
        "description_en": "Participating in riots or altercations that disturb public peace.",
        "keywords_es": ["alteración", "orden público", "disturbios", "altercados"],
        "keywords_en": ["disturbance", "public order", "riots", "altercations"],
        "verified": true
    },
    {
        "id": "pr-penal-282",
        "article_number": "282",
        "citation": "33 L.P.R.A. § 5331",
        "display_title_es": "Artículo 282 Desorden público — 33 L.P.R.A. § 5331",
        "display_title_en": "Article 282 Public Disorder — 33 L.P.R.A. § 5331",
        "sort_key": "282.000",
        "category": "pr-penal",
        "title_es": "Desorden público",
        "title_en": "Public Disorder",
        "description_es": "Causar alboroto o escándalo en lugar público que perturba tranquilidad.",
        "description_en": "Causing uproar or scandal in public place that disturbs tranquility.",
        "keywords_es": ["desorden", "público", "alboroto", "escándalo"],
        "keywords_en": ["disorder", "public", "uproar", "scandal"],
        "verified": true
    },
    {
        "id": "pr-penal-283",
        "article_number": "283",
        "citation": "33 L.P.R.A. § 5332",
        "display_title_es": "Artículo 283 Riot — 33 L.P.R.A. § 5332",
        "display_title_en": "Article 283 Riot — 33 L.P.R.A. § 5332",
        "sort_key": "283.000",
        "category": "pr-penal",
        "title_es": "Riot",
        "title_en": "Riot",
        "description_es": "Participar en disturbio colectivo violento con daño a personas o propiedad.",
        "description_en": "Participating in violent collective disturbance with damage to persons or property.",
        "keywords_es": ["riot", "disturbio", "violento", "colectivo"],
        "keywords_en": ["riot", "disturbance", "violent", "collective"],
        "verified": true
    },
    {
        "id": "pr-penal-284",
        "article_number": "284",
        "citation": "33 L.P.R.A. § 5333",
        "display_title_es": "Artículo 284 Asamblea ilegal — 33 L.P.R.A. § 5333",
        "display_title_en": "Article 284 Illegal Assembly — 33 L.P.R.A. § 5333",
        "sort_key": "284.000",
        "category": "pr-penal",
        "title_es": "Asamblea ilegal",
        "title_en": "Illegal Assembly",
        "description_es": "Participar en reunión pública no autorizada que perturba orden público.",
        "description_en": "Participating in unauthorized public meeting that disturbs public order.",
        "keywords_es": ["asamblea", "ilegal", "reunión", "no autorizada"],
        "keywords_en": ["assembly", "illegal", "meeting", "unauthorized"],
        "verified": true
    },
    {
        "id": "pr-penal-285",
        "article_number": "285",
        "citation": "33 L.P.R.A. § 5334",
        "display_title_es": "Artículo 285 Obstrucción de vías públicas — 33 L.P.R.A. § 5334",
        "display_title_en": "Article 285 Obstruction of Public Roads — 33 L.P.R.A. § 5334",
        "sort_key": "285.000",
        "category": "pr-penal",
        "title_es": "Obstrucción de vías públicas",
        "title_en": "Obstruction of Public Roads",
        "description_es": "Bloquear o obstruir vías de tránsito público sin autorización.",
        "description_en": "Blocking or obstructing public transit roads without authorization.",
        "keywords_es": ["obstrucción", "vías", "públicas", "bloquear"],
        "keywords_en": ["obstruction", "roads", "public", "block"],
        "verified": true
    },
    {
        "id": "pr-penal-286",
        "article_number": "286",
        "citation": "33 L.P.R.A. § 5335",
        "display_title_es": "Artículo 286 Escándalo público — 33 L.P.R.A. § 5335",
        "display_title_en": "Article 286 Public Scandal — 33 L.P.R.A. § 5335",
        "sort_key": "286.000",
        "category": "pr-penal",
        "title_es": "Escándalo público",
        "title_en": "Public Scandal",
        "description_es": "Causar escándalo ofensivo a moral pública en lugar público.",
        "description_en": "Causing scandal offensive to public morals in public place.",
        "keywords_es": ["escándalo", "público", "moral", "ofensivo"],
        "keywords_en": ["scandal", "public", "morals", "offensive"],
        "verified": true
    },
    {
        "id": "pr-penal-287",
        "article_number": "287",
        "citation": "33 L.P.R.A. § 5336",
        "display_title_es": "Artículo 287 Intimidación pública — 33 L.P.R.A. § 5336",
        "display_title_en": "Article 287 Public Intimidation — 33 L.P.R.A. § 5336",
        "sort_key": "287.000",
        "category": "pr-penal",
        "title_es": "Intimidación pública",
        "title_en": "Public Intimidation",
        "description_es": "Amenazar o intimidar a población en general mediante actos violentos.",
        "description_en": "Threatening or intimidating general population through violent acts.",
        "keywords_es": ["intimidación", "pública", "amenazar", "población"],
        "keywords_en": ["intimidation", "public", "threaten", "population"],
        "verified": true
    },
    {
        "id": "pr-penal-288",
        "article_number": "288",
        "citation": "33 L.P.R.A. § 5337",
        "display_title_es": "Artículo 288 Porte de arma blanca — 33 L.P.R.A. § 5337",
        "display_title_en": "Article 288 Carrying of Bladed Weapon — 33 L.P.R.A. § 5337",
        "sort_key": "288.000",
        "category": "pr-penal",
        "title_es": "Porte de arma blanca",
        "title_en": "Carrying of Bladed Weapon",
        "description_es": "Portar cuchillos, navajas u otras armas blancas en lugar público sin justificación.",
        "description_en": "Carrying knives, switchblades, or other bladed weapons in public place without justification.",
        "keywords_es": ["arma blanca", "cuchillo", "navaja", "público"],
        "keywords_en": ["bladed weapon", "knife", "switchblade", "public"],
        "verified": true
    },
    {
        "id": "pr-penal-289",
        "article_number": "289",
        "citation": "33 L.P.R.A. § 5338",
        "display_title_es": "Artículo 289 Porte de instrumentos peligrosos — 33 L.P.R.A. § 5338",
        "display_title_en": "Article 289 Carrying of Dangerous Instruments — 33 L.P.R.A. § 5338",
        "sort_key": "289.000",
        "category": "pr-penal",
        "title_es": "Porte de instrumentos peligrosos",
        "title_en": "Carrying of Dangerous Instruments",
        "description_es": "Portar objetos que pueden usarse como armas de manera que amenace seguridad pública.",
        "description_en": "Carrying objects that can be used as weapons in way that threatens public safety.",
        "keywords_es": ["instrumentos", "peligrosos", "arma", "público"],
        "keywords_en": ["instruments", "dangerous", "weapon", "public"],
        "verified": true
    },
    {
        "id": "pr-penal-290",
        "article_number": "290",
        "citation": "33 L.P.R.A. § 5339",
        "display_title_es": "Artículo 290 Incitación al odio — 33 L.P.R.A. § 5339",
        "display_title_en": "Article 290 Incitement to Hatred — 33 L.P.R.A. § 5339",
        "sort_key": "290.000",
        "category": "pr-penal",
        "title_es": "Incitación al odio",
        "title_en": "Incitement to Hatred",
        "description_es": "Promover odio, discriminación o violencia contra grupos por raza, religión o origen.",
        "description_en": "Promoting hatred, discrimination, or violence against groups based on race, religion, or origin.",
        "keywords_es": ["incitación", "odio", "discriminación", "violencia"],
        "keywords_en": ["incitement", "hatred", "discrimination", "violence"],
        "verified": true
    },
    {
        "id": "pr-penal-291",
        "article_number": "291",
        "citation": "33 L.P.R.A. § 5340",
        "display_title_es": "Artículo 291 Violencia doméstica — 33 L.P.R.A. § 5340",
        "display_title_en": "Article 291 Domestic Violence — 33 L.P.R.A. § 5340",
        "sort_key": "291.000",
        "category": "pr-penal",
        "title_es": "Violencia doméstica",
        "title_en": "Domestic Violence",
        "description_es": "Usar fuerza física o psicológica contra familiar o pareja en hogar compartido.",
        "description_en": "Using physical or psychological force against family member or partner in shared home.",
        "keywords_es": ["violencia doméstica", "familiar", "pareja", "hogar"],
        "keywords_en": ["domestic violence", "family", "partner", "home"],
        "verified": true
    },
    {
        "id": "pr-penal-292",
        "article_number": "292",
        "citation": "33 L.P.R.A. § 5341",
        "display_title_es": "Artículo 292 Violencia doméstica agravada — 33 L.P.R.A. § 5341",
        "display_title_en": "Article 292 Aggravated Domestic Violence — 33 L.P.R.A. § 5341",
        "sort_key": "292.000",
        "category": "pr-penal",
        "title_es": "Violencia doméstica agravada",
        "title_en": "Aggravated Domestic Violence",
        "description_es": "Violencia doméstica con armas, lesiones graves, o en presencia de menores.",
        "description_en": "Domestic violence with weapons, serious injuries, or in presence of minors.",
        "keywords_es": ["violencia agravada", "arma", "lesiones", "menores"],
        "keywords_en": ["aggravated violence", "weapon", "injuries", "minors"],
        "verified": true
    },
    {
        "id": "pr-penal-293",
        "article_number": "293",
        "citation": "33 L.P.R.A. § 5342",
        "display_title_es": "Artículo 293 Maltrato a cónyuge — 33 L.P.R.A. § 5342",
        "display_title_en": "Article 293 Spouse Abuse — 33 L.P.R.A. § 5342",
        "sort_key": "293.000",
        "category": "pr-penal",
        "title_es": "Maltrato a cónyuge",
        "title_en": "Spouse Abuse",
        "description_es": "Causar daño físico o emocional a cónyuge o pareja de hecho.",
        "description_en": "Causing physical or emotional harm to spouse or domestic partner.",
        "keywords_es": ["maltrato", "cónyuge", "pareja", "daño"],
        "keywords_en": ["abuse", "spouse", "partner", "harm"],
        "verified": true
    },
    {
        "id": "pr-penal-294",
        "article_number": "294",
        "citation": "33 L.P.R.A. § 5343",
        "display_title_es": "Artículo 294 Incumplimiento de obligaciones familiares — 33 L.P.R.A. § 5343",
        "display_title_en": "Article 294 Failure to Meet Family Obligations — 33 L.P.R.A. § 5343",
        "sort_key": "294.000",
        "category": "pr-penal",
        "title_es": "Incumplimiento de obligaciones familiares",
        "title_en": "Failure to Meet Family Obligations",
        "description_es": "No cumplir con obligaciones de manutención, cuidado o protección de familiares.",
        "description_en": "Failing to meet obligations of support, care, or protection of family members.",
        "keywords_es": ["incumplimiento", "obligaciones", "familia", "manutención"],
        "keywords_en": ["failure", "obligations", "family", "support"],
        "verified": true
    },
    {
        "id": "pr-penal-295",
        "article_number": "295",
        "citation": "33 L.P.R.A. § 5344",
        "display_title_es": "Artículo 295 Privación ilegal de patria potestad — 33 L.P.R.A. § 5344",
        "display_title_en": "Article 295 Illegal Deprivation of Parental Authority — 33 L.P.R.A. § 5344",
        "sort_key": "295.000",
        "category": "pr-penal",
        "title_es": "Privación ilegal de patria potestad",
        "title_en": "Illegal Deprivation of Parental Authority",
        "description_es": "Privar a padre o madre del derecho de custodia o visita sin autorización judicial.",
        "description_en": "Depriving father or mother of custody or visitation right without judicial authorization.",
        "keywords_es": ["privación", "patria potestad", "custodia", "visita"],
        "keywords_en": ["deprivation", "parental authority", "custody", "visitation"],
        "verified": true
    },
    {
        "id": "pr-penal-296",
        "article_number": "296",
        "citation": "33 L.P.R.A. § 5345",
        "display_title_es": "Artículo 296 Sustracción de menor por padre — 33 L.P.R.A. § 5345",
        "display_title_en": "Article 296 Parental Abduction of Minor — 33 L.P.R.A. § 5345",
        "sort_key": "296.000",
        "category": "pr-penal",
        "title_es": "Sustracción de menor por padre",
        "title_en": "Parental Abduction of Minor",
        "description_es": "Padre o madre sustrae menor de custodia legal del otro padre sin consentimiento.",
        "description_en": "Father or mother abducts minor from legal custody of other parent without consent.",
        "keywords_es": ["sustracción", "menor", "padre", "custodia"],
        "keywords_en": ["abduction", "minor", "parent", "custody"],
        "verified": true
    },
    {
        "id": "pr-penal-297",
        "article_number": "297",
        "citation": "33 L.P.R.A. § 5346",
        "display_title_es": "Artículo 297 Bigamia — 33 L.P.R.A. § 5346",
        "display_title_en": "Article 297 Bigamy — 33 L.P.R.A. § 5346",
        "sort_key": "297.000",
        "category": "pr-penal",
        "title_es": "Bigamia",
        "title_en": "Bigamy",
        "description_es": "Contraer matrimonio sabiendo que ya se está casado con otra persona.",
        "description_en": "Entering marriage knowing one is already married to another person.",
        "keywords_es": ["bigamia", "matrimonio", "casado", "esposa"],
        "keywords_en": ["bigamy", "marriage", "married", "spouse"],
        "verified": true
    },
    {
        "id": "pr-penal-298",
        "article_number": "298",
        "citation": "33 L.P.R.A. § 5347",
        "display_title_es": "Artículo 298 Adulterio — 33 L.P.R.A. § 5347",
        "display_title_en": "Article 298 Adultery — 33 L.P.R.A. § 5347",
        "sort_key": "298.000",
        "category": "pr-penal",
        "title_es": "Adulterio",
        "title_en": "Adultery",
        "description_es": "Cónyuge que tiene relaciones sexuales con persona que no es su esposo/a.",
        "description_en": "Spouse having sexual relations with person who is not their husband/wife.",
        "keywords_es": ["adulterio", "infidelidad", "cónyuge", "relaciones"],
        "keywords_en": ["adultery", "infidelity", "spouse", "relations"],
        "verified": true
    },
    {
        "id": "pr-penal-299",
        "article_number": "299",
        "citation": "33 L.P.R.A. § 5348",
        "display_title_es": "Artículo 299 Abandono de familia — 33 L.P.R.A. § 5348",
        "display_title_en": "Article 299 Family Abandonment — 33 L.P.R.A. § 5348",
        "sort_key": "299.000",
        "category": "pr-penal",
        "title_es": "Abandono de familia",
        "title_en": "Family Abandonment",
        "description_es": "Abandonar cónyuge o hijos menores sin medios de subsistencia.",
        "description_en": "Abandoning spouse or minor children without means of subsistence.",
        "keywords_es": ["abandono", "familia", "cónyuge", "hijos"],
        "keywords_en": ["abandonment", "family", "spouse", "children"],
        "verified": true
    },
    {
        "id": "pr-penal-300",
        "article_number": "300",
        "citation": "33 L.P.R.A. § 5349",
        "display_title_es": "Artículo 300 Violación de orden de protección — 33 L.P.R.A. § 5349",
        "display_title_en": "Article 300 Violation of Protection Order — 33 L.P.R.A. § 5349",
        "sort_key": "300.000",
        "category": "pr-penal",
        "title_es": "Violación de orden de protección",
        "title_en": "Violation of Protection Order",
        "description_es": "Desobedecer orden judicial de protección emitida en casos de violencia doméstica.",
        "description_en": "Disobeying judicial protection order issued in domestic violence cases.",
        "keywords_es": ["violación", "orden protección", "violencia doméstica", "desobedecer"],
        "keywords_en": ["violation", "protection order", "domestic violence", "disobey"],
        "verified": true
    }
];

// ============================================
// FT BUCHANAN TRAFFIC CODE - CONTINUATION
// Artículos 3.xx - Driver's License
// ============================================
const FT_BUCHANAN_TRAFFIC_CODE_PART2 = [
    {
        "id": "ftb-3-23-a",
        "article_number": "Art. 3.23(a)",
        "citation": "9 L.P.R.A. § 5073",
        "sort_key": "003.023.001",
        "category": "ftb-traffic",
        "title_en": "Driving without being duly authorized (Unlicensed, out of class, or expired)",
        "title_es": "Conducir sin estar debidamente autorizado (Sin licencia, fuera de clase, o vencida)",
        "when_applies_en": "Never obtained license, has expired license, or has regular car license (Category 3) driving heavy truck or motorcycle.",
        "when_applies_es": "Nunca ha sacado licencia, la tiene expirada, o tiene licencia de auto regular (Categoría 3) manejando un camión pesado o motora.",
        "description_en": "Operating motor vehicle without valid driver's license, with expired license, or outside license class.",
        "description_es": "Operar vehículo motor sin licencia de conducir válida, con licencia vencida, o fuera de la clase de licencia.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["unlicensed", "expired license", "wrong class", "no license"],
        "keywords_es": ["sin licencia", "licencia vencida", "clase equivocada", "no licencia"],
        "verified": true
    },
    {
        "id": "ftb-3-23-b",
        "article_number": "Art. 3.23(b)",
        "citation": "9 L.P.R.A. § 5073",
        "sort_key": "003.023.002",
        "category": "ftb-traffic",
        "title_en": "Submitting false information or photos to illegally obtain a license",
        "title_es": "Someter información o fotos falsas para obtener licencia ilegalmente",
        "when_applies_en": "Identity theft at CESCO (using someone else's social security or birth certificate to get license).",
        "when_applies_es": "Robo de identidad en el CESCO (usar el seguro social o certificado de nacimiento de otro para sacar licencia).",
        "description_en": "Providing false information, forged documents, or fraudulent photos to obtain driver's license.",
        "description_es": "Proporcionar información falsa, documentos falsificados o fotos fraudulentas para obtener licencia de conducir.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["false information", "identity theft", "fraudulent license", "forgery"],
        "keywords_es": ["información falsa", "robo identidad", "licencia fraudulenta", "falsificación"],
        "verified": true
    },
    {
        "id": "ftb-3-23-c",
        "article_number": "Art. 3.23(c)",
        "citation": "9 L.P.R.A. § 5073",
        "sort_key": "003.023.003",
        "category": "ftb-traffic",
        "title_en": "Adding, erasing, or altering info/photos on a driver's license",
        "title_es": "Agregar, borrar o alterar info/fotos en licencia de conducir",
        "when_applies_en": "Minors altering birth date on license (Fake ID) to enter bars or buy alcohol.",
        "when_applies_es": "Menores de edad alterando la fecha de nacimiento en su licencia (Fake ID) para entrar a barras o comprar alcohol.",
        "description_en": "Tampering with or altering information on driver's license including photo or personal data.",
        "description_es": "Manipular o alterar información en licencia de conducir incluyendo foto o datos personales.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["altering license", "fake ID", "tampering", "photo alteration"],
        "keywords_es": ["alterar licencia", "ID falsa", "manipulación", "alteración foto"],
        "verified": true
    },
    {
        "id": "ftb-3-23-e",
        "article_number": "Art. 3.23(e)",
        "citation": "9 L.P.R.A. § 5073",
        "sort_key": "003.023.005",
        "category": "ftb-traffic",
        "title_en": "Owner allowing another person to operate a vehicle without a license",
        "title_es": "Dueño permitiendo a otra persona operar vehículo sin licencia",
        "when_applies_en": "Giving car keys to underage child or friend you know has no license.",
        "when_applies_es": "Le das las llaves de tu carro a tu hijo menor de edad o a un amigo que sabes que no tiene licencia.",
        "description_en": "Vehicle owner knowingly allowing unlicensed person to operate their vehicle.",
        "description_es": "Dueño de vehículo que sabiendo permite a persona sin licencia operar su vehículo.",
        "fine": "$200.00",
        "is_mca": false,
        "keywords_en": ["owner liability", "unlicensed driver", "permitting", "no license"],
        "keywords_es": ["responsabilidad dueño", "conductor sin licencia", "permitir", "sin licencia"],
        "verified": true
    },
    {
        "id": "ftb-3-23-f",
        "article_number": "Art. 3.23(f)",
        "citation": "Sin L.P.R.A. asignado",
        "sort_key": "003.023.006",
        "category": "ftb-traffic",
        "title_en": "Failure to report change of address on driver's license",
        "title_es": "No reportar cambio de dirección en licencia de conducir",
        "when_applies_en": "Driver moved and did not update physical address on driver's license at CESCO within required time.",
        "when_applies_es": "El conductor se mudó y no actualizó la dirección física de su licencia de conducir en el CESCO en el tiempo reglamentario.",
        "description_en": "Failing to notify DMV of address change on driver's license within required timeframe.",
        "description_es": "No notificar al DMV el cambio de dirección en licencia de conducir dentro del tiempo requerido.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["address change", "driver's license", "CESCO", "notification"],
        "keywords_es": ["cambio dirección", "licencia conducir", "CESCO", "notificación"],
        "verified": true
    },
    {
        "id": "ftb-3-23-h",
        "article_number": "Art. 3.23(h)",
        "citation": "9 L.P.R.A. § 5073",
        "sort_key": "003.023.008",
        "category": "ftb-traffic",
        "title_en": "Failure to carry driver's license certificate while operating a vehicle",
        "title_es": "No llevar certificado de licencia de conducir al operar vehículo",
        "when_applies_en": "Has valid license in system, but left wallet at home at time of police intervention.",
        "when_applies_es": "Sí tiene licencia válida en el sistema, pero se le quedó la cartera en la casa al momento de la intervención policial.",
        "description_en": "Operating vehicle without possessing physical or digital driver's license.",
        "description_es": "Operar vehículo sin poseer licencia de conducir física o digital.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["no license on person", "forgot wallet", "not carrying"],
        "keywords_es": ["no lleva licencia", "olvidó cartera", "no portar"],
        "verified": true
    },
    {
        "id": "ftb-3-23-i",
        "article_number": "Art. 3.23(i)",
        "citation": "9 L.P.R.A. § 5073",
        "sort_key": "003.023.009",
        "category": "ftb-traffic",
        "title_en": "Driving with an expired learner's license",
        "title_es": "Conducir con licencia de aprendizaje vencida",
        "when_applies_en": "Learner's permit valid for 2 years; applies if stopped driving with expired permit.",
        "when_applies_es": "El permiso de aprendizaje es válido por 2 años; aplica si lo paran manejando con ese permiso caducado.",
        "description_en": "Operating vehicle with expired learner's permit or provisional license.",
        "description_es": "Operar vehículo con permiso de aprendizaje vencido o licencia provisional.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["learner's permit", "expired", "provisional", "student driver"],
        "keywords_es": ["permiso aprendizaje", "vencido", "provisional", "estudiante"],
        "verified": true
    },
    {
        "id": "ftb-3-23-j",
        "article_number": "Art. 3.23(j)",
        "citation": "Sin L.P.R.A. asignado",
        "sort_key": "003.023.010",
        "category": "ftb-traffic",
        "title_en": "Learner or companion failing to carry permit or driver's license",
        "title_es": "Aprendiz o acompañante no lleva permiso o licencia de conducir",
        "when_applies_en": "Learner does not have physical paper, or authorized person 21+ accompanying did not bring their license.",
        "when_applies_es": "El aprendiz no tiene su papel físico, o la persona de 21+ años autorizada que lo acompaña no trajo su licencia.",
        "description_en": "Learner or accompanying authorized driver not carrying required permit or license.",
        "description_es": "Aprendiz o conductor autorizado acompañante no portando permiso o licencia requerida.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["learner's permit", "not carrying", "accompanying driver", "student"],
        "keywords_es": ["permiso aprendizaje", "no portar", "conductor acompañante", "estudiante"],
        "verified": true
    },
    {
        "id": "ftb-3-23-k",
        "article_number": "Art. 3.23(k)",
        "citation": "Sin L.P.R.A. asignado",
        "sort_key": "003.023.011",
        "category": "ftb-traffic",
        "title_en": "Presenting as own any driver's license not issued to them",
        "title_es": "Presentar como propia licencia de conducir no emitida para ellos",
        "when_applies_en": "Stopped and hands police brother's license who looks like him, to evade fines in his name.",
        "when_applies_es": "Lo paran y le entrega al policía la licencia de su hermano que se parece a él, para evadir multas a su nombre.",
        "description_en": "Using someone else's driver's license as if it were your own.",
        "description_es": "Usar licencia de conducir de otra persona como si fuera propia.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["false identity", "someone else's license", "impersonation", "fraud"],
        "keywords_es": ["falsa identidad", "licencia de otro", "impersonación", "fraude"],
        "verified": true
    },
    {
        "id": "ftb-3-23-m",
        "article_number": "Art. 3.23(m)",
        "citation": "9 L.P.R.A. § 5073",
        "sort_key": "003.023.013",
        "category": "ftb-traffic",
        "title_en": "Driving while license is suspended or revoked",
        "title_es": "Conducir mientras la licencia está suspendida o revocada",
        "when_applies_en": "Driving after court or CESCO suspended license (e.g., for points, DUI, or ASUME).",
        "when_applies_es": "Conducir luego de que el tribunal o CESCO le suspendiera la licencia (ej. por puntos, por DUI, o ASUME).",
        "description_en": "Operating vehicle while driver's license is suspended or revoked by court or DMV.",
        "description_es": "Operar vehículo mientras licencia de conducir está suspendida o revocada por tribunal o DMV.",
        "fine": "$500.00 / MCA",
        "is_mca": false,
        "keywords_en": ["suspended license", "revoked license", "driving suspended", "ASUME"],
        "keywords_es": ["licencia suspendida", "licencia revocada", "conducir suspendido", "ASUME"],
        "verified": true
    }
];

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { federalPenalCodeStatutes, prPenalCodeStatutes, FT_BUCHANAN_TRAFFIC_CODE, FT_BUCHANAN_TRAFFIC_CODE_PART2, FT_BUCHANAN_TRAFFIC_CODE_PART3 };
}


// ============================================
// SEARCH FUNCTIONS FOR LAW LIBRARY
// ============================================

/**
 * Search laws by query and category
 * @param {string} query - Search query
 * @param {string} category - Category to filter by (optional)
 * @returns {Array} - Array of matching laws
 */
function searchLaws(query, category = null) {
    let laws = [];

    // Combine all law datasets
    if (typeof FT_BUCHANAN_TRAFFIC_CODE !== 'undefined') {
        laws = laws.concat(FT_BUCHANAN_TRAFFIC_CODE);
    }
    if (typeof FT_BUCHANAN_TRAFFIC_CODE_PART2 !== 'undefined') {
        laws = laws.concat(FT_BUCHANAN_TRAFFIC_CODE_PART2);
    }
    if (typeof FT_BUCHANAN_TRAFFIC_CODE_PART3 !== 'undefined') {
        laws = laws.concat(FT_BUCHANAN_TRAFFIC_CODE_PART3);
    }
    if (typeof federalPenalCodeStatutes !== 'undefined') {
        laws = laws.concat(federalPenalCodeStatutes);
    }
    if (typeof prPenalCodeStatutes !== 'undefined') {
        laws = laws.concat(prPenalCodeStatutes);
    }

    // Category mapping for filter buttons
    const categoryMap = {
        'federal-penal': 'Federal Penal Code',
        'ftb-traffic': 'ftb-traffic',
        'pr-law-22': 'pr-law-22',
        'pr-penal': 'pr-penal',
        'ucmj': 'ucmj'
    };

    // Filter by category if specified
    if (category && category !== 'all') {
        const mappedCategory = categoryMap[category] || category;
        laws = laws.filter(law => law.category === mappedCategory);
    }

    // If no query, return all laws (sorted)
    if (!query || query.trim() === '') {
        return laws.sort((a, b) => (a.sort_key || '').localeCompare(b.sort_key || ''));
    }

    const searchTerm = query.toLowerCase().trim();

    // Search in multiple fields
    return laws.filter(law => {
        const searchableFields = [
            law.title_en,
            law.title_es,
            law.description_en,
            law.description_es,
            law.citation,
            law.article_number,
            law.display_title_en,
            law.display_title_es,
            ...(law.keywords_en || []),
            ...(law.keywords_es || [])
        ].filter(Boolean).join(' ').toLowerCase();

        return searchableFields.includes(searchTerm);
    }).sort((a, b) => (a.sort_key || '').localeCompare(b.sort_key || ''));
}

/**
 * Get a law by its ID
 * @param {string} id - Law ID
 * @returns {Object|null} - Law object or null if not found
 */
function getLawById(id) {
    let laws = [];

    // Combine all law datasets
    if (typeof FT_BUCHANAN_TRAFFIC_CODE !== 'undefined') {
        laws = laws.concat(FT_BUCHANAN_TRAFFIC_CODE);
    }
    if (typeof FT_BUCHANAN_TRAFFIC_CODE_PART2 !== 'undefined') {
        laws = laws.concat(FT_BUCHANAN_TRAFFIC_CODE_PART2);
    }
    if (typeof FT_BUCHANAN_TRAFFIC_CODE_PART3 !== 'undefined') {
        laws = laws.concat(FT_BUCHANAN_TRAFFIC_CODE_PART3);
    }
    if (typeof federalPenalCodeStatutes !== 'undefined') {
        laws = laws.concat(federalPenalCodeStatutes);
    }
    if (typeof prPenalCodeStatutes !== 'undefined') {
        laws = laws.concat(prPenalCodeStatutes);
    }

    return laws.find(law => law.id === id) || null;
}

// ============================================
// FT BUCHANAN TRAFFIC CODE - PART 3
// Artículos 4.xx - 15.xx (Hit & Run, Speed, DUI, Signals, Equipment)
// ============================================
const FT_BUCHANAN_TRAFFIC_CODE_PART3 = [
    // Artículos 4.xx - Hit & Run / Accidents
    {
        "id": "ftb-4-02",
        "article_number": "Art. 4.02",
        "citation": "9 L.P.R.A. § 5102",
        "sort_key": "004.002.000",
        "category": "ftb-traffic",
        "title_en": "Hit & Run (Fleeing scene with damage/injuries/death established)",
        "title_es": "Fuga del lugar del accidente (con daños/lesiones/muerte establecidos)",
        "when_applies_en": "Driver crashes and flees. Crucial to document property damage or injured/dead persons.",
        "when_applies_es": "El conductor choca y se da a la fuga. Es crucial documentar daños a propiedad ajena o personas heridas/muertas.",
        "description_en": "Leaving the scene of an accident involving property damage, injuries, or death.",
        "description_es": "Abandonar la escena de un accidente que involucra daños a propiedad, lesiones o muerte.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["hit and run", "fleeing", "accident", "leaving scene", "property damage"],
        "keywords_es": ["fuga", "accidente", "abandonar escena", "daños propiedad", "choque"],
        "verified": true
    },
    {
        "id": "ftb-4-03-a",
        "article_number": "Art. 4.03(a)",
        "citation": "9 L.P.R.A. § 5103",
        "sort_key": "004.003.001",
        "category": "ftb-traffic",
        "title_en": "Failure of involved driver to stop, provide info, and show license",
        "title_es": "Conductor involucrado no se detiene, no da información ni muestra licencia",
        "when_applies_en": "Stopped after crash but refuses to give details and insurance to other driver for complaint.",
        "when_applies_es": "Se detuvo tras el choque, pero se niega a darle sus datos y el seguro al otro conductor para hacer la querella.",
        "description_en": "Failing to stop at accident scene, exchange information, and present driver's license.",
        "description_es": "No detenerse en escena de accidente, intercambiar información y presentar licencia de conducir.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["stop", "exchange info", "license", "accident", "information"],
        "keywords_es": ["detenerse", "intercambiar info", "licencia", "accidente", "información"],
        "verified": true
    },
    {
        "id": "ftb-4-11",
        "article_number": "Art. 4.11",
        "citation": "9 L.P.R.A. § 5111",
        "sort_key": "004.011.000",
        "category": "ftb-traffic",
        "title_en": "Police authority to confiscate/secure vehicle for Hit & Run inspection",
        "title_es": "Autoridad policial para confiscar/asegurar vehículo para inspección de Fuga",
        "when_applies_en": "Article used to justify taking custody (max 48 hrs) of suspected Hit & Run vehicle parked at home.",
        "when_applies_es": "Artículo que usas para justificar llevarte ocupado (por max 48 hrs) un vehículo sospechoso de 'Hit and Run' estacionado en una casa.",
        "description_en": "Police authority to seize and secure vehicle suspected of involvement in hit-and-run for up to 48 hours.",
        "description_es": "Autoridad policial para incautar y asegurar vehículo sospechoso de involucramiento en fuga por hasta 48 horas.",
        "fine": "DD Form 2506 / DA Form 4137",
        "is_mca": false,
        "keywords_en": ["confiscate", "seize", "hit and run", "inspection", "48 hours"],
        "keywords_es": ["confiscar", "incautar", "fuga", "inspección", "48 horas"],
        "verified": true
    },
    // Artículos 5.xx - Speed
    {
        "id": "ftb-5-02-g-1",
        "article_number": "Art. 5.02(g)(1)",
        "citation": "9 L.P.R.A. § 5122",
        "sort_key": "005.002.007",
        "category": "ftb-traffic",
        "title_en": "Speeding over maximum allowed limit",
        "title_es": "Exceso de velocidad sobre límite máximo permitido",
        "when_applies_en": "Standard radar/LIDAR ticket. Base fine $100, plus $10 additional for each mile over limit.",
        "when_applies_es": "El boleto estándar de radar/LIDAR. La multa base es $100, y tú le sumas $10 adicional por cada milla en exceso del límite.",
        "description_en": "Driving above posted speed limit. Fine increases by $10 per mph over limit.",
        "description_es": "Conducir por encima del límite de velocidad publicado. La multa aumenta $10 por mph sobre el límite.",
        "fine": "$100.00+",
        "is_mca": false,
        "keywords_en": ["speeding", "radar", "LIDAR", "over limit", "excessive speed"],
        "keywords_es": ["exceso velocidad", "radar", "LIDAR", "sobre límite", "velocidad excesiva"],
        "verified": true
    },
    {
        "id": "ftb-5-02-g-2",
        "article_number": "Art. 5.02(g)(2)",
        "citation": "9 L.P.R.A. § 5122",
        "sort_key": "005.002.008",
        "category": "ftb-traffic",
        "title_en": "Driving at 100 miles per hour or more",
        "title_es": "Conducir a 100 millas por hora o más",
        "when_applies_en": "Caught driver 'flying low' at 100 MPH or more; automatic direct fine without calculating extra miles.",
        "when_applies_es": "Sorprendes a un conductor 'volando bajito' a 100 MPH o más; multa directa automática sin calcular millas extras.",
        "description_en": "Excessive speeding at 100 mph or above. Automatic high fine regardless of speed limit.",
        "description_es": "Exceso de velocidad a 100 mph o más. Multa alta automática independientemente del límite.",
        "fine": "$1,000.00",
        "is_mca": false,
        "keywords_en": ["100 mph", "excessive speed", "reckless speed", "racing"],
        "keywords_es": ["100 mph", "velocidad excesiva", "velocidad imprudente", "carreras"],
        "verified": true
    },
    {
        "id": "ftb-5-02-h",
        "article_number": "Art. 5.02(h)",
        "citation": "9 L.P.R.A. § 5122",
        "sort_key": "005.002.009",
        "category": "ftb-traffic",
        "title_en": "Speeding in marked School Zone",
        "title_es": "Exceso de velocidad en Zona Escolar marcada",
        "when_applies_en": "Speeding in front of schools (limit is 15 MPH during school hours). If crash here due to speeding, goes to court.",
        "when_applies_es": "Exceso de velocidad frente a escuelas (límite es 15 MPH en horario escolar). Si causa un choque aquí por exceso de velocidad, va a tribunal.",
        "description_en": "Speeding in designated school zone (15 MPH limit). Enhanced penalties if accident occurs.",
        "description_es": "Exceso de velocidad en zona escolar designada (límite 15 MPH). Penalidades aumentadas si ocurre accidente.",
        "fine": "$200.00 / MCA",
        "is_mca": false,
        "keywords_en": ["school zone", "children", "15 mph", "speeding", "school hours"],
        "keywords_es": ["zona escolar", "niños", "15 mph", "exceso velocidad", "horario escolar"],
        "verified": true
    },
    {
        "id": "ftb-5-06",
        "article_number": "Art. 5.06",
        "citation": "9 L.P.R.A. § 5126",
        "sort_key": "005.006.000",
        "category": "ftb-traffic",
        "title_en": "Car racing, speed and acceleration contests on public highways",
        "title_es": "Carreras de autos, competencias de velocidad y aceleración en vías públicas",
        "when_applies_en": "Arrest and vehicle seizure of those caught in street drag racing, or doing donuts on public road.",
        "when_applies_es": "Arresto y ocupación de vehículos pillados en un regateo ('dragueo' callejero), o haciendo 'ceritos' (donuts) en vía pública.",
        "description_en": "Street racing, drag racing, or performing stunts on public roads. Vehicle may be seized.",
        "description_es": "Carreras callejeras, drag racing o realizar acrobacias en vías públicas. Vehículo puede ser incautado.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["racing", "drag racing", "street racing", "donuts", "acceleration contest"],
        "keywords_es": ["carreras", "dragueo", "carreras callejeras", "donuts", "competencia"],
        "verified": true
    },
    {
        "id": "ftb-5-07",
        "article_number": "Art. 5.07",
        "citation": "9 L.P.R.A. § 5127",
        "sort_key": "005.007.000",
        "category": "ftb-traffic",
        "title_en": "Reckless driving (imprudence/negligence with disregard for safety)",
        "title_es": "Conducción imprudente (imprudencia/negligencia sin consideración por seguridad)",
        "when_applies_en": "Police chase, cutting lanes wildly in traffic jam, or texting while driving side to side putting others at risk.",
        "when_applies_es": "Fuga policial, ir cortando de carril a lo loco en el tapón, o guiar texteando de lado a lado poniendo en riesgo a los demás.",
        "description_en": "Operating vehicle with willful or wanton disregard for safety of persons or property.",
        "description_es": "Operar vehículo con desprecio deliberado o imprudente por la seguridad de personas o propiedad.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["reckless driving", "imprudence", "negligence", "disregard", "dangerous driving"],
        "keywords_es": ["conducción imprudente", "imprudencia", "negligencia", "desprecio", "conducción peligrosa"],
        "verified": true
    },
    // Artículos 7.xx - DUI / Alcohol
    {
        "id": "ftb-7-01",
        "article_number": "Art. 7.01",
        "citation": "9 L.P.R.A. § 5201",
        "sort_key": "007.001.000",
        "category": "ftb-traffic",
        "title_en": "Driving under influence, or having open container",
        "title_es": "Conducir bajo influencia, o tener envase abierto",
        "when_applies_en": "Strong alcohol smell, slurred speech, or has open beer/drink in cupholder or spilled in passenger area.",
        "when_applies_es": "Fuerte olor a alcohol, arrastra las palabras al hablar o tiene una cerveza/trago abierto en el portavasos o regado en el área de pasajeros.",
        "description_en": "Operating vehicle under influence of alcohol or with open container of alcoholic beverage.",
        "description_es": "Operar vehículo bajo influencia de alcohol o con envase abierto de bebida alcohólica.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["DUI", "DWI", "open container", "alcohol", "under influence", "drunk driving"],
        "keywords_es": ["DUI", "ebrio", "envase abierto", "alcohol", "bajo influencia", "conducir ebrio"],
        "verified": true
    },
    {
        "id": "ftb-7-02-a",
        "article_number": "Art. 7.02(a)",
        "citation": "9 L.P.R.A. § 5202",
        "sort_key": "007.002.001",
        "category": "ftb-traffic",
        "title_en": "21 years+ driving with .08% or more alcohol",
        "title_es": "21 años+ conduciendo con .08% o más de alcohol",
        "when_applies_en": "Regular driver over 21 submits to breathalyzer or blood test and marks .08% or more.",
        "when_applies_es": "Un conductor regular mayor de 21 años es sometido a la máquina de aliento (Intoxilyzer) o prueba de sangre y marca .08% o más.",
        "description_en": "Adult 21+ operating vehicle with blood alcohol content (BAC) of 0.08% or higher.",
        "description_es": "Adulto 21+ operando vehículo con contenido de alcohol en sangre (BAC) de 0.08% o más.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["DUI", "0.08", "BAC", "blood alcohol", "intoxicated", "breathalyzer"],
        "keywords_es": ["DUI", "0.08", "BAC", "alcohol sangre", "ebrio", "alcoholímetro"],
        "verified": true
    },
    {
        "id": "ftb-7-09-a",
        "article_number": "Art. 7.09(a)",
        "citation": "9 L.P.R.A. § 5209",
        "sort_key": "007.009.001",
        "category": "ftb-traffic",
        "title_en": "Resisting/refusing test procedure",
        "title_es": "Resistir/rehusar procedimiento de prueba",
        "when_applies_en": "Subject refuses breath test on street/station. Proceed with arrest and mandatory hospital blood extraction.",
        "when_applies_es": "El sujeto intervenido se niega rotundamente a la prueba de aliento en la calle/cuartel. Se procede con el arresto y traslado al hospital para extracción de sangre mandatoria.",
        "description_en": "Refusing to submit to chemical test (breath, blood, or urine) for alcohol/drug screening.",
        "description_es": "Rehusar someterse a prueba química (aliento, sangre o orina) para detección de alcohol/drogas.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["refusal", "breath test", "blood test", "resisting", "DUI refusal"],
        "keywords_es": ["negativa", "prueba aliento", "prueba sangre", "resistencia", "negativa DUI"],
        "verified": true
    },
    // Artículos 8.xx - Traffic Signals
    {
        "id": "ftb-8-02-b",
        "article_number": "Art. 8.02(b)",
        "citation": "9 L.P.R.A. § 5222",
        "sort_key": "008.002.002",
        "category": "ftb-traffic",
        "title_en": "Red light: Proceeding before green / Not stopping at all",
        "title_es": "Luz roja: Proceder antes de verde / No detenerse en absoluto",
        "when_applies_en": "Famous running red light ticket. If driver brakes a little but continues it's $300. If crosses without slightest intention to brake, it's $500.",
        "when_applies_es": "El famoso boleto de pasarse la luz roja. Si el conductor frena un poco pero sigue es $300. Si cruza sin la más mínima intención de frenar, son $500.",
        "description_en": "Running red traffic light. Higher fine if no attempt to stop.",
        "description_es": "Pasar luz roja de tránsito. Multa mayor si no hay intento de detenerse.",
        "fine": "$300.00 / $500.00",
        "is_mca": false,
        "keywords_en": ["red light", "running red", "traffic light", "stop", "intersection"],
        "keywords_es": ["luz roja", "pasarse roja", "semáforo", "detenerse", "intersección"],
        "verified": true
    },
    {
        "id": "ftb-8-05-a",
        "article_number": "Art. 8.05(a)",
        "citation": "9 L.P.R.A. § 5225",
        "sort_key": "008.005.001",
        "category": "ftb-traffic",
        "title_en": "Failure to obey stop sign (Pare)",
        "title_es": "No obedecer señal de Pare",
        "when_applies_en": "Not stopping at stop line, or stopping but starting cutting off another car that was coming on main road (immediate danger).",
        "when_applies_es": "No se detiene en la línea de pare, o se detiene pero arranca cortándole el paso a un carro que venía por la vía principal (peligro inmediato).",
        "description_en": "Failing to come to complete stop at stop sign or before entering intersection.",
        "description_es": "No detenerse completamente en señal de pare o antes de entrar a intersección.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["stop sign", "pare", "rolling stop", "intersection", "failure to stop"],
        "keywords_es": ["señal pare", "pare", "no detenerse", "intersección", "no parar"],
        "verified": true
    },
    // Artículos 6.xx - Traffic Rules (selected)
    {
        "id": "ftb-6-01",
        "article_number": "Art. 6.01",
        "citation": "9 L.P.R.A. § 5151",
        "sort_key": "006.001.000",
        "category": "ftb-traffic",
        "title_en": "Failure to drive on right side (except when passing/blocked)",
        "title_es": "No conducir por lado derecho (excepto al rebasar/bloqueado)",
        "when_applies_en": "Driver who stays 'cruising' in left lane (passing lane) at low speed, blocking traffic.",
        "when_applies_es": "El conductor que se queda 'paseando' por el carril izquierdo (el de rebasar) a baja velocidad, bloqueando el tráfico.",
        "description_en": "Driving in left lane when not passing or when right lane is available.",
        "description_es": "Conducir en carril izquierdo cuando no se está rebasando o cuando carril derecho está disponible.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["left lane", "passing lane", "cruising", "right side", "lane violation"],
        "keywords_es": ["carril izquierdo", "carril rebasar", "paseando", "lado derecho"],
        "verified": true
    },
    {
        "id": "ftb-6-14",
        "article_number": "Art. 6.14",
        "citation": "9 L.P.R.A. § 5164",
        "sort_key": "006.014.000",
        "category": "ftb-traffic",
        "title_en": "Failure to yield to an emergency vehicle",
        "title_es": "No ceder paso a vehículo de emergencia",
        "when_applies_en": "Not pulling over to right and stopping when police, ambulance or fire truck approaches with sirens/lights.",
        "when_applies_es": "No orillarse a la derecha y detenerse cuando viene una patrulla, ambulancia o camión de bomberos con sirenas/biombos.",
        "description_en": "Failing to yield right-of-way to emergency vehicle with lights and sirens activated.",
        "description_es": "No ceder derecho de paso a vehículo de emergencia con luces y sirenas activadas.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["emergency vehicle", "yield", "siren", "ambulance", "fire truck"],
        "keywords_es": ["vehículo emergencia", "ceder", "sirena", "ambulancia", "bomberos"],
        "verified": true
    },
    // Artículos 10.xx - General Provisions (selected)
    {
        "id": "ftb-10-05",
        "article_number": "Art. 10.05",
        "citation": "9 L.P.R.A. § 5285",
        "sort_key": "010.005.000",
        "category": "ftb-traffic",
        "title_en": "Tinted glass (transmission of light less than 35%)",
        "title_es": "Cristal tintado (transmisión de luz menos de 35%)",
        "when_applies_en": "Using excessively dark tints ('limo tint'). Requires measurement with photometer to prove less than 35% light passes through.",
        "when_applies_es": "Uso de tintes excesivamente oscuros ('limo tint'). Requiere medición con el fotómetro para probar que pasa menos de 35% de luz.",
        "description_en": "Vehicle windows with tint allowing less than 35% light transmission.",
        "description_es": "Ventanas de vehículo con tinte que permite menos de 35% de transmisión de luz.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["tint", "window tint", "35%", "limo tint", "photometer"],
        "keywords_es": ["tinte", "cristal tintado", "35%", "limo tint", "fotómetro"],
        "verified": true
    },
    {
        "id": "ftb-10-22",
        "article_number": "Art. 10.22",
        "citation": "9 L.P.R.A. § 5302",
        "sort_key": "010.022.000",
        "category": "ftb-traffic",
        "title_en": "Disobeying police order, refusing to stop, or fleeing",
        "title_es": "Desobedecer orden policial, negarse a detenerse, o huir",
        "when_applies_en": "You turn on lights to a vehicle, driver looks in mirror, accelerates and decides to flee.",
        "when_applies_es": "Le prendes los biombos a un vehículo, el conductor te mira por el espejo, acelera y decide irse a la fuga.",
        "description_en": "Evading police, failing to stop when signaled, or fleeing from law enforcement.",
        "description_es": "Evadir policía, no detenerse cuando señalado, o huir de autoridades.",
        "fine": "MCA",
        "is_mca": true,
        "keywords_en": ["fleeing", "evading", "police chase", "refuse to stop", "flight"],
        "keywords_es": ["fuga", "evadir", "persecución", "negarse detenerse", "huir"],
        "verified": true
    },
    {
        "id": "ftb-10-24",
        "article_number": "Art. 10.24",
        "citation": "9 L.P.R.A. § 5304",
        "sort_key": "010.024.000",
        "category": "ftb-traffic",
        "title_en": "Driving on sidewalk",
        "title_es": "Conducir por acera",
        "when_applies_en": "Driver gets on and drives on sidewalk to evade traffic jam or to jump to lane on other side of avenue.",
        "when_applies_es": "El conductor se sube y corre por la acera para evadir el tapón o para brincar al carril del otro lado de la avenida.",
        "description_en": "Operating vehicle on sidewalk or pedestrian walkway.",
        "description_es": "Operar vehículo en acera o paso peatonal.",
        "fine": "$500.00",
        "is_mca": false,
        "keywords_en": ["sidewalk", "driving on sidewalk", "pedestrian", " walkway"],
        "keywords_es": ["acera", "conducir acera", "peatonal", "paso peatones"],
        "verified": true
    },
    // Artículos 13.xx - Safety Belts
    {
        "id": "ftb-13-02-a",
        "article_number": "Art. 13.02(a)",
        "citation": "9 L.P.R.A. § 5382",
        "sort_key": "013.002.001",
        "category": "ftb-traffic",
        "title_en": "Failure to wear safety belts (per violation)",
        "title_es": "No usar cinturones de seguridad (por violación)",
        "when_applies_en": "Driver or passengers without seatbelt. Note: Fine is per person. If 3 without seatbelt, that's three $100 tickets to driver.",
        "when_applies_es": "Chofer o pasajeros sin cinturón puesto. Nota: La multa es por cada persona. Si van 3 sin cinturón, son tres boletos de $100 al chofer.",
        "description_en": "Operating or occupying vehicle without wearing seatbelt. Fine applies per occupant.",
        "description_es": "Operar u ocupar vehículo sin usar cinturón de seguridad. Multa aplica por ocupante.",
        "fine": "$100.00",
        "is_mca": false,
        "keywords_en": ["seatbelt", "safety belt", "not wearing", "per person", "violation"],
        "keywords_es": ["cinturón", "cinturón seguridad", "no usar", "por persona", "violación"],
        "verified": true
    },
    {
        "id": "ftb-13-03",
        "article_number": "Art. 13.03",
        "citation": "9 L.P.R.A. § 5383",
        "sort_key": "013.003.000",
        "category": "ftb-traffic",
        "title_en": "Child not in car seat / Child <12 yrs not in back seat",
        "title_es": "Niño no en asiento de carro / Niño <12 años no en asiento trasero",
        "when_applies_en": "Carrying baby/infant loose in arms, or carrying 8-year-old child sitting in front seat ('shotgun').",
        "when_applies_es": "Llevan a un bebé/infante suelto en los brazos, o llevan a un niño de 8 años sentado en el asiento delantero ('shotgun').",
        "description_en": "Child passenger not properly secured in approved car seat, or under 12 in front seat.",
        "description_es": "Pasajero menor no asegurado apropiadamente en asiento de carro aprobado, o menor de 12 en asiento delantero.",
        "fine": "$500.00",
        "is_mca": false,
        "keywords_en": ["child seat", "car seat", "under 12", "front seat", "safety"],
        "keywords_es": ["asiento niño", "asiento carro", "menor 12", "asiento delantero", "seguridad"],
        "verified": true
    },
    // Artículos 14.xx - Equipment
    {
        "id": "ftb-14-05",
        "article_number": "Art. 14.05",
        "citation": "9 L.P.R.A. § 5405",
        "sort_key": "014.005.000",
        "category": "ftb-traffic",
        "title_en": "Front lights missing or out of order",
        "title_es": "Luces delanteras faltantes o fuera de servicio",
        "when_applies_en": "One front left or right headlight completely off (blown), or car drove hitting and is missing entire front headlight.",
        "when_applies_es": "Un foco delantero izquierdo o derecho está totalmente apagado (fundido), o el carro anduvo chocando y le falta todo el foco de frente.",
        "description_en": "Operating vehicle without functioning front headlights.",
        "description_es": "Operar vehículo sin faros delanteros funcionando.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["headlight", "front light", "out", "not working", "equipment"],
        "keywords_es": ["foco", "luz delantera", "apagado", "no funciona", "equipo"],
        "verified": true
    },
    {
        "id": "ftb-14-09",
        "article_number": "Art. 14.09",
        "citation": "9 L.P.R.A. § 5409",
        "sort_key": "014.009.000",
        "category": "ftb-traffic",
        "title_en": "Stop (brake) lights out of order",
        "title_es": "Luces de freno (alto) fuera de servicio",
        "when_applies_en": "Driver steps on brake and rear red brake lights don't come on (imminent rear collision danger).",
        "when_applies_es": "El conductor pisa el freno y las luces rojas traseras de alto no prenden (peligro inminente de choque por detrás).",
        "description_en": "Operating vehicle with non-functioning brake lights.",
        "description_es": "Operar vehículo con luces de freno no funcionando.",
        "fine": "$50.00",
        "is_mca": false,
        "keywords_en": ["brake light", "stop light", "tail light", "not working", "rear"],
        "keywords_es": ["luz freno", "luz alto", "luz trasera", "no funciona", "detrás"],
        "verified": true
    }
];

/**
 * Get all available law categories
 * @returns {Array} - Array of category objects
 */
function getLawCategories() {
    return [
        { id: 'all', name_en: 'All Categories', name_es: 'Todas las Categorías' },
        { id: 'ftb-traffic', name_en: 'FT Buchanan Traffic Code', name_es: 'Código de Tránsito FT Buchanan' },
        { id: 'federal-penal', name_en: 'Federal Penal Code', name_es: 'Código Penal Federal' },
        { id: 'pr-penal', name_en: 'PR Penal Code', name_es: 'Código Penal de PR' }
    ];
}
