function main() {
  if (!isLoggedIn()) {
    location.href = "../login.html";
    return;
  }

  checkIfIsAdmin(getServerUrl(), getAuthKey(), function(adminVerificationResult) {
    if (!!adminVerificationResult.error) {
      alert("Not enough permissions to visit this page!");
      location.href = "../index.html";
      return;
    }
  });
}
