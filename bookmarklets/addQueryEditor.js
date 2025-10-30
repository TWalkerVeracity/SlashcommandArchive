/**
 * Query Editor Bookmarklet
 * 
 * This bookmarklet adds "Edit Query" buttons to ServiceNow condition builders (now-condition-builder-connected)
 * in UI Builder pages. It searches through iframes and shadow DOMs to find all condition builders on the page.
 * 
 * To use:
 * 1. Create a new bookmark in your browser
 * 2. Copy the minified code below (starting with javascript:)
 * 3. Paste it as the URL/location of the bookmark
 * 4. When viewing a UI Builder page with condition builders, click the bookmark to add edit buttons
 * 5. Click an "Edit Query" button to edit the encoded query via a prompt
 * 
 * Features:
 * - Searches in main document, iframes, and nested shadow DOMs
 * - Waits for shadow DOM to be ready
 * - Prevents duplicate buttons
 * - Can be re-run safely
 */

// Original code (readable):
(function () {
    'use strict';

    // Recursively find all elements matching selector, including in shadow DOMs
    function findAllDeep(selector, root = document) {
        const elements = [];

        // Find in current root
        root.querySelectorAll(selector).forEach(el => elements.push(el));

        // Search in shadow DOMs
        root.querySelectorAll('*').forEach(el => {
            if (el.shadowRoot) {
                elements.push(...findAllDeep(selector, el.shadowRoot));
            }
        });

        return elements;
    }

    // Search in all frames
    function findInAllFrames(selector) {
        const elements = [];

        // Search main document
        elements.push(...findAllDeep(selector, document));

        // Search all iframes
        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                if (iframe.contentDocument) {
                    elements.push(...findAllDeep(selector, iframe.contentDocument));
                }
            } catch (e) {
                console.warn('[QueryEditor] Cannot access iframe:', iframe, e);
            }
        });

        return elements;
    }

    // Wait for shadow DOM to be ready
    async function waitForShadowRoot(element, maxAttempts = 20) {
        for (let i = 0; i < maxAttempts; i++) {
            if (element.shadowRoot) return true;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return false;
    }

    // Add the query editor button to a condition builder
    async function addQueryEditorButton(builder) {
        // Wait for shadow DOM if needed
        if (!builder.shadowRoot) {
            const hasShadow = await waitForShadowRoot(builder);
            if (!hasShadow) {
                console.warn('[QueryEditor] Shadow DOM not found for:', builder);
                return false;
            }
        }

        const componentId = builder.getAttribute('component-id') ||
            builder.getAttribute('now-id') ||
            Math.random().toString(36).substring(2, 9);

        const buttonId = `query-editor-btn-${componentId}`;

        // Skip if button already exists
        if (builder.shadowRoot.querySelector(`#${buttonId}`)) {
            console.log('[QueryEditor] Button already exists for:', componentId);
            return false;
        }

        // Create the button
        const button = document.createElement('now-button');
        button.id = buttonId;
        button.setAttribute('icon', 'pencil-fill');
        button.setAttribute('variant', 'secondary');
        button.setAttribute('size', 'md');
        button.setAttribute('label', 'Edit Query');
        button.setAttribute('style', 'margin: 8px 0; min-width: 120px;');

        // Add click handler
        button.addEventListener('click', () => {
            const currentQuery = builder.encodedQuery || '';
            const newQuery = prompt('Enter new encoded query:', currentQuery);
            if (newQuery !== null) {
                builder.encodedQuery = newQuery;
                builder.dispatchEvent(new CustomEvent('query-updated', {
                    detail: { oldQuery: currentQuery, newQuery }
                }));
                console.log('[QueryEditor] Query updated:', newQuery);
            }
        });

        // Insert into shadow DOM
        const insertionPoint = builder.shadowRoot.querySelector(
            'div, section, header, .content, .body, .form-group'
        );

        if (insertionPoint) {
            insertionPoint.insertBefore(button, insertionPoint.firstChild);
        } else if (builder.shadowRoot.firstChild) {
            builder.shadowRoot.insertBefore(button, builder.shadowRoot.firstChild);
        } else {
            builder.shadowRoot.appendChild(button);
        }

        return true;
    }

    // Main execution
    (async function () {
        console.log('[QueryEditor] Searching for condition builders...');

        // Search everywhere
        const builders = findInAllFrames('now-condition-builder-connected');

        console.log('[QueryEditor] Found:', builders);

        if (builders.length === 0) {
            alert('No condition builders found.\n\nMake sure you are on a UI Builder page with condition builders.\n\nCheck console for details.');
            return;
        }

        console.log(`[QueryEditor] Processing ${builders.length} condition builder(s)...`);

        let added = 0;
        for (const builder of builders) {
            if (await addQueryEditorButton(builder)) {
                added++;
            }
        }
    })();
})();