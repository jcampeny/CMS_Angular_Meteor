import { Meteor } from 'meteor/meteor';
import { Layouts } from './collection';
import json2html from 'node-json2html';

export function layoutParser(layoutObject){

	//REMEMBER REMOVE FROM ALL CHILDRENS :
	//type, $$hashKey, metadata, _id
	var html = json2html.transform([{}], layoutObject);
	
	return html;
}

Meteor.methods({
	layoutParser
}); 
