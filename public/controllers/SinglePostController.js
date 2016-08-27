app.controller('SinglePostController', 
	function($scope, posts, post, auth,$uibModal, $log){
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
	
  	$scope.items = ['item1', 'item2', 'item3'];

  	$scope.animationsEnabled = true;

  	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'views/new-comment.html',
	      controller: 'ModalInstanceCtrl',
	      controllerAs: '$ctrl',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        },
	        isLoggedIn : function(){
	        	return	$scope.isLoggedIn;
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

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items,isLoggedIn) {
  var $ctrl = this;
  $ctrl.isLoggedIn = isLoggedIn;
 
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});