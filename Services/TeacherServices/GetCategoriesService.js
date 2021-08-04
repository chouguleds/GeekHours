var appConfig = require(process.cwd() + '\\AppConfig');
var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
var teacherDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\TeacherDbFunctions.js');
var exports = module.exports = {}



exports.getCategoriesHandler = function(request, response) {

	teacherDbFunctions.getCategoriesQuery(MongoClient.dbCon,callback, response);
}

function callback(isSuccess, response, result) {
	if (isSuccess) {
		response.setHeader('Content-Type', 'application/json');
    	response.send(result);
		response.end();
	} else {
		response.write('Event creation failed')
		response.end();
	}
}