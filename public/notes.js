var notes = angular.module('notes', []);
notes.controller('NotesController', function($scope, $http) {

var basicUrl = 'http://localhost:3000';
var url = basicUrl + '/notes';
var update = function() {
  $http.get(url).then(function(notes) {
    $scope.notes = notes.data;
  }, function(resp) {
    console.log(resp)
    $scope.notes = resp;
  })
}

$scope.add = function() {
    $http.post(url, {text : $scope.text}).success(function(){
      $scope.text = "";
      update();
    })
}

  update()
})
