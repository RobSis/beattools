// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.tempo-pitch', {
    url: '/tempo-pitch',
    views: {
      'menuContent': {
        templateUrl: 'templates/tempo-pitch.html'
      }
    }
  })

  .state('app.timestretch', {
    url: '/timestretch',
    views: {
      'menuContent': {
        templateUrl: 'templates/timestretch.html'
      }
    }
  })

  .state('app.transpose', {
    url: '/transpose',
    views: {
      'menuContent': {
        templateUrl: 'templates/transpose.html'
      }
    }
  })

  .state('app.delay', {
    url: '/delay',
    views: {
      'menuContent': {
        templateUrl: 'templates/delay.html'
      }
    }
  })

  .state('app.bpm', {
    url: '/bpm',
    views: {
      'menuContent': {
        templateUrl: 'templates/bpm.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tempo-pitch');
});
