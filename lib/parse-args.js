var minimist = require('minimist')
	, xtend = require('xtend');

module.exports = parseArgs;
function parseArgs(args, opt) {

	var argv = minimist(args, {
		boolean: [
			, 'minify'
		]
		, string: [
			'dest'
			, 'include'
			, 'title'
			, 'css'
		]
		, default: module.exports.defaults
		, '--': true
		, alias: {
			help: 'h'
			, include: 'i'
			, css: 'c'
			, title: 't'
			, dest: 'o'
			, minify: 'm'
		}
	});

  return xtend(argv, opt)
}

module.exports.defaults = {
	title: 'demo'
	, minify: true
	, dest: 'dist'
};