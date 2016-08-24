app.controller('PostsController', [
	'$scope', 
	'posts', 
	'auth',
	'PostsResolver',
	function($scope, posts, auth, PostsResolver){
		$scope.posts = PostsResolver;
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.newPost = function(){
			if(!$scope.title || $scope.body === ' ') { return; }
			posts.create({
				title: $scope.title, 
				body: $scope.body,
				//author: 'user',
			})
			$scope.title = ' ';
			$scope.body = ' ';
		};	
		
		$scope.addComment = function(){
			if($scope.body === ' ') { return; }
			posts.addComment(post._id, {
				body: $scope.body,
				author: 'user',
			}).success(function(comment) {
				$scope.post.comments.push(comment);
			});
			$scope.body = ' ';
		};
		$scope.incrementUpvotes = function(comment){
			posts.upvoteComment(post, comment);
		};
	}
]);



