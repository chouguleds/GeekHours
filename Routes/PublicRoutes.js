var authenticationService = require('../Services/AccountServices/AuthenticationService.js');
var registerUserService = require('../Services/AccountServices/RegisterService.js')

var exports = module.exports = {}
exports.publicRouter = require('express').Router();
//var authenticationService = require(process.cwd() +'\\Services\\AccountServices\\AuthenticationService.js');
//For temp purpose
exports.publicRouter.post('/authenticateUser', authenticationService.authenticationHandler);
exports.publicRouter.post('/registerUser', registerUserService.registerUserHandler)


exports.publicRouter.get('/tp',function(request,response){

	
			response.writeHead(200,{'Content-Type': 'text/html'});
			response.write("deepak");
		
		response.end();	

} );