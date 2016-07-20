'use strict';
function HttpInterceptor(SERVICE_URL) {
    this.request = (config) => {
        if (config.url.indexOf(SERVICE_URL) > -1 && angular.isDefined(config.data)) {
            delete config.data.trainId;
        }
        return config;
    };
}

angular.module('<%= camelAppName %>.common.services')
.service('HttpInterceptor', HttpInterceptor);