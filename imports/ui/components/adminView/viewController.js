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
		template: '<nav-header></nav-header> <div ui-view=""></div>',
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
	});
}

function run($rootScope, $state){
	'ngInject';

	$rootScope.$on('$stateChangeError',
		(event, data) => {
      		$state.go(data.redirect);
	  	}
	);
}

function checkUser(userId, location){
	var promise = new Promise(function(resolve, reject){
		if (userId !== null && location === '/login')
			reject({reason: 'LOGGED', redirectTo: 'home.resume'});
		
		if (userId === null && location !== '/login')
			reject({reason: 'LOGGED', redirectTo: 'home.resume'});		
	});

	return promise;
}

function ViewController(){
	return {
		run : run,
		config : config,
		checkUser : checkUser
	}
}

export const viewController = new ViewController();


