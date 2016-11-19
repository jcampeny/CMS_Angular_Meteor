import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import {} from 'angular-ui-sortable';

import template from './layoutEditor.html';

import { LayoutEditorService } from './layoutEditorService';

class LayoutEditor{
	constructor($scope, $reactive, $rootScope, childrenLayout, cssManager, layoutEditor, $stateParams)
	{
		'ngInject';

		$reactive(this).attach($scope);

		this.layoutId 		= $stateParams._id;
		this.root 			= $rootScope;
		this.childrenLayout = childrenLayout;
		this.css 			= cssManager;
		this.layoutEditor 	= layoutEditor;

		this.__constructLayout();
		this.handleEvents();
	}

	save(callback){
		this.layoutContainer.metaData.name = this.name;

		if(!this.layoutContainer._id){
			Meteor.call('insertLayout', this.layoutContainer,
				(error, response) => {
					if(!error){
						if(typeof callback == 'function'){
							this.layoutContainer = response.layout;
							callback(error, response);
						}
					} else {
						console.log(error.reason);
					}
				});
		} else {
			this.update(callback);
		}
	}

	update(callback){
		Meteor.call('updateLayout', this.layoutContainer,
			(error, response) => {
				if(typeof callback == 'function')
					callback(error, response);
				
			});
	}

	removeChildren(index){
		this.layoutContainer.html.splice(index, 1);
	}

	addChildren(type){
		this.childrenLayout.createChildren(type, (newChildren) => {
			this.layoutContainer.html.push(newChildren);
			this.layoutEditor.parseLayout(this.layoutContainer);
		});
	}
	
	__constructLayout(){
		if(this.layoutId) 
		{ //if ids layout exist... go search in DB
			Meteor.call('getLayout', this.layoutId, 
				(error, response)=>{
					this.name = response.metaData.name;
					this.layoutContainer = response;
				});
		} 
		else 
		{ //create a standard layout to be created
			this.layoutContainer = {
				'<>'     : 'section',
				class    : this.css.generateClassId(),
				layout   : 'row',
				html   	 : [],
				metaData : {
					name   : this.name,
					owner  : Meteor.userId(),
					public : false
				}
			};				
		}
	}		

	handleEvents(){
		this.layoutEditor.onSaveLayoutFromOutside(
			(name, callback) => {
				if(name && name == this.name){
					this.save(callback);
				}
			}
		);
	}
}


const name = 'layoutEditor';

export default angular.module(name, [
	angularMeteor,
	'ui.sortable'
]).component(name, {
	template,
	bindings : {
		name : '='
	},
	controllerAs : name,
	controller : LayoutEditor
}).service(name, LayoutEditorService);


