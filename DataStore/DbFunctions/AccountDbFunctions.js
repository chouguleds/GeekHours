exports.registerUserQuery = function(db, userObj, response, callback) {
	var collection = db.collection('Teacher')
	collection.insert(userObj, function(err, docs) {
		if (err) {
			return callback(false, response)
		} else {
			return callback(true, response)
		}
	});
}

exports.loginQuery = function(db, credentials, callback, response) {
	var collection = db.collection('Teacher')
	console.log("ddddd"+credentials.password)
	collection.findOne({"emailId": credentials.username,"password":credentials.password},{},function(err, result) {
		if (err) {
			console.log("in errorrrr")
			callback(false, response);
			}
			console.log("out errorrrr")
			callback(true, response,result);
	});
}