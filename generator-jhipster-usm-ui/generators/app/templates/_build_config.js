'use strict';

/**
 * This file/module contains the configuration options for the build & run process.
 */
module.exports = {

    /**
     * This is the same as `appFiles`, except it contains patterns that reference vendor code (`node_modules/`) that we need to place into the build process
     * somewhere. While the `appFiles` property ensures all standardized files are collected for compilation, it is the user's job to ensure non-standardized
     * (i.e. vendor-related) files are handled appropriately in `vendorFiles.js`. The `vendorFiles.js` property holds files to be automatically concatenated
     * and minified with our project source files. The `vendorFiles.css` property holds any CSS files to be automatically included in our app. The `vendorFiles.html`
     * and `vendorFiles.images` properties hold files that will not be flattened or minified. Add Ricola lib files here. `vendorFiles.assets` property holds any
     * assets to be copied along with our app's assets. This structure is flattened, so it is not recommended that you use wildcards.
     */
    vendorFiles: {
        js: [
            'node_modules/babel-core/browser-polyfill.js',
            'node_modules/grunt-babel/node_modules/babel-core/browser-polyfill.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/ricola3/ricola.js',
            'node_modules/fastclick/lib/fastclick.js'
        ],
        css: [
            // Ricola and application CSS will be loaded at the Sass compilation phase.
        ],
        // files in html/images will not be flattened or minified
        html: [],
        images: [
            'node_modules/ricola3/icons/**/*'
        ],
        assets: []
    },

    /**
     * You will want to configure the proxy below to point to your backing application.
     */
    proxies: [
        {
            context: '/uit/angular',
            host: 'xdev.home.www.uprr.com',
            port: 80,
            https: false,
            changeOrigin: false
        },
        {
            context: '/uit/ricola/jas',
            host: 'xdev.home.www.uprr.com',
            https: true,
            loginUrl: 'https://xdev.home.www.uprr.com/admin/login.fcc?TARGET='
        },
        {
            context: '/uit/ricola',
            host: 'xdev.home.www.uprr.com',
            port: 80,
            https: false,
            changeOrigin: false
        },
        {
            context: '/<%= tla %>',
            host: 'localhost',
            port: <%= port %>
        }
    ],

    /**
     * The `buildDir` folder is where our projects are compiled during development and the `compileDir` folder is where our app resides once it's completely
     * built.
     */
    buildDir: 'target',
    compileDir: 'target/bin',

    /**
     * This is a collection of file patterns that refer to our app code (the stuff in `src/`). These file paths are used in the configuration of build tasks.
     * `js` is all project javascript, scss tests. `ctpl` contains our reusable components' (`src/common`) template HTML files, while `atpl` contains the same,
     * but for our app's code. `html` is just our main HTML file, `scss` is our main stylesheet, and `unit` contains our app's unit tests.
     */
    appFiles: {
        js: [
            'src/**/*module.js',
            'src/**/*.js',
            '!src/**/*.spec.js',
            '!src/assets/**/*.js'
        ],
        jsunit: ['src/**/*.spec.js'],

        atpl: ['src/app/**/*.html'],
        ctpl: ['src/common/**/*.html'],

        html: ['src/index.html'],
        sass: 'src/sass/main.scss'
    },

    /**
     * This is a collection of files used during testing only.  Before - loaded before your test scripts.  After - well you take a wild guess.
     */
    testFiles: {
        before: {
            js: []
        },
        after: {
            js: ['node_modules/angular-mocks/angular-mocks.js']
        }
    }
};
