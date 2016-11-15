import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import { viewController } from './viewController';
import { name as Auth } from './auth/auth';

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
	Auth
]).component(name, {
	template : '<div ui-view=""></div>',
	controllerAs : name,
	controller : AdminViewFacade
})
.config(viewController.config)
.run(viewController.run);

