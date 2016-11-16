import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './resume.html';

class Resume{
	constructor($scope, $reactive, $state){
		'ngInject';

		$reactive(this).attach($scope);
	}
}

const name = 'resume';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : Resume
});