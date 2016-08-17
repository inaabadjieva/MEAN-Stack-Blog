app.controller('PostsController', [
	'$scope', 
	'posts', 
	'auth',
	function($scope, posts,auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		console.log($scope.isLoggedIn());

		$scope.newPost = function(){
			if(!$scope.title || $scope.body === ' ') { return; }
			posts.create({
				title: $scope.title, 
				body: $scope.body,
			})
			$scope.title = ' ';
			$scope.body = ' ';
		};	
		// $scope.addComment = function(){
		// 	if($scope.body === ' ') { return; }
		// 	posts.addComment(post._id, {
		// 		body: $scope.body,
		// 		author: 'user',
		// 	}).success(function(comment) {
		// 		$scope.post.comments.push(comment);
		// 	});
		// 	$scope.body = ' ';
		// };
		// $scope.incrementUpvotes = function(comment){
		// 	posts.upvoteComment(post, comment);
		// };
	}
]);



