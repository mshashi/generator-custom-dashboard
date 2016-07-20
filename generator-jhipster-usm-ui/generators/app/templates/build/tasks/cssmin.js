'use strict';
/**
 * Minifies the CSS files
 */
module.exports = {
  options: {
    report: 'min'
  },
  compile: {
    src: '<%= buildConfig.compileDir %>/main.css',
    dest: '<%= buildConfig.compileDir %>/main.css'
  }
};
