import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import { viewController } from './viewController';

import { name as Auth } from './auth/auth';
import { name as HeaderOptions } from './header/headerOptions/headerOptions';
import { name as Navigation } from './header/navigation/navigation';
import { name as Resume } from './resume/resume';
import { name as Popup } from './popup/popup';

class AdminViewFacade {
	constructor($scope, $reactive, $rootScope, $location){
		'ngInject';

		$reactive(this).attach($scope);

		this.root = $rootScope;
		this.scope = $scope;
		this.location = $location;

		//check if user can view the new state on view change
		this.scope
			.$watch(
				() => this.location.url(), 
				(newState, oldState) => {
					viewController.checkUser(Meteor.userId(), newState)
						.catch((error)=>{
							this.root.$broadcast('$stateChangeError',{
								error : error.reason, 
								redirect : error.redirectTo
							});
						});
				}
			);	
	}
};

const name = 'adminViewFacade';

export default angular.module(name, [
	angularMeteor,
	Auth,
	HeaderOptions, 
	Navigation,
	Resume,
	Popup
]).component(name, {
	template : '<div ui-view="" class="admin-view-facade"></div>',
	controllerAs : name,
	controller : AdminViewFacade
})
.config(viewController.config)
.run(viewController.run);

