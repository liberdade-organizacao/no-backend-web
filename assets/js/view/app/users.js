function buildUsersTable(users) {
  var outlet = "<table><tr><th>E-mail</th></tr>";
  
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var email = user["email"];
    outlet += `<tr><td>${email}</td></tr>`;
  }

  outlet += "</table>";
  return outlet;
}

function main() {
  if (!isLoggedIn()) {
    location.href = "../login.html";
    return;
  }

  const appAuthKey = getUrlSearchParam("app_auth_key");
  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();

  if (!appAuthKey) {
    alert("Invalid app auth key!");
    return;
  }

  listAppUsers(serverUrl, clientAuthKey, appAuthKey, function(result) {
    var contents = "<p>No users found for this application.</p>";

    if (!!result.error) {
      document.getElementById("app-users").innerHTML = "<p>Failed to get users for this app :(</p>";
    } else if (0 < result.users.length) {
      contents = buildUsersTable(result.users);
    }
    
    document.getElementById("app-users").innerHTML = contents;
  });
}
