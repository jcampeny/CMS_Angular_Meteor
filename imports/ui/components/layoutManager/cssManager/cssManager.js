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

		this.classId = {};

		this.cssProperties = {};

		this.newCssProperty = {
			key : '',
			value : ''
		};
	}

	saveClass(classObj = this.cssProperties[this.classId]){
		if(classObj){
			//remove $$hashKey
			angular.forEach(classObj, (classProperty) => {
				if(classProperty.$$hashKey){
					delete classProperty.$$hashKey;
				}
			});
		}
		console.log(classObj);
	}

	addProperty(property = this.newCssProperty){
		//parse property 
		let parsedProperty = {};
		parsedProperty[property.key] = property.value;

		//add property to cssProperties
		if(!this.cssProperties[this.classId])
			this.cssProperties[this.classId] = [];

		this.cssProperties[this.classId].push(parsedProperty);

		//reset values
		this.newCssProperty = {key : '', value : ''};
	}

	openCssEditor(){
		$('#cssManager').addClass('active');
	}

	closeCssEditor(){
		$('#cssManager').removeClass('active');
	}

	handleEvents(){
		this.root.$on('openCssEditor', (event, args) => {
			if(args.layout.class){
				this.classId = args.layout.class;
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
}).filter('getCssValue', () => {
	return (cssProperty) => {
		return Object.values(cssProperty)[0];
	}
}).filter('getCssKey', () => {
	return (cssProperty) => {
		return Object.keys(cssProperty)[0];
	}
}).service(name, CssManagerService);


