'use strict';

describe('Controller: SpreadsheetCtrl', function () {

  // load the controller's module
  beforeEach(module('uSpreadsheetApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('SpreadsheetCtrl', {
      $scope: scope
    });
  }));

  it('creates array from range', function () {
    expect(scope.range(1,3)).toBe([1,2,3]);
  });
  
  it('converts numer to coll letter', function () {
    expect(scope.colLetter(1)).toBe('B');
    expect(scope.colLetter(26)).toBe('AA');
  });
});
