'use strict';

var handlebars = require('gulp-hb'),
	matter = require('gulp-front-matter'),
	path = require('path'),
	rename = require('gulp-rename'),
	vinyl = require('vinyl-fs');

module.exports = function (grunt) {
	grunt.registerMultiTask('hb', 'Renders Handlebars templates to static HTML.', function () {
		var done,
			options = this.options(),
			files = this.files,
			count = files.length;

		console.log(count);

		/* istanbul ignore next */
		function fail(err) {
			grunt.log.error(err);

			// Dangit
			done(false);
		}

		function success() {
			grunt.log.ok();

			// Are we done yet?
			if ((--count) === 0) {
				done(true);
			}
		}

		function process(file) {
			var dest = file.dest,
				dirname = path.dirname(dest),
				basename = path.basename(dest);

			grunt.log.write('Creating "%s"...', dest);

			vinyl                          // Oh yes I did
				.src(file.src)             // Read file
				.pipe(matter(options))     // Parse frontmatter
				.pipe(handlebars(options)) // Render handlebars
				.pipe(rename(basename))    // Set new filename
				.pipe(vinyl.dest(dirname)) // Write file
				.on('error', fail)         // Handle errors
				.on('end', success);       // Mark completed
		}

		if (count) {
			done = this.async();
			files.forEach(process);
		}
	});
};
