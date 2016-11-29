angular.module("myapp", [])
.controller("HelloController", function($scope, $http, $interval) {
  $scope.greeting = "";
  //       Perform live update of data from the server. For this, introduce
  // timer and use $interval service to periodically retrieve updated
  // value from the server without need to press Update button:
      // possible solution
      // $interval(update, 2000)

      //  alternate solution
  $scope.$watch('name', function() {
    update();
  })

  $scope.update = function() {
      if ($scope.name) {
        update();
      }


  }

  var update = function() {
    $http({
      method: 'GET',
      url: '/greeting?name=' + $scope.name
      })
    .then(function(res) {
      $scope.greeting = res.data;
    }, function(res) {
      $scope.greeting = res;
    })
  }
})
