// Module dependencies.
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var path = require('path');

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}


app.use(logger);
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/LoginScreen.html')
});

server.listen(3000 || process.env.PORT, function() {
	console.log('Server listening on localhost:3000')
});

app.get('/app/controllers/Checkers.js', function(req, res){
  res.sendFile(__dirname + '/app/controllers/Checkers.js');
});