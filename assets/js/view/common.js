/**
 * Checks if a given string is an email address
 * @param email email
 * @returns true if the string is an email, false otherwise
 */
function isEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
