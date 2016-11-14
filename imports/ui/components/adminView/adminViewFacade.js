import angular from 'angular';
import angularMeteor from 'angular-meteor';

class AdminViewFacade {};

const name = 'adminViewFacade';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	controllerAs : name,
	controller : AdminViewFacade
});