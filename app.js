
/**
 * Module dependencies.
 */

var express = require('express')
 , http = require('http')
 , path = require('path')
 , config = require('./config')
 , mongodb = require('mongodb');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// MongoDb
var MongoServer = mongodb.Server,
 Db = mongodb.Db,
 BSON = mongodb.BSONPure;

var mongoServer = new MongoServer(config.host, config.port, { auto_reconnect: true }),
	db = Db(config.db, mongoServer, { safe: true });

db.open(function (err, db) {
	db.authenticate(config.db, config.pass, function (err, success) {
		// Do Something ...
	});
	if(!err) {
		console.log('Connected to DB');
	}else{
		console.log('Unable to connect to DB');
	}
});

// Import Controllers
var HomeController = require('./controllers/HomeController'),
	ApiController = require('./controllers/ApiController');

// Create Controller Instances
var homeController = new HomeController();
var ApiController = new ApiController();

// Set Routes
app.get('/', homeController.getIndex);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
