import angular from 'angular';
import angularMeteor from 'angular-meteor';

class LayoutFacade {};

const name = 'layoutFacade';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	controllerAs : name,
	controller : LayoutFacade
});