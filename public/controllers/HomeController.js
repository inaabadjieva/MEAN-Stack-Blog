app.controller('HomeController', [
	'$scope', 
	'posts',
	'auth',
	'PostsResolver',
	function($scope, posts, auth,PostsResolver){
		$scope.posts = PostsResolver;
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.incrementUpvotes = function(post){
			posts.upvote(post);
		};
}]);

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