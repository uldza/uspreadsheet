'use strict';
angular.module('um.spreadsheet', [
               'um.spreadsheet.cell',
               'um.spreadsheet.areaSelection',
]);

angular.module('um.spreadsheet')
    .run( function($templateCache) {
        $templateCache.put('spreadsheet.html', '<div id="toolbar-box"></div><div id="formula-box"><table><tr><td class="fx">Fx</td><td class="formula"><div><input type="text" class="formula-input" data-ng-model="data.activeValue" /></div></td></tr></table></div><div class="spreadsheet-container"><table cellspacing="0" cellpadding="0" class="spreadsheet"><thead><tr><th class="first"></th><th class="header-shim" data-bindonce data-ng-repeat="col in range(0, cols)">{{colLetter(col)}}</th></tr></thead><tbody><tr data-bindonce data-ng-repeat="row in range(1, rows)"><td class="row-header-shim">{{row}}</td><td data-bindonce data-ng-repeat="col in range(0, cols)" data-cell></td></tr></tbody></table><cell-selection></cell-selection><cell-input></cell-input><area-selection></area-selection></div>');
    });

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
    .directive('umSpreadsheet', function($templateCache) {
        return {
            restrict: 'EA',
            controller: 'SpreadsheetCtrl',
            template: $templateCache.get('spreadsheet.html'),
            scope: {
                cols: '=',
                rows: '=',
            }
        };
    });
