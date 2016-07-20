'use strict';
function welcomeConfig($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'usm/usm.html',
        controller: 'USMCtrl'
    });
}

angular.module('<%= camelAppName %>.welcome')
.config(welcomeConfig);