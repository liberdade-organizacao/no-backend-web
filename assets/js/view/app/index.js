function buildFileList(files) {
  var outlet = "<table><tr><th>File name</th><th>User Email</th><th>Delete?</th></tr>";

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filename = file["filepath"].split("/")[2];
    var userEmail = file["filepath"].split("/")[1];
    var row = `<tr><td>${filename}</td><td>${userEmail}</td><td>Delete</td></tr>`;
    outlet += row;
  }

  outlet += "</table>";
  return outlet;
}

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

  // listing users
  // TODO complete me!
  document.getElementById("app-users").innerHTML = "<p>/!\\ MEN AT WORK /!\\</p>";

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

    document.getElementById("app-files").innerHTML = buildFileList(result["files"]);
  });

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
