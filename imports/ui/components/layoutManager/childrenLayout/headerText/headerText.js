import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './headerText.html';

class HeaderText {
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);
	}
};

class HeaderTextService {
	constructor(cssManager){
		'ngInject';

		this.css = cssManager;
	}

	createElement()
	{
		const metaElement = {
			'<>': 'article', 
			type : name,
			class: this.css.generateClassId(), 
			flex : 100,
			html:"I'm a header from service!"
		};
		return metaElement;
	}
}
const name = 'headerText';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	bindings : {
		metaData : '='
	},
	controllerAs : name,
	controller : HeaderText
}).service(name, HeaderTextService);