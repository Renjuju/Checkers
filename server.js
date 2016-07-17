// Module dependencies.
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

console.log(__dirname+'/app/controllers');
app.use(express.static(__dirname + '/app/controllers'));
app.use('/views',express.static(__dirname + '/app/views'));
app.use(express.static(__dirname + '/app/css'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular-route'));
var server = require('http').createServer(app);
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html')
});

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(logger);

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/app/views/Match.html')
}); 

server.listen(80 || process.env.PORT, function() {
	console.log('Server listening on localhost');
	console.log('Type localhost on your browser, there\'s no more port!');
});


