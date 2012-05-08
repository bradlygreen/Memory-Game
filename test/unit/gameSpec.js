describe('Game', function() {

  var tileNames = ['turtle', 'hammer'],
      game;

  beforeEach(function() {
    game = new Game(tileNames);
  });


  describe('init', function() {
    it('should create a 2x2 grid', function() {
      expect(game.grid.length).toBe(2);
      expect(game.grid[0].length).toBe(2);
      expect(game.grid[1].length).toBe(2);
    });


    it('should initialize unmatchedPairs and message', function() {
      expect(game.message).toBe('Click on a tile.');
      expect(game.unmatchedPairs).toBe(2);
    });
  });


  describe('flip', function() {
    it('should set the flipped flag on the tile being flipped', function() {
      var tile = game.grid[0][0];
      expect(tile.flipped).toBe(false);
      game.flipTile(tile);
      expect(tile.flipped).toBe(true);
    });

    it('should update the image name when a tile is flipped', function() {
      var tile = game.grid[0][0];
      expect(tile.imgName()).toBe('back');

      game.flipTile(tile);
      expect(tile.imgName()).not.toBe('back');
    });
  });
});
