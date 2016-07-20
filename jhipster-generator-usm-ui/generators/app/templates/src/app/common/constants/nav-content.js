'use strict';
angular.module('<%= camelAppName %>.common.constants')
.constant('NAV_CONTENT', [
    {
        label: 'Menu',
        sub: [
            {
                label: 'Example module',
                url: '#/welcome/train'
            },
            {
                label: 'Home',
                url: '#/'
            }
        ]
    },
    {
        label: 'Home',
        url: '#/'
    }
]);