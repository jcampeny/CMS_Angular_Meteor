import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './auth.html';

class Auth{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.helpers({
			currentUser(){
				return Metero.user();
			}
		});
	}
}

const name = 'auth';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : Auth
});