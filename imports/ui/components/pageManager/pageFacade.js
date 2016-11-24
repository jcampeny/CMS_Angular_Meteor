import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as PageResume } from './pageResume/pageResume';
import { name as PageCreation } from './pageCreation/pageCreation';

class PageFacade {};

const name = 'pageFacade';

export default angular.module(name, [
	angularMeteor,
	PageResume,
	PageCreation
]).component(name, {
	controllerAs : name,
	controller : PageFacade
});