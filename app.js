//import express from 'express';
//import cors from 'cors';
//import request from 'request';
//import * as fs from 'fs';

const express = require('express');
const cors = require('cors');
const request = require('request');
const fs = require('fs');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const _app_folder = 'dist';

const app = express();
var config;
var debug = false;
var help = false;
var port = 5000;
var outputJson = false;

var helpText = 
"Example run command:\n"+
"\tleansheets-node-<os> --config <path-to-config.json> --debug.info --port <port-number>\n\n"+
"Valid flags:\n"+
"\t--help \t\t- to get this screen\n"+
"\t--debug-log \t- shows a verbous output of startup and all requests.\n"+
"\t--output-json \t- outputs the configuration JSON to the console that was passed in.\n"+
"\t--port \t\t- sets the port to run the server on. Defaults to 5000\n";

// https://expressjs.com/en/resources/middleware/cors.html
// This is CORS-enabled for all origins!
app.use(cors());

// Process command line args
process.argv.forEach(function (val, index, array) {
	switch (val) {
		case "--config":
			config = process.argv[index + 1];
			break;
		case "--debug-log":
			debug = true;
			break;
		case "--port":
			port = process.argv[index + 1];	
			break;
		case "--output-json":
			outputJson = true;
			break;
		case "--help":
			help = true;
			break;
	}
//	console.log(index + ': ', val);
});

function cmdArgs() {
	if (help) {
		console.log(helpText);
		killProcess();
	
	} else {
		try {
			config = setConfigJson(config);
		} catch (err) {
			console.log('Killing process due to error: ', err);
			killProcess();
		}
	}
};

cmdArgs();

function killProcess() {
	debugMsg('Killing process...');
	process.kill(process.pid);
};

function setConfigJson(data) {
		fs.readFile(data, "utf8",  (err, data) => {
			if (!err) {
				debugMsg('Loading configuration JSON');
				(outputJson) ? debugMsg("Configuration JSON:\n" + data) : null;
				config = JSON.parse(data);
				debugMsg('Configuration JSON Loaded!');
			}
			else { throw(err); }
		});
};

function debugMsg(msg) {
	if (debug) {
		console.log(msg);
	}
};

app.use('/', express.static(__dirname + '/dist'));
app.get('/', function(req, res) {
	res.sendFile('/', {root: _app_folder});
});

app.get('/config', (req, res) => {
	debugMsg('Requesting Config');
	res.header('Content-type','application/json');
	debugMsg('Sending Config:', config);
	return res.status(200).send(config);
});
	
app.get('/api', (req, res) => {
 	debugMsg(req.query.url);
	debugMsg(req.headers.authorization);
	var options = {
		url: req.query.url, 
		headers: {
			'Authorization': req.headers.authorization
    	}
  	}

  debugMsg('==============Starting new request==============');
  debugMsg(options);
  console.time(options.url);
  request(options, function (err, resp, body) {
    if (!err && resp.statusCode === 200) {
        debugMsg('Success!'); // Print the google web page.
		resp.headers['Content-type'] = 'application/json';
		res.status(200).send(JSON.parse(body));
	}
    else if (res.statusCode === 500) {
		res.status(500).send({
			success: 'false',
			message: 'Retreiving JIRA issues failed',
			url: options.url,
			headers: options.headers,
			error: err
		});
        debugMsg('There was an error');
        debugMsg('err',err);
        debugMsg('resp',resp);
        debugMsg('body',body);
    } else {
		res.status(res.statusCode).send({
			success: 'false',
			message: 'Retreiving JIRA issues failed',
			url: options.url,
			headers: options.headers,
			statusCode: res.statusCode
		});
		debugMsg('There was an error', res.statusCode);
		debugMsg('Error:', err);
	}
	console.timeEnd(options.url);
  })
});

const PORT = port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
