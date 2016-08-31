app.controller('AuthController', function (
	$scope, 
	$state, 
	auth,
	alertService, 
	$timeout) {
		$scope.user = {};
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
				alertService.add("danger", "Wrong credentials! Please try again.");
			}).then(function(res){
				$state.go('home');
				alertService.add("success", "Well done! You successfully signed in.");
			});
			alertService.clear();
		};
	}
);