import angular from 'angular';
import angularMeteor from 'angular-meteor';

class StateFacade {};

const name = 'stateFacade';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	controllerAs : name,
	controller : StateFacade
});