'use strict';

angular.module('uSpreadsheetApp')
  .controller('CellCtrl', function ($scope, $rootScope, Spreadsheet) {
        var self = this;

        self.init = function(element, index) {
            self.element = element;
            self.index = index;

            self.setValue(index);
        };

        self.activate = function() {
            if(Spreadsheet.activeCtrl !== null)
            {
                Spreadsheet.activeCtrl.deactivate();
            }

            self.isActive = true;
            self.element.addClass('active');
            Spreadsheet.activeCtrl = this;
        };

        self.deactivate = function() {
            self.isActive = false;
            self.element.removeClass('active');
        };

        self.setValue = function(value) {
            self.value = value;
            self.element.text(self.value);
        };

        self.getValue = function() {
            return self.value;
        };

        // Events
        $rootScope.$on('activate', function(cell) {
            if(cell === self.cell) { self.activate(); }
        });
  });
