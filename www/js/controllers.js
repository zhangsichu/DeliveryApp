/**
 * Created by sczhang on 8/4/15.
 */
angular.module('ddApp.controllers', ['ddApp.services'])
    .controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
       $scope.doLogin = function() {
           $state.go('list', {}, {reload: true});
       }
    })
<<<<<<< HEAD
    .controller('ListCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.goDetail = function() {
            $state.go('detail', {}, {reload: true});
        };
        $scope.goScan = function() {
            $state.go('scan');
=======
    .controller('ListCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading, OrderService) {
        $scope.now = new Date();

        $scope.doLogout = function () {
            $ionicViewSwitcher.nextDirection('back');
            $state.go("login");
        };

        $scope.goDetail = function (orderId) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("detail", {orderId: orderId});
        };

        $scope.goScan = function(){
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("manual");
>>>>>>> Revert "the detail manual scan pages."
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