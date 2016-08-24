app.controller('AuthController', [
	'$scope', 
	'$state',
	'auth',
	'alertService',
	'$timeout',
	function ($scope, $state, auth,alertService, $timeout) {
		$scope.user = {
			fullname : "Ina Abadjieva",
			email : "ina_abadjieva@yahoo.com",
			username : "ina22",
			password : "test",
			confirmPassword : "test"
		};
		$scope.register = function(){
			auth.register($scope.user).error(function(error){
				alertService.add(error.type,error.message);			
			}).then(function(){		

				auth.logIn($scope.user)	;				
				$state.go('home');
				alertService.add("success", "Well done! You successfully registered.");
			});
			alertService.clear();
		};

		$scope.logIn = function(){
			auth.logIn($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
				alertService.add("success", "Well done! You successfully signed in.");
			});
			alertService.clear();
		};
	}
]);