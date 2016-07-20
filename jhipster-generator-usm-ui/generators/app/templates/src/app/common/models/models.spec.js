'use strict';

describe('TrainModel', function() {

    var Train, SERVICE_URL, $httpBackend;

    beforeEach(module('<%= camelAppName %>.common.models'));

    beforeEach(inject(function(_Train_, _SERVICE_URL_, _$httpBackend_) {
        Train = _Train_;
        SERVICE_URL = _SERVICE_URL_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('querys the correct URL', function() {
        var regex = new RegExp(SERVICE_URL + '/train');
        $httpBackend.expectGET(regex).respond(201, []);
        Train.query();
        $httpBackend.flush();
    });

    it('saves to the correct URL', function() {
        var regex = new RegExp(SERVICE_URL + '/train/1');
        $httpBackend.expectPOST(regex).respond(201, {});
        var train = new Train({
            id: 1
        });
        train.$save();
        $httpBackend.flush();
    });

});
