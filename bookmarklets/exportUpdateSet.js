/**
 * Export Update Sets (EUS) Bookmarklet
 * 
 * This bookmarklet exports update sets from a ServiceNow list view.
 * Simplified version without the complex UI - uses basic prompts and automatic downloads.
 * 
 * To use:
 * 1. Create a new bookmark in your browser
 * 2. Copy the minified code below (starting with javascript:)
 * 3. Paste it as the URL/location of the bookmark
 * 4. When viewing an update set list, click the bookmark to export them
 */

// Original code (readable):
javascript:
(async function () {

    // ============================================================================
    // UI FUNCTIONS
    // ============================================================================

    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'eus-modal';
        modal.innerHTML = `
            <style>
                #eus-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 999999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                #eus-content {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
                    width: 70vw;
                    max-width: 1200px;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                }
                #eus-header {
                    padding: 20px;
                    border-bottom: 1px solid #e5e7eb;
                    position: relative;
                }
                #eus-header h2 {
                    margin: 0 0 8px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #111827;
                    padding-right: 30px;
                }
                #eus-header p {
                    margin: 0;
                    font-size: 14px;
                    color: #6b7280;
                }
                #eus-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 24px;
                    height: 24px;
                    border: none;
                    background: transparent;
                    color: #6b7280;
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.15s;
                }
                #eus-close:hover {
                    background: #f3f4f6;
                    color: #111827;
                }
                #eus-close svg {
                    width: 20px;
                    height: 20px;
                }
                #eus-body {
                    padding: 20px;
                    overflow-y: auto;
                    flex: 1;
                }
                #eus-progress {
                    margin-bottom: 16px;
                    font-size: 14px;
                    color: #6b7280;
                }
                .eus-section {
                    margin-bottom: 20px;
                }
                .eus-section h3 {
                    font-size: 14px;
                    font-weight: 500;
                    color: #111827;
                    margin: 0 0 4px 0;
                }
                .eus-section-desc {
                    font-size: 12px;
                    color: #6b7280;
                    margin: 0 0 12px 0;
                }
                .eus-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    margin-bottom: 6px;
                    transition: background 0.15s;
                }
                .eus-item:hover {
                    background: #f3f4f6;
                }
                .eus-item-name {
                    font-size: 14px;
                    color: #374151;
                    font-weight: 500;
                }
                .eus-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 20px;
                    height: 20px;
                }
                .eus-status svg {
                    width: 16px;
                    height: 16px;
                }
                .eus-pending { color: #9ca3af; }
                .eus-processing { color: #3b82f6; animation: spin 1s linear infinite; }
                .eus-completed { color: #10b981; }
                .eus-error { color: #ef4444; }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                #eus-footer {
                    padding: 16px 20px;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                }
                .eus-btn {
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    border: 1px solid;
                    transition: all 0.15s;
                }
                .eus-btn-primary {
                    background: #3b82f6;
                    color: white;
                    border-color: #3b82f6;
                }
                .eus-btn-primary:hover:not(:disabled) {
                    background: #2563eb;
                    border-color: #2563eb;
                }
                .eus-btn-secondary {
                    background: white;
                    color: #374151;
                    border-color: #d1d5db;
                }
                .eus-btn-secondary:hover:not(:disabled) {
                    background: #f9fafb;
                }
                .eus-btn-danger {
                    background: #ef4444;
                    color: white;
                    border-color: #ef4444;
                }
                .eus-btn-danger:hover:not(:disabled) {
                    background: #dc2626;
                    border-color: #dc2626;
                }
                .eus-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            </style>
            <div id="eus-content">
                <div id="eus-header">
                    <h2>Export Update Sets</h2>
                    <p id="eus-query"></p>
                    <button id="eus-close" title="Close (Esc)">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div id="eus-body">
                    <div id="eus-progress"></div>
                    <div id="eus-sections"></div>
                </div>
                <div id="eus-footer">
                    <button class="eus-btn eus-btn-secondary" id="eus-cancel">Cancel</button>
                    <button class="eus-btn eus-btn-primary" id="eus-start">Start Export</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    function updateProgress(completed, total) {
        const progressEl = document.getElementById('eus-progress');
        if (progressEl) {
            progressEl.textContent = `${completed} / ${total} completed`;
        }
    }

    function updateItemStatus(sysId, status) {
        const item = document.getElementById(`eus-item-${sysId}`);
        if (!item) return;

        const statusEl = item.querySelector('.eus-status');
        const icons = {
            pending: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/></svg>',
            processing: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/></svg>',
            completed: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            error: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        };

        statusEl.innerHTML = icons[status];
        statusEl.className = `eus-status eus-${status}`;
    }

    function populateModal(query, standaloneSets, includedBaseSets, inheritedBaseSets) {
        const queryEl = document.getElementById('eus-query');
        const sectionsEl = document.getElementById('eus-sections');
        const queryDisplay = query.length > 60 ? query.substring(0, 60) + '...' : query;
        queryEl.textContent = `Query: ${queryDisplay}`;

        const sections = [
            {
                title: 'Standalone Update Sets',
                desc: 'Update sets not apart of a batch in the filter',
                sets: standaloneSets
            },
            {
                title: 'Batch Update Sets',
                desc: 'Batch update sets with the base in the filter',
                sets: includedBaseSets
            },
            {
                title: 'Inherited Batch Update Sets',
                desc: 'Batch update with children in the filter',
                sets: inheritedBaseSets
            }
        ];

        sectionsEl.innerHTML = '';
        const totalCount = Object.keys(standaloneSets).length +
            Object.keys(includedBaseSets).length +
            Object.keys(inheritedBaseSets).length;

        updateProgress(0, totalCount);

        sections.forEach(section => {
            if (Object.keys(section.sets).length === 0) return;

            const sectionEl = document.createElement('div');
            sectionEl.className = 'eus-section';
            sectionEl.innerHTML = `
                <h3>${section.title}</h3>
                <p class="eus-section-desc">${section.desc}</p>
            `;

            Object.entries(section.sets).forEach(([sysId, set]) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'eus-item';
                itemEl.id = `eus-item-${sysId}`;
                itemEl.innerHTML = `
                    <span class="eus-item-name">${set.name}</span>
                    <span class="eus-status eus-pending">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke-width="2"/>
                            <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </span>
                `;
                sectionEl.appendChild(itemEl);
            });

            sectionsEl.appendChild(sectionEl);
        });
    }

    function closeModal() {
        const modal = document.getElementById('eus-modal');
        if (modal) {
            modal.remove();
            // Clean up event listener
            if (window.eusKeyHandler) {
                document.removeEventListener('keydown', window.eusKeyHandler);
                window.eusKeyHandler = null;
            }
        }
    }

    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================

    function getAuthToken() {
        if (window.g_ck) return window.g_ck;
        throw new Error('Failed to get auth token');
    }

    async function fetchWithAuth(url, options = {}) {
        const userToken = getAuthToken();
        return fetch(url, {
            ...options,
            headers: {
                'X-UserToken': userToken,
                ...options.headers
            }
        });
    }

    function isInBatch(set) {
        return set.base_update_set && set.base_update_set.value;
    }

    function isBatchBase(set) {
        // Handle both plain sys_id strings and objects with .value property
        const sysIdValue = typeof set.sys_id === 'string' ? set.sys_id : set.sys_id?.value;
        return set.base_update_set?.value === sysIdValue;
    }

    function formatFilename(name) {
        return name.replaceAll(' ', '');
    }

    function getQueryFromUrl() {
        try {
            // Decode the URL to handle double-encoded URLs
            const decodedUrl = decodeURIComponent(window.location.href);

            // Extract query parameter manually to handle double encoding
            const queryRegex = /[\?\&]sysparm_query=(.*?)(?:\&|$)/;
            let query = decodedUrl.match(queryRegex)?.[1];

            if (query) {
                // Decode again in case it was double-encoded
                try {
                    query = decodeURIComponent(query);
                } catch (e) {
                    // Already decoded, use as is
                }
                return query;
            }

            // Check for sys_id
            const sysIdRegex = /[\?\&](?:sysparm_sys_id|sys_id)=([a-f0-9]{32})/;
            const sysId = decodedUrl.match(sysIdRegex)?.[1];
            if (sysId) {
                return `sys_id=${sysId}`;
            }

            return 'active=true';
        } catch (e) {
            console.error('Error getting query from URL:', e);
            return 'active=true';
        }
    }

    async function fetchUpdateSets(query) {
        const response = await fetchWithAuth(
            `/api/now/table/sys_update_set?sysparm_query=${encodeURIComponent(query)}&sysparm_fields=sys_id,name,base_update_set`
        );
        const data = await response.json();
        return data.result;
    }

    async function fetchBaseUpdateSets(baseIds) {
        const response = await fetchWithAuth(
            `/api/now/table/sys_update_set?sysparm_query=sys_idIN${baseIds}&sysparm_fields=sys_id,name,base_update_set`
        );
        const data = await response.json();
        return data.result;
    }

    async function categorizeUpdateSets(query) {
        try {
            const updateSetResults = await fetchUpdateSets(query);

            const baseUpdateSets = updateSetResults.filter(set => isInBatch(set));

            let baseUpdateSetResults = [];
            if (baseUpdateSets.length > 0) {
                const baseIds = baseUpdateSets.map(set => set.base_update_set.value).join(',');
                baseUpdateSetResults = await fetchBaseUpdateSets(baseIds);
            }

            const standaloneSets = {};
            const includedBaseSets = {};
            const inheritedBaseSets = {};

            // Standalone sets are those that are not batched and found in the filter
            updateSetResults
                .filter(set => !isInBatch(set))
                .forEach(set => {
                    standaloneSets[set.sys_id] = set;
                });

            // Included base sets are those that are batch bases and are included in the filter
            baseUpdateSetResults
                .filter(set => updateSetResults.some(s => s.sys_id === set.base_update_set?.value))
                .forEach(set => {
                    includedBaseSets[set.sys_id] = set;
                });

            // Inherited base sets are those that are batch bases and are not included in the filter
            baseUpdateSetResults
                .filter(set => !includedBaseSets[set.sys_id])
                .forEach(set => {
                    inheritedBaseSets[set.sys_id] = set;
                });

            return {
                standaloneSets,
                includedBaseSets,
                inheritedBaseSets
            };
        } catch (e) {
            console.error('Error categorizing update sets:', e);
            return { standaloneSets: {}, includedBaseSets: {}, inheritedBaseSets: {} };
        }
    }

    async function fetchUpdateSetRecord(sysId) {
        const response = await fetchWithAuth(
            `/api/now/table/sys_update_set/${sysId}?sysparm_fields=sys_id,name,base_update_set,application&sysparm_display_value=all`
        );
        const data = await response.json();
        return data.result;
    }

    async function executeBackgroundScript(script) {
        const userToken = getAuthToken();
        const wrappedScript = `gs.info("~~~" + JSON.stringify(${script}) + "~~~");`;
        const formData = new URLSearchParams({
            script: wrappedScript,
            sys_scope: 'global',
            runscript: 'true',
            sysparm_ck: userToken,
            quota_managed_transaction: 'on'
        });

        const response = await fetch('/sys.scripts.do', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const responseText = await response.text();

        const decoder = document.createElement('textarea');
        decoder.innerHTML = responseText;
        const decodedResponse = decoder.value;

        const regex = /~~~(.*)~~~/;
        const match = regex.exec(decodedResponse);
        if (!match) {
            throw new Error('Failed to parse background script response');
        }

        return JSON.parse(match[1]);
    }

    async function stageUpdateSet(sysId, isBatchBase) {
        const script = `(function() {
  try {
    var updateSetGr = new GlideRecord("sys_update_set");
    if (!updateSetGr.get("${sysId}"))
      return { success: false, error: "Update set not found." };
    
    var updateSetExport = new UpdateSetExport();
    updateSetExport.onlyIncludeCompletedChildren = false;
    var stagedUpdateSet = updateSetExport.${isBatchBase ? 'exportHierarchy' : 'exportUpdateSet'}(updateSetGr);
    
    return { success: true, staged_set: stagedUpdateSet };
  } catch (e) {
    return { success: false, error: e.message };
  }
})()`;

        return executeBackgroundScript(script);
    }

    async function downloadUpdateSetXml(stagedSysId, isBatchBase, updateSetName, appName) {
        const userToken = getAuthToken();
        const endpoint = isBatchBase ? 'export_base_update_set.do' : 'export_update_set.do';
        const downloadUrl = `/${endpoint}?sysparm_sys_id=${stagedSysId}&sysparm_delete_when_done=true&sysparm_is_remote=false&sysparm_ck=${userToken}`;

        const fileResponse = await fetchWithAuth(downloadUrl, {
            headers: {
                'Accept': 'application/xml'
            }
        });

        if (!fileResponse.ok) {
            throw new Error(`Failed to download: ${fileResponse.status} ${fileResponse.statusText}`);
        }

        const blob = await fileResponse.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;

        const formattedName = formatFilename(updateSetName);
        const formattedApp = appName ? '-' + formatFilename(appName) : '';
        a.download = `${formattedName}${formattedApp}.xml`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    async function exportUpdateSet(sysId, index, total) {
        try {
            console.log(`[${index}/${total}] Staging update set ${sysId}...`);

            const record = await fetchUpdateSetRecord(sysId);
            if (!record) {
                throw new Error('Update set not found');
            }

            const isBase = isBatchBase(record);
            const updateSetName = record.name?.display_value || record.name?.value || 'update_set';

            // Ensure appName is a string, not an object
            let appName = '';
            if (record.application) {
                if (typeof record.application === 'string') {
                    appName = record.application;
                } else if (record.application.display_value) {
                    appName = record.application.display_value;
                } else if (record.application.value) {
                    appName = String(record.application.value);
                }
            }

            const result = await stageUpdateSet(sysId, isBase);

            if (!result.success || !result.staged_set) {
                throw new Error(result.error || 'Failed to stage update set');
            }

            console.log(`[${index}/${total}] Downloading ${updateSetName}...`);

            await downloadUpdateSetXml(result.staged_set, isBase, updateSetName, appName);

            console.log(`[${index}/${total}] Success: ${updateSetName}`);
            return true;
        } catch (error) {
            console.error(`[${index}/${total}] Error exporting ${sysId}:`, error);
            return false;
        }
    }

    async function processUpdateSets(sets, startIndex, total, categoryName, shouldContinue) {
        let successCount = 0;
        let failCount = 0;
        let currentIndex = startIndex;

        const count = Object.keys(sets).length;
        if (count > 0) {
            console.log(`\nExporting ${count} ${categoryName}...`);

            for (const [sysId] of Object.entries(sets)) {
                // Check if we should stop
                if (!shouldContinue()) {
                    console.log('Export stopped by user');
                    break;
                }

                currentIndex++;
                updateItemStatus(sysId, 'processing');
                const success = await exportUpdateSet(sysId, currentIndex, total);

                if (success) {
                    successCount++;
                    updateItemStatus(sysId, 'completed');
                } else {
                    failCount++;
                    updateItemStatus(sysId, 'error');
                }

                updateProgress(currentIndex, total);

                if (currentIndex < total) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }

        return { successCount, failCount, currentIndex };
    }

    // ============================================================================
    // MAIN EXECUTION
    // ============================================================================

    try {
        if (!window.location.href.includes('sys_update_set')) {
            alert('Please navigate to an Update Set list or record to use this bookmarklet.');
            return;
        }

        console.log('Getting query from URL...');
        const query = getQueryFromUrl();
        console.log(`Query: ${query}`);

        console.log('Fetching and categorizing update sets...');
        const { standaloneSets, includedBaseSets, inheritedBaseSets } = await categorizeUpdateSets(query);

        const standaloneCount = Object.keys(standaloneSets).length;
        const includedBaseCount = Object.keys(includedBaseSets).length;
        const inheritedBaseCount = Object.keys(inheritedBaseSets).length;
        const totalCount = standaloneCount + includedBaseCount + inheritedBaseCount;

        if (totalCount === 0) {
            alert('No update sets found matching the current query.');
            return;
        }

        // Create and show modal
        const modal = createModal();
        populateModal(query, standaloneSets, includedBaseSets, inheritedBaseSets);

        let isExporting = false;

        // Handle start export
        const startExport = async () => {
            if (isExporting) return;
            isExporting = true;

            const startBtn = document.getElementById('eus-start');
            const cancelBtn = document.getElementById('eus-cancel');

            if (startBtn) {
                startBtn.disabled = true;
                startBtn.textContent = 'Exporting...';
            }
            if (cancelBtn) {
                cancelBtn.textContent = 'Stop';
                cancelBtn.className = 'eus-btn eus-btn-danger';
            }

            try {
                console.log(`Starting export of ${totalCount} update set(s)...`);

                let totalSuccess = 0;
                let totalFail = 0;
                let currentIndex = 0;

                // Function to check if export should continue
                const shouldContinue = () => isExporting;

                // Process each category
                const standalone = await processUpdateSets(standaloneSets, currentIndex, totalCount, 'standalone update set(s)', shouldContinue);
                totalSuccess += standalone.successCount;
                totalFail += standalone.failCount;
                currentIndex = standalone.currentIndex;

                if (isExporting) {
                    const included = await processUpdateSets(includedBaseSets, currentIndex, totalCount, 'batch update set(s) (base in filter)', shouldContinue);
                    totalSuccess += included.successCount;
                    totalFail += included.failCount;
                    currentIndex = included.currentIndex;
                }

                if (isExporting) {
                    const inherited = await processUpdateSets(inheritedBaseSets, currentIndex, totalCount, 'inherited batch(es) (children in filter)', shouldContinue);
                    totalSuccess += inherited.successCount;
                    totalFail += inherited.failCount;
                }

                if (isExporting) {
                    console.log(`\nExport complete! Success: ${totalSuccess}, Failed: ${totalFail}`);
                } else {
                    console.log(`\nExport stopped. Success: ${totalSuccess}, Failed: ${totalFail}`);
                }

                // Update buttons based on completion status
                if (startBtn) {
                    startBtn.textContent = isExporting ? 'Export Complete' : 'Export Stopped';
                    startBtn.disabled = false;
                    startBtn.onclick = closeModal;
                }
                if (cancelBtn) {
                    cancelBtn.textContent = 'Close';
                    cancelBtn.className = 'eus-btn eus-btn-secondary';
                    cancelBtn.onclick = closeModal;
                }
            } catch (error) {
                console.error('Export error:', error);
                if (startBtn) {
                    startBtn.textContent = 'Export Failed';
                    startBtn.disabled = false;
                    startBtn.onclick = closeModal;
                }
                if (cancelBtn) {
                    cancelBtn.textContent = 'Close';
                    cancelBtn.className = 'eus-btn eus-btn-secondary';
                    cancelBtn.onclick = closeModal;
                }
            } finally {
                isExporting = false;
            }
        };

        // Setup event listeners
        const startBtn = document.getElementById('eus-start');
        const cancelBtn = document.getElementById('eus-cancel');
        const closeBtn = document.getElementById('eus-close');

        if (startBtn) {
            startBtn.onclick = startExport;
        }

        if (cancelBtn) {
            cancelBtn.onclick = () => {
                if (isExporting) {
                    isExporting = false;
                    console.log('Export stopped by user');
                } else {
                    closeModal();
                }
            };
        }

        if (closeBtn) {
            closeBtn.onclick = () => {
                if (!isExporting) {
                    closeModal();
                }
            };
        }

        // Close on Escape key
        window.eusKeyHandler = (e) => {
            if (e.key === 'Escape' && !isExporting) {
                closeModal();
            }
        };
        document.addEventListener('keydown', window.eusKeyHandler);

        // Close on backdrop click
        modal.onclick = (e) => {
            if (e.target === modal && !isExporting) {
                closeModal();
            }
        };

    } catch (error) {
        console.error('Fatal error:', error);
        alert(`Export failed: ${error.message}\n\nCheck the console for details.`);
    }
})();