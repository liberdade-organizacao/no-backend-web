function main() {
  var loginButton = document.getElementById("login");
  loginButton.addEventListener("click", function() {
    // TODO validate input before atempting logging in
    var serverUrl = document.getElementById("serverurl").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    loginButton.innerHTML = "Logging in...";
    logIn(serverUrl, email, password, function(result) {
      console.log(result);
      try {
        if (!!result.error) {
	  throw result.error;
	} else {
	  loginButton.innerHTML = "Redirecting to main page...";
	  setServerUrl(serverUrl);
	  auth(result["auth_key"]);
	  location.href = "./index.html";
	}
      } catch (error) {
        loginButton.innerHTML = "Try again";
      }
    });
  });
}
