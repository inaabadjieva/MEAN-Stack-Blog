app.controller('AlertController', function (
	$scope, 
	$location,
	$anchorScroll, 
	AlertService ) {
	    $rootScope.changeView = function(view) {
	    $location.path(view);
	  	}
	  	$rootScope.closeAlert = alertService.closeAlert; 
});