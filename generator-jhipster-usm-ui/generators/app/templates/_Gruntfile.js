'use strict';

module.exports = function(grunt) {
    // Time how long Grunt tasks take.
    require('time-grunt')(grunt);

    // Load all Grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Load in our build configuration file.  This along with the grunt-tasks should be the
    // only thing you need to modify.
    var buildConfig = require('./build/config.js');

    // Create our Grunt configuration file.
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        buildConfig: buildConfig,
        ports: {
            livereload: 35729,
            connect: 9000
        }
    };

    // Load in our Grunt tasks. NOTE that the file name under tasks/ is important.
    // It should correspond to the task that you are providing options for.
    var gruntTasks = require('./build/loadGruntTasks.js');

    // Initialize Grunt
    grunt.initConfig(grunt.util._.extend(gruntConfig, gruntTasks));

    // Load our Grunt tasks including any custom ones.
    require('./build/registerGruntTasks.js')(grunt);
};
