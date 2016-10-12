module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssetsProd',
		'concat',
		'uglify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
