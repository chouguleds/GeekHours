var appConfig={};
var events = require('events')
appConfig.eventEmitter = new events.EventEmitter();
appConfig.loginPage='C:/Users/Deepak/Desktop/GeekHours/View/index.html';
appConfig.dbConnectionUrl='mongodb://localhost:27017/GeekHours';
appConfig.secret='EventManagerApp';
appConfig.geoRadius=0.1;

module.exports=appConfig;