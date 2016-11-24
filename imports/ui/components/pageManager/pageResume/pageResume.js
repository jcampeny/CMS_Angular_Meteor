import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './pageResume.html';

class PageResume{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.page = 1;
		this.perPage = 4;

		// this.helpers({
		// 	pages(){
		// 		return Pages.found({
		// 		}, {
		// 			limit : parseInt(this.getReactively('perPage')),
		// 			skip : parseInt((this.getReactively('page') - 1) * this.perPage)
		// 		});
		// 	}
		// });
		this.pages = [
			{ _id : 'V2UYB9834YBV43', name : 'Page 1'},
			{ _id : '4C9M8G34C3MHGY', name : 'Page 2'},
			{ _id : '84HGU9NRECMW2F', name : 'Page 3'},
			{ _id : '2H48G934VB3434', name : 'Page 4'}
		];
		this.totalPages = 10;
		
		this.filterBy = '';
	}

	setFilter(filter = ''){
		this.filterBy = (this.filterBy == filter) ? '' : filter;
	}
}

const name = 'pageResume';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : PageResume
});