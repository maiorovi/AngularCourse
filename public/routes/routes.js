var module = angular.module('notes', ['dndLists', 'ngRoute']);


module.config(
 function($routeProvider) {
 $routeProvider.
 when('/', {
 templateUrl: 'routes/notes/notes.html',
 controller: 'NotesController'
 }).when('/section/:name', {
 templateUrl: 'routes/viewSection/viewSection.html',
 controller: 'ViewSectionController'
 }).otherwise({
  redirectTo: '/'
 }
 )
 });
