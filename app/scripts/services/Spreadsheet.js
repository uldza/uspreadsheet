'use strict';

angular.module('uSpreadsheetApp')
    .service('Spreadsheet', function($document){
        var self = this;

        self.activeCtrl = null;
        self.cellInputCtrl = null;
        self.cellSelectCtrl = null;

        $document.on('keydown', function(e) {
            switch(e.keyCode) {
            case 27:
                if( self.activeCtrl !== null )
                {
                    self.activeCtrl.unfocus();
                }
                break;
            default:
                if( self.activeCtrl !== null && !self.activeCtrl.isFocused )
                {
                    self.activeCtrl.focus();
                }
            }
        });

        //$document.on('keyup', function(e) {
            //console.log(e.keyCode);
        //});

        $document.on('dblclick', function(e) {
            e.preventDefault();

            var target = angular.element(e.target);

            if( target.hasClass('active-cell-border') )
            {
                self.activeCtrl.focus();
            }
        });
    });
