module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'less:dev',
		'ngtemplates:dev',
		'sync:dev'
	]);
};
