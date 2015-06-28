var profile = require("./profile.js");

//var username = "ajstocchetti";
//profile.get(username);
var users = process.argv.slice(2);
users.forEach(profile.get);