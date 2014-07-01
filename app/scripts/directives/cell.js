'use strict';

angular.module('um.spreadsheet.cell', [
               'um.spreadsheet.cellInput',
               'um.spreadsheet.cellSelection'
]);

angular.module('um.spreadsheet.cell')
    .factory('Cell', function(_) {
        var Cell = {
            activeCtrl: null,
            areaCtrl: null,
            selectionCtrl: null,
            inputCtrl: null,
            collection: {},
            selected: [],
            add: function( cellCtrl ) {
                _.each(cellCtrl.indexes, function( index ) {
                    Cell.collection[index] = cellCtrl;
                });
            },
            get: function( index ) {
                return (Cell.collection[index] === undefined) ? null : Cell.collection[index];
            },
            select: function( index ) {
                select( Cell.activeCtrl.indexes[0], index );
                Cell.areaCtrl.setPosition();
            },
            colLetter: function(n) {
                var s = '';
                while(n >= 0) {
                    s = String.fromCharCode(n % 26 + 97) + s;
                    n = Math.floor(n / 26) - 1;
                }
                return s.toUpperCase();
            },
            colNumber: function(col) {
                return col.charCodeAt(col.length-1) - 65 + 26 * (col.length-1);
            },
            indexToNum: function( index ) {
                return { row: index.match(/\d+/)[0] * 1, col: Cell.colNumber( index.match(/[A-Z]+/)[0] ) };
            },
            range: function( from, to ) {
                var output = [];
                from    = parseInt(from);
                to      = parseInt(to);

                for (var i=from; i<=to; i++)
                {
                    output.push(i);
                }

                return output;
            },
        };

        function select( activeIndex, selectedIndex ) {
            if( activeIndex === selectedIndex )
            {
                return;
            }

            activeIndex = Cell.indexToNum(activeIndex);
            selectedIndex = Cell.indexToNum(selectedIndex);

            var minRow = Math.min(activeIndex.row, selectedIndex.row);
            var maxRow = Math.max(activeIndex.row, selectedIndex.row);

            var minCol = Math.min(activeIndex.col, selectedIndex.col);
            var maxCol = Math.max(activeIndex.col, selectedIndex.col);

            Cell.selected = _.filter(Cell.collection, function(cell) {
                var index = Cell.indexToNum( cell.indexes[0] );
                return ( isWithin(minCol, maxCol, index.col) && isWithin(minRow, maxRow, index.row) );
            });
        }

        function isWithin(min, max, val) {
            if(min <= val && val <= max)
            {
                return true;
            }

            return false;
        }

        return Cell;
    })
    .controller('CellCtrl', function ($scope, $rootScope, Spreadsheet, _, Cell) {
        var self = $scope.$controller = this;

        // Attributes
        self.element = null;
        self.isActive = self.isFocused = false;
        self.indexes = [];

        // Initialization
        self.init = function(element, col, row) {
            var index = Cell.colLetter(col)+row;
            self.indexes.push(index);
            self.element = element;

            // Add cell to all cells list
            Cell.add(this);
        };

        self.activate = function() {
            if(Cell.activeCtrl !== null)
            {
                Cell.areaCtrl.clear();
                Cell.activeCtrl.unfocus();
                Cell.activeCtrl.deactivate();
            }

            self.isActive = true;
            self.isFocused = false;

            self.element.addClass('active');
            Cell.activeCtrl = this;
            Cell.inputCtrl.setValue(self.value);
            Cell.selectionCtrl.setPosition( self.position() );
        };

        self.focus = function() {
            if(self.isActive)
            {
                self.isFocused = true;
                self.oldValue = self.getValue();
                Cell.inputCtrl.setPosition( self.position() );
            }
        };

        self.unfocus = function() {
            if(self.isFocused)
            {
                self.isFocused = false;
                Cell.inputCtrl.setPosition( {top: '-1000'} );
                self.setValue(Cell.inputCtrl.getValue());
            }
        };

        self.deactivate = function() {
            self.isActive = false;
            self.element.removeClass('active');
            $scope.save(this);
        };

        self.setValue = function(value) {
            self.value = value;
            self.element.text(self.value);
        };

        self.getValue = function() {
            return self.value;
        };

        self.getAdjacentCells = function() {
            var cells = {};

            var columns = _.map(self.indexes, function(index) {
                return Cell.indexToNum( index ).col;
            }).sort();

            var rows = _.map(self.indexes, function(index) {
                return Cell.indexToNum( index ).row;
            }).sort();

            var column = columns[0];
            var row = rows[0];

            cells.up = (rows[0] - 1 > 0) ? Cell.colLetter(column) + (rows[0] - 1) : null;
            cells.down = (rows[rows.length - 1] + 1 <= $scope.rows) ? Cell.colLetter(column) + (rows[rows.length - 1] + 1) : null;

            cells.left = (columns[0] - 1 >= 0) ? Cell.colLetter(columns[0] - 1) + row : null;
            cells.right = (columns[columns.length - 1] + 1 <= $scope.cols) ? Cell.colLetter(columns[columns.length - 1] + 1) + row : null;

            return cells;
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
    })
    .directive('cell', function(){
        return {
            restrict: 'A',
            controller: 'CellCtrl',
            link: function ($scope, element, attrs, Ctrl) {
                Ctrl.init(element, $scope.col, $scope.row);
            }
        };
    });
