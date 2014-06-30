'use strict';

angular.module('uldza.spreadsheet.cellSelect', []);

angular.module('uldza.spreadsheet.cellSelect')
    .controller('CellSelectCtrl', function ($scope, Spreadsheet, _) {
        var self = this;

        self.init = function(element) {
            self.element = element;
            Spreadsheet.cellSelectCtrl = self;
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
    .directive('cellSelect', function(){
        return {
            restrict: 'EA',
            controller: 'CellSelectCtrl',
            template: '',
            link: function ($scope, element, attrs, Ctrl) {
                element.addClass('active-cell-border');
                Ctrl.init(element);
            }
        };
    });
