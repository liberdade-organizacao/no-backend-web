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

  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();
  checkIfIsAdmin(serverUrl, clientAuthKey, function(adminCheckResult) {
    if (!!adminCheckResult.error) {
      alert("Not enough permissions!");
      location.href = "../index.html";
      return;
    }

    /// POPULATING PAGE
    adminListClients(serverUrl, clientAuthKey, function (clientsListResult) {
      if (!!clientsListResult.error) {
        alert("Failed to list clients!");
	return;
      }

      // TODO build table of clients
    });
  });
}

