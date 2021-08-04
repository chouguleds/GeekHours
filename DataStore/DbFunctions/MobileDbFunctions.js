exports.registerVillegerQuery = function(db, villegerData, response, callback) {
	var collection = db.collection('Villeger')

	 collection.ensureIndex({geoCode: "2d"}, function(err, result) {
    	
    	if(err) 
    		callback(false, response);

    	collection.insert(villegerData, function(err, docs) {
		if (err) {
			return callback(false, response)
		} else {
			return callback(true, response)
		}
	});
   
  });

	
}