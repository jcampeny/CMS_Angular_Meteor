import json2html from 'node-json2html';
import { parseJsonToCssSyntax } from '../utils/functions';

const clean = {
	html(page){
		const toClean = ['_id', 'metaData', 'styles'];
		
		toClean.forEach(cleanAttr => {
			delete page[cleanAttr];
		});

		if (page.html && page.html.length > 0 && Array.isArray(page.html))
			page.html = page.html.map( pageItem => this.html(pageItem));

		return page;
	},
}

function srcToRelative(page, basePath){
	if (page['<>'] === 'img')
		page.src = basePath + page.src;

	if (Array.isArray(page.html) && page.html.length > 0){
		page.html.forEach( html => {
			if (Array.isArray(page.html) && page.html.length > 0)
				html = srcToRelative(html, basePath);
		});		
	}

	return page; 
}

function html (state, headerLayout) {
	const basePath = state.name.slice(0, -1).split('/').map(a => '..').join('/');
	//delete _id, metadata, styles
	const content       = clean.html(Object.assign({}, srcToRelative(state.page, basePath)));
	const contentParsed = json2html.transform([{}], content); 
	const header        = json2html.transform([{}], headerLayout); 
	const vars = {
		contentParsed,
		header,
		lang : state.lang || 'en',
		title : state.name.slice(0, -1).split('/').pop(),
	};  

	return `<!DOCTYPE html>
<html lang="${vars.lang}">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Angular Material style sheet -->
	<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
	<link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
	<link rel="stylesheet" href="${basePath}/generic.css" />
	<link rel="stylesheet" href="styles.css" />
	<title>${vars.title}</title>
</head>
<body ng-app="BlankApp" ng-cloak>
	${vars.header}
	${vars.contentParsed}
	<footer>im footer</footer>
	<!-- jQuery -->
	<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
	<!-- Angular Material requires Angular.js Libraries -->
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>

	<!-- Angular Material Library -->
	<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
	
	<!-- Your application bootstrap  -->
	<script type="text/javascript"> angular.module('BlankApp', ['ngMaterial']); </script>
	<script type="text/javascript" src="${basePath}/scripts.js"></script>
</body>
</html>`;
};

function css (state) {
	//TODO
	return parseJsonToCssSyntax(state.page.styles, state.page.class);
}

export const templates = {
	html,
	css
};