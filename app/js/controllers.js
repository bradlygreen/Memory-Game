'use strict';
/* App Controllers */

function Tile(title) {
    this.title = title;
    this.flipped = false;

    this.imgName = function() {
        return this.flipped ?  this.title : 'back';
    }

    this.flip = function() {
      this.flipped = !this.flipped;
    }
}

function GridCtrl($scope) {
    $scope.grid = newGame();
    $scope.guesses = [];

    function getRandomTile(tileDeck) {
        var i = Math.floor(Math.random()*tileDeck.length);
        return tileDeck.splice(i, 1)[0];
    }

    /* Create an array with two of each tileName in it */
    function makeDeck(tileNames) {
        var tileDeck = [];
        tileNames.forEach(function(name) {
            tileDeck.push(new Tile(name));
            tileDeck.push(new Tile(name));
        });

        return tileDeck;
    }

    /* Fill the grid with tiles picked at random */
    function newGame() {
        var tileNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn', 'that-guy', 'zeppelin'];
        var tileDeck = makeDeck(tileNames);
        var grid = [];
        var gridDimension = Math.sqrt(tileNames.length);

        $scope.message = 'Click on a tile.';
        $scope.unmatchedPairs = tileNames.length;

        for (var row = 0; row < gridDimension; row++) {
            grid[row] = [];
            for (var col = 0; col < gridDimension; col++) {
                grid[row][col] = getRandomTile(tileDeck);
            }
        }

        return grid;
    }

    $scope.flipTile = function(tile) {
        if (tile.flipped) {
            return;
        }

        if ($scope.guesses.length === 2) {
            if ($scope.guesses[0].title !== $scope.guesses[1].title) {
                $scope.guesses[0].flip();
                $scope.guesses[1].flip();
            }
            $scope.guesses = [];
            $scope.message = '';
        }

        if ($scope.guesses.length === 0) {
            $scope.guesses[0] = tile;
            tile.flip();
        }
        else if (tile !== $scope.guesses[0]) {
            tile.flip();
            $scope.guesses[1] = tile;

            if (tile.title === $scope.guesses[0].title) {
                tile.matched = true;
                $scope.guesses[0].matched = true;
                $scope.unmatchedPairs--;
                $scope.message = ($scope.unmatchedPairs > 0) ? 'Good job!  Keep going.' : 'You win!';
            }
            else {  // didn't match
                $scope.message = 'Try again';
            }
        }

    };
}

