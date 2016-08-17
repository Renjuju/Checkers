(function() {
    'use strict';
    describe('play modal controller', function () {

        var scope;
        var ctrl;
        var modalInstance;
        var SocketService;
        var CheckerBoardService;
        var location;
        var mockWindow;

        beforeEach(module('checkers'));

        beforeEach(module(function($provide) {
            $provide.service('SocketService', function($q) {
                return {
                    connect: angular.noop,
                    accept: angular.noop,
                    reject: angular.noop,
                    sendRequest: angular.noop,
                    disconnect: angular.noop,
                    getSocket: function() {
                        return {
                            on : function(name, func) {
                                var board = [[{val: 3},{val: 6}], []];
                                func(board);
                            }
                        };
                    },
                    updateBoard: angular.noop,
                    win: angular.noop
                };
            });

            $provide.service('CheckerBoardService', function() {
                return {
                    game: {
                        me: 'test',
                        opponent: 'test',
                        color: 'black',
                        turn: 'me'
                    },
                    setVirtualBoard: angular.noop,
                    populateBoard: angular.noop,
                    checkWinLose: angular.noop,
                    getVirtualBoard: function() {
                        return [[{val: 3},{val: 6}], []];
                    },
                    forceJump: function() {
                        return false;
                    },
                    validMove: function() {
                        return false;
                    },
                    checkDoubleJump: function() {
                        return true;
                    },
                    getJumpOccurred: function() {
                        return true;
                    }
                };
            });

            $provide.service('$uibModalInstance', function() {
                return {
                    dismiss: angular.noop,
                    close: angular.noop
                };
            });

        }));

        beforeEach(inject(function($rootScope, $controller, $uibModalInstance, _SocketService_, _CheckerBoardService_, $location, $window) {
            scope = $rootScope.$new();
            modalInstance = $uibModalInstance;
            SocketService = _SocketService_;
            CheckerBoardService = _CheckerBoardService_;
            location = $location;
            mockWindow = $window;
            mockWindow.ChessBoard = function() {
                return {
                    board: {
                        resize: true
                    }
                };
            };

            scope.cfg = {
                position: angular.noop
            };

            scope.updatecfg = angular.noop;

            var $route = {
                current: {
                    $$route: {
                        orientation: 'smh'
                    }
                }
            };

            ctrl = $controller('CheckerBoardCtrl', {
                $scope: scope,
                $uibModalInstance : modalInstance,
                SocketService : SocketService,
                $location: location,
                $window: mockWindow,
                $route: $route
            });
        }));

        it('expects onDragStart to return false', function() {
            var piece = {
                search: function() {
                    return -1;
                }
            };

            var response = scope.onDragStart(null, piece, false);

            expect(response).to.equal(false);
        });

        it('expects local config to call checkerboard service', function() {
            var spy = chai.spy.on(CheckerBoardService, 'getVirtualBoard');

            scope.updateLocalCfg();

            expect(spy).to.have.been.called();
        });

        it('expects ondrop to return a snapback', function() {
            var res = scope.onDrop();

            expect(res).to.equal('snapback');
        });

        it('expects ondrop to return snapback when forcejumps are allowed', function() {
            CheckerBoardService.forceJump = function() {
                return true;
            };

            var res = scope.onDrop();

            expect(res).to.equal('snapback');
        });

        it('expects ondrop to return nothing when checking for double jumps', function() {
            CheckerBoardService.forceJump = function() {
                return true;
            };
            CheckerBoardService.validMove = function() {
                return true;
            };

            var res = scope.onDrop();

            expect(res).to.equal(undefined);
        });

        it('expects ondrop to ', function() {
           CheckerBoardService.forceJump = function(){return true;};
           CheckerBoardService.validMove = function(){return true;};
           CheckerBoardService.checkDoubleJump = function(){return false;};

            var res = scope.onDrop();
        });
    });
})();
