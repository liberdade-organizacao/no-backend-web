function main() {
  // initial validations
  if (!isLoggedIn()) {
    location.href = "./login.html";
    return;
  }

  // registering actions
  var createAppButton = document.getElementById("createapp");
  createAppButton.addEventListener("click", function() {
    createAppButton.innerHTML = "Creating app...";

    const serverUrl = getServerUrl(); 
    const clientAuthKey = getAuthKey();  
    const appName = document.getElementById("name").value;

    createApp(serverUrl, clientAuthKey, appName, function(result) {
      if (result.error) {
        createAppButton.innerHTML = "Failed to create app! Try again";
        return;
      }

      location.href = "./index.html";
      return;
    });
  });
}

