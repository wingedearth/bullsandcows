//define controllers
angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {

  // These icon classes are for mapping the selected guesses to the UI
  $scope.icons =
    [
      'ion-umbrella', // icon 0
      'ion-flash',    // icon 1
      'ion-coffee',   // icon 2
      'ion-headphone' // icon 3
    ];

  $scope.defaultIcon = 'ion-minus';

  // selectedIcon's value determines which icon is selected. Default is
  // the first icon. Selection may be changed using logic in: menu.html
  $scope.selectedIcon = 0;

  // The default game includes four icons with four positions.
  $scope.numPositions = 4;
  $scope.numIcons = $scope.icons.length;

  // "solution" is the secret code that the player is attempting to
  // to guess. A new solution is set at the start of each game.
  var solution;

  // Initialize game state
  $scope.newGame = function() {
    solution = newCode(); // generates a new solution code
    $scope.turns = [];    // resets the turns taken
    nextTurn();           // starts the first turn
  };


  $scope.scoreTurn = function() {
    // score the currentTurn
    $scope.currentTurn.score();
    if ($scope.currentTurn.isWinner) {  // if player wins...
      $scope.winModal.show();           // Show the winModal
    } else {                            // otherwise...
      nextTurn();
    }
  };


  // Winner modal. Save on $scope and show when there's a winner.
  $ionicModal.fromTemplateUrl('templates/winner.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.winModal = modal;
  });

  $scope.playAgain = function() {
    $scope.newGame();
    $scope.winModal.hide();
  };

  // Constructor for a Turn object. Each round will be a new Turn,
  // to be stored in the "turns" array.
  function Turn() {
    this.positions = [];

    // Reset all positions to null (i.e. no player selections yet.)
    for (var i = 0; i < $scope.numPositions; i++) {
      this.positions.push(null);
    }

    // Reset round score each round.
    this.bull   = 0; // zero correct icons in correct positions.
    this.cow    = 0; // zero correct icons in wrong positions.
  }


  // score method for Turn objects
  Turn.prototype.score = function() {
    var self = this;

    // Assign temporary versions of player picks and solution
    var picks = self.positions.slice();
    var secret = solution.slice();

    // Score the turn, first check for bulls (i.e. correct icon/position)
    self.bull = 0;
    for (var i = 0; i < secret.length; i++) {
      if (picks[i] === secret[i]) {
        self.bull++;
        picks[i] = null;
        secret[i] = null;
      }
    }

    // Next, check for cows (i.e. correct icon, wrong position)
    self.cow = 0;
    if (self.bull < solution.length) {
      self.isWinner = false;

      // compare each non-bull value in solution to the picks
      secret.forEach(function(sec) {
        if (sec !== null) {
          for (var i = 0; i < picks.length; i++) {
            if (sec === picks[i]) {
              picks[i] = null;
              self.cow++;
              break; // when cow is found, move to next item in secret array
            }
          }
        }
      }); // end secret.forEach
    } else {
      self.isWinner = true;
    }
  }; // end Turn.prototype.score


  // Returns bogus array for ng-repeat based on $scope.numPostions
  $scope.range = function(size) {
    return new Array(size);
  };

  $scope.disableScoreButton = function() {
    // Get picks for the current turn
    var picks = $scope.currentTurn.positions;

    // check if player has finished selecting values for all positions
    var notPicked = false;
    for (var i = 0; i < picks.length; i++) {
      if (picks[i] === null) {
        notPicked = true;
        break;
      }
    }
    return notPicked; // if any position is not picked, button is disabled.
  };


// Helper Functions. Not part of $scope.

  function nextTurn() {
    $scope.turns.push(new Turn());
    $scope.currentTurn = $scope.turns[$scope.turns.length - 1];
  }

  function newCode() {
    var secretcode = [];
    for (var i = 0; i < $scope.numPositions; i++) {
      secretcode.push(Math.floor(Math.random() * $scope.icons.length));
    }
    return secretcode;
  }


/***** THE GAME STARTS HERE *****/

  $scope.newGame();
  console.log(solution); // delete this after development

}); // close controller
