/**
 * Angular constants
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/ericclemmons/grunt-angular-templates
 */
module.exports = function(grunt) {
  grunt.config.set('ngconstant', {
    dist: {
      options: {
        dest: 'assets/angular/app.fb.config.js',
        name: 'app.fb.config',
        space: '  ',
        wrap: ' (function () { \n\'use strict\';\n\n {\%= __ngModule %}\n\n})();'
      },
      constants: {
        FB:{
          'clientID'  :{
            'general': 198981923884649,
            'zeus': 199021257214049,
            'ares': 199027387213436,
            'apolo': 199030457213129
          },
          'permissions': 'email,user_birthday,user_friends,publish_actions'
        }
      },
      values: {
        debug: false
      }
    }
  });
  grunt.loadNpmTasks('grunt-ng-constant');
};