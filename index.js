var path = require('path')
	, fs = require('fs')
	, cwd = process.cwd();

var mkdirp = require('mkdirp')
	, rimraf = require('rimraf')
	, cp = require('glob-cp')
	, html = require('simple-html-index')
	, minifycss = require('minify-css-stream');
  // , ghpages = require('gh-pages');

var parseArgs = require('./lib/parse-args')
	, createBundler = require('./lib/bundler');

module.exports.cli = budoDemoCLI;

function budoDemoCLI(args, opts) {
  var argv = parseArgs(args, opts);

  // console.log('budo-demo CLI');
  // console.log(argv);

  if (argv.help) {
		fs.createReadStream(path.join(__dirname, './bin/help.txt')).pipe(process.stdout);
		return;
	}

  if(!(argv._ && argv._.length)) {
  	throw new Error('No entry js file specified.');
  }

  var entry = argv._[0];
  delete argv._;

  var browserifyArgs = argv['--'];
  delete argv['--'];

  var dest = path.join(cwd, argv.dest);

  mkdirp(dest, function(err) {
  	if(err) throw new Error(err);

  	// copy included files
  	var include = Array.isArray(argv.include) ? argv.include : [argv.include];
  	include.forEach(function(f) {
  		cp.sync(path.join(cwd, f), path.join(dest, f));
  	});

  	// bundleJs
  	var bundler = createBundler(path.join(cwd, entry), argv.browserifyArgs);
  	bundler.bundle()
  		.pipe(fs.createWriteStream(path.join(dest, entry)));

  	// html
  	var h = html({
	  		title: argv.title
	  		, css: argv.css
	  		, entry: entry
	  	})
  		.pipe(fs.createWriteStream(path.join(dest, 'index.html')));

  	// css
  	if(argv.css) {
  		var cssRead = fs.createReadStream(path.join(cwd, argv.css));
  		var cssWrite = fs.createWriteStream(path.join(dest, argv.css));
  		var c;

  		if(argv.minify) {
				c = cssRead.pipe(minifycss()).pipe(cssWrite);
			} else {
				c = cssRead.pipe(cssWrite);
			}

  	}

    // publish to gh-pages
   //  if(argv.publish) {
   //    console.log('publish with gh pages', path.join(cwd, dest));
   //    ghpages.publish(path.join(cwd, dest), function(err) {
   //      if(err) throw new Error(err);
   //      console.log('published?');
   //    });
   //  }

  	// // remove publish directory
  	// if(argv.clean) {
  	// 	rimraf(path.join(cwd, dest), {}, function(err){
   //      if(err) throw new Error(err);
   //    });
  	// }
  });

} 



function createBundler(files, opts) {

	files.forEach(function(file) {
		bundler.add(path.join(cwd, file));
	});
}