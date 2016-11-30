var notes = angular.module('notes');
notes.controller('NotesController', function($scope, $http) {

var basicUrl = 'http://localhost:3000';
var url = basicUrl + '/notes';
var update = function() {
  if ($scope.activeSection == null && $scope.sections.length>0) {
    $scope.activeSection = $scope.sections[0].title;
  }
  var params = {params: {section : $scope.activeSection}}
  $http.get(url, params).then(function(notes) {
    console.log(notes);

    $scope.notes = notes.data;
  }, function(resp) {
    console.log(resp)
    $scope.notes = resp;
  })
}

$scope.add = function() {
  if (!$scope.text || $scope.text.length==0) return;

    $http.post(url, {text: $scope.text, section :$scope.activeSection }).success(function(){
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

var readSections = function() {
  $http.get('/sections').then(function(sections) {
    console.log(sections);
    $scope.sections = sections.data;
    update();
  }, function(err){
    console.log(err)
  })
}

$scope.showSection = function(section) {
  $scope.activeSection = section.title;
  update();
}

$scope.addSection = function() {
  if ($scope.newSection.length==0) return;
// check for duplicates
  for (var i=0;i<$scope.sections.length;i++) {
    if ($scope.sections[i].title==$scope.newSection) {
      return;
    }
  }
  var section = {title: $scope.newSection};
  $scope.sections.unshift(section);
  $scope.activeSection = $scope.newSection;
  $scope.newSection = "";
  $scope.writeSections();
  update();
}

$scope.writeSections = function() {
 if ($scope.sections && $scope.sections.length>0) {
   $http.post("/sections/replace", $scope.sections);
 }
};

  readSections();
})
