import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

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
	'accounts.ui',
	uiRouter,
	CompilatorFacade,
	PageFacade,
	LayoutFacade,
	MediaFacade,
	StateFacade,
	AdminViewFacade,
	ngMaterial
]).component(name, {
	template,
	controllerAs : name,
	controller : Cms
}).config(config);

function config ($locationProvider, $urlRouterProvider, $stateProvider, $mdThemingProvider){
	'ngInject';

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	//defining palette
	$mdThemingProvider.definePalette('CMSpalette', {
	  '50': 'ffebee',
	  '100': 'ffcdd2',
	  '200': 'ef9a9a',
	  '300': 'e57373',
	  '400': 'ef5350',
	  '500': '57a69e', //input bottom color on hover
	  '600': 'e53935',
	  '700': 'd32f2f',
	  '800': 'c62828',
	  '900': 'b71c1c',
	  'A100': 'ff8a80',
	  'A200': 'ff5252',
	  'A400': 'ff1744',
	  'A700': 'd50000',
	  'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
	                                      // on this palette should be dark or light

	  'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
	   '200', '300', '400', 'A100'],
	  'contrastLightColors': undefined    // could also specify this if default was 'dark'
	});

	$mdThemingProvider.theme('default')
	  .primaryPalette('CMSpalette')
}

