var appConfig = require(process.cwd() + '\\AppConfig');
var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
var teacherDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\TeacherDbFunctions.js');
var exports = module.exports = {}

exports.getVillegersHandler = function(request, response) {
	var data = '';
	request.on('data', function(chunk) {

		data += chunk.toString();

	});
	request.on('end', function() {
		var d = JSON.parse(data)
		console.log(d)

		var	category= d.category;
		var	teacherAddress= d.address;
		
		teacherDbFunctions.getVillegersQuery(MongoClient.dbCon, category, callback, response);
	});


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