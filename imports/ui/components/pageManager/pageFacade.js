import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as PageResume } from './pageResume/pageResume';
import { name as PageCreation } from './pageCreation/pageCreation';
import { name as PageEditor } from './pageEditor/pageEditor';

class PageFacade {};

const name = 'pageFacade';

export default angular.module(name, [
	angularMeteor,
	PageResume,
	PageCreation,
	PageEditor
]).component(name, {
	controllerAs : name,
	controller : PageFacade
});