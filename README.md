# Slashcommand Archive
  This repo serves as my personal archive of slashcommand that I can't live without since I'm often switching client remote desktops and laptops and wanted a easy place to go to import them all at once. There is a [slashcommands.json](slashcommands.json) file that you can use to import the commands in bulk, and I've written a quick GitHub action to list them out one by one below so they can be grabbed a la cart. 












## Wiki

### /shortcut

*Special slashcommand, accessible via extension keyboard shortcut*

My preferred keyboard bound slashcommand is the //tab command which just opens a fresh tab. I bind this to ⌥T.

<pre><code>//tab</code></pre>

---

### /w

*Widgets &lt;search&gt;*

Search for widgets by name or id.

<pre><code>sp_widget_list.do?sysparm_query=nameLIKE$0^ORidLIKE$0^ORDERBYDESCsys_updated_on</code></pre>

---

### /stats

*Stats.do*

Open the stats.do page, kinda silly since you can do /stats.do but I like it.

<pre><code>/stats.do</code></pre>

---

### /gr

*Groups &lt;search&gt;*

Search for groups by name or get to the group table quickly.

<pre><code>sys_user_group_list.do?sysparm_query=nameCONTAINS$0^ORDERBYDESCsys_updated_on</code></pre>

---

### /mca

*My Companies Applications*

Open the My Companies Applications page, useful for installing or updating internal apps.

<pre><code>/$mycompanyappsmgmt.do</code></pre>

---

### /load

*Load an update set*

Opens the load update set page.

<pre><code>upload.do?sysparm_referring_url=sys_remote_update_set_list.do%3Fsysparm_fixed_query%3Dsys_class_name%3Dsys_remote_update_set&sysparm_target=sys_remote_update_set</code></pre>

---

### /ag

*Agile Board*

Opens the Agile Board, about as good as a bookmark, but in a slashcommand.

<pre><code>/$agile_board.do#/sprint_planning</code></pre>

---

### /sla

*SLA Definitions &lt;search&gt;*

Search for SLA definitions by name, or get to the SLA table quickly.

<pre><code>contract_sla_list.do?sysparm_query=nameLIKE$0^ORDERBYDESCname</code></pre>

---

### /r

*Roles &lt;search&gt;*

Search for roles by name, or get to the role table quickly.

<pre><code>sys_user_role_list.do?sysparm_query=nameLIKE$0^ORDERBYname</code></pre>

---

### /cc

*Clear Cache*

Opens the cache.do page, useful for clearing the cache. Use it in conjunction with the /cls command.

<pre><code>cache.do</code></pre>

---

### /dbt

*Data Broker Server Scripts &lt;search&gt;*

Search for Data Broker Server Scripts by name, or get to the Data Broker Server Script table quickly.

<pre><code>sys_ux_data_broker_transform_list.do?sysparm_query=nameLIKE$0^ORDERBYname</code></pre>

---

### /aclr

*ACL Roles Relation &lt;search&gt;*

Search for ACL Roles Relation by the role name, useful to see which ACLs that a role is affiliated with.

<pre><code>sys_security_acl_role_list.do?sysparm_query=sys_user_role.nameLIKE$0^ORDERBYDESCsys_security_acl</code></pre>

---

### /elog

*Event Log &lt;search&gt;*

Shows the event log for the day, useful for checking if events have been queued and processed.

<pre><code>sysevent_list.do?sysparm_query=sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^nameLIKE$0^ORDERBYDESCsys_created_on</code></pre>

---

### /uxem

*UX Add-on Event Mappings for Macroponent*

Shows the UX Add-on Event Mappings for the macroponent, useful for checking if events have been mapped correctly or fixing broken mappings. Intended to be run on a macroponent record.

<pre><code>sys_ux_addon_event_mapping_list.do?sysparm_query=parent_macroponent=$sysid</code></pre>

---

### /alog

*App Log for Current Scope*

Shows the app log for the current scope for the day, way less cluttered than the general instance log.

<pre><code>syslog_app_scope_list.do?sysparm_query=sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^sys_scope=javascript:gs.getPreference("apps.current_app")^ORDERBYDESCsys_created_on</code></pre>

---

### /errorlog

*Syslog for today, only errors*

Shows the syslog for the day, only showing errors and warnings.

<pre><code>syslog_list.do?sysparm_query=sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^levelIN2,3^ORDERBYDESCsys_created_on</code></pre>

---

### /test

*Example: Open in Test*

Example slashcommand to open the the current record in the test environment. Double // invokes another command. Replace test with your instance prefix. (test.service-now.com)

<pre><code>//env test</code></pre>

---

### /cmptest

*Example: Compare to record in Test*

Example slashcommand to open compare the current record with the test environment. Double // invokes another command. Replace test with your instance prefix. (test.service-now.com)

<pre><code>//diffenv test</code></pre>

---

### /nus

*New update set*

Opens a new update set record, for your current scope.

<pre><code>sys_update_set.do?sys_id=-1</code></pre>

---

### /mru

*My recent updates*

Shows the recent updates you have made, useful for checking your updates have been captured and in which update sets.

<pre><code>sys_update_xml_list.do?sysparm_query=sys_updated_by=javascript:gs.getUserName()^ORDERBYDESCsys_created_on</code></pre>

---

### /logtail

*View Node Logtail*

Opens the logtail channel, useful for tailing the node logs. Can be useful in REST message processing debugging.

<pre><code>channel.do?sysparm_channel=logtail</code></pre>

---

### /rcr

*Role Contains Roles &lt;search&gt;*

Search for roles that contain other roles, useful for checking role hierarchies.

<pre><code>sys_user_role_contains_list.do?sysparm_query=containsLIKE$0^ORDERBYnull</code></pre>

---

### /cus

*Current Update Set*

Opens the current update set, no longer do you need to go through the header.

<pre><code>sys_update_set.do?sys_id=javascript:gs.getPreference('sys_update_set')</code></pre>

---

### /nextlog

*Enable NextExperience Logging*

Enables logging in the NextExperience, useful for debugging. Does the same thing as the DEX extension.

<pre><code>javascript:window.nowUiFramework.setConfigItem("loggingEnabled",!0),window.nowUiFramework.setConfigItem("loggingLevels",["error","warn","info","debug","trace"]);</code></pre>

---

### /retrieve

*Remote Instances &lt;search&gt;*

Navigate to the remote instances list to retrieve update sets from lower environments.

<pre><code>sys_update_set_source_list.do?sysparm_query=^ORDERBYname</code></pre>

---

### /sj

*Scheduled Jobs &lt;search&gt;*

Search for scheduled jobs by name, or get to the scheduled job table quickly.

<pre><code>sysauto_list.do?sysparm_query=nameLIKE$0^ORDERBYname</code></pre>

---

### /event

*Event Registry &lt;search&gt;*

Search for events by name, or get to the event registry table quickly.

<pre><code>sysevent_register_list.do?sysparm_query=event_nameLIKE$0^ORDERBYnull</code></pre>

---

### /noti

*Notifications &lt;search&gt;*

Search for notifications by name, or get to the notification table quickly.

<pre><code>sysevent_email_action_list.do?sysparm_query=nameLIKE$0^ORDERBYorder</code></pre>

---

### /running

*Running Scheduled Jobs*

Shows the scheduled jobs that are currently running, useful for checking on the completion of scheduled jobs.

<pre><code>sys_trigger_list.do?sysparm_query=next_actionONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^state=1^ORDERBYname</code></pre>

---

### /ind

*Indicators &lt;search&gt;*

Search for PA Indicators by name, or get to the indicator table quickly.

<pre><code>pa_indicators_list.do?sysparm_query=type=1^nameLIKE$0^ORDERBYorder</code></pre>

---

### /pasc

*Scripts &lt;search&gt;*

Search for PA Scripts by name, or get to the script table quickly.

<pre><code>pa_scripts_list.do?sysparm_query=nameLIKE$0^ORDERBYname</code></pre>

---

### /roll

*Script Execution Histories &lt;search&gt;*

Show the most recent script executions, useful for grabbing code you've previously run in background scripts or rolling back runs.

<pre><code>sys_script_execution_history_list.do?sysparm_query=^ORDERBYnull</code></pre>

---

### /fix

*Fix Scripts &lt;search&gt;*

Search for fix scripts by name, or get to the fix script table quickly.

<pre><code>sys_script_fix_list.do?sysparm_query=nameLIKE$0^ORDERBYname</code></pre>

---

### /myups

*Today's History Set Captures*

Shows the history set captures you have made today, useful grabbing historical values from records when they aren't in the activity formatter and you don't have admin/glide.history.role.

<pre><code>sys_history_line_list.do?sysparm_query=userDYNAMIC90d1921e5f510100a9ad2572f2b477fe^update_timeONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^ORDERBYnull</code></pre>

---

### /force

*Force current record to current update set*

Opens the script editor with a script that will force the current record to your current update set. Needs to switched to global scope to be run, but will place the update in the current update set.

<pre><code>/sys.scripts.do?scope=global&content=var%20current%20%3D%20new%20GlideRecord%28%22$table%22%29%3B%0Aif%20%28current.get%28%22$sysid%22%29%29%7B%0A%20%20%20%20gs.info%28current.getDisplayValue%28%29%29%3B%0A%20%20%20%20var%20um%20%3D%20new%20GlideUpdateManager2%28%29%3B%0A%20%20%20%20um.saveRecord%28current%29%3B%0A%7D</code></pre>

---

### /csmrec

*Opens the current record in CSM Workspace*

Opens the current record in CSM workspace, super useful when you want to look at a record found using sys_id search or found in platform

<pre><code>/now/cwf/agent/record/$table/$sysid/params/selected-tab-index/0</code></pre>

---

### /awrec

*Opens the current record in AW Workspace*

Opens the current record in AW Workspace, super useful when you want to look at a record found using sys_id search or found in platform

<pre><code>/now/workspace/agent/record/$table/$sysid/params/selected-tab-index/0</code></pre>

---

### /czn

*Filters current table to only show records that have customer updates.*

Uses a join query to filter the current table to only show records that have customer updates. I would love to make this a switch but the current implementation doesn't support it.

<pre><code>/$table_list.do?sysparm_query=^JOIN$table.sys_update_name=sys_update_version.name!source_table!=sys_store_app</code></pre>

---

### /ff

*Field Find &lt;search&gt;*

Search for UI elements by name, useful for finding which views a field is on.

<pre><code>sys_ui_element_list.do?sysparm_query=elementSTARTSWITH$0^ORDERBYDESCelement</code></pre>

---

### /us

*Update Sets &lt;search&gt;*

Search for update sets by name or get to the update set table quickly.

<pre><code>sys_update_set_list.do?sysparm_query=^ORDERBYDESCsys_created_on</code></pre>

---

### /ms

*Email Scripts &lt;search&gt;*

Search for email scripts by name or get to the email script table quickly.

<pre><code>sys_script_email_list.do?sysparm_query=nameLIKE$0^ORDERBYname</code></pre>

---

### /ts

*Document Template Scripts &lt;search&gt;*

Search for document template scripts by name or get to the document template script table quickly.

<pre><code>sn_doc_template_script_list.do?sysparm_query=nameLIKE$0^ORDERBYname</code></pre>

---

### /upa

*UI Policy Actions &lt;search&gt;*

Search for UI policy actions by field, really useful for checking what is showing/hiding a field.

<pre><code>sys_ui_policy_action_list.do?sysparm_query=fieldLIKE$0^ORDERBYfield</code></pre>

---

### /resume

*Resume the most recent update set for record*

Resumes the most recent update set for the current record. Will prompt you if you want to resume the update set if it is not in progress.

<pre><code>javascript: g_form?resumeUpdateSet(g_form.getTableName(),g_form.getUniqueValue()):snuSlashCommandInfoText("This command can only be used on a form view.",!1);
function resumeUpdateSet(c,b){c&&b?(snuSlashCommandShow("/resume",!1),fetch("/api/now/table/sys_update_version?"+new URLSearchParams({sysparm_query:`name=${`${c}_${b}`}^state=current^source_table=sys_update_set`,sysparm_fields:"source,source_table,source.state,source.name,source.sys_id,sys_id",sysparm_limit:1}),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","X-UserToken":g_ck}}).then(a=>a.json()).then(a=>{a.result[0]?a.result[0]&&"in progress"===a.result[0]["source.state"]?
snuSwitchUpdateSet(a.result[0]["source.sys_id"]):snuSlashCommandConfirm("The update set is not in progress. Do you want to resume it?",()=>{setUpdateSetToInProgress(a.result[0]["source.sys_id"])},()=>{snuSlashCommandInfoText("Update set not resumed.",!1)}):snuSlashCommandInfoText("No local update set found for current version of record.",!1)})):snuSlashCommandInfoText("Table and sys_id not found.",!1)}
function setUpdateSetToInProgress(c){fetch(`/api/now/table/sys_update_set/${c}`,{method:"PATCH",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=UTF-8","X-UserToken":g_ck},body:JSON.stringify({state:"in progress"})}).then(b=>b.json()).then(b=>{b?.error?snuSlashCommandInfoText("Error setting update set to in progress:"+b.error.detail,!1):snuSwitchUpdateSet(c)}).catch(b=>{snuSlashCommandInfoText("Error setting update set to in progress:",b,!1)})}
function snuSlashCommandConfirm(c,b,a){window.top.document.getElementById("snudirectlinks").innerHTML=`
        <div>${c}</div>
        <span class="dispidx">1</span><a id="snulnk1"> Yes</a><br/>
        <span class="dispidx">2</span><a id="snulnk2"> No</a><br/>
    `;window.top.document.querySelectorAll("#snudirectlinks a").forEach(d=>{d.addEventListener("click",e=>{"snulnk1"===e.target.id?b():a()})})}
function snuSwitchUpdateSet(c){Object.keys(localStorage).filter(a=>a.includes(".available")).forEach(a=>{localStorage.removeItem(a)});let b={};b.sysId=c;c={Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=UTF-8","X-WantSessionNotificationMessages":!1};g_ck&&(c["X-UserToken"]=g_ck);fetch("/api/now/ui/concoursepicker/updateset",{method:"PUT",headers:c,body:JSON.stringify(b)}).then(a=>a.json()).then(a=>{a?.error?snuSlashCommandInfoText("Error switching:"+a.error.detail,
!1):(localStorage.setItem("snuPickerUpdated",(new Date).getTime()),snuSlashCommandInfoText("Reloading page...",!1),setTimeout(()=>{window.top.location.reload()},1600))}).catch(a=>{snuSlashCommandInfoText("Error switching:",a,!1)})};</code></pre>

Script: [resumeUpdateSet.js](resumeUpdateSet.js)

---

### /sact

*Script Actions &lt;search&gt;*

Search for script actions by event name, useful for finding what scripts are running on an event.

<pre><code>sysevent_script_action_list.do?sysparm_query=event_nameLIKE$0^ORDERBYorder^ORDERBYorder</code></pre>

---

### /vtb

*Visual Task Boards*

Opens the Visual Task Boards page.

<pre><code>/$vtb.do</code></pre>

---

### /forcepop

*Force the always show nav user preference.*

Forces the always show nav user preference to be true. Useful for always showing the nav bar in the new UI. Script can be used to set any user preference.

<pre><code>javascript: (function(){function f(b){this.params={};this.addParam("sysparm_processor",b)}function g(b,a){return new Promise((c,d)=>{var e=new f("UserPreference");e.addParam("sysparm_type","set");e.addParam("sysparm_name",b);e.addParam("sysparm_value",a);e.getXML(function(h){200===h.status?c({name:b,value:a}):d(Error(`Failed to set preference: ${b}`))})})}var k={"glide.ui.polaris.ui16_tabs_inside_polaris":"true"};f.prototype.addParam=function(b,a){this.params[b]=a};f.prototype.getXML=function(b){var a=
new XMLHttpRequest;a.open("POST","xmlhttp.do",!0);a.setRequestHeader("Content-Type","application/x-www-form-urlencoded");a.setRequestHeader("X-UserToken",window.g_ck);a.onload=function(){b(a)};var c=Object.keys(this.params).map(function(d){return encodeURIComponent(d)+"="+encodeURIComponent(this.params[d])},this).join("&");a.send(c)};"undefined"===typeof window.g_ck?snuSlashCommandInfoText("Security token not found. Make sure you're logged in to ServiceNow.",!1):async function(){for(const [b,a]of Object.entries(k))try{await g(b,
a),snuSlashCommandInfoText(`Preference set: ${b} = ${a}\n`,!0)}catch(c){snuSlashCommandInfoText(`Error setting preference ${b}: ${c.message}\n`,!0)}}()})();</code></pre>

Script: [forcePop.js](forcePop.js)

---

