export class CssManagerService{
	constructor($rootScope){
		'ngInject';
		this.root = $rootScope;
	}

	generateClassId(){
	    var text = "";
	    const possible = "abcdefghijklmnopqrstuvwxyz_-";
	    const length = 8;

	    for( let i = 0; i < length; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	openCssEditor(event, layout, childrenLayout){
		this.root.$emit('openCssEditor', {
			layout,
			childrenLayout	
		});
	}
}
