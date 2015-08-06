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
    .controller('ListCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading, $cordovaBarcodeScanner, OrderService) {
        $scope.now = new Date();

        $scope.doLogout = function () {
            $ionicViewSwitcher.nextDirection('back');
            $state.go("login");
        };

        $scope.goDetail = function (orderId) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("detail", {orderId: orderId}, {reload: true});
        };

        var doScan = function(){
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                if(imageData.text != null && imageData.text != ''){
                    $ionicPopup.alert({ title: '扫描成功', template: "订单:" + imageData.text, okText: '确定' }).then(function () {
                            $ionicLoading.show({
                                template: '订单查询中...'
                            });
                            OrderService.itemByCode(imageData.text).then(function(data){
                                $ionicLoading.hide();
                                if(data.success && data.data != null){
                                    $ionicViewSwitcher.nextDirection('forward');
                                    $state.go("detail", {orderId: data.data.id}, {reload: true});
                                }
                                else {
                                    $ionicPopup.alert({title: '派餐系统', template: '订单未找到～', okText: '确定'}).then(function(){
                                        $ionicViewSwitcher.nextDirection('back');
                                        $state.go("list");
                                    });
                                }
                            },
                            function(){
                                $ionicLoading.hide();
                            });
                    });
                }
                else{
                    $ionicPopup.confirm({ title: '扫描失败',
                        template: '是否重新扫描?',
                        cancelText: '取消',
                        okText: '重新扫描'
                    }).then(function(yes) {
                        if (yes)
                            doScan();
                        else {
                            $ionicViewSwitcher.nextDirection('back');
                            $state.go("list");
                        }
                    });
                }
            }, function(error) {
                $ionicPopup.alert({ title: '扫描失败', template: error, okText: '确定' }).then(function () {
                    $ionicViewSwitcher.nextDirection('back');
                    $state.go("list");
                });
            });
        };

        $scope.goScan = doScan;

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

        $scope.goBack = function(){
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.goBack();
        };

        $scope.doDone = function(){

        };

        $ionicLoading.show({
            template: '订单明细加载中...'
        });

        OrderService.detailById($stateParams.orderId).then(
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
    .controller('ManualCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading, OrderService) {
        $scope.data = { orderCode : null };

        $scope.goList = function(){
            $ionicViewSwitcher.nextDirection('back');
            $state.go("list");
        };

        $scope.doInput = function(){
            $ionicLoading.show({
                template: '订单查询中...'
            });
            OrderService.itemByCode($scope.data.orderCode).then(function(data){
                    $ionicLoading.hide();
                    if(data.success && data.data != null){
                        $state.go("detail", {orderId: data.data.id}, {reload: true});
                    }
                    else {
                        $ionicPopup.alert({title: '派餐系统', template: '订单未找到～', okText: '确定'});
                    }
                },
                function(){
                    $ionicLoading.hide();
            });
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