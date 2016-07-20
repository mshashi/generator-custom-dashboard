'use strict';
var yeoman = require('yeoman-generator');
 var _ = require('lodash');


module.exports = yeoman.generators.Base.extend({
  
  initializing: function () {
    this.pkg = require('../package.json');
    /*this.prompts = require('./prompts');*/
    this.fields = [];
    this.properties={};
    
   
    this.askForField=function (cb) {
    
	/*this.log('Thank you ');*/
	var prompts = [
		{
            type: 'confirm',
            name: 'fieldAdd',
            message: 'Do you want to add a field to your entity?',
            default: true
        },
        {
            when: function (response) {
                return response.fieldAdd === true;
            },
            type: 'input',
            name: 'fieldName',
            message: 'What is the name of your field?'
        },
        {
            when: function (response) {
                return response.fieldAdd === true;
            },
            type: 'list',
            name: 'fieldType',
            message: 'What is the type of your field?',
            choices: [
                {
                    value: 'String',
                    name: 'String'
                },
                {
                    value: 'Integer',
                    name: 'Integer'
                },
                {
                    value: 'Long',
                    name: 'Long'
                },
                {
                    value: 'Float',
                    name: 'Float'
                },
               
                {
                    value: 'Boolean',
                    name: 'Boolean'
                }
               
            ],
            default: 0
        }
     ];
     
     this.prompt(prompts, function (props) {
  
		if (props.fieldAdd) {
            

		var field = {
                fieldName: props.fieldName,
                fieldType: props.fieldType,
               
		};
		
                if (_.isUndefined(field.fieldInJavaBeanMethod)) {
                    // Handle the specific case when the second letter is capitalized
                    // See http://stackoverflow.com/questions/2948083/naming-convention-for-getters-setters-in-java
                    if (field.fieldName.length > 1) {
                        var firstLetter = field.fieldName.charAt(0);
                        var secondLetter = field.fieldName.charAt(1);
                        if (firstLetter === firstLetter.toLowerCase() && secondLetter === secondLetter.toUpperCase()) {
                            field.fieldInJavaBeanMethod = firstLetter.toLowerCase() + field.fieldName.slice(1);
                        } else {
                            field.fieldInJavaBeanMethod = _.upperFirst(field.fieldName);
                        }
                    } else {
                        field.fieldInJavaBeanMethod = _.upperFirst(field.fieldName);
                    }
                }
          
            this.fields.push(field);
		}
       
		if (props.fieldAdd) {
		this.askForField(cb);
		} else{
		this.properties.fields= this.fields;
		cb();
		}
		}.bind(this));
	};
  },

  prompting: function( ){
	var done = this.async();
	
	this.log('Thank you for using angular-spring generator!');
	this.fields = [];
	var prompts = [
		{ type: 'input', name: 'projectName', message: 'What\'s the name of the project?', default: 'MyProject' },
		{ type: 'input', name: 'tla', message: 'What\'s your project tla?', default: 'tos' },
    { type: 'input', name: 'packageName', message: 'What is your default Java package name?',
			
      validate: function (input) {
					if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)) return true;
					return 'The package name you have provided is not a valid Java package name.'; 
				  },
      default: 'com.pkrm.myapp'
		},
    { type: 'input', name: 'url', message: 'Enter the rest url to be called ?', default: '' },
		{ type: 'input',name: 'entityClass',message: 'What\'s the name of the request DTO',default: 'USMRequest'}
	];

	this.prompt(prompts, function (props) {
		this.properties               = props;
		this.properties.generatorName = this.pkg.name;
		//done();
		this.askForField(done);
	}.bind(this));
     
     
  },

  writing: {

    app: function () {

      var underscoreParams        = { evaluate: /\<\%([\s\S]+?)\%\>/g, interpolate: /\<\%\=([\s\S]+?)\%\>/g, escape: /\<-([\s\S]+?)\>/g };
      var baseProjectPath         = 'base-project/';

      var genericTemplateFiles    = [ '_pom.xml'];
      var packagePath             = this.properties.packageName.replace(/\./g, '/');
      var javaSrcPath             = baseProjectPath + 'src/main/java/'
      var javaSrcTestPath         = baseProjectPath + 'src/test/java/'
      var javaPath                = 'src/main/java/' + packagePath + '/';
      var javaTestPath            = 'src/test/java/' + packagePath + '/';
      var entityClass=              this.properties.entityClass

       for (var f in genericTemplateFiles)
        this.template(baseProjectPath + genericTemplateFiles[f], genericTemplateFiles[f].substr(1,500), this);

   
      this.directory(baseProjectPath + 'src/main/webapp/', 'src/main/webapp/');
      this.directory(baseProjectPath + 'src/main/resources/', 'src/main/resources/');
      this.directory(baseProjectPath + 'src/test/resources/', 'src/test/resources/');

      this.directory(baseProjectPath + 'src/main/java/package/', 'src/main/java/' + packagePath + '/');
      this.directory(baseProjectPath + 'src/test/java/package/', 'src/test/java/' + packagePath + '/');

     
      this.template(baseProjectPath + '_web.xml', 'src/main/webapp/WEB-INF/web.xml', this);
	this.template(baseProjectPath + 'src/main/resources/logback.xml', 'src/main/resources/logback.xml', this);
      
      this.template(baseProjectPath + 'src/main/webapp/config/config.properties', 'src/main/webapp/config/config.properties', this);
      this.template(baseProjectPath + 'src/main/resources/spring/application-config.xml', 'src/main/resources/spring/application-config.xml', this);
      this.template(baseProjectPath + 'src/main/resources/spring/mvc-config.xml', 'src/main/resources/spring/mvc-config.xml', this);
      this.template(baseProjectPath + 'src/main/resources/log4j2.xml', 'src/main/resources/log4j2.xml', this);

      this.template(javaSrcPath + 'package/util/USMDashboardMapper.java', javaPath + 'util/USMDashboardMapper.java', this);
      this.template(javaSrcPath + 'package/controller/ApplicationController.java', javaPath + 'controller/ApplicationController.java', this);
      this.template(javaSrcPath + 'Entity.java', javaPath +'dto/'+ entityClass+'.java', this);
      this.template(javaSrcPath + 'package/service/ApplicationService.java', javaPath + 'service/ApplicationService.java', this);

      this.template(javaSrcTestPath + 'package/controller/ApplicationControllerTest.java', javaTestPath + 'controller/ApplicationControllerTest.java', this);
      this.template(javaSrcTestPath + 'package/service/ApplicationServiceTest.java', javaTestPath + 'service/ApplicationServiceTest.java', this);

      this.template(baseProjectPath + 'src/test/resources/config/config.test.properties', 'src/test/resources/config/config.test.properties', this);

    },

    projectfiles: function () { }
  }
});
