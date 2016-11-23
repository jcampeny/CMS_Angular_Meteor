import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './cssManager.html';
import { CssManagerService } from './cssManagerService';

import { Styles } from '../../../../api/styles';

class CssManager{
	constructor($scope, $reactive, $rootScope){
		'ngInject';

		$reactive(this).attach($scope);

		this.root  = $rootScope;
		this.scope = $scope;
		this.handleEvents();

		this.parentLayout 	= {};
		this.classId 		= {};
		this.newCssProperty = {
			key : '',
			value : ''
		};

		this.subscribe('styles', () => [this.getReactively('parentLayout._id', true)]);

		this.helpers({
			styleSaved () {
				return Styles.findOne({
					class : this.getReactively('classId')
				});
			}
		});
	}

	saveClass(
		parentLayout = this.parentLayout, 
		properties   = (this.styleSaved) ? this.styleSaved.properties : null, 
		className    = this.classId
	){
		if ( this.styleSaved )
		{ //if class exist go update
			const msg = 'Do you want to overwrite this class?';
			const options = {yes : 'Yes', no : 'No'};

			this.root.throwMessage(msg, options, 
				(response, options) => {
					if (response) this.updateClass();
				}
			);
		} 
		else 
		{ //save in DB if this class was not found
			this.call('insertStyle', className, properties, parentLayout._id, 
				(err, res) => {
					if (!err){
						this.root.throwMessage('Your Css class has been successfully saved');
					} else {
						this.root.throwMessage(err.reason);
					}
					this.root.$apply();
				}
			);
		}
	}

	updateClass(
		properties = (this.styleSaved) ? this.styleSaved.properties : null,
		styleId = this.styleSaved._id
	){
		this.call('updateStyle', properties, styleId,
			(err, res) => {
				if (!err){
					this.root.throwMessage('Your Css class has been successfully saved');
				} else {
					this.root.throwMessage(err.reason);
				}
				this.root.$apply();
			}
		);
	}

	addProperty(property = this.newCssProperty){
		//parse property 
		let parsedProperty = {};
		parsedProperty[property.key] = property.value;

		//add property to cssProperties
		if(!this.styleSaved)
			this.styleSaved = {};
		
		if(!this.styleSaved.properties)
			this.styleSaved.properties = [];
		
		this.styleSaved.properties.push(parsedProperty);

		//reset values
		this.newCssProperty = {key : '', value : ''};
	}

	removeProperty(property){
		for (let i in this.styleSaved.properties) {
			if ( angular.equals(property, this.styleSaved.properties[i]) )
				this.styleSaved.properties.splice(i, 1);
		}
	}

	openCssEditor(){
		$('#cssManager').addClass('active');
	}

	closeCssEditor(){
		$('#cssManager').removeClass('active');
	}

	handleEvents(){
		this.root.$on('openCssEditor', (event, args) => {
			if (!args.layout._id) {
				//Avoid to save CSS without any related layout 
				this.root.throwMessage('You have to save Layout to add Styles');
			} else {
				this.parentLayout = args.layout;
				this.classId = (args.childrenLayout) ? args.childrenLayout.class : args.layout.class;
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
		if (cssProperty)
			return Object.values(cssProperty)[0];
	}
}).filter('getCssKey', () => {
	return (cssProperty) => {
		if (cssProperty)
			return Object.keys(cssProperty)[0];
	}
}).service(name, CssManagerService);


