'use strict';
angular.module('uldza.spreadsheet', [
               'uldza.spreadsheet.cell',
]);

angular.module('uldza.spreadsheet')
    .service('Spreadsheet', function($document, $rootScope, Cell){

        $document.on('keydown', function(e) {
            if( Cell.activeCtrl === null )
            {
                return;
            }

            console.log(e.keyCode);
            switch(e.keyCode) {
            case 8:
                //backspace
                if( !Cell.activeCtrl.isFocused )
                {
                    e.preventDefault();
                    Cell.activeCtrl.setValue('');
                    Cell.inputCtrl.setValue('');
                }
                break;
            case 13:
                //return
                if( Cell.activeCtrl.isFocused )
                {
                    Cell.activeCtrl.unfocus();
                }
                else
                {
                    Cell.activeCtrl.focus();
                }
                break;
            case 27:
                //esc
                if( Cell.activeCtrl.isFocused )
                {
                    Cell.inputCtrl.setValue(Cell.activeCtrl.oldValue);
                    Cell.activeCtrl.unfocus();
                }
                break;
            case 37:
                e.preventDefault();
                //left
                $rootScope.$emit('activatecell', Cell.activeCtrl.getAdjacentCells().left );
                break;
            case 38:
                e.preventDefault();
                //up
                $rootScope.$emit('activatecell', Cell.activeCtrl.getAdjacentCells().up );
                break;
            case 39:
                e.preventDefault();
                //right
                $rootScope.$emit('activatecell', Cell.activeCtrl.getAdjacentCells().right );
                break;
            case 40:
                e.preventDefault();
                //down
                $rootScope.$emit('activatecell', Cell.activeCtrl.getAdjacentCells().down );
                break;
            default:
                if( !Cell.activeCtrl.isFocused )
                {
                    Cell.activeCtrl.focus();
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
                Cell.activeCtrl.focus();
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
