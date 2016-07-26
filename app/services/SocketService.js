"use strict";
angular.module('checkers')
    .service('SocketService', function($location) {

    var socket;
    var users = [];
    var me;

     function getSocket() {
         return socket;
     }

    function connect(user) {
        socket = io.connect();
        if(users.length == 0) {
            users.push(user);
        }
        me = user;
        // socket = io.connect();
        socket.emit('send message', user);
    }

    function accept(user) {
        socket.emit('game accepted', me, user);
    }

    function reject(user) {
        socket.emit('game rejected', me, user);
    }

    function sendRequest(user) {
        socket.emit('request game', me, user);
    }

    function disconnect() {
        socket.disconnect();
    }

    function getUsers() {
        return users;
    }


    return {
        connect: connect,
        disconnect: disconnect,
        getUsers: getUsers,
        sendRequest: sendRequest,
        getSocket: getSocket,
        accept: accept
    };
});