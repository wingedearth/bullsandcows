// Define angular module and add dependencies
angular.module('app', ['ionic', 'app.controllers'])

// Wrap the application in Ionic's platform
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// designate two states and provide url routing
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.play', {
    url: '/play',
    views: {
      'menuContent': {
        templateUrl: 'templates/play.html'
      }
    }
  });

  // Default route
  $urlRouterProvider.otherwise('/app/play');
});
