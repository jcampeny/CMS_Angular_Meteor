import { Meteor } from 'meteor/meteor';

import { Layouts } from './collection';

import json2html from 'node-json2html';
	
export function layoutParser(layoutObject){

	//REMEMBER REMOVE FROM ALL CHILDRENS :
	//type, $$hashKey, metadata, _id
	var html = json2html.transform([{}], layoutObject);
	
	return html;
}

export function insertLayout(newLayout){
	if (!this.userId)
		throw new Meteor.Error(400, 'You must be logged in');

	if (newLayout.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'Invalid owner for this Layout');

	if (newLayout.metaData.name == '')
		throw new Meteor.Error(400, 'You must assign a name to this Layout');

	const lauyoutRepeated = Layouts.find({
		'metaData.name' : newLayout.metaData.name,
		'metaData.owner' : this.userId
	}).count();

	if(lauyoutRepeated > 0)
		throw new Meteor.Error(400, 'You have another saved layout with this name');

	//insert into DB and get _id
	newLayout._id = Layouts.insert(newLayout);

	return { layout: newLayout };
}

export function updateLayout(layout){

	if (!this.userId)
		throw new Meteor.Error(400, 'You must be logged in');

	if (layout.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'Invalid owner for this Layout');

	if (layout.metaData.name == '')
		throw new Meteor.Error(400, 'You must assign a name to this Layout');

	const layoutExist = Layouts.find({
		_id : layout._id
	}).count();

	if(!layoutExist)
		throw new Meteor.Error(400, 'This layout does not exist');

	Layouts.update({
		_id : layout._id
	},{
		$set : layout
	});
}

Meteor.methods({
	layoutParser,
	insertLayout,
	updateLayout
});