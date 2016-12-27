import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './mediaContainer.html';

class MediaContainer {
	constructor($scope, $reactive){
		'ngInject';

		$reactive(this).attach($scope);
	}
};

class MediaContainerService {
	constructor(cssManager){
		'ngInject';

		this.css = cssManager;
	}
	
	create()
	{
		const metaElement = {
			'<>': 'article', 
			type : name,
			class: this.css.generateClassId(), 
			flex : 100,
			'flex-xs' : 100, //responsive
			html: [{
				'<>' : 'img',
				src : '/img/pugs/pug-' + (Math.floor(Math.random()*8)+1) +'.jpg',
				alt : 'Yes, another pug'
			}]
		};

		return metaElement;
	}
}
const name = 'mediaContainer';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	bindings : {
		metaData : '='
	},
	controllerAs : name,
	controller : MediaContainer
}).service(name, MediaContainerService);