var mongo = require('mongodb').MongoClient;
var appConfig = require(process.cwd() + '\\AppConfig');
var dbUrl = appConfig.dbConnectionUrl;
var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
var geoTracker = require(process.cwd() + '\\Lib\\GeoTracker.js')
var teacherDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\TeacherDbFunctions.js');

exports.scheduleLectureHandler = function(request, response) {
	var data = '';
	request.on('data', function(chunk) {

		data += chunk;

	});
	request.on('end', function() {
		var d = JSON.parse(data)
		console.log(d)

		var	category= d.category;
		var	address= d.address;
		var arr=address.split(",")
		var teacherData = {}
		var geoCode = {
			latitude: arr[0],
			longitude: arr[1]
		}

		teacherData.geoCode = geoCode;
		teacherData.category=category;

		teacherDbFunctions.scheduleLectureQuery(MongoClient.dbCon, teacherData, response, callback)
		
	});

}

function callback(isSuccess, response) {

	if (isSuccess) {
		response.write('1')
		response.end();
	}
	else {
		response.write('0')
		response.end();
	}
}