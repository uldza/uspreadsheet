'use strict';

angular.module('um.spreadsheet.toolbar', [
               'um.spreadsheet.cell'
]);

angular.module('um.spreadsheet.toolbar')
    .controller('ToolbarCtrl', function($scope, Cell) {
        $scope.action = function( action ) {
            if( Cell.activeCtrl === null )
            {
                return;
            }

            switch(action) {
                case 'merge':
                    Cell.activeCtrl.merge();
                    break;
                case 'bold':
                    Cell.activeCtrl.bold();
                    break;
                case 'italic':
                    Cell.activeCtrl.italic();
                    break;
            }
        };
    })
    .directive('toolbar', function(){
        return {
            restrict: 'EA',
            controller: 'ToolbarCtrl',
            template: '<button data-ng-click=action("merge")>Merge</button><button data-ng-click=action("bold")>Bold</button><button data-ng-click=action("italic")>Italic</button>'
        };
    });
