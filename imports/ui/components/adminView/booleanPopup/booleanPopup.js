import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './booleanPopup.html';

/* 
	How to use it:

	booleanPopup.open(message, options, 
		(response) => {
			//...
		});
*/

class BooleanPopup{
	constructor($scope, $reactive, $state, booleanPopup){
		'ngInject';

		$reactive(this).attach($scope);

		this.service = booleanPopup;

		this.message = '';
		this.options = {
			yes : 'yes',
			no  : 'no'
		};
		this.callbackClose = {};

		this.service.onPopupCall(
			(message, options, callbackClose) => {
				this.message = message;
				this.options = options;
				this.open(callbackClose);
			});
	}

	open(callbackClose){
		$('#boolean-popup').addClass('active');
		this.callbackClose = callbackClose;
	}

	close(response = false){
		$('#boolean-popup').removeClass('active');
		this.callbackClose(response);
	}
}

class BooleanPopupService{
	constructor(){
		'ngInject';

		this.callbackOpen = {};
		this.onPopupCall = (callbackOpen) => {
			this.callbackOpen = callbackOpen;
		}
	}

	open(message, options, callbackClose){
		this.callbackOpen(message, options, callbackClose);
	}
}

const name = 'booleanPopup';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : BooleanPopup
}).service(name, BooleanPopupService);