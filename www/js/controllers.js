/**
 * Created by sczhang on 8/4/15.
 */
angular.module('ddApp.controllers', ['ddApp.services'])
    .controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.user = {
            name: null,
            password: null
        };

        $scope.doLogin = function() {
           $ionicViewSwitcher.nextDirection('forward');
           $state.go('list', {}, {reload: true});
       }
    })
    .controller('ListCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading, OrderService) {
        $scope.now = new Date();

        $scope.doLogout = function () {
            $ionicViewSwitcher.nextDirection('back');
            $state.go("login");
        };

        $scope.goDetail = function (orderId) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("detail", {orderId: orderId}, {reload: true});
        };

        $scope.goScan = function(){
            $ionicViewSwitcher.nextDirection('forward');
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
    })
    .controller('DetailCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicViewSwitcher, $ionicLoading, $stateParams, OrderService) {
        $scope.goList = function () {
            $ionicViewSwitcher.nextDirection('back');
            $state.go("list");
        };

        $scope.doDone = function(){

        };

        $ionicLoading.show({
            template: '订单明细加载中...'
        });

        OrderService.detail($stateParams.orderId).then(
            function(data){
                if(data.success){
                    $scope.data = data.data;
                }
                $ionicLoading.hide();
            },
            function(){
                $ionicLoading.hide();
            }
        );
    })
    .controller('ManualCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.goList = function(){
            $ionicViewSwitcher.nextDirection('back');
            $state.go("list");
        };

        $scope.doInput = function(){

        };
    })
    .controller('ScanCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading) {
        $scope.goList = function(){
            $ionicViewSwitcher.nextDirection('back');
            $state.go("list");
        };
        $scope.doScan = function(){

        };
    })