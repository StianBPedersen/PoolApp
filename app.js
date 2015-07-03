var express = require('express');
var app = express();
require('./routes')(app);

app.use(express.static('public'));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Det er I som er kongen ' + host + ": " +port);
});