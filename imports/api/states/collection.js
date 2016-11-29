import { Mongo } from 'meteor/mongo';

export const States = new Mongo.Collection('states');

States.allow({
	insert (userId, state) {
		return userId && state.owner === userId;
	},
	update (userId, state, fields, modifier) {
		return userId && state.owner === userId;
	},
	remove (userId, state) {
		return userId && state.owner === userId;
	}
});