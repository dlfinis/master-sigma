/**
 * Eslint check files
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to check code of your sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-eslintc
 */
module.exports = function(grunt) {
    grunt.config.set('eslint', {
        target: ['api/controllers/**',
                 'api/models/**',
                 'api/policies/**',
                 'assets/angular/**',
                 '!assets/**/*.html'
               ]
    });
    grunt.loadNpmTasks('grunt-eslint');
};
