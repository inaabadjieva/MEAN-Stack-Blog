app.controller('SliderController', [
  '$scope', 
  'posts', 
    function SliderController($scope, posts){

    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active=0;
    $scope.slides = [
        {
          image: 'assets/images/5.jpg'
        },
        {
          image: 'assets/images/6.jpg'
        },
    ];
}]);
