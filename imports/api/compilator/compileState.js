import { __DIR__ , parseJsonToCssSyntax } from '../utils/functions';
import { templates } from './templates.js';

export function compileState (state) {
	const fs     = require('fs');
	const mkdirp = require('mkdirp');
	const compiledDirBase = __DIR__ + '.compiled_webs/';

	let promise = new Promise( (resolve, reject) => {

		//create promises for every file
		let writePromises = [];

		// remove tree hierarchy
		state = fromTreeToArrayState(state);

		//Iteration for every state to create files and path
		state.states.forEach( stateItem => {
			//create path if not exist
			mkdirp(compiledDirBase + stateItem.name, err => {
			    if (err) throw err;

				//Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
				fs.open(compiledDirBase + stateItem.name + 'index.html', 'w', (err, fd) => {
					if (err) throw err;

					const content  = templates.html(stateItem);

					let promiseWrite = new Promise( (resolveW, rejectW) => {
						fs.write(fd, content, null, (err, written, string) => {
							if(err) throw err;
							resolve(stateItem.id);
						});						
					});

					writePromises.push(promiseWrite);
				});
			});
		});

		//Wait until all files have been created
		Promise.all(writePromises).then( values => {
			resolve(state);
		});
	});

	return promise;
} 

function fromTreeToArrayState (state) {
	let stateUnTree = Object.assign({}, state, {states: []});

	const findStates = (stateToFind) => {
		stateToFind.states.forEach( stateItem => {
			stateItem.name = (stateToFind.name || '') + stateItem.name + '/';
			stateUnTree.states.push(stateItem);
			if (Array.isArray(stateItem.states) && stateItem.states.length > 0)
				findStates(stateItem);
		});		
	};

	findStates(state);
	
	return stateUnTree;
}








