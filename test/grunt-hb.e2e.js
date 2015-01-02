'use strict';

var expect = require('expect.js'),
	map = require('map-stream'),
	fs = require('fs'),
	vs = require('vinyl-fs'),

	config = {
		actual: __dirname + '/actual/**/*.html'
	};

describe('hb e2e', function () {
	var count;

	function toEqualExpected(file, cb) {
		count++;

		var expected = file.path.replace('actual', 'expected');
		expect(file.contents.toString()).to.be(fs.readFileSync(expected, 'utf8'));
		cb(null, file);
	}

	beforeEach(function () {
		count = 0;
	});

	it('should render handlebars files', function (done) {
		vs
			.src(config.actual)
			.pipe(map(toEqualExpected))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(6);
				done();
			});
	});
});
