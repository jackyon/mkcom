let fs = require('fs');
let mkdirp = require('mkdirp');

/**
 * show help message
 */
const logHelp = () => {
	const message = `
  Usage: mkcom -c
    -c, --create        create the folders and files in Relative Path.
    -p, --path          create the folders and files to custom path.
    -h, --help          help message.
  Example: mkcom -c Tab -p app/components/
	`
	console.log(message);
}

/**
 * create folders and files
 * @param  {String} keyword [foldername]
 */
const creatFoldersFiles = (keyword) => {
	const argvs = process.argv.slice(4);

	let path;
	if (argvs[0] === '-p' || argvs[0] === '--path') {
		let lastLetter = Array.from(argvs[1]).pop();
		path = lastLetter === '/' ? `${argvs[1] + keyword}` : `${argvs[1] + '/' + keyword}`;
	} else {
		path = `./${keyword}`;
	}

	const createMainFolder = () => {
		mkdirp(`${path}`, (err) => {
			if (err) console.log(err);
		})
	}
	
	const creatSubFolders =() => {
		//creat style folder & styles.scss
		mkdirp(`${path}/style/`, (err) => {
			if (err) {
				console.log(err)
			} else {
				fs.writeFileSync(`${path}/style/style.scss`, '');
			};
		})
		
		//creat image folder
		mkdirp(`${path}/images/`, (err) => {
			if (err) console.log(err);
		})

		//creat component folder & index.js
		mkdirp(`${path}/`, (err) => {
			if (err) {
				console.log(err)
			} else {
				fs.writeFileSync(`${path}/index.js`, '');
			}
		})
	}

	createMainFolder(creatSubFolders());
}

const parseArgvs = () => {
	const argvs = process.argv.slice(2);

	const checkArg = () => {
		if (argvs[0] && argvs[0][0] === '-') {
			switch (argvs[0]) {
				case '-c':
				case '--create':
					creatFoldersFiles(argvs[1])
					break;

				case '-h':
				case '--help':
					logHelp();
					break;

				default:
					creatFoldersFiles(argvs[1])
					break;
			}
		}
	}

	checkArg();
}


const run = () => {
	parseArgvs();
}

run();