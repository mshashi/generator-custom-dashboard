'use strict';
function welcomeConfig($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'usm/usm.html',
        controller: 'USMCtrl'
    }).when("/edit", {
      templateUrl: 'usm/usmGrid.html',
      controller: 'USMGridCtrl'
    });
}

angular.module('<%= camelAppName %>.welcome')
.config(welcomeConfig);
