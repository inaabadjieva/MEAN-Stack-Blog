app.controller('PostsController', [
	'$scope', 
	'posts', 
	'auth',
	'PostsResolver',
	'alertService',
	function($scope, posts, auth, PostsResolver,alertService){
		$scope.posts = PostsResolver;
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.body = new String();
		$scope.newPost = function(){
			if($scope.title === ' ' || $scope.body === ' ') { return; }
			posts.create({
				title: $scope.title, 
				body: $scope.body,
			}).then(function(){
				$state.go('home');
				alertService.add("success", "Well done! You successfully added a new post.");
			});
			alertService.clear();
		};
	}
]);




