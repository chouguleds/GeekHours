var mongo = require('mongodb').MongoClient;
var appConfig = require(process.cwd() + '\\AppConfig');
var dbUrl = appConfig.dbConnectionUrl;
var exports = module.exports = {}
exports.connectToDb = function(callback) {
	mongo.connect(dbUrl, function(err, db) {
		if (err) {
			callback()
			return null
		} else {
			exports.dbCon = db
			callback()
		}
	});
}