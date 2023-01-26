function buildManagersTable(clients) {
  var outlet = "<table><tr><th>E-mail</th><th>Role</th></tr>";
  
  for (var i = 0; i < clients.length; i++) {
    var client = clients[i];
    var email = client["email"];
    var role = client["role"];
    outlet += `<tr><td>${email}</td><td>${role}</td></tr>`;
  }

  outlet += "</table>";
  return outlet;
}

function main() {
  /// CONTEXT VALIDATION
  if (!isLoggedIn()) {
    location.href = "../login.html";
    return;
  }

  const appAuthKey = getUrlSearchParam("app_auth_key");
  if (!appAuthKey) {
    alert("Invalid app auth key!");
    return;
  }

  /// POPULATING ENVIRONMENT
  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();

  listAppManagers(serverUrl, clientAuthKey, appAuthKey, function(result) {
    var contents = "<p>No managers for this app somehow :thinking:</p>";

    if (!!result.error) {
      appManagersDiv.innerHTML = "<p>Failed to get managers for this app :(</p>";
    } else if (0 < result["clients"].length) {
      contents = buildManagersTable(result["clients"]);
    }
    
    document.getElementById("app-managers").innerHTML = contents;
  });
}

