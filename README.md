# Slashcommand Archive
  This repo serves as my personal archive of slashcommand that I can't live without since I'm often switching client remote desktops and laptops and wanted a easy place to go to import them all at once. There is a [slashcommands.json](https://github.com/TWalkerVeracity/SlashcommandArchive/blob/4f8c2d8ceb0745a7876286590b96e964b2fcb806/slashcommands.json) file that you can use to import the commands in bulk, and I've written a quick GitHub action to list them out one by one below so they can be grabbed a la cart. 







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

