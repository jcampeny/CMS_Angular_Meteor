import { Mongo } from 'meteor/mongo';

export const Pages = new Mongo.Collection('pages');

Pages.allow({
	insert (userId, page) {
		return userId && page.owner === userId;
	},
	update (userId, page, fields, modifier) {
		return userId && page.owner === userId;
	},
	remove (userId, page) {
		return userId && page.owner === userId;
	}
});