'use strict';

angular.module('uldza.spreadsheet.cellInput', []);

angular.module('uldza.spreadsheet.cellInput')
    .controller('CellInputCtrl', function ($scope, Spreadsheet, _, Cell) {
        var self = this;

        self.init = function(element) {
            self.element = element;
            self.input = element.find('input');
            Cell.inputCtrl = this;
        };

        self.setPosition = function( position ) {
            position.top -= 1;
            position.left -= 2;
            position.width += 3;
            position.height += 2;

            _.each(position, function( item, key ) {
                self.element.css(key, item + 'px');
            });

            self.input[0].focus();
        };

        self.getValue = function() {
            return $scope.data.activeValue;
        };

        self.setValue = function( newValue ) {
            $scope.data.activeValue = newValue;
            $scope.$digest();
        };
    })
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
