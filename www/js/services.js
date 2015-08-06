/**
 * Created by sczhang on 8/4/15.
 */

angular.module('ddApp.services', [])
    .factory("CommonService", function () {
        var service = {
            baseUrl: "http://localhost:8100/api/",
            buildUrl: function (subUrl) {
                return this.baseUrl + subUrl;
            },
            getTargetByIdentity: function (list, identity, value) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i][identity] == value)
                        return list[i];
                }
                return null;
            }
        };

        return service;
    })
    .factory("MockDB", function(CommonService){
        var itemData = [{
            id: "790DCE02-656F-4E0A-B6E9-23800747B410",
            name: "辣子肥肠",
            price: 26.00,
            src:"img/data/lzfc.jpg",
            bigSrc:"img/data/lzfc-big.jpg",
            info: "辣子肥肠，辣子肥肠是一道著名的汉族美食，属于川菜。重庆人把猪大肠叫做肥肠，听上去油腻腻的，做法也有很多，比如说红烧、炖汤，干煸等等，其中我觉得要数“辣子肥肠”最为好吃，因为这种做法先要将大肠水煮软，在要用小火爆干肠子里的油份，再加上放了很多辣椒和花椒吃起来麻辣可口，还能去掉大肠的腥味，吃上去有麻又辣，很是好吃，每次都要吃掉一大碗。"
        },{
            id: "94EC4FD5-C9E0-45F0-8822-FB2A6D2EF0AD",
            name: "宫爆鸡丁",
            price: 21.00,
            src:"img/data/gbjd.jpg",
            bigSrc:"img/data/gbjd-big.jpg",
            info: "宫保鸡丁，是一道闻名中外的汉族传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。该菜式的起源与鲁菜中的酱爆鸡丁，和贵州菜的胡辣子鸡丁有关，后被清朝山东巡抚、四川总督丁宝桢改良发扬，形成了一道新菜式——宫保鸡丁，并流传至今，此道菜也被归纳为北京宫廷菜。之后宫保鸡丁也流传到国外。"
        },{
            id: "0C729767-494C-42B6-9BEB-D5CC7B6332E0",
            name: "鱼香肉丝",
            price: 29.00,
            src:"img/data/yxrs.jpg",
            bigSrc:"img/data/yxrs-big.jpg",
            info: "鱼香肉丝，是一道经典的汉族传统名菜，鱼香是川菜主要传统味型之一。成菜具有鱼香味，但其味并不来自鱼，而是泡红辣椒、葱、姜、蒜、糖、盐、酱油等调味品调制而成。此法源出于四川地区民间独具特色的烹鱼调味方法，而今已广泛用于川味的熟菜中，具有咸甜酸辣兼备，葱姜蒜味突出的特色。"
        },{
            id: "D8EF3D65-F795-49F4-AC1D-FA1C03CDA00C",
            name: "冬瓜虾仁",
            price: 18.00,
            src:"img/data/dgxr.jpg",
            bigSrc:"img/data/dgxr-big.jpg",
            info: "冬瓜虾仁，油烧热，下虾仁滑油后倒进漏勺沥去油；原锅留余油回旺火上，下姜丝炒出香味，烹入绍酒，倒入清汤，加精盐、味精调味，倒入虾仁、冬瓜条、胡萝卜条炒匀，湿淀粉勾薄芡。淋上麻油。装盘即可！"
        },{
            id: "C9DF5DC6-2659-4977-B34F-EE2958D75AE9",
            name: "黄瓜鸡丁",
            price: 22.00,
            src:"img/data/hgjd.jpg",
            bigSrc:"img/data/hgjd-big.jpg",
            info: "黄瓜鸡丁，这是一道低脂，营养的家常菜。鸡肉的滑嫩，黄瓜脆爽，花生米的脆香，配上豆瓣酱汁浓味美，口味咸香微辣，是一道下饭、下酒的好菜，值得尝试！"
        },{
            id: "4F5975FB-72DF-48EA-8157-F36F6577C709",
            name: "糖醋里脊",
            price: 24.00,
            src:"img/data/tclj.jpg",
            bigSrc:"img/data/tclj-big.jpg",
            info: "糖醋里脊，糖醋里脊是经典汉族名菜之一。在浙江菜、鲁菜、川菜、粤菜和淮菜里都有此菜，以鲁菜的糖醋里脊最负盛名。糖醋里脊以猪里脊肉为主材，配以面粉，淀粉，醋等作料，酸甜可口，让人食欲大开。"
        },{
            id: "09112532-CBDF-499B-AB90-A7AC30441DA6",
            name: "羊血黄豆",
            price: 19.00,
            src:"img/data/yxhd.jpg",
            bigSrc:"img/data/yxhd-big.jpg",
            info: "羊血黄豆，麻辣羊血是浙江金传统的汉族名菜，属于浙菜。烧开一锅水，将切成3厘米见方的豆腐、羊血豆腐倒入，并加入少量料酒，焯一会儿捞出； 坐锅点火倒入食用油烧热，加入蒜片、葱段、姜片炒出香味后，加入羊血、豆腐翻少，再加入味精、盐、胡椒粉、料酒、高汤煨2-4分钟，倒入碗中； 锅中加入食用油烧热，加入花椒、干辣椒煸炒，倒在羊血豆腐上即可。"
        },{
            id: "1F46AECA-E357-47E3-AA97-2A544062BCE8",
            name: "黄瓜木耳",
            price: 20.00,
            src:"img/data/hgmr.jpg",
            bigSrc:"img/data/hgmr-big.jpg",
            info: "黄瓜木耳，黄瓜搭配木耳，排毒、减肥功效好：黄瓜中的丙醇二酸能抑制体内糖分转化为脂肪，从而达到减肥的功效。而木耳富含多种营养成分，被誉为“素中之荤”。木耳中的植物胶质，有较强的吸附力，可将残留在人体消化系统中的某些杂质集中吸附，再排出体外，从而起到排毒清肠的作用。二者混吃可达到减肥、滋补强壮、和血、平衡营养之功效。"
        },{
            id: "29C13C19-A998-4765-B3EE-28997D670716",
            name: "凉拌木耳",
            price: 16.00,
            src:"img/data/lbmr.jpg",
            bigSrc:"img/data/lbmr-big.jpg",
            info: "凉拌木耳，1、鲜木耳含有一种卟啉的光感物质，人食用后经太阳照射可引起皮肤瘙痒、水肿，严重的可致皮肤坏死。干木耳是经暴晒处理的成品，在暴晒过程中会分解大部分卟啉，而在食用前，干木耳又经水浸泡，其中含有的剩余卟啉会溶于水，因而水发的干木而可安全食用；2、优质木耳表面黑而光润，有一面呈灰色，手摸上去感觉干燥，无颗粒感，嘴尝无异味。假木耳看上去较厚，分量也较重，手摸时有潮湿或颗粒感，嘴尝有甜或咸味(一般用糖或盐水浸泡过)。"
        }];

        var locationData = [{
            id: "941F52E9-7CDC-4D68-A014-91C6CC2E2158",
            longitude: 121.506191,
            latitude: 31.245554,
            name: "地点 － A"
        }, {
            id: "E5C120CC-1B12-452C-B522-BEBE1176ADF2",
            longitude: 121.502191,
            latitude: 31.225554,
            name: "地点 － B"
        }, {
            id: "CEA621EC-AC8C-4406-A4FA-D4FAACA7F645",
            longitude: 121.510191,
            latitude: 31.223514,
            name: "地点 － C"
        }, {
            id: "CEB0AB1E-7C0D-4B4C-88FE-106C07123DC8",
            longitude: 121.501141,
            latitude: 31.256514,
            name: "地点 － D"
        }, {
            id: "91D6C010-56D3-47D6-8D3F-DCAEF1048533",
            longitude: 121.521641,
            latitude: 31.256214,
            name: "地点 － E"
        }, {
            id: "8CC3E2FA-5B96-4C08-9B37-E2F9F3613B4F",
            longitude: 121.511121,
            latitude: 31.254524,
            name: "地点 － F"
        }, {
            id: "7EE12EA0-8643-4987-BE74-5C3560437129",
            longitude: 121.501341,
            latitude: 31.251524,
            name: "地点 － G"
        }];

        var timeData = [{
            id: "386C863D-392A-454D-8108-1A411DDAC63F",
            name: "8:00"
        }, {
            id: "8D23A4ED-7A02-4DAE-9150-1B1FC227CFA2",
            name: "8:30"
        }, {
            id: "A2AD473B-9FD3-48DE-98EF-0F03B9857DB6",
            name: "9:00"
        }, {
            id: "0004298F-54A6-4809-998B-CE8946ACEE38",
            name: "9:30"
        }, {
            id: "D4733A55-EA89-4AA9-8790-EC184211F594",
            name: "10:00"
        }];

        var random = function(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        };

        var orderData = [{
            id: "EAD25B08-A0C1-47BF-816C-AF13059BC1EA",
            code: "12345678",
            qrSrc: "img/data/qrCode.png",
            total: 50,
            pickTime: timeData[random(0, timeData.length)].name,
            date: new Date(2015, 1, 3)
        }, {
            id: "9F025B77-F61D-432C-8FB4-D82EACCCFF17",
            code: "23456789",
            qrSrc: "img/data/qrCode.png",
            total: 60,
            pickTime: timeData[random(0, timeData.length)].name,
            date: new Date(2015, 3, 6)
        }, {
            id: "D8509980-F5E5-41A6-8F6B-02930E12D220",
            code: "34567890",
            qrSrc: "img/data/qrCode.png",
            total: 55,
            pickTime: timeData[random(0, timeData.length)].name,
            date: new Date(2015, 4, 8)
        }, {
            id: "15504F6B-4FF1-4645-84A0-B0C2CEE8DB30",
            code: "45678901",
            qrSrc: "img/data/qrCode.png",
            total: 35,
            pickTime: timeData[random(0, timeData.length)].name,
            date: new Date(2015, 5, 2)
        }, {
            id: "B5A2BB27-EC5A-42C5-9646-AC0DF209A1AF",
            code: "56789012",
            qrSrc: "img/data/qrCode.png",
            total: 75,
            pickTime: timeData[random(0, timeData.length)].name,
            date: new Date(2015, 6, 7)
        }];

        var buildOrderDetail = function(order){
            var result = {};
            result.id = order.id;
            result.code = order.code;
            result.qrSrc = "img/data/qrCode.png";
            result.total = order.total;
            result.date = order.date;

            result.location = locationData[random(0, locationData.length)].name;
            result.pickTime = timeData[random(0, timeData.length)].name;
            result.orders = [];

            var length = random(5, 10);
            for(var i=0; i < length; i++) {
                var source = itemData;
                var item = source[random(0, source.length)];
                var added = false;

                var item = angular.copy(item);
                item.count = random(1 , 5);

                for(var j=0; j< result.orders.length; j++) {
                    if(result.orders[j]. id == item.id) {
                        i--;
                        added = true;
                        break;
                    }
                }

                if(!added)
                    result.orders.push(item);
            }

            return result;
        };

        var getOrderDetailById = function(orderId){
            var order = CommonService.getTargetByIdentity(orderData, "id", orderId);
            if(order != null)
                return buildOrderDetail(order);
            return null;
        };

        var getOrderByCode = function (orderCode) {
            var order = CommonService.getTargetByIdentity(orderData, "code", orderCode);
            return order;
        }

        return {
            orderData: orderData,
            getOrderDetailById: getOrderDetailById,
            getOrderByCode: getOrderByCode
        };
    })
    .factory("OrderService", function($q, $http, $timeout, MockDB){
        return {
            all: function(){
                var deferred = $q.defer();

                $timeout(function () {
                    deferred.resolve({
                        success : true,
                        data: MockDB.orderData
                    });
                }, 400);

                return deferred.promise;
            },
            detailById: function(orderId){
                var deferred = $q.defer();

                $timeout(function () {
                    deferred.resolve({
                        success : true,
                        data: MockDB.getOrderDetailById(orderId)
                    });
                }, 420);

                return deferred.promise;
            },
            itemByCode : function(orderCode){
                var deferred = $q.defer();

                $timeout(function () {
                    deferred.resolve({
                        success : true,
                        data: MockDB.getOrderByCode(orderCode)
                    });
                }, 420);

                return deferred.promise;
            }
        };
    })