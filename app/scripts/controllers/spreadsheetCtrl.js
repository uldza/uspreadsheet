'use strict';

angular.module('uSpreadsheetApp')
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
});
