'use strict';
/* App Controllers */

function Tile(title) {
    this.title = title;
    this.display = 'back';
    this.flipped = false;

    this.show = function() {
        this.display = this.title;
        this.flipped = true;
    };

    this.hide = function() {
        this.display = 'back';
        this.flipped = false;
    };
}

function GridCtrl($scope) {
    $scope.grid = newGame();
    $scope.guesses = [];

    function getTile(tileDeck) {
        var i = Math.floor(Math.random()*tileDeck.length);
        return tileDeck.splice(i, 1)[0];
    }

    /* Create an array with two of each tileName in it */
    function makeDeck(tileNames) {
        var tileDeck = [];
        for (var i = 0; i < tileNames.length; i++) {
            tileDeck.push(new Tile(tileNames[i]));
            tileDeck.push(new Tile(tileNames[i]));
        }

        return tileDeck;
    }

    /* Make a 2-D array with the specified number of rows and columns */
    function makeGrid(numRows, numCols) {
        var grid = new Array(numRows);

        for (var row = 0; row < numRows; row++) {
            for (var col = 0; col < numCols; col++) {
                grid[row] = new Array(numCols);
            }
        }

        return grid;
    }

    /* Fill the grid with tiles picked at random */
    function newGame() {
        //var tileNames = ['foo', 'bar', 'baz', 'bon', 'fir', 'fur', 'onz', 'huq'];
        var tileNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn', 'that-guy', 'zeppelin'];
        var tileDeck = makeDeck(tileNames);
        var grid = makeGrid(4, 4);

        $scope.message = 'Click on a tile.';
        $scope.unmatchedPairs = tileNames.length;

        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var tile = getTile(tileDeck);
                grid[row][col] = tile;
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
                $scope.guesses[0].hide();
                $scope.guesses[1].hide();
            }
            $scope.guesses = [];
            $scope.message = '';
        }

        if ($scope.guesses.length === 0) {
            $scope.guesses[0] = tile;
            tile.show();
        }
        else if (tile !== $scope.guesses[0]) {
            tile.show();
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

