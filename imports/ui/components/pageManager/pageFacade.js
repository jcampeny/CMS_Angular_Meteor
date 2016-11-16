import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as PageResume } from './pageResume/pageResume';
import { name as PostResume } from './postResume/postResume';

class PageFacade {};

const name = 'pageFacade';

export default angular.module(name, [
	angularMeteor,
	PageResume,
	PostResume
]).component(name, {
	controllerAs : name,
	controller : PageFacade
});