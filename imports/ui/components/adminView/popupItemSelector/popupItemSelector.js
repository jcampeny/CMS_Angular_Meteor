import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './popupItemSelector.html';

/* 
	How to use it:

	popupItemSelector.open(message, items, 
		(items, cancelled) => {
			//...
		});
*/

class PopupItemSelector{
	constructor($scope, $reactive, $state, popupItemSelector){
		'ngInject';

		$reactive(this).attach($scope);

		this.service = popupItemSelector;

		this.message = '';
		this.items = [];
		this.itemsSelected = [];
		this.callbackClose = {};

		this.perPage = 5;
		this.page = 0;

		this.service.onPopupCall(
			(message, items, callbackClose) => {
				//resets value when other items are displayed
				//if (!angular.equals(this.items, items)) 
					this.itemsSelected = [];

				this.message 	   = message;
				this.items 	       = items;
				this.callbackClose = callbackClose;
				this.page 		   = 0;
				this.open();
			}
		);
	}

	open(){
		$('#popup-item-selector').addClass('active');
	}

	close(itemsSelected = this.itemsSelected, cancelled = false){
		$('#popup-item-selector').removeClass('active');

		if (typeof this.callbackClose === 'function')
			this.callbackClose(itemsSelected.map(layout => layout), cancelled);
	}

	changePage(direction){ 
		if (direction > 0) {//next
			this.page = ((this.page + 1)*this.perPage >= this.items.length) ? this.page : (this.page + 1);
		} else {
			this.page = (this.page <= 0) ? 0 : (this.page - 1);
		}
	}

	selectItem(layout){
		let index = this.itemsSelected.indexOf(layout);

		if(index < 0){ //not found
			this.itemsSelected.push(layout);
		} else {
			this.itemsSelected.splice(index, 1);
		}
	}
}

class PopupItemSelectorService{
	constructor(){
		'ngInject';

		this.callbackOpen = {};
		this.onPopupCall = (callbackOpen) => {
			this.callbackOpen = callbackOpen;
		}
	}

	open(message, items, callbackClose){
		this.callbackOpen(message, items, callbackClose);
	}
}

const name = 'popupItemSelector';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	controllerAs : name,
	controller : PopupItemSelector
}).filter('startFrom', () => {
	return (input, start) => {
		start = +start;
		return input.slice(start);
	}
}).filter('roundUp', () => {
	return input => Math.ceil(input);
}).service(name, PopupItemSelectorService);





