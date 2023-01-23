/**
 * Generates a standard auth POST request to the server
 * @param url request URL
 * @param email client email
 * @param password client password
 * @param callback function to be called with request response
 */
function postAuth(url, email, password, callback) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return callback(data);
  }).catch((error) => {
    return callback({error: error});
  });
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

