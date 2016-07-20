'use strict';

/**
 * `grunt concat` concatenates multiple source files into a single file.
 */
module.exports = {
    /**
     * The `buildCSS` target concatenates compiled CSS and vendor CSS together.
     */
    buildCSS: {
        src: [
            '<%= buildConfig.vendorFiles.css %>',
            '<%= buildConfig.buildDir %>/assets/main.css'
        ],
        dest: '<%= buildConfig.compileDir %>/main.css'
    },
    compileAppJS: {
        options: {
            sourceMap: true
        },
        src: [
            './build/module.prefix',
            '<%= buildConfig.buildDir%>/src/**/*module*.js',
            '<%= buildConfig.buildDir%>/src/**/*.js',
            './build/module.suffix'
        ],
        dest: '<%= buildConfig.compileDir %>/main.app.js'
    },
    compileAppTemplates: {
        options: {
            sourceMap: true
        },
        src: [
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>'
        ],
        dest: '<%= buildConfig.compileDir %>/main.app.templates.js'
    },
    compileVendorJS: {
        options: {
            sourceMap: true
        },
        src: [
            '<%= buildConfig.vendorFiles.js %>'
        ],
        dest: '<%= buildConfig.compileDir %>/main.vendor.js'
    },
    /**
     * The `compileJS` target is the concatenation of our application source code and all specified vendor source code into a single file.
     */
    compileJS: {
        options: {
            sourceMap: true
        },
        src: [
            '<%= buildConfig.vendorFiles.js %>',
            './build/module.prefix',
            '<%= buildConfig.buildDir%>/src/**/*module*.js',
            '<%= buildConfig.buildDir%>/src/**/*.js',
            './build/module.suffix',
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>'
        ],
        dest: '<%= buildConfig.compileDir %>/main.js'
    }
};
