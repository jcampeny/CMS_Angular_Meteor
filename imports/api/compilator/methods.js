import { Meteor } from 'meteor/meteor';

import { compileState } from './compileState';

import { Pages } from '../pages/collection';

export function compilator (state){

	let promise = new Promise((resolve, reject) => {
		compileState(state).then( value => {
			resolve(value);
		});
	});

	return promise;
}

Meteor.methods({
	compilator
});