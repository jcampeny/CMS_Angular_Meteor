import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './pageResume.html';

import { Pages } from '../../../../api/pages';

class PageResume{
	constructor($scope, $reactive, pageFacade){
		'ngInject';

		$reactive(this).attach($scope);
		
		this.pageFacade = pageFacade;

		this.perPage = 4;
		this.page = 1;
		this.sort = {
			'metaData.name' : 1
		};
		this.searchText = '';
		

		this.subscribe('pages');

		this.helpers({
			pages(){
				return Pages.find({}, {
					limit : parseInt(this.perPage),
					skip : parseInt((this.getReactively('page') - 1) * this.perPage),
					sort : this.getReactively('sort')
				});
			},
			totalPages(){
				return Math.ceil(Pages.find({}).count() / this.perPage);
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

	delete(page) {
		this.pageFacade.deletePage(page, 
			(error, response)=>{
				if(!error){
					let msg = 'Page ' + page.metaData.name + ' deleted.';
					this.pageFacade.throwMessage(msg);
				}
			}
		);
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