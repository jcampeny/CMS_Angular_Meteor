import { Meteor } from 'meteor/meteor';

import { Pages } from './collection';

if (Meteor.isServer) {
	Meteor.publish('pages', function(){
		return Pages.find({'metaData.owner' : this.userId});
	});
}