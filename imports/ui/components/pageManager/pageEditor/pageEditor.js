import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './pageEditor.html';

class PageEditor{
	constructor($scope, $reactive, layoutFacade){
		'ngInject';

		$reactive(this).attach($scope);

		this.layouts = [];
		this.layoutFacade = layoutFacade;
	}

	addLayout (){
		this.layoutFacade.displayLayouts(
			(itemsSelected) => {
				//console.log(itemsSelected);
			}
		);
	}
}

const name = 'pageEditor';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : PageEditor
});