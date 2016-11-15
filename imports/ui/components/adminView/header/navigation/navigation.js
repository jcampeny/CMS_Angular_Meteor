import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './navigation.html';

class Navigation{
	constructor($scope, $reactive, $state){
		'ngInject';

		$reactive(this).attach($scope);

		this.state = $state;
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