import { Meteor } from 'meteor/meteor';

import { Styles } from './collection';

if (Meteor.isServer) {
	Meteor.publish('styles', function(layoutId){
		return Styles.find({ layoutParent : layoutId });
	});
}