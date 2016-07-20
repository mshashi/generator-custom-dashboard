'use strict';

var path = require('path'),
    filter = require(path.resolve('build/utils/filter'));

/**
 * In order to avoid having to specify manually the files needed for karma to
 * run, we use grunt to manage the list for us. The `karma/*` files are
 * compiled as grunt templates for use by Karma.
 */
module.exports = function(grunt) {

    var buildConfig = grunt.config('buildConfig');

    grunt.registerMultiTask('karmaConfig', 'Process karma configuration template', function() {
        var jsFiles = filter.forJS(this.filesSrc);

        grunt.file.copy('build/tasks/templates/karma.conf.js', buildConfig.buildDir + '/karma.conf.js', {
            process: function(contents) {
                return grunt.template.process(contents, {
                    data: {
                        jsFiles: jsFiles,
                        buildConfig: buildConfig
                    }
                });
            }
        });
    });
};
