import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import { viewController } from './viewController';

import { name as Auth } from './auth/auth';
import { name as HeaderOptions } from './header/headerOptions/headerOptions';
import { name as Navigation } from './header/navigation/navigation';

class AdminViewFacade {
	constructor($scope, $reactive, $rootScope, $location){
		'ngInject';

		$reactive(this).attach($scope);

		this.root = $rootScope;

		viewController.checkUser(Meteor.userId(), $location.url())
			.catch((data)=>{
				this.root.$broadcast('$stateChangeError',{
					error : data.reason, 
					redirect : data.redirectTo
				});
			});
	}
};

const name = 'adminViewFacade';

export default angular.module(name, [
	angularMeteor,
	Auth,
	HeaderOptions, 
	Navigation
]).component(name, {
	template : '<div ui-view="" class="admin-view-facade"></div>',
	controllerAs : name,
	controller : AdminViewFacade
})
.config(viewController.config)
.run(viewController.run);

