'use strict';

angular.module('uSpreadsheetApp')
    .directive('uCell', function(){
        return {
            restrict: 'A',
            controller: 'CellCtrl',
            link: function ($scope, element, attrs, Ctrl) {
                Ctrl.index = $scope.colLetter($scope.col)+$scope.row;
                
                element.text(Ctrl.index);
                element.on('click', function(event) {
                    event.preventDefault();
                });
            }
        }
    });