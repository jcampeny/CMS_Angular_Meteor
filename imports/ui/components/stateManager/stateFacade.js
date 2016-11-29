import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as StateEdit } from './stateEdit/stateEdit.js';

class StateFacade {};

const name = 'stateFacade';

export default angular.module(name, [
	angularMeteor,
	StateEdit
]).component(name, {
	controllerAs : name,
	controller : StateFacade
});