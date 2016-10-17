module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [	
		'clean:dev',
		'less:dev',
		'ngtemplates:dev',
		'copy:dev'
	]);
};
