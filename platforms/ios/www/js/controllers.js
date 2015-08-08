/**
 * Created by sczhang on 8/4/15.
 */
angular.module('ddApp.controllers', ['ddApp.services'])
    .factory("Utility", function (AuthenticationService) {
        return {
            handleUnauthenticated: function ($state, $ionicPopup, $ionicViewSwitcher) {
                $ionicPopup.alert({ title: '获取用户信息失败', template: "请重新登陆，谢谢！", okText: '确定' }).then(function () {
                    AuthenticationService.logout();
                    $ionicViewSwitcher.nextDirection('forward');
                    $state.go('login');
                });
            },
            checkIsLogin: function(status){
                if(status == 403)
                    return false;
                return true;
            }
        }
    })
    .controller('LoginCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading, AuthenticationService) {
        $scope.user = {
            name: null,
            password: null
        };

        $scope.doLogin = function() {
            var user = $scope.user;

            $ionicLoading.show({
                template: '用户登录中...'
            });
            AuthenticationService.login({ name: user.name, password: user.password }).success(function (data, status, headers, config) {
                $ionicLoading.hide();
                if (data.success !== true) {
                    $ionicPopup.alert({ title: '用户登录失败', template: data.data.message, okText: '确定' });
                }
                else {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicViewSwitcher.nextDirection('forward');
                    $state.go('list', {}, {reload: true });
                }
            }).error(function (data, status, headers, config) {
                $ionicLoading.hide();
                $ionicPopup.alert({ title: '用户登录失败', template: '请检查您的网络连接是否正常！', okText: '确定' });
            });
       }
    })
    .controller('ListCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading, $cordovaBarcodeScanner, AuthenticationService, OrderService, Utility) {
        $scope.now = new Date();

        $scope.doLogout = function () {
            $ionicViewSwitcher.nextDirection('back');
            AuthenticationService.logout();
            $state.go("login");
        };

        $scope.goDetail = function (orderId) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("detail", {orderId: orderId}, {reload: true});
        };

        var working = false;
        var doScan = function(){
            if(working)
                return;
            
            working = true;
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                if(imageData.text != null && imageData.text != ''){
                    $ionicPopup.alert({ title: '扫描成功', template: "订单:" + imageData.text, okText: '确定' }).then(function () {
                            $ionicLoading.show({
                                template: '订单查询中...'
                            });
                            OrderService.itemByCode(imageData.text).success(function(data, status){
                                $ionicLoading.hide();

                                if(!Utility.checkIsLogin(data.code)){
                                    Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                                    return;
                                }

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
                            }).error(function(data, status){
                                $ionicLoading.hide();

                                if(!Utility.checkIsLogin(status)){
                                    Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                                    return;
                                }

                                $ionicPopup.alert({ title: '订单查询失败', template: '请检查您的网络连接是否正常！', okText: '确定' });
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
                working = false;
            }, function(error) {
                $ionicPopup.alert({ title: '扫描失败', template: error, okText: '确定' }).then(function () {
                    $ionicViewSwitcher.nextDirection('back');
                    $state.go("list");
                });
                working = false;
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

        OrderService.all().success(
            function(data, status){
                $ionicLoading.hide();

                if(!Utility.checkIsLogin(data.code)){
                    Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                    return;
                }

                if(data.success){
                    $scope.orders = data.data;
                }
            }).error(
            function(data, status){
                $ionicLoading.hide();

                if(!Utility.checkIsLogin(status)){
                    Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                    return;
                }

                $ionicPopup.alert({ title: '派送列表加载失败', template: '请检查您的网络连接是否正常！', okText: '确定' });
            });
    })
    .controller('DetailCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicViewSwitcher, $ionicLoading, $stateParams, OrderService, Utility) {
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

        OrderService.detailById($stateParams.orderId).success(
            function(data, status){
                $ionicLoading.hide();

                if(!Utility.checkIsLogin(data.code)){
                    Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                    return;
                }

                if(data.success){
                    $scope.data = data.data;
                }
            }).error(
            function(data, status){
                $ionicLoading.hide();

                if(!Utility.checkIsLogin(status)){
                    Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                    return;
                }

                $ionicPopup.alert({ title: '订单明细加载失败', template: '请检查您的网络连接是否正常！', okText: '确定' });
            });
    })
    .controller('ManualCtrl', function ($scope, $state, $ionicPopup, $ionicHistory, $ionicViewSwitcher, $ionicLoading, OrderService, Utility) {
        $scope.data = { orderCode : null };

        $scope.goList = function(){
            $ionicViewSwitcher.nextDirection('back');
            $state.go("list");
        };

        $scope.doInput = function(){
            $ionicLoading.show({
                template: '订单查询中...'
            });
            OrderService.itemByCode($scope.data.orderCode).success(function(data, status){
                    $ionicLoading.hide();

                    if(!Utility.checkIsLogin(data.code)) {
                        Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                        return;
                    }

                    if(data.success && data.data != null){
                        $state.go("detail", {orderId: data.data.id}, {reload: true});
                    }
                    else {
                        $ionicPopup.alert({title: '派餐系统', template: '订单未找到～', okText: '确定'});
                    }
                }).error(function(data, status){
                    $ionicLoading.hide();

                    if(!Utility.checkIsLogin(status)) {
                        Utility.handleUnauthenticated($state, $ionicPopup, $ionicViewSwitcher);
                        return;
                    }

                    $ionicPopup.alert({ title: '订单查询失败', template: '请检查您的网络连接是否正常！', okText: '确定' });
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