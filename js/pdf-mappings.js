/**
 * PDF MAPPINGS - Police Tools App
 * Mapeos EXACTOS basados en inspección de campos AcroForm reales
 * Versión 6.0 - Campos verificados de templates PDF
 */

// ============================================
// INTERVIEW WORKSHEET MAPPING
// Basado en Interview.pdf - 59 campos
// ============================================
const interviewMapping = {
    templateFile: 'Interview.pdf',
    totalFields: 59,
    fields: {
        // Personal Information
        'last_name': { pdfField: 'Last', type: 'text' },
        'first_name': { pdfField: 'First', type: 'text' },
        'middle_name': { pdfField: 'Middle', type: 'text' },
        'cadency': { pdfField: 'Cadency', type: 'text' },
        
        // Row 2
        'ssn': { pdfField: 'SSN', type: 'text' },
        'dob': { pdfField: 'DOB', type: 'text' },
        
        // Row 3
        'rank': { pdfField: 'Rank', type: 'text' },
        'macom': { pdfField: 'MACOM', type: 'text' },
        
        // Place of Birth
        'pob_city': { pdfField: 'POB', type: 'text' },
        'pob_state': { pdfField: 'State', type: 'text' },
        'pob_country': { pdfField: 'Country', type: 'text' },
        
        // Contact
        'home_tele': { pdfField: 'HomeTele', type: 'text' },
        'cell_tele': { pdfField: 'CellTele', type: 'text' },
        'business_tele': { pdfField: 'WorkTele', type: 'text' },
        
        // Unit Address
        'unit_street': { pdfField: 'UnitStreet', type: 'text' },
        'unit_city': { pdfField: 'UnitCity', type: 'text' },
        'unit_state': { pdfField: 'UnitState', type: 'text' },
        'unit_country': { pdfField: 'UnitCountry', type: 'text' },
        
        // Resident Address
        'resident_street': { pdfField: 'ResidentStreet', type: 'text' },
        'resident_city': { pdfField: 'ResidentCity', type: 'text' },
        'resident_state': { pdfField: 'ResidentState', type: 'text' },
        'resident_country': { pdfField: 'ResidentCountry', type: 'text' },
        
        // Sponsor
        'sponsor_last': { pdfField: 'SponsorLast', type: 'text' },
        'sponsor_first': { pdfField: 'SponsorFirst', type: 'text' },
        'sponsor_middle': { pdfField: 'SponsorMiddle', type: 'text' },
        'sponsor_ssn': { pdfField: 'SponsorSSN', type: 'text' },
        'sponsor_rank': { pdfField: 'SponsorRank', type: 'text' },
        'sponsor_street': { pdfField: 'SponsorStreet', type: 'text' },
        'sponsor_city': { pdfField: 'SponsorCity', type: 'text' },
        'sponsor_state': { pdfField: 'SponsorState', type: 'text' },
        'sponsor_country': { pdfField: 'SponsorCountry', type: 'text' },
        
        // Physical / Demographics
        'sex': { pdfField: 'Sex', type: 'text' },
        'deceased': { pdfField: 'Deceased', type: 'text' },
        'height': { pdfField: 'Height', type: 'text' },
        'citizenship': { pdfField: 'Citizenship', type: 'text' },
        'weight': { pdfField: 'Weight', type: 'text' },
        'education': { pdfField: 'Education', type: 'text' },
        'eye_color': { pdfField: 'EyeColor', type: 'text' },
        'fingerprints': { pdfField: 'Fingerprints', type: 'text' },
        'build': { pdfField: 'Build', type: 'text' },
        'combat_deploys': { pdfField: 'CombatDeploys', type: 'text' },
        'complexion': { pdfField: 'Complexion', type: 'text' },
        'mos': { pdfField: 'MOS', type: 'text' },
        'marital_status': { pdfField: 'MaritalStatus', type: 'text' },
        'clearance': { pdfField: 'Clearance', type: 'text' },
        'age': { pdfField: 'Age', type: 'text' },
        'photographed': { pdfField: 'Photographed', type: 'text' },
        'race': { pdfField: 'Race', type: 'text' },
        'ets_date': { pdfField: 'ETSDate', type: 'text' },
        'ethnicity': { pdfField: 'Ethnicity', type: 'text' },
        'fugitive': { pdfField: 'Fugitive', type: 'text' },
        'hair_style': { pdfField: 'HairStyle', type: 'text' },
        'juvenile': { pdfField: 'Juvenile', type: 'text' },
        'hair_color': { pdfField: 'HairColor', type: 'text' },
        'demeanor': { pdfField: 'Demeanor', type: 'text' },
        'facial_hair': { pdfField: 'FacialHair', type: 'text' },
        'pcs_dros': { pdfField: 'PCSDROS', type: 'text' },
        'glasses': { pdfField: 'Glasses', type: 'text' },
        
        // Remarks
        'remarks': { pdfField: 'Remarks', type: 'text' }
    }
};

// ============================================
// GUARD MOUNT MAPPING
// Basado en guardmount.pdf - 119 campos
// ============================================
const guardMountMapping = {
    templateFile: 'guardmount.pdf',
    totalFields: 119,
    fields: {
        // Header fields
        'date': { pdfField: 'DATE', type: 'text' },
        'from_shift_supervisor': { pdfField: 'FROM SHIFT SUPERVISOR', type: 'text' },
        'to_desk_officer': { pdfField: 'TO DESK OPERATION OFFICER', type: 'text' },
        'guardmount_conducted': { pdfField: 'GUARDMOUNT CONDUCTED INSPECTION', type: 'text' },
        'inspection_location': { pdfField: 'INSPECTION CONDUCTED AT', type: 'text' },
        'hours': { pdfField: 'HOURS', type: 'text' },
        'trainer': { pdfField: 'TRAINER', type: 'text' },
        'trainer_subject': { pdfField: '1', type: 'text' },  // Field named "1"
        'supervisor_name': { pdfField: 'SHIFT SUPERVISOR', type: 'text' },
        'supervisor_rank': { pdfField: 'RANK', type: 'text' },
        'supervisor_signature': { pdfField: 'SHIFT SUPERVISOR SIGNATURE', type: 'text' },
        'remarks': { pdfField: null, type: 'text' }  // No remarks field in PDF
    },
    // Tabla de personal - patrón exacto del PDF
    personnelTable: {
        maxRows: 18,
        rowPrefix: '',  // No prefix, field names are like RANKRow1
        fields: {
            'rank': 'RANKRow',
            'name': 'NAMERow',
            'duty': 'DUTY POSITIONRow',
            'appearance': 'APPEARANCERow',
            'vehicle': 'VEHICLERow',
            'radio': 'RADIORow'
        }
    }
};

// ============================================
// PATROL LOG MAPPING
// Basado en patrol_log.pdf - 290 campos
// ============================================
const patrolLogMapping = {
    templateFile: 'patrol_log.pdf',
    totalFields: 290,
    pageCount: 2,
    fields: {
        // Shift checkboxes
        'shift_days': { pdfField: 'DAYS', type: 'checkbox' },
        'shift_swings': { pdfField: 'SWINGS', type: 'checkbox' },
        'shift_mid': { pdfField: 'MID', type: 'checkbox' },
        
        // Basic info
        'patrol': { pdfField: 'Patrol', type: 'text' },
        'date': { pdfField: 'Date', type: 'text' },
        'police_name': { pdfField: null, type: 'text' },  // No direct field
        'mid': { pdfField: null, type: 'text' },  // No direct field

        // "Vehicle:" y "Radio No.:" tienen cada uno su recuadro en el
        // formulario, pero la plantilla los dejo sin nombrar: se llaman
        // "undefined" y "undefined_2". El mapeo anterior los daba por
        // inexistentes y metia "VEHICULO / RADIO" junto en "Vehicle Radio No",
        // que es otro campo de la fila de abajo, asi que los dos recuadros
        // salian siempre en blanco.
        //   undefined    y=720 x=331  <- junto a la etiqueta "Vehicle:"
        //   undefined_2  y=705 x=341  <- junto a la etiqueta "Radio No.:"
        'vehicle': { pdfField: 'undefined', type: 'text' },
        'radio_no': { pdfField: 'undefined_2', type: 'text' },
        
        // Mileage
        'beginning_mileage': { pdfField: 'Beginning', type: 'text' },
        'ending_mileage': { pdfField: 'Ending Mileage', type: 'text' },
        'total_mileage': { pdfField: 'Total Mileage', type: 'text' },
        
        // Fuel & Maintenance
        'fuel': { pdfField: 'Fuel 1', type: 'text' },
        'fuel2': { pdfField: 'Fuel 2', type: 'text' },
        'oil': { pdfField: 'OIL QTR', type: 'text' },
        'other_maintenance': { pdfField: 'Other', type: 'text' },
        'fuel_cost': { pdfField: 'GSA or Credit Card Total Cost', type: 'text' },
        
        // Signatures
        'sig1_print': { pdfField: '1 PRINT', type: 'text' },
        'sig1_sign': { pdfField: 'SIGN', type: 'text' },
        'sig2_print': { pdfField: '2 PRINT', type: 'text' },
        'sig2_sign': { pdfField: 'SIGN_2', type: 'text' },
        'sig3_print': { pdfField: '3 PS PRINT', type: 'text' },
        'sig3_sign': { pdfField: 'SIGN_3', type: 'text' },
        
        // Citations
        'citations_moving': { pdfField: 'Moving 1', type: 'text' },
        'citations_moving2': { pdfField: 'Moving 2', type: 'text' },
        'citations_moving3': { pdfField: 'Moving 3', type: 'text' },
        'citations_nonmoving': { pdfField: 'Non Moving 1', type: 'text' },
        'citations_nonmoving2': { pdfField: 'Non Moving 2', type: 'text' },
        'citations_nonmoving3': { pdfField: 'Non Moving 3', type: 'text' },
        'dd_fm_1805': { pdfField: null, type: 'text' },  // No direct field
        'da_fm_1408': { pdfField: null, type: 'text' },  // No direct field
        'verbal_warning': { pdfField: null, type: 'text' },  // No direct field
        
        // Comments
        'comments': { pdfField: 'COMMENTS', type: 'text' }
    },
    // Mission entries - usando índices específicos del PDF
    missionTable: {
        maxRows: 26,
        // Los campos de misión están en índices específicos del PDF
        // INRow1-INRow26 y OUTRow1-OUTRow26
        inFieldPrefix: 'INRow',
        outFieldPrefix: 'OUTRow',
        // También hay OUTRow1_2, OUTRow2_2 etc. para segunda columna
        outField2Prefix: 'OUTRow',
        outField2Suffix: '_2'
    }
};

// ============================================
// PMCS BASE MAPPING (CLEAN, Explorer, Durango, F-150, Taurus)
// Basado en nuevos templates PMCS - 103 campos de texto
// TODOS los campos son PDFTextField (no checkboxes)
// ============================================
const pmcsBaseMapping = {
    // ============================================
    // CAJAS DE FIRMA
    //
    // Las plantillas PMCS imprimen las lineas de "Operator Signature",
    // "Patrol Supervisor Signature" y "Desk Sergeant Signature" pero no
    // definen ningun campo para ellas, asi que no hay rectangulo del que
    // partir. Estas coordenadas se miden sobre la propia pagina 1 (540x720
    // pt, origen abajo-izquierda), alineadas con los campos de nombre que
    // si existen y que estan en la misma fila.
    // ============================================
    signatureBoxes: {
        'operator_signature':      { page: 0, x: 348, y: 112, width: 186, height: 22 },
        'supervisor_signature':    { page: 0, x: 290, y: 76,  width: 244, height: 22 },
        'desk_sergeant_signature': { page: 0, x: 290, y: 40,  width: 244, height: 22 }
    },

    totalFields: 103,
    semanticFields: 103,
    
    // ============================================
    // PÁGINA 1 - CAMPOS DE CABECERA
    // ============================================
    fields: {
        'shift': { pdfField: 'Shift', type: 'text' },
        'unit': { pdfField: 'Unit', type: 'text' },
        'date': { pdfField: 'Date', type: 'text' },
        'vehicle_number': { pdfField: 'Vehicle', type: 'text' },
        'operator_name': { pdfField: 'Operator Name', type: 'text' },
        'supervisor_name': { pdfField: 'Patrol Supervisor Name', type: 'text' },
        'desk_sergeant_name': { pdfField: 'Desk Sergeant Name', type: 'text' },
        'mileage_out': { pdfField: 'Mileage Out', type: 'text' },
        'mileage_in': { pdfField: 'Mileage In', type: 'text' },
        'additional_operators': { pdfField: 'Additional Operators', type: 'text' },
        'remarks': { pdfField: 'REMARKS 1', type: 'text' },
        
        // ============================================
        // PÁGINA 2 - CHECK WITH ENGINE OFF (a-p)
        // BEFORE/AFTER/REMARK para cada ítem
        // ============================================
        // a. Engine Oil
        'engine_oil_before': { pdfField: 'BEFOREa Engine Oil', type: 'text' },
        'engine_oil_after': { pdfField: 'AFTERa Engine Oil', type: 'text' },
        'engine_oil_remark': { pdfField: 'REMARKa Engine Oil', type: 'text' },
        
        // b. Power steering, Brake, Washer Fluid
        'fluids_before': { pdfField: 'BEFOREb Power steering Brake and Washer Fluid', type: 'text' },
        'fluids_after': { pdfField: 'AFTERb Power steering Brake and Washer Fluid', type: 'text' },
        'fluids_remark': { pdfField: 'REMARKb Power steering Brake and Washer Fluid', type: 'text' },
        
        // c. Radiator Fluid
        'radiator_before': { pdfField: 'BEFOREc Radiator Fluid do not remove cap hot', type: 'text' },
        'radiator_after': { pdfField: 'AFTERc Radiator Fluid do not remove cap hot', type: 'text' },
        'radiator_remark': { pdfField: 'REMARKc Radiator Fluid do not remove cap hot', type: 'text' },
        
        // d. Belt Serviceability
        'belt_before': { pdfField: 'BEFOREd Belt Serviceability', type: 'text' },
        'belt_after': { pdfField: 'AFTERd Belt Serviceability', type: 'text' },
        'belt_remark': { pdfField: 'REMARKd Belt Serviceability', type: 'text' },
        
        // e. Tire including spare
        'tire_before': { pdfField: 'BEFOREe Tire including spare', type: 'text' },
        'tire_after': { pdfField: 'AFTERe Tire including spare', type: 'text' },
        'tire_remark': { pdfField: 'REMARKe Tire including spare', type: 'text' },
        
        // f. Jack, handle and lug wrench
        'jack_before': { pdfField: 'BEFOREf Jack handle and lug wrench', type: 'text' },
        'jack_after': { pdfField: 'AFTERf Jack handle and lug wrench', type: 'text' },
        'jack_remark': { pdfField: 'REMARKf Jack handle and lug wrench', type: 'text' },
        
        // g. Mirrors and windows
        'mirrors_before': { pdfField: 'BEFOREg Mirrors and windows', type: 'text' },
        'mirrors_after': { pdfField: 'AFTERg Mirrors and windows', type: 'text' },
        'mirrors_remark': { pdfField: 'REMARKg Mirrors and windows', type: 'text' },
        
        // h. Vehicle cleanliness
        'cleanliness_before': { pdfField: 'BEFOREh Vehicle cleanliness', type: 'text' },
        'cleanliness_after': { pdfField: 'AFTERh Vehicle cleanliness', type: 'text' },
        'cleanliness_remark': { pdfField: 'REMARKh Vehicle cleanliness', type: 'text' },
        
        // i. Body Damage / Decal Damage (CRÍTICO)
        'body_before': { pdfField: 'BEFOREi Body Damage  Decal Damage', type: 'text' },
        'body_after': { pdfField: 'AFTERi Body Damage  Decal Damage', type: 'text' },
        'body_remark': { pdfField: 'REMARKi Body Damage  Decal Damage', type: 'text' },
        
        // j. Dispatch package (CRÍTICO)
        'dispatch_before': { pdfField: 'BEFOREj Dispatch package including  Dispatch Accident form 91', type: 'text' },
        'dispatch_after': { pdfField: 'AFTERj Dispatch package including  Dispatch Accident form 91', type: 'text' },
        'dispatch_remark': { pdfField: 'REMARKj Dispatch package including  Dispatch Accident form 91', type: 'text' },
        
        // k. Window tint film
        'tint_before': { pdfField: 'BEFOREk Window tint film', type: 'text' },
        'tint_after': { pdfField: 'AFTERk Window tint film', type: 'text' },
        'tint_remark': { pdfField: 'REMARKk Window tint film', type: 'text' },
        
        // l. Fire extinguisher and First Aid Kit
        'extinguisher_before': { pdfField: 'BEFOREl Fire extinguisher and First Aid Kit', type: 'text' },
        'extinguisher_after': { pdfField: 'AFTERl Fire extinguisher and First Aid Kit', type: 'text' },
        'extinguisher_remark': { pdfField: 'REMARKl Fire extinguisher and First Aid Kit', type: 'text' },
        
        // m. Government plates / Rear Camera
        'plates_before': { pdfField: 'BEFOREm Front and rear Government plates  Rear Camera', type: 'text' },
        'plates_after': { pdfField: 'AFTERm Front and rear Government plates  Rear Camera', type: 'text' },
        'plates_remark': { pdfField: 'REMARKm Front and rear Government plates  Rear Camera', type: 'text' },
        
        // n. Steering wheel cover
        'wheel_cover_before': { pdfField: 'BEFOREn Steering wheel cover', type: 'text' },
        'wheel_cover_after': { pdfField: 'AFTERn Steering wheel cover', type: 'text' },
        'wheel_cover_remark': { pdfField: 'REMARKn Steering wheel cover', type: 'text' },
        
        // o. Roof rack
        'roof_rack_before': { pdfField: 'BEFOREo Roof rack', type: 'text' },
        'roof_rack_after': { pdfField: 'AFTERo Roof rack', type: 'text' },
        'roof_rack_remark': { pdfField: 'REMARKo Roof rack', type: 'text' },
        
        // p. Vehicle GSA Fuel card
        'fuel_card_before': { pdfField: 'BEFOREp Vehicle GSA Fuel card', type: 'text' },
        'fuel_card_after': { pdfField: 'AFTERp Vehicle GSA Fuel card', type: 'text' },
        'fuel_card_remark': { pdfField: 'REMARKp Vehicle GSA Fuel card', type: 'text' },
        
        // ============================================
        // PÁGINA 2 - OPERATIONAL SYSTEM CHECK
        // ============================================
        // Starting system
        'starting_before': { pdfField: 'BEFORE Starting system', type: 'text' },
        'starting_after': { pdfField: 'AFTER Starting system', type: 'text' },
        'starting_remark': { pdfField: 'REMARK Starting system', type: 'text' },
        
        // Transmission fluid
        'transmission_before': { pdfField: 'BEFORE Transmission fluid', type: 'text' },
        'transmission_after': { pdfField: 'AFTER Transmission fluid', type: 'text' },
        'transmission_remark': { pdfField: 'REMARK Transmission fluid', type: 'text' },
        
        // Lights, signals, horn, wipers
        'lights_before': { pdfField: 'BEFORE Headlights signals brake reverse and indicator lights horn and wipers', type: 'text' },
        'lights_after': { pdfField: 'AFTER Headlights signals brake reverse and indicator lights horn and wipers', type: 'text' },
        'lights_remark': { pdfField: 'REMARK Headlights signals brake reverse and indicator lights horn and wipers', type: 'text' },
        
        // Emergency equipment
        'emergency_before': { pdfField: 'BEFORE Emergency equipment  Traffic Cones  Vehicle radio', type: 'text' },
        'emergency_after': { pdfField: 'AFTER Emergency equipment  Traffic Cones  Vehicle radio', type: 'text' },
        'emergency_remark': { pdfField: 'REMARK Emergency equipment  Traffic Cones  Vehicle radio', type: 'text' },
        
        // Brakes
        'brakes_before': { pdfField: 'BEFORE Brakes  pedal pay', type: 'text' },
        'brakes_after': { pdfField: 'AFTER Brakes  pedal pay', type: 'text' },
        'brakes_remark': { pdfField: 'REMARK Brakes  pedal pay', type: 'text' },
        
        // A/C
        'ac_before': { pdfField: 'BEFORE Air condition', type: 'text' },
        'ac_after': { pdfField: 'AFTER Air condition', type: 'text' },
        'ac_remark': { pdfField: 'REMARK Air condition', type: 'text' },
        
        // Eyewitness equipment
        'eyewitness_before': { pdfField: 'BEFORE Eye witness equipment', type: 'text' },
        'eyewitness_after': { pdfField: 'AFTER Eye witness equipment', type: 'text' },
        'eyewitness_remark': { pdfField: 'REMARK Eye witness equipment', type: 'text' },
        
        // Radar equipment
        'radar_before': { pdfField: 'BEFORE Radar equipment', type: 'text' },
        'radar_after': { pdfField: 'AFTER Radar equipment', type: 'text' },
        'radar_remark': { pdfField: 'REMARK Radar equipment', type: 'text' },
        
        // Siren
        'siren_before': { pdfField: 'BEFORE Emergency equipment  Overhead light  Siren', type: 'text' },
        'siren_after': { pdfField: 'AFTER Emergency equipment  Overhead light  Siren', type: 'text' },
        'siren_remark': { pdfField: 'REMARK Emergency equipment  Overhead light  Siren', type: 'text' },
        
        // ============================================
        // PÁGINA 2 - ADDITIONAL EQUIPMENT (CRÍTICO)
        // Mapeo de campos HTML a campos PDF
        // ============================================
        // 1. Eyewitness microphone - escribir "X" si tiene cualquier valor
        'eyewitness_mic': { pdfField: '1 Eyewitness microphone', type: 'text' },
        
        // 2. Radar tuning fork / Remote control - escribir "X" si tiene valor
        'radar_tuning_fork': { pdfField: '2 Radar tuning fork  Remote control', type: 'text' },
        
        // a. 25 MPH Serial # - escribir "X" en el checkbox + número de serie en REMARK
        'radar_25_serial': { pdfField: 'a 25 MPH Serial', type: 'text' },
        'radar_25_serial_remark': { pdfField: 'REMARKa 25 MPH Serial', type: 'text' },
        
        // b. 40 MPH Serial # - escribir "X" en el checkbox + número de serie en REMARK  
        'radar_40_serial': { pdfField: 'b 40 MPH Serial', type: 'text' },
        'radar_40_serial_remark': { pdfField: 'REMARKb 40 MPH Serial', type: 'text' },
        
        // 3. Weapon rack key # - escribir "X" en el checkbox + número de llave en REMARK
        'weapon_rack_key': { pdfField: '3 Weapon rack key', type: 'text' },
        'weapon_rack_key_remark': { pdfField: 'REMARK3 Weapon rack key', type: 'text' },
        
        // 4. Equipment Manuals - escribir "X" si tiene valor
        'equipment_manuals': { pdfField: '4 Equipment Manuals', type: 'text' }
    }
};

// ============================================
// PMCS EXPLORER MAPPING
// ============================================
const pmcsExplorerMapping = {
    ...pmcsBaseMapping,
    templateFile: 'PMCS Explorer.pdf',
    vehicleType: 'explorer'
};

// ============================================
// PMCS DURANGO MAPPING
// ============================================
const pmcsDurangoMapping = {
    ...pmcsBaseMapping,
    templateFile: 'PMCS Durango.pdf',
    vehicleType: 'durango'
};

// ============================================
// PMCS F-150 MAPPING
// ============================================
const pmcsF150Mapping = {
    ...pmcsBaseMapping,
    templateFile: 'PMCS F 150.pdf',
    vehicleType: 'f150'
};

// ============================================
// PMCS CUSTOM MAPPING
// ============================================
const pmcsCustomMapping = {
    ...pmcsBaseMapping,
    templateFile: 'PMCS Custom.pdf',
    vehicleType: 'custom'
};

// ============================================
// PMCS TAURUS MAPPING
// Basado en PMCS Taurus.pdf - 98 campos
// ============================================
const pmcsTaurusMapping = {
    templateFile: 'PMCS Taurus.pdf',
    totalFields: 98,
    vehicleType: 'taurus',

    // ============================================
    // CAMPOS AUSENTES EN LA PLANTILLA
    //
    // PMCS Taurus.pdf es otra edicion del formulario (9232-R-E, JUN 2008) y
    // solo define "Shift" en la pagina 1: los otros nueve recuadros de la
    // cabecera estan impresos pero sin campo de formulario, asi que el
    // vehiculo, el operador, el supervisor y los millajes se perdian al
    // generar el PDF.
    //
    // Las coordenadas salen de las etiquetas impresas de esa misma pagina
    // (origen abajo-izquierda, pagina de 540x720 pt). Cada campo empieza
    // despues de su etiqueta y termina antes de la siguiente. El desplazamiento
    // vertical y el alto se toman del campo "Shift" que si existe: la linea
    // base de la etiqueta menos 20pt, 23pt de alto.
    // ============================================
    missingFields: [
        { name: 'Unit', page: 0, x: 163, y: 551, width: 257, height: 23 },
        { name: 'Date', page: 0, x: 453, y: 551, width: 82, height: 23 },

        { name: 'Vehicle', page: 0, x: 53, y: 128, width: 59, height: 23 },
        { name: 'Operator Name', page: 0, x: 192, y: 128, width: 150, height: 23 },

        { name: 'Patrol Supervisor Name', page: 0, x: 118, y: 92, width: 166, height: 23 },
        { name: 'Desk Sergeant Name', page: 0, x: 103, y: 56, width: 181, height: 23 },

        { name: 'Mileage Out', page: 0, x: 66, y: 19, width: 32, height: 23 },
        { name: 'Mileage In', page: 0, x: 158, y: 19, width: 49, height: 23 },
        { name: 'Additional Operators', page: 0, x: 314, y: 19, width: 220, height: 23 }
    ],

    // Taurus tiene nombres de campo diferentes
    fields: {
        'shift': { pdfField: 'Shift', type: 'text' },
        'unit': { pdfField: 'Unit', type: 'text' },
        'vehicle_number': { pdfField: 'Vehicle', type: 'text' },
        'operator_name': { pdfField: 'Operator Name', type: 'text' },
        'supervisor_name': { pdfField: 'Patrol Supervisor Name', type: 'text' },
        'date': { pdfField: 'Date', type: 'text' },
        'desk_sergeant_name': { pdfField: 'Desk Sergeant Name', type: 'text' },
        'mileage_out': { pdfField: 'Mileage Out', type: 'text' },
        'mileage_in': { pdfField: 'Mileage In', type: 'text' },
        'additional_operators': { pdfField: 'Additional Operators', type: 'text' }
    },
    // Mismos items de inspección
    inspectionItems: pmcsBaseMapping.inspectionItems,
    checkboxStartIndex: 15,
    totalCheckboxes: 60
};

// ============================================
// FUNCIÓN PARA OBTENER MAPPING
// ============================================
function getPDFMapping(templateName) {
    const mappings = {
        'interview': interviewMapping,
        'guardmount': guardMountMapping,
        'patrol': patrolLogMapping,
        'pmcs_explorer': pmcsExplorerMapping,
        'pmcs_taurus': pmcsTaurusMapping,
        'pmcs_durango': pmcsDurangoMapping,
        'pmcs_f150': pmcsF150Mapping,
        'pmcs_custom': pmcsCustomMapping
    };
    
    const mapping = mappings[templateName];
    if (!mapping) {
        console.error(`[PDF Mapping] Mapping not found for: ${templateName}`);
        return null;
    }
    
    return mapping;
}

// ============================================
// FUNCIÓN PARA OBTENER RUTA DEL TEMPLATE
// ============================================
function getTemplatePath(templateName) {
    const mapping = getPDFMapping(templateName);
    if (!mapping) return null;
    return `pdf-templates/${mapping.templateFile}`;
}

// ============================================
// VALIDACIÓN DE MAPPING
// ============================================
function validateMapping(templateName, formData) {
    const mapping = getPDFMapping(templateName);
    if (!mapping) {
        return { valid: false, errors: ['Mapping not found'], warnings: [] };
    }

    const errors = [];
    const warnings = [];
    const mappedFields = Object.keys(mapping.fields || {});
    const formDataKeys = typeof formData.keys === 'function' ? Array.from(formData.keys()) : Object.keys(formData);
    
    // Verificar campos del formulario que no están en el mapping
    for (const key of formDataKeys) {
        if (!mappedFields.includes(key) && !key.startsWith('_') && !key.includes('_before') && !key.includes('_after') && !key.includes('_remark')) {
            warnings.push(`Field '${key}' in form but not in mapping`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        mapping
    };
}

// Exportar funciones
window.PDF_MAPPINGS = {
    interview: interviewMapping,
    guardmount: guardMountMapping,
    patrol: patrolLogMapping,
    pmcsExplorer: pmcsExplorerMapping,
    pmcsTaurus: pmcsTaurusMapping,
    pmcsDurango: pmcsDurangoMapping,
    pmcsF150: pmcsF150Mapping,
    pmcsCustom: pmcsCustomMapping
};

window.getPDFMapping = getPDFMapping;
window.getTemplatePath = getTemplatePath;
window.validateMapping = validateMapping;
