// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ddApp', ['ionic', 'ddApp.services', 'ddApp.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
      .state(
      'login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state(
      'list', {
        url: '/list',
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      })
      .state(
      'scan', {
        url: '/scan',
        templateUrl: 'templates/scan.html',
        controller: 'ScanCtrl'
      })
      .state(
      'manual', {
        url: '/manual',
        templateUrl: 'templates/manual.html',
        controller: 'ManualCtrl'
      })
      .state(
      'detail', {
        url: '/detail/:orderId',
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
      })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  $ionicConfigProvider.tabs.style('ios'); //even if you're on android
  $ionicConfigProvider.tabs.position('ios'); //even if you're on android
});