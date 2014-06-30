'use strict';

angular.module('uldza.spreadsheet.cellSelection', []);

angular.module('uldza.spreadsheet.cellSelection')
    .controller('CellSelectionCtrl', function ($scope, Spreadsheet, _, Cell) {
        var self = this;

        self.init = function(element) {
            self.element = element;
            Cell.selectionCtrl = this;
        };

        self.setPosition = function( position ) {
            position.top -= 1;
            position.left -= 1;
            position.width += 1;
            position.height += 1;

            _.each(position, function( item, key ) {
                self.element.css(key, item + 'px');
            });
        };
    })
    .directive('cellSelection', function(){
        return {
            restrict: 'EA',
            controller: 'CellSelectionCtrl',
            template: '',
            link: function ($scope, element, attrs, Ctrl) {
                element.addClass('active-cell-border');
                Ctrl.init(element);
            }
        };
    });
