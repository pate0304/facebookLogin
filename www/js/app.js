// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ui.router', 'ngCordovaOauth', 'ngStorage'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {

		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})


.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})


	.state('app.home', {
		cache: false,
		url: '/home',
		views: {
			'menuContent': {
				templateUrl: 'templates/home.html',
			}
		}
	})

	.state('app.profile', {
		cache: false,
		url: '/profile',
		views: {
			'menuContent': {
				templateUrl: 'templates/profile.html',
				controller: 'ProfileController'
			}
		}
	});

	$urlRouterProvider.otherwise('/app/home');
});
