import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './pageCreation.html';

class PageCreation{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);
		
		this.pageName = 'Page 1';
		this.pageType = 'page';
	}
}

const name = 'pageCreation';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : PageCreation
});