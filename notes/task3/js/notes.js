var notes = angular.module('notes', []);
notes.controller('NotesController', function($scope, $http){
  $scope.notes = [
 {text: "First note"},
 {text: "Second note"},
 {text: "Third note"}
];

  // update()
})


var update = function() {
  $http.get("/notes").success(function(notes) {
    $scope.notes = notes;
  })
}
