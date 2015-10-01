var vinylFs = require('vinyl-fs'),
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
				src: '<%= dirs.fixtures %>/templates/none.html',
				dest: '<%= dirs.actual %>/templates/none.html'
			},

			data: {
				options: {
					data: '<%= dirs.fixtures %>/data/**/*.{js,json}'
				},
				src: '<%= dirs.fixtures %>/templates/data.html',
				dest: '<%= dirs.actual %>/templates/data.html'
			},

			helpers: {
				options: {
					helpers: '<%= dirs.fixtures %>/helpers/**/*.js'
				},
				src: '<%= dirs.fixtures %>/templates/helpers.html',
				dest: '<%= dirs.actual %>/templates/helpers.html'
			},

			partials: {
				options: {
					partials: '<%= dirs.fixtures %>/partials/**/*.hbs'
				},
				src: '<%= dirs.fixtures %>/templates/partials.html',
				dest: '<%= dirs.actual %>/templates/partials.html'
			},

			all: {
				options: {
					data: '<%= dirs.fixtures %>/data/*.{js,json}',
					helpers: '<%= dirs.fixtures %>/helpers/**/*.js',
					partials: '<%= dirs.fixtures %>/partials/**/*.hbs'
				},
				files: {
					'<%= dirs.actual %>/templates/all.html': '<%= dirs.fixtures %>/templates/all.html',
					'<%= dirs.actual %>/templates/all2.html': '<%= dirs.fixtures %>/templates/all2.html'
				}
			},

			objects: {
				options: {
					file: false,
					data: {
						foo: { title: 'Foo' },
						bar: { title: 'Bar' },
						users: require('./test/fixtures/data/users.json')
					},
					helpers: {
						lower: require('./test/fixtures/helpers/lower'),
						upper: require('./test/fixtures/helpers/upper'),
						'flow-when': require('./test/fixtures/helpers/flow/when')
					},
					partials: {
						'components/item': '<li>{{label}}</li>'
					}
				},
				src: '<%= dirs.fixtures %>/templates/objects.html',
				dest: '<%= dirs.actual %>/templates/objects.html'
			},

			functions: {
				options: {
					file: false,
					data: function () {
						return {
							foo: { title: 'Foo' },
							bar: { title: 'Bar' },
							users: require('./test/fixtures/data/users.json')
						};
					},
					helpers: function () {
						return {
							lower: require('./test/fixtures/helpers/lower'),
							upper: require('./test/fixtures/helpers/upper'),
							'flow-when': require('./test/fixtures/helpers/flow/when')
						};
					},
					partials: function () {
						return './test/fixtures/partials/**/*.hbs';
					}
				},
				src: '<%= dirs.fixtures %>/templates/functions.html',
				dest: '<%= dirs.actual %>/templates/functions.html'
			},

			dataEach: {
				options: {
					debug: true,
					data: '<%= dirs.fixtures %>/data/*.{js,json}',
					helpers: '<%= dirs.fixtures %>/helpers/**/*.js',
					partials: '<%= dirs.fixtures %>/partials/**/*.hbs',
					dataEach: function (context) {
						context.bar = { title: 'Qux' };
						return context;
					}
				},
				src: '<%= dirs.fixtures %>/templates/dataEach.html',
				dest: '<%= dirs.actual %>/templates/dataEach.html'
			}
		}
	});

	// Tasks
	grunt.registerTask('default', ['lint', 'cover', 'hb', 'test', 'clean']);

	grunt.registerTask('lint', function () {
		var eslint = require('gulp-eslint');

		vinylFs
			.src([paths.grunt, paths.src, paths.test])
			.pipe(eslint())
			.pipe(eslint.format())
			.on('finish', this.async());
	});

	grunt.registerTask('cover', function () {
		var istanbul = require('gulp-istanbul');

		vinylFs
			.src(paths.src)
			.pipe(istanbul())
			.pipe(istanbul.hookRequire())
			.on('finish', this.async());
	});

	grunt.registerTask('test', function () {
		var istanbul = require('gulp-istanbul'),
			mocha = require('gulp-mocha');

		vinylFs
			.src(paths.test)
			.pipe(mocha({ reporter: 'spec' }))
			.pipe(istanbul.writeReports())
			.on('finish', this.async());
	});
};
