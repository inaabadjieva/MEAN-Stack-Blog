app.controller('PostController', [
	'$scope', 
	'posts', 
	'auth',
	'PostsResolver',
	'alertService',
	'$state',
	function($scope, posts, auth, PostsResolver,alertService,$state){
		$scope.posts = PostsResolver;
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.body = new String();
		$scope.newPost = function(){
			if($scope.title === ' ' || $scope.body === ' ') { return; }
			posts.create({
				title: $scope.title, 
				body: $scope.body,
			}).then(function(){
				$state.go('home');
				alertService.add("success", "Well done! You successfully added a new post.");
			});
			alertService.clear();
		};
	}
]);

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



