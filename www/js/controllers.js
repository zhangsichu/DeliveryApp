/**
 * Created by sczhang on 8/4/15.
 */
angular.module('ddApp.controllers', ['ddApp.services'])
    .controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
       $scope.doLogin = function() {
           $state.go('list', {}, {reload: true});
       }
    })
    .controller('ListCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.goDetail = function() {
            $state.go('detail', {}, {reload: true});
        };
        $scope.goScan = function() {
            $state.go('scan');
        };
        $scope.goManual = function() {
            $state.go('manual');
        };
        $scope.doExit = function(){
            $state.go('login');
        }
    })
    .controller('DetailCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.goList = function() {
            $state.go('list', {}, {reload: true});
        }
    })
    .controller('ManualCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.goDetail = function() {
            $state.go('detail', {}, {reload: true});
        };
    })
    .controller('ScanCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.goDetail = function() {
            $state.go('detail', {}, {reload: true});
        };
    })