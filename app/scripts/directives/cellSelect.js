'use strict';

angular.module('uSpreadsheetApp')
    .directive('cellSelect', function(){
        return {
            restrict: 'EA',
            controller: 'CellSelectCtrl',
            template: '',
            link: function ($scope, element, attrs, Ctrl) {
                element.addClass('active-cell-border');
                Ctrl.init(element);
            }
        };
    });
