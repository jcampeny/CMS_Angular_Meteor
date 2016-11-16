import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './pageResume.html';

class PageResume{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);
	}
}

const name = 'pageResume';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : pageResume
});