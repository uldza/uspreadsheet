'use strict';

angular.module('uSpreadsheetApp')
  .controller('CellCtrl', function ($scope, $rootScope, Spreadsheet) {
        var self = this;

        self.init = function(element, index) {
            self.element = element;
            self.index = index;

            //self.setValue(index);

            self.element.on('click', function(event) {
                event.preventDefault();
                self.activate();
            });
        };

        self.activate = function() {
            if(Spreadsheet.activeCtrl !== null)
            {
                Spreadsheet.activeCtrl.deactivate();
            }

            self.isActive = true;
            self.element.addClass('active');
            Spreadsheet.activeCtrl = this;
            Spreadsheet.cellInputCtrl.setValue(self.value);
            Spreadsheet.cellInputCtrl.setPosition( self.position() );
        };

        self.deactivate = function() {
            self.isActive = false;
            self.element.removeClass('active');
            self.setValue(Spreadsheet.cellInputCtrl.getValue());
        };

        self.setValue = function(value) {
            self.value = value;
            self.element.text(self.value);
        };

        self.getValue = function() {
            return self.value;
        };

        self.position = function() {
            var properties = {
                top: self.element[0].offsetTop - 1,
                left: self.element[0].offsetLeft - 2,
                width: self.element[0].offsetWidth + 3,
                height: self.element[0].offsetHeight + 2
            };

            return properties;
        };

        // Events
        $rootScope.$on('activate', function(cell) {
            if(cell === self.cell) { self.activate(); }
        });

        
  });
