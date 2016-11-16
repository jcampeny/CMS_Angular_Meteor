import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as LayoutResume } from './layoutResume/layoutResume';

class LayoutFacade {};

const name = 'layoutFacade';

export default angular.module(name, [
	angularMeteor,
	LayoutResume
]).component(name, {
	controllerAs : name,
	controller : LayoutFacade
});