angular.module('checkers')
    .service('SocketService', function() {

    var socket = io;
    var users = [];

    function connect(user) {
        if(users.length == 0) {
            users.push(user);
        }
        socket = io.connect();
        socket.emit('send message', user);
        socket.on('new message', function(data) {
            // users = data;
            $('#userList').append('<div class="well">' + data[data.length-1] + '</div>');
        });
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
        getUsers: getUsers
    };
});