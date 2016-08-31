app.factory('alertService', function($rootScope,$location, $anchorScroll,$timeout) {
    var alertService = {};

    $rootScope.alerts = [];

    alertService.add = function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});
      $location.hash('scrollToDivID');
      $anchorScroll();
      if(type === 'success'){
        $timeout(function(){
        $rootScope.alerts = []
        }, 3000)
      }  
    };

    $rootScope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };

    alertService.clear = function(){
      $rootScope.alerts = [];
    }

    return alertService;
  });