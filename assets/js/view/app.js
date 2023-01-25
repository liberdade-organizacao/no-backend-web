function main() {
  /// VALIDATING PARAMETERS
  if (!isLoggedIn()) {
    location.href = "./login.html";
    return;
  }

  const appAuthKey = getUrlSearchParam("app_auth_key");
  if (!appAuthKey) {
    alert("Invalid app auth key!");
  }

  /// POPULATING PAGE
  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();

  // listing users
  // TODO complete me!
  document.getElementById("app-users").innerHTML = "<p>/!\\ MEN AT WORK /!\\</p>";

  // listing actions
  listAppActions(serverUrl, clientAuthKey, appAuthKey, function(result) {
    if (!!result.error) {
      document.getElementById("app-actions").innerHTML = "<p>Failed to get the app's actions</p>";
      return;
    }

    if (result["actions"].length === 0) {
      document.getElementById("app-actions").innerHTML = "<p>No actions yet</p>";
      return;
    }

    // TODO list the app's actions
    document.getElementById("app-actions").innerHTML = "<p>There are actions, just not here</p>";
  });

  document.getElementById("new-action-button").addEventListener("click", function() {
    location.href = `./new_action.html?app_auth_key=${appAuthKey}`;
    return;
  });

  // listing files
  listAppFiles(serverUrl, clientAuthKey, appAuthKey, function(result) {
    if (!!result.error) {
      document.getElementById("app-files").innerHTML = "<p>Failed to get the app's files</p>";
      return;
    }

    if (result["files"].length === 0) {
      document.getElementById("app-files").innerHTML = "<p>No files yet</p>";
      return;
    }

    // TODO list the app's files
    document.getElementById("app-files").innerHTML = "<p>There are files, just not here</p>";
  });

  // listing managers
  document.getElementById("app-manageres").innerHTML = "<p>/!\\ MEN AT WORK /!\\</p>";
}
