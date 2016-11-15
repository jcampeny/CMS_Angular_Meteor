import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './auth.html';

class Auth{
	constructor($scope, $reactive, $state){
		'ngInject';

		$reactive(this).attach($scope);

		this.state = $state;

		this.credentials = {
			userName : "",
			password : ""
		};

		this.error = {};

	}

	login () {
		Meteor.loginWithPassword(this.credentials.userName, this.credentials.password,
			this.$bindToContext((err) => {
				if (err) {
					this.error = err;
				} else {
					this.state.go('home.resume');
				}
			})
		);
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