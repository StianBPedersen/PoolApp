var express = require('express');
var app = express();
var morgan = require('morgan');
require('./routes')(app);

app.use(express.static('public'));
app.use(morgan('dev'));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Det er I som er kongen, ikkje du ' + host + ": " +port);
});