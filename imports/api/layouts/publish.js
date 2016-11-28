import { Meteor } from 'meteor/meteor';

import { Layouts } from './collection';

if (Meteor.isServer) {
	Meteor.publish('layouts', function(){
		return Layouts.find({
			$or : [{
				'metaData.owner' : this.userId
			},{
				$and :[{
					'metaData.public' : {
						$exists : true
					}
				},{
					'metaData.public' : true
				}]
			}]
		});
	});
}