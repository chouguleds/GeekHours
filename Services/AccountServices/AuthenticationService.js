var mongoClient = require('mongodb').MongoClient;
var Cookies = require('cookies')
var appConfig = require(process.cwd() + '\\AppConfig');
var dbUrl = appConfig.dbConnectionUrl;
var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
var AccountDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\AccountDbFunctions.js');
var jwt = require('jsonwebtoken');
var cookies = null

exports.authenticationHandler = function(request, response) {
	cookies = new Cookies(request, response)

	var data='';
		 request.on('data', function(chunk) {
		 	
		 	data+=chunk.toString();
        
    });	
    request.on('end', function() {
		 	var d=JSON.parse(data)
		 	console.log(d)
		 var credentials = {
		username: d.emailId,
		password: d.password
	};
	AccountDbFunctions.loginQuery(MongoClient.dbCon, credentials, callback, response);
        
    });	
	
}

function callback(isSuccess, response, user) {
	if (isSuccess&&user!=null) {
		console.log(user.toString())
		user.password = null
		var token = jwt.sign(user, appConfig.secret, {
			expiresIn: 3660 // expires in 24 hours
		});

		cookies.set('auth_token', token)
		console.log('cookie set hui')
		response.write(new Buffer(JSON.stringify(user)))
		response.end()

	} else {
		//response.write("invalid ")
		response.end();
	}
}