'use strict';

/**
 * `ng-annotate` annotates the sources before minifying. That is, it allows us to code without the array syntax.
 */
module.exports = {
    options: {
        sourceMap: true
    },
    target: {
        cwd: '<%= babel.dist.dest %>',
        src: ['**/*.es5.js'],
        expand: true,
        dest: ''
    }
};
