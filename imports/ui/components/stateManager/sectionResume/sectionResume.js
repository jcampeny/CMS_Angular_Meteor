import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './sectionResume.html';

class SectionResume{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.page = 1;
		this.perPage = 4;

		// this.helpers({
		// 	sections(){
		// 		return Sections.found({
		// 		}, {
		// 			limit : parseInt(this.getReactively('perPage')),
		// 			skip : parseInt((this.getReactively('page') - 1) * this.perPage)
		// 		});
		// 	}
		// });
		this.sections = [
			{ _id : 'V2UYB9834YBV43', name : 'Section 1'},
			{ _id : '4C9M8G34C3MHGY', name : 'Section 2'},
			{ _id : '84HGU9NRECMW2F', name : 'Section 3'},
			{ _id : '2H48G934VB3434', name : 'Section 4'}
		];
		this.totalPages = 10;
	}
}

const name = 'sectionResume';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : SectionResume
});