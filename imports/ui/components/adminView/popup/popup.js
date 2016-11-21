import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './popup.html';

/* 
	How to use it:

	popup.open(message, options, 
		(response) => {
			//...
		});
*/

class Popup{
	constructor($scope, $reactive, $state, popup){
		'ngInject';

		$reactive(this).attach($scope);

		this.service = popup;

		this.message = '';
		this.options = {
			yes : '',
			no  : ''
		};
		this.callbackClose = {};

		this.service.onPopupCall(
			(message, options, callbackClose) => {
				this.message 	   = message;
				this.options 	   = options;
				this.callbackClose = callbackClose;
				this.open();
			}
		);
	}

	open(){
		$('#popup').addClass('active');
	}

	close(response = false, message = ''){
		$('#popup').removeClass('active');

		if (typeof this.callbackClose === 'function')
			this.callbackClose(response, message);
	}
}

class PopupService{
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

const name = 'popup';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : Popup
}).service(name, PopupService);