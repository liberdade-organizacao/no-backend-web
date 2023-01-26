function main() {
  /// VALIDATING PARAMETERS
  if (!isLoggedIn()) {
    location.href = "../login.html";
    return;
  }

  const appAuthKey = getUrlSearchParam("app_auth_key");
  if (!appAuthKey) {
    alert("Invalid app auth key!");
  }

  /// POPULATING PAGE
  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();

  // Updating links
  document.getElementById("actions-link").href = `./actions.html?app_auth_key=${appAuthKey}`;
  document.getElementById("managers-link").href = `./managers.html?app_auth_key=${appAuthKey}`;
  document.getElementById("files-link").href = `./files.html?app_auth_key=${appAuthKey}`;

  // listing users
  // TODO complete me!
  document.getElementById("app-users").innerHTML = "<p>/!\\ MEN AT WORK /!\\</p>";

  /// CALLBACKS
  document.getElementById("delete-app-button").addEventListener("click", function() {
    deleteApp(serverUrl, clientAuthKey, appAuthKey, function(result) {
      if (!!result.error) {
        alert("Failed to delete app!");
	return;
      }

      alert("Successfully deleted app!");
      location.href = "./index.html";
      return;
    });
  });
}
