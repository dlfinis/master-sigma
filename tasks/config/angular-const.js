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
            'general': 1267766483237355,
            'zeus': 1545700372110630,
            'ares': 1545715552109112,
            'apolo': 1545716165442384
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
