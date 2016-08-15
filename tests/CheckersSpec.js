(function() {
    'use strict';
    describe('Base Checkers Controller', function () {

        var scope;
        var ctrl;
        var httpBackend;

        beforeEach(module('checkers'));
        beforeEach(module(function($provide) {
            $provide.service('SocketService', function() {
               return {
                   connect: angular.noop
               };
            });
        }));
        beforeEach(inject(function($rootScope, $controller, $window, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            $window.particlesJS = {
                load:angular.noop
            };

            ctrl = $controller('CheckersController', {
                $scope: scope
            });
        }));

        it('expects open to return when no name specified', function(){
            var returnValue = scope.open();
            expect(returnValue).to.be.an('undefined');
        });

        it('expects to open the modal', function() {
           scope.open('Renju');
           expect(name).to.not.be.an('undefined');
            // var spy = sinon.spy($log , 'info');
            // expect(spy).to.have.been.called();
        });

        it('expects to resolve http promise', function() {
            var response = {
                data : {
                    total_rows: 5
                }
            };
            
            response.data.total_rows
            httpBackend.expectGET('/getAnalytics').respond(response);
            httpBackend.flush();
        });
    });
})();
