'use strict';
var fs = require('fs');
var path = require('path');
var basePath = path.resolve('build/tasks');

fs.readdirSync(basePath).forEach(function(file) {
  if (file.match(/.+\.js/g) !== null) {
    var name = file.replace('.js', '');
    exports[name] = require(basePath + '/' + file);
  }
});
