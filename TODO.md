# 📋 TODO: Implement Client File Deletion Capability

**Goal:** Enable authorized clients to delete files associated with their applications through the client interface.
**Source API Endpoint:** `/apps/files` (DELETE) in `../api/docs/api.md`.

---

### Execution Plan - Phase 1: Core Logic Update (`assets/js/model/api.js`)

1.  **Create Function:** Implement `deleteAppFile(serverUrl, clientAuthKey, appAuthKey, filename, callback)`.
2.  **Logic:** This function must correctly wrap the generic `deleteRequest` utility provided in `assets/js/model/api.js`.
3.  **Headers Requirement:** Crucially, it must send all required authentication keys and the filename within custom headers (`x-client-auth-key`, `x-app-auth-key`, `x-filename`) as per API documentation.

### Execution Plan - Phase 2: UI Integration (Component Logic)

1.  **Identify Scope:** Locate the JavaScript logic that handles the display/listing of application files within the client's app context (Look at views related to file management).
2.  **Event Handler:** Attach an event listener to all "Delete File" controls.
3.  **Process Flow:**
    a. Capture: Get `clientAuthKey`, `appAuthKey`, and `filename` upon button click.
    b. Execute: Call the new global function: `deleteAppFile(serverUrl, clientAuthKey, appAuthKey, filename, callback)`.
    c. **Success:** Display confirmation and refresh/re-query the file list view (`loadFileList()`).
    d. **Failure:** Catch API responses (e.g., 403 Forbidden) and display a user-friendly error message.

### Dependency Checklist:
*   [ ] Implement `deleteAppFile` function in `assets/js/model/api.js`.
*   [ ] Update all relevant front-end views to dispatch calls using the new `deleteAppFile` API method.

