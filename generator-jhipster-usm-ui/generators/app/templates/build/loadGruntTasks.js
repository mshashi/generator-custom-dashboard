'use strict';

var basePath = require('path').resolve('build/tasks');

/*
 * This will load all the files in this directory and make them available
 * to the Grunt build.  Properties are prefixed by the file name
 */
require('fs').readdirSync(basePath).forEach(function(file) {
    if (file.match(/.+\.js/g) !== null) {
        var name = file.replace('.js', '');
        exports[name] = require(basePath + '/' + file);
    }
});
