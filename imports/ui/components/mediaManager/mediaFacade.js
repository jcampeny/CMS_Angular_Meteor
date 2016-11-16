import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as MediaResume } from './mediaResume/mediaResume';

class MediaFacade {};

const name = 'mediaFacade';

export default angular.module(name, [
	angularMeteor,
	MediaResume
]).component(name, {
	controllerAs : name,
	controller : MediaFacade
});