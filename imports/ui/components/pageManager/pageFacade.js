import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import { name as PageResume } from './pageResume/pageResume';
import { name as PageCreation } from './pageCreation/pageCreation';
import { name as PageEditor } from './pageEditor/pageEditor';

import { Pages } from '../../../api/pages';

class PageFacade {};

class PageFacadeService {
	constructor($rootScope, $reactive, $rootScope, popup, popupItemSelector, cssManager){
		'ngInject';

		//attach to $rootScope to digest after Meteor call
		$reactive(this).attach($rootScope);

		this.popupItemSelector = popupItemSelector;
		this.popup 			   = popup;
		this.css  			   = cssManager;
		this.root 	 		   = $rootScope;

		this.subscribe('pages');

		this.helpers({
			pages(){
				return Pages.find({});
			}
		})
	}

	deletePage(page, callback) {
		const message = 'Do you want to delete ' + page.metaData.name + ' page?';
		const options = {
			yes : 'Delete',
			no : 'Cancel'
		};

		this.popup.open(message, options, 
			(response) => {
				if(response === true){
					this.call('removePage', page._id, 
						(error, response) => {
							if(typeof callback == 'function')
								callback(error, response);
						}
					);
				}
			}
		);
	}

	save(page, callback){
		const msg = 'Do you want to save this page?';
		const options = {yes : 'Accept', no: 'Cancel'};

		this.popup.open(msg, options, 
			(response) => {
				if(response){
					if(!page._id){
						this.call('insertPage', page,
							(error, response) => {
								if(typeof callback == 'function')
									callback(error, response);
							}
						);
					}  else {
						this.update(page, callback);
					}					
				}

			}
		);
	}

	update(page, callback){
		if(page && page._id){
			this.call('updatePage', page,
				(error, response) => {
					if(typeof callback == 'function')
						callback(error, response);
					
				}
			);
		}
	}

	getPageById(pageId, callback) {
		this.call('getPage', pageId, 
			(error, response)=>{
				if(typeof callback == 'function')
					callback(error, response);
			}
		);
	}

	createEmptyPage() {
		return {
			'<>'          : 'main',
			class         : this.css.generateClassId(),
			layout        : 'row',
			'layout-wrap' : '',
			html   	      : [],
			metaData      : {
				name   : 'Page name',
				owner  : Meteor.userId(),
				public : false
			}
		};
	}
};

const name = 'pageFacade';

export default angular.module(name, [
	angularMeteor,
	PageResume,
	PageCreation,
	PageEditor
]).component(name, {
	controllerAs : name,
	controller : PageFacade
}).service(name, PageFacadeService);