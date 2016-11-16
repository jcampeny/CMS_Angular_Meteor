import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as SectionResume } from './sectionResume/sectionResume';

class StateFacade {};

const name = 'stateFacade';

export default angular.module(name, [
	angularMeteor,
	SectionResume
]).component(name, {
	controllerAs : name,
	controller : StateFacade
});