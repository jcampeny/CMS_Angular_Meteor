import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import {} from 'angular-ui-sortable';

import template from './layoutEditor.html';

class LayoutEditor{
	constructor($scope, $reactive, childrenLayout, cssManager){
		'ngInject';

		$reactive(this).attach($scope);

		this.childrenLayout = childrenLayout;
		this.css = cssManager;

		this.plainText = 0;
		this.headerText = 0;
		this.media = 0;

		this.layoutContainer = {
			'<>' : 'section',
			class : this.css.generateClassId(),
			layout : 'row',
			html : []
		};
	}

	parseLayout(layout){
		Meteor.call('layoutParser', layout,
			(error, response) => {
				console.log(response);
			});
	}

	removeChildren(index){
		this.layoutContainer.html.splice(index, 1);
	}

	addElement(type){
		this.childrenLayout.createElement(type, (newElement) => {
			this.layoutContainer.html.push(newElement);
			this.parseLayout(this.layoutContainer);
		});
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
});


