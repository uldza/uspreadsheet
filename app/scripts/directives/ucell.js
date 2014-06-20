'use strict';

angular.module('uSpreadsheetApp')
    .directive('uCell', function(){
        return {
            restrict: 'A',
            controller: 'CellCtrl',
            link: function ($scope, element, attrs, Ctrl) {
                var index = $scope.colLetter($scope.col)+$scope.row;
                
                Ctrl.init(element, index);
                
                element.on('click', function(event) {
                    event.preventDefault();
                    Ctrl.activate();
                });
            }
        };
    });
