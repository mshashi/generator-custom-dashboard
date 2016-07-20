'use strict';
/*
 *	The files or directories that will be removed when the clean task is run
 */
module.exports = {
    dist: [
        '<%=buildConfig.buildDir%>',
        '<%=buildConfig.compileDir%>'
    ],
    compile: [
        '<%= buildConfig.compileDir %>/main.vendor.js',
        '<%= buildConfig.compileDir %>/main.app.js',
        '<%= buildConfig.compileDir %>/main.app.templates.js'
    ]
};
