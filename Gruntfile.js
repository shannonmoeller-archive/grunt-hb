'use strict';

var vs = require('vinyl-fs'),
	paths = {
		grunt: './Gruntfile.js',
		src: './tasks/*.js',
		test: './test/**/*.{e2e,spec}.js'
	};

module.exports = function (grunt) {
	// Plugins
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		hb: 'tasks/hb.js'
	});

	// Configuration
	grunt.initConfig({
		dirs: {
			actual: 'test/actual',
			fixtures: 'test/fixtures'
		},

		clean: {
			tmp: '<%= dirs.actual %>'
		},

		hb: {
			empty: {
				files: {}
			},

			none: {
				files: {
					'<%= dirs.actual %>/none.html': '<%= dirs.fixtures %>/templates/none.html'
				}
			},

			data: {
				options: {
					data: '<%= dirs.fixtures %>/data/*.{js,json}'
				},
				files: {
					'<%= dirs.actual %>/data.html': '<%= dirs.fixtures %>/templates/data.html'
				}
			},

			helpers: {
				options: {
					helpers: '<%= dirs.fixtures %>/helpers/**/*.js',
				},
				files: {
					'<%= dirs.actual %>/helpers.html': '<%= dirs.fixtures %>/templates/helpers.html'
				}
			},

			partials: {
				options: {
					partials: '<%= dirs.fixtures %>/partials/**/*.hbs',
				},
				files: {
					'<%= dirs.actual %>/partials.html': '<%= dirs.fixtures %>/templates/partials.html'
				}
			},

			all: {
				options: {
					data: '<%= dirs.fixtures %>/data/*.{js,json}',
					helpers: '<%= dirs.fixtures %>/helpers/**/*.js',
					partials: '<%= dirs.fixtures %>/partials/**/*.hbs',
				},
				files: {
					'<%= dirs.actual %>/all.html': '<%= dirs.fixtures %>/templates/all.html',
					'<%= dirs.actual %>/all2.html': '<%= dirs.fixtures %>/templates/all2.html'
				}
			}
		}
	});

	// Tasks
	grunt.registerTask('default', ['lint', 'cover', 'hb', 'test', 'clean']);

	grunt.registerTask('lint', function () {
		var jscs = require('gulp-jscs'),
			jshint = require('gulp-jshint');

		vs
			.src([paths.grunt, paths.src, paths.test])
			.pipe(jscs())
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.on('finish', this.async());
	});

	grunt.registerTask('cover', function () {
		var istanbul = require('gulp-istanbul');

		vs
			.src(paths.src)
			.pipe(istanbul())
			.pipe(istanbul.hookRequire())
			.on('finish', this.async());
	});

	grunt.registerTask('test', function () {
		var istanbul = require('gulp-istanbul'),
			mocha = require('gulp-mocha');

		vs
			.src(paths.test)
			.pipe(mocha({ reporter: 'spec' }))
			.pipe(istanbul.writeReports())
			.on('finish', this.async());
	});
};
