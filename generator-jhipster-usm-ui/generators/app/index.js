'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'usm-ui'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {
   
    compose: function (args) {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        },
	 this.pkg = require(__dirname + '/../../package.json'),
        this.options.testmode ? {local: require.resolve('generator-jhipster/modules')} : null
      );
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the ' + chalk.red('JHipster usm-ui') + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'));
    }
  },

  prompting: function () {
    var done = this.async();

   var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What do you want to name your project? e.g. My Awesome Webapp',
            default: this.appname,
            required: true
        }, {
            type: 'input',
            name: 'tla',
            message: 'Please enter your TLA',
            default: 'tla',
            required: true
        },
	{
            type: 'input',
            name: 'port',
            message: 'Please enter server port number',
            default: '',
            required: true
        },
	{
            type: 'input',
            name: 'serviceURL',
            message: 'Please enter service URL.',
            default: '',
            required: true
        }];

    this.prompt(prompts, function (props) {
	this.props=props
	this.name = props.name;
        this.hyphenAppName = props.name;// this._.slugify(this._.humanize(props.name));
        this.camelAppName = props.name;//this._.camelize(this.hyphenAppName);
        this.tla = props.tla.toLowerCase();
	this.port=Number(props.port);
	this.serviceURL=props.serviceURL;
        done();
    }.bind(this));
  },

   configuring: {
        enforceFolderName: function() {
            //if (this.hyphenAppName !== this._.last(this.destinationRoot().split(path.sep))) {
            //    this.destinationRoot(this.hyphenAppName);
            //}
            this.config.save();
        }
    },

  writing: {
    writeTemplates : function () {
      this.baseName = jhipsterVar.baseName;
      this.packageName = jhipsterVar.packageName;
      this.angularAppName = jhipsterVar.angularAppName;
      //var javaDir = jhipsterVar.javaDir;
      //var resourceDir = jhipsterVar.resourceDir;
      var webappDir = jhipsterVar.webappDir;

      this.message = this.props.message;

      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      this.log('message=' + this.message);
	
       //this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g; /* allows for ES6 strings */

            this.mkdir('src');
            this.mkdir('src/app');
            this.mkdir('src/assets');
            this.mkdir('src/sass');

            this.copy('src/sass/main.scss', 'src/sass/main.scss');
            this.template('src/index.html', 'src/index.html');
            this.template('src/app/app.module.js', 'src/app/app.module.js');
            this.template('src/app/app.config.js', 'src/app/app.config.js');
            this.template('src/app/app.controller.js', 'src/app/app.controller.js');
            this.template('src/app/app.controller.spec.js', 'src/app/app.controller.spec.js');

            this.copy('_package.json', 'package.json');
            this.copy('_Gruntfile.js', 'Gruntfile.js');
            this.copy('_README.md', 'README.md');

            this.bulkDirectory('build', 'build');
            this.template('_build_config.js', 'build/config.js');

            // copy and template over the example module code
            // this is separate from a standard ricola-webapp:module
            // because it has specific examples inside of it and
            // is not generic

            // common
            this.mkdir('src/app/common');
            this.mkdir('src/app/common/models');
            this.mkdir('src/app/common/services');
            this.mkdir('src/app/common/constants');
            this.template('src/app/common/common.module.js');
            this.template('src/app/common/common.module.spec.js');
            this.template('src/app/common/models/models.module.js');
            this.template('src/app/common/models/usmService.js');
            this.template('src/app/common/models/models.spec.js');
            this.template('src/app/common/services/services.module.js');
            this.template('src/app/common/services/error-interceptor.js');
            this.template('src/app/common/services/error-interceptor.spec.js');
            this.template('src/app/common/services/http-interceptor.js');
            this.template('src/app/common/services/http-interceptor.spec.js');
            this.template('src/app/common/constants/constants.module.js');
            this.template('src/app/common/constants/nav-content.js');
            this.template('src/app/common/constants/service.js');
            this.template('src/app/common/constants/constants.spec.js');

            // welcome
            this.mkdir('src/app/usm');
            this.template('src/app/usm/usm.module.js');
            this.template('src/app/usm/usm.config.js');
            this.template('src/app/usm/usm.controller.js');
            this.template('src/app/usm/usm.controller.spec.js');
            this.template('src/app/usm/usm.html');
            this.template('src/app/usm/_usm.scss');

     
    }
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.log('End of usm-ui generator');
  }
});
