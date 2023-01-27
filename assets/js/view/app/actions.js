function buildActionList(actions, appAuthKey) {
  var outlet = "<table><tr><th>Action</th><th>Delete?</th></tr>";

  for (var i = 0; i < actions.length; i++) {
    var action = actions[i];
    var actionName = action["name"];
    var link = `./edit_action.html?app_auth_key=${appAuthKey}&action_name=${actionName}`;
    var row = `<tr><td><a href=${link}>${actionName}</a></td><td>Delete</td></tr>`;
    outlet += row;
  }

  outlet += "</table>";
  return outlet;
}

function main() {
  /// VALIDATING PARAMETERS
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

  document.getElementById("new-action-button").href = `./edit_action.html?app_auth_key=${appAuthKey}`;

  listAppActions(getServerUrl(), getAuthKey(), appAuthKey, function(result) {
    var contents = "<p>I shouldn't be empty but here I am \\_(ツ)_/</p>";

    if (!!result["error"]) {
      contents = "<p>Failed to list actions</p>";
    } else if (result.length === 0) {
      contents = "<p>No actions yet!</p>";
    } else {
      contents = buildActionList(result, appAuthKey);
    }

    document.getElementById("actions-list").innerHTML = contents;;
  }); 
}

