import { Meteor } from 'meteor/meteor';

import { Layouts } from './collection';
import { cleanItem } from '../utils/functions';

export function insertLayout(newLayout){
	if (!this.userId)
		throw new Meteor.Error(400, 'You must be logged in');

	if (newLayout.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'Invalid owner for this Layout');

	if (newLayout.metaData.name == '')
		throw new Meteor.Error(400, 'You must assign a name to this Layout');

	const layoutRepeated = Layouts.find({
		'metaData.name' : newLayout.metaData.name,
		'metaData.owner' : this.userId
	}).count();

	if(layoutRepeated > 0)
		throw new Meteor.Error(400, 'You have another saved layout with this name');


	//insert into DB and get _id
	newLayout._id = Layouts.insert(cleanItem(newLayout));

	return { layout: newLayout };
}

export function updateLayout(layout){

	if (!this.userId)
		throw new Meteor.Error(400, 'You must be logged in');

	if (layout.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'Invalid owner for this Layout');

	if (layout.metaData.name == '')
		throw new Meteor.Error(400, 'You must assign a name to this Layout');

	//if(!Layouts.findOne({_id : layout._id}))
		//throw new Meteor.Error(400, 'This layout does not exist');

	//delete _id to avoid miniMongo Error when he try to save _id field
	const saveId = layout._id;
	delete layout._id

	//Upadate
	Layouts.update({
		_id : saveId
	},{
		$set : cleanItem(layout)
	});

	//Reassign _id to return to the front 
	layout._id = saveId;

	return { layout };
}

export function getLayout(id){
	if (!id)
		throw new Meteor.Error(400, 'This id is invalid');

	return Layouts.findOne({
		_id : id
	});
}

export function removeLayout(layoutId){
	if (!this.userId)
		throw new Meteor.Error(400, 'You have to be logged in!');

	const layout = Layouts.findOne({_id : layoutId});

	if(layout && layout.metaData && layout.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'No permissions to delete!');
	

	return Layouts.remove({"_id" : layoutId});
}
Meteor.methods({
	insertLayout,
	updateLayout,
	getLayout,
	removeLayout
});