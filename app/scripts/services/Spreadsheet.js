'use strict';

angular.module('uSpreadsheetApp')
    .service('Spreadsheet', function($document, $rootScope){
        var self = this;

        self.activeCtrl = null;
        self.cellInputCtrl = null;
        self.cellSelectCtrl = null;

        $document.on('keydown', function(e) {
            if( self.activeCtrl === null )
            {
                return;
            }

            console.log(e.keyCode);
            switch(e.keyCode) {
            case 37:
                e.preventDefault();
                //left
                $rootScope.$emit('activatecell', self.activeCtrl.getAdjacentCells().left );
                break;
            case 38:
                e.preventDefault();
                //up
                $rootScope.$emit('activatecell', self.activeCtrl.getAdjacentCells().up );
                break;
            case 39:
                e.preventDefault();
                //right
                $rootScope.$emit('activatecell', self.activeCtrl.getAdjacentCells().right );
                break;
            case 40:
                e.preventDefault();
                //down
                $rootScope.$emit('activatecell', self.activeCtrl.getAdjacentCells().down );
                break;
            case 27:
                self.activeCtrl.unfocus();
                break;
            default:
                if( !self.activeCtrl.isFocused )
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
