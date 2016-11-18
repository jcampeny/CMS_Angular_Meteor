import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './plainText.html';

class PlainText {
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);
	}
};

class PlainTextService {
	constructor(){}
	
	createElement(){
		var styleClass = 'G35245DF3R'; //generate class on CSS service
		const metaElement = {
			'<>': 'article', 
			type : name,
			class: styleClass, 
			flex : 100,
			html:'Hello from service!'
		};
		return metaElement;
	}
}
const name = 'plainText';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	bindings : {
		metaData : '='
	},
	controllerAs : name,
	controller : PlainText
}).service(name, PlainTextService);