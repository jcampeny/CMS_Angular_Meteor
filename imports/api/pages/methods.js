import { Meteor } from 'meteor/meteor';

import { Pages } from './collection';
import { deleteHashKeys } from '../utils/functions';

export function insertPage(newPage){
	if (!this.userId)
		throw new Meteor.Error(400, 'You must be logged in');

	if (newPage.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'Invalid owner for this Page');

	if (newPage.metaData.name == '')
		throw new Meteor.Error(400, 'You must assign a name to this Page');

	const pageRepeated = Pages.find({
		'metaData.name' : newPage.metaData.name,
		'metaData.owner' : this.userId
	}).count();

	if(pageRepeated > 0)
		throw new Meteor.Error(400, 'You have another saved page with this name');

	//delete hashKeys
	newPage.html = deleteHashKeys(newPage.html);

	//insert into DB and get _id
	newPage._id = Pages.insert(newPage);

	return { page: newPage };
}

export function updatePage(page){

	if (!this.userId)
		throw new Meteor.Error(400, 'You must be logged in');

	if (page.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'Invalid owner for this Page');

	if (page.metaData.name == '')
		throw new Meteor.Error(400, 'You must assign a name to this Page');

	//if(!Pages.findOne({_id : page._id}))
		//throw new Meteor.Error(400, 'This page does not exist');

	//delete hashKeys
	page.html = deleteHashKeys(page.html);

	Pages.update({
		_id : page._id
	},{
		$set : page
	});

	return { page };
}

export function getPage(id){
	if (!id)
		throw new Meteor.Error(400, 'This id is invalid');

	return Pages.findOne({
		_id : id
	});
}

export function removePage(pageId){
	if (!this.userId)
		throw new Meteor.Error(400, 'You have to be logged in!');

	const page = Pages.findOne({_id : pageId});

	if(page && page.metaData && page.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'No permissions to delete!');
	

	return Pages.remove({"_id" : pageId});
}
Meteor.methods({
	insertPage,
	updatePage,
	getPage,
	removePage
});