// load the the proper environment configuration
var env = process.env.NODE_ENV;
var config = require('./config/' + env.trim() + '.json'); //we load the db location from the JSON files

var routes = require('./api/routes/happyRoutes'); //importing route
var express = require('express'); //import the app
var mongoose = require('mongoose'); //import the db
var bodyParser = require('body-parser'); //import the parser
var Mood = require('./api/models/happyModel'); //created model loading here

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
console.log(new Date().toISOString() + ' ' + 'Attempting to connect to db ' + config.dbURI);
mongoose.connect(config.dbURI, { useNewUrlParser: true });

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route

var port = config.port;
module.exports = app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('happyTracker RESTful API server started on: ' + port);