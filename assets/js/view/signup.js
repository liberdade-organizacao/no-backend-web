function main() {
  var signupButton = document.getElementById("signup");
  signupButton.addEventListener("click", function() {
    // TODO validate input before signing up
    var serverUrl = document.getElementById("serverurl").value || DEFAULT_API_URL;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    signupButton.innerHTML = "Logging in...";
    signUp(serverUrl, email, password, function(result) {
      try {
        if (!!result.error) {
	  throw result.error;
	} else {
	  signupButton.innerHTML = "Redirecting to main page...";
	  setServerUrl(serverUrl);
	  auth(result["auth_key"]);
	  location.href = "./index.html";
	}
      } catch (error) {
        signupButton.innerHTML = "Try again";
      }
    });
  });
}

