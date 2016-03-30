module.exports = function (grunt) {
	grunt.registerTask('linkAppAssets', [
		'sails-linker:devJs',
		'sails-linker:devStyles'
	]);
};
