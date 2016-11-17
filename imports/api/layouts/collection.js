import { Mongo } from 'meteor/mongo';

export const Layouts = new Mongo.Collection('layouts');

Layouts.allow({
	insert (userId, layout) {
		return userId && layout.owner === userId;
	},
	update (userId, layout, fields, modifier) {
		return userId && layout.owner === userId;
	},
	remove (userId, layout) {
		return userId && layout.owner === userId;
	}
});