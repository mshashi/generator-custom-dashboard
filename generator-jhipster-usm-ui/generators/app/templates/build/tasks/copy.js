'use strict';

/*
 * function that removes node_modules/<dependency-name>/ from the path so that
 * when compiling the resulting files are in the correct relative directory.
 */
var rename = function(dest, src) {
    if (!src || !dest) {
        throw new Error('In order to copy dependency files src and dest are needed');
    }
    var delimiter = '/',
        // remove node_modules/<dependency-name>/
        tokens = src.split(delimiter).slice(2);
    return dest + tokens.join(delimiter);
};

/**
 * The `copy` task just copies files from A to B. We use it here to copy our project assets (images, fonts, etc.) and javascripts into `buildDir
 * and then to copy the assets to `compileDir`.
 */
module.exports = {
    appAssets: {
        files: [{
            src: ['**'],
            dest: '<%= buildConfig.buildDir%>/assets/',
            cwd: 'src/assets',
            expand: true
        }]
    },
    appAssetsCompile: {
        files: [{
            src: ['**'],
            dest: '<%= buildConfig.compileDir%>/assets/',
            cwd: 'src/assets',
            expand: true
        }]
    },
    vendorAssets: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.assets %>'],
            dest: '<%= buildConfig.buildDir%>/assets/',
            cwd: '.',
            expand: true,
            flatten: true
        }]
    },
    vendorAssetsCompile: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.assets %>'],
            dest: '<%= buildConfig.compileDir%>/',
            cwd: '.',
            expand: true,
            rename: rename
        }]
    },
    vendorJS: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.js %>'],
            dest: '<%= buildConfig.buildDir%>/',
            cwd: '.',
            expand: true
        }]
    },
    vendorCSS: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.css %>'],
            dest: '<%= buildConfig.buildDir%>/',
            cwd: '.',
            expand: true
        }]
    },
    vendorImages: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.images %>'],
            dest: '<%= buildConfig.buildDir%>/',
            cwd: '.',
            expand: true
        }]
    },
    vendorImagesCompile: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.images %>'],
            dest: '<%= buildConfig.compileDir%>/',
            cwd: '.',
            expand: true,
            rename: rename
        }]
    },
    vendorHTML: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.html %>'],
            dest: '<%= buildConfig.buildDir%>/',
            cwd: '.',
            expand: true
        }]
    },
    vendorHTMLCompile: {
        files: [{
            src: ['<%= buildConfig.vendorFiles.html %>'],
            dest: '<%= buildConfig.compileDir%>/',
            cwd: '.',
            expand: true,
            rename: rename
        }]
    }
};
