/**
 * Generic POST request
 * @param url URL to be requested
 * @param body JSON object to be sent (will be stringified)
 * @param callback function to be called to deal with result
 */
function postRequest(url, body, callback) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * Generic DELETE request
 * @param url URL to be requested
 * @param body JSON object to be sent (will be stringified)
 * @param callback function to be called to deal with result
 */
function deleteRequest(url, body, callback) {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * Generates a standard auth POST request to the server
 * @param url request URL
 * @param email client email
 * @param password client password
 * @param callback function to be called with request response
 */
function postAuth(url, email, password, callback) {
  return postRequest(url, {
    email: email,
    password: password,
  }, callback);
}

/**
 * Atemps a signup
 * @param serverUrl the baas server URL
 * @param email client email
 * @param password client password
 * @param callback function that will be called with the sign up result
 */
function signUp(serverUrl, email, password, callback) {
  return postAuth(`${serverUrl}/clients/signup`, email, password, callback);
}


/**
 * Atemps a login
 * @param serverUrl the BAAS server URL
 * @param email client email
 * @param password client password
 * @param callback function that will be caled with the log in result
 */
function logIn(serverUrl, email, password, callback) {
  return postAuth(`${serverUrl}/clients/login`, email, password, callback);
}

/**
 * Creates a new app
 * @param authKey client's auth key
 * @param appName app's name
 * @param callback function to be called to deal with result
 */
function createApp(serverUrl, authKey, appName, callback) {
  const body = {
    "auth_key": authKey,
    "app_name": appName,
  };
  return postRequest(`${serverUrl}/apps`, body, callback);
}

/**
 * Gets all apps a client is allowed to manage
 */
function getApps(serverUrl, authKey, callback) {
  return fetch(`${serverUrl}/apps?auth_key=${authKey}`).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    callback({error: error})
  });
}

/**
 * Atemps to change the client's password.
 * This function does not verify if the new password is correct as intended!
 * @param serverUrl server URL
 * @param authKey client auth key
 * @param oldPassword old password
 * @param newPassword new password
 * @param callback function to be called to deal with result
 */
function changePassword(serverUrl, authKey, oldPassword, newPassword, callback) {
  return postRequest(`${serverUrl}/clients/password`, {
    "auth_key": authKey,
    "old_password": oldPassword,
    "new_password": newPassword
  }, callback);
}

/**
 * Atemps an account deletion
 * @param authKey client's auth key
 * @param password client's password
 * @param callback function to be called to deal with the result
 */
function deleteAccount(serverUrl, authKey, password, callback) {
  return deleteRequest(`${serverUrl}/clients`, {
    "auth_key": authKey,
    "password": password
  }, callback);
}

/**
 * Creates a new user in an app
 * @param serverUrl server URL
 * @param appAuthKey app's auth key
 * @param userEmail user's email
 * @param userPassword user's password
 * @param callback function to be called to deal with user creation result
 */
function createUser(serverUrl, appAuthKey, userEmail, userPassword, callback) {
  return postRequest(`${serverUrl}/users/signup`, {
    "app_auth_key": appAuthKey,
    "email": userEmail,
    "password": userPassword
  }, callback);
}

/**
 * Uploads a file to a user's storage
 * @param serverUrl server URL
 * @param userAuthKey user's auth key
 * @param filename file name
 * @param contents file contents
 * @param callback function to deal with file upload result
 */
function uploadFile(serverUrl, userAuthKey, filename, contents, callback) {
  return fetch(`${serverUrl}/users/files`, {
    method: "POST",
    headers: {
      "X-USER-AUTH-KEY": userAuthKey,
      "X-FILENAME": filename
    },
    body: contents
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * Creates a new action
 * @parm serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param actionName action name
 * @param actionScript action script
 * @param callback function to be called to deal with action creation result
 */
function uploadAction(serverUrl, clientAuthKey, appAuthKey, actionName, actionScript, callback) {
  return postRequest(`${serverUrl}/actions`, {
    "client_auth_key": clientAuthKey,
    "app_auth_key": appAuthKey,
    "action_name": actionName,
    "action_script": actionScript
  }, callback);
}

/**
 * Downloads an action
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param actionName action's name
 * @param callback function to be called to deal with an action's download
 */
function downloadAction(serverUrl, clientAuthKey, appAuthKey, actionName, callback) {
  return fetch(`${serverUrl}/actions?client_auth_key=${clientAuthKey}&app_auth_key=${appAuthKey}&action_name=${actionName}`).then((response) => {
    return response.text();
  }).then((text) => {
    return callback(text);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * Deletes an action
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param actionName action's name
 * @param callback function to deal with the action's deletion
 */
function deleteAction(serverUrl, clientAuthKey, appAuthKey, actionName, callback) {
  return deleteRequest(`${serverUrl}/actions`, {
    "client_auth_key": clientAuthKey,
    "app_auth_key": appAuthKey,
    "action_name": actionName
  }, callback);
}

/**
 * Atemps to rename an action and update its contents
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param oldActionName original action's name
 * @param newActionName new action's name
 * @param actionScript action's script
 * @param callback function to be called to deal with the rename atempt result
 */
function replaceAction(serverUrl, clientAuthKey, appAuthKey, oldActionName, newActionName, actionScript, callback) {
  return deleteAction(serverUrl, clientAuthKey, appAuthKey, oldActionName, function(deletionResult) {
    if (!!deletionResult.error) {
      return callback(deletionResult);
    } else {
      return uploadAction(serverUrl, clientAuthKey, appAuthKey, newActionName, actionScript, callback);
    }
  });
}

/**
 * List an app's files
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param callback function to be called to deal with the app's files
 */
function listAppFiles(serverUrl, clientAuthKey, appAuthKey, callback) {
  return fetch(`${serverUrl}/apps/files/list?client_auth_key=${clientAuthKey}&app_auth_key=${appAuthKey}`).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * List an app's actions
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param callback function to be called to deal with the app's actions
 */
function listAppActions(serverUrl, clientAuthKey, appAuthKey, callback) {
  return fetch(`${serverUrl}/actions/list?client_auth_key=${clientAuthKey}&app_auth_key=${appAuthKey}`).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * List an app's managers
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param callback function to be called to deal with the app's actions
 */
function listAppManagers(serverUrl, clientAuthKey, appAuthKey, callback) {
  return fetch(`${serverUrl}/apps/clients?client-auth-key=${clientAuthKey}&app_auth_key=${appAuthKey}`).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * Atempts to invite a manager to an app
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param appAuthKey app's auth key
 * @param inviteeEmail invited client's e-mail
 * @param role invited client's role (should be either "contributor" or "admin")
 * @param callback function to be called to deal with this call's result
 */
function inviteManager(serverUrl, clientAuthKey, appAuthKey, inviteeEmail, role, callback) {
  if (role !== "contributor" && role !== "admin") {
    return callback({error: "Invalid role"});
  }

  return postRequest(`${serverUrl}/apps/invite`, {
    "inviter_auth_key": clientAuthKey,
    "app_auth_key": appAuthKey,
    "invitee_email": inviteeEmail,
    "invitee_role": role
  }, callback);
}

/**
 * Atemps to delete an app
 * @param serverUrl server URL
 * @param clientAuthKey client auth key
 * @param appAuthKey app auth key
 * @param callback function to be called to deal with app deletion result
 */
function deleteApp(serverUrl, clientAuthKey, appAuthKey, callback) {
  return deleteRequest(`${serverUrl}/apps`, {
    "client_auth_key": clientAuthKey,
    "app_auth_key": appAuthKey,
  }, callback);
}

/**
 * Checks if a client is an admin
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param callback function to be called to deal with the call's response
 */
function checkIfIsAdmin(serverUrl, clientAuthKey, callback) {
  return fetch(`${serverUrl}/admins/check`, {
    headers: {
      "X-CLIENT-AUTH-KEY": clientAuthKey
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

/**
 * lets admins list all clients
 * @param serverUrl server URL
 * @param clientAuthKey client's auth key
 * @param callback function to be called with all clients
 */
function adminListClients(serverUrl, clientAuthKey, callback) {
  return fetch(`${serverUrl}/clients/all`, {
    headers: {
      "X-CLIENT-AUTH-KEY": clientAuthKey
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
}

