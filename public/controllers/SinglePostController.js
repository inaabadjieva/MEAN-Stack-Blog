app.controller('SinglePostController', 
	function($scope, posts, post, auth,$uibModal, $log){
		$scope.post = post;
		$scope.isLoggedIn = auth.isLoggedIn;
	
		// $scope.incrementUpvotes = function(comment){
		// 	posts.upvoteComment(post, comment);
		// };
	

  	$scope.animationsEnabled = true;

  	$scope.open = function (refObject,refId) {
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
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
 	};
 });

app.controller('ModalInstanceCtrl', function ($uibModalInstance, refObject,refId,isLoggedIn,posts) {
  var $ctrl = this;
  $ctrl.isLoggedIn = isLoggedIn;
 	
  $ctrl.ok = function () {
  		
  		var newComment = {
  			body : $ctrl.comment.body,
  		}
  		 if (refObject == 'post') { 
  		 	newComment.post = refId;
  		 }
  		 if (refObject == 'comment') { 
  		 	newComment.comment= refId;
  		 }
 

		posts.addComment(newComment).then(function(comment) {
			//$scope.post.comments.push(comment.data);
		});
		// $scope.body = ' ';

 		$uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});