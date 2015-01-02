# `grunt-hb`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]

A sane static Handlebars Grunt plugin. Think [Assemble](http://assemble.io/), but with a lot less [Jekyll](http://jekyllrb.com/) baggage.

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install --save-dev grunt-hb
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hb');
```

## `hb` task

_Run this task with the `grunt hb` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Example

```js
grunt.initConfig({
hb: {
	all: {
		options: {
			data: 'src/meta.json',
			helpers: 'src/view/helpers/*.js',
			partials: 'src/view/partials/*.hb',
		},

		files: {
			'out/index.html': 'src/index.hbs'
		}
	}
}
```

## Options

### `data` _`String|Array.<String>`_

Glob string or array of glob strings matching data files. You can't use object literals here. Because, don't.

### `file` _`Boolean`_ (default: true)

Whether to include the file object in the data passed to the template. This provides access to optional file-specific data, including front matter.

```html
---
title: Hello World
---
<h1>{{file.frontMatter.title}}</h1>
```

### `helpers` _`String|Array.<String>`_

Glob string or array of glob strings matching helper files. Helper files are JavaScript files that define one or more helpers.

As a single helper function (helper will be named according to the filename):

```js
// lower.js
module.exports = function (text) {
    return String(text).toLowerCase();
};
```

As an object of helper functions:

```js
// helpers.js
module.exports = {
    lower: function (text) {
        return String(text).toLowerCase();
    },

    upper: function (text) {
        return String(text).toUpperCase();
    }
};
```

As an Assemble registrar:

```js
// assemble.js
module.exports.register = function (Handlebars) {
    Handlebars.registerHelper('lower', function (text) {
        return String(text).toLowerCase();
    });
};
```

### `partials` _`String|Array.<String>`_

Glob string or array of glob strings matching partial files. Partial files are either standalone Handlebars files, or JavaScript files that define one or more partials.

As a standalone Handlebars file:

```handlebars
{{! link.hbs }}
<a href="{{url}}">{{text}}</a>
```

As an object of partials:

```js
// partials.js
module.exports = {
    link: '<a href="{{url}}">{{text}}</a>',
    people: '<ul>{{#people}}<li>{{> link}}</li>{{/people}}</ul>'
};
```

As an Assemble registrar:

```js
// assemble.js
module.exports.register = function (Handlebars) {
    Handlebars.registerPartial('link', '<a href="{{url}}">{{text}}</a>');
    Handlebars.registerPartial('people', '<ul>{{#people}}<li>{{> link}}</li>{{/people}}</ul>');
};
```

## Contribute

[![Tasks][waffle-img]][waffle-url] [![Chat][gitter-img]][gitter-url] [![Tip][gittip-img]][gittip-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

    $ grunt

----

© 2014 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/grunt-hb/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/grunt-hb
[downloads-img]: http://img.shields.io/npm/dm/grunt-hb.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/chat-shannonmoeller/grunt--hb-blue.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/grunt-hb
[gittip-img]:    http://img.shields.io/gittip/shannonmoeller.svg?style=flat-square
[gittip-url]:    https://www.gittip.com/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/grunt-hb.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/grunt-hb
[travis-img]:    http://img.shields.io/travis/shannonmoeller/grunt-hb.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/grunt-hb
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/grunt-hb.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/grunt-hb
