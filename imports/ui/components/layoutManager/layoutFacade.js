import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as LayoutResume } from './layoutResume/layoutResume';
import { name as LayoutCreation } from './layoutCreation/layoutCreation';
import { name as LayoutEditor } from './layoutEditor/layoutEditor';

import { name as ChildrenLayout } from './childrenLayout/childrenLayout';
import { name as CssManager } from './cssManager/cssManager';

class LayoutFacade {};

const name = 'layoutFacade';

export default angular.module(name, [
	angularMeteor,
	LayoutResume,
	LayoutCreation,
	LayoutEditor,
	ChildrenLayout,
	CssManager
]).component(name, {
	controllerAs : name,
	controller : LayoutFacade
});