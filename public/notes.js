var notes = angular.module('notes', []);
notes.controller('NotesController', function($scope, $http) {

var basicUrl = 'http://localhost:3000';
var url = basicUrl + '/notes';
var update = function() {
  $http.get(url).then(function(notes) {
    console.log(notes);
    console.log($scope.sortBy);
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

$scope.remove = function(id) {
  $http.delete(url, {params : {id:id}}).success(function(){
    update();
  })
}

$scope.top = function(id) {
  console.log(id);
  $http.post(basicUrl + '/top',{id:id}).success(function() {
    update();
  });
}

  update()
})
