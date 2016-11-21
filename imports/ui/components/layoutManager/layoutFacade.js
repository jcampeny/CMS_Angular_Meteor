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
	constructor($rootScope, $reactive, popup, cssManager){
		'ngInject';

		//attach to $rootScope to digest after Meteor call
		$reactive(this).attach($rootScope);

		this.popup = popup;
		this.css   = cssManager;
	}

	deleteLayout(layout, callback) {
		const message = 'Do you want to delete ' + layout.metaData.name + ' layout?';
		const options = {
			yes : 'Delete',
			no : 'Cancel'
		};

		this.popup.open(message, options, 
			(response) => {
				if(response === true){
					this.call('removeLayout', layout._id, 
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
			this.call('insertLayout', layout,
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
			this.call('updateLayout', layout,
				(error, response) => {
					if(typeof callback == 'function')
						callback(error, response);
					
				}
			);
		}

	}

	getLayoutById(layoutId, callback) {
		this.call('getLayout', layoutId, 
			(error, response)=>{
				if(typeof callback == 'function')
					callback(error, response);
			}
		);
	}

	createEmptyLayout() {
		return {
			'<>'     : 'section',
			class    : this.css.generateClassId(),
			layout   : 'row',
			html   	 : [],
			metaData : {
				name   : 'Layout name',
				owner  : Meteor.userId(),
				public : false
			}
		};
	}

	parseLayout(layout){
		this.call('layoutParser', layout,
			(error, response) => {
				//console.log(response);
			});
	}

	throwMessage(message, options = {yes : 'Okay'}, callback){
		this.popup.open(message, options, callback);
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