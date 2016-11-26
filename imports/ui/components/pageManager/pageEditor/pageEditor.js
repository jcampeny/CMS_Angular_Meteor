import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './pageEditor.html';

class PageEditor{
	constructor($scope, $reactive, $rootScope, layoutFacade, cssManager){
		'ngInject';

		$reactive(this).attach($scope);

		this.css 		  = cssManager;
		this.layoutFacade = layoutFacade;
		this.root 		  = $rootScope;

		this.layouts 		 = [];
		this.contractLayouts = false;
		this.contractLayout  = [];

		this.handleEvents();
	}

	addLayout(){
		this.layoutFacade.displayLayouts(
			(layoutsSelected, cancelled) => {
				if (!cancelled){
					this.layouts = this.layouts.concat(//add only new layouts
						layoutsSelected.filter(
							item => {//!this.layouts.includes(item)
								let found = false;
								this.layouts.forEach( layout => {
									if (layout._id == item._id)
										found = true
								});
								return !found;
							}
						)
					);
					// .filter(//remove all unselected layouts and mantain unsaved (in DB) layouts
					// 	item => !item._id || (layoutsSelected.includes(item))
					// );					
				}
			}
		);
	}

	addNewLayout(){
		this.layouts.push(this.layoutFacade.createEmptyLayout());
	}

	removeLayout(index){
		this.layouts.splice(index, 1);
	}

	handleEvents(){
		//handle layout saved event to assign new _id to the layout
		this.root.$on('layoutSaved', (event, args) => {
			this.layouts = this.layouts.map( (layout) => {
				if(layout.metaData.name === args.layout.metaData.name)
					layout._id = args.layout._id;
				
				return layout;
			});
		})
	}
}

const name = 'pageEditor';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	bindings : {
		name : '=',
		pageId : '@'
	},
	controllerAs : name,
	controller : PageEditor
});