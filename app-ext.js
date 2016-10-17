#!/usr/bin/env node
/**
* Commands
*/

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {

	argv: function (){

	var program = require('commander'),
		config = {};

	program.option('--dev');
	program.option('--prod');
	program.option('--debug');
	program.option('--verbose');
	program.option('--silly');
	program.option('--www');
	program.option('--host [Host]');
	program.option('--hostaddr [HostAddr]');
	program.option('--port [Port]');
	program.option('--db [DB]');
	program.option('--hostdb [hostDb]');
	program.option('--portdb [portDb]');
	program.option('--userdb [userDb]');
	program.option('--passdb [passDb]');
	program.option('--rhostdb [rhostDb]');
	program.option('--rportdb [rportDb]');
	program.option('--rpassdb [rpassworDb]');
	program.option('--scport [scraperPort]');
	
	
    program.parse(process.argv);

	var db = {}, redis ={};


	if(program.www){ 
		config.hooks = { grunt : false};
	}

	if(program.host){
		process.env['NODE_HOST'] = program.host;		
		config.host = program.host;
	}

	if(program.hostaddr){
		process.env['HOST_ADDR'] = program.hostaddr;
	}

	if(program.port){
		process.env['NODE_PORT'] = program.port;		
		config.port = program.port;
	}


  /***************************************************************************
   * Set the default database connection 
   ***************************************************************************/

	if(program.db){	
		process.env['DB_NAME'] = program.db;
    	db.database = program.db;	
	}

	if(program.hostdb){ 
		process.env['DB_HOST'] = program.hostdb;
    	db.host = program.hostdb;
    }

	if(program.portdb){
		process.env['DB_PORT'] = program.portdb;
    	db.port = program.portdb;	
	}

	if(program.userdb){
		process.env['DB_USER'] = program.userdb;
    	db.user = program.userdb;	
	}

	if(program.passdb){
		process.env['DB_PASSWORD'] = program.passdb;
    	db.password = program.passdb;	
	}


  /***************************************************************************
   * Set the default redis session connection 
   ***************************************************************************/

	if(program.rhostdb){ 
		process.env['REDIS_HOST'] = program.hostdb;
    	redis.host = program.hostdb;
    }

	if(program.rportdb){
		process.env['REDIS_PORT'] = program.portdb;
    	redis.port = program.portdb;	
	}

	if(program.rpassdb){
		process.env['REDIS_PASSWORD'] = program.passdb;
    	redis.pass = program.passdb;	
	}


  /***************************************************************************
   * Set the default scraper connection 
   ***************************************************************************/

	if(program.scport) 
	{	
		process.env['SCRAPER_PORT'] = program.scport;
	}
	

	if(!isEmpty(db))
	{ 	
		db.adapter = 'sails-mysql';
		config.connections = { sigmaDB: db };
		config.models = { connection: 'sigmaDB',migrate: 'safe' };
	}

	if(!isEmpty(redis))
	{
		config.session = redis;			
	}

	console.log(config);
	return config;

	},
	isPortTaken: function(port, callback) {
		var net = require('net');

			var server = net.createServer(function(socket) {
			socket.write('Echo server\r\n');
			socket.pipe(socket);
			});

			server.listen(port, '127.0.0.1');
			server.on('error', function (e) {
			callback(true);
			});
			server.on('listening', function (e) {
			server.close();
			callback(false);
			});

	},
	runScript: function(scriptPath, callback){
  	    // Run a script and invoke a callback when complete, e.g.
		//runScript(__dirname + '/web-scraper/app/index.js', function (err) {
		//if (err) console.log(err);
		//console.log('+ Finished running API of scraper');
		//});

		var childProcess = require('child_process');
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
};
