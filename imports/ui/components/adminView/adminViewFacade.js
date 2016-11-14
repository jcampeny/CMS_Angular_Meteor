import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as Auth } from './auth/auth';

class AdminViewFacade {
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);
	}
};

const name = 'adminViewFacade';

export default angular.module(name, [
	angularMeteor,
	Auth
]).component(name, {
	controllerAs : name,
	controller : AdminViewFacade
});