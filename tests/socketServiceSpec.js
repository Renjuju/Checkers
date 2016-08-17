(function() {
	'use strict';
	describe('Socket Service', function() {
		var location;
		var SocketService;

		beforeEach(module('checkers'));

		beforeEach(inject(function(_SocketService_, $location) {
			location = $location;
			SocketService = _SocketService_;
		}));

		it('expects to return socket', function() {
			SocketService.getSocket();
		});

		it('expects to resolve socket functions calling socket.emit', function() {
			SocketService.connect('User');
			SocketService.accept('User');
			SocketService.reject('User');
			SocketService.sendRequest('User');
			SocketService.disconnect('User');
			SocketService.forfeit('User');
			SocketService.updateBoard([], 'Opponent');
			SocketService.win('Winner', 'Loser');
		});

		it('expects to get users', function() {
			SocketService.getUsers();
		});
	});
})();
