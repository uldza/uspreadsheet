'use strict';

angular.module('um.spreadsheet.areaSelection', []);

angular.module('um.spreadsheet.areaSelection')
    .controller('AreaSelectionCtrl', function ($scope, Spreadsheet, _, Cell) {
        var self = this;

        self.init = function(element) {
            self.element = element;
            Cell.areaCtrl = this;
        };

        self.clear = function() {
            Cell.selected = [];
            self.element.css('top', '-1000px');
            self.element.css('left', '0px');
            self.element.css('width', '0px');
            self.element.css('height', '0px');
        };

        self.setPosition = function() {
            if( Cell.selected === [] )
            {
                return null;
            }

            var position = calculatePosition();

            position.top    -= 1;
            position.left   -= 1;
            position.width  += 1;
            position.height += 1;

            _.each(position, function( item, key ) {
                self.element.css(key, item + 'px');
            });

            self.element.css('border', 'none');
            self.element.css('pointer-events', 'none');
        };

        self.fixate = function() {
            self.element.css('border', '1px solid #4285f4');
        };

        function calculatePosition() {
            var top, left;
            var width = 0, height = 0;

            var widthCells = _.filter(Cell.selected, function(cellCtrl) {
                return Cell.indexToNum(cellCtrl.indexes[0]).row === Cell.indexToNum(Cell.activeCtrl.indexes[0]).row;
            });

            var heightCells = _.filter(Cell.selected, function(cellCtrl) {
                return Cell.indexToNum(cellCtrl.indexes[0]).col === Cell.indexToNum(Cell.activeCtrl.indexes[0]).col;
            });
            
            _.each(widthCells, function(cellCtrl) {
                var pos = cellCtrl.position();
                if( left === undefined ) { left = pos.left; }
                if( left > pos.left ) { left = pos.left; }
                width += pos.width;
            });
            _.each(heightCells, function(cellCtrl) {
                var pos = cellCtrl.position();
                if( top === undefined ) { top = pos.top; }
                if( top > pos.top ) { top = pos.top; }
                height += pos.height;
            });

            return {
                top: top,
                left: left,
                width: width,
                height: height
            };
        }
    })
    .directive('areaSelection', function(){
        return {
            restrict: 'EA',
            controller: 'AreaSelectionCtrl',
            link: function ($scope, element, attrs, Ctrl) {
                element.addClass('area-selection-box');
                Ctrl.init(element);
            }
        };
    });
