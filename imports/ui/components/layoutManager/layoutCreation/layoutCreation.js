import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './layoutCreation.html';

class LayoutCreation{
	constructor($scope, $reactive, layoutEditor){
		'ngInject';

		$reactive(this).attach($scope);

		this.layoutEditor = layoutEditor;
		

		this.layoutName = 'Layout 1';
		this.layoutType = 'other';

	}
}

const name = 'layoutCreation';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : LayoutCreation
});