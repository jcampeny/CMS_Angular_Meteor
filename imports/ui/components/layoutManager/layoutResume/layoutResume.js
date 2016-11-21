import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './layoutResume.html';

import { Layouts } from '../../../../api/layouts';

class LayoutResume{
	constructor($scope, $reactive, booleanPopup){
		'ngInject';

		$reactive(this).attach($scope);
		
		this.booleanPopup = booleanPopup;

		this.perPage = 4;
		this.page = 1;
		this.sort = {
			'metaData.name' : 1
		};
		this.searchText = '';
		

		this.subscribe('layouts');

		this.helpers({
			layouts(){
				return Layouts.find({}, {
					limit : parseInt(this.perPage),
					skip : parseInt((this.getReactively('page') - 1) * this.perPage),
					sort : this.getReactively('sort')
				});
			},
			totalPages(){
				return Math.ceil(Layouts.find({}).count() / this.perPage);
			}
		});

		this.filterBy = '';
	}

	setFilter(filter = ''){
		this.filterBy = (this.filterBy == filter) ? '' : filter;
	}

	movePage(direction) {
		if(direction == 'next')
			this.page = (this.totalPages > this.page) ? (this.page + 1) : this.page;
		
		if(direction == 'prev')
			this.page = (this.page > 1) ? (this.page - 1) : this.page;
	}

	delete(layout) {
		const message = 'Do you want to delete ' + layout.metaData.name + ' layout?';
		const options = {
			yes : 'Delete',
			no : 'Cancel'
		};

		this.booleanPopup.open(message, options, 
			(response) => {
				if(response === true){
					console.log(layout.metaData.name + ' deleted');
				}
			});
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