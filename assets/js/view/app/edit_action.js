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
  if (!!actionName) {
    downloadAction(serverUrl, clientAuthKey, appAuthKey, actionName, function(result) {
      var contents = DEFAULT_CONTENTS;
      if (result === "null") {
        contents = "Failed to download action";
      } else if (result.length > 0) {
        contents = result;
      }
      document.getElementById("action-contents").innerHTML = result;
    });
  } else {
    document.getElementById("action-contents").innerHTML = DEFAULT_CONTENTS;
  }

  // setting up save button 
  var saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", function() {
    const newActionName = document.getElementById("action-name").innerHTML;  
    console.log(newActionName);
    // if newActionName !== actionName OR actionName === "": delete old action and upload new action
    // else: upload action
  });
}

