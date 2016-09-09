app.controller('PostController', function(
	$scope, 
	posts, 
	auth, 
	PostsResolver,
	alertService,$state, 
	$sce
	){
		$scope.posts = PostsResolver;
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.body = new String();

		$scope.viewby = 5;
		$scope.totalItems = $scope.posts.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
		$scope.maxSize = 5; 

		//Pagination
		 $scope.setPage = function (pageNo) {
		    $scope.currentPage = pageNo;
		  };

		  $scope.pageChanged = function() {
		    console.log('Page changed to: ' + $scope.currentPage);
		  };

		$scope.setItemsPerPage = function(num) {
		  $scope.itemsPerPage = num;
		  $scope.currentPage = 1; 
		}
 		//End Pagination 

		$scope.newPost = function(){
			if($scope.title === ' ' || $scope.body === ' ') { return; }
			posts.create({
				title: $scope.title, 
				body: $scope.body,
				banner: $scope.banner,
			}).then(function(){
				$state.go('home');
				alertService.add("success", "Well done! You successfully added a new post.");
			});
			alertService.clear();
		};
	}
);

app.filter('limitHtml', function() {
   return function(text, limit) {

       var changedString = String(text).replace(/<[^>]+>/gm, '');
       var length = changedString.length;
       var suffix = '...';

       return length > limit ? changedString.substr(0, limit - 1) + suffix : changedString;
   }
});

app.directive('slider',function() {
    var linker = function(scope, element, attr) {
        scope.$watch('photos', function () {
        $(".rslides").responsiveSlides({
         	auto: true,
	      	nav: true,
	      	speed: 500,
	        namespace: "callbacks",
	        pager: true,
        });
      });      
    };
    return {
        restrict: "A",
        link: linker
    }
});

// app.directive('slider', function() {
//     var linker = function(scope, element, attr) {

//     var selector = attr.sliderClassSelector;
//     var watchSelector = attr.sliderRefreshOnWatch;

//   scope.$watch(watchSelector, function() {
//         $('.'+selector).responsiveSlides({
//          	auto: true,
// 	      	nav: true,
// 	      	speed: 500,
// 	        namespace: "callbacks",
// 	        pager: true,
//         });
//       });      
//   };

//   return {
//     restrict: "A",
//     link: linker
//   }
// });



