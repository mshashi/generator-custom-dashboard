'use strict';
describe('AppCtrl', function() {
    var app;
    beforeEach(module('<%= camelAppName %>'));

    beforeEach(inject(function($controller) {
        app = $controller('AppCtrl');
    }));

    it('should put navigation items on the scope', function() {
        expect(app.navContent).toBeDefined();
    });

});
