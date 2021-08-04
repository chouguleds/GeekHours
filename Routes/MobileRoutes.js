var registerVillegerService = require('../Services/MobileServices/RegisterVillegerService.js');
var sendSmsService = require('../Services/MobileServices/SendSmsService.js');
var exports = module.exports = {}
exports.mobileRouter = require('express').Router();

exports.mobileRouter.post('/registerVilleger', registerVillegerService.registerVillegerHandler);

