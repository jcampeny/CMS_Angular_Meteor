import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './cssManager.html';
import { CssManagerService } from './cssManagerService';

class CssManager{
	constructor($scope, $reactive, $rootScope){
		'ngInject';

		$reactive(this).attach($scope);

		this.root  = $rootScope;
		this.scope = $scope;
		this.handleEvents();

		this.container 	= {};
		this.backupStyle = {};
		this.newCssProperty = {
			key : '',
			value : ''
		};
	}

	addProperty(property = this.newCssProperty){
		//parse property 
		let parsedProperty = {};
		parsedProperty[property.key] = property.value;

		//add property to cssProperties
		if(!this.container.styles)
			this.container.styles = [];
		
		this.container.styles.push(parsedProperty);

		//reset values
		this.newCssProperty = {key : '', value : ''};
	}

	removeProperty(property){
		if (Array.isArray(this.container.styles)){
			this.container.styles = this.container.styles.filter( 
				propertyItem => !Object.is(property, propertyItem)
			);
		}
	}

	openCssEditor(){
		$('#cssManager').addClass('active');
	}

	closeCssEditor(save = false){
		$('#cssManager').removeClass('active');
		if(!save)
			this.container.styles = this.backupStyle;
	}

	handleEvents(){
		this.root.$on('openCssEditor', (event, args) => {
			this.container = args.container;
			this.backupStyle = angular.copy(args.container.styles);
			this.openCssEditor();
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
}).filter('getCssValue', () => {
	return (cssProperty) => {
		if (cssProperty)
			return Object.values(cssProperty)[0];
	}
}).filter('getCssKey', () => {
	return (cssProperty) => {
		if (cssProperty)
			return Object.keys(cssProperty)[0];
	}
}).service(name, CssManagerService);


