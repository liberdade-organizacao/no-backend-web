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

    console.log(result["apps"]);
  });
}

