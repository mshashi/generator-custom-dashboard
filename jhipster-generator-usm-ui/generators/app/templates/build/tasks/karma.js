'use strict';

/**
 * The Karma configurations.
 */
module.exports = {
    options: {
        runnerPort: 9111,
        configFile: '<%= buildConfig.buildDir %>' + '/karma.conf.js'
    },
    unit: {
        singleRun: true,
        background: false,
        reporters: ['junit', 'coverage', 'dots'],
        browsers: ['PhantomJS']
    },
    loop: {
        singleRun: false,
        background: false,
        reporters: ['dots'],
        browsers: ['Chrome'],
        autoWatch: true
    },
    loopBackground: {
        singleRun: false,
        background: true,
        reporters: ['dots'],
        browsers: ['PhantomJS']
    },
    ci: {
        singleRun: true,
        background: false,
        reporters: ['junit', 'coverage', 'dots'],
        browsers: ['PhantomJS']
    }
};
