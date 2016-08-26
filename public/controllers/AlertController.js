app.controller('AlertController', [
  '$rootScope', 
   '$location', 
  '$anchorScroll',
  'AlertService',
  function ($scope, $location,$anchorScroll, AlertService ) {
    $rootScope.changeView = function(view) {
    $location.path(view);
  	}
  	$rootScope.closeAlert = alertService.closeAlert; 
}
]);