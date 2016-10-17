/**
 * Angular template
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
    grunt.config.set('ngtemplates', {
        dev:{
			options: {
                module: "app",
				url:    function(url) { return url.replace('assets/', ''); }	
            },
            src: "assets/angular/**/*.html",
            dest: ".tmp/public/js/templates.js"
		}
    });
    grunt.loadNpmTasks('grunt-angular-templates');
};

