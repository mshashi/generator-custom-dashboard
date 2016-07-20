'use strict';

describe('Application Constants', function() {

    var SERVICE_URL;

    beforeEach(module('<%= camelAppName %>.common.constants'));

    beforeEach(inject(function(_SERVICE_URL_) {
        SERVICE_URL = _SERVICE_URL_;
    }));

    it('should have a constant for service URL', function() {
        expect(SERVICE_URL).toBe('/<%= tla %>/<%= hyphenAppName %>/secure/jas');
    });

});
