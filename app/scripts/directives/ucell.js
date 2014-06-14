'use strict';

angular.module('uSpreadsheetApp')
    .directive('uCell', function(){
        return {
            restrict: 'A',
            controller: 'CellCtrl',
            link: function ($scope, element, attrs, Ctrl) {
                Ctrl.index = $scope.colLetter($scope.col)+$scope.row;
                Ctrl.value = $scope.getValue(Ctrl.index);
                
                element.text(Ctrl.value);
                
                element.on('click', function(event) {
                    event.preventDefault();
                });
            }
        }
    });