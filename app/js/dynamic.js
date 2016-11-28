var phonecatApp = angular.module('phonecatApp', []);


phonecatApp.controller('PhoneListController', function ($scope) {
  $scope.phones = [
    {
     name: 'Nexus S',
     snippet: 'Fast just got faster with Nexus S.'
   }, {
     name: 'Motorola XOOM™ with Wi-Fi',
     snippet: 'The Next, Next Generation tablet.'
   }, {
     name: 'MOTOROLA XOOM™',
     snippet: 'The Next, Next Generation tablet.'
   },  {
     name:'Samsung Galaxy 7',
     snippet: 'This is very cool phone.'
   }
  ]
});
