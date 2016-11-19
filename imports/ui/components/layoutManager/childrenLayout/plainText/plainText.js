import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './plainText.html';

class PlainText {
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);

		this.lockTextEditor = true;
	}
};

class PlainTextService {
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
			html:'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet provident qui dolorum. Ab optio reprehenderit vel, eveniet aut cum alias, natus, sed quasi dicta illum ducimus, itaque recusandae. Sunt, soluta.</p>'
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