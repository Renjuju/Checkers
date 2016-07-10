// Module dependencies.
var http = require('http');
var fs = require('fs');
var express = require('express')
var app = express();
var server = require('http').createServer(app)

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}


app.use(logger);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/LoginScreen.html')
});

server.listen(3000, function() {
	console.log('Server listening on localhost:3000')
})
