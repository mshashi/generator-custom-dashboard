'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var yamljs = require('yamljs');
var fs = require('fs');
var chalk = require('chalk');

module.exports = yeoman.Base.extend({

      initializing: function() {

        try {
          fs.lstatSync('config.yml');
        } catch (e) {
          console.log(chalk.red.bold('config.yml is missing. Please add the file to the installation directory'));
          process.exit(1);
        }

        this.configYMLObject = yamljs.load('config.yml');

        this.applicationPOJOs = [];

        var POJOS = this.configYMLObject.POJO;
        var classNames = Object.keys(POJOS);

        if (classNames !== undefined && classNames.length > 0) {
          //Loop through the classNames to get the details from POJOS
          for (var classNamesIndex = 0; classNamesIndex < classNames.length; classNamesIndex++) {
            var className = classNames[classNamesIndex];

            //Create a class to push into applicationPOJOs list
            var classDetails = {
              className: className,
              variables: []
            }

            //Get all the variables for the class name
            var variables = POJOS[className].variables;

            //If there are no variables, then just create the class without variables else, 
            //loop through the list of variables to arrange them properly to create the class.
            if (variables !== undefined && variables.length > 0) {

              //Iterate through the variables list
              for (var variablesIndex = 0; variablesIndex < variables.length; variablesIndex++) {

                //Get the variable Details
                var variableDetails = variables[variablesIndex];

                //Get the first variable name. Usually, only one variable
                var variableName = Object.keys(variableDetails)[0];

                //Create the method name for the variable Name
                var fieldInJavaBeanMethod;
                if (variableName.length > 1) {
                  var firstLetter = variableName.charAt(0);
                  var secondLetter = variableName.charAt(1);
                  if (firstLetter === firstLetter.toLowerCase() && secondLetter === secondLetter.toUpperCase()) {
                    fieldInJavaBeanMethod = firstLetter.toLowerCase() + variableName.slice(1);
                  } else {
                    fieldInJavaBeanMethod = _.upperFirst(variableName);
                  }
                } else {
                  fieldInJavaBeanMethod = _.upperFirst(variableName);
                }

                //Push rest of the class details
                classDetails.variables.push({
                  variableName: variableName,
                  variableType: variableDetails[variableName].type,
                  variableDefaultValue: variableDetails[variableName].default,
                  variableMethodName: fieldInJavaBeanMethod
                });
              }
            }

            this.applicationPOJOs.push(classDetails);
          }


          this.fields = [];
          this.properties = {};

          this.askForField = function(cb) {

            var prompts = [{
              type: 'confirm',
              name: 'fieldAdd',
              message: 'Do you want to add a field to your entity?',
              default: true
            }, {
              when: function(response) {
                return response.fieldAdd === true;
              },
              type: 'input',
              name: 'fieldName',
              message: 'What is the name of your field?'
            }, {
              when: function(response) {
                return response.fieldAdd === true;
              },
              type: 'list',
              name: 'fieldType',
              message: 'What is the type of your field?',
              choices: [{
                  value: 'String',
                  name: 'String'
                }, {
                  value: 'Integer',
                  name: 'Integer'
                }, {
                  value: 'Long',
                  name: 'Long'
                }, {
                  value: 'Float',
                  name: 'Float'
                },

                {
                  value: 'Boolean',
                  name: 'Boolean'
                }

              ],
              default: 0
            }];

            this.prompt(prompts, function(props) {

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
              } else {
                this.properties.fields = this.fields;
                cb();
              }
            }.bind(this));
          };
        },

        prompting: function() {
            var done = this.async();

            this.log('Thank you for using angular-spring generator!');
            this.fields = [];
            var prompts = [{
              type: 'input',
              name: 'projectName',
              message: 'What\'s the name of the project?',
              default: 'MyProject'
            }, {
              type: 'input',
              name: 'tla',
              message: 'What\'s your project tla?',
              default: 'tos'
            }, {
              type: 'input',
              name: 'packageName',
              message: 'What is your default Java package name?',

              validate: function(input) {
                if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)) return true;
                return 'The package name you have provided is not a valid Java package name.';
              },
              default: 'com.pkrm.usm.dashboard.server'
            }, {
              type: 'input',
              name: 'methodURL',
              message: 'Enter the end point URL ?',
              default: '/getFeatures'
            }, {
              type: 'input',
              name: 'url',
              message: 'Enter the external end point URL to be called ?',
              default: '/getUSMFeatureDetails'
            }, {
              type: 'input',
              name: 'entityClass',
              message: 'What\'s the name of the request DTO',
              default: 'USMRequest'
            }];

            this.prompt(prompts, function(props) {
              this.properties = props;
              this.properties.generatorName = 'generator-jhipster-usm-server';
              //done();
              this.askForField(done);
            }.bind(this));


          },

          writing: {

            app: function() {

              var underscoreParams = {
                evaluate: /\<\%([\s\S]+?)\%\>/g,
                interpolate: /\<\%\=([\s\S]+?)\%\>/g,
                escape: /\<-([\s\S]+?)\>/g
              };
              var baseProjectPath = 'base-project/';

              var genericTemplateFiles = ['_pom.xml'];
              var packagePath = this.properties.packageName.replace(/\./g, '/');
              var javaSrcPath = baseProjectPath + 'src/main/java/'
              var javaSrcTestPath = baseProjectPath + 'src/test/java/'
              var javaPath = 'src/main/java/' + packagePath + '/';
              var javaTestPath = 'src/test/java/' + packagePath + '/';
              var entityClass = this.properties.entityClass;
              this.host = this.configYMLObject && this.configYMLObject.host ? this.configYMLObject.host : {
                dev: '',
                local: ''
              };

              console.log(this.configYMLObject);

              // if(this.configYMLObject){
              //   host.dev = this.configYMLObject.host && this.configYMLObject.host.dev ? this.configYMLObject.host.dev: '';
              //   host.local = this.configYMLObject.local && this.configYMLObject.host.local ? this.configYMLObject.host.local: '';
              // }

              for (var f in genericTemplateFiles)
                this.template(baseProjectPath + genericTemplateFiles[f], genericTemplateFiles[f].substr(1, 500), this);

              // Directories
              this.directory(baseProjectPath + 'src/main/webapp/', 'src/main/webapp/');
              this.directory(baseProjectPath + 'src/test/resources/', 'src/test/resources/');
              this.directory(baseProjectPath + 'src/main/java/package/', 'src/main/java/' + packagePath + '/');
              this.directory(baseProjectPath + 'src/test/java/package/', 'src/test/java/' + packagePath + '/');


              // src/main/webapp files
              this.template(baseProjectPath + '_web.xml', 'src/main/webapp/WEB-INF/web.xml', this);
              this.template(baseProjectPath + 'src/main/webapp/config/config.properties', 'src/main/webapp/config/config.properties', this);


              // src/main/resources files
              this.template(baseProjectPath + 'src/main/resources/logback.xml', 'src/main/resources/logback.xml', this);
              this.template(baseProjectPath + 'src/main/resources/log4j2.xml', 'src/main/resources/log4j2.xml', this);
              this.template(baseProjectPath + 'src/main/resources/_dev.properties', 'src/main/resources/dev.properties', this);
              this.template(baseProjectPath + 'src/main/resources/_local.properties', 'src/main/resources/local.properties', this);
              this.template(baseProjectPath + 'src/main/resources/spring/application-config.xml', 'src/main/resources/spring/application-config.xml', this);
              this.template(baseProjectPath + 'src/main/resources/spring/mvc-config.xml', 'src/main/resources/spring/mvc-config.xml', this);
              this.template(baseProjectPath + 'src/main/resources/spring/usm-application-context.xml', 'src/main/resources/spring/usm-application-context.xml', this);


              // src/main/java files
              this.template(javaSrcPath + 'package/util/USMDashboardMapper.java', javaPath + 'util/USMDashboardMapper.java', this);
              this.template(javaSrcPath + 'package/controller/ApplicationController.java', javaPath + 'controller/ApplicationController.java', this);
              this.template(javaSrcPath + 'package/controller/BaseController.java', javaPath + 'controller/BaseController.java', this);
              this.template(javaSrcPath + 'Entity.java', javaPath + 'dto/' + entityClass + '.java', this);
              this.template(javaSrcPath + 'package/service/ApplicationService.java', javaPath + 'service/ApplicationService.java', this);


              // src/test/java files
              this.template(javaSrcTestPath + 'package/controller/ApplicationControllerTest.java', javaTestPath + 'controller/ApplicationControllerTest.java', this);
              this.template(javaSrcTestPath + 'package/service/ApplicationServiceTest.java', javaTestPath + 'service/ApplicationServiceTest.java', this);

              // src/test/resources files
              this.template(baseProjectPath + 'src/test/resources/config/config.test.properties', 'src/test/resources/config/config.test.properties', this);

            },

            projectfiles: function() {}
          }
      });