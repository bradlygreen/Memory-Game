/* jasmine specs for controllers go here */

describe('MemoryGameApp', function() {

  beforeEach(module('memoryGameApp'));


  describe('GameCtrl', function(){
    var gameCtrl, scope;

    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      gameCtrl = $controller('GameCtrl', {$scope: scope});
    }));


    it('should publish the game model', function() {
      expect(scope.game).toBeDefined();
    });
  });


  describe('game', function(){
    var game;


    beforeEach(inject(function(_game_){
      game = _game_;
    }));


    it('should create a game with 8 tile pairs', function() {
      expect(game.unmatchedPairs).toBe(8);
    });
  });
});
