import { Meteor } from 'meteor/meteor';
import { Layouts } from './collection';
import json2html from 'node-json2html';

import { __DIR__ , parseJsonToCssSyntax} from '../utils/functions';

export function test (className, classProperties){
	const fs = require('fs');
	const myFile = __DIR__ + 'server/foo.css';

	var promise = new Promise((resolve, reject) => {
		fs.open(myFile, 'a+', (err, fd) => {
			if (err) throw err;

			//append (becaus a+ flag) string to the file
			const content = parseJsonToCssSyntax(classProperties, className);

			fs.write(fd, content, null, (err, written, string) => {
				if(err) throw err;
				resolve(content);
			});
		});
	});

	return promise;


		// 	angular.forEach(classObj, (classProperty) => {
		// 		if(classProperty.$$hashKey){
		// 			delete classProperty.$$hashKey;
		// 		}
		// 		let key = Object.keys(classProperty)[0];
		// 		let value = Object.values(classProperty)[0];
		// 		classProperties[key] = value;
		// 	});
}

Meteor.methods({
	test
});