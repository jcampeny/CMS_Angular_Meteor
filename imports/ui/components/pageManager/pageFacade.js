import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as PageResume } from './pageResume/pageResume';

class PageFacade {};

const name = 'pageFacade';

export default angular.module(name, [
	angularMeteor,
	PageResume
]).component(name, {
	controllerAs : name,
	controller : PageFacade
});