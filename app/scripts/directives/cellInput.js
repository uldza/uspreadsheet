'use strict';

angular.module('uSpreadsheetApp')
    .directive('cellInput', function(){
        return {
            restrict: 'EA',
            controller: 'CellInputCtrl',
            template: '<input type="text" class="cell-input" data-ng-model="data.activeValue" />',
            link: function ($scope, element, attrs, Ctrl) {
                element.addClass('cell-input-box');
                Ctrl.init(element);
            }
        };
    });
