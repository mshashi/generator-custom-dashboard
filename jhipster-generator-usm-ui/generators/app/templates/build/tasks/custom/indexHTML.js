'use strict';

var filter = require(require('path').resolve('build/utils/filter'));

/**
 * The index.html template includes the stylesheet and javascript sources based on dynamic names calculated in this Gruntfile. This task assembles the list
 * into variables for the template to use and then runs the compilation.
 */
module.exports = function(grunt) {

    grunt.registerMultiTask('indexHTML', 'Process index.html template', function() {
        var buildConfig = grunt.config('buildConfig'),
            replaceDirExp = this.data.dir.replace(/\//g, '\\/'),
            dirRE = new RegExp('^(' + replaceDirExp + ')\/', 'g'),
            jsFiles = filter.forJS(this.filesSrc).map(function(file) {
                return file.replace(dirRE, '');
            }),
            cssFiles = filter.forCSS(this.filesSrc).map(function(file) {
                return file.replace(dirRE, '');
            });

        grunt.file.copy('src/index.html', buildConfig[this.target + 'Dir'] + '/index.html', {
            process: function(contents) {
                return grunt.template.process(contents, {
                    data: {
                        jsFiles: jsFiles,
                        cssFiles: cssFiles,
                        buildConfig: buildConfig,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });
};
