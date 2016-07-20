'use strict';

/*
 * Apply several post-processors to your CSS using https://github.com/postcss/postcss.
 */
module.exports = {
    options: {
        processors: [
            require('autoprefixer-core')({
                browsers: ['> 5%', 'last 2 version', 'ie >= 8', 'bb >= 7', 'ff >= 3', 'Opera >= 10.11']
            })
        ]
    },
    dist: {
        src: [
            '<%= buildConfig.buildDir %>/assets/main.css'
        ]
    }
};
