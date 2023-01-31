const DEFAULT_CONTENTS = `function main(param)\n  return "hello " .. param .. "!"\nend\n`;

function main() {
  /// VALIDATING PARAMETERS
  if (!isLoggedIn()) {
    location.href = "../login.html";
    return;
  }

  const appAuthKey = getUrlSearchParam("app_auth_key");
  if (!appAuthKey) {
    alert("Invalid app auth key!");
    return;
  }
  
  /// POPULATING PAGE
  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();
  const actionName = getUrlSearchParam("action_name");

  // set action name
  document.getElementById("action-name").innerHTML = (!!actionName)? actionName : "new_action.lua";

  // maybe set action contents
  var actionContents = document.getElementById("action-contents");
  if (!!actionName) {
    downloadAction(serverUrl, clientAuthKey, appAuthKey, actionName, function(result) {
      var contents = DEFAULT_CONTENTS;
      if (result === "null") {
        contents = "Failed to download action";
      } else if (result.length > 0) {
        contents = result;
      }
      actionContents.innerHTML = result;
    });
  } else {
    actionContents.innerHTML = DEFAULT_CONTENTS;
  }

  // setting up save button 
  var saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", function() {
    const newActionName = document.getElementById("action-name").innerHTML; 
    const actionScript = document.getElementById("action-contents").value;

    // validating data
    if (newActionName === "") {
      alert("Invalid action name");
      return;
    }

    // updating action
    if ((newActionName !== actionName) && (actionName !== "")) {
      replaceAction(serverUrl, clientAuthKey, appAuthKey, actionName, newActionName, actionScript, function(result) {
        if (!!result.error) {
	  alert("Failed to update action!");
	  return;
	}

	location.href = `./actions.html?app_auth_key=${appAuthKey}`;
	return;
      });
    } else {
      uploadAction(serverUrl, clientAuthKey, appAuthKey, newActionName, actionScript, function(result) {
        if (!!result.error) {
	  alert("Failed to upload action");
	  return;
	}

	location.href = `./actions.html?app_auth_key=${appAuthKey}`;
	return;
      });
    }
  });
}

