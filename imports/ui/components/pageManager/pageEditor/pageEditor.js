import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './pageEditor.html';

class PageEditor{
	constructor($scope, $reactive, $rootScope, pageFacade, layoutFacade, cssManager, $stateParams){
		'ngInject';

		$reactive(this).attach($scope);

		this.css 		  = cssManager;
		this.layoutFacade = layoutFacade;
		this.pageFacade   = pageFacade;
		this.root 		  = $rootScope;

		this.pageId 		    = $stateParams._id || this.pageId;
		this.pageContainer		= {};
		this.contractLayouts    = false;
		this.contractLayout     = [];

		this.createPage();

		this.handleEvents();
	}

	save(page = this.pageContainer){
		this.pageContainer.metaData.name = this.name;

		this.pageFacade.save(page, 
			(error, response) => {
				if(!error){
					this.pageContainer = response.page;
					this.root.throwMessage('Page saved successfully');
				} else {
					this.root.throwMessage(error.reason);
				}
			}
		);
	}

	addLayout(){
		this.layoutFacade.displayLayouts(
			(layoutsSelected, cancelled) => {
				if (!cancelled){
					this.pageContainer.html = this.pageContainer.html.concat(//add only new layouts
						layoutsSelected.filter(
							item => {//!this.pageContainer.html.includes(item)
								let found = false;
								this.pageContainer.html.forEach( layout => {
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

	createPage(){
		if(this.pageId) 
		{ //if ids page exist... go search in DB
			this.pageFacade.getPageById(this.pageId,
				(error, response) => {
					if(!error){
						this.name = response.metaData.name;
						this.pageContainer = response;	
					} else {
						this.root.throwMessage(error.reason);					
					}
				}
			);
		} 
		else 
		{ //create a standard layout to be created
			this.pageContainer = this.pageFacade.createEmptyPage();				
		}
	}	

	addNewLayout(){
		this.pageContainer.html.push(this.layoutFacade.createEmptyLayout());
	}

	removeLayout(index){
		this.pageContainer.html.splice(index, 1);
	}

	handleEvents(){
		//handle layout saved event to assign new _id to the layout
		this.root.$on('layoutSaved', (event, args) => {
			this.pageContainer.html = this.pageContainer.html.map( (layout) => {
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