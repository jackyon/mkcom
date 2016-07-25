#!/usr/bin/env node
'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');

/**
 * show help message
 */
var logHelp = () => {
	var message = `
  Usage: mkcom -c
    -c, --create        create the folders and files in Relative Path.
    -p, --path          create the folders and files to custom path.
    -h, --help          help message.
  Example: mkcom -c Tab -p app/components/
	`;
	console.log(message);
};

/**
 * create folders and files
 * @param  {String} keyword [foldername]
 */
var creatFoldersFiles = keyword => {
	var argvs = process.argv.slice(4);

	var path;
	if (argvs[0] === '-p' || argvs[0] === '--path') {
		var lastLetter = Array.from(argvs[1]).pop();
		path = lastLetter === '/' ? `${ argvs[1] + keyword }` : `${ argvs[1] + '/' + keyword }`;
	} else {
		path = `./${ keyword }`;
	}

	var createMainFolder = () => {
		mkdirp(`${ path }`, err => {
			if (err) console.log(err);
		});
	};

	var creatSubFolders = () => {
		//creat style folder & styles.scss
		mkdirp(`${ path }/style/`, err => {
			if (err) {
				console.log(err);
			} else {
				fs.writeFileSync(`${ path }/style/style.scss`, '');
			};
		});

		//creat image folder
		mkdirp(`${ path }/images/`, err => {
			if (err) console.log(err);
		});

		//creat component folder & index.js
		mkdirp(`${ path }/`, err => {
			if (err) {
				console.log(err);
			} else {
				fs.writeFileSync(`${ path }/index.js`, '');
			}
		});
	};

	createMainFolder(creatSubFolders());
};

var parseArgvs = () => {
	var argvs = process.argv.slice(2);

	var checkArg = () => {
		if (argvs[0] && argvs[0][0] === '-') {
			switch (argvs[0]) {
				case '-c':
				case '--create':
					creatFoldersFiles(argvs[1]);
					break;

				case '-h':
				case '--help':
					logHelp();
					break;

				default:
					creatFoldersFiles(argvs[1]);
					break;
			}
		}
	};

	checkArg();
};

var run = () => {
	parseArgvs();
};

run();