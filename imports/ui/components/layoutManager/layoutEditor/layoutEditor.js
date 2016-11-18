import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './layoutEditor.html';

class LayoutEditor{
	constructor($scope, $reactive, layoutEditor, childrenLayout){
		'ngInject';

		$reactive(this).attach($scope);

		this.layoutEditor = layoutEditor;
		this.childrenLayout = childrenLayout;

		this.handleEvents();

		this.plainText = 0;
		this.headerText = 0;
		this.media = 0;

		this.layoutContainer = {
			'<>' : 'section',
			class : 'asdasd',
			layout : 'row',
			html : []
		};
	}

	parseLayout(layout){
		Meteor.call('layoutParser', layout,
			(error, response) => {
				//TODO
			});
	}

	removeChildren(index){
		this.layoutContainer.html.splice(index, 1);
	}

	handleEvents(){
		this.layoutEditor.onAddElement((type) => {
			this.childrenLayout.createElement(type, (newElement) => {
				this.layoutContainer.html.push(newElement);
				//this.parseLayout(this.layoutContainer);
			});
		});
	}
}

class LayoutEditorService{
	constructor(){
		'ngInject';

		this.callback;

		this.addElement = (element) => {
			//trigger callback
			this.callback(element);
		}

		this.onAddElement = (callback) => {
			//add callback function to callbacks array
			this.callback = callback;
		}
	}
}

const name = 'layoutEditor';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	bindings : {
		name : '<'
	},
	controllerAs : name,
	controller : LayoutEditor
}).service(name, LayoutEditorService);


