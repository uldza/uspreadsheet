'use strict';

angular.module('uSpreadsheetApp')
    .directive('uSpreadsheet', function(){
        return {
            restrict: 'EA',
            controller: 'SpreadsheetCtrl',
            templateUrl: 'views/uSpreadsheet.html',
            link: function (scope, element, attrs, ctrl) {
            }
        }
    });