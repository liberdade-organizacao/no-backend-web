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

