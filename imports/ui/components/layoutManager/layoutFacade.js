import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as LayoutResume } from './layoutResume/layoutResume';
import { name as LayoutCreation } from './layoutCreation/layoutCreation';

class LayoutFacade {};

const name = 'layoutFacade';

export default angular.module(name, [
	angularMeteor,
	LayoutResume,
	LayoutCreation
]).component(name, {
	controllerAs : name,
	controller : LayoutFacade
});