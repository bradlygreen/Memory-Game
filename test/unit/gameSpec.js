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
    var tile1a, tile1b, tile2a, tile2b;


    beforeEach(function() {
      tile1a = game.grid[0][0];

      // this is weird because Game constructor is non-deterministic, this should be refactored
      if (tile1a.title === game.grid[0][1].title) {
        tile1b = game.grid[0][1];
        tile2a = game.grid[1][0];
      } else {
        tile2a = game.grid[0][1];

        if (tile1a.title === game.grid[1][0].title) {
          tile1b = game.grid[1][0];
          tile2b = game.grid[1][1];
        } else {
          tile1b = game.grid[1][1];
          tile2b = game.grid[1][0];
        }
      }
    });


    it('should set the flipped flag on the tile being flipped', function() {
      expect(tile1a.flipped).toBe(false);
      game.flipTile(tile1a);
      expect(tile1a.flipped).toBe(true);
    });


    xit('should update the image name when a tile is flipped', function() {
      expect(tile1a.imgName()).toBe('back');

      game.flipTile(tile1a);
      expect(tile1a.imgName()).not.toBe('back');
    });


    it('should turn back first two cards when miss and third card is flipped', function() {
      game.flipTile(tile1a);
      game.flipTile(tile2a);
      expect(tile1a.flipped).toBe(true);
      expect(tile2a.flipped).toBe(true);
      expect(tile1b.flipped).toBe(false);

      game.flipTile(tile1b);
      expect(tile1a.flipped).toBe(false);
      expect(tile2a.flipped).toBe(false);
      expect(tile1b.flipped).toBe(true);
      expect(game.unmatchedPairs).toBe(2);
    });


    it('should keep the first two cards turned when hit and third card is flipped', function() {
      game.flipTile(tile1a);
      game.flipTile(tile1b);
      expect(tile1a.flipped).toBe(true);
      expect(tile1b.flipped).toBe(true);
      expect(tile2a.flipped).toBe(false);
      expect(tile2b.flipped).toBe(false);
      expect(game.unmatchedPairs).toBe(1);

      game.flipTile(tile2a);
      expect(tile1a.flipped).toBe(true);
      expect(tile1b.flipped).toBe(true);
      expect(tile2a.flipped).toBe(true);
      expect(tile2b.flipped).toBe(false);
      expect(game.unmatchedPairs).toBe(1);

      game.flipTile(tile2b);
      expect(tile1a.flipped).toBe(true);
      expect(tile1b.flipped).toBe(true);
      expect(tile2a.flipped).toBe(true);
      expect(tile2b.flipped).toBe(true);
      expect(game.unmatchedPairs).toBe(0);
    });
  });
});
