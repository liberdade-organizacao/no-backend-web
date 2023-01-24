function main() {
  // Do not load page is the user is not logged in
  if (!isLoggedIn()) {
    location.href = "./index.html";
    return;
  }

  const serverUrl = getServerUrl();
  const clientAuthKey = getAuthKey();

  // Change password logic
  var changePasswordButton = document.getElementById("change-password-button");
  changePasswordButton.addEventListener("click", function() {
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;
    const newPasswordAgain = document.getElementById("new-password-again").value;

    // validation
    if (newPassword !== newPasswordAgain) {
      changePasswordButton.innerHTML = "Passwords do not match. Try again."
      return;
    }

    // request
    changePasswordButton.innerHTML = "Changing password...";
    changePassword(serverUrl, clientAuthKey, oldPassword, newPassword, function(result) {
      var message = "Password changed!";
      if (!!result.error) {
        message = "Failed to change password.  Try again";
      }
      changePasswordButton.innerHTML = message;
    });
  });

  // Log out logic
  var logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", function() {
    unauth();
    location.href = "./index.html";
  });
}

