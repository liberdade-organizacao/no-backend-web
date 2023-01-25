const DEFAULT_API_URL = "http://baas.liberdade.bsb.br";
const SERVER_API_URL_KEY = "server_api_url";
const CLIENT_AUTH_KEY = "auth_key";

/**
 * @returns server URL. Defaults to `DEFAULT_API_URL`
 */
function getServerUrl() {
  return localStorage.getItem(SERVER_API_URL_KEY) || DEFAULT_API_URL;
}

/**
 * @param url new server URL
 */
function setServerUrl(url) {
  return localStorage.setItem(SERVER_API_URL_KEY, url);
}

/**
 * Checks if a client is logged in
 */
function isLoggedIn() {
  return !!localStorage.getItem(CLIENT_AUTH_KEY);
}

/**
 * @param authKey client's auth key
 */
function auth(authKey) {
  return localStorage.setItem(CLIENT_AUTH_KEY, authKey);
}

/**
 * Undo authorization
 */
function unauth() {
  return localStorage.clear();
}

/**
 * @returns the logged in client auth key
 */
function getAuthKey() {
  return localStorage.getItem(CLIENT_AUTH_KEY);
}

/**
 * Gets a URL search param
 * @param param the param key
 * @returns the param value, or an empty string if the param is not present
 */
function getUrlSearchParam(param) {
  const urlParams = new URL(window.location.toLocaleString()).searchParams;
  return urlParams.get(param);
}

