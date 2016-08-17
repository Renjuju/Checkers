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
			var position = {a1: 'wP'};
			CheckerBoardService.populateBoard(position);
			var piece = 'wP';
			var oldPos = 'a1';
			var newPos = 'b2';

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
			
			//expect(retVal).to.equal(_board);

			var position = {a1: 'wP', b2: 'bP'};
			CheckerBoardService.populateBoard(position);

			var retVal = CheckerBoardService.getVirtualBoard();
			for(var i = 0; i<retVal.length; i++){
				console.log("retVal[]", retVal[i]);
			}

			var piece = 'wP';
			var oldPos = 'a1';
			var newPos = 'c3';

			var retVal = CheckerBoardService.validMove(piece, oldPos, newPos);
			expect(retVal).to.equal(true);

			var res = CheckerBoardService;
		});

	});
})();