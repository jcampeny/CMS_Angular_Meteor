import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './childrenLayout.html';

import { name as PlainText } from './plainText/plainText';
import { name as HeaderText } from './headerText/headerText';
import { name as MediaContainer } from './mediaContainer/mediaContainer';


class ChildrenLayout {};

class ChildrenLayoutService {
	constructor(plainText, headerText, mediaContainer){
		'ngInject';

		this.plainText = plainText;
		this.headerText = headerText;
		this.mediaContainer = mediaContainer;
	}

	createElement (type, callback) {
		const newElement = this[type].createElement();
		callback(newElement);
	}
};

const name = 'childrenLayout';

export default angular.module(name, [
	angularMeteor,
	PlainText,
	HeaderText,
	MediaContainer
]).component(name, {
	template,
	bindings : {
		metaData : '='
	},
	controllerAs : name,
	controller : ChildrenLayout
}).service(name, ChildrenLayoutService);