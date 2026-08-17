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

        // La plantilla oficial patrol_log.pdf no viene incluida en el paquete.
        // En vez de reventar, se compone un formulario equivalente desde cero.
        if (!(await this.templateExists(templatePath))) {
            this.debug('WARN', {
                action: 'Plantilla patrol_log.pdf ausente, generando layout propio',
                path: templatePath
            });
            return await this.generatePatrolFromScratch(formData, missionData);
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
        // Special handling for Vehicle/Radio combined field
        const vehicle = this.getFieldValue(formData, 'vehicle');
        const radioNo = this.getFieldValue(formData, 'radio_no');
        if (vehicle || radioNo) {
            const combinedValue = vehicle && radioNo ? `${vehicle} / ${radioNo}` : (vehicle || radioNo);
            const success = this.fillTextField(form, 'Vehicle Radio No', combinedValue, { debug: true });
            if (success) filledCount++;
        }
        
        for (const [uiKey, fieldMapping] of Object.entries(mapping.fields)) {
            if (fieldMapping.type === 'text' && fieldMapping.pdfField) {
                // Skip vehicle and radio_no as they are handled above
                if (uiKey === 'vehicle' || uiKey === 'radio_no') continue;
                
                const value = this.getFieldValue(formData, uiKey);
                if (value && value !== '') {
                    const success = this.fillTextField(form, fieldMapping.pdfField, value, { debug: true });
                    if (success) filledCount++;
                }
            }
        }
        
        // Fill missions
        if (missionData && missionData.length > 0) {
            const maxRows = Math.min(missionData.length, 65); // PDF has 65 rows
            
            for (let i = 0; i < maxRows; i++) {
                const mission = missionData[i];
                const rowNum = i + 1;
                
                // IN time
                if (mission.time_in) {
                    this.fillTextField(form, `INRow${rowNum}`, mission.time_in, { debug: false });
                }
                
                // OUT time
                if (mission.time_out) {
                    this.fillTextField(form, `OUTRow${rowNum}`, mission.time_out, { debug: false });
                }
                
                // Mission Description - usar el campo correcto del PDF
                if (mission.description) {
                    this.fillTextField(form, `MISSION DESCRIPTION Who What Where WhyRow${rowNum}`, mission.description, { debug: false });
                }
                
                // Remarks/Disposition
                if (mission.remarks) {
                    this.fillTextField(form, `REMARKS DispositionRow${rowNum}`, mission.remarks, { debug: false });
                }
            }
        }
        
        // Update appearances
        try {
            form.updateFieldAppearances();
        } catch (e) {}
        
        this.debug('SUCCESS', { template: 'patrol', filled: filledCount });
        return pdfDoc;
    }

    // ============================================
    // PATROL LOG SIN PLANTILLA
    // Reproduce la estructura del formulario oficial (cabecera, tabla de
    // misiones, combustible/mantenimiento, citaciones y firmas) dibujandolo
    // directamente, para que la funcion sirva aunque falte el PDF base.
    // ============================================
    async generatePatrolFromScratch(formData, missionData) {
        const { PDFDocument, StandardFonts, rgb } = this.PDFLib;

        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const form = pdfDoc.getForm();

        // Letter apaisado: la tabla de misiones necesita ancho
        const PAGE_W = 792, PAGE_H = 612;
        const M = 28;                       // margen
        const INK = rgb(0, 0, 0);
        const LINE = rgb(0.45, 0.45, 0.45);
        const HEAD_BG = rgb(0.88, 0.90, 0.94);

        const val = (k) => this.getFieldValue(formData, k);

        let page = null;
        let y = 0;

        const newPage = () => {
            page = pdfDoc.addPage([PAGE_W, PAGE_H]);
            y = PAGE_H - M;
            return page;
        };

        // Texto fijo (etiquetas, titulos): no editable
        const text = (str, x, yy, size = 9, f = font) => {
            page.drawText(String(str ?? ''), { x, y: yy, size, font: f, color: INK });
        };

        const line = (x1, y1, x2, y2, w = 0.6) => {
            page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: w, color: LINE });
        };

        const box = (x, yy, w, h, fill) => {
            page.drawRectangle({
                x, y: yy, width: w, height: h,
                borderColor: LINE, borderWidth: 0.6,
                color: fill || undefined
            });
        };

        /**
         * Campo de formulario editable.
         *
         * Es la diferencia entre un PDF impreso y uno util: el oficial puede
         * corregir una hora o añadir una mision en el visor sin volver a la app.
         * Los nombres se llevan un contador porque un AcroForm no admite dos
         * campos con el mismo nombre completo.
         */
        const usados = new Set();
        const campo = (nombre, valor, x, yy, w, h, opciones = {}) => {
            let unico = nombre;
            let n = 2;
            while (usados.has(unico)) unico = `${nombre}_${n++}`;
            usados.add(unico);

            const f = form.createTextField(unico);
            if (valor) f.setText(String(valor));
            if (opciones.multiline) f.enableMultiline();

            f.addToPage(page, {
                x, y: yy, width: w, height: h,
                borderWidth: 0,              // el recuadro ya lo dibuja box()
                backgroundColor: undefined,
                textColor: INK,
                font
            });

            // El tamaño se fija despues de addToPage: es esa llamada la que
            // crea la entrada /DA que setFontSize necesita para existir.
            try { f.setFontSize(opciones.size || 9); } catch (e) {}

            return f;
        };

        // ---------- Cabecera ----------
        newPage();

        text('DAILY PATROL / VEHICLE LOG', M, y - 12, 14, bold);

        const shiftOn = (k) => {
            const v = val(k);
            return v === 'on' || v === 'true' || v === 'X' || v === true;
        };
        const shifts = [];
        if (shiftOn('shift_days')) shifts.push('DAYS');
        if (shiftOn('shift_swings')) shifts.push('SWINGS');
        if (shiftOn('shift_mid')) shifts.push('MID');

        text('SHIFT:', PAGE_W - M - 200, y - 12, 10, bold);
        campo('Shift', shifts.join(' / '), PAGE_W - M - 155, y - 17, 155, 16, { size: 10 });

        y -= 24;
        line(M, y, PAGE_W - M, y, 1.2);
        y -= 6;

        const vehicle = val('vehicle');
        const radio = val('radio_no');
        const vehicleRadio = vehicle && radio ? `${vehicle} / ${radio}` : (vehicle || radio);

        // [etiqueta, valor, nombre del campo en el AcroForm]
        const headerRows = [
            [
                ['PATROL', val('patrol'), 'Patrol'],
                ['DATE', val('date'), 'Date'],
                ['OFFICER', val('police_name'), 'Officer'],
                ['MID', val('mid'), 'MID'],
                ['VEHICLE / RADIO', vehicleRadio, 'Vehicle Radio No']
            ],
            [
                ['BEGIN MILEAGE', val('beginning_mileage'), 'Beginning'],
                ['END MILEAGE', val('ending_mileage'), 'Ending Mileage'],
                ['TOTAL MILEAGE', val('total_mileage'), 'Total Mileage'],
                ['FUEL', val('fuel'), 'Fuel 1'],
                ['GSA / CARD COST', val('fuel_cost'), 'GSA or Credit Card Total Cost']
            ]
        ];

        const colW = (PAGE_W - M * 2) / 5;
        for (const row of headerRows) {
            const rowH = 30;
            row.forEach(([label, value, fieldName], i) => {
                const x = M + i * colW;
                box(x, y - rowH, colW, rowH);
                text(label, x + 4, y - 11, 6.5, bold);
                campo(fieldName, value, x + 3, y - rowH + 2, colW - 6, 15);
            });
            y -= rowH;
        }

        y -= 14;

        // ---------- Tabla de misiones ----------
        text('MISSION / ACTIVITY LOG', M, y, 10, bold);
        y -= 8;

        const cols = [
            { label: 'IN', w: 46, key: 'time_in', field: 'INRow' },
            { label: 'OUT', w: 46, key: 'time_out', field: 'OUTRow' },
            {
                label: 'MISSION DESCRIPTION (Who / What / Where / Why)',
                w: 400, key: 'description',
                field: 'MISSION DESCRIPTION Who What Where WhyRow'
            },
            {
                label: 'REMARKS / DISPOSITION',
                w: PAGE_W - M * 2 - 46 - 46 - 400, key: 'remarks',
                field: 'REMARKS DispositionRow'
            }
        ];

        // Recorta una etiqueta fija para que no se salga de su celda
        const fit = (str, maxW, size) => {
            let s = String(str ?? '');
            if (!s) return s;
            if (font.widthOfTextAtSize(s, size) <= maxW) return s;
            while (s.length > 1 && font.widthOfTextAtSize(s + '...', size) > maxW) {
                s = s.slice(0, -1);
            }
            return s + '...';
        };

        const ROW_H = 16;
        const drawTableHeader = () => {
            let x = M;
            for (const c of cols) {
                box(x, y - ROW_H, c.w, ROW_H, HEAD_BG);
                text(fit(c.label, c.w - 6, 6.5), x + 3, y - 11, 6.5, bold);
                x += c.w;
            }
            y -= ROW_H;
        };
        drawTableHeader();

        const missions = Array.isArray(missionData) ? missionData : [];
        // 26 filas como el formulario oficial: las vacias quedan como campos
        // en blanco listos para escribir, no como huecos muertos.
        const totalRows = Math.max(26, missions.length);

        for (let i = 0; i < totalRows; i++) {
            if (y - ROW_H < M + 40) {
                newPage();
                text('MISSION / ACTIVITY LOG (cont.)', M, y - 10, 10, bold);
                y -= 20;
                drawTableHeader();
            }

            const m = missions[i] || {};
            const rowNum = i + 1;
            let x = M;
            for (const c of cols) {
                box(x, y - ROW_H, c.w, ROW_H);
                campo(`${c.field}${rowNum}`, m[c.key], x + 2, y - ROW_H + 1.5, c.w - 4, 13, { size: 8 });
                x += c.w;
            }
            y -= ROW_H;
        }

        // ---------- Mantenimiento y citaciones ----------
        if (y - 150 < M) newPage();

        y -= 18;
        text('MAINTENANCE', M, y, 9, bold);
        text('CITATIONS ISSUED', M + 300, y, 9, bold);
        y -= 6;

        const maint = [
            ['Fuel 1', val('fuel'), 'Fuel 1'],
            ['Fuel 2', val('fuel2'), 'Fuel 2'],
            ['Oil / QTR', val('oil'), 'OIL QTR'],
            ['Other', val('other_maintenance'), 'Other']
        ];
        const cites = [
            ['Moving', val('citations_moving'), 'Moving 1'],
            ['Non-Moving', val('citations_nonmoving'), 'Non Moving 1'],
            ['DD FM 1805', val('dd_fm_1805'), 'DD FM 1805'],
            ['DA FM 1408', val('da_fm_1408'), 'DA FM 1408'],
            ['Verbal Warning', val('verbal_warning'), 'Verbal Warning']
        ];

        const startY = y;

        let my = startY;
        for (const [label, value, fieldName] of maint) {
            box(M, my - 18, 140, 18);
            box(M + 140, my - 18, 120, 18);
            text(label, M + 4, my - 12, 7.5, bold);
            campo(fieldName, value, M + 143, my - 16, 114, 14, { size: 8.5 });
            my -= 18;
        }

        let cy = startY;
        for (const [label, value, fieldName] of cites) {
            box(M + 300, cy - 18, 140, 18);
            box(M + 440, cy - 18, 120, 18);
            text(label, M + 304, cy - 12, 7.5, bold);
            campo(fieldName, value, M + 443, cy - 16, 114, 14, { size: 8.5 });
            cy -= 18;
        }

        y = Math.min(my, cy) - 16;

        // ---------- Comentarios ----------
        if (y - 60 < M) newPage();
        text('COMMENTS', M, y, 9, bold);
        y -= 6;
        box(M, y - 52, PAGE_W - M * 2, 52);
        campo('COMMENTS', val('comments'), M + 4, y - 50, PAGE_W - M * 2 - 8, 48, {
            multiline: true,
            size: 8.5
        });
        y -= 68;

        // ---------- Firmas ----------
        if (y - 50 < M) newPage();
        const sigs = [
            ['1. PRINT / SIGN', val('sig1_print'), val('sig1_sign'), '1 PRINT', 'SIGN'],
            ['2. PRINT / SIGN', val('sig2_print'), val('sig2_sign'), '2 PRINT', 'SIGN_2'],
            ['3. PS PRINT / SIGN', val('sig3_print'), val('sig3_sign'), '3 PS PRINT', 'SIGN_3']
        ];
        const sigW = (PAGE_W - M * 2) / 3;
        sigs.forEach(([label, printed, signed, fPrint, fSign], i) => {
            const x = M + i * sigW;
            box(x, y - 44, sigW, 44);
            text(label, x + 4, y - 11, 6.5, bold);
            campo(fPrint, printed, x + 3, y - 28, sigW - 8, 14);
            line(x + 4, y - 34, x + sigW - 6, y - 34);
            campo(fSign, signed, x + 3, y - 43, sigW - 8, 12, { size: 8 });
        });

        // ---------- Pie ----------
        const pages = pdfDoc.getPages();
        pages.forEach((p, i) => {
            p.drawText(
                `Generated by Police Tools  -  Page ${i + 1} of ${pages.length}`,
                { x: M, y: 14, size: 7, font, color: rgb(0.45, 0.45, 0.45) }
            );
        });

        // Deja los valores visibles manteniendo los campos editables
        this.ensureFillable(pdfDoc);

        this.debug('SUCCESS', {
            template: 'patrol (generado sin plantilla)',
            missions: missions.length,
            campos: form.getFields().length,
            pages: pages.length
        });

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
        
        this.debug('SUCCESS', { 
            template: mappingKey, 
            textFieldsFilled: filledCount,
            xMarksWritten: xMarkCount
        });
        
        return pdfDoc;
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
     * La alternativa correcta es NeedAppearances: le dice al visor que genere
     * el las apariencias de los campos al abrirlos. Los valores se ven y los
     * campos siguen siendo editables.
     */
    ensureFillable(pdfDoc) {
        const { PDFName, PDFBool, PDFDict } = this.PDFLib;

        try {
            const form = pdfDoc.getForm();

            // 1. Intentar que pdf-lib genere las apariencias directamente
            try {
                form.updateFieldAppearances();
            } catch (e) {
                this.debug('WARN', { action: 'updateFieldAppearances fallo', error: e.message });
            }

            // 2. NeedAppearances como red de seguridad para los campos cuyas
            //    apariencias pdf-lib no puede construir (sin /DA en la plantilla)
            const acroForm = pdfDoc.catalog.lookup(PDFName.of('AcroForm'), PDFDict);
            if (acroForm) {
                acroForm.set(PDFName.of('NeedAppearances'), PDFBool.True);
            }

            // 3. Quitar el bit de solo-lectura que traen algunas plantillas.
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

            const pdfBytes = await pdfDoc.save({
                updateExisting: true,
                addDefaultPage: false
            });
            
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            this.debug('SUCCESS', { action: 'PDF saved', filename, size: `${(blob.size / 1024).toFixed(1)} KB` });
            
            return { blob, pdfBytes };
        } catch (error) {
            this.debug('ERROR', { action: 'Error saving PDF', error: error.message });
            throw error;
        }
    }

    async generatePreview(pdfDoc) {
        try {
            this.debug('INPUT', { action: 'Generating preview' });

            // La vista previa usa el mismo documento que se descarga: si aqui
            // se aplanara, el PDF quedaria aplanado tambien para la descarga
            // porque pdfDoc es el mismo objeto.
            this.ensureFillable(pdfDoc);

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            this.debug('SUCCESS', { action: 'Preview ready' });
            return url;
        } catch (error) {
            this.debug('ERROR', { action: 'Preview error', error: error.message });
            throw error;
        }
    }

    downloadPDF(blob, filename) {
        try {
            this.debug('INPUT', { action: 'Downloading', filename });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.debug('SUCCESS', { action: 'Download complete' });
        } catch (error) {
            this.debug('ERROR', { action: 'Download error', error: error.message });
            throw error;
        }
    }

    async sharePDF(blob, filename, title = 'Police Tools Document') {
        this.debug('INPUT', { action: 'Sharing PDF', filename });
        const file = new File([blob], filename, { type: 'application/pdf' });
        
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({ title, files: [file] });
                this.debug('SUCCESS', { action: 'Shared via Web Share API' });
                return { success: true, method: 'webshare' };
            } catch (error) {
                if (error.name !== 'AbortError') {
                    this.debug('WARN', { action: 'Web Share failed', error: error.message });
                }
            }
        }
        
        this.debug('WARN', { action: 'Falling back to download' });
        this.downloadPDF(blob, filename);
        return { success: true, method: 'download' };
    }
}

// Global instance
window.pdfGenerator = new PDFGenerator();
