// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ddApp', ['ionic', 'ddApp.services', 'ddApp.controllers', 'ngCordova', 'ngStorage'])
.directive('onValidSubmit', ['$parse', '$timeout', function($parse, $timeout) {
    return {
        require: '^form',
        restrict: 'A',
        link: function(scope, element, attrs, form) {
            form.$submitted = false;
            var fn = $parse(attrs.onValidSubmit);
            element.on('submit', function(event) {
                scope.$apply(function() {
                    element.addClass('ng-submitted');
                    form.$submitted = true;
                    if (form.$valid) {
                        if (typeof fn === 'function') {
                            fn(scope, {$event: event});
                        }
                    }
                });
            });
        }
    }

}])
.directive('validated', ['$parse', function($parse) {
    return {
        restrict: 'AEC',
        require: '^form',
        link: function(scope, element, attrs, form) {
            var inputs = element.find("*");
            for(var i = 0; i < inputs.length; i++) {
                (function(input){
                    var attributes = input.attributes;
                    if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
                        var field = form[attributes.name.value];
                        if (field != void 0) {
                            scope.$watch(function() {
                                return form.$submitted + "_" + field.$name + "_" + field.$valid;
                            }, function() {
                                if (form.$submitted != true) return;
                                if (!field.$valid) {
                                    element.removeClass('has-success');
                                    element.addClass('has-error');
                                } else {
                                    element.removeClass('has-error').addClass('has-success');
                                }
                            });
                        }
                    }
                })(inputs[i]);
            }
        }
    }
}])
.run(function($ionicPlatform, $rootScope, $state, AuthenticationService) {
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

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (AuthenticationService.isNeedLogin(toState.data) && !AuthenticationService.isLogin()) {
          event.preventDefault();
          $state.go('login');
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
        controller: 'ListCtrl',
        cache: false,
        data: {
            requiredLogin: true
        }
      })
      .state(
      'scan', {
        url: '/scan',
        templateUrl: 'templates/scan.html',
        controller: 'ScanCtrl',
        data: {
            requiredLogin: true
        }
      })
      .state(
      'manual', {
        url: '/manual',
        templateUrl: 'templates/manual.html',
        controller: 'ManualCtrl',
        data: {
            requiredLogin: true
        }
      })
      .state(
      'detail', {
        url: '/detail/:orderId',
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl',
        cache: false,
        data: {
            requiredLogin: true
        }
      })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  $ionicConfigProvider.tabs.style('ios'); //even if you're on android
  $ionicConfigProvider.tabs.position('ios'); //even if you're on android
});