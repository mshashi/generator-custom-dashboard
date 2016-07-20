'use strict';
function appConfig($routeProvider, $httpProvider) {

    /*// see src/app/common/services/error-interceptor.js
    $httpProvider.interceptors.push('ErrorInterceptor');

    // see src/app/common/services/http-interceptor.js
    $httpProvider.interceptors.push('HttpInterceptor');*/

    // This is to set the landing page of your
    // application if nothing else is mapped to handle
    // the current path
    $routeProvider.otherwise({
        redirectTo: '/welcome'
    });
}

/*
 * This file defines your top-level application routes.
 * Uses ng-route by default, but you can switch to ui-router if you want.
 */
angular.module('<%= camelAppName %>')
.config(appConfig);