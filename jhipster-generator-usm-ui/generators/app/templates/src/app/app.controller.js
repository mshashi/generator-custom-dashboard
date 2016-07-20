'use strict';
class AppCtrl {
    constructor($rcAlerts, NAV_CONTENT) {
        this.alerts = $rcAlerts.alerts;
        
    }
}

angular.module('<%= camelAppName %>')
.controller('AppCtrl', AppCtrl);