app.factory('alertService', function($rootScope,$location, $anchorScroll,$timeout) {
    var alertService = {};

    $rootScope.alerts = [];

    alertService.add = function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});
      $location.hash('scrollToDivID');
      $anchorScroll();
      $timeout(function(){
        $rootScope.alerts = []
      }, 3000)
    };

    alertService.clear = function(){
        $rootScope.alerts = [];
    }

    return alertService;
  });