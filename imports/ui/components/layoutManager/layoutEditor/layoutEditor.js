import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import {} from 'angular-ui-sortable';

import template from './layoutEditor.html';

class LayoutEditor{
	constructor($scope, $reactive, $rootScope, childrenLayout, cssManager, $stateParams, layoutFacade, $state)
	{
		'ngInject';

		$reactive(this).attach($scope);

		this.layoutId 		= $stateParams._id;
		this.root 			= $rootScope;
		this.childrenLayout = childrenLayout;
		this.css 			= cssManager;
		this.layoutFacade 	= layoutFacade;
		this.state 			= $state;

		this.createLayout();
	}

	save(layout = this.layoutContainer){
		this.layoutContainer.metaData.name = this.name;

		this.layoutFacade.save(layout, 
			(error, response) => {
				if(!error){
					this.layoutContainer = response.layout;
				} else {
					console.log(error.reason);
				}
			}
		);
	}

	delete(layout = this.layoutContainer) {
		if(this.layoutContainer._id){
			this.layoutFacade.deleteLayout(layout, 
				(error, response)=>{
					if(!error){
						this.state.go('home.layouts.display');
						console.log('Layout ' + layout.metaData.name + ' deleted.');
					}
				}
			);			
		} else {
			this.state.go('home.layouts.display');
		}
	}

	createLayout(){
		if(this.layoutId) 
		{ //if ids layout exist... go search in DB
			this.layoutFacade.getLayoutById(this.layoutId,
				(error, response) => {
					this.name = response.metaData.name;
					this.layoutContainer = response;
				}
			);
		} 
		else 
		{ //create a standard layout to be created
			this.layoutContainer = this.layoutFacade.createEmptyLayout();				
		}
	}	

	removeChildren(index){
		this.layoutContainer.html.splice(index, 1);
	}

	addChildren(type){
		this.childrenLayout.createChildren(type, (newChildren) => {
			this.layoutContainer.html.push(newChildren);
			this.layoutFacade.parseLayout(this.layoutContainer);
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
		name : '='
	},
	controllerAs : name,
	controller : LayoutEditor
});


