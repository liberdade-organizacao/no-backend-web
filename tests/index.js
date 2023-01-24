function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function main() {
  var status = document.getElementById("status");

  // const serverUrl = "http://localhost:7780";
  const serverUrl = "http://192.168.0.18:7780";
  signUp(serverUrl, "hello@crisjr.eng.br", "password", function(signUpResult) {
    console.log("--- # sign up");
    authKey = signUpResult["auth_key"];
    if (!!signUpResult.error) {
      console.log("Failed to create client!");
      return;
    }
    createApp(serverUrl, authKey, "Shiny App", function(appCreationResult) {
      console.log("--- # create app");
      console.log(appCreationResult);
      if (!!appCreationResult.error) {
        console.log("Failed to create app!");
	return;
      }
    });
  });


  const emails = [
    "client@liberdade.bsb.br",
    "duck@duck.amsterdam",
    "bear@duck.berlin"
  ];
  for (var i = 0; i < emails.length; i++) {
    var email = emails[i];
    signUp(serverUrl, email, "pwd", function(signUpResult) {
      console.log("--- # " + email + " sign up");
      console.log(signUpResult);
      if (!!signUpResult.error) {
        console.log("Failed to create client");
	return;
      }
      var numberOfApps = 2 + 10 * Math.random();
      for (var j = 0; j < numberOfApps; j++) {
        createApp(serverUrl, signUpResult["auth_key"], randomString(3 + 5 * Math.random()), function(appCreationResult) {
	  console.log("--- # create app");
	  console.log(appCreationResult);
	});
      }
    });
  }
}
