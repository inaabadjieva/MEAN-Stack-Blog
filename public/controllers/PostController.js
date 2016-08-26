app.controller('PostsController', [
	'$scope', 
	'posts', 
	'auth',
	'PostsResolver',
	function($scope, posts, auth, PostsResolver){
		$scope.posts = PostsResolver;
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.newPost = function(){
			if($scope.title || $scope.body === ' ') { return; }
			posts.create({
				title: $scope.title, 
				body: $scope.body,
			})
			$scope.title = ' ';
			$scope.body = ' ';
		};		
	}
]);



