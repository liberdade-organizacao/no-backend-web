function buildAppList(apps) {
  var outlet = "<table><tr><th>Name</th><th>Owner email</th></tr>";

  for (var i = 0; i < apps.length; i++) {
    var app = apps[i];
    var appName = app["name"];
    var ownerEmail = app["owner_id"] + " is their id tho";
    var row = `<tr><td>${appName}</td><td>${ownerEmail}</td></tr>`;
    outlet += row;
  }

  outlet += "</table>";
  return outlet;
}

function main() {
  const serverUrl = getServerUrl();
  const authKey = getAuthKey();

  if (!isLoggedIn()) {
    location.href = "../login.html";
    return;
  }

  checkIfIsAdmin(serverUrl, authKey, function(adminVerificationResult) {
    if (!!adminVerificationResult.error) {
      alert("Not enough permissions to visit this page!");
      location.href = "../index.html";
      return;
    }

    adminListApps(serverUrl, authKey, function(result) {
      if (!!result["error"]) {
        contents = "<p>Failed to list apps</p>";
      } else if (result["apps"].length === 0) {
        contents = "<p>No apps yet!</p>";
      } else {
        contents = buildAppList(result["apps"]);
      }

      document.getElementById("apps-list").innerHTML = contents;
    }); 
  });
}

