angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $state, $timeout, $cordovaOauth, $location, $localStorage) {
	$localStorage = $localStorage.$default({
		accessToken: String
	});

	// Form data for the login modal
	$scope.loginData = {};
	$scope.timeInterval = 50;
	$scope.isFetched = false;
	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope,
		backdropClickToClose: false

	}).then(function (modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.modal.show();
		$state.reload();
	};

	$scope.logout = function () {
		//localStorage.removeItem("access_token");
		delete $localStorage.accessToken;


		userName = document.getElementById("name");
		logOutBtn = document.getElementById("logoutBtn");
		userName.innerHTML = "";
		logOutBtn.style.visibility = "hidden"

		$scope.login();
	};

	$scope.facebookLogin = function () {
		$cordovaOauth.facebook(1189246801168939, ["email"]).then(function (result) {
			// results
			$localStorage.accessToken = result.access_token;
			$scope.isFetched = true;
			console.log("access token is " + $localStorage.accessToken);

			$state.reload();
		}, function (error) {
			// error
			console.log(error.message);
		});
	}


})

.controller('ProfileController', function ($scope, $state, $http, $localStorage, $location) {


	$http.get("https://graph.facebook.com/v2.8/me", {
		params: {
			access_token: $localStorage.accessToken,
			fields: "name",
			format: "json"
		}
	}).then(function (result) {
			console.log('my result', JSON.stringify(result));
			$scope.profileName = result.data.name;

		},
		function (error) {

			console.log('error', JSON.stringify(error));
		});


	//  };
	console.log("Fetching data as token is there");




});
