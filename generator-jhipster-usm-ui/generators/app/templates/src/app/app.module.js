'use strict';

/*
 * This file defines your top level module and all of it's dependencies. Typically there will not be too much logic or code in this file.
 */
angular.module('<%= camelAppName %>', [
    'rc',
    'ngRoute',
    'templates-app',
    'templates-common',
    '<%= camelAppName %>.common',
    '<%= camelAppName %>.welcome'
]);