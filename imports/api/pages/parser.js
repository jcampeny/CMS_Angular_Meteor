import { Meteor } from 'meteor/meteor';
import { Pages } from './collection';
import json2html from 'node-json2html';

export function pageParser(pageObject){

	//REMEMBER REMOVE FROM ALL CHILDRENS :
	//type, $$hashKey, metadata, _id
	var html = json2html.transform([{}], pageObject);
	
	return html;
}

Meteor.methods({
	pageParser
});