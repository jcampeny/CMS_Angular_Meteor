import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './auth.html';

class Auth{
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.helpers({
			currentUser(){
				return Meteor.user();
			}
		});

		this.credentials = {
			userName : "",
			password : ""
		};
	}
}

const name = 'auth';

export default angular.module(name, [
	angularMeteor,
	uiRouter
]).component(name, {
	template,
	controllerAs : name,
	controller : Auth
}).config(config);

function config ($stateProvider){
	'ngInject';

	$stateProvider.state('auth', {
		url : '/login',
		template : '<auth></auth>'
	});
}