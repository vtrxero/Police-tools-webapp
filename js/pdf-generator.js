/**
 * PDF GENERATOR - Police Tools App
 * Sistema robusto de generación de PDFs con mapeo EXACTO de AcroForms
 * Versión 6.0 - Basado en inspección real de campos PDF
 */

class PDFGenerator {
    constructor() {
        this.PDFLib = window.PDFLib;
        this.loading = false;
        this.debugMode = true;
        this.fieldCache = {};
    }

    // ============================================
    // DEBUG SYSTEM
    // ============================================
    debug(stage, data) {
        if (!this.debugMode) return;
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const colors = {
            INPUT: '#3b82f6',
            STATE: '#10b981',
            PAYLOAD: '#f59e0b',
            MAPPING: '#8b5cf6',
            PDF_WRITE: '#ef4444',
            ERROR: '#dc2626',
            WARN: '#f97316',
            SUCCESS: '#22c55e'
        };
        
        const color = colors[stage] || '#6b7280';
        console.log(`%c[${timestamp}] [${stage}]`, `color: ${color}; font-weight: bold;`, data);
    }

    // ============================================
    // PDF LOADING
    // ============================================
    async loadTemplate(templatePath) {
        try {
            this.debug('INPUT', { action: 'Loading template', path: templatePath });
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const pdfDoc = await this.PDFLib.PDFDocument.load(arrayBuffer);
            this.debug('SUCCESS', { action: 'Template loaded', path: templatePath });
            return pdfDoc;
        } catch (error) {
            this.debug('ERROR', { action: 'Failed to load template', error: error.message });
            throw error;
        }
    }

    // ============================================
    // FIELD ACCESS HELPERS
    // ============================================
    getFieldValue(payload, fieldName) {
        if (!payload) return '';
        if (payload.get && typeof payload.get === 'function') {
            const value = payload.get(fieldName);
            return value !== null && value !== undefined ? value.toString().trim() : '';
        }
        const value = payload[fieldName];
        return value !== null && value !== undefined ? value.toString().trim() : '';
    }

    // ============================================
    // FIELD FILLING METHODS
    // ============================================
    fillTextField(form, fieldName, value, options = {}) {
        if (!fieldName) return false;
        try {
            const field = form.getTextField(fieldName);
            if (field) {
                // Set the field value
                field.setText(value || '');
                
                // Set font size if specified (for Guard Mount table fields)
                if (options.fontSize) {
                    try {
                        field.setFontSize(options.fontSize);
                    } catch (e) {
                        // Font size setting may not be supported for all fields
                    }
                }
                
                // Force appearance update - critical for X marks to be visible
                if (options.updateAppearances !== false) {
                    try { 
                        field.updateAppearances();
                    } catch (e) {
                        // If updateAppearances fails, try alternative approach
                        try {
                            const widget = field.acroField.getWidgets()[0];
                            if (widget) {
                                // Ensure the field has a visible appearance
                                widget.setAppearanceState(this.PDFLib.PDFName.of('Yes'));
                            }
                        } catch (e2) {}
                    }
                }
                
                // Handle duplicate widgets - update ALL widgets for this field
                // Some PDF templates have duplicate widgets for the same field name
                try {
                    const widgets = field.acroField.getWidgets();
                    if (widgets && widgets.length > 1) {
                        for (let i = 1; i < widgets.length; i++) {
                            try {
                                widgets[i].setAppearanceState(this.PDFLib.PDFName.of('Yes'));
                            } catch (widgetError) {}
                        }
                        if (options.debug) {
                            this.debug('PDF_WRITE', { type: 'text', field: fieldName, widgetsUpdated: widgets.length, status: 'duplicate_widgets_handled' });
                        }
                    }
                } catch (e3) {}
                
                if (options.debug) {
                    this.debug('PDF_WRITE', { type: 'text', field: fieldName, value: value || '(empty)', status: 'success' });
                }
                return true;
            }
        } catch (e) {
            if (options.debug) {
                this.debug('PDF_WRITE', { type: 'text', field: fieldName, status: 'not_found', error: e.message });
            }
        }
        return false;
    }

    fillCheckbox(form, fieldName, checked, options = {}) {
        if (!fieldName) return false;
        try {
            const field = form.getCheckBox(fieldName);
            if (field) {
                if (checked) field.check();
                else field.uncheck();
                if (options.updateAppearances !== false) {
                    try { field.updateAppearances(); } catch (e) {}
                }
                if (options.debug) {
                    this.debug('PDF_WRITE', { type: 'checkbox', field: fieldName, checked, status: 'success' });
                }
                return true;
            }
        } catch (e) {
            if (options.debug) {
                this.debug('PDF_WRITE', { type: 'checkbox', field: fieldName, status: 'not_found' });
            }
        }
        return false;
    }

    fillCheckboxByIndex(form, checkboxIndex, checked, options = {}) {
        try {
            const allFields = form.getFields();
            // instanceof y no constructor.name: el bundle minificado de pdf-lib
            // renombra las clases, asi que comparar el nombre nunca acierta.
            const checkboxFields = allFields.filter(f => f instanceof this.PDFLib.PDFCheckBox);
            const field = checkboxFields[checkboxIndex];
            
            if (field) {
                if (checked) field.check();
                else field.uncheck();
                if (options.updateAppearances !== false) {
                    try { field.updateAppearances(); } catch (e) {}
                }
                if (options.debug) {
                    this.debug('PDF_WRITE', { type: 'checkbox', index: checkboxIndex, checked, status: 'success' });
                }
                return true;
            }
        } catch (e) {
            if (options.debug) {
                this.debug('PDF_WRITE', { type: 'checkbox', index: checkboxIndex, status: 'error', error: e.message });
            }
        }
        return false;
    }

    /**
     * Force draw text on PDF page for fields with duplicate widgets
     * This is a more aggressive approach that draws directly on the page
     */
    forceDrawXOnField(pdfDoc, form, fieldName, options = {}) {
        try {
            const field = form.getTextField(fieldName);
            if (!field) return false;
            
            const widgets = field.acroField.getWidgets();
            if (!widgets || widgets.length === 0) return false;
            
            // Get the page from the first widget
            const widget = widgets[0];
            const pageRef = widget.P();
            if (!pageRef) return false;
            
            const page = pdfDoc.getPages().find(p => p.ref === pageRef || p.ref.tag === pageRef.tag);
            if (!page) return false;
            
            // Get widget rectangle for positioning
            const rect = widget.getRectangle();
            const x = rect.x + rect.width / 2 - 5; // Center X horizontally
            const y = rect.y + rect.height / 2 - 4; // Center X vertically
            
            // Draw the X on the page
            page.drawText('X', {
                x: x,
                y: y,
                size: options.fontSize || 12,
                color: this.PDFLib.rgb(0, 0, 0),
            });
            
            if (options.debug) {
                this.debug('PDF_WRITE', { type: 'force_draw', field: fieldName, position: { x, y }, status: 'success' });
            }
            
            return true;
        } catch (e) {
            if (options.debug) {
                this.debug('PDF_WRITE', { type: 'force_draw', field: fieldName, status: 'error', error: e.message });
            }
            return false;
        }
    }

    /**
     * Alternative method to fill text field using AcroForm direct manipulation
     * Useful for fields with complex appearance streams
     */
    fillTextFieldDirect(pdfDoc, form, fieldName, value, options = {}) {
        try {
            const field = form.getTextField(fieldName);
            if (!field) return false;
            
            // Set the value
            field.setText(value || '');
            
            // Get the underlying AcroForm field
            const acroField = field.acroField;
            
            // Try to clear any existing appearance stream that might conflict
            try {
                const dict = acroField.dict;
                if (dict && dict.has(this.PDFLib.PDFName.of('AP'))) {
                    // Remove the AP entry to force regeneration
                    dict.delete(this.PDFLib.PDFName.of('AP'));
                }
            } catch (e) {}
            
            // Update appearances after clearing
            try {
                field.updateAppearances();
            } catch (e) {}
            
            if (options.debug) {
                this.debug('PDF_WRITE', { type: 'text_direct', field: fieldName, value: value || '(empty)', status: 'success' });
            }
            
            return true;
        } catch (e) {
            if (options.debug) {
                this.debug('PDF_WRITE', { type: 'text_direct', field: fieldName, status: 'error', error: e.message });
            }
            return false;
        }
        return false;
    }

    // ============================================
    // TEMPLATE GENERATORS
    // ============================================
    async generateInterview(formData) {
        this.debug('INPUT', { template: 'interview', formData });
        const mapping = getPDFMapping('interview');
        const templatePath = getTemplatePath('interview');
        
        const pdfDoc = await this.loadTemplate(templatePath);
        const form = pdfDoc.getForm();
        
        let filledCount = 0;
        let missingFields = [];
        
        // Process each mapping entry
        for (const [uiKey, fieldMapping] of Object.entries(mapping.fields)) {
            const value = this.getFieldValue(formData, uiKey);
            
            if (value && value !== '') {
                const success = this.fillTextField(form, fieldMapping.pdfField, value, { debug: true });
                if (success) filledCount++;
                else missingFields.push(fieldMapping.pdfField);
            }
        }
        
        // Update all appearances
        try {
            form.updateFieldAppearances();
        } catch (e) {}
        
        await this.estamparFirmas(pdfDoc, mapping);

        this.debug('SUCCESS', { 
            template: 'interview', 
            filled: filledCount, 
            total: Object.keys(mapping.fields).length,
            missing: missingFields.slice(0, 5)
        });
        
        return pdfDoc;
    }

    async generateGuardmount(formData, personnelData) {
        this.debug('INPUT', { template: 'guardmount', formData, personnelCount: personnelData?.length });
        const mapping = getPDFMapping('guardmount');
        const templatePath = getTemplatePath('guardmount');
        
        const pdfDoc = await this.loadTemplate(templatePath);
        const form = pdfDoc.getForm();
        
        let filledCount = 0;
        
        // Fill basic fields with reduced font size for header fields
        const headerFieldsLarge = ['GUARDMOUNT CONDUCTED INSPECTION', 'INSPECTION CONDUCTED AT', 'HOURS', 'TRAINER'];
        
        for (const [uiKey, fieldMapping] of Object.entries(mapping.fields)) {
            const value = this.getFieldValue(formData, uiKey);
            if (value && value !== '' && fieldMapping.pdfField) {
                // Use smaller font size (9pt) for header fields that tend to be too large
                const isLargeField = headerFieldsLarge.some(lf => fieldMapping.pdfField.includes(lf));
                const fontSize = isLargeField ? 9 : undefined;
                const success = this.fillTextField(form, fieldMapping.pdfField, value, { debug: true, fontSize });
                if (success) filledCount++;
            }
        }
        
        // Fill personnel table
        if (personnelData && personnelData.length > 0) {
            const tableMapping = mapping.personnelTable;
            const maxRows = Math.min(personnelData.length, tableMapping.maxRows);
            
            this.debug('INPUT', { action: 'Filling personnel rows', count: maxRows });
            
            for (let i = 0; i < maxRows; i++) {
                const person = personnelData[i];
                const rowNum = i + 1;
                
                for (const [key, fieldPrefix] of Object.entries(tableMapping.fields)) {
                    const pdfFieldName = `${fieldPrefix}${rowNum}`;
                    const value = person[key] || '';
                    if (value && value !== '') {
                        // Use smaller font size (8pt) for personnel table fields
                        const success = this.fillTextField(form, pdfFieldName, value, { debug: false, fontSize: 8 });
                        if (success) {
                            this.debug('PDF_WRITE', { row: rowNum, field: key, pdfField: pdfFieldName, value });
                        }
                    }
                }
            }
        }
        
        // Update appearances
        try {
            form.updateFieldAppearances();
        } catch (e) {}
        
        await this.estamparFirmas(pdfDoc, mapping);

        this.debug('SUCCESS', { template: 'guardmount', filled: filledCount });
        return pdfDoc;
    }

    /**
     * Comprueba si una plantilla existe sin descargarla entera.
     * Algunos servidores estaticos no soportan HEAD, asi que se cae a un GET
     * con Range para no traer megabytes solo para saber si esta.
     */
    async templateExists(templatePath) {
        if (this._templateExistsCache && templatePath in this._templateExistsCache) {
            return this._templateExistsCache[templatePath];
        }
        this._templateExistsCache = this._templateExistsCache || {};

        let exists = false;
        try {
            const res = await fetch(templatePath, { method: 'HEAD' });
            exists = res.ok;
            if (res.status === 405 || res.status === 501) {
                const res2 = await fetch(templatePath, { headers: { Range: 'bytes=0-0' } });
                exists = res2.ok || res2.status === 206;
            }
        } catch (e) {
            exists = false;
        }

        this._templateExistsCache[templatePath] = exists;
        return exists;
    }

    async generatePatrol(formData, missionData) {
        this.debug('INPUT', { template: 'patrol', formData, missionCount: missionData?.length });
        const mapping = getPDFMapping('patrol');
        const templatePath = getTemplatePath('patrol');

        // Sin plantilla no se genera nada: el documento tiene que salir del
        // formulario oficial, no de una reconstruccion aproximada.
        if (!(await this.templateExists(templatePath))) {
            this.debug('ERROR', { action: 'Plantilla ausente', path: templatePath });
            throw new Error(
                `Falta la plantilla ${templatePath}. ` +
                'Colocala en pdf-templates/ para poder generar el Patrol Log.'
            );
        }

        const pdfDoc = await this.loadTemplate(templatePath);
        const form = pdfDoc.getForm();
        
        let filledCount = 0;
        
        // Fill checkboxes
        for (const [uiKey, fieldMapping] of Object.entries(mapping.fields)) {
            if (fieldMapping.type === 'checkbox') {
                const value = this.getFieldValue(formData, uiKey);
                const checked = value === 'on' || value === true || value === 'true';
                const success = this.fillCheckbox(form, fieldMapping.pdfField, checked, { debug: true });
                if (success) filledCount++;
            }
        }
        
        // Fill text fields
        // "Vehicle:" y "Radio No.:" tienen ahora cada uno su propio campo,
        // asi que ya no hay que combinarlos: van por el bucle general.
        for (const [uiKey, fieldMapping] of Object.entries(mapping.fields)) {
            if (fieldMapping.type === 'text' && fieldMapping.pdfField) {
                const value = this.getFieldValue(formData, uiKey);
                if (value && value !== '') {
                    const success = this.fillTextField(form, fieldMapping.pdfField, value, { debug: true });
                    if (success) filledCount++;
                }
            }
        }
        
        // Fill missions
        if (missionData && missionData.length > 0) {
            // Antes de mapear filas hay que deshacer los campos que la
            // plantilla reutiliza en dos filas distintas
            this.separarCamposCompartidos(pdfDoc);
            const filas = this.buildPatrolRows(pdfDoc);
            const maxRows = Math.min(missionData.length, filas.length);
            const sinSitio = { out: 0, desc: 0, remark: 0 };

            for (let i = 0; i < maxRows; i++) {
                const mission = missionData[i];
                const fila = filas[i];
                if (!fila) break;

                if (mission.time_in && fila.in) {
                    this.escribirEnCampo(fila.in, mission.time_in);
                    filledCount++;
                }

                if (mission.time_out) {
                    if (fila.out) { this.escribirEnCampo(fila.out, mission.time_out); filledCount++; }
                    else sinSitio.out++;
                }

                if (mission.description) {
                    if (fila.desc) { this.escribirEnCampo(fila.desc, mission.description); filledCount++; }
                    else sinSitio.desc++;
                }

                if (mission.remarks) {
                    if (fila.remark) { this.escribirEnCampo(fila.remark, mission.remarks); filledCount++; }
                    else sinSitio.remark++;
                }
            }

            // La hoja de continuacion no tiene columna de observaciones ni de
            // salida en todas sus filas: si se pierde algun dato hay que
            // decirlo, no dejarlo caer en silencio como antes.
            if (sinSitio.out || sinSitio.desc || sinSitio.remark) {
                this.debug('WARN', {
                    action: 'Datos de mision sin celda en la plantilla',
                    horasSalidaPerdidas: sinSitio.out,
                    descripcionesPerdidas: sinSitio.desc,
                    observacionesPerdidas: sinSitio.remark
                });
                pdfDoc.__datosSinSitio = sinSitio;
            }

            if (missionData.length > filas.length) {
                this.debug('WARN', {
                    action: 'Mas misiones que filas en el formulario',
                    misiones: missionData.length,
                    filas: filas.length,
                    omitidas: missionData.length - filas.length
                });
                pdfDoc.__misionesOmitidas = missionData.length - filas.length;
            }

            this.debug('SUCCESS', {
                action: 'Tabla de misiones rellenada',
                misiones: maxRows,
                filasDisponibles: filas.length
            });
        }
        
        // Update appearances
        try {
            form.updateFieldAppearances();
        } catch (e) {}
        
        await this.estamparFirmas(pdfDoc, mapping);

        this.debug('SUCCESS', { template: 'patrol', filled: filledCount });
        return pdfDoc;
    }

    async generatePMCS(formData, vehicleType) {
        this.debug('INPUT', { template: `pmcs_${vehicleType}`, formData });
        const mappingKey = `pmcs_${vehicleType}`;
        const mapping = getPDFMapping(mappingKey);
        const templatePath = getTemplatePath(mappingKey);
        
        if (!mapping) {
            throw new Error(`Mapping not found for: ${vehicleType}`);
        }
        
        const pdfDoc = await this.loadTemplate(templatePath);
        const form = pdfDoc.getForm();

        this.debug('INPUT', { templateFile: mapping.templateFile });

        // El Taurus solo define "Shift" en la cabecera: sin esto, el resto de
        // los datos de la pagina 1 no tendrian donde escribirse.
        this.crearCamposAusentes(pdfDoc, mapping);

        let filledCount = 0;
        let xMarkCount = 0;
        
        // ============================================
        // PÁGINA 1 - CAMPOS DE CABECERA
        // ============================================
        const headerFields = [
            'shift', 'unit', 'date', 'vehicle_number', 'operator_name',
            'supervisor_name', 'desk_sergeant_name', 'mileage_out', 
            'mileage_in', 'additional_operators', 'remarks'
        ];
        
        for (const fieldKey of headerFields) {
            const fieldMapping = mapping.fields[fieldKey];
            if (fieldMapping && fieldMapping.pdfField) {
                const value = this.getFieldValue(formData, fieldKey);
                if (value && value !== '') {
                    const success = this.fillTextField(form, fieldMapping.pdfField, value, { debug: true });
                    if (success) filledCount++;
                }
            }
        }
        
        // ============================================
        // PÁGINA 2 - REJILLA DE INSPECCION
        //
        // Las plantillas PMCS no nombran estos campos de forma semantica:
        // en el PDF real se llaman "checkbox_27pmos", "text_86wdvw", etc.
        // Por eso el mapeo por nombre ('BEFOREa Engine Oil'...) nunca
        // encontraba ningun campo y las marcas X no se escribian.
        //
        // Se localiza cada fila por su posicion en la pagina: una fila de la
        // rejilla son dos casillas (BEFORE, AFTER) y un campo de texto
        // (REMARK) a la misma altura. Asi funciona con las cinco plantillas
        // aunque los nombres internos cambien.
        // ============================================
        const grid = this.buildPMCSGrid(pdfDoc);

        // Orden de las filas tal como aparecen impresas en la pagina 2.
        // Ojo: "p. Vehicle GSA Fuel card" no tiene casillas en el formulario
        // (dice "On file / At the desk"), por eso fuel_card no esta en la lista.
        const ordenRejilla = [
            // CHECK THE BELOW ITEMS WITH THE ENGINE OFF (a - o)
            'engine_oil', 'fluids', 'radiator', 'belt', 'tire', 'jack',
            'mirrors', 'cleanliness', 'body', 'dispatch', 'tint',
            'extinguisher', 'plates', 'wheel_cover', 'roof_rack',
            // OPERATIONAL SYSTEM CHECK (a - i)
            'starting', 'transmission', 'lights', 'emergency',
            'brakes', 'ac', 'eyewitness', 'radar', 'siren',
            // ADDITIONAL EQUIPMENT (1, 2, a, b, 3, 4)
            'eyewitness_mic', 'radar_tuning_fork', 'radar_25_serial',
            'radar_40_serial', 'weapon_rack_key', 'equipment_manuals'
        ];

        // Los de equipo adicional son un solo campo de texto en la UI:
        // si tiene valor, se marca la casilla y el valor va al REMARK.
        const equipoAdicional = new Set([
            'eyewitness_mic', 'radar_tuning_fork', 'radar_25_serial',
            'radar_40_serial', 'weapon_rack_key', 'equipment_manuals'
        ]);

        if (grid.length !== ordenRejilla.length) {
            this.debug('WARN', {
                action: 'La rejilla detectada no coincide con la esperada',
                detectadas: grid.length,
                esperadas: ordenRejilla.length,
                nota: 'se rellenan las filas que coincidan por posicion'
            });
        }

        const marcado = (v) => v === 'on' || v === true || v === 'true' || v === 'X' || v === 'x';

        ordenRejilla.forEach((clave, i) => {
            const fila = grid[i];
            if (!fila) return;

            if (equipoAdicional.has(clave)) {
                const valor = this.getFieldValue(formData, clave);
                if (valor && valor.trim() !== '') {
                    if (this.marcarCasilla(fila.before, true)) xMarkCount++;
                    if (fila.remark) {
                        this.escribirEnCampo(fila.remark, valor);
                        filledCount++;
                    }
                }
                return;
            }

            // Elementos normales: columnas BEFORE / AFTER + observacion
            if (marcado(this.getFieldValue(formData, `${clave}_before`))) {
                if (this.marcarCasilla(fila.before, true)) xMarkCount++;
            }
            if (marcado(this.getFieldValue(formData, `${clave}_after`))) {
                if (this.marcarCasilla(fila.after, true)) xMarkCount++;
            }

            const obs = this.getFieldValue(formData, `${clave}_remark`);
            if (obs && obs.trim() !== '' && fila.remark) {
                this.escribirEnCampo(fila.remark, obs);
                filledCount++;
            }
        });

        // "p. Vehicle GSA Fuel card" no tiene casilla propia: si el oficial lo
        // marco, se deja constancia en REMARKS en vez de perder el dato.
        const fuelCardMarcado =
            marcado(this.getFieldValue(formData, 'fuel_card_before')) ||
            marcado(this.getFieldValue(formData, 'fuel_card_after'));
        if (fuelCardMarcado) {
            const notaFuel = 'GSA Fuel card: checked';
            const remarksMapping = mapping.fields.remarks;
            if (remarksMapping && remarksMapping.pdfField) {
                const actual = this.getFieldValue(formData, 'remarks');
                const combinado = actual ? `${actual} | ${notaFuel}` : notaFuel;
                this.fillTextField(form, remarksMapping.pdfField, combinado, { debug: true });
            }
            this.debug('WARN', {
                action: 'fuel_card no tiene casilla en la plantilla, anotado en REMARKS'
            });
        }

        // Update appearances - critical for X marks to be visible
        try {
            form.updateFieldAppearances();
            this.debug('STATE', { action: 'Field appearances updated' });
        } catch (e) {
            this.debug('WARN', { action: 'Could not update field appearances', error: e.message });
        }
        
        // Marca informativa del tipo de documento (ya no se aplana)
        pdfDoc.__isPMCS = true;
        
        await this.estamparFirmas(pdfDoc, mapping);
        await this.anexarFotos(pdfDoc);

        this.debug('SUCCESS', { 
            template: mappingKey, 
            textFieldsFilled: filledCount,
            xMarksWritten: xMarkCount
        });
        
        return pdfDoc;
    }

    // ============================================
    // TABLA DE MISIONES DEL PATROL LOG POR GEOMETRIA
    // ============================================
    /**
     * Localiza las filas de la tabla de misiones por su posicion.
     *
     * La numeracion de patrol_log.pdf no es coherente entre paginas:
     *   - Pagina 1: filas 1-26 completas (IN, OUT, DESCRIPTION, REMARKS).
     *   - Pagina 2: INRow27..65, pero la descripcion va desfasada un numero
     *     (la fila de INRow27 lleva "...WhyRow26") hasta que la ausencia de
     *     "...WhyRow42" reajusta la cuenta.
     *   - OUTRow solo llega a 39, y esos campos estan en las filas finales.
     *   - REMARKS solo existe en la pagina 1.
     *
     * Rellenar por numero, como se hacia antes, mandaba la hora de salida de
     * la mision 27 a 26 filas mas abajo y descartaba sus observaciones en
     * silencio. Agrupando por altura cada dato cae en su fila impresa.
     */
    /**
     * Separa los campos que aparecen impresos en dos filas distintas.
     *
     * En patrol_log.pdf, "MISSION DESCRIPTION...Row26" tiene dos widgets: uno
     * en la ultima fila de la pagina 1 y otro en la primera de la pagina 2.
     * Al ser un unico campo del AcroForm, ambas filas muestran siempre el
     * mismo texto, y la descripcion de una de las dos misiones se perdia.
     *
     * Se sustituye por un campo independiente en cada posicion, conservando
     * el nombre original en el primero para no romper nada que lo busque.
     */
    separarCamposCompartidos(pdfDoc) {
        const { PDFTextField } = this.PDFLib;
        const form = pdfDoc.getForm();
        const paginas = pdfDoc.getPages();

        const compartidos = [];
        for (const field of form.getFields()) {
            if (!(field instanceof PDFTextField)) continue;
            let ws = [];
            try { ws = field.acroField.getWidgets(); } catch (e) { continue; }
            if (ws.length < 2) continue;

            const posiciones = [];
            for (const w of ws) {
                try {
                    const r = w.getRectangle();
                    posiciones.push({ pagina: paginas.findIndex(p => p.ref === w.P()), rect: r });
                } catch (e) {}
            }
            if (posiciones.length < 2) continue;

            // El cuerpo de letra se toma de una fila hermana: el campo
            // compartido suele venir en automatico (0 Tf) y quedaria distinto
            // al resto de la columna.
            let fontSize = 14;
            try {
                const hermano = form.getField(field.getName().replace(/(\d+)$/, (m) => String(+m - 1)));
                const da = String(hermano.acroField.dict.get(this.PDFLib.PDFName.of('DA')) || '');
                const m = da.match(/([\d.]+)\s+Tf/);
                if (m && +m[1] > 0) fontSize = +m[1];
            } catch (e) {}

            compartidos.push({ nombre: field.getName(), texto: field.getText() || '', posiciones, fontSize });
        }

        for (const c of compartidos) {
            try {
                form.removeField(form.getField(c.nombre));
            } catch (e) {
                this.debug('WARN', { action: 'No se pudo separar el campo', campo: c.nombre, error: e.message });
                continue;
            }

            c.posiciones.forEach((pos, i) => {
                // El primero conserva el nombre original
                const nombre = i === 0 ? c.nombre : `${c.nombre}_cont${i}`;
                const pagina = pdfDoc.getPage(pos.pagina < 0 ? 0 : pos.pagina);
                try {
                    const nuevo = form.createTextField(nombre);
                    if (i === 0 && c.texto) nuevo.setText(c.texto);
                    nuevo.addToPage(pagina, {
                        x: pos.rect.x,
                        y: pos.rect.y,
                        width: pos.rect.width,
                        height: pos.rect.height,
                        borderWidth: 0
                    });

                    // Mismo cuerpo que el resto de descripciones de la tabla
                    try { nuevo.setFontSize(c.fontSize || 14); } catch (e) {}

                    // addToPage añade /MK (apariencia del marco), que dibuja un
                    // recuadro que las celdas originales no tienen
                    try {
                        for (const w of nuevo.acroField.getWidgets()) {
                            w.dict.delete(this.PDFLib.PDFName.of('MK'));
                        }
                    } catch (e) {}
                } catch (e) {
                    this.debug('WARN', { action: 'No se pudo recrear el campo', campo: nombre, error: e.message });
                }
            });

            this.debug('SUCCESS', {
                action: 'Campo compartido separado en filas independientes',
                campo: c.nombre,
                copias: c.posiciones.length
            });
        }

        return compartidos.length;
    }

    buildPatrolRows(pdfDoc) {
        const { PDFTextField } = this.PDFLib;
        const paginas = pdfDoc.getPages();
        const widgets = [];

        for (const field of pdfDoc.getForm().getFields()) {
            if (!(field instanceof PDFTextField)) continue;
            // _contN son las copias creadas al separar un campo compartido
            if (!/Row\d+(_cont\d+)?$/.test(field.getName())) continue;

            let anotaciones = [];
            try { anotaciones = field.acroField.getWidgets(); } catch (e) { continue; }

            for (const w of anotaciones) {
                try {
                    const r = w.getRectangle();
                    widgets.push({
                        field,
                        nombre: field.getName(),
                        pagina: paginas.findIndex(p => p.ref === w.P()),
                        x: r.x,
                        y: r.y
                    });
                } catch (e) {}
            }
        }

        widgets.sort((a, b) => a.pagina - b.pagina || b.y - a.y || a.x - b.x);

        // 8pt de tolerancia: la separacion entre filas es de ~18pt y algunas
        // celdas de la misma fila estan desalineadas hasta 5pt.
        const filas = [];
        let actual = null;
        for (const w of widgets) {
            if (!actual || w.pagina !== actual.pagina || Math.abs(w.y - actual.y) > 8) {
                actual = { pagina: w.pagina, y: w.y, widgets: [] };
                filas.push(actual);
            }
            actual.widgets.push(w);
        }

        // Un campo compartido por dos filas (mismo AcroField con dos widgets)
        // solo se puede usar una vez: escribirlo dos veces sobreescribiria la
        // fila anterior. Se queda con la primera y la segunda va sin ese dato.
        const yaUsados = new Set();
        const tomar = (fila, prefijo) => {
            const w = fila.widgets.find(v => v.nombre.startsWith(prefijo));
            if (!w) return null;
            if (yaUsados.has(w.nombre)) return null;
            yaUsados.add(w.nombre);
            return w.field;
        };

        const mapeadas = filas.map(fila => ({
            y: fila.y,
            pagina: fila.pagina,
            alto: fila.widgets[0] ? this._altoWidget(fila.widgets[0]) : 16.8,
            in: tomar(fila, 'INRow'),
            out: tomar(fila, 'OUTRow'),
            desc: tomar(fila, 'MISSION'),
            remark: tomar(fila, 'REMARKS')
        }));

        this.completarCeldasFaltantes(pdfDoc, mapeadas, widgets);
        return mapeadas;
    }

    _altoWidget(w) {
        try { return w.field.acroField.getWidgets()[0].getRectangle().height; } catch (e) { return 16.8; }
    }

    /**
     * Crea los campos que la plantilla dibuja pero no define.
     *
     * La hoja de continuacion de patrol_log.pdf imprime las columnas OUT y
     * REMARKS, pero solo trae widgets para algunas: 26 de sus 39 filas no
     * tienen donde escribir la hora de salida y ninguna tiene observaciones.
     * Sin esto, esos datos se descartan aunque el impreso tenga la casilla.
     *
     * La posicion no se inventa: se toma de las columnas ya existentes, que
     * comparten x y ancho en las dos paginas.
     */
    completarCeldasFaltantes(pdfDoc, filas, widgets) {
        const form = pdfDoc.getForm();

        // Geometria de cada columna a partir de los widgets que si existen
        const columna = (prefijo) => {
            const propios = widgets.filter(w => w.nombre.startsWith(prefijo));
            if (!propios.length) return null;

            const moda = (valores) => {
                const cuenta = new Map();
                for (const v of valores) {
                    const k = v.toFixed(1);
                    cuenta.set(k, (cuenta.get(k) || 0) + 1);
                }
                return +[...cuenta.entries()].sort((a, b) => b[1] - a[1])[0][0];
            };

            const rects = propios.map(w => {
                try { return w.field.acroField.getWidgets()[0].getRectangle(); } catch (e) { return null; }
            }).filter(Boolean);
            if (!rects.length) return null;

            return { x: moda(rects.map(r => r.x)), width: moda(rects.map(r => r.width)) };
        };

        const colOut = columna('OUTRow');
        const colRemark = columna('REMARKS');
        if (!colOut && !colRemark) return;

        // Cuerpo de letra de la columna, para que las celdas nuevas no
        // desentonen con las que ya trae la plantilla
        const tamano = (prefijo, porDefecto) => {
            const w = widgets.find(v => v.nombre.startsWith(prefijo));
            if (!w) return porDefecto;
            try {
                const da = String(w.field.acroField.dict.get(this.PDFLib.PDFName.of('DA')) || '');
                const m = da.match(/([\d.]+)\s+Tf/);
                if (m && +m[1] > 0) return +m[1];
            } catch (e) {}
            return porDefecto;
        };

        const tamOut = tamano('OUTRow', 14);
        const tamRemark = tamano('REMARKS', 14);

        let creados = 0;
        const crear = (fila, clave, col, tam, prefijoNombre, indice) => {
            if (fila[clave] || !col) return;
            const pagina = pdfDoc.getPage(fila.pagina < 0 ? 0 : fila.pagina);
            try {
                const campo = form.createTextField(`${prefijoNombre}_auto${indice}`);
                campo.addToPage(pagina, {
                    x: col.x,
                    y: fila.y,
                    width: col.width,
                    height: fila.alto,
                    borderWidth: 0
                });
                try { campo.setFontSize(tam); } catch (e) {}
                // Sin marco: la celda ya esta dibujada en la plantilla
                try {
                    for (const w of campo.acroField.getWidgets()) {
                        w.dict.delete(this.PDFLib.PDFName.of('MK'));
                    }
                } catch (e) {}
                fila[clave] = campo;
                creados++;
            } catch (e) {
                this.debug('WARN', { action: 'No se pudo crear la celda', clave, error: e.message });
            }
        };

        filas.forEach((fila, i) => {
            // Solo filas de la tabla de misiones (las que tienen hora de entrada)
            if (!fila.in) return;
            crear(fila, 'out', colOut, tamOut, 'OUTRow', i + 1);
            crear(fila, 'remark', colRemark, tamRemark, 'REMARKS Disposition', i + 1);
        });

        if (creados) {
            this.debug('SUCCESS', {
                action: 'Celdas ausentes en la plantilla completadas',
                creadas: creados
            });
        }
    }

    // ============================================
    // REJILLA PMCS POR GEOMETRIA
    // ============================================
    /**
     * Localiza las filas de la rejilla de inspeccion por su posicion.
     *
     * Las plantillas PMCS traen nombres autogenerados (checkbox_27pmos,
     * text_86wdvw), asi que no se puede mapear por nombre. Lo que si es
     * estable es la maqueta impresa: cada elemento inspeccionado ocupa una
     * fila con casilla BEFORE, casilla AFTER y un campo REMARK a la derecha.
     *
     * Devuelve las filas en el orden en que se leen en el papel.
     */
    buildPMCSGrid(pdfDoc) {
        const { PDFCheckBox, PDFTextField } = this.PDFLib;
        const paginas = pdfDoc.getPages();
        const widgets = [];

        for (const field of pdfDoc.getForm().getFields()) {
            const tipo = field instanceof PDFCheckBox ? 'cb'
                : (field instanceof PDFTextField ? 'tx' : null);
            if (!tipo) continue;

            let anotaciones = [];
            try { anotaciones = field.acroField.getWidgets(); } catch (e) { continue; }

            for (const w of anotaciones) {
                try {
                    const r = w.getRectangle();
                    const pagina = paginas.findIndex(p => p.ref === w.P());
                    widgets.push({ tipo, field, pagina, x: r.x, y: r.y });
                } catch (e) {}
            }
        }

        // Orden de lectura: pagina, luego de arriba abajo, luego izq. a der.
        widgets.sort((a, b) => a.pagina - b.pagina || b.y - a.y || a.x - b.x);

        // Agrupar en filas: misma altura +-4pt (las casillas no estan
        // perfectamente alineadas con el campo de texto de la misma fila)
        const filas = [];
        let actual = null;
        for (const w of widgets) {
            if (!actual || w.pagina !== actual.pagina || Math.abs(w.y - actual.y) > 4) {
                actual = { pagina: w.pagina, y: w.y, widgets: [] };
                filas.push(actual);
            }
            actual.widgets.push(w);
        }

        // Una fila de la rejilla es exactamente dos casillas + (opcional) texto
        return filas
            .filter(f => f.widgets.filter(w => w.tipo === 'cb').length === 2)
            .map((f) => {
                const casillas = f.widgets.filter(w => w.tipo === 'cb').sort((a, b) => a.x - b.x);
                const textos = f.widgets.filter(w => w.tipo === 'tx').sort((a, b) => a.x - b.x);
                return {
                    before: casillas[0]?.field || null,
                    after: casillas[1]?.field || null,
                    // El REMARK es el campo de texto mas a la derecha de la fila
                    remark: textos.length ? textos[textos.length - 1].field : null
                };
            });
    }

    /**
     * Crea los campos que el mapeo declara como ausentes en la plantilla.
     *
     * Algunas plantillas imprimen un recuadro pero no definen el campo de
     * formulario correspondiente, asi que el dato se descartaba en silencio.
     * Las posiciones vienen de `mapping.missingFields`, medidas sobre la
     * propia plantilla (ver el comentario en pdf-mappings.js).
     */
    crearCamposAusentes(pdfDoc, mapping) {
        if (!mapping || !Array.isArray(mapping.missingFields)) return 0;

        const form = pdfDoc.getForm();
        const existentes = new Set(form.getFields().map(f => f.getName()));
        let creados = 0;

        for (const def of mapping.missingFields) {
            if (existentes.has(def.name)) continue;

            const pagina = pdfDoc.getPage(def.page || 0);
            if (!pagina) continue;

            try {
                const campo = form.createTextField(def.name);
                campo.addToPage(pagina, {
                    x: def.x,
                    y: def.y,
                    width: def.width,
                    height: def.height,
                    borderWidth: 0
                });
                try { campo.setFontSize(def.fontSize || 10); } catch (e) {}

                // Sin marco: el recuadro ya esta impreso en la plantilla
                try {
                    for (const w of campo.acroField.getWidgets()) {
                        w.dict.delete(this.PDFLib.PDFName.of('MK'));
                    }
                } catch (e) {}

                creados++;
            } catch (e) {
                this.debug('WARN', {
                    action: 'No se pudo crear el campo ausente',
                    campo: def.name,
                    error: e.message
                });
            }
        }

        if (creados) {
            this.debug('SUCCESS', {
                action: 'Campos ausentes en la plantilla creados',
                plantilla: mapping.templateFile,
                creados
            });
        }

        return creados;
    }

    /** Marca una casilla real del AcroForm. */
    marcarCasilla(campo, marcado) {
        if (!campo) return false;
        try {
            if (marcado) campo.check();
            else campo.uncheck();
            try { campo.updateAppearances(); } catch (e) {}
            return true;
        } catch (e) {
            this.debug('WARN', { action: 'No se pudo marcar la casilla', error: e.message });
            return false;
        }
    }

    /** Escribe texto en un campo ya resuelto (sin buscarlo por nombre). */
    escribirEnCampo(campo, valor) {
        if (!campo) return false;
        try {
            campo.setText(String(valor));
            try { campo.updateAppearances(); } catch (e) {}
            return true;
        } catch (e) {
            this.debug('WARN', { action: 'No se pudo escribir en el campo', error: e.message });
            return false;
        }
    }

    // ============================================
    // FOTOS ADJUNTAS
    // ============================================
    /**
     * Añade las fotos de daños como paginas extra al final del PDF.
     *
     * El formulario pide anotar daños, rayones y niveles, pero solo tiene una
     * linea de texto. Una foto fechada deja constancia de que el daño ya
     * estaba antes del turno.
     */
    async anexarFotos(pdfDoc) {
        const fotos = window.PoliceToolsPhotos?.fotos.todas() || [];
        if (!fotos.length) return 0;

        const { StandardFonts, rgb } = this.PDFLib;
        const fuente = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const negrita = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const ANCHO = 612, ALTO = 792;   // Letter vertical
        const MARGEN = 36;
        let puestas = 0;

        // Dos fotos por pagina
        for (let i = 0; i < fotos.length; i += 2) {
            const pagina = pdfDoc.addPage([ANCHO, ALTO]);

            pagina.drawText('DAMAGE / CONDITION PHOTOS', {
                x: MARGEN, y: ALTO - MARGEN - 4, size: 13, font: negrita, color: rgb(0, 0, 0)
            });
            pagina.drawLine({
                start: { x: MARGEN, y: ALTO - MARGEN - 14 },
                end: { x: ANCHO - MARGEN, y: ALTO - MARGEN - 14 },
                thickness: 1, color: rgb(0.4, 0.4, 0.4)
            });

            const huecoAlto = (ALTO - MARGEN * 2 - 40) / 2;

            for (let j = 0; j < 2; j++) {
                const foto = fotos[i + j];
                if (!foto) break;

                try {
                    const img = await pdfDoc.embedJpg(foto.dataUrl);

                    const cajaW = ANCHO - MARGEN * 2;
                    const cajaH = huecoAlto - 26;
                    const escala = Math.min(cajaW / img.width, cajaH / img.height);
                    const w = img.width * escala;
                    const h = img.height * escala;

                    const topeY = ALTO - MARGEN - 34 - j * huecoAlto;

                    pagina.drawImage(img, {
                        x: MARGEN + (cajaW - w) / 2,
                        y: topeY - h,
                        width: w,
                        height: h
                    });

                    const fecha = foto.fecha ? new Date(foto.fecha).toLocaleString() : '';
                    pagina.drawText(`Photo ${i + j + 1} of ${fotos.length}${fecha ? '  ·  ' + fecha : ''}`, {
                        x: MARGEN, y: topeY - h - 13, size: 8, font: fuente, color: rgb(0.35, 0.35, 0.35)
                    });

                    puestas++;
                } catch (e) {
                    this.debug('WARN', { action: 'No se pudo incrustar la foto', i: i + j, error: e.message });
                }
            }
        }

        if (puestas) this.debug('SUCCESS', { action: 'Fotos anexadas', total: puestas });
        return puestas;
    }

    // ============================================
    // FIRMAS
    // ============================================
    /**
     * Estampa las firmas dibujadas a mano sobre sus lineas del formulario.
     *
     * Antes la firma era texto tecleado, asi que el documento salia completo
     * pero sin firmar y habia que imprimirlo para firmarlo.
     *
     * Cuando el PDF tiene un campo para esa firma se usa su propio rectangulo
     * y el campo se vacia, para que el trazo no quede encima del nombre. Si
     * no lo tiene (las plantillas PMCS solo imprimen la linea), la posicion
     * sale de mapping.signatureBoxes.
     */
    async estamparFirmas(pdfDoc, mapping) {
        const firmas = window.PoliceToolsSignature?.almacen.todas() || {};
        if (!Object.keys(firmas).length) return 0;

        const form = pdfDoc.getForm();
        const paginas = pdfDoc.getPages();
        let puestas = 0;

        for (const [clave, dataUrl] of Object.entries(firmas)) {
            if (!dataUrl) continue;

            // Donde va: campo del AcroForm o caja declarada en el mapeo
            let destino = null;

            const mapeo = mapping?.fields?.[clave];
            if (mapeo && mapeo.pdfField) {
                try {
                    const campo = form.getTextField(mapeo.pdfField);
                    const w = campo.acroField.getWidgets()[0];
                    const r = w.getRectangle();
                    const pagina = paginas.findIndex(p => p.ref === w.P());

                    // El nombre tecleado estorbaria bajo el trazo
                    campo.setText('');

                    destino = { pagina: pagina < 0 ? 0 : pagina, ...r };
                } catch (e) {
                    destino = null;
                }
            }

            if (!destino && mapping?.signatureBoxes?.[clave]) {
                const c = mapping.signatureBoxes[clave];
                destino = { pagina: c.page || 0, x: c.x, y: c.y, width: c.width, height: c.height };
            }

            if (!destino) continue;

            try {
                const png = await pdfDoc.embedPng(dataUrl);

                // Los campos de firma son lineas muy bajas (unos 12 pt). Si la
                // imagen se encajara dentro, la firma saldria diminuta.
                // Una firma de verdad se apoya en la linea y sobresale por
                // encima, asi que se permite hasta 1.8 veces el alto del campo
                // y se ancla en la base.
                const cajaW = destino.width - 6;
                const cajaH = destino.height * 1.8;

                const escala = Math.min(cajaW / png.width, cajaH / png.height);
                const ancho = png.width * escala;
                const alto = png.height * escala;

                paginas[destino.pagina].drawImage(png, {
                    x: destino.x + (destino.width - ancho) / 2,
                    // Ligeramente por debajo del borde inferior, como al firmar
                    // cruzando la linea
                    y: destino.y - alto * 0.12,
                    width: ancho,
                    height: alto
                });

                puestas++;
                this.debug('PDF_WRITE', { type: 'signature', campo: clave });
            } catch (e) {
                this.debug('WARN', { action: 'No se pudo estampar la firma', campo: clave, error: e.message });
            }
        }

        if (puestas) this.debug('SUCCESS', { action: 'Firmas estampadas', total: puestas });
        return puestas;
    }

    // ============================================
    // FILLABILITY
    // ============================================
    /**
     * Deja el PDF rellenable y con los valores visibles.
     *
     * El problema original: en las plantillas PMCS las marcas "X" no se veian,
     * y se resolvia con form.flatten(). Aplanar convierte los campos en tinta
     * fija: el PDF deja de ser un formulario y el oficial ya no puede corregir
     * nada en el visor.
     *
     * La alternativa correcta es generar las apariencias (/AP) con pdf-lib y
     * dejar los campos intactos: los valores se ven y siguen siendo editables.
     *
     * No se marca NeedAppearances. Esa bandera le dice al visor que ignore las
     * apariencias del archivo y las reconstruya el mismo, y al hacerlo coloca
     * mal el texto de los campos que la app crea (se veia el valor de un campo
     * encima del de al lado). Con las /AP ya generadas no hace ninguna falta.
     */
    /**
     * Deja /Helv y /ZaDb declaradas en el /DR del AcroForm y devuelve Helv.
     *
     * El /DR es el catalogo de recursos del formulario: lo que un campo puede
     * nombrar en su /DA. Una fuente que no este ahi es una referencia rota,
     * aunque el nombre suene a fuente conocida.
     *
     * embedStandardFont y no embedFont: la version sincrona, porque
     * ensureFillable se llama desde sitios que no esperan una promesa. Las
     * catorce fuentes estandar del PDF no necesitan incrustar nada.
     */
    declararFuentes(pdfDoc) {
        const { PDFName, PDFDict, PDFString, StandardFonts } = this.PDFLib;

        try {
            const acroForm = pdfDoc.catalog.lookup(PDFName.of('AcroForm'), PDFDict);
            if (!acroForm) return null;

            let dr = acroForm.lookup(PDFName.of('DR'), PDFDict);
            if (!dr) {
                dr = pdfDoc.context.obj({});
                acroForm.set(PDFName.of('DR'), dr);
            }

            let drFont = dr.lookup(PDFName.of('Font'), PDFDict);
            if (!drFont) {
                drFont = pdfDoc.context.obj({});
                dr.set(PDFName.of('Font'), drFont);
            }

            const helv = pdfDoc.embedStandardFont(StandardFonts.Helvetica);
            const zadb = pdfDoc.embedStandardFont(StandardFonts.ZapfDingbats);

            drFont.set(PDFName.of('Helv'), helv.ref);
            drFont.set(PDFName.of('ZaDb'), zadb.ref);

            // El /DA del formulario es el que heredan los campos que no traen
            // el suyo. Tambien tiene que nombrar algo declarado.
            //
            // PDFString y no context.obj: obj() ve la barra inicial y lo toma
            // por un nombre PDF, asi que "/Helv 0 Tf 0 g" acababa escrito
            // como el nombre /#2FHelv#200#20Tf#200#20g. El /DA es una cadena.
            acroForm.set(PDFName.of('DA'), PDFString.of('/Helv 0 Tf 0 g'));

            return helv;
        } catch (e) {
            this.debug('WARN', { action: 'No se pudieron declarar las fuentes', error: e.message });
            return null;
        }
    }

    /** Reescribe los /DA que nombren una fuente que no existe en el /DR. */
    sanearFuentes(pdfDoc, form) {
        const { PDFName, PDFDict, PDFString } = this.PDFLib;

        let arreglados = 0;
        try {
            const acroForm = pdfDoc.catalog.lookup(PDFName.of('AcroForm'), PDFDict);
            const drFont = acroForm?.lookup(PDFName.of('DR'), PDFDict)
                                   ?.lookup(PDFName.of('Font'), PDFDict);
            if (!drFont) return 0;

            const declaradas = new Set(drFont.keys().map(k => k.asString().replace(/^\//, '')));

            for (const campo of form.getFields()) {
                const dict = campo.acroField.dict;
                const da = dict.lookup(PDFName.of('DA'));
                const texto = String(da?.asString?.() ?? da?.decodeText?.() ?? '');
                if (!texto) continue;

                const m = texto.match(/\/([^\s\/]+)\s+([\d.]+)\s+Tf/);
                if (!m || declaradas.has(m[1])) continue;

                // Las casillas escriben su marca con ZapfDingbats; el resto,
                // texto normal. El tamaño se conserva: 0 significa "ajustar
                // al hueco", que es lo que quieren muchas plantillas.
                const esCasilla = typeof campo.isChecked === 'function';
                const fuente = esCasilla ? 'ZaDb' : 'Helv';

                dict.set(PDFName.of('DA'),
                    PDFString.of(`/${fuente} ${m[2]} Tf 0 g`));
                arreglados++;
            }

            if (arreglados) {
                this.debug('SUCCESS', { action: 'Fuentes saneadas en el /DA', campos: arreglados });
            }
        } catch (e) {
            this.debug('WARN', { action: 'No se pudieron sanear las fuentes', error: e.message });
        }
        return arreglados;
    }

    ensureFillable(pdfDoc) {
        const { PDFName, PDFDict } = this.PDFLib;

        try {
            const form = pdfDoc.getForm();

            // 1. Declarar las fuentes ANTES de generar las apariencias.
            //
            //    Sin esto el documento salia con referencias colgando: los
            //    campos pedian /Helvetica y /dummy__noop en su /DA, y el /DR
            //    del AcroForm —donde se declara que fuentes existen— solo
            //    tenia /Helv y /ZaDb. Un visor en pantalla es indulgente y
            //    resuelve la fuente por su cuenta; el motor de impresion no,
            //    y de ahi salian las dos cosas a la vez: Acrobat diciendo
            //    "the document could not be printed" y la hoja saliendo en
            //    blanco con los campos vacios.
            const helv = this.declararFuentes(pdfDoc);

            // 2. Generar las apariencias con esa fuente, no con la que cada
            //    campo traiga: asi todas las /AP salen consistentes entre si
            //    y con lo declarado.
            try {
                if (helv) form.updateFieldAppearances(helv);
                else form.updateFieldAppearances();
            } catch (e) {
                this.debug('WARN', { action: 'updateFieldAppearances fallo', error: e.message });
                try { form.updateFieldAppearances(); } catch (e2) {}
            }

            // 3. Barrido final: cualquier /DA que siga apuntando a una fuente
            //    no declarada se reescribe a una que si lo este. pdf-lib deja
            //    /dummy__noop en las casillas, que es su marcador interno
            //    para "aqui no se dibuja texto" y no una fuente de verdad.
            this.sanearFuentes(pdfDoc, form);

            // 4. Si la plantilla traia NeedAppearances puesto, se retira por
            //    el mismo motivo
            const acroForm = pdfDoc.catalog.lookup(PDFName.of('AcroForm'), PDFDict);
            if (acroForm) {
                acroForm.delete(PDFName.of('NeedAppearances'));
            }

            // 5. Quitar el bit de solo-lectura que traen algunas plantillas.
            //    Bit 1 del flag /Ff = ReadOnly.
            let liberados = 0;
            for (const field of form.getFields()) {
                try {
                    if (field.isReadOnly && field.isReadOnly()) {
                        field.enableReadOnly ? field.disableReadOnly() : null;
                        liberados++;
                    }
                } catch (e) {}
            }

            this.debug('SUCCESS', {
                action: 'PDF preparado como formulario rellenable',
                campos: form.getFields().length,
                desbloqueados: liberados
            });
        } catch (e) {
            // Un PDF sin AcroForm (no deberia pasar aqui) no es un error fatal
            this.debug('WARN', { action: 'No se pudo preparar el AcroForm', error: e.message });
        }
    }

    // ============================================
    // SAVE & EXPORT METHODS
    // ============================================
    async savePDF(pdfDoc, filename, options = {}) {
        try {
            this.debug('INPUT', { action: 'Saving PDF', filename });

            // Los PDFs se entregan siempre como formularios editables.
            // options.flatten se conserva por compatibilidad pero ya no se usa
            // por defecto: aplanar rompia la edicion posterior.
            if (options.flatten === true) {
                try {
                    const form = pdfDoc.getForm();
                    form.flatten();
                    this.debug('SUCCESS', { action: 'PDF flattened (solicitado explicitamente)' });
                } catch (e) {
                    this.debug('WARN', { action: 'Could not flatten PDF', error: e.message });
                }
            } else {
                this.ensureFillable(pdfDoc);
            }

            const pdfBytes = await this.serializar(pdfDoc);
            
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            this.debug('SUCCESS', { action: 'PDF saved', filename, size: `${(blob.size / 1024).toFixed(1)} KB` });
            
            return { blob, pdfBytes };
        } catch (error) {
            this.debug('ERROR', { action: 'Error saving PDF', error: error.message });
            throw error;
        }
    }

    /**
     * Bytes del PDF, escritos de la forma mas compatible posible.
     *
     * useObjectStreams: false es el motivo de que esto exista. Por defecto
     * pdf-lib empaqueta los objetos en flujos comprimidos —mas pequeño, y
     * perfectamente valido desde PDF 1.5—, pero hay lectores que se atragantan
     * con esa tabla de referencias, y Acrobat en un equipo de trabajo suele ir
     * varias versiones por detras. Un PDF con la tabla clasica lo abre y lo
     * imprime cualquier cosa.
     *
     * El precio es tamaño. Vale la pena: un parte que no se puede imprimir no
     * sirve de nada, por poco que ocupe.
     */
    async serializar(pdfDoc) {
        return await pdfDoc.save({
            updateExisting: true,
            addDefaultPage: false,
            useObjectStreams: false
        });
    }

    /**
     * Salida al dispositivo: js/file-out.js (window.PTOut).
     *
     * Aqui habia un downloadPDF con <a download> y un sharePDF con
     * navigator.share. Ninguna de las dos cosas existe en el WebView del APK,
     * asi que la descarga y el compartir estaban muertos en el telefono. Se
     * dejan como envoltorios para no tener dos caminos que mantener.
     */
    async downloadPDF(blob, filename) {
        this.debug('INPUT', { action: 'Downloading', filename });
        const res = await window.PTOut.descargar([{ blob, nombre: filename }]);
        this.debug('SUCCESS', { action: 'Download complete', via: res.via });
        return res;
    }

    async sharePDF(blob, filename, title = 'Police Tools Document') {
        this.debug('INPUT', { action: 'Sharing PDF', filename });
        const res = await window.PTOut.compartir([{ blob, nombre: filename }], { asunto: title });
        this.debug('SUCCESS', { action: 'Shared', via: res.via });
        return { success: true, method: res.via };
    }
}

// Global instance
window.pdfGenerator = new PDFGenerator();
