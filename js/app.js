/**
 * POLICE TOOLS APP - Main Application
 * Controlador principal con flujo UI→State→PDF corregido
 * Versión 4.0 - Con diagnóstico completo de pipeline
 */

class PoliceToolsApp {
    constructor() {
        this.currentTab = null;
        this.savedData = this.loadSavedData();
        this.currentPDF = null;
        
        // Estado de cada formulario
        this.formState = {
            interview: {},
            guardmount: {},
            patrol: {},
            pmcs: { vehicle_type: 'explorer' }
        };
        
        // Datos dinámicos
        this.dynamicData = {
            guardmount: { personnel: [] },
            patrol: { missions: [] }
        };
        
        // Saved entries (for editing)
        this.savedEntries = {
            patrol: { missions: [] },
            guardmount: { personnel: [] }
        };
        
        // Editing state
        this.editingEntry = {
            type: null,
            index: null
        };
        
        // Daily Reports
        this.dailyReports = this.loadDailyReports();
        
        this.init();
    }

    init() {
        // Load saved entries from storage
        this.savedEntries = this.loadEntriesFromStorage();
        
        // Inicializar History API para botón back de Android
        this.initHistoryAPI();
        
        this.setupEventListeners();
        this.setupFormListeners();
        this.setupDynamicForms();
        this.updateDateDisplay();
        this.setupLawLibrary();
        this.setupCalendar();
        this.setupMileageCalculation();
        this.setupShiftHoursCalculation();
        this.setupDebugTools();
        this.setupEntryManagement();
        this.setupTeamTemplates();
        this.setupSaveButtons();
        this.renderDailyReports();
        
        // Render saved entries
        this.renderSavedMissions();
        this.renderSavedPersonnel();
    }

    /* ============================================
       DEBUG - Flujo UI → PDF
       ============================================ */
    debugFlow(stage, data) {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const prefix = `[${timestamp}] [DEBUG ${stage}]`;
        
        switch(stage) {
            case 'INPUT':
                console.log('%c' + prefix, 'color: #3b82f6', 'onChange:', data);
                break;
            case 'STATE':
                console.log('%c' + prefix, 'color: #10b981', 'State updated:', data);
                break;
            case 'PAYLOAD':
                console.log('%c' + prefix, 'color: #f59e0b', 'Payload to PDF:', data);
                break;
            case 'MAPPING':
                console.log('%c' + prefix, 'color: #8b5cf6', 'Mapping applied:', data);
                break;
            case 'PDF_WRITE':
                console.log('%c' + prefix, 'color: #ef4444', 'Writing to PDF:', data);
                break;
            case 'ERROR':
                console.error(prefix, 'ERROR:', data);
                break;
        }
    }

    /* ============================================
       FORM STATE MANAGEMENT
       ============================================ */
    setupFormListeners() {
        // Interview Form
        this.setupFormListener('interview-form', 'interview');
        
        // Guardmount Form
        this.setupFormListener('guardmount-form', 'guardmount');
        
        // Patrol Form
        this.setupFormListener('patrol-form', 'patrol');
        
        // PMCS Form
        this.setupFormListener('pmcs-form', 'pmcs');
    }

    setupFormListener(formId, stateKey) {
        const form = document.getElementById(formId);
        if (!form) return;

        // Escuchar todos los inputs del formulario
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleInputChange(stateKey, e.target);
            });
            
            // Para inputs de texto, también escuchar input (tiempo real)
            if (input.type === 'text' || input.tagName === 'TEXTAREA') {
                input.addEventListener('input', (e) => {
                    this.handleInputChange(stateKey, e.target);
                });
            }
        });
    }

    handleInputChange(stateKey, input) {
        const name = input.name || input.id;
        let value = input.type === 'checkbox' ? input.checked : input.value;
        
        if (!name) {
            this.debugFlow('ERROR', { message: 'Input sin name/id', element: input });
            return;
        }

        // Transform value based on field type
        if (input.type === 'checkbox') {
            value = input.checked; // Store as boolean
        } else if (input.type === 'number') {
            value = input.value; // Keep as string for PDF
        }

        // Actualizar estado
        this.formState[stateKey][name] = value;
        
        this.debugFlow('INPUT', { 
            form: stateKey, 
            field: name, 
            value: value,
            type: input.type 
        });
        
        this.debugFlow('STATE', { 
            form: stateKey, 
            state: { ...this.formState[stateKey] } 
        });
    }

    /* ============================================
       DYNAMIC DATA (Personnel, Missions)
       ============================================ */
    updateDynamicData(type) {
        if (type === 'guardmount') {
            const personnel = [];
            document.querySelectorAll('.personnel-row').forEach((row, index) => {
                const person = {
                    rank: row.querySelector('.personnel-rank')?.value || '',
                    name: row.querySelector('.personnel-name')?.value || '',
                    duty: row.querySelector('.personnel-duty')?.value || '',
                    appearance: row.querySelector('.personnel-appearance')?.value || 'S',
                    vehicle: row.querySelector('.personnel-vehicle')?.value || '',
                    radio: row.querySelector('.personnel-radio')?.value || ''
                };
                personnel.push(person);
            });
            this.dynamicData.guardmount.personnel = personnel;
            this.debugFlow('STATE', { guardmount_personnel: personnel });
        }
        
        if (type === 'patrol') {
            const missions = [];
            document.querySelectorAll('.mission-row').forEach((row, index) => {
                const mission = {
                    time_in: row.querySelector('.mission-time-in')?.value || '',
                    time_out: row.querySelector('.mission-time-out')?.value || '',
                    description: row.querySelector('.mission-description')?.value || '',
                    remarks: row.querySelector('.mission-remarks')?.value || ''
                };
                missions.push(mission);
            });
            this.dynamicData.patrol.missions = missions;
            this.debugFlow('STATE', { patrol_missions: missions });
        }
        
        // Update PMCS inspection items
        if (type === 'pmcs') {
            const inspectionItems = {};
            document.querySelectorAll('.inspection-item').forEach(item => {
                const key = item.dataset.itemKey;
                if (key) {
                    const beforeCheckbox = item.querySelector('.check-before');
                    const afterCheckbox = item.querySelector('.check-after');
                    const remarkInput = item.querySelector('.item-remark');
                    
                    inspectionItems[`${key}_before`] = beforeCheckbox?.checked || false;
                    inspectionItems[`${key}_after`] = afterCheckbox?.checked || false;
                    inspectionItems[`${key}_remark`] = remarkInput?.value || '';
                }
            });
            this.formState.pmcs = { ...this.formState.pmcs, ...inspectionItems };
            this.debugFlow('STATE', { pmcs_inspection: inspectionItems });
        }
    }

    /* ============================================
       BUILD PAYLOAD FOR PDF
       ============================================ */
    buildPayload(type) {
        this.debugFlow('PAYLOAD', { type, building: true });
        
        let payload = {};
        
        switch(type) {
            case 'interview':
                payload = this.collectFormData('interview-form');
                break;
                
            case 'guardmount':
                payload = {
                    ...this.collectFormData('guardmount-form'),
                    personnel: this.savedEntries.guardmount.personnel
                };
                break;
                
            case 'patrol':
                payload = {
                    ...this.collectFormData('patrol-form'),
                    missions: this.savedEntries.patrol.missions
                };
                break;
                
            case 'pmcs':
                payload = this.collectFormData('pmcs-form');
                break;
        }
        
        // Log all fields with values for debugging
        const fieldsWithValues = Object.entries(payload).filter(([k, v]) => {
            if (Array.isArray(v)) return v.length > 0;
            return v !== '' && v !== null && v !== undefined && v !== false;
        });
        
        this.debugFlow('PAYLOAD', { 
            type, 
            totalFields: Object.keys(payload).length,
            fieldsWithValues: fieldsWithValues.length,
            payload: fieldsWithValues.reduce((acc, [k, v]) => {
                acc[k] = Array.isArray(v) ? `[Array:${v.length}]` : v;
                return acc;
            }, {})
        });
        
        return payload;
    }

    /* ============================================
       COLLECT FORM DATA DIRECTLY FROM DOM
       ============================================ */
    collectFormData(formId) {
        const form = document.getElementById(formId);
        if (!form) {
            console.warn(`Form #${formId} not found`);
            return {};
        }

        const data = {};
        
        // Collect all input elements
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const name = input.name || input.id;
            if (!name) return;

            if (input.type === 'checkbox') {
                // Store checkbox as 'on' when checked (PDF standard) or '' when unchecked
                data[name] = input.checked ? 'on' : '';
            } else if (input.type === 'radio') {
                // Only store radio if checked
                if (input.checked) {
                    data[name] = input.value;
                }
            } else {
                data[name] = input.value || '';
            }
        });

        console.log(`[Form Data] Collected ${Object.keys(data).length} fields from ${formId}`);
        return data;
    }

    /* ============================================
       VALIDATE BEFORE PDF GENERATION (NON-BLOCKING)
       ============================================ */
    validatePayload(type, payload) {
        const warnings = [];
        const info = [];
        
        // Solo información, NO bloquea la generación del PDF
        const emptyFields = Object.entries(payload)
            .filter(([k, v]) => !Array.isArray(v) && (v === '' || v === null || v === undefined))
            .map(([k]) => k);
        
        if (emptyFields.length > 0) {
            info.push(`${emptyFields.length} campos vacíos (se dejarán en blanco en el PDF)`);
        }
        
        // Log para debug
        this.debugFlow('VALIDATION', { type, info, emptyCount: emptyFields.length });
        
        // Siempre retorna válido - NO bloqueamos la generación
        return { valid: true, errors: [], warnings, info };
    }

    /* ============================================
       EVENT LISTENERS
       ============================================ */
    setupEventListeners() {
        // Navegación del menú
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', () => this.openTab(card.dataset.tab));
        });

        // Botones de retroceso
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.closeCurrentTab());
        });

        // Botones PDF
        this.setupPDFActions();

        // Menu Button & Dropdown
        this.setupMenuDropdown();
        
        // Notifications System
        this.setupNotifications();
        
        // Panama Schedule
        this.setupPanamaSchedule();
        
        // Personal Journal
        this.setupPersonalJournal();

        // PMCS Bulk Actions
        this.setupPMCSBulkActions();
        
        // Daily Reports Date Filter
        this.setupDailyReportsFilter();

        document.getElementById('calendar-shortcut')?.addEventListener('click', () => {
            this.openTab('calendar');
        });

        // Tema: lo gestiona themeManager, que ya se aplico antes de pintar.
        // Aqui solo se monta el selector de los ajustes.
        this.setupThemePicker();
    }

    setupThemePicker() {
        const tm = window.themeManager;
        if (!tm) return;

        const contenedor = document.getElementById('theme-picker');
        tm.renderPicker(contenedor);

        const auto = document.getElementById('theme-auto-toggle');
        if (auto) {
            auto.checked = tm.autoEnabled;
            auto.addEventListener('change', (e) => {
                tm.activarAuto(e.target.checked);
                tm.refrescarSeleccion(contenedor);
                this.showToast(
                    e.target.checked ? 'Theme follows the clock now' : 'Theme fixed',
                    'info'
                );
            });
        }

        // Cuando el modo automatico cambia el tema, la marca de seleccion
        // del selector tiene que seguirlo
        document.addEventListener('themechange', () => tm.refrescarSeleccion(contenedor));
    }

    setupDailyReportsFilter() {
        const dateFilter = document.getElementById('reports-date-filter');
        const clearBtn = document.getElementById('clear-date-filter');
        
        if (dateFilter) {
            dateFilter.addEventListener('change', (e) => {
                const selectedDate = e.target.value;
                if (selectedDate) {
                    this.renderDailyReports(selectedDate);
                } else {
                    this.renderDailyReports();
                }
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (dateFilter) dateFilter.value = '';
                this.renderDailyReports();
            });
        }
    }

    setupPMCSBulkActions() {
        // Mark All Before
        document.getElementById('mark-all-before')?.addEventListener('click', () => {
            document.querySelectorAll('#pmcs-form input[name$="_before"]').forEach(cb => {
                cb.checked = true;
            });
            this.updateDynamicData('pmcs');
            this.showToast('All BEFORE checks marked', 'success');
        });

        // Mark All After
        document.getElementById('mark-all-after')?.addEventListener('click', () => {
            document.querySelectorAll('#pmcs-form input[name$="_after"]').forEach(cb => {
                cb.checked = true;
            });
            this.updateDynamicData('pmcs');
            this.showToast('All AFTER checks marked', 'success');
        });

        // Mark All Both
        document.getElementById('mark-all-both')?.addEventListener('click', () => {
            document.querySelectorAll('#pmcs-form input[type="checkbox"]').forEach(cb => {
                cb.checked = true;
            });
            this.updateDynamicData('pmcs');
            this.showToast('All checks marked', 'success');
        });

        // Clear All
        document.getElementById('clear-all-checks')?.addEventListener('click', () => {
            document.querySelectorAll('#pmcs-form input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            this.updateDynamicData('pmcs');
            this.showToast('All checks cleared', 'info');
        });
    }

    setupPDFActions() {
        // Guardmount
        document.getElementById('guardmount-preview')?.addEventListener('click', () => this.previewPDF('guardmount'));
        document.getElementById('guardmount-share')?.addEventListener('click', () => this.sharePDF('guardmount'));
        document.getElementById('guardmount-download')?.addEventListener('click', () => this.downloadPDF('guardmount'));

        // Interview
        document.getElementById('interview-preview')?.addEventListener('click', () => this.previewPDF('interview'));
        document.getElementById('interview-share')?.addEventListener('click', () => this.sharePDF('interview'));
        document.getElementById('interview-download')?.addEventListener('click', () => this.downloadPDF('interview'));

        // Patrol
        document.getElementById('patrol-preview')?.addEventListener('click', () => this.previewPDF('patrol'));
        document.getElementById('patrol-share')?.addEventListener('click', () => this.sharePDF('patrol'));
        document.getElementById('patrol-download')?.addEventListener('click', () => this.downloadPDF('patrol'));

        // PMCS
        document.getElementById('pmcs-preview')?.addEventListener('click', () => this.previewPDF('pmcs'));
        document.getElementById('pmcs-share')?.addEventListener('click', () => this.sharePDF('pmcs'));
        document.getElementById('pmcs-download')?.addEventListener('click', () => this.downloadPDF('pmcs'));

        // Modal
        document.getElementById('close-preview')?.addEventListener('click', () => this.closeModal());
        document.getElementById('modal-share')?.addEventListener('click', () => this.shareFromModal());
        document.getElementById('modal-download')?.addEventListener('click', () => this.downloadFromModal());
    }

    setupDynamicForms() {
        // Guardmount - Agregar personal
        document.getElementById('add-personnel')?.addEventListener('click', () => {
            const list = document.getElementById('personnel-list');
            const row = document.createElement('div');
            row.className = 'personnel-row';
            row.innerHTML = `
                <div class="personnel-row-grid">
                    <input type="text" name="person_rank_${Date.now()}" placeholder="Rank" class="personnel-rank">
                    <input type="text" name="person_name_${Date.now()}" placeholder="Name" class="personnel-name">
                </div>
                <div class="personnel-row-grid">
                    <input type="text" name="person_duty_${Date.now()}" placeholder="Duty Position" class="personnel-duty">
                    <select name="person_appearance_${Date.now()}" class="personnel-appearance">
                        <option value="S">S</option>
                        <option value="U">U</option>
                    </select>
                </div>
                <div class="personnel-row-grid">
                    <input type="text" name="person_vehicle_${Date.now()}" placeholder="Vehicle" class="personnel-vehicle">
                    <input type="text" name="person_radio_${Date.now()}" placeholder="Radio#" class="personnel-radio">
                </div>
                <button type="button" class="remove-row">×</button>
            `;
            list.appendChild(row);
            
            // Agregar listeners a los nuevos inputs
            row.querySelectorAll('input, select').forEach(input => {
                input.addEventListener('change', () => this.updateDynamicData('guardmount'));
                input.addEventListener('input', () => this.updateDynamicData('guardmount'));
            });
            
            // Auto-scroll y auto-focus
            setTimeout(() => {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const firstInput = row.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 50);
            
            this.setupRemoveButtons();
        });

        // Patrol - Agregar misión
        document.getElementById('add-mission')?.addEventListener('click', () => {
            const list = document.getElementById('mission-list');
            const row = document.createElement('div');
            row.className = 'mission-row';
            row.innerHTML = `
                <div class="mission-row-grid">
                    <input type="time" name="mission_time_in_${Date.now()}" class="mission-time-in" placeholder="Time In">
                    <input type="time" name="mission_time_out_${Date.now()}" class="mission-time-out" placeholder="Time Out">
                </div>
                <input type="text" name="mission_desc_${Date.now()}" class="mission-description" placeholder="Mission Description (Who, What, Where, Why)">
                <input type="text" name="mission_remarks_${Date.now()}" class="mission-remarks" placeholder="Remarks/Disposition">
                <button type="button" class="remove-row">×</button>
            `;
            list.appendChild(row);
            
            // Agregar listeners
            row.querySelectorAll('input').forEach(input => {
                input.addEventListener('change', () => this.updateDynamicData('patrol'));
                input.addEventListener('input', () => this.updateDynamicData('patrol'));
            });
            
            // Auto-scroll y auto-focus
            setTimeout(() => {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const firstInput = row.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 50);
            
            this.setupRemoveButtons();
        });

        this.setupRemoveButtons();
    }

    setupRemoveButtons() {
        document.querySelectorAll('.remove-row').forEach(btn => {
            btn.onclick = function() {
                const row = this.closest('.personnel-row, .mission-row');
                const isPersonnel = row.classList.contains('personnel-row');
                row.remove();
                if (window.app) {
                    window.app.updateDynamicData(isPersonnel ? 'guardmount' : 'patrol');
                }
            };
        });
    }

    setupMileageCalculation() {
        const beginning = document.getElementById('beginning_mileage');
        const ending = document.getElementById('ending_mileage');
        const total = document.getElementById('total_mileage');

        if (beginning && ending && total) {
            const calculate = () => {
                const begin = parseFloat(beginning.value) || 0;
                const end = parseFloat(ending.value) || 0;
                if (end >= begin) {
                    total.value = (end - begin).toFixed(1);
                    this.formState.patrol.total_mileage = total.value;
                }
            };
            beginning.addEventListener('input', calculate);
            ending.addEventListener('input', calculate);
        }
    }

    setupShiftHoursCalculation() {
        const beginTime = document.querySelector('input[name="begin_time"]');
        const endTime = document.querySelector('input[name="end_time"]');
        const totalHours = document.getElementById('total_hours');

        if (beginTime && endTime && totalHours) {
            const calculate = () => {
                const begin = beginTime.value;
                const end = endTime.value;
                
                if (begin && end && begin.length === 4 && end.length === 4) {
                    // Parse military time format HHMM
                    const beginH = parseInt(begin.slice(0, 2), 10);
                    const beginM = parseInt(begin.slice(2, 4), 10);
                    const endH = parseInt(end.slice(0, 2), 10);
                    const endM = parseInt(end.slice(2, 4), 10);
                    
                    // Validate parsed values
                    if (isNaN(beginH) || isNaN(beginM) || isNaN(endH) || isNaN(endM)) {
                        totalHours.value = '';
                        return;
                    }
                    
                    let beginMinutes = beginH * 60 + beginM;
                    let endMinutes = endH * 60 + endM;
                    
                    // Handle shifts that cross midnight
                    if (endMinutes < beginMinutes) {
                        endMinutes += 24 * 60;
                    }
                    
                    const diffMinutes = endMinutes - beginMinutes;
                    const hours = Math.floor(diffMinutes / 60);
                    const minutes = diffMinutes % 60;
                    
                    totalHours.value = `${hours}h ${minutes.toString().padStart(2, '0')}m`;
                }
            };
            beginTime.addEventListener('input', calculate);
            endTime.addEventListener('input', calculate);
        }

        const statusSelect = document.getElementById('shift_status');
        const overtimeGroup = document.getElementById('overtime_reason_group');
        
        if (statusSelect && overtimeGroup) {
            statusSelect.addEventListener('change', () => {
                overtimeGroup.style.display = statusSelect.value === 'overtime' ? 'block' : 'none';
            });
        }
    }

    setupDebugTools() {
        // Inspector de PDFs
        const settingsSection = document.querySelector('#settings-view .form-section:last-child');
        if (settingsSection) {
            const debugBtn = document.createElement('button');
            debugBtn.className = 'btn btn-secondary';
            debugBtn.textContent = '🔍 Inspect PDF Fields';
            debugBtn.style.marginTop = '12px';
            debugBtn.addEventListener('click', () => this.runPDFInspection());
            settingsSection.appendChild(debugBtn);
        }
    }

    async runPDFInspection() {
        this.showToast('Inspecting PDF fields... Check console (F12)', 'info');
        
        const templates = [
            { name: 'interview', path: 'pdf-templates/Interview.pdf' },
            { name: 'guardmount', path: 'pdf-templates/guardmount.pdf' },
            { name: 'patrol', path: 'pdf-templates/patrol_log.pdf' },
            { name: 'pmcs_explorer', path: 'pdf-templates/PMCS Explorer.pdf' },
            { name: 'pmcs_taurus', path: 'pdf-templates/PMCS Taurus.pdf' }
        ];

        for (const template of templates) {
            try {
                console.log(`\n========== ${template.name.toUpperCase()} ==========`);
                await pdfGenerator.inspectPDF(template.path);
            } catch (error) {
                console.error(`Failed: ${template.name}`, error);
            }
        }
    }

    /* ============================================
       ENTRY MANAGEMENT (Mission & Personnel)
       ============================================ */
    setupEntryManagement() {
        // Mission Entry Save Button
        document.getElementById('save-mission-entry')?.addEventListener('click', () => {
            this.saveMissionEntry();
        });

        // Personnel Entry Save Button
        document.getElementById('save-personnel-entry')?.addEventListener('click', () => {
            this.savePersonnelEntry();
        });

        // Setup military time validation
        this.setupMilitaryTimeValidation();
    }

    setupMilitaryTimeValidation() {
        const timeInInput = document.getElementById('mission-time-in');
        const timeOutInput = document.getElementById('mission-time-out');

        [timeInInput, timeOutInput].forEach(input => {
            if (!input) return;
            
            // Convert time input to military time format on change
            input.addEventListener('change', (e) => {
                const value = e.target.value;
                if (value) {
                    // Store the raw time value (HH:MM format from time input)
                    // The display will format it as military time (HHMM)
                    e.target.dataset.militaryTime = value.replace(':', '');
                }
            });
        });
    }

    formatMilitaryTime(timeValue) {
        if (!timeValue) return '';
        // Convert HH:MM to HHMM format
        return timeValue.replace(':', '');
    }

    parseMilitaryTime(militaryTime) {
        if (!militaryTime || militaryTime.length !== 4) return '';
        // Convert HHMM to HH:MM format for time input
        return `${militaryTime.slice(0, 2)}:${militaryTime.slice(2, 4)}`;
    }

    saveMissionEntry() {
        const timeInRaw = document.getElementById('mission-time-in')?.value || '';
        const timeOutRaw = document.getElementById('mission-time-out')?.value || '';
        const description = document.getElementById('mission-description')?.value || '';
        const remarks = document.getElementById('mission-remarks')?.value || '';

        if (!description.trim()) {
            this.showToast('Please enter a mission description', 'error');
            return;
        }

        // Convert to military time format (HHMM)
        const timeIn = this.formatMilitaryTime(timeInRaw);
        const timeOut = this.formatMilitaryTime(timeOutRaw);

        const entry = {
            id: Date.now(),
            time_in: timeIn,
            time_out: timeOut,
            description: description,
            remarks: remarks
        };

        if (this.editingEntry.type === 'mission' && this.editingEntry.index !== null) {
            // Update existing entry
            this.savedEntries.patrol.missions[this.editingEntry.index] = entry;
            this.showToast('Mission entry updated!', 'success');
            this.editingEntry = { type: null, index: null };
            this.resetMissionEntryButton();
        } else {
            // Add new entry
            this.savedEntries.patrol.missions.push(entry);
            this.showToast('Mission entry saved!', 'success');
        }

        this.saveEntriesToStorage();
        this.renderSavedMissions();
        this.clearMissionEntryForm();
    }

    savePersonnelEntry() {
        const rank = document.getElementById('person-rank')?.value || '';
        const name = document.getElementById('person-name')?.value || '';
        const duty = document.getElementById('person-duty')?.value || '';
        const appearance = document.getElementById('person-appearance')?.value || 'S';
        const vehicle = document.getElementById('person-vehicle')?.value || '';
        const radio = document.getElementById('person-radio')?.value || '';

        if (!name.trim()) {
            this.showToast('Please enter a name', 'error');
            return;
        }

        const entry = {
            id: Date.now(),
            rank: rank,
            name: name,
            duty: duty,
            appearance: appearance,
            vehicle: vehicle,
            radio: radio
        };

        if (this.editingEntry.type === 'personnel' && this.editingEntry.index !== null) {
            // Update existing entry
            this.savedEntries.guardmount.personnel[this.editingEntry.index] = entry;
            this.showToast('Personnel entry updated!', 'success');
            this.editingEntry = { type: null, index: null };
            this.resetPersonnelEntryButton();
        } else {
            // Add new entry
            this.savedEntries.guardmount.personnel.push(entry);
            this.showToast('Personnel entry saved!', 'success');
        }

        this.saveEntriesToStorage();
        this.renderSavedPersonnel();
        this.clearPersonnelEntryForm();
    }

    resetMissionEntryButton() {
        const btn = document.getElementById('save-mission-entry');
        if (btn) {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                </svg>
                Save Entry
            `;
        }
    }

    resetPersonnelEntryButton() {
        const btn = document.getElementById('save-personnel-entry');
        if (btn) {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Save Entry
            `;
        }
    }

    // INLINE EDITING - Mission Entry
    startInlineMissionEdit(index) {
        const entry = this.savedEntries.patrol.missions[index];
        if (!entry) return;

        // Store editing state
        this.editingEntry = { type: 'mission', index: index };

        // Re-render with inline edit form
        this.renderSavedMissions();
    }

    saveInlineMissionEdit(index) {
        const timeInInput = document.getElementById(`edit-mission-time-in-${index}`);
        const timeOutInput = document.getElementById(`edit-mission-time-out-${index}`);
        const descInput = document.getElementById(`edit-mission-desc-${index}`);
        const remarksInput = document.getElementById(`edit-mission-remarks-${index}`);

        const timeIn = this.formatMilitaryTime(timeInInput?.value || '');
        const timeOut = this.formatMilitaryTime(timeOutInput?.value || '');
        const description = descInput?.value || '';
        const remarks = remarksInput?.value || '';

        if (!description.trim()) {
            this.showToast('Please enter a mission description', 'error');
            return;
        }

        // Update the entry
        this.savedEntries.patrol.missions[index] = {
            ...this.savedEntries.patrol.missions[index],
            time_in: timeIn,
            time_out: timeOut,
            description: description,
            remarks: remarks
        };

        this.editingEntry = { type: null, index: null };
        this.saveEntriesToStorage();
        this.renderSavedMissions();
        this.showToast('Mission entry updated!', 'success');
    }

    cancelInlineMissionEdit() {
        this.editingEntry = { type: null, index: null };
        this.renderSavedMissions();
    }

    // INLINE EDITING - Personnel Entry
    startInlinePersonnelEdit(index) {
        const entry = this.savedEntries.guardmount.personnel[index];
        if (!entry) return;

        // Store editing state
        this.editingEntry = { type: 'personnel', index: index };

        // Re-render with inline edit form
        this.renderSavedPersonnel();
    }

    saveInlinePersonnelEdit(index) {
        const rankInput = document.getElementById(`edit-person-rank-${index}`);
        const nameInput = document.getElementById(`edit-person-name-${index}`);
        const dutyInput = document.getElementById(`edit-person-duty-${index}`);
        const appearanceInput = document.getElementById(`edit-person-appearance-${index}`);
        const vehicleInput = document.getElementById(`edit-person-vehicle-${index}`);
        const radioInput = document.getElementById(`edit-person-radio-${index}`);

        const name = nameInput?.value || '';

        if (!name.trim()) {
            this.showToast('Please enter a name', 'error');
            return;
        }

        // Update the entry
        this.savedEntries.guardmount.personnel[index] = {
            ...this.savedEntries.guardmount.personnel[index],
            rank: rankInput?.value || '',
            name: name,
            duty: dutyInput?.value || '',
            appearance: appearanceInput?.value || 'S',
            vehicle: vehicleInput?.value || '',
            radio: radioInput?.value || ''
        };

        this.editingEntry = { type: null, index: null };
        this.saveEntriesToStorage();
        this.renderSavedPersonnel();
        this.showToast('Personnel entry updated!', 'success');
    }

    cancelInlinePersonnelEdit() {
        this.editingEntry = { type: null, index: null };
        this.renderSavedPersonnel();
    }

    deleteMissionEntry(index) {
        if (confirm('Delete this mission entry?')) {
            this.savedEntries.patrol.missions.splice(index, 1);
            this.saveEntriesToStorage();
            this.renderSavedMissions();
            this.showToast('Entry deleted', 'info');
        }
    }

    deletePersonnelEntry(index) {
        if (confirm('Delete this personnel entry?')) {
            this.savedEntries.guardmount.personnel.splice(index, 1);
            this.saveEntriesToStorage();
            this.renderSavedPersonnel();
            this.showToast('Entry deleted', 'info');
        }
    }

    clearMissionEntryForm() {
        document.getElementById('mission-time-in').value = '';
        document.getElementById('mission-time-out').value = '';
        document.getElementById('mission-description').value = '';
        document.getElementById('mission-remarks').value = '';
    }

    clearPersonnelEntryForm() {
        document.getElementById('person-rank').value = '';
        document.getElementById('person-name').value = '';
        document.getElementById('person-duty').value = '';
        document.getElementById('person-appearance').value = 'S';
        document.getElementById('person-vehicle').value = '';
        document.getElementById('person-radio').value = '';
    }

    renderSavedMissions() {
        const container = document.getElementById('saved-missions-list');
        if (!container) return;

        const missions = this.savedEntries.patrol.missions;

        if (missions.length === 0) {
            container.innerHTML = `
                <div class="empty-entries">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
                    </svg>
                    <p>No mission entries yet. Add your first entry above.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = missions.map((mission, index) => {
            const isEditing = this.editingEntry.type === 'mission' && this.editingEntry.index === index;
            
            if (isEditing) {
                // Inline edit form
                return `
                    <div class="saved-entry-card editing">
                        <div class="saved-entry-header">
                            <span class="saved-entry-number">#${index + 1} - Editing</span>
                        </div>
                        <div class="inline-edit-form">
                            <div class="inline-edit-row">
                                <div class="inline-edit-field">
                                    <label>IN (Time)</label>
                                    <input type="text" id="edit-mission-time-in-${index}" value="${mission.time_in || ''}" maxlength="4" inputmode="numeric" placeholder="0800">
                                </div>
                                <div class="inline-edit-field">
                                    <label>OUT (Time)</label>
                                    <input type="text" id="edit-mission-time-out-${index}" value="${mission.time_out || ''}" maxlength="4" inputmode="numeric" placeholder="1600">
                                </div>
                            </div>
                            <div class="inline-edit-field">
                                <label>Mission Description</label>
                                <textarea id="edit-mission-desc-${index}" rows="2">${this.escapeHtml(mission.description)}</textarea>
                            </div>
                            <div class="inline-edit-field">
                                <label>Remarks/Disposition</label>
                                <input type="text" id="edit-mission-remarks-${index}" value="${this.escapeHtml(mission.remarks)}">
                            </div>
                            <div class="inline-edit-actions">
                                <button type="button" class="btn btn-primary btn-sm" onclick="app.saveInlineMissionEdit(${index})">Save</button>
                                <button type="button" class="btn btn-secondary btn-sm" onclick="app.cancelInlineMissionEdit()">Cancel</button>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Display mode
            return `
                <div class="saved-entry-card">
                    <div class="saved-entry-header">
                        <span class="saved-entry-number">#${index + 1}</span>
                        <div class="saved-entry-actions">
                            <button type="button" class="saved-entry-btn edit" onclick="app.startInlineMissionEdit(${index})" title="Edit">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                            </button>
                            <button type="button" class="saved-entry-btn delete" onclick="app.deleteMissionEntry(${index})" title="Delete">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="mission-entry-content">
                        <div class="time-display">
                            <span class="time-in">${mission.time_in || '----'}</span>
                            <span class="arrow">→</span>
                            <span class="time-out">${mission.time_out || '----'}</span>
                        </div>
                        <div class="description">${this.escapeHtml(mission.description)}</div>
                        ${mission.remarks ? `<div class="remarks">${this.escapeHtml(mission.remarks)}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderSavedPersonnel() {
        const container = document.getElementById('saved-personnel-list');
        if (!container) return;

        const personnel = this.savedEntries.guardmount.personnel;

        if (personnel.length === 0) {
            container.innerHTML = `
                <div class="empty-entries">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <p>No personnel entries yet. Add your first entry above.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = personnel.map((person, index) => {
            const isEditing = this.editingEntry.type === 'personnel' && this.editingEntry.index === index;
            
            if (isEditing) {
                // Inline edit form
                return `
                    <div class="saved-entry-card editing">
                        <div class="saved-entry-header">
                            <span class="saved-entry-number">#${index + 1} - Editing</span>
                        </div>
                        <div class="inline-edit-form">
                            <div class="inline-edit-row">
                                <div class="inline-edit-field">
                                    <label>Rank</label>
                                    <input type="text" id="edit-person-rank-${index}" value="${this.escapeHtml(person.rank)}" placeholder="e.g., SGT">
                                </div>
                                <div class="inline-edit-field">
                                    <label>Name</label>
                                    <input type="text" id="edit-person-name-${index}" value="${this.escapeHtml(person.name)}" placeholder="Full name">
                                </div>
                            </div>
                            <div class="inline-edit-row">
                                <div class="inline-edit-field">
                                    <label>Duty Position</label>
                                    <input type="text" id="edit-person-duty-${index}" value="${this.escapeHtml(person.duty)}" placeholder="e.g., Desk Officer">
                                </div>
                                <div class="inline-edit-field">
                                    <label>Appearance</label>
                                    <select id="edit-person-appearance-${index}">
                                        <option value="S" ${person.appearance === 'S' ? 'selected' : ''}>S - Satisfactory</option>
                                        <option value="U" ${person.appearance === 'U' ? 'selected' : ''}>U - Unsatisfactory</option>
                                    </select>
                                </div>
                            </div>
                            <div class="inline-edit-row">
                                <div class="inline-edit-field">
                                    <label>Vehicle</label>
                                    <input type="text" id="edit-person-vehicle-${index}" value="${this.escapeHtml(person.vehicle)}" placeholder="Vehicle #">
                                </div>
                                <div class="inline-edit-field">
                                    <label>Radio #</label>
                                    <input type="text" id="edit-person-radio-${index}" value="${this.escapeHtml(person.radio)}" placeholder="Radio number">
                                </div>
                            </div>
                            <div class="inline-edit-actions">
                                <button type="button" class="btn btn-primary btn-sm" onclick="app.saveInlinePersonnelEdit(${index})">Save</button>
                                <button type="button" class="btn btn-secondary btn-sm" onclick="app.cancelInlinePersonnelEdit()">Cancel</button>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Display mode
            return `
                <div class="saved-entry-card">
                    <div class="saved-entry-header">
                        <span class="saved-entry-number">#${index + 1}</span>
                        <div class="saved-entry-actions">
                            <button type="button" class="saved-entry-btn edit" onclick="app.startInlinePersonnelEdit(${index})" title="Edit">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                            </button>
                            <button type="button" class="saved-entry-btn delete" onclick="app.deletePersonnelEntry(${index})" title="Delete">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="personnel-entry-content">
                        <div class="main-info">
                            ${person.rank ? `<span class="rank">${this.escapeHtml(person.rank)}</span>` : ''}
                            <span class="name">${this.escapeHtml(person.name)}</span>
                            ${person.duty ? `<span class="duty-position">${this.escapeHtml(person.duty)}</span>` : ''}
                        </div>
                        <div class="details-row">
                            <div class="detail-item">
                                <span class="label">Appearance:</span>
                                <span class="appearance-${person.appearance.toLowerCase()}">${person.appearance}</span>
                            </div>
                            ${person.vehicle ? `
                            <div class="detail-item">
                                <span class="label">Vehicle:</span>
                                <span>${this.escapeHtml(person.vehicle)}</span>
                            </div>
                            ` : ''}
                            ${person.radio ? `
                            <div class="detail-item">
                                <span class="label">Radio:</span>
                                <span>${this.escapeHtml(person.radio)}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveEntriesToStorage() {
        try {
            localStorage.setItem('policeToolsEntries', JSON.stringify(this.savedEntries));
        } catch (e) {
            console.warn('Could not save entries:', e);
        }
    }

    loadEntriesFromStorage() {
        try {
            const data = localStorage.getItem('policeToolsEntries');
            return data ? JSON.parse(data) : { patrol: { missions: [] }, guardmount: { personnel: [] } };
        } catch (e) {
            return { patrol: { missions: [] }, guardmount: { personnel: [] } };
        }
    }

    /* ============================================
       TEAM TEMPLATES
       ============================================ */
    setupTeamTemplates() {
        // Save Team A
        document.getElementById('save-team-a')?.addEventListener('click', () => {
            if (this.savedEntries.guardmount.personnel.length === 0) {
                this.showToast('No personnel to save', 'error');
                return;
            }
            localStorage.setItem('teamA', JSON.stringify(this.savedEntries.guardmount.personnel));
            this.showToast('Team A saved!', 'success');
        });

        // Load Team A
        document.getElementById('load-team-a')?.addEventListener('click', () => {
            const teamA = localStorage.getItem('teamA');
            if (!teamA) {
                this.showToast('Team A not found', 'error');
                return;
            }
            this.savedEntries.guardmount.personnel = JSON.parse(teamA);
            this.saveEntriesToStorage();
            this.renderSavedPersonnel();
            this.showToast('Team A loaded!', 'success');
        });

        // Save Team B
        document.getElementById('save-team-b')?.addEventListener('click', () => {
            if (this.savedEntries.guardmount.personnel.length === 0) {
                this.showToast('No personnel to save', 'error');
                return;
            }
            localStorage.setItem('teamB', JSON.stringify(this.savedEntries.guardmount.personnel));
            this.showToast('Team B saved!', 'success');
        });

        // Load Team B
        document.getElementById('load-team-b')?.addEventListener('click', () => {
            const teamB = localStorage.getItem('teamB');
            if (!teamB) {
                this.showToast('Team B not found', 'error');
                return;
            }
            this.savedEntries.guardmount.personnel = JSON.parse(teamB);
            this.saveEntriesToStorage();
            this.renderSavedPersonnel();
            this.showToast('Team B loaded!', 'success');
        });
    }

    /* ============================================
       SAVE BUTTONS (Form Save)
       ============================================ */
    setupSaveButtons() {
        console.log('[DEBUG] Setting up save buttons...');
        
        // Patrol Save - Generate PDF and save to Daily Reports
        const patrolSave = document.getElementById('patrol-save');
        console.log('[DEBUG] patrol-save found:', !!patrolSave);
        patrolSave?.addEventListener('click', async () => {
            console.log('[DEBUG] Patrol save clicked');
            await this.savePDFToDailyReports('patrol');
        });

        // Guardmount Save - Generate PDF and save to Daily Reports
        const guardmountSave = document.getElementById('guardmount-save');
        console.log('[DEBUG] guardmount-save found:', !!guardmountSave);
        guardmountSave?.addEventListener('click', async () => {
            console.log('[DEBUG] Guardmount save clicked');
            await this.savePDFToDailyReports('guardmount');
        });

        // Interview Save - Generate PDF and save to Daily Reports
        const interviewSave = document.getElementById('interview-save');
        console.log('[DEBUG] interview-save found:', !!interviewSave);
        interviewSave?.addEventListener('click', async () => {
            console.log('[DEBUG] Interview save clicked');
            await this.savePDFToDailyReports('interview');
        });

        // PMCS Save - Generate PDF and save to Daily Reports
        const pmcsSave = document.getElementById('pmcs-save');
        console.log('[DEBUG] pmcs-save found:', !!pmcsSave);
        pmcsSave?.addEventListener('click', async () => {
            console.log('[DEBUG] PMCS save clicked');
            await this.savePDFToDailyReports('pmcs');
        });
    }

    saveFormData(type) {
        const payload = this.buildPayload(type);
        const savedForms = this.loadSavedData();
        
        if (!savedForms.savedForms) savedForms.savedForms = {};
        savedForms.savedForms[type] = {
            data: payload,
            timestamp: new Date().toISOString()
        };
        
        this.saveAllData();
        this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} form saved!`, 'success');
    }

    async savePDFToDailyReports(type) {
        try {
            this.showLoading(true);
            const result = await this.generatePDF(type);
            if (!result) {
                this.showLoading(false);
                return;
            }
            
            const { pdfDoc, filename } = result;
            await this.saveDailyReport(type, pdfDoc, filename);
            this.showLoading(false);
            this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} saved to Daily Reports!`, 'success');
            
        } catch (error) {
            this.showLoading(false);
            this.showToast('Error saving to Daily Reports', 'error');
            console.error('Save to Daily Reports error:', error);
        }
    }

    /* ============================================
       DAILY REPORTS - CON REGLA DE 1 POR DÍA
       ============================================ */
    loadDailyReports() {
        try {
            const data = localStorage.getItem('policeToolsDailyReports');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    // Tipos que tienen límite de 1 por día
    getLimitedTypes() {
        return ['pmcs', 'patrol', 'guardmount'];
    }

    // Verificar si ya existe un documento del mismo tipo en la misma fecha
    checkExistingDocumentForDate(type, date) {
        const limitedTypes = this.getLimitedTypes();
        
        // Interview Worksheet no tiene límite
        if (!limitedTypes.includes(type)) {
            return { exists: false };
        }
        
        const dateStr = new Date(date).toISOString().split('T')[0];
        
        const existing = this.dailyReports.find(report => {
            if (report.type !== type) return false;
            const reportDate = new Date(report.date).toISOString().split('T')[0];
            return reportDate === dateStr;
        });
        
        if (existing) {
            return {
                exists: true,
                existingReport: existing,
                message: `A ${this.getReportTitle(type)} already exists for ${dateStr}. Would you like to replace it?`
            };
        }
        
        return { exists: false };
    }

    // Obtener la fecha del formulario (si existe campo date, usarlo, sino usar hoy)
    getFormDate(type, formData) {
        // Intentar obtener la fecha del formulario
        let date = formData.date || formData.Date;
        
        // Si no hay fecha en el formulario, usar la fecha actual local
        if (!date) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            date = `${year}-${month}-${day}`;
        }
        
        return date;
    }

    /**
     * Que campos distinguen dos documentos del mismo tipo y el mismo dia.
     *
     * Dos entrevistas del mismo dia son a dos personas; dos PMCS, a dos
     * vehiculos. En cambio el Patrol Log y el Guard Mount son uno por
     * patrulla y turno. Sin esta tabla, "mismo tipo y misma fecha" bastaria
     * para pisar documentos que no tienen nada que ver.
     */
    static get IDENTIDAD_DOCUMENTO() {
        return {
            interview: ['last_name', 'first_name'],
            pmcs: ['vehicle_type', 'unit'],
            patrol: ['patrol', 'mid'],
            guardmount: ['hours']
        };
    }

    identidadDocumento(type, payload = {}) {
        const campos = PoliceToolsApp.IDENTIDAD_DOCUMENTO[type] || [];
        return campos
            .map(c => String(payload[c] ?? '').trim().toLowerCase())
            .join('|');
    }

    async saveDailyReport(type, pdfDoc, filename, options = {}) {
        try {
            // Generate unique ID for each form
            const timestamp = Date.now();
            const randomId = Math.floor(1000 + Math.random() * 9000);
            const uniqueId = `${type}_${timestamp}_${randomId}`;
            
            // Get payload and form date
            const payload = this.buildPayload(type);
            const formDate = this.getFormDate(type, payload);
            
            // Se guarda como formulario rellenable: aplanar aqui dejaba el
            // documento archivado sin campos editables.
            pdfGenerator.ensureFillable(pdfDoc);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            // Build title with name for Interview Worksheet
            let reportTitle = this.getReportTitle(type);
            if (type === 'interview') {
                const lastName = payload.last_name?.trim() || '';
                const firstName = payload.first_name?.trim() || '';
                if (lastName || firstName) {
                    const fullName = lastName && firstName 
                        ? `${lastName}, ${firstName}`
                        : lastName || firstName;
                    reportTitle = `Interview Worksheet - ${fullName}`;
                }
            }

            // Parse date parts to avoid timezone issues
            const dateParts = formDate.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1; // 0-indexed
            const day = parseInt(dateParts[2]);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            const now = new Date();
            const report = {
                id: uniqueId,
                type: type,
                filename: filename,
                title: reportTitle,
                documentDate: formDate,
                date: new Date().toISOString(),
                displayDate: `${monthNames[month]} ${day}, ${year}`,
                displayTime: now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                // El PDF va a IndexedDB, no aqui: en localStorage ocupaba
                // ~1.2 MB por documento contra una cuota de ~4.8 MB.
                pdfEnStore: true,
                formData: payload
            };

            /*
             * Un documento que ya existe se reemplaza, no se añade.
             *
             * Durante el turno el mismo parte se genera varias veces —se ve
             * la previa, se descarga, se comparte, se corrige un dato y se
             * vuelve a generar—, y cada pasada dejaba una ficha nueva. La
             * lista acababa con seis copias del mismo Patrol Log y el
             * resumen del mes contando seis documentos.
             *
             * "Ya existe" es tipo + fecha + identidad, y la identidad la pone
             * cada formulario (ver IDENTIDAD_DOCUMENTO). Sin ella, dos PMCS
             * del mismo dia para dos vehiculos distintos se habrian pisado
             * uno al otro: seria perder un documento, que es peor que
             * duplicarlo.
             */
            const identidad = this.identidadDocumento(type, payload);
            const iguales = (r) => r.type === type
                && r.documentDate === formDate
                && this.identidadDocumento(r.type, r.formData || {}) === identidad;

            const previo = this.dailyReports.findIndex(iguales);

            if (previo !== -1) {
                const viejo = this.dailyReports[previo];
                report.id = viejo.id;
                report.date = viejo.date;          // se conserva cuando se creo
                this.dailyReports.splice(previo, 1);
            }

            await window.PoliceToolsStore.guardar(report.id, blob);

            this.dailyReports.unshift(report);
            
            // Limit to 100 reports to avoid storage issues
            if (this.dailyReports.length > 100) {
                this.dailyReports = this.dailyReports.slice(0, 100);
            }
            
            localStorage.setItem('policeToolsDailyReports', JSON.stringify(this.dailyReports));
            this.renderDailyReports();

            // Solo se lanzaba al borrar. La copia automatica, el aviso del
            // PMCS y el resumen del mes escuchan este evento, asi que al
            // guardar un documento no se enteraba ninguno.
            document.dispatchEvent(new CustomEvent('reportschanged'));

            if (!options.silencioso) {
                this.showToast('Report saved to Daily Reports!', 'success');
            }
            return { success: true, report };
        } catch (e) {
            console.error('Error saving daily report:', e);
            this.showToast('Error saving report', 'error');
            return { success: false, error: e };
        }
    }

    getReportTitle(type) {
        const titles = {
            patrol: 'Patrol Log',
            guardmount: 'Guard Mount',
            interview: 'Interview Worksheet',
            pmcs: 'PMCS Inspection'
        };
        return titles[type] || type;
    }

    /* ============================================
       CREATE NEW FORM - Multiple Forms Support
       ============================================ */
    createNewForm(type) {
        // Clear the current form
        this.clearForm(type);
        
        // Reset editing state
        this.editingEntry = { type: null, index: null };
        
        // Reset dynamic data and saved entries for this form type
        if (type === 'guardmount') {
            this.dynamicData.guardmount.personnel = [];
            this.savedEntries.guardmount.personnel = [];
            this.renderSavedPersonnel();
        } else if (type === 'patrol') {
            this.dynamicData.patrol.missions = [];
            this.savedEntries.patrol.missions = [];
            this.renderSavedMissions();
        }
        
        // Save the cleared state to storage
        this.saveEntriesToStorage();
        
        // Show toast
        this.showToast('New form created! Fill in the details.', 'info');
        
        // Scroll to top
        const viewContent = document.querySelector(`#${type === 'guardmount' ? 'guard-mount' : type === 'patrol' ? 'patrol-log' : type}-view .view-content`);
        if (viewContent) {
            viewContent.scrollTop = 0;
        }
    }

    clearForm(type) {
        const formId = `${type === 'guardmount' ? 'guardmount' : type === 'patrol' ? 'patrol' : type}-form`;
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            
            // Clear any dynamic entries displayed
            const entriesList = form.querySelector('.entries-list');
            if (entriesList) {
                entriesList.innerHTML = '';
            }
        }
        
        // Reset form state
        this.formState[type] = {};
        
        // Reset PMCS vehicle type to default
        if (type === 'pmcs') {
            this.formState.pmcs.vehicle_type = 'explorer';
            const vehicleSelect = document.getElementById('pmcs-vehicle-type');
            if (vehicleSelect) {
                vehicleSelect.value = 'explorer';
            }
        }
    }

    renderDailyReports(filterDate = null) {
        const container = document.getElementById('reports-list');
        if (!container) return;

        // Filter reports by date if specified
        let reportsToShow = this.dailyReports;
        if (filterDate) {
            const filterDateStr = new Date(filterDate).toISOString().split('T')[0];
            reportsToShow = this.dailyReports.filter(report => {
                const reportDateStr = new Date(report.documentDate || report.date).toISOString().split('T')[0];
                return reportDateStr === filterDateStr;
            });
        }

        if (this.dailyReports.length === 0) {
            container.innerHTML = `
                <div class="empty-entries" id="empty-reports">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    <p>No reports saved yet. Generate and save PDFs from the forms.</p>
                </div>
            `;
            return;
        }
        
        if (reportsToShow.length === 0 && filterDate) {
            container.innerHTML = `
                <div class="empty-entries" id="empty-reports">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    <p>No reports found for ${new Date(filterDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
                </div>
            `;
            return;
        }

        // Multi-share header
        const multiShareHeader = `
            <div class="multi-share-header" id="multi-share-header">
                <span class="multi-share-count"><span id="selected-count">0</span> selected</span>
                <div class="multi-share-actions">
                    <button type="button" class="btn-clear-selection" onclick="app.clearSelection()">Clear</button>
                    <button type="button" class="btn-email-selected" id="btn-email-selected" onclick="app.emailSelectedReports()" disabled>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;">
                            <rect x="2" y="4" width="20" height="16" rx="2"/>
                            <path d="m22 7-10 6L2 7"/>
                        </svg>
                        Email
                    </button>
                    <button type="button" class="btn-share-selected" id="btn-share-selected" onclick="app.shareSelectedReports()" disabled>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                            <polyline points="16 6 12 2 8 6"/>
                            <line x1="12" y1="2" x2="12" y2="15"/>
                        </svg>
                        Share
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = multiShareHeader + reportsToShow.map((report, index) => `
            <div class="report-item" id="report-item-${index}">
                <input type="checkbox" class="report-checkbox" id="report-checkbox-${index}" 
                    onchange="app.toggleReportSelection(${index})" data-report-id="${report.id}">
                <div class="report-item-content">
                    <div class="document-type-icon ${report.type}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            ${this.getDocumentIcon(report.type)}
                        </svg>
                    </div>
                    <div class="document-info">
                        <h4>${report.title}</h4>
                        <span class="document-date">${report.displayDate} • ${report.displayTime}</span>
                    </div>
                </div>
                <div class="document-actions">
                    <button type="button" class="document-action-btn" onclick="app.editDailyReport(${index})" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button type="button" class="document-action-btn" onclick="app.viewDailyReport(${index})" title="View">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                    <button type="button" class="document-action-btn" onclick="app.downloadDailyReport(${index})" title="Download">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    </button>
                    <button type="button" class="document-action-btn delete" onclick="app.deleteDailyReport(${index})" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    getDocumentIcon(type) {
        const icons = {
            patrol: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
            guardmount: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
            interview: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
            pmcs: '<path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>'
        };
        return icons[type] || icons.patrol;
    }

    // Edit a saved report - restore form data and open the form
    editDailyReport(index) {
        const report = this.dailyReports[index];
        if (!report || !report.formData) {
            this.showToast('Report data not available for editing', 'error');
            return;
        }

        // Restore form data
        const type = report.type;
        const formData = report.formData;

        // Restore based on report type
        switch(type) {
            case 'patrol':
                this.restorePatrolForm(formData);
                this.openTab('patrol-log');
                break;
            case 'guardmount':
                this.restoreGuardmountForm(formData);
                this.openTab('guard-mount');
                break;
            case 'interview':
                this.restoreInterviewForm(formData);
                this.openTab('interview');
                break;
            case 'pmcs':
                this.restorePMCSForm(formData);
                this.openTab('pmcs');
                break;
        }

        this.showToast('Report loaded for editing', 'success');
    }

    /* ============================================
       MULTI-SHARE FUNCTIONALITY
       ============================================ */
    selectedReports = new Set();

    toggleReportSelection(index) {
        const checkbox = document.getElementById(`report-checkbox-${index}`);
        const reportItem = document.getElementById(`report-item-${index}`);
        
        if (checkbox.checked) {
            this.selectedReports.add(index);
            reportItem.classList.add('selected');
        } else {
            this.selectedReports.delete(index);
            reportItem.classList.remove('selected');
        }
        
        this.updateMultiShareUI();
    }

    updateMultiShareUI() {
        const count = this.selectedReports.size;
        const countEl = document.getElementById('selected-count');
        const shareBtn = document.getElementById('btn-share-selected');
        const emailBtn = document.getElementById('btn-email-selected');

        if (countEl) countEl.textContent = count;
        if (shareBtn) shareBtn.disabled = count === 0;
        if (emailBtn) emailBtn.disabled = count === 0;
    }

    /** Abre la hoja de envio por correo con los documentos marcados. */
    emailSelectedReports() {
        if (this.selectedReports.size === 0) {
            this.showToast('No reports selected', 'warning');
            return;
        }
        if (!window.PoliceToolsData) {
            this.showToast('Email module not loaded', 'error');
            return;
        }

        const reportes = Array.from(this.selectedReports)
            .map(i => this.dailyReports[i])
            .filter(Boolean);

        window.PoliceToolsData.abrirHojaEnvio(reportes);
    }

    clearSelection() {
        this.selectedReports.clear();
        document.querySelectorAll('.report-checkbox').forEach(cb => {
            cb.checked = false;
        });
        document.querySelectorAll('.report-item').forEach(item => {
            item.classList.remove('selected');
        });
        this.updateMultiShareUI();
    }

    /**
     * Documentos marcados en forma { blob, nombre }, listos para PTOut.
     * Se avisa de los que no se pudieron leer en vez de mandar de menos
     * en silencio.
     */
    async recogerSeleccionados() {
        const reportes = Array.from(this.selectedReports)
            .map(i => this.dailyReports[i])
            .filter(Boolean);

        const items = [];
        const fallidos = [];

        for (const report of reportes) {
            try {
                const blob = await this.getReportBlob(report);
                if (blob) items.push({ blob, nombre: report.filename });
                else fallidos.push(report.filename);
            } catch (e) {
                console.error('No se pudo leer el PDF:', report.filename, e);
                fallidos.push(report.filename);
            }
        }

        return { items, fallidos };
    }

    async shareSelectedReports() {
        if (this.selectedReports.size === 0) {
            this.showToast('No reports selected', 'warning');
            return;
        }

        this.showLoading(true);

        try {
            const { items, fallidos } = await this.recogerSeleccionados();

            if (!items.length) {
                this.showToast('Error preparing PDFs', 'error');
                return;
            }
            if (fallidos.length) {
                this.showToast(`${fallidos.length} report(s) could not be read`, 'warning');
            }

            const res = await window.PTOut.compartir(items, {
                asunto: `Police Tools - ${items.length} report(s)`,
                cuerpo: `${items.length} document(s) from Police Tools.`
            });

            if (res.via === 'descarga') {
                this.showToast(`Sharing unavailable — ${items.length} PDF(s) downloaded`, 'info');
            } else {
                this.showToast(`${items.length} report(s) shared`, 'success');
            }
            this.clearSelection();

        } catch (error) {
            // Cancelar el selector del sistema no es un fallo
            if (error && (error.name === 'AbortError' || /cancel/i.test(error.message || ''))) return;
            console.error('Share error:', error);
            this.showToast('Error sharing reports', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    restorePatrolForm(formData) {
        // Restore basic fields
        const fields = ['patrol', 'date', 'police_name', 'mid', 'vehicle', 'radio_no',
                       'beginning_mileage', 'ending_mileage', 'total_mileage',
                       'fuel', 'oil', 'other_maintenance', 'fuel_cost',
                       'sig1_print', 'sig1_sign', 'sig2_print', 'sig2_sign', 
                       'sig3_print', 'sig3_sign', 'citations_moving', 'citations_nonmoving',
                       'dd_fm_1805', 'da_fm_1408', 'verbal_warning', 'comments'];
        
        fields.forEach(field => {
            const input = document.querySelector(`#patrol-form [name="${field}"]`);
            if (input && formData[field] !== undefined) {
                input.value = formData[field];
            }
        });

        // Restore shift checkboxes
        ['shift_days', 'shift_swings', 'shift_mid'].forEach(shift => {
            const checkbox = document.querySelector(`#patrol-form [name="${shift}"]`);
            if (checkbox && formData[shift]) {
                checkbox.checked = formData[shift] === 'X' || formData[shift] === true;
            }
        });

        // Restore missions
        if (formData.missions && formData.missions.length > 0) {
            this.savedEntries.patrol.missions = [...formData.missions];
            this.saveEntriesToStorage();
            this.renderSavedMissions();
        }
    }

    restoreGuardmountForm(formData) {
        // Restore basic fields
        const fields = ['date', 'from_shift_supervisor', 'to_desk_officer', 
                       'guardmount_conducted', 'inspection_location', 'hours',
                       'trainer', 'trainer_subject', 'supervisor_name', 
                       'supervisor_rank', 'supervisor_signature', 'remarks'];
        
        fields.forEach(field => {
            const input = document.querySelector(`#guardmount-form [name="${field}"]`);
            if (input && formData[field] !== undefined) {
                input.value = formData[field];
            }
        });

        // Restore personnel
        if (formData.personnel && formData.personnel.length > 0) {
            this.savedEntries.guardmount.personnel = [...formData.personnel];
            this.saveEntriesToStorage();
            this.renderSavedPersonnel();
        }
    }

    restoreInterviewForm(formData) {
        // Restore all interview fields
        const fields = Object.keys(formData);
        fields.forEach(field => {
            const input = document.querySelector(`#interview-form [name="${field}"]`);
            if (input && formData[field] !== undefined) {
                input.value = formData[field];
            }
        });
    }

    restorePMCSForm(formData) {
        // Restore vehicle type
        if (formData.vehicle_type) {
            const vehicleRadio = document.querySelector(`#pmcs-form [name="vehicle_type"][value="${formData.vehicle_type}"]`);
            if (vehicleRadio) vehicleRadio.checked = true;
        }

        // Restore basic fields
        const fields = ['shift', 'unit', 'date', 'vehicle_number', 'mileage_out', 'mileage_in',
                       'operator_name', 'operator_signature', 'additional_operators',
                       'supervisor_name', 'supervisor_signature', 
                       'desk_sergeant_name', 'desk_sergeant_signature', 'remarks'];
        
        fields.forEach(field => {
            const input = document.querySelector(`#pmcs-form [name="${field}"]`);
            if (input && formData[field] !== undefined) {
                input.value = formData[field];
            }
        });

        // Restore checkboxes
        const checkboxFields = Object.keys(formData).filter(k => k.endsWith('_before') || k.endsWith('_after'));
        checkboxFields.forEach(field => {
            const checkbox = document.querySelector(`#pmcs-form [name="${field}"]`);
            if (checkbox && formData[field]) {
                checkbox.checked = formData[field] === 'on' || formData[field] === true;
            }
        });
    }

    /**
     * Devuelve el Blob del PDF de un reporte.
     * Los guardados con la version anterior aun traen pdfData en base64.
     */
    async getReportBlob(report) {
        if (!report) return null;

        if (report.pdfData) {
            const base64 = String(report.pdfData).split(',')[1] || '';
            const bin = atob(base64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return new Blob([bytes], { type: 'application/pdf' });
        }

        return await window.PoliceToolsStore.obtener(report.id);
    }

    /**
     * Abre el modal y dibuja el PDF.
     * El blob se guarda en this.currentPDF para que Share y Download del pie
     * del modal no tengan que volver a leerlo de IndexedDB.
     */
    async mostrarPrevia(blob, filename, pdfDoc = null) {
        const modal = document.getElementById('pdf-preview-modal');
        const frame = document.getElementById('pdf-preview-frame');
        if (!modal || !frame) return;

        this.currentPDF = { blob, filename, pdfDoc };
        modal.classList.add('active');
        this.abrirCapa();

        try {
            await window.PTPdfView.render(frame, blob);
        } catch (e) {
            console.error('Preview error:', e);
            frame.innerHTML = '<p class="pv-error">Could not display this document.<br>' +
                'Use Download or Share to open it in another app.</p>';
        }
    }

    async viewDailyReport(index) {
        const report = this.dailyReports[index];
        const blob = report ? await this.getReportBlob(report) : null;
        if (!blob) {
            this.showToast('Report not available', 'error');
            return;
        }
        await this.mostrarPrevia(blob, report.filename);
    }

    async shareDailyReport(index) {
        const report = this.dailyReports[index];
        const blob = report ? await this.getReportBlob(report) : null;
        if (!blob) {
            this.showToast('Report not available', 'error');
            return;
        }

        try {
            const res = await window.PTOut.compartir([{ blob, nombre: report.filename }], {
                asunto: report.filename
            });
            this.showToast(res.via === 'descarga' ? 'Report downloaded' : 'Report shared', 'success');
        } catch (error) {
            if (error && (error.name === 'AbortError' || /cancel/i.test(error.message || ''))) return;
            console.error('Share error:', error);
            this.showToast('Error sharing report', 'error');
        }
    }

    async deleteDailyReport(index) {
        if (!confirm('Delete this saved report?')) return;

        const report = this.dailyReports[index];

        this.dailyReports.splice(index, 1);
        localStorage.setItem('policeToolsDailyReports', JSON.stringify(this.dailyReports));

        // El PDF vive en IndexedDB: sin esto se quedaria ocupando espacio
        // para siempre, sin ninguna ficha que lo referencie.
        if (report?.id) await window.PoliceToolsStore.borrar(report.id);

        this.renderDailyReports();
        document.dispatchEvent(new CustomEvent('reportschanged'));
        this.showToast('Report deleted', 'info');
    }

    async downloadDailyReport(index) {
        const report = this.dailyReports[index];
        const blob = report ? await this.getReportBlob(report) : null;
        if (!blob) {
            this.showToast('Report not available for download', 'error');
            return;
        }

        this.showLoading(true);

        try {
            const res = await window.PTOut.descargar([{ blob, nombre: report.filename }]);
            this.showToast(`Saved to ${res.donde} · and in Daily Reports`, 'success');
        } catch (error) {
            console.error('Download error:', error);
            this.showToast('Error downloading PDF', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    /* ============================================
       NAVEGACIÓN CON HISTORY API (Android Back Button)
       ============================================ */
    /**
     * Capas por encima de la vista: modales, hojas y paneles.
     *
     * En orden de arriba abajo, que es el orden en que el boton back tiene que
     * ir cerrandolas.
     */
    capasAbiertas() {
        // offsetParent es null en todo lo que sea position: fixed, y estas
        // capas lo son: con esa comprobacion se descartaban todas y el back
        // seguia sin cerrar ninguna.
        const visible = (el) => !!el && el.getClientRects().length > 0;

        const capas = [
            { el: document.getElementById('global-search'), cerrar: (e) => { e.remove(); document.body.style.overflow = ''; } },
            { el: document.getElementById('email-sheet'), cerrar: (e) => { e.remove(); document.body.style.overflow = ''; } },
            { el: document.querySelector('#new-sheet:not([hidden])'), cerrar: () => window.PoliceToolsNav?.cerrarHoja?.() },
            { el: document.getElementById('law-detail-modal'), cerrar: (e) => e.remove() },
            { el: document.querySelector('#pdf-preview-modal.active'), cerrar: () => this.closeModal() },
            { el: document.querySelector('.lock-screen'), cerrar: null },   // el bloqueo no se salta con back
            { el: document.querySelector('#notifications-panel.active'), cerrar: (e) => e.classList.remove('active') },
            { el: document.querySelector('#menu-dropdown.active'), cerrar: (e) => e.classList.remove('active') }
        ];

        return capas.filter(c => c.el && visible(c.el));
    }

    /** Cierra la capa de encima. Devuelve true si habia alguna. */
    cerrarCapaSuperior() {
        const [arriba] = this.capasAbiertas();
        if (!arriba) return false;

        // La pantalla de bloqueo se queda: el back no puede saltarsela
        if (!arriba.cerrar) return true;

        arriba.cerrar(arriba.el);
        return true;
    }

    /**
     * Marca una capa recien abierta en el historial.
     *
     * Sin esto, una capa abierta desde el menu principal no tenia ninguna
     * entrada detras que el back pudiera consumir: el WebView se iba de la
     * pagina y la app se cerraba con el modal todavia puesto. Con la marca,
     * el back siempre tiene algo que gastar en cerrar la capa.
     */
    abrirCapa() {
        try {
            window.history.pushState(
                { ...(window.history.state || {}), capa: true },
                '', window.location.href
            );
        } catch (e) { /* sin historial disponible, la capa se cierra con su boton */ }
    }

    /**
     * El boton fisico de Android, atendido por el plugin App.
     *
     * El historial del navegador no bastaba. Dentro del APK la app corre en
     * un WebView, y quien recibe la pulsacion es la Activity de Android, no
     * el documento: si nadie escucha el evento del plugin, Capacitor decide
     * por su cuenta y termina cerrando la app. Por eso el back seguia
     * saliendose aunque hubiera un modal abierto o se estuviera dentro de una
     * pestaña — el popstate ni siquiera llegaba a dispararse.
     *
     * Con el listener puesto, el orden lo decide la app:
     *   1. cerrar lo que este encima (modal, hoja, buscador…)
     *   2. si no, volver al menu principal desde la pestaña abierta
     *   3. y solo en el menu principal, salir
     *
     * En el navegador esto no existe y manda initHistoryAPI, que sigue igual.
     */
    initBotonAtras() {
        const cap = window.Capacitor;
        if (!cap?.isNativePlatform?.()) return;

        let App = cap.Plugins?.App;
        if (!App && typeof cap.registerPlugin === 'function') {
            try { App = cap.registerPlugin('App'); } catch (e) { App = null; }
        }
        if (!App?.addListener) return;

        App.addListener('backButton', () => {
            if (this.cerrarCapaSuperior()) return;

            if (this.currentTab) {
                this.closeCurrentTab();
                window.PoliceToolsNav?.sincronizar?.();
                return;
            }

            // Ya en el menu principal. Se pide confirmacion con un segundo
            // toque para no cerrar la app por un roce sin querer.
            if (this.saliendo) {
                App.exitApp?.();
                return;
            }
            this.saliendo = true;
            this.showToast('Press back again to exit', 'info');
            setTimeout(() => { this.saliendo = false; }, 2000);
        });
    }

    initHistoryAPI() {
        this.initBotonAtras();

        // Manejar evento popstate (botón back físico)
        window.addEventListener('popstate', (event) => {
            const state = event.state;

            /*
             * Con un modal abierto, el back cerraba la vista de detras y
             * dejaba el modal flotando sobre la nada; el siguiente back ya
             * vaciaba el historial y salia de la app. Ahora el back cierra
             * primero lo que hay encima, que es lo que se espera en Android.
             *
             * La entrada consumida se devuelve al historial para no quedarse
             * sin sitio hacia atras despues de abrir y cerrar varios modales.
             */
            if (this.cerrarCapaSuperior()) return;

            if (state && state.tab) {
                // Ya se esta en esa vista: la entrada consumida era la marca
                // de una capa que se cerro con su propio boton. No hay nada
                // que hacer, y repintar la vista daria un parpadeo.
                if (this.currentTab === state.tab) return;

                // Navegar al tab del historial
                this.closeCurrentTab();
                const view = document.getElementById(`${state.tab}-view`);
                if (view) {
                    view.classList.add('active');
                    this.currentTab = state.tab;
                    view.scrollTop = 0;
                }
            } else {
                // Sin estado = Main Menu, cerrar tab actual
                this.closeCurrentTab();
            }
        });
        
        // Estado inicial (Main Menu)
        if (window.history.state === null) {
            window.history.replaceState({ page: 'main-menu' }, '', window.location.href);
        }
    }

    openTab(tabName) {
        this.closeCurrentTab();
        
        const view = document.getElementById(`${tabName}-view`);
        if (view) {
            view.classList.add('active');
            this.currentTab = tabName;
            view.scrollTop = 0;
            
            // Agregar al historial para botón back
            window.history.pushState({ tab: tabName, page: tabName }, '', `#${tabName}`);
            
            if (tabName === 'calendar') {
                this.renderShiftHistory();
            }
        }
    }

    closeCurrentTab() {
        if (this.currentTab) {
            const view = document.getElementById(`${this.currentTab}-view`);
            if (view) view.classList.remove('active');
            this.currentTab = null;
        }
    }

    /* ============================================
       LAW LIBRARY & CALENDAR
       ============================================ */
    setupLawLibrary() {
        const searchInput = document.getElementById('law-search');
        const filterBtns = document.querySelectorAll('.filter-btn');
        let currentCategory = 'all';
        
        searchInput?.addEventListener('input', (e) => {
            this.renderLaws(e.target.value, currentCategory);
        });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.category;
                this.renderLaws(searchInput?.value || '', currentCategory);
            });
        });
        
        this.renderLaws('', 'all');
    }

    renderLaws(searchQuery, category) {
        const lawsList = document.getElementById('laws-list');
        if (!lawsList) return;
        
        const laws = searchLaws(searchQuery, category);
        
        if (laws.length === 0) {
            lawsList.innerHTML = '<p class="empty-state">No laws found.</p>';
            return;
        }
        
        lawsList.innerHTML = laws.map(law => {
            // Determinar badge de multa - soporta ambos formatos (fine/is_mca y penalty_type)
            let penaltyBadge = '';
            if (law.is_mca || law.fine === 'MCA') {
                penaltyBadge = `<span class="law-penalty mca">MCA</span>`;
            } else if (law.fine && law.fine !== 'MCA') {
                penaltyBadge = `<span class="law-penalty fine">${law.fine}</span>`;
            } else if (law.penalty_type === 'fine' && law.penalty_amounts && law.penalty_amounts.length > 0) {
                penaltyBadge = `<span class="law-penalty fine">$${law.penalty_amounts[0]}</span>`;
            } else if (law.penalty_type === 'mixed') {
                penaltyBadge = `<span class="law-penalty mixed">${law.penalty_raw}</span>`;
            }
            
            // Badge de LPRA - usar citation para FT Buchanan
            let lpraBadge = '';
            if (law.citation && law.citation.includes('L.P.R.A.')) {
                lpraBadge = `<span class="law-lpra">${law.citation}</span>`;
            } else if (law.lpra_assigned) {
                lpraBadge = `<span class="law-lpra">${law.lpra_citation}</span>`;
            }
            
            // Badge de artículo/citación
            let articleBadge = '';
            if (law.article_number) {
                articleBadge = `<span class="law-article">${law.article_number}</span>`;
            } else if (law.citation) {
                articleBadge = `<span class="law-article">${law.citation}</span>`;
            }
            
            // Use display titles for PR Penal Code, regular titles for others
            const titleEn = law.display_title_en || law.title_en;
            const titleEs = law.display_title_es || law.title_es;
            
            const isMcaItem = law.is_mca || law.fine === 'MCA';
            
            return `
            <div class="law-item ${isMcaItem ? 'mca-item' : ''} ${law.category === 'pr-penal' ? 'pr-penal-item' : ''}" data-id="${law.id}">
                <div class="law-badges">
                    ${articleBadge}
                    ${lpraBadge}
                    ${penaltyBadge}
                </div>
                <div class="law-title-en">${titleEn}</div>
                <div class="law-title-es">${titleEs}</div>
                <div class="law-keywords">
                    ${law.keywords_en ? law.keywords_en.slice(0, 4).map(kw => `<span class="keyword">${kw}</span>`).join('') : ''}
                </div>
            </div>
        `}).join('');
        
        lawsList.querySelectorAll('.law-item').forEach(item => {
            item.addEventListener('click', () => {
                const law = getLawById(item.dataset.id);
                if (law) this.showLawDetail(law);
            });
        });
    }

    showLawDetail(law) {
        // js/citations.js lo lee para el boton "Add to this shift"
        window.__leyActual = law;

        // Si ya habia uno abierto se sustituye, y con id el boton back sabe
        // cual es la capa que tiene que cerrar
        document.getElementById('law-detail-modal')?.remove();

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'law-detail-modal';
        this.abrirCapa();

        // Badge de multa para el detalle - soporta ambos formatos
        let penaltyBadge = '';
        if (law.is_mca || law.fine === 'MCA') {
            penaltyBadge = `<span class="detail-penalty mca">MCA - Mandatory Court Appearance</span>`;
        } else if (law.fine && law.fine !== 'MCA') {
            penaltyBadge = `<span class="detail-penalty fine">Fine: ${law.fine}</span>`;
        } else if (law.penalty_type === 'fine') {
            penaltyBadge = `<span class="detail-penalty fine">Fine: ${law.penalty_raw}</span>`;
        } else if (law.penalty_type === 'mixed') {
            penaltyBadge = `<span class="detail-penalty mixed">Penalty: ${law.penalty_raw}</span>`;
        } else if (law.penalty_type === 'form') {
            penaltyBadge = `<span class="detail-penalty form">Form: ${law.penalty_raw}</span>`;
        }
        
        // Badge de LPRA - para FT Buchanan usar citation si contiene L.P.R.A.
        let lpraBadge = '';
        if (law.citation && law.citation.includes('L.P.R.A.')) {
            lpraBadge = `<span class="detail-lpra">${law.citation}</span>`;
        } else if (law.lpra_assigned) {
            lpraBadge = `<span class="detail-lpra">${law.lpra_citation}</span>`;
        } else {
            lpraBadge = `<span class="detail-lpra unassigned">Sin L.P.R.A. asignado</span>`;
        }
        
        // Badge de artículo/citación para detalle
        let detailArticleBadge = '';
        if (law.article_number) {
            detailArticleBadge = `<span class="detail-article">${law.article_number}</span>`;
        } else if (law.citation && !law.citation.includes('L.P.R.A.')) {
            detailArticleBadge = `<span class="detail-article">${law.citation}</span>`;
        }
        
        modal.innerHTML = `
            <div class="modal-content law-detail-modal">
                <div class="modal-header">
                    <div class="detail-badges">
                        ${detailArticleBadge}
                        ${lpraBadge}
                        ${penaltyBadge}
                    </div>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-section">
                        <h4 class="detail-title-en">${law.display_title_en || law.title_en}</h4>
                        <h5 class="detail-title-es">${law.display_title_es || law.title_es}</h5>
                    </div>
                    
                    ${law.when_applies_es ? `
                    <div class="detail-section">
                        <div class="detail-label">Cuándo aplica / When it applies:</div>
                        <p class="detail-when-es">${law.when_applies_es}</p>
                        <p class="detail-when-en">${law.when_applies_en}</p>
                    </div>
                    ` : ''}
                    
                    ${law.description_es ? `
                    <div class="detail-section">
                        <div class="detail-label">Descripción / Description:</div>
                        <p class="detail-desc-es">${law.description_es}</p>
                        <p class="detail-desc-en">${law.description_en}</p>
                    </div>
                    ` : ''}
                    
                    <div class="detail-keywords">
                        <div class="detail-label">Keywords:</div>
                        <div class="keywords-container">
                            ${law.keywords_es ? law.keywords_es.map(kw => `<span class="keyword">${kw}</span>`).join('') : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    }

    setupCalendar() {
        this.currentCalendarDate = new Date();
        this.selectedCalendarDate = null;
        
        // Navigation buttons
        document.getElementById('prev-month')?.addEventListener('click', () => {
            this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        document.getElementById('next-month')?.addEventListener('click', () => {
            this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
            this.renderCalendar();
        });
        
        // Initial render
        this.renderCalendar();
        
        const shiftForm = document.getElementById('shift-form');
        shiftForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addShift(new FormData(shiftForm));
        });
    }

    renderCalendar() {
        const container = document.getElementById('calendar-days');
        const monthYearLabel = document.getElementById('calendar-month-year');
        if (!container || !monthYearLabel) return;
        
        const year = this.currentCalendarDate.getFullYear();
        const month = this.currentCalendarDate.getMonth();
        
        // Update header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearLabel.textContent = `${monthNames[month]} ${year}`;
        
        // Get holidays for this month
        // Comparacion por cadena: new Date('2026-11-11') se lee como UTC y en
        // husos al oeste caia en el dia anterior.
        const prefijoMes = `${year}-${String(month + 1).padStart(2, '0')}-`;
        const holidays = this.getFederalHolidays(year);
        const monthHolidays = holidays.filter(h => h.date.startsWith(prefijoMes));
        
        // Get shifts for marking days
        const shifts = this.savedData.shifts || [];
        
        // Calculate calendar days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startPadding = firstDay.getDay(); // 0 = Sunday
        const daysInMonth = lastDay.getDate();
        
        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        
        let html = '';

        // Previous month padding
        for (let i = startPadding - 1; i >= 0; i--) {
            html += `<div class="calendar-day other-month"><span class="day-number">${prevMonthLastDay - i}</span></div>`;
        }

        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
            const isSelected = this.selectedCalendarDate === dateStr;

            // Check for holiday. El dia observado tambien se marca: cuando el
            // feriado cae en fin de semana, el libre es el observado.
            const holiday = monthHolidays.find(h => h.date === dateStr)
                || holidays.find(h => h.observed === dateStr);

            // Check for shift
            const hasShift = shifts.some(s => s.date === dateStr);

            // Turno que toca segun el patron de Panama Schedule. Es lo que
            // convierte esto en un tracker de turnos: antes las celdas
            // estaban vacias y el calendario no decia nada.
            const turno = this.getPanamaShiftForDate(new Date(year, month, day));

            let classes = 'calendar-day';
            if (isToday) classes += ' today';
            if (isSelected) classes += ' selected';
            if (holiday) classes += ' holiday';
            if (hasShift) classes += ' has-shift';
            if (turno?.type === 'on') classes += turno.shift === 'night' ? ' on-night' : ' on-day';
            else if (turno?.type === 'off') classes += ' off';

            // El nombre del feriado no cabe en la celda: va un punto, y el
            // nombre se lee en el detalle al tocar el dia.
            html += `<div class="${classes}" data-date="${dateStr}"${holiday ? ` data-holiday="${this.escaparAtributo(holiday.name)}"` : ''}>
                <span class="day-number">${day}</span>
                <span class="day-marks">${holiday ? '<i class="mark-holiday"></i>' : ''}${hasShift ? '<i class="mark-logged"></i>' : ''}</span>
            </div>`;
        }

        // Next month padding: solo hasta completar la ultima semana. Rellenar
        // siempre a 42 celdas añadia una fila entera de dias grises.
        const totalCells = startPadding + daysInMonth;
        const remainingCells = (7 - (totalCells % 7)) % 7;
        for (let day = 1; day <= remainingCells; day++) {
            html += `<div class="calendar-day other-month"><span class="day-number">${day}</span></div>`;
        }

        container.innerHTML = html;

        // Add click handlers
        container.querySelectorAll('.calendar-day:not(.other-month)').forEach(dayEl => {
            dayEl.addEventListener('click', () => {
                const date = dayEl.dataset.date;
                this.selectCalendarDate(date);
            });
        });

        this.renderCalendarDetail();
    }

    /** Comillas y angulos fuera, que estos valores van dentro de un atributo. */
    escaparAtributo(texto) {
        return String(texto)
            .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /**
     * Ficha del dia elegido: turno que toca, feriado y horas ya registradas.
     * Aqui caben los nombres largos que no entran en la celda.
     */
    renderCalendarDetail() {
        const caja = document.getElementById('calendar-detail');
        if (!caja) return;

        const dateStr = this.selectedCalendarDate;
        if (!dateStr) {
            caja.hidden = true;
            caja.innerHTML = '';
            return;
        }

        const [y, m, d] = dateStr.split('-').map(Number);
        const fecha = new Date(y, m - 1, d);
        const turno = this.getPanamaShiftForDate(fecha);
        const feriados = this.getFederalHolidays(y);
        const feriado = feriados.find(h => h.date === dateStr);
        // Un dia puede no ser feriado y aun asi ser el dia libre, cuando el
        // feriado cayo en fin de semana y se observa aqui.
        const observado = !feriado && feriados.find(h => h.observed === dateStr);
        const registrados = (this.savedData.shifts || []).filter(s => s.date === dateStr);

        const etiquetaTurno = !turno || !this.panamaConfig?.startDate
            ? { texto: 'No schedule set', clase: 'off' }
            : turno.type === 'off'
                ? { texto: 'Off duty', clase: 'off' }
                : turno.shift === 'night'
                    ? { texto: 'Night shift', clase: 'night' }
                    : { texto: 'Day shift', clase: 'day' };

        // addShift guarda beginTime / endTime / totalHours en camelCase; se
        // aceptan las dos formas por si quedan entradas de una version vieja.
        const horas = registrados.map(s => {
            const ini = s.beginTime || s.begin_time || '?';
            const fin = s.endTime || s.end_time || '?';
            const tot = s.totalHours || s.total_hours;
            return `${ini}–${fin}${tot ? ` (${tot} h)` : ''}`;
        }).join(', ');

        caja.hidden = false;
        caja.innerHTML = `
            <b>${fecha.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</b>
            <span class="cal-tag ${etiquetaTurno.clase}">${etiquetaTurno.texto}</span>
            ${feriado ? `<span class="cal-tag holiday">${feriado.name}${
                feriado.observed ? ' · observed ' + this.diaCorto(feriado.observed) : ''}</span>` : ''}
            ${observado ? `<span class="cal-tag holiday">${observado.name} observed</span>` : ''}
            ${registrados.length ? `<span class="cal-tag logged">Logged ${horas}</span>` : ''}
        `;
    }

    /** 'YYYY-MM-DD' -> 'Fri Jul 3', sin pasar por new Date(cadena). */
    diaCorto(dateStr) {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d)
            .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    selectCalendarDate(dateStr) {
        this.selectedCalendarDate = dateStr;
        
        // Update visual selection
        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        const selectedEl = document.querySelector(`.calendar-day[data-date="${dateStr}"]`);
        if (selectedEl) selectedEl.classList.add('selected');
        
        // Update form
        const dateInput = document.getElementById('shift_date_input');
        const dateDisplay = document.getElementById('selected-date-display');
        if (dateInput) dateInput.value = dateStr;
        if (dateDisplay) {
            // new Date('2026-11-10') se interpreta como UTC y en husos al oeste
            // caia en el dia anterior. Se construye con las partes.
            const [y, m, d] = dateStr.split('-').map(Number);
            const date = new Date(y, m - 1, d);
            dateDisplay.textContent = `- ${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`;
        }

        this.renderCalendarDetail();
    }

    renderHolidays() {
        const container = document.getElementById('holidays-list');
        if (!container) return;
        
        const currentYear = this.currentCalendarDate ? this.currentCalendarDate.getFullYear() : new Date().getFullYear();
        const holidays = this.getFederalHolidays(currentYear);
        const upcoming = holidays.filter(h => new Date(h.date) >= new Date()).slice(0, 5);
        
        container.innerHTML = upcoming.map(h => `
            <div class="holiday-item">
                <span class="holiday-name">${h.name}</span>
                <span class="holiday-date">${new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
        `).join('');
    }

    /**
     * Feriados federales del año.
     *
     * Estaban con la fecha fija de 2025 (`${year}-01-20` para el dia de Martin
     * Luther King, `${year}-11-27` para Thanksgiving), asi que en cualquier
     * otro año caian mal: en 2026 el de King es el 19 de enero y Thanksgiving
     * el 26 de noviembre. Seis de los once son dias moviles y hay que
     * calcularlos.
     *
     * Se devuelve la fecha como 'YYYY-MM-DD' construida a mano, sin pasar por
     * new Date(cadena): eso se interpreta como UTC y en Puerto Rico (UTC-4)
     * retrocedia un dia, con lo que Veterans Day aparecia el 10.
     */
    getFederalHolidays(year) {
        const iso = (m, d) => `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        // n-esimo dia de la semana del mes (0 = domingo)
        const nEsimo = (mes, diaSemana, n) => {
            const primero = new Date(year, mes, 1).getDay();
            return 1 + ((diaSemana - primero + 7) % 7) + (n - 1) * 7;
        };

        // ultimo dia de la semana del mes
        const ultimo = (mes, diaSemana) => {
            const finDeMes = new Date(year, mes + 1, 0);
            return finDeMes.getDate() - ((finDeMes.getDay() - diaSemana + 7) % 7);
        };

        const lista = [
            { name: "New Year's Day", date: iso(0, 1), fijo: true },
            { name: "Martin Luther King Jr. Day", date: iso(0, nEsimo(0, 1, 3)) },
            { name: "Presidents' Day", date: iso(1, nEsimo(1, 1, 3)) },
            { name: "Memorial Day", date: iso(4, ultimo(4, 1)) },
            { name: "Juneteenth", date: iso(5, 19), fijo: true },
            { name: "Independence Day", date: iso(6, 4), fijo: true },
            { name: "Labor Day", date: iso(8, nEsimo(8, 1, 1)) },
            { name: "Columbus Day", date: iso(9, nEsimo(9, 1, 2)) },
            { name: "Veterans Day", date: iso(10, 11), fijo: true },
            { name: "Thanksgiving Day", date: iso(10, nEsimo(10, 4, 4)) },
            { name: "Christmas Day", date: iso(11, 25), fijo: true }
        ];

        // Los de fecha fija que caen en fin de semana se observan el viernes
        // anterior o el lunes siguiente. Para quien cobra el federal, el dia
        // libre es el observado, no el nominal.
        for (const h of lista) {
            if (!h.fijo) continue;
            const [y, m, d] = h.date.split('-').map(Number);
            const dow = new Date(y, m - 1, d).getDay();
            if (dow === 6) h.observed = iso(m - 1, d - 1);       // sabado -> viernes
            else if (dow === 0) h.observed = iso(m - 1, d + 1);  // domingo -> lunes
        }

        return lista;
    }

    addShift(formData) {
        const dateValue = formData.get('shift_date');
        if (!dateValue) {
            this.showToast('Please select a date from the calendar', 'error');
            return;
        }
        
        // Check if we're editing an existing shift
        const editingId = this.editingShiftId;
        
        const shift = {
            id: editingId || Date.now(),
            date: dateValue,
            beginTime: formData.get('begin_time'),
            endTime: formData.get('end_time'),
            totalHours: document.getElementById('total_hours')?.value || '',
            status: formData.get('shift_status'),
            overtimeReason: formData.get('overtime_reason') || '',
            notes: formData.get('shift_notes') || ''
        };
        
        if (!this.savedData.shifts) this.savedData.shifts = [];
        
        if (editingId) {
            // Update existing shift
            const index = this.savedData.shifts.findIndex(s => s.id === editingId);
            if (index !== -1) {
                this.savedData.shifts[index] = shift;
            }
            this.editingShiftId = null;
            this.showToast('Shift updated successfully', 'success');
        } else {
            // Add new shift
            this.savedData.shifts.unshift(shift);
            this.showToast('Shift added successfully', 'success');
        }
        
        this.saveAllData();

        this.renderShiftHistory();
        this.renderCalendar(); // Re-render to show the shift dot
        // El resumen del mes cuenta estas horas
        document.dispatchEvent(new CustomEvent('shiftschanged'));
        document.getElementById('shift-form')?.reset();
        document.getElementById('total_hours').value = '';
        this.selectedCalendarDate = null;
        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        document.getElementById('selected-date-display').textContent = '';
        
        // Reset button text
        const addBtn = document.getElementById('add-shift-btn');
        if (addBtn) addBtn.textContent = 'Add Shift';
    }

    editShift(id) {
        const shift = this.savedData.shifts?.find(s => s.id === id);
        if (!shift) return;
        
        // Store the ID we're editing
        this.editingShiftId = id;
        
        // Fill the form with shift data
        const form = document.getElementById('shift-form');
        if (form) {
            form.querySelector('[name="shift_date"]').value = shift.date;
            form.querySelector('[name="begin_time"]').value = shift.beginTime;
            form.querySelector('[name="end_time"]').value = shift.endTime;
            document.getElementById('total_hours').value = shift.totalHours;
            form.querySelector('[name="shift_status"]').value = shift.status;
            form.querySelector('[name="overtime_reason"]').value = shift.overtimeReason || '';
            form.querySelector('[name="shift_notes"]').value = shift.notes || '';
            
            // Show/hide overtime reason
            const overtimeGroup = document.getElementById('overtime_reason_group');
            if (overtimeGroup) {
                overtimeGroup.style.display = shift.status === 'overtime' ? 'block' : 'none';
            }
        }
        
        // Select the date on calendar
        this.selectedCalendarDate = shift.date;
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('selected');
            if (el.dataset.date === shift.date) {
                el.classList.add('selected');
            }
        });
        document.getElementById('selected-date-display').textContent = new Date(shift.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        
        // Change button text
        const addBtn = document.getElementById('add-shift-btn');
        if (addBtn) addBtn.textContent = 'Update Shift';
        
        // Scroll to form
        document.getElementById('shift-form')?.scrollIntoView({ behavior: 'smooth' });
    }

    renderShiftHistory() {
        const container = document.getElementById('shift-list');
        if (!container) return;
        
        const shifts = this.savedData.shifts || [];
        
        if (shifts.length === 0) {
            container.innerHTML = '<p class="empty-state">No shifts recorded yet.</p>';
            return;
        }
        
        container.innerHTML = shifts.slice(0, 10).map(shift => `
            <div class="shift-item">
                <div class="shift-header">
                    <span class="shift-date">${new Date(shift.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    <div class="shift-actions">
                        <span class="shift-status ${shift.status}">${shift.status}</span>
                        <button type="button" class="shift-edit-btn" onclick="app.editShift(${shift.id})" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="shift-times">${shift.beginTime} - ${shift.endTime}</div>
                <div class="shift-hours">${shift.totalHours}</div>
                ${shift.notes ? `<div class="shift-notes">${shift.notes}</div>` : ''}
            </div>
        `).join('');
    }

    /* ============================================
       GENERACIÓN DE PDFs
       ============================================ */
    async generatePDF(type) {
        // 1. BUILD PAYLOAD
        const payload = this.buildPayload(type);
        
        // 2. VALIDATE (non-blocking - solo informativo)
        const validation = this.validatePayload(type, payload);
        if (validation.warnings.length > 0) {
            this.debugFlow('WARN', { warnings: validation.warnings });
        }
        
        // 3. SHOW LOADING
        this.showLoading(true);
        
        try {
            let pdfDoc;
            let filename;
            
            console.log('%c========== GENERATING PDF ==========', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
            console.log(`Template: ${type}`);
            console.log('Payload keys:', Object.keys(payload).filter(k => {
                const v = payload[k];
                return v !== '' && v !== null && v !== undefined && v !== false;
            }));
            
            switch (type) {
                case 'interview':
                    pdfDoc = await pdfGenerator.generateInterview(payload);
                    // Nombre descriptivo: Interview_Apellido_Nombre_Fecha.pdf
                    const lastName = (payload.last_name || 'Unknown').replace(/[^a-zA-Z0-9]/g, '');
                    const firstName = (payload.first_name || '').replace(/[^a-zA-Z0-9]/g, '');
                    filename = `Interview_${lastName}${firstName ? '_' + firstName : ''}_${this.getDateString()}.pdf`;
                    break;
                    
                case 'guardmount':
                    pdfDoc = await pdfGenerator.generateGuardmount(payload, payload.personnel);
                    // Nombre descriptivo: GuardMount_Supervisor_Fecha.pdf
                    const supervisorName = (payload.supervisor_name || 'Unknown').replace(/[^a-zA-Z0-9]/g, '');
                    filename = `GuardMount_${supervisorName}_${this.getDateString()}.pdf`;
                    break;
                    
                case 'patrol':
                    pdfDoc = await pdfGenerator.generatePatrol(payload, payload.missions);
                    // Nombre descriptivo: Patrol_Oficial_Fecha.pdf
                    const officerName = (payload.police_name || 'Unknown').replace(/[^a-zA-Z0-9]/g, '');
                    const patrolDate = payload.date || this.getDateString();
                    filename = `Patrol_${officerName}_${patrolDate}.pdf`;
                    break;
                    
                case 'pmcs':
                    const vehicleType = payload.vehicle_type || 'explorer';
                    pdfDoc = await pdfGenerator.generatePMCS(payload, vehicleType);
                    // Nombre descriptivo: PMCS_Vehiculo_Operador_Fecha.pdf
                    const operatorName = (payload.operator_name || 'Unknown').replace(/[^a-zA-Z0-9]/g, '');
                    const vehicleNum = (payload.vehicle_number || '').replace(/[^a-zA-Z0-9]/g, '');
                    filename = `PMCS_${vehicleType}${vehicleNum ? '_' + vehicleNum : ''}_${operatorName}_${this.getDateString()}.pdf`;
                    // Marca informativa del tipo de documento
                    pdfDoc.__isPMCS = true;
                    break;
                    
                default:
                    throw new Error('Unknown PDF type: ' + type);
            }
            
            console.log('%c========== PDF GENERATED ==========', 'color: #10b981; font-size: 14px; font-weight: bold;');

            this.showLoading(false);

            // El formulario oficial tiene un numero fijo de filas. Si se
            // desbordan, hay que decirlo: antes se descartaban en silencio.
            if (pdfDoc.__misionesOmitidas) {
                this.showToast(
                    `${pdfDoc.__misionesOmitidas} mision(es) no caben en el formulario`,
                    'warning'
                );
            }

            return { pdfDoc, filename };
            
        } catch (error) {
            this.showLoading(false);
            this.debugFlow('ERROR', { message: error.message, stack: error.stack });
            this.showToast('Error: ' + error.message, 'error');
            throw error;
        }
    }

    getDateString() {
        return new Date().toISOString().split('T')[0];
    }

    /**
     * Genera el documento y lo archiva en Daily Reports de una vez.
     *
     * Antes solo archivaba el boton "Save": ver la previa, descargar o
     * compartir generaba el PDF y lo dejaba ir. El oficial que llenaba el
     * parte y lo mandaba por correo no lo encontraba luego en la lista, y
     * Daily Reports es la base de datos de la unidad. Ahora cualquiera de las
     * cuatro salidas deja la ficha guardada; el reemplazo por tipo y fecha
     * evita que se acumulen copias de la misma pasada.
     */
    async crearDocumento(type) {
        const result = await this.generatePDF(type);
        if (!result) return null;

        const { pdfDoc, filename } = result;
        const { blob } = await pdfGenerator.savePDF(pdfDoc, filename);

        // Archivar no puede tumbar la accion que el oficial pidio: si falla
        // el guardado, el PDF sigue estando para verlo o mandarlo.
        try {
            await this.saveDailyReport(type, pdfDoc, filename, { silencioso: true });
        } catch (e) {
            console.error('No se pudo archivar el documento:', e);
        }

        return { pdfDoc, filename, blob };
    }

    async previewPDF(type) {
        try {
            const doc = await this.crearDocumento(type);
            if (!doc) return;

            const { pdfDoc, filename, blob } = doc;

            await this.mostrarPrevia(blob, filename, pdfDoc);

        } catch (error) {
            console.error('Preview error:', error);
            this.showToast('Error generating preview', 'error');
        }
    }

    async sharePDF(type) {
        try {
            const doc = await this.crearDocumento(type);
            if (!doc) return;

            const { filename, blob } = doc;

            const res = await window.PTOut.compartir([{ blob, nombre: filename }], { asunto: filename });
            this.showToast(res.via === 'descarga'
                ? 'PDF downloaded · saved in Daily Reports'
                : 'PDF shared · saved in Daily Reports', 'success');

        } catch (error) {
            if (error && (error.name === 'AbortError' || /cancel/i.test(error.message || ''))) return;
            console.error('Share error:', error);
            this.showToast('Error sharing PDF', 'error');
        }
    }

    async downloadPDF(type) {
        try {
            const doc = await this.crearDocumento(type);
            if (!doc) return;

            const { filename, blob } = doc;

            const res = await window.PTOut.descargar([{ blob, nombre: filename }]);
            this.showToast(`Saved to ${res.donde} · and in Daily Reports`, 'success');

        } catch (error) {
            console.error('Download error:', error);
            this.showToast('Error downloading PDF', 'error');
        }
    }

    closeModal() {
        const modal = document.getElementById('pdf-preview-modal');
        modal.classList.remove('active');

        // Libera los canvas y el documento de pdf.js: un PMCS con fotos son
        // varias paginas a resolucion de pantalla, y quedarse con ellas
        // abiertas acaba tirando el WebView.
        if (window.PTPdfView) window.PTPdfView.cerrar();

        this.currentPDF = null;
    }

    async shareFromModal() {
        if (!this.currentPDF) return;
        try {
            const { blob, filename } = this.currentPDF;
            const res = await window.PTOut.compartir([{ blob, nombre: filename }], { asunto: filename });
            this.showToast(res.via === 'descarga' ? 'Downloaded' : 'Shared', 'success');
        } catch (error) {
            if (error && (error.name === 'AbortError' || /cancel/i.test(error.message || ''))) return;
            console.error('Share error:', error);
            this.showToast('Error sharing', 'error');
        }
    }

    async downloadFromModal() {
        if (!this.currentPDF) return;
        try {
            const { blob, filename } = this.currentPDF;
            const res = await window.PTOut.descargar([{ blob, nombre: filename }]);
            this.showToast(`Saved to ${res.donde} · and in Daily Reports`, 'success');
        } catch (error) {
            console.error('Download error:', error);
            this.showToast('Error downloading', 'error');
        }
    }

    /* ============================================
       UTILIDADES
       ============================================ */
    updateDateDisplay() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const dayEl = document.getElementById('current-day');
        const dateEl = document.getElementById('current-date');
        
        if (dayEl) dayEl.textContent = days[now.getDay()];
        if (dateEl) dateEl.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }

    showLoading(show) {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.toggle('active', show);
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    loadSavedData() {
        try {
            const data = localStorage.getItem('policeToolsData');
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    }

    saveData(key, value) {
        this.savedData[key] = value;
        this.saveAllData();
    }

    saveAllData() {
        try {
            localStorage.setItem('policeToolsData', JSON.stringify(this.savedData));
        } catch (e) {
            console.warn('Could not save data:', e);
        }
    }

    /* ============================================
       MENU DROPDOWN
       ============================================ */
    setupMenuDropdown() {
        const menuBtn = document.getElementById('menu-btn');
        const menuDropdown = document.getElementById('menu-dropdown');
        const menuSettings = document.getElementById('menu-settings');
        const menuJournal = document.getElementById('menu-journal');
        
        if (!menuBtn || !menuDropdown) return;
        
        // Toggle menu dropdown
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
                menuDropdown.classList.remove('active');
            }
        });
        
        // Settings option
        if (menuSettings) {
            menuSettings.addEventListener('click', () => {
                menuDropdown.classList.remove('active');
                this.openTab('settings');
            });
        }
        
        // Personal Journal option
        if (menuJournal) {
            menuJournal.addEventListener('click', () => {
                menuDropdown.classList.remove('active');
                this.openTab('journal');
                this.renderJournalEntries();
            });
        }
    }

    /* ============================================
       NOTIFICATIONS SYSTEM
       ============================================ */
    setupNotifications() {
        this.notifications = this.loadNotifications();
        this.renderNotifications();
        this.updateNotificationBadge();
        
        // Request push notification permission
        this.requestPushPermission();
        
        const notificationsBtn = document.getElementById('notifications-btn');
        const notificationsPanel = document.getElementById('notifications-panel');
        const markAllReadBtn = document.getElementById('mark-all-read');
        const clearAllBtn = document.getElementById('clear-all-notifications');
        const addTestBtn = document.getElementById('add-test-notification');
        const createNotifBtn = document.getElementById('create-notification');
        
        if (!notificationsBtn || !notificationsPanel) return;
        
        // Toggle notifications panel
        notificationsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsPanel.classList.toggle('active');
            this.closeMenuDropdown();
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationsPanel.contains(e.target) && !notificationsBtn.contains(e.target)) {
                notificationsPanel.classList.remove('active');
            }
        });
        
        // Mark all as read
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.notifications.forEach(n => n.read = true);
                this.saveNotifications();
                this.renderNotifications();
                this.updateNotificationBadge();
            });
        }
        
        // Clear all notifications
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                this.notifications = [];
                this.saveNotifications();
                this.renderNotifications();
                this.updateNotificationBadge();
            });
        }
        
        // Add test notification
        if (addTestBtn) {
            addTestBtn.addEventListener('click', () => {
                const testTypes = [
                    { type: 'shift', title: 'Shift Reminder', message: 'Night Shift starts in 30 minutes (22:00)' },
                    { type: 'form', title: 'Pending Form', message: 'Interview Worksheet - Morales, V. pending submission' },
                    { type: 'alert', title: 'Daily Report Alert', message: 'Daily Report 03/20/2026 is incomplete' },
                    { type: 'info', title: 'System Update', message: 'New features available in Police Tools' }
                ];
                const randomType = testTypes[Math.floor(Math.random() * testTypes.length)];
                this.addNotification(randomType.type, randomType.title, randomType.message);
            });
        }
        
        // Create custom notification
        if (createNotifBtn) {
            createNotifBtn.addEventListener('click', () => {
                const titleInput = document.getElementById('notif-title');
                const messageInput = document.getElementById('notif-message');
                const title = titleInput?.value?.trim();
                const message = messageInput?.value?.trim();
                
                if (title && message) {
                    this.addNotification('custom', title, message);
                    if (titleInput) titleInput.value = '';
                    if (messageInput) messageInput.value = '';
                    this.showToast('Notification created!', 'success');
                } else {
                    this.showToast('Please enter title and message', 'error');
                }
            });
        }
        
        // Add some default notifications if empty
        if (this.notifications.length === 0) {
            this.addNotification('shift', 'Shift Reminder', 'Mid Shift starts in 30 minutes (17:30)', false);
            this.addNotification('form', 'Pending Form', '2 Interview Worksheets pending submission', false);
        }
    }
    
    async requestPushPermission() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            try {
                const permission = await Notification.requestPermission();
                console.log('Push notification permission:', permission);
            } catch (e) {
                console.warn('Could not request push permission:', e);
            }
        }
    }
    
    sendPushNotification(title, message) {
        // Vibrate device
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }
        
        // Play sound
        this.playNotificationSound();
        
        // Show native notification if permitted and app is in background
        if ('Notification' in window && Notification.permission === 'granted') {
            try {
                new Notification(title, {
                    body: message,
                    icon: '/assets/icon-192x192.png',
                    badge: '/assets/icon-72x72.png',
                    tag: 'police-tools-' + Date.now()
                });
            } catch (e) {
                console.warn('Could not show push notification:', e);
            }
        }
    }
    
    playNotificationSound() {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanu8LdnGgU1k9n1unEiBC13yO/eizEIHWq+8+OZSA0PVantu6tlHAU2k9n1uHAiBCx2xPDdijAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCx2xO/eizAIHGm+8+OWSQ4OTqzs8blnHAU1k9r1uHAiBCiB');
            audio.volume = 0.5;
            audio.play().catch(() => {});
        } catch (e) {}
    }
    
    closeMenuDropdown() {
        const menuDropdown = document.getElementById('menu-dropdown');
        if (menuDropdown) {
            menuDropdown.classList.remove('active');
        }
    }
    
    loadNotifications() {
        try {
            const data = localStorage.getItem('policeToolsNotifications');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }
    
    saveNotifications() {
        try {
            localStorage.setItem('policeToolsNotifications', JSON.stringify(this.notifications));
        } catch (e) {
            console.warn('Could not save notifications:', e);
        }
    }
    
    addNotification(type, title, message, read = false) {
        const notification = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            type,
            title,
            message,
            read,
            timestamp: new Date().toISOString()
        };
        
        this.notifications.unshift(notification);
        this.saveNotifications();
        this.renderNotifications();
        this.updateNotificationBadge();
        
        // Send push notification and vibrate
        if (!read) {
            this.sendPushNotification(title, message);
        }
        
        return notification;
    }
    
    deleteNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveNotifications();
        this.renderNotifications();
        this.updateNotificationBadge();
    }
    
    markNotificationRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.renderNotifications();
            this.updateNotificationBadge();
        }
    }
    
    updateNotificationBadge() {
        const badge = document.getElementById('notification-badge');
        if (!badge) return;
        
        const unreadCount = this.notifications.filter(n => !n.read).length;
        
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    renderNotifications() {
        const list = document.getElementById('notifications-list');
        if (!list) return;
        
        if (this.notifications.length === 0) {
            list.innerHTML = `
                <div class="notifications-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <p>No notifications yet</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = this.notifications.map(n => {
            const timeAgo = this.getTimeAgo(n.timestamp);
            const iconSvg = this.getNotificationIcon(n.type);
            
            return `
                <div class="notification-item ${n.read ? 'read' : 'unread'}" data-id="${n.id}">
                    <div class="notification-icon ${n.type}">
                        ${iconSvg}
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">${this.escapeHtml(n.title)}</div>
                        <div class="notification-message">${this.escapeHtml(n.message)}</div>
                        <div class="notification-time">${timeAgo}</div>
                    </div>
                    <button class="notification-delete" data-id="${n.id}" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            `;
        }).join('');
        
        // Add click handlers
        list.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.notification-delete')) {
                    const id = item.dataset.id;
                    this.markNotificationRead(id);
                }
            });
        });
        
        list.querySelectorAll('.notification-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.deleteNotification(id);
            });
        });
    }
    
    getNotificationIcon(type) {
        const icons = {
            shift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
            form: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
            alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        return icons[type] || icons.info;
    }
    
    getTimeAgo(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /* ============================================
       PANAMA SCHEDULE - 2-2-3-3 Shift System
       ============================================ */
    setupPanamaSchedule() {
        // Load saved configuration
        this.panamaConfig = this.loadPanamaConfig();
        this.panamaCurrentMonth = new Date();
        
        // Setup menu item click
        const menuPanama = document.getElementById('menu-panama');
        if (menuPanama) {
            menuPanama.addEventListener('click', () => {
                document.getElementById('menu-dropdown')?.classList.remove('active');
                this.openTab('panama');
                this.refrescarPanama();
            });
        }
        
        // Setup configuration form
        this.setupPanamaConfigForm();
        
        // Setup calendar navigation
        this.setupPanamaCalendarNav();
        
        // Update main menu badge if configured
        this.updateMainMenuPanamaBadge();
    }
    
    loadPanamaConfig() {
        try {
            const data = localStorage.getItem('policeToolsPanamaConfig');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }
    
    savePanamaConfig(config) {
        try {
            localStorage.setItem('policeToolsPanamaConfig', JSON.stringify(config));
            this.panamaConfig = config;
        } catch (e) {
            console.warn('Could not save Panama config:', e);
        }
    }
    
    setupPanamaConfigForm() {
        const saveBtn = document.getElementById('save-panama-config');
        const startDateInput = document.getElementById('panama-start-date');
        const startStatusSelect = document.getElementById('panama-start-status');
        const initialShiftSelect = document.getElementById('panama-initial-shift');
        const autoRotateCheckbox = document.getElementById('panama-auto-rotate');
        const editPatternBtn = document.getElementById('edit-panama-pattern');
        
        // Load existing config
        if (this.panamaConfig) {
            if (startDateInput) startDateInput.value = this.panamaConfig.startDate;
            if (startStatusSelect) startStatusSelect.value = this.panamaConfig.startStatus || 'off';
            if (initialShiftSelect) initialShiftSelect.value = this.panamaConfig.initialShift;
            if (autoRotateCheckbox) autoRotateCheckbox.checked = this.panamaConfig.autoRotate;
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const nuevaFecha = startDateInput?.value;
                // Cambiar la fecha de inicio mueve el origen del ciclo, asi
                // que el desfase que se cuadro sobre el calendario deja de
                // valer. Si la fecha no cambia, se conserva: si no, guardar
                // cualquier ajuste descuadraba el horario otra vez.
                const mismaFecha = nuevaFecha === this.panamaConfig?.startDate;

                const config = {
                    startDate: nuevaFecha,
                    startStatus: startStatusSelect?.value || 'off',
                    initialShift: initialShiftSelect?.value || 'day',
                    autoRotate: autoRotateCheckbox?.checked ?? true,
                    customPattern: this.panamaConfig?.customPattern || null,
                    phase: mismaFecha ? (this.panamaConfig?.phase || 0) : 0
                };

                if (!config.startDate) {
                    this.showToast('Please select a start date', 'error');
                    return;
                }

                this.savePanamaConfig(config);
                this.refrescarPanama();
                this.showToast('Panama Schedule saved!', 'success');
            });
        }
        
        // Edit pattern button
        if (editPatternBtn) {
            editPatternBtn.addEventListener('click', () => {
                this.showPatternEditor();
            });
        }
        
        // Setup pattern editor
        this.setupPatternEditor();
    }
    
    setupPatternEditor() {
        const savePatternBtn = document.getElementById('save-pattern');
        const cancelPatternBtn = document.getElementById('cancel-pattern');
        const resetPatternBtn = document.getElementById('reset-pattern');
        
        if (savePatternBtn) {
            savePatternBtn.addEventListener('click', () => {
                this.saveCustomPattern();
            });
        }
        
        if (cancelPatternBtn) {
            cancelPatternBtn.addEventListener('click', () => {
                this.hidePatternEditor();
            });
        }
        
        if (resetPatternBtn) {
            resetPatternBtn.addEventListener('click', () => {
                this.resetPatternToDefault();
            });
        }
    }
    
    showPatternEditor() {
        const configSection = document.getElementById('panama-config');
        const editSection = document.getElementById('panama-edit-pattern');
        
        if (configSection && editSection) {
            configSection.style.display = 'none';
            editSection.style.display = 'block';
            this.renderPatternEditGrid();
        }
    }
    
    hidePatternEditor() {
        const configSection = document.getElementById('panama-config');
        const editSection = document.getElementById('panama-edit-pattern');
        
        if (configSection && editSection) {
            configSection.style.display = 'block';
            editSection.style.display = 'none';
        }
    }
    
    renderPatternEditGrid() {
        const grid = document.getElementById('pattern-edit-grid');
        if (!grid) return;
        
        // Default pattern: OFF, ON, ON, OFF, OFF, ON, ON, ON, OFF, OFF, ON, ON, OFF, OFF
        const defaultPattern = [false, true, true, false, false, true, true, true, false, false, true, true, false, false];
        const customPattern = this.panamaConfig?.customPattern;
        const pattern = customPattern || defaultPattern;
        
        const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        grid.innerHTML = pattern.map((isOn, index) => `
            <div class="pattern-edit-day ${isOn ? 'on' : 'off'}" data-index="${index}">
                <span class="day-label">${dayLabels[index]}</span>
                <span class="day-status">${isOn ? 'ON' : 'OFF'}</span>
            </div>
        `).join('');
        
        // Add click handlers
        grid.querySelectorAll('.pattern-edit-day').forEach(day => {
            day.addEventListener('click', () => {
                const index = parseInt(day.dataset.index);
                pattern[index] = !pattern[index];
                day.className = `pattern-edit-day ${pattern[index] ? 'on' : 'off'}`;
                day.querySelector('.day-status').textContent = pattern[index] ? 'ON' : 'OFF';
            });
        });
        
        this.currentEditPattern = pattern;
    }
    
    saveCustomPattern() {
        if (!this.panamaConfig) {
            this.panamaConfig = {};
        }
        this.panamaConfig.customPattern = this.currentEditPattern;
        this.savePanamaConfig(this.panamaConfig);
        this.hidePatternEditor();
        this.refrescarPanama();
        this.showToast('Custom pattern saved!', 'success');
    }
    
    resetPatternToDefault() {
        const defaultPattern = [false, true, true, false, false, true, true, true, false, false, true, true, false, false];
        this.currentEditPattern = defaultPattern;
        this.renderPatternEditGrid();
        this.showToast('Pattern reset to default', 'info');
    }
    
    /* ============================================
       CUADRAR EL HORARIO
       ============================================
       Marcando dos o tres dias que uno sabe que trabaja, la app deduce la
       fase en vez de que haya que adivinarla desde la configuracion. */

    iniciarCuadrePanama() {
        if (!this.panamaConfig?.startDate) {
            this.showToast('Set the start date first', 'warning');
            return;
        }
        this.cuadrandoPanama = true;
        this.marcasPanama = {};
        this.renderPanamaCalendar();
        this.renderCuadrePanama();
    }

    cancelarCuadrePanama() {
        this.cuadrandoPanama = false;
        this.marcasPanama = {};
        this.renderPanamaCalendar();
        this.renderCuadrePanama();
    }

    /** Sin marca -> trabajo -> libre -> sin marca. */
    marcarDiaPanama(iso) {
        if (!this.cuadrandoPanama) return;
        if (!this.marcasPanama) this.marcasPanama = {};

        const actual = this.marcasPanama[iso];
        if (actual === undefined) this.marcasPanama[iso] = true;
        else if (actual === true) this.marcasPanama[iso] = false;
        else delete this.marcasPanama[iso];

        window.PoliceToolsMobile?.haptics.tap();
        this.renderPanamaCalendar();
        this.renderCuadrePanama();
    }

    aplicarCuadrePanama() {
        const mejor = this.cuadrarPatron(this.marcasPanama);
        if (!mejor) return;

        this.panamaConfig.phase = mejor.desfase;
        this.panamaConfig.startStatus = mejor.estado;
        this.savePanamaConfig(this.panamaConfig);

        this.cuadrandoPanama = false;
        this.marcasPanama = {};

        this.refrescarPanama();

        this.showToast(
            mejor.aciertos === mejor.total
                ? 'Schedule matched'
                : `Best fit: ${mejor.aciertos} of ${mejor.total} days`,
            mejor.aciertos === mejor.total ? 'success' : 'warning'
        );
    }

    renderCuadrePanama() {
        const caja = document.getElementById('panama-match');
        if (!caja) return;

        if (!this.cuadrandoPanama) {
            caja.innerHTML = `
                <p class="pm-help">Calendar not matching your real rotation? Mark a few days
                you actually work and the app will line the cycle up.</p>
                <button type="button" class="btn btn-secondary" id="pm-start">Match my schedule</button>
            `;
            caja.querySelector('#pm-start').addEventListener('click', () => this.iniciarCuadrePanama());
            return;
        }

        const marcas = Object.entries(this.marcasPanama || {});
        const trabaja = marcas.filter(([, v]) => v === true).length;
        const libre = marcas.filter(([, v]) => v === false).length;
        const mejor = marcas.length ? this.cuadrarPatron(this.marcasPanama) : null;

        caja.innerHTML = `
            <p class="pm-help"><b>Tap the days above.</b> Once for a day you work,
            twice for a day off, three times to clear it. Two or three days is enough.</p>
            <p class="pm-count">${trabaja} working · ${libre} off marked${
                mejor ? ` — best fit matches ${mejor.aciertos} of ${mejor.total}` : ''}</p>
            <button type="button" class="btn btn-primary" id="pm-apply" ${marcas.length ? '' : 'disabled'}>Apply</button>
            <button type="button" class="btn btn-secondary" id="pm-cancel">Cancel</button>
        `;
        caja.querySelector('#pm-apply').addEventListener('click', () => this.aplicarCuadrePanama());
        caja.querySelector('#pm-cancel').addEventListener('click', () => this.cancelarCuadrePanama());
    }

    /** Corre el ciclo un dia, para el ajuste fino. */
    desplazarPanama(dias) {
        if (!this.panamaConfig?.startDate) return;
        const largo = (this.panamaConfig.customPattern || PoliceToolsApp.PATRON_PANAMA).length || 14;
        this.panamaConfig.phase = ((((Number(this.panamaConfig.phase) || 0) + dias) % largo) + largo) % largo;
        this.savePanamaConfig(this.panamaConfig);
        this.refrescarPanama();
    }

    /**
     * Todo lo que depende de la fase, en un solo sitio.
     *
     * Estaba repartido y a medias: cuadrar el horario o correrlo un dia
     * repintaba el calendario pero no "Today's Status" ni "Next shift", que
     * seguian contestando con la fase anterior. De ahi que el calendario
     * dijera que el proximo turno era el miercoles y el panel de abajo
     * dijera martes —el descuadre no estaba en el patron, sino en que media
     * pantalla no se habia enterado del cambio.
     *
     * La llamada era `this.renderPanamaToday?.()`, y ese metodo no existe:
     * el ?. se tragaba la falta sin decir nada. Aqui va el nombre real.
     */
    refrescarPanama() {
        this.renderPanamaCalendar();
        this.renderCuadrePanama();
        this.updatePanamaTodayStatus();
        this.updateMainMenuPanamaBadge();
        this.renderCalendar();
        document.dispatchEvent(new CustomEvent('shiftschanged'));
    }

    setupPanamaCalendarNav() {
        document.getElementById('pm-back')?.addEventListener('click', () => this.desplazarPanama(-1));
        document.getElementById('pm-fwd')?.addEventListener('click', () => this.desplazarPanama(1));
        this.renderCuadrePanama();

        const prevBtn = document.getElementById('panama-prev-month');
        const nextBtn = document.getElementById('panama-next-month');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.panamaCurrentMonth.setMonth(this.panamaCurrentMonth.getMonth() - 1);
                this.renderPanamaCalendar();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.panamaCurrentMonth.setMonth(this.panamaCurrentMonth.getMonth() + 1);
                this.renderPanamaCalendar();
            });
        }
    }
    
    // Calculate shift for a specific date based on REAL Panama 12-hour shift pattern
    // User's 2-week pattern (14-day cycle):
    // Week 1: OFF, ON, ON, OFF, OFF, ON, ON
    // Week 2: ON, OFF, OFF, ON, ON, OFF, OFF
    /* ============================================
       PATRON DE PANAMA (2-2-3)
       ============================================ */

    /** OFF, ON, ON, OFF, OFF, ON, ON, ON, OFF, OFF, ON, ON, OFF, OFF */
    static get PATRON_PANAMA() {
        return [false, true, true, false, false, true, true, true, false, false, true, true, false, false];
    }

    /**
     * 'YYYY-MM-DD' a fecha local.
     *
     * new Date('2026-08-19') se interpreta como medianoche UTC, que en Puerto
     * Rico (UTC-4) es el 18 a las 20:00; el setHours(0,0,0,0) que venia
     * despues lo dejaba en el dia 18. El ciclo entero arrancaba un dia antes,
     * asi que marcar "el 19 fue OFF" pintaba el 19 como ON y no habia forma
     * de cuadrar el calendario.
     */
    fechaLocal(iso) {
        const [y, m, d] = String(iso).split('-').map(Number);
        return new Date(y, (m || 1) - 1, d || 1);
    }

    /** Dias enteros entre dos fechas, sin que el horario de verano descuadre. */
    diasEntre(desde, hasta) {
        const a = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate());
        const b = new Date(hasta.getFullYear(), hasta.getMonth(), hasta.getDate());
        return Math.round((b - a) / 86400000);
    }

    getPanamaShiftForDate(date) {
        if (!this.panamaConfig?.startDate) return null;

        const startDate = this.fechaLocal(this.panamaConfig.startDate);
        const targetDate = new Date(date);

        const diffDays = this.diasEntre(startDate, targetDate);

        // Antes del inicio el patron tambien vale: el ciclo se repite hacia
        // atras igual que hacia delante, y asi se puede mirar un mes pasado.
        const pattern = this.panamaConfig.customPattern || PoliceToolsApp.PATRON_PANAMA;
        const largo = pattern.length || 14;

        /*
         * Desfase del ciclo.
         *
         * "Ese dia fue OFF" no basta para situar el ciclo: en un 2-2-3 hay
         * siete posiciones libres y siete de trabajo, asi que decir OFF deja
         * siete fases posibles y la app elegia una. De ahi que el calendario
         * no cuadrara aunque la fecha fuera correcta. phase guarda la que el
         * oficial ajusto sobre el calendario.
         */
        const desfase = Number(this.panamaConfig.phase) || 0;

        // El modulo de un negativo en JavaScript es negativo
        const cyclePosition = (((diffDays + desfase) % largo) + largo) % largo;

        const startStatus = this.panamaConfig.startStatus || 'off';
        // Empezar en ON es la rotacion de la otra dotacion, que es el mismo
        // 2-2-3 desplazado, no un patron distinto.
        const enPos = (pos) => {
            const p = (((pos % largo) + largo) % largo);
            return startStatus === 'off' ? pattern[p] : !pattern[p];
        };

        if (!enPos(cyclePosition)) return { type: 'off', shift: null };

        /*
         * El turno lo decide el primer dia del bloque, no cada dia por su
         * cuenta.
         *
         * La rotacion cambia al entrar en un mes nuevo, y un bloque de tres
         * dias puede cruzar el 1: el calendario pintaba el 31 de noche y el 1
         * y el 2 de dia, partiendo en dos colores un bloque que se trabaja
         * seguido. Nadie cambia de noche a dia a mitad de tanda.
         */
        let atras = 0;
        while (atras < largo && enPos(cyclePosition - atras - 1)) atras++;

        const inicioBloque = new Date(targetDate);
        inicioBloque.setDate(inicioBloque.getDate() - atras);

        return { type: 'on', shift: this.turnoPanamaDe(inicioBloque) };
    }

    /**
     * Dia o noche. La rotacion iba con Math.floor(diffDays / 60): 60 dias no
     * son dos meses, asi que el cambio se iba adelantando un poco cada vuelta
     * y acababa cayendo a mitad de mes. Se cuenta por meses de calendario.
     */
    turnoPanamaDe(fecha) {
        const inicial = this.panamaConfig?.initialShift === 'night' ? 'night' : 'day';
        if (!this.panamaConfig?.autoRotate) return inicial;

        const inicio = this.fechaLocal(this.panamaConfig.startDate);
        const meses = (fecha.getFullYear() - inicio.getFullYear()) * 12
                    + (fecha.getMonth() - inicio.getMonth());

        // Bloques de dos meses, tambien hacia atras
        const bloque = Math.floor(meses / 2);
        const cambia = ((bloque % 2) + 2) % 2 === 1;

        return cambia ? (inicial === 'day' ? 'night' : 'day') : inicial;
    }

    /**
     * Busca el desfase que mejor encaja con los dias que el oficial marco
     * sobre el calendario.
     *
     * Es lo que hace que el horario se pueda cuadrar: en vez de adivinar la
     * fase, se tocan dos o tres dias que uno sabe que trabaja y la app prueba
     * las 28 combinaciones (14 desfases x empezar en ON u OFF) y se queda con
     * la que acierta en mas.
     *
     * marcas: { 'YYYY-MM-DD': true si se trabaja }
     */
    cuadrarPatron(marcas) {
        const entradas = Object.entries(marcas || {});
        if (!entradas.length || !this.panamaConfig?.startDate) return null;

        const pattern = this.panamaConfig.customPattern || PoliceToolsApp.PATRON_PANAMA;
        const largo = pattern.length || 14;
        const inicio = this.fechaLocal(this.panamaConfig.startDate);

        let mejor = null;
        for (const estado of ['off', 'on']) {
            for (let desfase = 0; desfase < largo; desfase++) {
                let aciertos = 0;
                for (const [iso, trabaja] of entradas) {
                    const dias = this.diasEntre(inicio, this.fechaLocal(iso));
                    const pos = (((dias + desfase) % largo) + largo) % largo;
                    const on = estado === 'off' ? pattern[pos] : !pattern[pos];
                    if (!!on === !!trabaja) aciertos++;
                }
                if (!mejor || aciertos > mejor.aciertos) {
                    mejor = { desfase, estado, aciertos, total: entradas.length };
                }
            }
        }
        return mejor;
    }


    renderPanamaCalendar() {
        const monthYearEl = document.getElementById('panama-month-year');
        const daysContainer = document.getElementById('panama-calendar-days');
        
        if (!monthYearEl || !daysContainer) return;
        
        const year = this.panamaCurrentMonth.getFullYear();
        const month = this.panamaCurrentMonth.getMonth();
        
        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearEl.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Get today's date for highlighting
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        
        let html = '';
        
        // Previous month days (for padding)
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const date = new Date(year, month - 1, day);
            const shift = this.getPanamaShiftForDate(date);
            html += this.renderCalendarDay(day, shift, true, false);
        }
        
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const shift = this.getPanamaShiftForDate(date);
            const isToday = isCurrentMonth && today.getDate() === day;
            const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            html += this.renderCalendarDay(day, shift, false, isToday, iso);
        }

        // Solo lo justo para cerrar la ultima semana. Rellenar siempre hasta
        // 42 casillas añadia una fila entera del mes siguiente en los meses
        // que caben en cinco, y esa fila de mas es la que hacia que el
        // calendario pareciera descuadrado.
        const usadas = firstDay + daysInMonth;
        const remainingCells = (7 - (usadas % 7)) % 7;
        for (let day = 1; day <= remainingCells; day++) {
            const date = new Date(year, month + 1, day);
            const shift = this.getPanamaShiftForDate(date);
            html += this.renderCalendarDay(day, shift, true, false);
        }

        daysContainer.innerHTML = html;

        // En modo cuadrar, tocar un dia dice si de verdad se trabaja
        if (this.cuadrandoPanama) {
            daysContainer.querySelectorAll('.calendar-day[data-iso]').forEach(el => {
                el.addEventListener('click', () => this.marcarDiaPanama(el.dataset.iso));
            });
        }
    }

    renderCalendarDay(day, shift, isOtherMonth, isToday, iso = null) {
        let className = 'calendar-day';
        let icon = '';

        if (isOtherMonth) className += ' other-month';
        if (isToday) className += ' today';

        if (shift?.type === 'on') {
            if (shift.shift === 'day') {
                className += ' on-day';
                icon = '☀';
            } else {
                className += ' on-night';
                icon = '🌙';
            }
        } else {
            className += ' off';
        }

        // Marcas que el oficial puso al cuadrar el horario
        const marca = iso && this.marcasPanama ? this.marcasPanama[iso] : undefined;
        if (marca === true) className += ' marca-on';
        if (marca === false) className += ' marca-off';
        if (this.cuadrandoPanama && iso) className += ' cuadrable';

        return `
            <div class="${className}"${iso ? ` data-iso="${iso}"` : ''}>
                <span class="day-number">${day}</span>
                ${icon ? `<span class="day-shift-icon">${icon}</span>` : ''}
            </div>
        `;
    }
    
    updatePanamaTodayStatus() {
        const statusCard = document.getElementById('panama-status-card');
        const statusIcon = document.getElementById('today-status-icon');
        const statusTitle = document.getElementById('today-status-title');
        const statusShift = document.getElementById('today-status-shift');
        const nextShiftInfo = document.getElementById('next-shift-info');
        
        if (!this.panamaConfig?.startDate) {
            if (statusTitle) statusTitle.textContent = 'Not Configured';
            if (statusShift) statusShift.textContent = 'Set up your schedule below';
            if (statusIcon) statusIcon.textContent = '⚙️';
            if (nextShiftInfo) nextShiftInfo.innerHTML = '<span>Configure your Panama Schedule to see your shifts</span>';
            return;
        }
        
        const today = new Date();
        const shift = this.getPanamaShiftForDate(today);
        
        if (shift?.type === 'on') {
            const isDay = shift.shift === 'day';
            if (statusCard) statusCard.className = 'panama-status-card ' + (isDay ? 'on-day' : 'on-night');
            if (statusIcon) statusIcon.textContent = isDay ? '☀️' : '🌙';
            if (statusTitle) statusTitle.textContent = 'ON DUTY';
            if (statusShift) statusShift.textContent = isDay ? 'Day Shift (06:00-18:00)' : 'Night Shift (18:00-06:00)';
        } else {
            if (statusCard) statusCard.className = 'panama-status-card off-day';
            if (statusIcon) statusIcon.textContent = '⚪';
            if (statusTitle) statusTitle.textContent = 'OFF';
            if (statusShift) statusShift.textContent = 'Rest Day - Enjoy your time off!';
        }
        
        // Find next shift
        this.updateNextShiftInfo(nextShiftInfo);
    }
    
    updateNextShiftInfo(element) {
        if (!element || !this.panamaConfig?.startDate) return;
        
        const today = new Date();
        let nextShiftDate = null;
        let nextShiftType = null;
        
        // Look ahead up to 10 days
        for (let i = 1; i <= 10; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() + i);
            const shift = this.getPanamaShiftForDate(checkDate);
            
            if (shift?.type === 'on') {
                nextShiftDate = checkDate;
                nextShiftType = shift.shift;
                break;
            }
        }
        
        if (nextShiftDate) {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[nextShiftDate.getDay()];
            const shiftName = nextShiftType === 'day' ? 'Day Shift' : 'Night Shift';
            element.innerHTML = `<span>Next shift: <strong>${dayName} - ${shiftName}</strong></span>`;
        } else {
            element.innerHTML = '<span>No upcoming shifts found</span>';
        }
    }
    
    updateMainMenuPanamaBadge() {
        // Update the shift badge in main menu if Panama is configured
        const badgeContainer = document.querySelector('.shift-badge-container');
        if (!badgeContainer || !this.panamaConfig?.startDate) return;
        
        const today = new Date();
        const shift = this.getPanamaShiftForDate(today);
        
        const badge = badgeContainer.querySelector('.shift-badge-pill');
        if (badge && shift?.type === 'on') {
            const shiftName = shift.shift === 'day' ? 'Day' : 'Night';
            badge.textContent = `${shiftName} Shift`;
            badge.className = 'shift-badge-pill ' + (shift.shift === 'night' ? 'night' : '');
        }
    }

    /* ============================================
       PERSONAL JOURNAL
       ============================================ */
    setupPersonalJournal() {
        this.journalEntries = this.loadJournalEntries();
        
        // Setup save button
        const saveBtn = document.getElementById('save-journal-entry');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveJournalEntry());
        }
        
        // Setup filter buttons
        const applyFilterBtn = document.getElementById('apply-journal-filter');
        const clearFilterBtn = document.getElementById('clear-journal-filter');
        
        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', () => this.applyJournalFilter());
        }
        
        if (clearFilterBtn) {
            clearFilterBtn.addEventListener('click', () => this.clearJournalFilter());
        }
        
        // Setup generate document button
        const generateDocBtn = document.getElementById('generate-journal-doc');
        if (generateDocBtn) {
            generateDocBtn.addEventListener('click', () => this.generateJournalDocument());
        }
    }
    
    loadJournalEntries() {
        try {
            const data = localStorage.getItem('policeToolsJournal');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }
    
    saveJournalEntries() {
        try {
            localStorage.setItem('policeToolsJournal', JSON.stringify(this.journalEntries));
        } catch (e) {
            console.warn('Could not save journal entries:', e);
        }
    }
    
    saveJournalEntry() {
        const textInput = document.getElementById('journal-entry-text');
        const text = textInput?.value?.trim();
        
        if (!text) {
            this.showToast('Please write something', 'error');
            return;
        }
        
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            text: text,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        this.journalEntries.unshift(entry);
        this.saveJournalEntries();
        this.renderJournalEntries();
        
        if (textInput) textInput.value = '';
        this.showToast('Entry saved!', 'success');
    }
    
    deleteJournalEntry(id) {
        this.journalEntries = this.journalEntries.filter(e => e.id !== id);
        this.saveJournalEntries();
        this.renderJournalEntries();
        this.showToast('Entry deleted', 'info');
    }
    
    applyJournalFilter() {
        const fromInput = document.getElementById('journal-filter-from');
        const toInput = document.getElementById('journal-filter-to');
        
        const fromDate = fromInput?.value ? new Date(fromInput.value) : null;
        const toDate = toInput?.value ? new Date(toInput.value) : null;
        
        this.renderJournalEntries(fromDate, toDate);
    }
    
    clearJournalFilter() {
        const fromInput = document.getElementById('journal-filter-from');
        const toInput = document.getElementById('journal-filter-to');
        
        if (fromInput) fromInput.value = '';
        if (toInput) toInput.value = '';
        
        this.renderJournalEntries();
    }
    
    renderJournalEntries(fromDate = null, toDate = null) {
        const list = document.getElementById('journal-entries-list');
        const countEl = document.getElementById('journal-count');
        
        if (!list) return;
        
        let entries = this.journalEntries;
        
        // Apply date filter
        if (fromDate || toDate) {
            entries = entries.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                if (fromDate && entryDate < fromDate) return false;
                if (toDate) {
                    const toDateEnd = new Date(toDate);
                    toDateEnd.setHours(23, 59, 59, 999);
                    if (entryDate > toDateEnd) return false;
                }
                return true;
            });
        }
        
        // Update count
        if (countEl) {
            countEl.textContent = `(${entries.length})`;
        }
        
        if (entries.length === 0) {
            list.innerHTML = `
                <div class="journal-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <p>No entries yet</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = entries.map(entry => `
            <div class="journal-entry" data-id="${entry.id}">
                <div class="journal-entry-header">
                    <span class="journal-entry-date">${entry.date} at ${entry.time}</span>
                    <button class="journal-entry-delete" data-id="${entry.id}" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="journal-entry-text">${this.escapeHtml(entry.text)}</div>
            </div>
        `).join('');
        
        // Add delete handlers
        list.querySelectorAll('.journal-entry-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                this.deleteJournalEntry(id);
            });
        });
    }
    
    async generateJournalDocument() {
        const fromInput = document.getElementById('journal-filter-from');
        const toInput = document.getElementById('journal-filter-to');
        
        const fromDate = fromInput?.value ? new Date(fromInput.value) : null;
        const toDate = toInput?.value ? new Date(toInput.value) : null;
        
        let entries = this.journalEntries;
        
        // Apply date filter
        if (fromDate || toDate) {
            entries = entries.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                if (fromDate && entryDate < fromDate) return false;
                if (toDate) {
                    const toDateEnd = new Date(toDate);
                    toDateEnd.setHours(23, 59, 59, 999);
                    if (entryDate > toDateEnd) return false;
                }
                return true;
            });
        }
        
        if (entries.length === 0) {
            this.showToast('No entries to generate document', 'error');
            return;
        }
        
        // Generate HTML document
        const dateRange = fromDate || toDate 
            ? `(${fromDate?.toLocaleDateString() || 'Start'} - ${toDate?.toLocaleDateString() || 'End'})`
            : '(All Entries)';
        
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Personal Journal ${dateRange}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 10px; }
        .entry { margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
        .entry-date { color: #666; font-size: 14px; margin-bottom: 10px; }
        .entry-text { line-height: 1.6; white-space: pre-wrap; }
        .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <h1>Personal Journal ${dateRange}</h1>
    <p>Generated on ${new Date().toLocaleString()}</p>
    ${entries.map(entry => `
    <div class="entry">
        <div class="entry-date">${entry.date} at ${entry.time}</div>
        <div class="entry-text">${entry.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>
    `).join('')}
    <div class="footer">Generated by Police Tools App</div>
</body>
</html>`;
        
        const blob = new Blob([html], { type: 'text/html' });
        const nombre = `Personal_Journal_${new Date().toISOString().split('T')[0]}.html`;

        try {
            const res = await window.PTOut.descargar([{ blob, nombre }]);
            this.showToast(`Saved to ${res.donde} · and in Daily Reports`, 'success');
        } catch (e) {
            console.error('Journal export error:', e);
            this.showToast('Error saving the document', 'error');
        }
    }
}

// Inicializar
// Se espera al store antes de construir la app: la migracion de los PDFs de
// localStorage a IndexedDB reescribe la lista de reportes, y arrancar antes
// dejaria en memoria la version vieja.
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.PoliceToolsStoreReady;
    } catch (e) {
        console.warn('Store no disponible, se sigue sin el:', e.message);
    }
    window.app = new PoliceToolsApp();
});

// El Service Worker se registra una sola vez desde index.html.
// Registrarlo aqui tambien provocaba dos registros compitiendo por el control.
