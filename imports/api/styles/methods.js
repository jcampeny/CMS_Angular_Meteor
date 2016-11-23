import { Meteor } from 'meteor/meteor';

import { Styles } from './collection';
import { deleteHashKeys } from '../utils/functions';

export function insertStyle(name, properties, parentId){
	if (!this.userId)
		throw new Meteor.Error(400, 'You must be logged in');

	if (!name)
		throw new Meteor.Error(400, 'Class name is invalid');

	if(!parentId)
		throw new Meteor.Error(400, 'Layout is not insertd or invalid');

	const newStyle = {
		class : name,
		properties : deleteHashKeys(properties),
		owner : this.userId,
		layoutParent : parentId
	};

	return Styles.insert(newStyle);
}

export function updateStyle(properties, styleId){
	return Styles.update({
		_id : styleId
	},{
		$set : {
			properties : deleteHashKeys(properties)
		}
	});
}

export function removeStyle(styleId){
	if (!this.userId)
		throw new Meteor.Error(400, 'You have to be logged in!');

	const style = Styles.findOne({_id : styleId});

	if(style && style.metaData && style.metaData.owner !== this.userId)
		throw new Meteor.Error(400, 'No permissions to delete!');
	

	return Styles.remove({"_id" : styleId});
}

Meteor.methods({
	insertStyle,
	updateStyle,
	removeStyle
});