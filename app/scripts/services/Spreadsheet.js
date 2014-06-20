'use strict';

angular.module('uSpreadsheetApp')
    .service('Spreadsheet', function($document){
        var self = this;

        self.activeCtrl = null;

        $document.on('keydown', function(e) {
            console.log(e.keyCode);
        });

        $document.on('keyup', function(e) {
            console.log(e.keyCode);
        });
    });
