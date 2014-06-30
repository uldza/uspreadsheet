'use strict';
angular.module('uldza.spreadsheet', [
               'uldza.spreadsheet.cell',
]);

angular.module('uldza.spreadsheet')
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
            case 8:
                //backspace
                if( !self.activeCtrl.isFocused )
                {
                    e.preventDefault();
                    self.activeCtrl.setValue('');
                    self.cellInputCtrl.setValue('');
                }
                break;
            case 13:
                //return
                if( self.activeCtrl.isFocused )
                {
                    self.activeCtrl.unfocus();
                }
                else
                {
                    self.activeCtrl.focus();
                }
                break;
            case 27:
                //esc
                if( self.activeCtrl.isFocused )
                {
                    self.cellInputCtrl.setValue(self.activeCtrl.oldValue);
                    self.activeCtrl.unfocus();
                }
                break;
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
    })

    .controller('SpreadsheetCtrl', function ($scope) {
        $scope.data = {};

        $scope.data.headerUrl = 'views/header.html';

        $scope.data.activeValue = null;

        $scope.range = function( from, to ) {
            var output = [];
            from    = parseInt(from);
            to      = parseInt(to);

            for (var i=from; i<=to; i++)
            {
                output.push(i);
            }

            return output;
        };

        $scope.colLetter = function(n) {
            var s = '';
            while(n >= 0) {
                s = String.fromCharCode(n % 26 + 97) + s;
                n = Math.floor(n / 26) - 1;
            }
            return s.toUpperCase();
        };

        $scope.collNumber = function(col) {
            return col.charCodeAt(col.length-1) - 65 + 26 * (col.length-1);
        };
    })
    .directive('uSpreadsheet', function(){
        return {
            restrict: 'EA',
            controller: 'SpreadsheetCtrl',
            templateUrl: 'templates/spreadsheet.html',
            scope: {
                cols: '=',
                rows: '='
            }
        };
    });
