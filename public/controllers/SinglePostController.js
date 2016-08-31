app.controller('SinglePostController', function(
	$scope, 
	posts, 
	post, 
	auth, 
	alertService, 
	$uibModal, 
	$log, 
	$window, 
	$state,
	$sce
	){
		$scope.post = post;
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser();
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

		$scope.incrementUpvotes = function(post){
			posts.upvote(post);
		};

		$scope.showBtn = function(){
			if(post.author.username === $scope.currentUser){
				return true;
			}
			return false;
		};

		$scope.openDeleteModal = function () {
		    var modalInstance = $uibModal.open({
		      animation: true,
		      ariaLabelledBy: 'modal-title',
		      templateUrl: 'views/deleteModal.html',
		      controller: 'DeleteModalCtrl',
		      controllerAs: '$ctrl',
		      size: 'lg',
		    });

		    modalInstance.result.then(function () {
		    	posts.delete(post).then(function(){
					$state.go('posts');
					alertService.add("success", "Well done! You successfully deleted your post.");
				});
		    alertService.clear();
		    });
	 	};

	  	$scope.openCommentModal = function (refObject,refId) {
		    var modalInstance = $uibModal.open({
		      animation: true,
		      ariaLabelledBy: 'modal-title',
		      ariaDescribedBy: 'modal-body',
		      templateUrl: 'views/commentModal.html',
		      controller: 'CommentModalCtrl',
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
	 });

app.controller('DeleteModalCtrl', function ($uibModalInstance) {
  var $ctrl = this;
 	
  $ctrl.delete = function () {
 		$uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('CommentModalCtrl', function ($uibModalInstance, refObject,refId,isLoggedIn,posts) {
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