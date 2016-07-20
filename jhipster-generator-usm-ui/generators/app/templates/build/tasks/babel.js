module.exports = {
  options: {
    sourceMap: true
  },
  dist: {
    files: [
      {
        src: ['<%= buildConfig.appFiles.js %>'],
        dest: '<%= buildConfig.buildDir%>/',
        cwd: '.',
        ext: '.es5.js',
        extDot: 'last',
        expand: true
      }
    ]
  },
  compile: {
    files: [
      {
        src: '<%= buildConfig.compileDir %>/main.app.js',
        expand: true
      }
    ]
  }
};
