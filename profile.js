var get = function(username) {
	var http = require("http");
	var url = "http://teamtreehouse.com/" + username + ".json";


	var printErr = function(error) {
		console.error(error.message);
	}
	var printUserStats = function(jsonObj) {
		var name = jsonObj.name;
		var badges = jsonObj.badges.length;
		var jspts = jsonObj.points.JavaScript;
		var message = name + " (" + username + ") has " + badges +" badges and " + jspts +" points in JavaScript courses.";
		console.log(message);
	}


	var request = http.get(url, function(response) {
		var body = "";

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			if(response.statusCode === 200) {
				try {
					var profile = JSON.parse(body);
					printUserStats(profile);
				} catch(error) {
					printErr(error);
				}	
			}
			else {
				printErr({message: "Error looking up " + username + " - status code: " + http.STATUS_CODES[response.statusCode]});
			}
		})	
	});
	request.on("error", printErr);	
}


module.exports.get = get;

