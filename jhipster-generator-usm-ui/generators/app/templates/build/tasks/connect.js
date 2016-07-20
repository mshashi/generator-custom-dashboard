'use strict';
/**
 * Runs a connect server with livereload functionality
 */
var path = require('path');
var UprrMiddlewares = require('uprr-middlewares');

var buildConfig = require(path.resolve('build/config.js'));

module.exports = {
    livereload: {
        options: {
            livereload: '<%= ports.livereload %>',
            port: '<%= ports.connect %>',
            hostname: '0.0.0.0', /* Change this to 'localhost' to disallow access by IP */
            middleware: function(connect) {
              return UprrMiddlewares(buildConfig.proxies)
                .concat([
                  connect.static(path.resolve(buildConfig.buildDir)),
                ]);
            }
        }
    }
};
