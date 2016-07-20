'use strict';
describe('ErrorInterceptor Service', function() {

    var $rootScope, ErrorInterceptor, rejection, SERVICE_URL;

    beforeEach(module('<%= camelAppName %>.common.services'));

    beforeEach(inject(function(_$rootScope_, _ErrorInterceptor_, _SERVICE_URL_) {
        $rootScope = _$rootScope_;
        ErrorInterceptor = _ErrorInterceptor_;
        SERVICE_URL = _SERVICE_URL_;
        rejection = {
            config: {},
            status: 500,
            data: 'Some error'
        };
    }));

    it('clears errors on routeChangeSuccess', function() {
        $rootScope.errors = [{}];
        $rootScope.$emit('$routeChangeSuccess');
        expect($rootScope.errors.length).toBe(0);
    });

    describe('global array of errors', function() {

        it('exists', function() {
            expect($rootScope.errors).not.toBe(undefined);
        });

        it('has a default length of 0', function() {
            expect($rootScope.errors.length).toBe(0);
        });

    });

    describe('on responseError', function() {

        it('pushes an error onto global array', function() {
            ErrorInterceptor.responseError(rejection);
            expect($rootScope.errors.length).toBe(1);
            expect($rootScope.errors[0]).toEqual(rejection.data + ' (500)');
        });

        it('should only show unique errors', function() {
            ErrorInterceptor.responseError(rejection);
            ErrorInterceptor.responseError(rejection);
            rejection.status = 0;
            rejection.config = {
                url: SERVICE_URL + '/test'
            };
            var expected1 = rejection.data + ' (500)',
                expected2 = 'Unable to connect to server';
            ErrorInterceptor.responseError(rejection);
            expect($rootScope.errors.length).toBe(2);
            expect($rootScope.errors[0]).toEqual(expected1);
            expect($rootScope.errors[1]).toEqual(expected2);
        });

        it('should fall back on default message if data is empty', function() {
            rejection.data = '';
            ErrorInterceptor.responseError(rejection);
            var expected = 'There was an error while loading the page';
            expect($rootScope.errors[0]).toBe(expected);
        });

        it('should fall back on default message if status is undefined', function() {
            rejection.status = undefined;
            ErrorInterceptor.responseError(rejection);
            var expected = 'There was an error while loading the page';
            expect($rootScope.errors[0]).toBe(expected);
        });

        it('handles the 404 for spring mvc generator specifically', function() {
            rejection.status = 404;
            rejection.config = {
                url: SERVICE_URL + '/train'
            };
            var expected1 = 'Check out the Spring MVC archetype to get the train service that goes along with this code deployed!',
                expected2 = 'http://go.up.com/SpringMVCArchetype.  If you have this set up, check your Spring MVC context to check that they match!';
            ErrorInterceptor.responseError(rejection);
            expect($rootScope.errors[0]).toBe(expected1);
            expect($rootScope.errors[1]).toBe(expected2);
        });

        it('handles the 500 for spring mvc generator specifically', function() {
            rejection.status = 500;
            rejection.config = {
                url: SERVICE_URL + '/train'
            };
            var expected1 = 'Check out the Spring MVC archetype to get the train service that goes along with this code deployed!',
                expected2 = 'http://go.up.com/SpringMVCArchetype.  If you have this set up, check your Spring MVC context to check that they match!';
            ErrorInterceptor.responseError(rejection);
            expect($rootScope.errors[0]).toBe(expected1);
            expect($rootScope.errors[1]).toBe(expected2);
        });

        it('should result in default message if the error is the default apache error page', function() {
            rejection.data = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"';
            var expected = 'There was an error while loading the page';
            ErrorInterceptor.responseError(rejection);
            expect($rootScope.errors.length).toEqual(1);
            expect($rootScope.errors[0]).toBe(expected);
        });

    });
});
