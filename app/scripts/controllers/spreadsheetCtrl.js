'use strict';

angular.module('uSpreadsheetApp')
  .controller('SpreadsheetCtrl', function ($scope) {
      $scope.headerUrl = 'views/header.html';

      $scope.test = 'Some test';
      
      $scope.range = function( from, to )
      {
        var output = [];
        from    = parseInt(from);
        to      = parseInt(to);

        for (var i=from; i<=to; i++)
        {
            output.push(i);
        }

        return output;
      };

      $scope.colLetter = function(n)
      {
        var s = '';
        while(n >= 0) {
            s = String.fromCharCode(n % 26 + 97) + s;
            n = Math.floor(n / 26) - 1;
        }
        return s.toUpperCase();
      };
  });
