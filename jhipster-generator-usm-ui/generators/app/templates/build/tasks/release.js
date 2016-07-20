'use strict';
/**
 * The `release` task releases compiled assets to a samba share
 */
module.exports = {
  config: {
    version: '<%= pkg.version %>',
    localFolder: '<%= buildConfig.compileDir %>',
    devUrl: '\\\\webdev01.cmp.tla.uprr.com\\your\\path\\', /* Escape every backslash with an additional backslash */
  }
};
