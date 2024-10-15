javascript: (function () {
    var preferences = {
        'glide.ui.polaris.ui16_tabs_inside_polaris': 'true',
    };

    function FakeGlideAjax(processor) {
        this.params = {};
        this.addParam('sysparm_processor', processor);
    }

    FakeGlideAjax.prototype.addParam = function (name, value) {
        this.params[name] = value;
    };

    FakeGlideAjax.prototype.getXML = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'xmlhttp.do', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-UserToken', window.g_ck);
        xhr.onload = function () {
            callback(xhr);
        };
        var params = Object.keys(this.params).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(this.params[key]);
        }, this).join('&');
        xhr.send(params);
    };

    if (typeof window.g_ck === 'undefined') {
        snuSlashCommandInfoText('Security token not found. Make sure you\'re logged in to ServiceNow.', false);
        return;
    }

    function setPreference(name, value) {
        return new Promise((resolve, reject) => {
            var url = new FakeGlideAjax("UserPreference");
            url.addParam("sysparm_type", "set");
            url.addParam("sysparm_name", name);
            url.addParam("sysparm_value", value);

            url.getXML(function (response) {
                if (response.status === 200) {
                    resolve({ name, value });
                } else {
                    reject(new Error(`Failed to set preference: ${name}`));
                }
            });
        });
    }

    async function processPreferences() {
        for (const [name, value] of Object.entries(preferences)) {
            try {
                await setPreference(name, value);
                snuSlashCommandInfoText(`Preference set: ${name} = ${value}\n`, true);
            } catch (error) {
                snuSlashCommandInfoText(`Error setting preference ${name}: ${error.message}\n`, true);
            }
        }
    }

    processPreferences();
})();
