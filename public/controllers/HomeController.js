app.controller('HomeController', [
	'$scope', 
	'posts',
	'auth',
	'PostsResolver',
	function($scope, posts, auth,PostsResolver){
	$scope.posts = PostsResolver;
		console.log($scope.posts);
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.incrementUpvotes = function(post){
			posts.upvote(post);
		};
	}]);