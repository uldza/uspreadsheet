'use strict';

angular.module('uldza.spreadsheet.cell', [
               'uldza.spreadsheet.cellInput',
               'uldza.spreadsheet.cellSelection'
]);

angular.module('uldza.spreadsheet.cell')
    .factory('Cell', function(_) {
        var Cell = {
            activeCtrl: null,
            selectionCtrl: null,
            inputCtrl: null,
            collection: {},
            add: function( cellCtrl ) {
                _.each(cellCtrl.indexes, function( index ) {
                    Cell.collection[index] = cellCtrl;
                });
            },
            get: function( index ) {
                return (Cell.collection[index] === undefined) ? null : Cell.collection[index];
            },
        };
        return Cell;
    })
    .controller('CellCtrl', function ($scope, $rootScope, Spreadsheet, _, Cell) {
        var self = this;
        // Attributes
        self.element = null;
        self.isActive = self.isFocused = false;
        self.indexes = [];

        // Initialization
        self.init = function(element, index) {
            self.element = element;
            self.indexes.push(index);

            // Bind click listener
            self.element.on('click', function(event) {
                event.preventDefault();
                self.activate();
            });

            // Add cell to all cells list
            Cell.add(this);
        };

        self.activate = function() {
            if(Cell.activeCtrl !== null)
            {
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
                index = index.match(/[A-Z]+/)[0];
                return $scope.collNumber(index);
            }).sort();

            var rows = _.map(self.indexes, function(index) {
                return index.match(/\d+/)[0] * 1;
            }).sort();

            var column = columns[0];
            var row = rows[0];

            cells.up = (rows[0] - 1 > 0) ? $scope.colLetter(column) + (rows[0] - 1) : null;
            cells.down = (rows[rows.length - 1] + 1 <= $scope.rows) ? $scope.colLetter(column) + (rows[rows.length - 1] + 1) : null;

            cells.left = (columns[0] - 1 >= 0) ? $scope.colLetter(columns[0] - 1) + row : null;
            cells.right = (columns[columns.length - 1] + 1 <= $scope.cols) ? $scope.colLetter(columns[columns.length - 1] + 1) + row : null;

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
                var index = $scope.colLetter($scope.col)+$scope.row;
                Ctrl.init(element, index);
            }
        };
    });
