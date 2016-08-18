(function(){
	'user strict'

	describe('CheckerBoard Service', function () {

		var CheckBoardService;

		beforeEach(module('checkers'));

		beforeEach(inject(function(_CheckerBoardService_){
			CheckerBoardService = _CheckerBoardService_;
		}));

		it('expects a board to be populated with data given position object', function(){
			var position = {a1: 'wP'};

			CheckerBoardService.populateBoard(position);

			var board = CheckerBoardService.getVirtualBoard();

			expect(board[0][0]).to.equal('wP');

			var res = CheckerBoardService;
		});

		it('expects a board to be set and returned', function(){
			var board = new Array(8);
			for(var i = 0; i<board.length; i++){
				board[i] = new Array(8);
				for(var j = 0; j<board[i].length; j++){
					board[i][j] = 'wP';
				}
			}

			CheckerBoardService.setVirtualBoard(board);

			var retVal = CheckerBoardService.getVirtualBoard();
			expect(retVal).to.equal(board);

			var res = CheckerBoardService;
		});

		it('expects jump occurred to be false', function(){
			CheckerBoardService.jumpOccurred = false;

			var retVal = CheckerBoardService.getJumpOccurred();
			expect(retVal).to.equal(false);
			
			var res = CheckerBoardService;
		});

		it('expects validMove to return true via positive move with a wP', function(){
			var position = {g7: 'wP'};
			CheckerBoardService.populateBoard(position);
			var piece = 'wP';
			var oldPos = 'g7';
			var newPos = 'f8';

			var retVal = CheckerBoardService.validMove(piece, oldPos, newPos);
			expect(retVal).to.equal(true);

			var res = CheckerBoardService;
		});

		it('expects validMove to return true via a positivejump with a wP', function(){
			var _board = new Array(8);
			for(var i = 0; i<_board.length; i++){
				_board[i] = new Array(8);
				for(var j = 0; j<_board[i].length; j++){
					_board[i][j] = "";
				}
			}
			CheckerBoardService.setVirtualBoard(_board);
			
			var position = {a1: 'wP', b2: 'bP'};
			CheckerBoardService.populateBoard(position);

			var piece = 'wP';
			var oldPos = 'a1';
			var newPos = 'c3';

			var retVal = CheckerBoardService.validMove(piece, oldPos, newPos);
			expect(retVal).to.equal(true);

			var res = CheckerBoardService;
		});

		it('expects validMove to return true via a negative move with a bP', function(){
			var position = {b2: 'bP'};
			CheckerBoardService.populateBoard(position);
			var piece = 'bP';
			var oldPos = 'b2';
			var newPos = 'a1';

			var retVal = CheckerBoardService.validMove(piece, oldPos, newPos);
			expect(retVal).to.equal(true);

			var res = CheckerBoardService;
		});

		it('expects validMove to return true via a positive move with a wK', function(){
			var position = {b2: 'wK'};
			CheckerBoardService.populateBoard(position);
			var piece = 'wK';
			var oldPos = 'b2';
			var newPos = 'a1';

			var retVal = CheckerBoardService.validMove(piece, oldPos, newPos);
			expect(retVal).to.equal(true);

			var res = CheckerBoardService;
		});

		it('expects validMove to return true via a positive move with a bK', function(){
			var position = {a1: 'bK'};
			CheckerBoardService.populateBoard(position);
			var piece = 'bK';
			var oldPos = 'a1';
			var newPos = 'b2';

			var retVal = CheckerBoardService.validMove(piece, oldPos, newPos);
			expect(retVal).to.equal(true);

			var res = CheckerBoardService;
		});

		it('expects checkForJumps to return false when there is a bP jump available', function(){
			var _board = new Array(8);
			for(var i = 0; i<_board.length; i++){
				_board[i] = new Array(8);
				for(var j = 0; j<_board[i].length; j++){
					_board[i][j] = "";
				}
			}
			CheckerBoardService.setVirtualBoard(_board);

			var position = {c3: 'bP', b2: 'wP'};
			var color = 'bP';
			var boardLocation = 'c3';

			var retVal = CheckerBoardService.checkForJumps(color, boardLocation);
			expect(retVal).to.equal(false);

		});

		it('expects checkWinLose to return win, when no white pieces exist on the board', function(){
			var _board = new Array(8);
			for(var i = 0; i<_board.length; i++){
				_board[i] = new Array(8);
				for(var j = 0; j<_board[i].length; j++){
					_board[i][j] = "";
				}
			}
			CheckerBoardService.setVirtualBoard(_board);

			var position = {a1: 'bK'};
			CheckerBoardService.populateBoard(position);
			
			var playerColor = 'bK';

			var retVal = CheckerBoardService.checkWinLose(playerColor); 
			expect(retVal).to.equal('win');

			var res = CheckerBoardService;
		});

		it('expects checkWinLose to return win, when no black pieces exist on the board', function(){
			var _board = new Array(8);
			for(var i = 0; i<_board.length; i++){
				_board[i] = new Array(8);
				for(var j = 0; j<_board[i].length; j++){
					_board[i][j] = "";
				}
			}
			CheckerBoardService.setVirtualBoard(_board);

			var position = {a1: 'wK'};
			CheckerBoardService.populateBoard(position);
			
			var playerColor = 'wK';

			var retVal = CheckerBoardService.checkWinLose(playerColor); 
			expect(retVal).to.equal('win');

			var res = CheckerBoardService;			
		});

		it('expects checkWinLose to return none, when no black pieces exist on the board', function(){
			var _board = new Array(8);
			for(var i = 0; i<_board.length; i++){
				_board[i] = new Array(8);
				for(var j = 0; j<_board[i].length; j++){
					_board[i][j] = "";
				}
			}
			CheckerBoardService.setVirtualBoard(_board);

			var position = {a1: 'wK', b8: 'bK'};
			CheckerBoardService.populateBoard(position);
			
			var playerColor = 'wK';

			var retVal = CheckerBoardService.checkWinLose(playerColor); 
			expect(retVal).to.equal('none');

			var res = CheckerBoardService;			
		});

	});
})();