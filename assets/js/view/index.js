function deleteAppCallback(appAuthKey) {
  deleteApp(getServerUrl(), getAuthKey(), appAuthKey, function(result) {
    if (!!result.error) {
      alert("Failed to delete app!");
      return;
    }

    alert("Successfully deleted app");
    location.reload();
    return;
  });
}

function buildAppsList(apps) {
  var outlet = "<table><tr><th>Name</th><th>Delete?</th></tr>";

  for (var i = 0; i < apps.length; i++) {
    var app = apps[i];
    var authKey = app["auth_key"];
    var linkHref = `./app.html?app_auth_key=${authKey}`;
    var linkInner = app["name"];
    var link = `<a href="${linkHref}">${linkInner}</a>`;
    var deleteButton = `<button onclick="deleteAppCallback('${authKey}')">Delete</button>`;
    outlet += `<tr><td>${link}</td><td>${deleteButton}</td></tr>`;
  }

  outlet += "</table>";
  return outlet;
}

function main() {
  // checks if client is logged in or not
  // if not, redirect to login page
  if (!isLoggedIn()) {
    location.href = "./login.html";
    return;
  }

  // setting up main dashboard
  const serverUrl = getServerUrl();
  const authKey = getAuthKey();
  getApps(serverUrl, authKey, function(result) {
    if (!!result.error) {
      alert(result.error);
      return;
    }
  
    const apps = result["apps"];
    if (apps.length === 0) {
      return;
    }
    var appsList = document.getElementById("apps-list");
    appsList.innerHTML = buildAppsList(apps);
  });
}

