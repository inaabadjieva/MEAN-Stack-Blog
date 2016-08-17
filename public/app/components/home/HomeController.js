app.controller('MainController', [
	'$scope', 
	'posts',
	'auth',
	function($scope, posts,auth){
		$scope.posts = posts.posts;
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.incrementUpvotes = function(post){
			posts.upvote(post);
		};
	}]);