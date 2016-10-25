module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'less:dev',
		'ngconstant:dist',
		'ngtemplates:dev',
		'copy:dev'
	]);
};
