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

	createChildren (type, callback) {
		const newChildren = this[type].create();
		callback(newChildren);
	}
};

const name = 'childrenLayout';

export default angular.module(name, [
	angularMeteor,
	'textAngular',
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
}).service(name, ChildrenLayoutService)
.config(config);

function config($provide){//textAngular configuration
	'ngInject';
	$provide.decorator('taOptions', ['taRegisterTool', '$delegate', 
		(taRegisterTool, taOptions) => { // $delegate is the taOptions we are decorating
	        taOptions.toolbar = [
	            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
	            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
	            ['html', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
	        ];
	        return taOptions;
    	}
    ]);
}






