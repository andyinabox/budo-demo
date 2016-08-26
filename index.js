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
  var include = Array.isArray(argv.include) ? argv.include : [argv.include];

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


    // bundleJs
    var bundler = createBundler(path.join(cwd, entry), browserifyArgs);
    bundler.bundle()
      .pipe(fs.createWriteStream(path.join(dest, path.basename(entry))));

    // html
    if(fs.existsSync(path.join(cwd, 'index.html'))) {
      // use existing html file
      include.push('index.html');
    } else {
      // create html file
      var h = html({
          title: argv.title
          , css: argv.css
          , entry: entry
        })
        .pipe(fs.createWriteStream(path.join(dest, 'index.html')));
    }

    // copy included files    
    if(argv.include && argv.include.length) {
      include.forEach(function(f) {
        cp.sync(path.join(cwd, f), path.join(dest, f));
      });     
    }


    // css
    if(argv.css) {
      var cssRead = fs.createReadStream(path.join(cwd, argv.css));
      var cssWrite = fs.createWriteStream(path.join(dest, path.basename(argv.css)));
      var c;

      if(argv.minify) {
        c = cssRead.pipe(minifycss()).pipe(cssWrite);
      } else {
        c = cssRead.pipe(cssWrite);
      }

    }

  });

} 



function createBundler(files, opts) {

  files.forEach(function(file) {
    bundler.add(path.join(cwd, file));
  });
}