angular.module('checkers')
    .service('SocketService', function($location) {

    var socket = io;
    var users = [];
    var me;

    function connect(user) {
        if(users.length == 0) {
            users.push(user);
        }
        me = user;
        socket = io.connect();
        socket.emit('send message', user);
        socket.on('new message', function(data) {
            
            // users = data;
            $('#userList').append('<label><input type="radio" name="radio" value="' + data[data.length-1] + '"/> ' + data[data.length-1] + '</label></br>')
            //$('#userList').append('<div class="well">' + data[data.length-1] + '</div>');
        });

        socket.on('new game request', function(requester) {
            var r = confirm(requester + ' has requested to play a game with you!');
            if (r == true) {
                accept(requester);
                angular.element(document.querySelector('#modal')).modal('hide');
                $location.path("/play");
            } else {
                reject(requester);
            }
        });

        socket.on('game request response', function(responder, answer) {
            if (answer == 'accepted') {
                angular.element(document.querySelector('#modal')).modal('hide');
                $location.path("/play");
            }
            else {
                alert(responder + ' has rejected your request to play a game.');
            }

        })
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
        sendRequest: sendRequest
    };
});