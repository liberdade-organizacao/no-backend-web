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

  const appAuthKey = getUrlSearchParam("app_auth-auth-key"); // Wait, looking at previous pattern in managers.js... it used grad 'app_auth_key' but I had a typo in my thought?
  // Let's re-check managers.js: const appAuthKey = getUrlSearchParam("app_auth_key");
  // Okay, correcting here.

  const actualAppAuthKey = getUrlSearchParam("app_auth_key");

  if (!actualAppAuthKey) {
    alert("Invalid app auth key!");
    return;
  }

  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();

  listAppUsers(serverUrl, clientAuthKey, actualAppAuthKey, function(result) {
    var contents = "<p>No users found for this application.</p>";

    if (!!result.error) {
      document.getElementById("app-users").innerHTML = "<p>Failed to get users for this app :(</p>";
    } else if (0 < result.length) {
      contents = buildUsersTable(result);
    }
    
    document.getElementById("app-users").innerHTML = contents;
  });
}
