import json2html from 'node-json2html';

const clean = {
	html(page){
		const toClean = ['_id', 'metaData', 'styles'];
		
		toClean.forEach(cleanAttr => {
			delete page[cleanAttr];
		});

		if (page.html && page.html.length > 0 && Array.isArray(page.html))
			page.html = page.html.map( pageItem => this.html(pageItem));

		return page;
	}
}

function html (state) {
	//delete _id, metadata, styles
	const content = json2html.transform([{}], clean.html(state.page)); 
	const vars = {
		content,
		lang : state.lang || 'en',
		title : state.name
	};  

	return `<!DOCTYPE html>
<html lang="${vars.lang}">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Angular Material style sheet -->
	<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
	<title>${vars.title}</title>
</head>
<body ng-app="BlankApp" ng-cloak>
	${vars.content}

	<!-- Angular Material requires Angular.js Libraries -->
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>

	<!-- Angular Material Library -->
	<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
	
	<!-- Your application bootstrap  -->
	<script type="text/javascript"> angular.module('BlankApp', ['ngMaterial']); </script>
</body>
</html>`;
};

export const templates = {
	html
};