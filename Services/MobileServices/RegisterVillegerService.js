var mongo = require('mongodb').MongoClient;
var appConfig = require(process.cwd() + '\\AppConfig');
var dbUrl = appConfig.dbConnectionUrl;
var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
var geoTracker = require(process.cwd() + '\\Lib\\GeoTracker.js')
var mobileDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\MobileDbFunctions.js');

exports.registerVillegerHandler = function(request, response) {
	var d = JSON.stringify(request.body);
	var da=JSON.parse(d.toString());
	var data=da.Data;
	
		var arr = data.split(" ");
		var contactNumber = arr[0];
		var category = arr[2];
		var address = '';
		var i = 3;
		for (; i < arr.length - 1; i++)
			address += arr[i] + " ";
		address += arr[i];

		console.log(address)


		geoTracker.getGeoCode(category, address, response, execute,contactNumber);
	

}

function execute(isSuccess,response, result, category,contactNumber) {
	if (isSuccess) {
		var villegerData = {}
		var geoCode = {
			latitude: result[0].latitude,
			longitude: result[0].longitude
		}
		villegerData.geoCode = geoCode;
		villegerData.contactNumber = contactNumber;
		villegerData.category=category;

		mobileDbFunctions.registerVillegerQuery(MongoClient.dbCon, villegerData, response, callback)
		
	} else {
		response.write('invalid address')
		response.end();
	}
}

function callback(isSuccess, response) {

	if (isSuccess) {
		response.write('User registration successfully')
		response.end();
	}
	else {
		response.write('invalid address')
		response.end();
	}
}