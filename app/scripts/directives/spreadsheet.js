'use strict';
angular.module('um.spreadsheet', [
               'um.spreadsheet.cell',
               'um.spreadsheet.areaSelection',
]);

angular.module('um.spreadsheet')
    .service('Spreadsheet', function($document, Cell){
        this.mousedown = false;

        $document.on('keydown', function(e) {
            var cellIndex, cellCtrl;

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
                cellIndex = Cell.activeCtrl.getAdjacentCells().left;
                cellCtrl = Cell.get(cellIndex);
                if( cellCtrl !== null )
                {
                    cellCtrl.activate();
                }
                break;
            case 38:
                e.preventDefault();
                //up
                cellIndex = Cell.activeCtrl.getAdjacentCells().up;
                cellCtrl = Cell.get(cellIndex);
                if( cellCtrl !== null )
                {
                    cellCtrl.activate();
                }
                break;
            case 39:
                e.preventDefault();
                //right
                cellIndex = Cell.activeCtrl.getAdjacentCells().right;
                cellCtrl = Cell.get(cellIndex);
                if( cellCtrl !== null )
                {
                    cellCtrl.activate();
                }
                break;
            case 40:
                e.preventDefault();
                //down
                cellIndex = Cell.activeCtrl.getAdjacentCells().down;
                cellCtrl = Cell.get(cellIndex);
                if( cellCtrl !== null )
                {
                    cellCtrl.activate();
                }
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

            if( angular.element(e.target).hasClass('active-cell-border') )
            {
                Cell.activeCtrl.focus();
            }
        });

        $document.on('mousedown', function(e) {
            this.mousedown = true;

            if(typeof angular.element(e.target).scope === 'function' && angular.element(e.target).scope().$controller !== undefined)
            {
                angular.element(e.target).scope().$controller.activate();
            }

        });

        $document.on('mouseup', function() {
            this.mousedown = false;
            if( Cell.selected.length > 0 )
            {
                Cell.areaCtrl.fixate();
            }
        });

        $document.on('mousemove', function(e) {
            e.preventDefault();
            Cell.selected = [];

            if( this.mousedown && 
                typeof angular.element(e.target).scope === 'function' && 
                angular.element(e.target).scope().$controller !== undefined
              )
            {
                var index = angular.element(e.target).scope().$controller.indexes[0];
                Cell.select(index);
            }
        });
    })

    .controller('SpreadsheetCtrl', function ($scope, Cell) {
        $scope.data = {};
        $scope.data.activeValue = null;

        $scope.data.headerUrl = 'views/header.html';

        $scope.range = Cell.range;
        $scope.colLetter = Cell.colLetter;

        $scope.save = function( cellCtrl )
        {
            console.log(cellCtrl);
        };
    })
    .directive('uSpreadsheet', function(){
        return {
            restrict: 'EA',
            controller: 'SpreadsheetCtrl',
            templateUrl: 'templates/spreadsheet.html',
            scope: {
                cols: '=',
                rows: '=',
            }
        };
    });
