var serverUrl = "";
var clientAuthKey = "";
var appAuthKey = "";

const loadFileList = function() {
  listAppFiles(serverUrl, clientAuthKey, appAuthKey, function(result) {
    if (!!result.error) {
      document.getElementById("app-files").innerHTML =
        "<p>Failed to get the app's files</p>";
      return;
    }

    if (result["files"].length === 0) {
      document.getElementById("app-files").innerHTML =
        "<p>No files yet</p>";
      return;
    }

    document.getElementById("app-files").innerHTML = buildFileList(result["files"]);
  });
};

function buildFileList(files) {
  var outlet = "<table><tr><th>File name</th><th>User Email</th><th>Delete?</th></tr>";

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filename = file["filepath"].split("/")[2];
    var userEmail = file["filepath"].split("/")[1];
    var row =
      `<tr>
        <td>${filename}</td>
        <td>${userEmail}</td>
        <td><button type="button" class="btn btn-danger delete-btn" data-filename="${escapeHtml(filename)}" style="font-size: 0.85em; padding: 0.2em 0.5em;">Delete</button></td>
      </tr>`;
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

  appAuthKey = getUrlSearchParam("app_auth_key");
  if (!appAuthKey) {
    alert("Invalid app auth key!");
  }

  /// POPULATING PAGE
  serverUrl = getServerUrl();
  clientAuthKey = getAuthKey();

  loadFileList();

  /// CALLBACKS
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      event.stopPropagation();

      var filename = button.getAttribute("data-filename");
      if (!!filename) {
        if (!confirm(`Delete file "${filename}" from this app?`)) {
          return;
        }

        deleteAppFile(
          serverUrl,
          clientAuthKey,
          appAuthKey,
          filename,
          function(result) {
            if (!!result.error) {
              alert(
                `Failed to delete file "${filename}" from this app!`
              );
            } else if (result === undefined) {
              alert(
                `Successfully deleted file "${filename}" from this app!`
              );
            } else {
              alert(
                `Successfully deleted file "${filename}" from this app!`
              );
            }

            loadFileList();
          }
        );
      }
    });
  });
}
