function main() {
  console.log("TODO complete me!");
  var loginButton = document.getElementById("login");
  loginButton.addEventListener("click", function() {
    var serverUrl = document.getElementById("serverurl").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    loginButton.innerHTML = "Logging in...";
    logIn(serverUrl, email, password, function(result) {
      try {
        console.log(result);
      } catch (error) {
        loginButton.innerHTML = "Try again";
      }
    });
  });
}
