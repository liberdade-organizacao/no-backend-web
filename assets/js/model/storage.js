const DEFAULT_API_URL = "http://baas.liberdade.bsb.br";
const SERVER_API_URL_KEY = "server_api_url";

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
  // TODO complete me!
  return false;
}

