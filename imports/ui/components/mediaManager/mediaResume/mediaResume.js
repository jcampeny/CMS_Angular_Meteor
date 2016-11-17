import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './mediaResume.html';

class MediaResume{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		// this.helpers({
		// 	sections(){
		// 		return Sections.found({
		// 		}, {
		// 			limit : parseInt(this.getReactively('perPage')),
		// 			skip : parseInt((this.getReactively('page') - 1) * this.perPage)
		// 		});
		// 	}
		// });

		this.medias = [
			{ _id : 'V2UYB9834YBV43', name : 'Media 1', src: '/img/pugs/pug-1.jpg'},
			{ _id : '4C9M8G34C3MHGY', name : 'Media 2', src: '/img/pugs/pug-2.jpg'},
			{ _id : '84HGU9NRECMW2F', name : 'Media 3', src: '/img/pugs/pug-3.jpg'},
			{ _id : '2H48G934VB3434', name : 'Media 4', src: '/img/pugs/pug-4.jpg'},
			{ _id : 'V2UYB9834YBV43', name : 'Media 5', src: '/img/pugs/pug-5.jpg'},
			{ _id : '4C9M8G34C3MHGY', name : 'Media 6', src: '/img/pugs/pug-6.jpg'},
			{ _id : '84HGU9NRECMW2F', name : 'Media 7', src: '/img/pugs/pug-7.jpg'},
			{ _id : '2H48G934VB3434', name : 'Media 8', src: '/img/pugs/pug-8.jpg'},
			{ _id : '2H48G934VB3434', name : 'Media 9', src: '/img/pugs/pug-9.jpg'}
		];
	}
}

const name = 'mediaResume';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : MediaResume
});