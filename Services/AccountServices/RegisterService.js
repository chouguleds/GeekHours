var mongo = require('mongodb').MongoClient;
var appConfig = require(process.cwd() + '\\AppConfig');
var dbUrl = appConfig.dbConnectionUrl;
var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
var AccountDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\AccountDbFunctions.js');

exports.registerUserHandler = function(request, response) {
		var data='';
		 request.on('data', function(chunk) {
		 	
		 	data+=chunk.toString();
        
    });	
    request.on('end', function() {
		 	var d=JSON.parse(data)
		 	console.log(d)
		 userObj = {
			name:d.name,
			emailId: d.emailId,
			password: d.password,
			phoneNumber: d.phoneNumber,
		}
		AccountDbFunctions.registerUserQuery(MongoClient.dbCon, userObj, response, callback)
        
    });	
		
}

function callback(isSuccess, response) {
	if (isSuccess) {
		response.write('User registration successfully')
		response.end();
	} else {
		response.write('User registration failed')
		response.end();
	}
}