import angular from 'angular';
import angularMeteor from 'angular-meteor';

class PageFacade {};

const name = 'pageFacade';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	controllerAs : name,
	controller : PageFacade
});