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

  // For player guesses, the defaultIcon appears in each space which
  // a player has not yet entered a value for.
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
    solution = newCode();
    $scope.turns = [];

    // implement a function to run each turn.
    //nextTurn();
  };



  /*
  TODO: Call this function when the user clicks a 'score' button.
        The 'score' button should remain disabled until all positions have a value.
        Maybe a button with an icon of a checkmark would be a good UI choice? Or,
        just use a small button with text of 'Score'?
  */
  $scope.scoreTurn = function() {
    // TODO: Score the turn

    // TODO: Show winModal IF turn has cracked the code. Put below line in an if statement.
    // $scope.winModal.show();
  };


  // Create the winner modal. Save on $scope and show when there's a chicken dinner!
  $ionicModal.fromTemplateUrl('templates/winner.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.winModal = modal;
  });

  // TODO: Call this function from the 'Play Again!' button in winModal's html (winner.html)
  $scope.playAgain = function() {
    $scope.newGame();
    $scope.winModal.hide();
  };


  function newCode() {
    var secretcode = [];
    for (var i = 0; i < $scope.numPositions; i++) {
      secretcode.push(Math.floor(Math.random() * $scope.icons.length));
    }
    return secretcode;
  }

  // The function to start a new game is run by default.
  $scope.newGame();
  console.log(solution);

});

