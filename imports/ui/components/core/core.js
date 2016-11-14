import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './core.html';

import { name as CompilatorFacade } from '../compilatorManager/compilatorFacade';
import { name as PageFacade } 		from '../pageManager/pageFacade';
import { name as LayoutFacade } 	from '../layoutManager/layoutFacade';
import { name as MediaFacade } 		from '../mediaManager/mediaFacade';
import { name as StateFacade } 		from '../stateManager/stateFacade';
import { name as AdminViewFacade }  from '../adminView/adminViewFacade';

class Cms {};

const name = 'cms';

export default angular.module(name, [
	angularMeteor,
	CompilatorFacade,
	PageFacade,
	LayoutFacade,
	MediaFacade,
	StateFacade,
	AdminViewFacade
]).component(name, {
	template,
	controllerAs : name,
	controller : Cms
});