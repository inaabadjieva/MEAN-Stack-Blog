app.controller('SinglePostController', [
	'$scope', 
	'posts',
	'post',
	'auth',
	function($scope, posts, post, auth){
		$scope.post = post;
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.addComment = function(){
			console.log($scope.comment)
			if( $scope.body === ' ') { return; }
			posts.addComment(post._id, {
				body: $scope.comment.body,
			}).then(function(comment) {
				$scope.post.comments.push(comment.data);
			});
			$scope.body = ' ';
		};
		// $scope.incrementUpvotes = function(comment){
		// 	posts.upvoteComment(post, comment);
		// };
	}
]);