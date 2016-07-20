'use strict';
describe('HttpInterceptor Service', function() {

    var HttpInterceptor, config;

    beforeEach(module('<%= camelAppName %>.common.services'));

    beforeEach(inject(function(_HttpInterceptor_, _SERVICE_URL_) {
        HttpInterceptor = _HttpInterceptor_;
        config = {
            url: _SERVICE_URL_ + '/train/1',
            data: {
                day: 5,
                trainId: 'MRORV 5'
            }
        };
    }));

    describe('on request', function() {

        it('should remove the trainId from the body for service URL', function() {
            var actual = HttpInterceptor.request(config);
            expect(actual.data.trainId).toBeFalsy();
        });

        it('should not remove the trainId from the body from any other URL', function() {
            config.url = '/some/other/url';
            var actual = HttpInterceptor.request(config);
            expect(actual.data.trainId).toBeTruthy();
        });

    });

});