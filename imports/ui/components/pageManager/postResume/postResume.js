import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './postResume.html';

class PostResume{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.page = 1;
		this.perPage = 4;

		// this.helpers({
		// 	posts(){
		// 		return Posts.found({
		// 		}, {
		// 			limit : parseInt(this.getReactively('perPage')),
		// 			skip : parseInt((this.getReactively('page') - 1) * this.perPage)
		// 		});
		// 	}
		// });
		this.posts = [
			{ _id : 'V2UYB9834YBV43', name : 'Post 1'},
			{ _id : '4C9M8G34C3MHGY', name : 'Post 2'},
			{ _id : '84HGU9NRECMW2F', name : 'Post 3'},
			{ _id : '2H48G934VB3434', name : 'Post 4'}
		];
		this.totalPages = 10;
	}
}

const name = 'postResume';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : PostResume
});