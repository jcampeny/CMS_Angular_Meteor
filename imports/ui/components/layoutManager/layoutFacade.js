import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import { name as LayoutResume } from './layoutResume/layoutResume';
import { name as LayoutCreation } from './layoutCreation/layoutCreation';
import { name as LayoutEditor } from './layoutEditor/layoutEditor';

import { name as ChildrenLayout } from './childrenLayout/childrenLayout';
import { name as CssManager } from './cssManager/cssManager';

class LayoutFacade {};

class LayoutFacadeService {
	constructor(booleanPopup){
		'ngInject';

		this.booleanPopup = booleanPopup;
	}

	deleteLayout(layout, callback) {
		const message = 'Do you want to delete ' + layout.metaData.name + ' layout?';
		const options = {
			yes : 'Delete',
			no : 'Cancel'
		};

		this.booleanPopup.open(message, options, 
			(response) => {
				if(response === true){
					Meteor.call('removeLayout', layout._id, 
						(error, response) => {
							if(typeof callback == 'function')
								callback(error, response);
						}
					);
				}
			}
		);
	}

	save(layout, callback){
		if(!layout._id){
			Meteor.call('insertLayout', layout,
				(error, response) => {
					if(typeof callback == 'function')
						callback(error, response);
				}
			);
		}  else {
			this.update(layout, callback);
		}	
	}

	update(layout, callback){
		if(layout && layout._id){
			Meteor.call('updateLayout', layout,
				(error, response) => {
					if(typeof callback == 'function')
						callback(error, response);
					
				}
			);
		}

	}

	parseLayout(layout){
		Meteor.call('layoutParser', layout,
			(error, response) => {
				//console.log(response);
			});
	}
}

const name = 'layoutFacade';

export default angular.module(name, [
	angularMeteor,
	LayoutResume,
	LayoutCreation,
	LayoutEditor,
	ChildrenLayout,
	CssManager
]).component(name, {
	controllerAs : name,
	controller : LayoutFacade
}).service(name, LayoutFacadeService);