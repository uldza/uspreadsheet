'use strict';

angular.module('uSpreadsheetApp')
  .controller('CellInputCtrl', function ($scope, Spreadsheet, _) {
        var self = this;

        self.init = function(element) {
            self.element = element;
            Spreadsheet.cellInputCtrl = self;
        };

        self.setPosition = function( position ) {
            position.top -= 1;
            position.left -= 2;
            position.width += 3;
            position.height += 2;

            _.each(position, function( item, key ) {
                self.element.css(key, item + 'px');
            });

            //self.element.trigger('focus');
        };

        self.getValue = function() {
            return $scope.data.activeValue;
        };

        self.setValue = function( newValue ) {
            $scope.data.activeValue = newValue;
            $scope.$digest();
        };
  });
