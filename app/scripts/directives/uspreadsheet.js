'use strict';

angular.module('uSpreadsheetApp')
    .directive('uSpreadsheet', function(){
        return {
            restrict: 'EA',
            controller: 'SpreadsheetCtrl',
            templateUrl: 'views/uSpreadsheet.html',
            scope: {
                cols: '=',
                rows: '='
            },
            link: function ($scope, element, attrs, Ctrl) {
            }
        }
    });