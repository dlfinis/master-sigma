module.exports = function (grunt) {
	grunt.registerTask('compileAssetsProd', [
		'clean:dev',
		'copy:dev'
	]);
};
