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

		this.layoutId 		= this.layoutId || $stateParams.layoutId;
		this.root 			= $rootScope;
		this.childrenLayout = childrenLayout;
		this.css 			= cssManager;
		this.layoutFacade 	= layoutFacade;
		this.state 			= $state;
		this.scope 			= $scope;

		this.createLayout();
		this.scope.$watch( 
			() => this.layoutId, 
			()=> {this.createLayout();}
		);
	}

	save(layout = this.layoutContainer){
		this.layoutContainer.metaData.name = this.name;

		this.layoutFacade.save(layout, 
			(error, response) => {
				if(!error){
					this.layoutContainer = response.layout;
					this.layoutFacade.throwMessage('Layout saved successfully');
				} else {
					this.layoutFacade.throwMessage(error.reason);
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
						this.layoutFacade.throwMessage('Layout ' + layout.metaData.name + ' deleted.');
					} else {
						this.layoutFacade.throwMessage(error.reason);
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
					if(!error){
						if(response && response.metaData)
							this.name = response.metaData.name;
						this.layoutContainer = response;
						this.layoutContainer.html = this.html || this.layoutContainer.html;	
					} else {
						this.layoutFacade.throwMessage(error.reason);					
					}
				}
			);
		} 
		else 
		{ //create a standard layout to be created
			this.layoutContainer = this.layoutFacade.createEmptyLayout();
			this.layoutContainer.html = this.html || this.layoutContainer.html;				
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
		name : '=',
		layoutId : '<',
		options : '<',
		html : '='
	},
	controllerAs : name,
	controller : LayoutEditor
});


