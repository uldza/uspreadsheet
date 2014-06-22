'use strict';

angular.module('uSpreadsheetApp')
    .directive('cellInput', function(){
        return {
            restrict: 'EA',
            controller: 'CellInputCtrl',
            template: '<input type="text" class="cell-input" data-ng-model="value" />',
            link: function ($scope, element, attrs, Ctrl) {
                Ctrl.init(element);
                
                element.css('position', 'absolute');
                element.css('top', '-1000px');
                element.css('border', '2px #5292f7 solid');
                element.css('padding', '0 2px');
                element.css('margin', '0'); 
                element.css('z-index', '15'); 
                element.css('resize', 'none'); 
                element.css('overflow', 'auto'); 
                element.css('white-space', 'pre-wrap'); 
                element.css('outline', 'none'); 
                element.css('-webkit-box-shadow', '0 2px 5px rgba(0,0,0,0.4)'); 
                element.css('-moz-box-shadow', '0 2px 5px rgba(0,0,0,0.4)');
                element.css('box-shadow', '0 2px 5px rgba(0,0,0,0.4)');
                element.css('word-wrap', 'break-word');
                element.css('background', 'white');

                element.find('.cell-input').css('padding', '0 2px');

                // Changable styles
                element.css('font', 'normal normal 400 13px arial,sans,sans-serif');
                element.css('text-align', 'left');

                element.find('.cell-input').css('max-width', '592px');
                element.find('.cell-input').css('max-height', '80px');
                element.find('.cell-input').css('min-width', '114px');
                element.find('.cell-input').css('min-height', '14px');
                element.find('.cell-input').css('width', '100%');
                element.find('.cell-input').css('border', '0px');
            }
        };
    });
