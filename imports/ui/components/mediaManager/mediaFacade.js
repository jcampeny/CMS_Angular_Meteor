import angular from 'angular';
import angularMeteor from 'angular-meteor';

class MediaFacade {};

const name = 'mediaFacade';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	controllerAs : name,
	controller : MediaFacade
});