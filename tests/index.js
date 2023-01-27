const DEFAULT_ACTION = `
function main(param)
  return "Hello " .. param .. "!"
end
`;

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

  const serverUrl = "http://localhost:7780";
  // const serverUrl = "http://192.168.0.18:7780";
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
      var clientAuthKey = signUpResult["auth_key"];
      var numberOfApps = 2 + 10 * Math.random();
      for (var i2 = 0; i2 < numberOfApps; i2++) {
        createApp(serverUrl, signUpResult["auth_key"], randomString(3 + 5 * Math.random()), function(appCreationResult) {
	  console.log("--- # create app");
	  console.log(appCreationResult);
	  var appAuthKey = appCreationResult["auth_key"];

	  createUser(serverUrl, appAuthKey, "hello@crisjr.eng.br", "pwd", function(userCreationResult) {
	    console.log("--- # creating user hello@crisjr.eng.br");
	    console.log(userCreationResult);
	  });

	  var numberOfUsers = 10 + 10 * Math.random();
	  for (var i3 = 0; i3 < numberOfUsers; i3++) {
	    var userEmail = "u" + randomString(3 + 5 * Math.random()) + "@gmail.com";
	    createUser(serverUrl, appAuthKey, userEmail, randomString(1 + 10 * Math.random()), function(userCreationResult) {
	      console.log("--- # creating user");
	      console.log(userCreationResult);
	      var userAuthKey = userCreationResult["auth_key"];
	      var numberOfFiles = 10 + 10 * Math.random();
	      for (var i5 = 0; i5 < numberOfFiles; i5++) {
		var filename = `file-${randomString(15)}.txt`;
		var contents = "this is just a test!";
		uploadFile(serverUrl, userAuthKey, filename, contents, function(fileUploadResult) {
		  console.log("--- # uploading file");
		  console.log(fileUploadResult);
		});
	      }
	    });
	  }

          var numberOfActions = 1 + 2 * Math.random();
	  for (var i4 = 0; i4 < numberOfActions; i4++) {
	    var actionName = `L${randomString(5)}.lua`;
	    var actionScript = DEFAULT_ACTION;
	    console.log("--- # uploading " + actionName);
	    console.log(actionScript)
	    uploadAction(serverUrl, clientAuthKey, appAuthKey, actionName, actionScript, function(actionCreationResult) {
	      console.log("--- creating action");
	      console.log(actionCreationResult);
	    });
	  }
	});
      }
    });
  }
}
