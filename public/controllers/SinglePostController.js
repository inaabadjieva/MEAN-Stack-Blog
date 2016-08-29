app.controller('SinglePostController', [
	'$scope', 
	'posts', 
	'post',
	'auth',
	'alertService',
	'$uibModal',
	'$log',
	'$window',
	'$state',
	function($scope, posts, post, auth, alertService, $uibModal, $log, $window, $state){
		$scope.post = post;
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.title = post.title;
		$scope.body = post.body;

		$scope.editPost = function(){
			if($scope.title === ' ' || $scope.body === ' ') { return; }
			post.title = $scope.title;
			post.body = $scope.body;
			posts.edit(post).then(function(){
				$state.go('post', {id: post._id});
				alertService.add("success", "Well done! You successfully edited your post.");
			});
			alertService.clear();
		};

		$scope.deletePost = function(){
			posts.delete(post).then(function(){
				$state.go('posts');
				alertService.add("success", "Well done! You successfully deleted your post.");
			});
			alertService.clear();
		};

	// $scope.incrementUpvotes = function(comment){
	// 	posts.upvoteComment(post, comment);
	// };

  	$scope.openModal = function (refObject,refId) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'views/new-comment.html',
	      controller: 'ModalInstanceCtrl',
	      controllerAs: '$ctrl',
	      size: 'lg',
	      resolve: {
	        refObject: function () {
	          return refObject;
	        },
	        refId : function(){
	        	return refId
	        },
	        isLoggedIn : function(){
	        	return	$scope.isLoggedIn;
	        },
	        posts : function(){
	        	return posts;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	      $window.location.reload();
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
 	};
 }]);

app.controller('ModalInstanceCtrl', function ($uibModalInstance, refObject,refId,isLoggedIn,posts) {
  var $ctrl = this;
  $ctrl.isLoggedIn = isLoggedIn;
 	
  $ctrl.ok = function () {
  		var newComment = {
  			body: $ctrl.comment.body,
  		}
  		 if (refObject == 'post') { 
  		 	newComment.post = refId;
  		 }
  		 if (refObject == 'comment') { 
  		 	newComment.comment= refId;
  		 }
 
		posts.addComment(newComment).then(function(comment) {
		});

 		$uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});