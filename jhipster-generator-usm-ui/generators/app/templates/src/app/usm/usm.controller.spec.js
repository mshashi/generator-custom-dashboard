'use strict';

describe('WelcomeCtrl', function() {

    var controller;

    beforeEach(module('<%= camelAppName %>.welcome'));

    beforeEach(inject(function($rootScope, $controller) {
        controller = $controller('WelcomeCtrl');
    }));

    it('exists', function() {
        expect(controller).toBeTruthy();
    });

    it('should have a welcome message', function() {
        expect(controller.welcomeMessage).toBe('It works!');
    });

});
