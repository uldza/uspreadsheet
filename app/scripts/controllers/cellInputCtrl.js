'use strict';

angular.module('uSpreadsheetApp')
  .controller('CellInputCtrl', function ($scope, Spreadsheet, _) {
        var self = this;

        self.init = function(element) {
            self.element = element;
            Spreadsheet.cellInputCtrl = self;
        };

        self.setPosition = function( position ) {
            _.each(position, function( item, key ) {
                self.element.css(key, item + 'px');
            });
        };

        self.getValue = function() {
            return $scope.value;
        };

        self.setValue = function( newValue ) {
            $scope.value = newValue;
            $scope.$digest();
        };
  });
