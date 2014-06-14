'use strict';

angular.module('uSpreadsheetApp')
    .directive('uCell', function(){
        return {
            restrict: 'A',
            controller: 'CellCtrl',
            template: '<span>{{cellIndex}}</span>',
            scope: {
                cellIndex: '@uCell'    
            },
            link: function ($scope, element, attrs, Ctrl) {
                element.on('click', function(event) {
                    event.preventDefault();
                    alert($scope.cellIndex);
                });
            }
        }
    });