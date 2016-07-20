'use strict';

module.exports = function(grunt) {

    var pkg = require(require('path').resolve('package.json'));
    grunt.task.registerTask('ricola3VersionCheck', 'Preflight check of ricola 3 version', function() {
        if (pkg.dependencies.ricola3.indexOf('-LATEST') > -1) {
            grunt.fatal('Deploying an application pointing to the -LATEST tag of Ricola 3 is not allowed.  ' +
                'Please choose a deployed version number and test your application against that before deploying.\n\n' +
                'You can resolve this by doing the following: \n1. Run `npm info ricola3` to view the available deployed versions' +
                '\n2. Update the chosen version number in package.json\n3. Run `npm cache clean ricola3` and `npm install`');
        }
    });

};
