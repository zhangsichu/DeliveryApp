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
<<<<<<< HEAD
            $state.go("detail", {orderId: orderId});
=======
            $state.go("detail", {orderId: orderId}, {reload: true});
>>>>>>> merge
        };

        $scope.goScan = function(){
            $ionicViewSwitcher.nextDirection('forward');
<<<<<<< HEAD
            $state.go("manual");
>>>>>>> Revert "the detail manual scan pages."
        };
        $scope.goManual = function() {
            $state.go('manual');
        };
        $scope.doExit = function(){
            $state.go('login');
        }
=======
            $state.go("scan");
        };

        $scope.goManual = function(){
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("manual");
        };

        $ionicLoading.show({
            template: "派送列表加载中..."
        });

        OrderService.all().then(
            function(data){
                if(data.success){
                    $scope.orders = data.data;
                }
                $ionicLoading.hide();
            },
            function(){
                $ionicLoading.hide();
            }
        );
>>>>>>> merge
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