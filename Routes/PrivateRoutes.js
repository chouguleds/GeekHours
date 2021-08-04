var jwt = require('jsonwebtoken')


var getCategoriesService = require('../Services/TeacherServices/GetCategoriesService.js');
var getVillegersService = require('../Services/TeacherServices/GetVillegersService.js');
var scheduleLectureService = require('../Services/TeacherServices/ScheduleLectureService.js');
var appConfig = require(process.cwd() + '\\AppConfig')
var Cookies = require('cookies')
var exports = module.exports = {}
exports.privateRouter = require('express').Router();


exports.privateRouter.use(function(req, res, next) {
	if (!req.decoded) {
		var cookies = new Cookies(req,res)
		var token = cookies.get('auth_token')
		console.log('token',token)//req.body.token || req.param('token') || req.headers['x-access-token']
		if (token) {
			jwt.verify(token,appConfig.secret,function(err, decoded) {
				if (err) {
					res.json({success: false, message: 'Authentication failed'})
					res.end()
				} else {
					req.decoded = decoded
					next()
				}
			})
		}
		else
		{
				res.json({success: false, message: 'Authentication failed'})
				res.end()	
		}
	}
})


exports.privateRouter.get('/getCatogeries', getCategoriesService.getCategoriesHandler)
exports.privateRouter.post('/scheduleLecture', scheduleLectureService.scheduleLectureHandler)
exports.privateRouter.post('/getVillegers', getVillegersService.getVillegersHandler)