var parseArgs = require('./lib/parse-args');

module.exports.cli = budoDemoCLI;

function budoDemoCLI(args, opts) {
  var argv = parseArgs(args, opts);

  console.log('budo-demo CLI');
  console.log(argv);
} 