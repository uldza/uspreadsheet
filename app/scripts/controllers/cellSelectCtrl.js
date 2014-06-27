'use strict';

angular.module('uSpreadsheetApp')
  .controller('CellSelectCtrl', function ($scope, Spreadsheet, _) {
        var self = this;

        self.init = function(element) {
            self.element = element;
            Spreadsheet.cellSelectCtrl = self;
        };

        self.setPosition = function( position ) {
            position.top -= 1;
            position.left -= 1;
            position.width += 1;
            position.height += 1;

            _.each(position, function( item, key ) {
                self.element.css(key, item + 'px');
            });
        };
  });
