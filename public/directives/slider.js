app.directive('slider', function() {
    var linker = function(scope, element, attr) {
    var selector = attr.sliderClassSelector;
    var watchSelector = attr.sliderRefreshOnWatch;
    
    scope.$watch(watchSelector, function() {
        $('.'+selector).responsiveSlides({
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