javascript:
(function() {
    function injectScript(targetWindow) {
        var injectedFunction = function() {
            let activeNotification = null;
            let notificationTimeout = null;

            function getCopyContent() {
                if (typeof g_form !== "undefined") {
                    const displayValue = g_form.getValue("number") || g_form.getDisplayValue();
                    const url = window.location.origin + window.location.pathname + "?sys_id=" + g_form.getUniqueValue();
                    return {
                        displayValue,
                        url
                    };
                } else {
                    const displayValue = document.title.split(" | ")[0];
                    const url = window.location.href;
                    return {
                        displayValue,
                        url
                    };
                }
            }
            const {
                displayValue,
                url
            } = getCopyContent();
            const linkElement = document.createElement("a");
            linkElement.href = url;
            linkElement.textContent = displayValue;
            const htmlBlob = new Blob([linkElement.outerHTML], {
                type: "text/html"
            });
            const plainTextBlob = new Blob([displayValue], {
                type: "text/plain"
            });
            const clipboardItem = new ClipboardItem({
                "text/html": htmlBlob,
                "text/plain": plainTextBlob
            });
            navigator.clipboard.write([clipboardItem]).then(function() {
                if (window.top === window) {
                    showNotification("Link copied to clipboard");
                }
            }, function(error) {
                if (window.top === window) {
                    showNotification("Failed to copy: " + error, 5000);
                }
            });

            function showNotification(message, duration = 3000) {
                if (notificationTimeout) {
                    clearTimeout(notificationTimeout);
                }
                if (activeNotification) {
                    activeNotification.textContent = message;
                    activeNotification.style.opacity = "1";
                } else {
                    activeNotification = document.createElement("div");
                    activeNotification.textContent = message;
                    activeNotification.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background-color:#333;color:#fff;padding:10px 20px;border-radius:5px;z-index:10000;opacity:0;transition:opacity 0.3s ease-in-out;";
                    document.body.appendChild(activeNotification);
                    setTimeout(function() {
                        activeNotification.style.opacity = "1";
                    }, 10);
                }
                notificationTimeout = setTimeout(function() {
                    activeNotification.style.opacity = "0";
                    setTimeout(function() {
                        if (activeNotification && activeNotification.parentNode) {
                            activeNotification.parentNode.removeChild(activeNotification);
                        }
                        activeNotification = null;
                    }, 300);
                }, duration);
            }
        };
        var script = targetWindow.document.createElement("script");
        script.textContent = "(" + injectedFunction.toString() + ")();";
        targetWindow.document.body.appendChild(script);
    }

    function findIframes(element) {
        var iframes = [];

        function traverse(node) {
            if (node.tagName && node.tagName.toLowerCase() === "iframe") {
                iframes.push(node);
            }
            if (node.shadowRoot) {
                traverse(node.shadowRoot);
            }
            var childNodes = Array.from(node.childNodes || []);
            childNodes.forEach(traverse);
        }
        traverse(element);
        return iframes;
    }
    injectScript(window);
    var iframes = findIframes(document.body);
    iframes.forEach(function(iframe) {
        try {
            injectScript(iframe.contentWindow);
        } catch (error) {}
    });
})();