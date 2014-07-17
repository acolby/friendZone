'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			public: {
				files: {
					'public/styles/main.css': 'public/styles/main.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	// Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');

};