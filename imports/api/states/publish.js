import { Meteor } from 'meteor/meteor';

import { States } from './collection';

if (Meteor.isServer) {
	Meteor.publish('states', function(){
		return States.find({owner : this.userId});
	});
}