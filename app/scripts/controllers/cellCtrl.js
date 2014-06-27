'use strict';

angular.module('uSpreadsheetApp')
  .controller('CellCtrl', function ($scope, $rootScope, Spreadsheet) {
        var self = this;

        self.init = function(element, index) {
            self.element = element;
            self.index = index;

            self.element.on('click', function(event) {
                event.preventDefault();
                self.activate();
            });
        };

        self.activate = function() {
            if(Spreadsheet.activeCtrl !== null)
            {
                Spreadsheet.activeCtrl.unfocus();
                Spreadsheet.activeCtrl.deactivate();
            }

            self.isActive = true;
            self.isFocused = false;

            self.element.addClass('active');
            Spreadsheet.activeCtrl = this;
            Spreadsheet.cellInputCtrl.setValue(self.value);
            Spreadsheet.cellSelectCtrl.setPosition( self.position() );
        };

        self.focus = function() {
            if(self.isActive)
            {
                self.isFocused = true;
                Spreadsheet.cellInputCtrl.setPosition( self.position() );
            }
        };

        self.unfocus = function() {
            if(self.isFocused)
            {
                self.isFocused = false;
                Spreadsheet.cellInputCtrl.setPosition( {top: '-1000'} );
                self.setValue(Spreadsheet.cellInputCtrl.getValue());
            }
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

        self.position = function() {
            var properties = {
                top: self.element[0].offsetTop,
                left: self.element[0].offsetLeft,
                width: self.element[0].offsetWidth,
                height: self.element[0].offsetHeight
            };

            return properties;
        };

        // Events
        $rootScope.$on('activate', function(index) {
            if(index === self.index) { self.activate(); }
        });
  });
