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
	constructor(){}
	
	createElement(){
		var styleClass = 'G35245DF3R'; //generate class on CSS service
		const metaElement = {
			'<>': 'article', 
			type : name,
			class: styleClass, 
			flex : 100,
			html: {
				'<>' : 'img',
				src : '/img/pugs/pug-4.jpg',
				alt : 'Yes, another pug'
			}
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