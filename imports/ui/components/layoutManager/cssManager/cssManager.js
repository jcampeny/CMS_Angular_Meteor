import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './cssManager.html';
import { CssManagerService } from './cssManagerService';

class CssManager{
	constructor($scope, $reactive, $rootScope){
		'ngInject';

		$reactive(this).attach($scope);

		this.root = $rootScope;
		this.handleEvents();

		this.layoutToEdit = {};
	}

	openCssEditor()
	{
		$('#cssManager').addClass('active');
	}

	closeCssEditor()
	{
		$('#cssManager').removeClass('active');
	}
	handleEvents()
	{
		this.root.$on('openCssEditor', (event, args) => {
			if(args.layout.class){
				this.layoutToEdit = args.layout;console.log(this.layoutToEdit)
				this.openCssEditor();
			}
		});
	}
}

const name = 'cssManager';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : CssManager
}).service(name, CssManagerService);