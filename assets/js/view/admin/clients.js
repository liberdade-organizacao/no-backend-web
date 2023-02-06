function buildClientsTable(clients) {
  var outlet = "<table><tr><th>E-mail</th><th>Is admin?</th></tr>";
  
  for (var i = 0; i < clients.length; i++) {
    var client = clients[i];
    var email = client["email"];
    var isAdmin = (client["is_admin"] === "true")? "Yes" : "No";
    outlet += `<tr><td>${email}</td><td>${isAdmin}</td></tr>`;
  }

  outlet += "</table>";
  return outlet;
}

function main() {
  // verifying context
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

    // listing all clients
    adminListClients(serverUrl, clientAuthKey, function (clientsListResult) {
      if (!!clientsListResult.error) {
        alert("Failed to list clients!");
	return;
      }

      document.getElementById("clients-list").innerHTML = buildClientsTable(clientsListResult["clients"]);
      return;
    });

    // promoting to admin
    var promoteAdminButton = document.getElementById("promote-button");
    promoteAdminButton.addEventListener("click", function() {
      promoteAdminButton.innerHTML = "Promoting...";
      var promotedEmail = document.getElementById("admin-email").value;
      promoteToAdmin(serverUrl, clientAuthKey, promotedEmail, function(result) {
        if (!!result["error"]) {
	  alert("Failed to promote to admin");
	  promoteAdminButton.innerHTML = "Promote";
	  return;
	}

	promoteAdminButton.innerHTML = "Promoted!";
	location.reload();
	return;
      });
    });

    // demoting from admin
    var demoteAdminButton = document.getElementById("demote-button");
    demoteAdminButton.addEventListener("click", function() {
      demoteAdminButton.innerHTML = "Demoting...";
      var demotedEmail = document.getElementById("admin-email").value;
      demoteFromAdmin(serverUrl, clientAuthKey, demotedEmail, function(result) {
        if (!!result["error"]) {
	  alert("Failed to demote from admin");
	  demoteAdminButton.innerHTML = "Demote";
	  return;
	}

	demoteAdminButton.innerHTML = "Demoted!";
	location.reload();
	return;
      });
    });
  });
}

