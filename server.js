// Basic Setup
var fs = require('fs'),
    https = require('https');

// Database Connection
var connection = require('./model/dbconnection');

// Set Https certificate
var options = {
  key: fs.readFileSync('privateKey.key'),
  cert: fs.readFileSync('certificate.crt')
};

// Setup express and available tasks
var app = require('./model/task');

// Create server
https.createServer(options, app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
