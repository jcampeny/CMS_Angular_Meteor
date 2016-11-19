import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import {} from 'angular-ui-sortable';

import template from './layoutEditor.html';

import { LayoutEditorService } from './layoutEditorService';

class LayoutEditor{
	constructor($scope, $reactive, $rootScope, childrenLayout, cssManager, layoutEditor){
		'ngInject';

		$reactive(this).attach($scope);

		this.root 			= $rootScope;
		this.childrenLayout = childrenLayout;
		this.css 			= cssManager;
		this.layoutEditor 	= layoutEditor;

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
			this.update();
		}
	}

	update(){
		Meteor.call('updateLayout', this.layoutContainer,
			(error, response) => {
				console.log(error, response);
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
		name : '<'
	},
	controllerAs : name,
	controller : LayoutEditor
}).service(name, LayoutEditorService);


