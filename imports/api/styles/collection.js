import { Mongo } from 'meteor/mongo';

export const Styles = new Mongo.Collection('styles');

Styles.allow({
	insert (userId, style) {
		return userId && style.owner === userId;
	},
	update (userId, style, fields, modifier) {
		return userId && style.owner === userId;
	},
	remove (userId, style) {
		return userId && style.owner === userId;
	}
});