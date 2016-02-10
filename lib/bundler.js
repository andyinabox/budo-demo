var browserify = require('browserify')
	, fromArgs = require('browserify/bin/args')

module.exports = createBundler;

function createBundler(src, args) {
	var bundler;

	if(args && Array.isArray(args)) {
		bundler = fromArgs(args);
	} else {
		bundler = browserify();
	}

	bundler.add(src);

	return bundler;
}