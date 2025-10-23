javascript:
if (!g_form) snuSlashCommandInfoText('This command can only be used on a form view.', false);
else resumeUpdateSet(g_form.getTableName(), g_form.getUniqueValue());
function resumeUpdateSet(table, sysId) {
    if (!table || !sysId) {
        snuSlashCommandInfoText('Table and sys_id not found.', false);
        return;
    }

    snuSlashCommandShow('/resume', false);
    const updateName = `${table}_${sysId}`;
    const url = '/api/now/table/sys_update_version';
    const queryParams = {
        sysparm_query: `name=${updateName}^state=current^source_table=sys_update_set`,
        sysparm_fields: 'source,source_table,source.state,source.name,source.sys_id,sys_id',
        sysparm_limit: 1,
    };
    fetch(url + '?' + new URLSearchParams(queryParams), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-UserToken': g_ck,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.result[0]) {
                snuSlashCommandInfoText('No local update set found for current version of record.', false);
                return;
            }
            if (data.result[0] && data.result[0]['source.state'] === 'in progress') {
                snuSwitchUpdateSet(data.result[0]['source.sys_id']);
            } else {
                snuSlashCommandConfirm(
                    'The update set is not in progress. Do you want to resume it?',
                    () => {
                        setUpdateSetToInProgress(data.result[0]['source.sys_id']);
                    },
                    () => {
                        snuSlashCommandInfoText('Update set not resumed.', false);
                    }
                );
            }
        });
}

function setUpdateSetToInProgress(updateSetId) {
    let payload = {};
    payload.state = 'in progress';

    fetch(`/api/now/table/sys_update_set/${updateSetId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'X-UserToken': g_ck,
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data?.error)
                snuSlashCommandInfoText('Error setting update set to in progress:' + data.error.detail, false);
            else {
                snuSwitchUpdateSet(updateSetId);
            }
        })
        .catch((error) => {
            snuSlashCommandInfoText('Error setting update set to in progress:', error, false);
        });
}

function snuSlashCommandConfirm(confirmText, confirmCallback, rejectCallback) {
    window.top.document.getElementById('snudirectlinks').innerHTML = `
        <div>${confirmText}</div>
        <span class="dispidx">1</span><a id="snulnk1"> Yes</a><br/>
        <span class="dispidx">2</span><a id="snulnk2"> No</a><br/> 
    `;

    window.top.document.querySelectorAll('#snudirectlinks a').forEach((elm) => {
        elm.addEventListener('click', (evt) => {
            if (evt.target.id === 'snulnk1') {
                confirmCallback();
            } else {
                rejectCallback();
            }
        });
    });
}

function snuSwitchUpdateSet(updateSetId) {
    Object.keys(localStorage)
        .filter((key) => key.includes('.available'))
        .forEach((k) => {
            localStorage.removeItem(k);
        });

    let payload = {};
    payload.sysId = updateSetId;
    let headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-WantSessionNotificationMessages': false,
    };
    if (g_ck) headers['X-UserToken'] = g_ck;
    fetch(`/api/now/ui/concoursepicker/updateset`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data?.error) snuSlashCommandInfoText('Error switching:' + data.error.detail, false);
            else {
                localStorage.setItem('snuPickerUpdated', new Date().getTime());
                snuSlashCommandInfoText('Reloading page...', false);
                setTimeout(() => {
                    window.top.location.reload();
                }, 1600);
            }
        })
        .catch((error) => {
            snuSlashCommandInfoText('Error switching:', error, false);
        });
}
