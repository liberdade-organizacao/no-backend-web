function buildFileList(files) {
  var outlet = `<p id="file-counter">${files.length} files</p><table><tr><th>Name</th><th>App</th><th>User</th></tr>`;

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filepath = file["filepath"];
    var appName = file["app_id"] + " is app id though";
    var ownerEmail = file["owner_id"] + " is owner user id though";
    var row = `<tr><td>${filepath}</td><td>${appName}</td><td>${ownerEmail}</td></tr>`;
    outlet += row;
  }

  outlet += "</table>";
  return outlet;
}

function main() {
  const serverUrl = getServerUrl();
  const authKey = getAuthKey();

  checkIfIsAdmin(serverUrl, authKey, function(adminVerificationResult) {
    if (!!adminVerificationResult.error) {
      alert("Not enough permissions to visit this page!");
      location.href = "../index.html";
      return;
    }

    adminListFiles(serverUrl, authKey, function(result) {
      if (!!result["error"]) {
        contents = "<p>Failed to list files</p>";
      } else if (result["files"].length === 0) {
        contents = "<p>No files yet!</p>";
      } else {
        contents = buildFileList(result["files"]);
      }

      document.getElementById("files-list").innerHTML = contents;
    }); 
  });
}

