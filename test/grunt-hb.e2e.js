/* eslint-env mocha */

var expect = require('expect'),
	fs = require('fs'),
	map = require('map-stream'),
	path = require('path'),
	vinylFs = require('vinyl-fs'),

	config = {
		actual: path.join(__dirname, '/actual/**/*.html')
	};

describe('hb e2e', function () {
	var count;

	function toEqualExpected(file, cb) {
		count++;

		var expected = file.path.replace('actual', 'expected');

		expect(String(file.contents)).toBe(String(fs.readFileSync(expected)));
		cb(null, file);
	}

	beforeEach(function () {
		count = 0;
	});

	it('should render handlebars files', function (done) {
		vinylFs
			.src(config.actual)
			.pipe(map(toEqualExpected))
			.on('error', done)
			.on('end', function () {
				expect(count).toBe(9);
				done();
			});
	});
});
