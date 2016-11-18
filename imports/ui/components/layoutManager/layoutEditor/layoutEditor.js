import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './layoutEditor.html';

class LayoutEditor{
	constructor($scope, $reactive, layoutEditor){
		'ngInject';

		$reactive(this).attach($scope);

		this.layoutEditor = layoutEditor;

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
							console.log(this.layoutContainer);
				console.log(response, error);
			});
	}

	removeChildren(index){
		this.layoutContainer.html.splice(index, 1);
	}

	createPlainText(){
		this.plainText++;
		var styleClass = 'G35245DF3R'; //generate class on CSS service
		const element = {
			'<>': 'article', 
			type : 'Plain text',
			class: styleClass, 
			flex : 100,
			html:'Hello world! Edit this :)'
		};

		this.layoutContainer.html.push(element);
	}	

	createHeaderText(){
		this.headerText++;
		var styleClass = 'G35245DF3R'; //generate class on CSS service
		const element = {
			'<>': 'article', 
			type : 'Header',
			class: styleClass, 
			flex : 100,
			html:"I'm a header!"
		};

		this.layoutContainer.html.push(element);
	}	

	handleEvents(){
		this.layoutEditor.onAddElement((layoutChildrenType) => {
			switch(layoutChildrenType){
				case 'plainText':
					this.createPlainText();
					break;
				case 'headerText':
					this.createHeaderText();
					break;
				case 'media':
					this.media++;
					break;
			}	
			this.parseLayout(this.layoutContainer);
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


