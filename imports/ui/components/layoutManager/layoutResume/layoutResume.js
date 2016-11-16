import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './layoutResume.html';

class LayoutResume{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.page = 1;
		this.perPage = 4;

		// this.helpers({
		// 	layouts(){
		// 		return Layouts.found({
		// 		}, {
		// 			limit : parseInt(this.getReactively('perPage')),
		// 			skip : parseInt((this.getReactively('page') - 1) * this.perPage)
		// 		});
		// 	}
		// });

		this.layouts = [
			{ _id : 'V2UYB9834YBV43', name : 'Layout 1'},
			{ _id : '4C9M8G34C3MHGY', name : 'Layout 2'},
			{ _id : '84HGU9NRECMW2F', name : 'Layout 3'},
			{ _id : '2H48G934VB3434', name : 'Layout 4'}
		];

		this.totalPages = 10;

		this.filterBy = '';
	}

	setFilter(filter = ''){
		this.filterBy = (this.filterBy == filter) ? '' : filter;
	}
}

const name = 'layoutResume';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : LayoutResume
});