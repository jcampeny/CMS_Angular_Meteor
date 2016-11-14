import angular from 'angular';
import angularMeteor from 'angular-meteor';

class CompilatorFacade {};

const name = 'compilatorFacade';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	controllerAs : name,
	controller : CompilatorFacade
});