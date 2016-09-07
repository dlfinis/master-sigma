/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */

// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname);

// Ensure a "sails" can be located:
(function() {
  var sails;
  try {
    sails = require('sails');
  } catch (e) {
    console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
    console.error('To do that, run `npm install sails`');
    console.error('');
    console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
    console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
    console.error('but if it doesn\'t, the app will run with the global sails instead!');
    return;
  }

  // Try to get `rc` dependency
  var rc;
  try {
    rc = require('rc');
  } catch (e0) {
    try {
      rc = require('sails/node_modules/rc');
    } catch (e1) {
      console.error('Could not find dependency: `rc`.');
      console.error('Your `.sailsrc` file(s) will be ignored.');
      console.error('To resolve this, run:');
      console.error('npm install rc --save');
      rc = function () { return {}; };
    }
  }


  var childProcess = require('child_process');
  function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    //API of Scraper Init;
    var process = childProcess.fork(scriptPath);

    process.on('data', function(data) {
      console.log(data.toString());
    });

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
      if (invoked) return;
      invoked = true;
      callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('Exit code ' + code);
      callback(err);
    });

  }

  // Run a script and invoke a callback when complete, e.g.
  runScript(__dirname + '/web-scraper/app/index.js', function (err) {
    if (err) console.log(err);
    console.log('+ Finished running API of scraper');
  });

  // Start server
  sails.lift(rc('sails'));

  // // Start server cluster
  // var cluster = require('cluster');
  // var os      = require('os');
  //
  // var numCPUs = os.cpus().length;
  //
  // if (cluster.isMaster) {
  //   // Master:
  //   // Let's fork as many workers as you have CPU cores
  //
  //   for (var i = 0; i < numCPUs; ++i) {
  //     cluster.fork();
  //   }
  // } else {
  //   // Worker:
  //   sails.lift(rc('sails'));
  // }
})();
