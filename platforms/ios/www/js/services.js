/**
 * Created by sczhang on 8/4/15.
 */

angular.module('ddApp.services', [])
    .factory("CommonService", function () {
        var service = {
            baseUrl: "http://localhost:3000/",
            buildUrl: function (subUrl) {
                return this.baseUrl + subUrl;
            }
        };

        return service;
    })
    .factory('AuthenticationService', function ($rootScope, $localStorage, $http, CommonService) {
        var utility = {
            doLoginLocal: function (data) {
                if (data.success === true) {
                    $http.defaults.headers.common.authenticationToken = data.data.authenticationToken;
                    $localStorage.isLogin = true;
                    $localStorage.authenticationToken = data.data.authenticationToken;
                }
            },
            setHttpAuth: function () {
                if ($localStorage.isLogin === true && $localStorage.authenticationToken != null)
                    $http.defaults.headers.common.authenticationToken = $localStorage.authenticationToken;
            }
        };
        var service = {
            login: function (user) {
                return $http.post(CommonService.buildUrl('login'), user).success(function (data, status, headers, config) {
                    utility.doLoginLocal(data);
                });
            },
            logout: function () {
                $localStorage.isLogin = false;
                $localStorage.authenticationToken = null;
                $http.post(CommonService.buildUrl('logout'), {});
                delete $http.defaults.headers.common.authenticationToken;
            },
            isLogin: function () {
                return $localStorage.isLogin === true && $localStorage.authenticationToken != null;
            },
            isNeedLogin: function (stateData) {
                if (stateData == null)
                    return false;

                return stateData.requiredLogin === true;
            },
            setHttpAuth: function () {
                utility.setHttpAuth();
            }
        };
        return service;
    })
    .factory("OrderService", function($http, CommonService, AuthenticationService){
        return {
            all: function(){
               AuthenticationService.setHttpAuth();
               return $http.get(CommonService.buildUrl('orders'));
            },
            detailById: function(orderId){
                AuthenticationService.setHttpAuth();
                return $http.get(CommonService.buildUrl('detail/' + orderId));
            },
            itemByCode : function(orderCode){
                AuthenticationService.setHttpAuth();
                return $http.get(CommonService.buildUrl('order/' + orderCode));
            }
        };
    })