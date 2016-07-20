'use strict';
function ErrorInterceptor($rootScope, $q, SERVICE_URL) {
    this.errors = $rootScope.errors = [];

    $rootScope.$on('$routeChangeSuccess', () => {
        this.errors = $rootScope.errors = [];
    });

    this.response = (responseObj) => {
        return responseObj || $q.when(responseObj);
    };

    this.responseError = (rejection) => {
        var defaultErrorMessage = 'There was an error while loading the page',
            connectionRefusedError = 'Unable to connect to server';

        if ((rejection.status === 0 || rejection.status === 404 || rejection.status === 500) && rejection.config.url === SERVICE_URL + '/train') {
            this.errors = [
                'Check out the Spring MVC archetype to get the train service that goes along with this code deployed!',
                'http://go.up.com/SpringMVCArchetype.  If you have this set up, check your Spring MVC context to check that they match!'
            ];
        }
        // swallow errors that just print out the HTML of the apache error page and generically
        // catch application errors and their statuses and place them on the rootScope.
        // Again, this will need to be reconsidered for each application
        // to determine how to handle these error messages.
        else if (rejection.data.indexOf('<!DOCTYPE')) {
            if (rejection.status === 0) {
                this.addUniqueError(connectionRefusedError);
            } else if (!!rejection.data && rejection.status) {
                this.addUniqueError(rejection.data + ' (' + rejection.status + ')');
            } else {
                this.addUniqueError(defaultErrorMessage);
            }
        } else {
            this.addUniqueError(defaultErrorMessage);
        }

        $rootScope.errors = this.errors;
        return $q.reject(rejection);
    };

    this.addUniqueError = (error) => {
        if (!!error && this.errors.indexOf(error) === -1) {
            this.errors.push(error);
        }
    };
}

angular.module('<%= camelAppName %>.common.services')
.service('ErrorInterceptor', ErrorInterceptor);