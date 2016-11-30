var module = angular.module('notes', ['dndLists', 'ngRoute']);


module.config(
 function($routeProvider) {
 $routeProvider.
 when('/', {
 templateUrl: 'routes/notes/notes.html',
 controller: 'NotesController'
 }).
otherwise({
  redirectTo: '/'
 }
 )
 });
