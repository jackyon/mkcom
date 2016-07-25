#!/usr/bin/env node
'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');

/**
 * show help message
 */
const logHelp = () => {
	let message = `
  Usage: mkcom -c
    -c, --create        create the folders and files in Relative Path.
    -p, --path          create the folders and files to custom path.
    -h, --help          help message.
  Example: mkcom -c Tab -p app/components/
	`;
	console.log(message);
};

/**
 * create es6 class template
 */
const strClass = keyword => {
	return `
import './styles/styles.scss';
import React, { Component } from 'react';

class ${ keyword } extends Component {
    render() {
        
    }
};

export default ${ keyword }; 	
	`.trim();
};

/**
 * create folders and files
 * @param  {String} keyword [foldername]
 */
const creatFoldersFiles = keyword => {
	let argvs = process.argv.slice(4);

	let path;
	if (argvs[0] === '-p' || argvs[0] === '--path') {
		let lastLetter = Array.from(argvs[1]).pop();
		path = lastLetter === '/' ? `${ argvs[1] + keyword }` : `${ argvs[1] + '/' + keyword }`;
	} else {
		path = `./${ keyword }`;
	}

	let createMainFolder = () => {
		mkdirp(`${ path }`, err => {
			if (err) console.log(err);
		});
	};

	let creatSubFolders = () => {
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
				fs.writeFileSync(`${ path }/index.js`, strClass(keyword));
			}
		});
	};

	createMainFolder(creatSubFolders());
};

const parseArgvs = () => {
	let argvs = process.argv.slice(2);

	let checkArg = () => {
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

const run = () => {
	parseArgvs();
};

run();