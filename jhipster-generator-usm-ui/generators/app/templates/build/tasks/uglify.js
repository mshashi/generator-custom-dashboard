'use strict';

/**
 * Minify the javascript source files and create a map.
 */
module.exports = {
    compile: {
        options: {
            sourceMap: true,
            sourceMapIncludeSources: true,
            sourceMapIn: '<%= concat.compileJS.dest %>.map',
            sourceMapName: '<%= concat.compileJS.dest %>.map'
        },
        files: {
            '<%= concat.compileJS.dest %>': '<%= concat.compileJS.dest %>'
        }
    }
};
