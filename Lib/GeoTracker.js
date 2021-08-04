var geocoderProvider = 'google';
var httpAdapter = 'https';
// optionnal 
var extra = {
	apiKey: 'AIzaSyCAD1QPMZTQf7Dd09olbXVH1okktIZ6uWQ', // for Mapquest, OpenCage, Google Premier 
	formatter: null // 'gpx', 'string', ... 
};

 geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

 exports.getGeoCode = function(category,address,response,callback,contactNumber) {

	geocoder.geocode(address, function(err, result) {

		if(err||result.length>1)
			callback(false,response)
		else
			callback(true,response, result,category,contactNumber)
	});

}
