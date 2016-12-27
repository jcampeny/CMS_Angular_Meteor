import { __DIR__ , parseJsonToCssSyntax } from '../utils/functions';
import { templates } from './templates.js';

export function compileState (state) {
	const fs     = require('fs');
	const mkdirp = require('mkdirp');
	const compiledDirBase = __DIR__ + '.compiled_webs/' + state.owner + '/';

	fs.chmodSync(compiledDirBase, 0777);

	let promise = new Promise( (resolve, reject) => {

		//create promises for every file
		let writePromises = [];
		
		// remove tree hierarchy and save for relative href
		const hierarchyState = Object.assign({}, state);
		state = fromTreeToArrayState(state);


		//Iteration for every state to create files and path
		state.states.forEach( stateItem => {
			//create path if not exist
			mkdirp(compiledDirBase + stateItem.name, err => {
			    if (err) throw err;
			    let stateItemForCss = Object.assign({}, stateItem);

			    fs.chmodSync(compiledDirBase + stateItem.name, 0777);
				//Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
				//HTML
				fs.open(compiledDirBase + stateItem.name + 'index.html', 'w', (err, fd) => {
					if (err) throw err;

					const header   = headerGenerator(state, Object.assign({}, stateItem), hierarchyState);
					const content  = templates.html(Object.assign({}, stateItem), header);

					fs.fchmodSync(fd, 0777);

					let promiseWrite = new Promise( (resolveW, rejectW) => {
						fs.write(fd, content, null, (err, written, string) => {
							if(err) throw err;
							resolve(stateItem.id);
						});						
					});

					writePromises.push(promiseWrite);
				});
				
				//CSS
				const content  = templates.css(stateItemForCss);
				fs.open(compiledDirBase + stateItem.name + 'styles.css', 'w', (err, fd) => {
					if (err) throw err;

					fs.fchmodSync(fd, 0777);

					let promiseWrite = new Promise( (resolveW, rejectW) => {
						fs.write(fd, content, null, (err, written, string) => {
							if(err) throw err;
							fs.close(fd);
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
			// add parent element and '/' 
			stateItem.name = (stateToFind.name || '') + stateItem.name + '/';
			stateUnTree.states.push(stateItem);

			//recursive if have more children states
			if (Array.isArray(stateItem.states) && stateItem.states.length > 0)
				findStates(stateItem);
		});		
	};

	findStates(state);

	return stateUnTree;
}

function headerGenerator (state, currentState, hierarchyStates) {
	let headerLayout = HeaderTemplates.header();
	const basePath   = currentState.name.slice(0, -1).split('/').map(a => '..').join('/');

	const parseStates = (states, parent) => {
		// add <ul> element
		parent.html.push(HeaderTemplates.ul());

		//for each state add li > span elements	
		states.forEach( stateItem => {
			let parentLength =  parent.html.length - 1;
			let current      = (currentState.name == stateItem.name) ? true : false;
			let haveChildren = Array.isArray(stateItem.states) && stateItem.states.length > 0;

			parent.html[parentLength].html.push(HeaderTemplates.li(stateItem.name, basePath, current, haveChildren));
			
			// recursive inside the current li.html
			if (haveChildren){
				let childLength = parent.html[parentLength].html.length - 1;
				parseStates(stateItem.states, parent.html[parentLength].html[childLength]);
			}
		});
	};
	
	parseStates(hierarchyStates.states, headerLayout);

	return headerLayout;	
}

class HeaderTemplates{
	static header () {
		const className = 'type-1';
		return { '<>' : 'header', 'class' : className, 'html' : []};
	}
	static ul () {
		return { '<>' : 'ul', 'html': []}
	}
	static a (html, basePath) {
		const htcacces = 'index.html';
		const name = html.slice(0, -1).split('/').pop();
		return { '<>' : 'a', 'href' : `${basePath + '/'+ html + htcacces}`, html : name};
	}
	static li (name, basePath, current = false, haveChildren = false) {
		const a = HeaderTemplates.a(name, basePath);
		const classProperty = (current) ? 'current' : ''; 
		const parent = (haveChildren) ? name.slice(0, -1).split('/').pop() : '';
		return { '<>' : 'li', 'class' : classProperty, parent,'html': [a]};
	}
}




