var minimist = require('minimist')
	, xtend = require('xtend');

module.exports = parseArgs;
function parseArgs(args, opt) {

	var argv = minimist(args, {
		boolean: [
			// 'publish'
			// , 'clean'
			, 'minify'
			// , 'uglifyjs'
			// , 'minifycss'
			, 'nohtml'
		]
		, string: [
			'dest'
			, 'include'
			, 'title'
			, 'css'
			, 'cname'
		]
		, default: module.exports.defaults
		, '--': true
		, alias: {
			help: 'h'
			, include: 'i'
			, css: 'c'
			, title: 't'
			, dest: 'o'
		}
	});

  return xtend(argv, opt)
}

module.exports.defaults = {
	title: 'demo'
	, minify: true
	, dest: 'dist'
};