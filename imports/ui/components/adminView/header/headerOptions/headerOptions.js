import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './headerOptions.html';

class HeaderOptions{
	constructor($scope, $reactive, $state){
		'ngInject';

		$reactive(this).attach($scope);

		this.state    = $state;
		this.scope    = $scope;

		this.scope.$watch(
			() => this.state.$current.name,
			() => {
				//TODO 
				//console.log(this.state.$current.name);
			}
		);
	}

	logout(){
		Accounts.logout(() => {
			this.state.go('auth');
		});
	}
}

const name = 'headerOptions';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : HeaderOptions
});