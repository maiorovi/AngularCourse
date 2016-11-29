var scopesApp = angular.module('scopes-app', []);

scopesApp.controller('Controller1', function($scope){
  $scope.theVar = "First Value"
})


scopesApp.controller('Controller2', function($scope){
  $scope.theVar = "Second Value"
})
