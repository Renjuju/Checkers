(function() {
    'use strict';
    describe('Base Checkers Controller', function () {

        var scope;
        var ctrl;

        beforeEach(module('checkers'));
        beforeEach(module(function($provide) {
            $provide.service('SocketService', function() {
               return {
                   connect: angular.noop
               };
            });
        }));
        beforeEach(inject(function($rootScope, $controller, $window) {
            scope = $rootScope.$new();

            $window.particlesJS = {
                load:angular.noop
            };

            ctrl = $controller('CheckersController', {
                $scope: scope
            });
        }));

        it('expects open to return when no name specified', function(){
            var name = scope.open();
            expect(name).to.be.an('undefined');
        });

        it('expects to open the modal', function() {
           scope.open('Renju');
            // var spy = sinon.spy($log , 'info');
            // expect(spy).to.have.been.called();
        });
    });
})();
