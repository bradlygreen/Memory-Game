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


  describe('mgCard directive', function() {
    it('should render a card using divs and bind it to a tile', inject(function($compile, $rootScope) {
      var tile = new Tile('sampleTile'),
          element;

      $rootScope.tileModel = tile;
      element = $compile('<mg-card tile="tileModel"></mg-card>')($rootScope);
      $rootScope.$apply();

      expect(element.find('div').find('div').find('img').eq(1).attr('src')).
          toBe('img/sampleTile.png');
    }));
  });
});
