var appConfig = require(process.cwd() + '\\AppConfig');
var request = require("request");
exports.getCategoriesQuery = function(db, callback, response) {
	var collection = db.collection('Villeger')
	collection.distinct("category", function(err, result) {
		if (err) {
			callback(false, response);
		}
		callback(true, response, result);
	});
}
exports.getVillegersQuery = function(db, category, callback, response) {
	var collection = db.collection('Villeger')
	collection.find({
		"category": category
	}, {
		"geoCode.latitude": 1,
		"geoCode.longitude": 1,
		_id: 0
	}).toArray(function(err, result) {
		if (err) {
			callback(false, response);
		}
		var data = "";
		for (var i = 0; i < result.length; i++) {
			data += result[i].geoCode.latitude + ", " + result[i].geoCode.longitude + "/"
		}
		callback(true, response, data);
	});
}
exports.scheduleLectureQuery = function(db, data, response, callback) {
	var collection = db.collection('Villeger')

	collection.find({
		geoCode: {
			$near: [parseFloat(data.geoCode.latitude), parseFloat(data.geoCode.longitude)],
			$maxDistance: appConfig.geoRadius
		}
	}).toArray(function(err, docs) {
		if (err) {
			console.log('in db error ' + err)
			callback(false, response)
		}
		var arr = [];
		for (var i = 0; i < docs.length; i++) {
			if (docs[i].category != undefined && docs[i].category.valueOf() === data.category.valueOf()) {
				arr.push(docs[i]);

				request("http://trans.kapsystem.com/api/web2sms.php?workingkey=A8ee24a10f83ae9777cd829c6fd2de3a1&to="+docs[i].contactNumber+"&sender=KAPMSG&message=we will teach you "+docs[i].category, function(error, response, body) {
					console.log(body);
				});
			}
		}

		callback(true, response)
	});
}