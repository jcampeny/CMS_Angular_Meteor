//CMS views
function config ($stateProvider){
	'ngInject';

	$stateProvider
	.state('auth', {
		url : '/login',
		template : '<auth></auth>',
		resolve : {
			currentUser($q){
				if (Meteor.userId() === null){
					return $q.resolve();
				} else {
					return $q.reject('LOGGED');
				}
			}
		}
	})
	.state('home', {
		url: '/',
		template: 
			'<header-options></header-options>'+
			'<navigation></navigation>'+
			'<div ui-view="" class="views-container"></div>'+
			'<css-manager></css-manager>'+
			'<popup></popup>',
		abstract: true,
		resolve : {
			currentUser($q){
				if(Meteor.userId() === null){
					return $q.reject('AUTH_REQUIRED');
				} else {
					return $q.resolve();
				}
			}
		}
	})
		.state('home.resume', {
			url : '',
			template : '<resume></resume>'
		})
		.state('home.pages', {
			url : 'pages',
			abstract: true,
			template : '<div ui-view=""></div>'
		})
			.state('home.pages.create', {
				url : '/create',
				template : '<page-creation></page-creation>'
			})
			.state('home.pages.edit', {
				url : '/:_id',
				template : '<page-creation></page-creation>'
			})
			.state('home.pages.display', {
				url : '',
				template : '<page-resume></page-resume>'
			})
		.state('home.section', {
			url : 'edit-sections',
			template : '<sections-edit></sections-edit>'
		})
		.state('home.layouts', {
			url : 'layouts',
			abstract: true,
			template : '<div ui-view=""></div>'
		})
			.state('home.layouts.create', {
				url : '/create',
				template : '<layout-creation></layout-creation>'
			})
			.state('home.layouts.edit', {
				url : '/:_id',
				template : '<layout-creation></layout-creation>'
			})
			.state('home.layouts.display', {
				url : '',
				template : '<layout-resume></layout-resume>'
			})
		.state('home.media', {
			url : 'media',
			template : '<media-section></media-section>'
		});
}

//AdminViewFacade's run
function run($rootScope, $state){
	'ngInject';

	$rootScope.$on('$stateChangeError',
		(event, data) => {
      		$state.go(data.redirect);
	  	}
	);
}

//Check if user can visit some view
function checkUser(userId, location){
	var promise = new Promise(function(resolve, reject){
		if (userId !== null && location === '/login')
			reject({reason: 'LOGGED', redirectTo: 'home.resume'});
		
		if (userId === null && location !== '/login')
			reject({reason: 'AUTH_REQUIRED', redirectTo: 'auth'});		
	});

	return promise;
}

//return constructor
function ViewController(){
	return {
		run : run,
		config : config,
		checkUser : checkUser
	}
}

export const viewController = new ViewController();



