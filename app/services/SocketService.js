angular.module('checkers').service('SocketService', function() {

    var socket = io;

    function connect(user) {
        socket = io.connect();
        socket.emit('send message', 'hello world');
        socket.on('new message', function(data) {
            console.log('message received');
            console.log('message: ', data);
        });
    }

    function disconnect() {
        socket.disconnect();
    }


    return {
        connect: connect,
        disconnect: disconnect
    };
});