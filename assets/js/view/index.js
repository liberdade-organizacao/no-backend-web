function main() {
  // checks if client is logged in or not
  // if not, redirect to login page
  if (!isLoggedIn()) {
    location.href = "./login.html";
    return;
  }

  // setting up main dashboard
  // TODO complete me!
  // TODO remove this reference to the log out button
  logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
    unauth();
    location.href = "./login.html";
  });
}

