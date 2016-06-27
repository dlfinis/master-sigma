/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */

module.exports = function(grunt) {

	grunt.config.set('watch', {
		api: {

			// API files to watch:
			files: ['api/**/*', '!**/node_modules/**']
		},
		assets: {

			// Assets to watch:
			files: ['assets/**/*', 'tasks/pipeline.js', '!**/node_modules/**'],

			// When assets are changed:
			tasks: ['syncAssets' , 'linkAssets']
		},
		views: {
          files: ['views/**/*']
        },
    options: {
      livereload: true
          // livereload: {
          // 	host:'localhost',
          // 	port:9000,
          // 	key: grunt.file.read(path.resolve('./','config/ssl')+'/server.key'),
          // 	cert: grunt.file.read(path.resolve('./','config/ssl')+'/server.crt'),
          // 	// key: grunt.file.read('../config/ssl/server.key'),
          // 	// cert: grunt.file.read('../config/ssl/server.crt'),
          // 	// key: grunt.file.read(__dirname + '/ssl/livereload/livereload.key'),
          // 	// cert: grunt.file.read(__dirname + '/ssl/livereload/liverealod.crt')
          // 	},
        }

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
