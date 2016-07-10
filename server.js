// Module dependencies.
var http = require('http');
var fs = require('fs');
var express = require('express')
var app = express();

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
var server = app.listen(3000)
