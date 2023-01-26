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
  /// VALIDATING ENVIRONMENT
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
}

