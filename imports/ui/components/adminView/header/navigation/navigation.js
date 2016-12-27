import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './navigation.html';

class Navigation{
	constructor($scope, $reactive, $state, compilatorFacade){
		'ngInject';

		$reactive(this).attach($scope);

		this.state      = $state;
		this.compilator = compilatorFacade;
	}

	compileExternalWeb (event) {
		this.compilator.compile(event);
	}
}

const name = 'navigation';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : Navigation
});