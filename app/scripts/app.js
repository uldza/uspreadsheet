'use strict';

angular
  .module('uSpreadsheetApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'pasvaz.bindonce'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
