PageInfo.register({"type": "plug","info": function(require) {
    var apiCommon = require('api-common');
    var memory = require('memory');
    var urlBase = memory.urlBase;
    var getData = apiCommon.getCommonData;
    var getLoginDataSync = apiCommon.getNeedLoginDataSync;
    
    //  + 分享
    var common4share = function(data){
    	var FunUtil = {};
    	var wxcfg	= {};
    	
    	FunUtil.common4request = function(url,success){
    		
    			console.log("=====");
    		console.log(getData);
    		
    		getData(location.origin + "/xdnphb/login/wxyz/" + "showdata", {"url": url}, success);//获取微信自定义数据接口
    	};
    	
    	FunUtil.common4getWXcfg = function(callback){
 			 
 			//if(!$.isEmptyObject(wxcfg)) return callback(wxcfg); 
 			
			var url = window.location.href;
			url = url.replace(/\&/g,"@@@");//针对url有多个参数
				
			FunUtil.common4request(url,function(data){ 
				callback(wxcfg);
			});
 		};
 		
 		FunUtil.common4Share = function(option) {
			
			var cfg		= option.wx;
			var data	= option.data;

			var nonceStr	= cfg.nonceStr;
			var timestamp	= cfg.timestamp;
			var signature	= cfg.signature;
			var appid		= cfg.appid;
			 
			wx.config({
				debug: false,
				appId: appid,
				timestamp:timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: ['checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'showMenuItems',
				/*	'hideMenuItems',*/
					"chooseImage",
					"previewImage",
					"uploadImage",
					"downloadImage",
				/*	'hideAllNonBaseMenuItem' */
				]
			});

			wx.ready(function(){
				 FunUtil.Glob.title = data.name+"("+data.account+")"+'-号内搜';
				
				 FunUtil.common4WXupdate(option);

				//wx.hideAllNonBaseMenuItem();//隐藏所有按钮
				wx.showMenuItems({
					menuList: ['appMessage','menuItem:share:timeline','menuItem:share:timeline','menuItem:share:appMessage','menuItem:share:qq'] // 要显示的菜单项，所有menu项见附录3，显示的按钮
				});
			});

		};
		
		FunUtil.common4WXupdate = function(option){
			var data = option.data;
			var title		= data.title;
			var desc		= data.desc;
			var link		= data.link;
			var imgUrl		= data.imgUrl;
			
			wx.onMenuShareTimeline({
				title: title, // 分享标题 朋友圈
				link: link, // 分享链接
				imgUrl : imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});

			wx.onMenuShareAppMessage({
				title: title,// 分享标题 发给朋友
				desc: desc, // 分享描述
				link: link, // 分享链接
				imgUrl : imgUrl, // 分享图标
				type: '',
				dataUrl: '',
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareQQ({
				title: title, // 分享标题 分享qq
				desc: desc, // 分享描述
				link: link, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
		};
 		
 		//分享执行
 		
 		FunUtil.common4getWXcfg(function(cfg){
 			
 			
			FunUtil.common4Share({"wx":cfg,"data":data});
		});
    	
    	
    	
    };
    

    var original = (function(){
        var originalUrl = urlBase + "m/";
        return {
            'getOriginalIncidentAll':function(success){
                getData(originalUrl + "getOriginalIncidentAll", {}, success);
            },
            'getIncidentById':function(id,success){
                getLoginDataSync(originalUrl + "getIncidentById", {id:id},false, success);
            },
            'getOriginalArticle':function(filters,pageNumber,pageSize,success){
                getData(originalUrl + "getOriginalArticle", {filters: filters,pageNumber:pageNumber,pageSize:pageSize}, success);
            },
            'getOriginalArticleCount':function(filters,success){
                getLoginDataSync(originalUrl + "getOriginalArticleCount", {filters:filters},false,success);
            },
            'getOriginalArticleTopic':function(filters,success){
                getData(originalUrl + "getOriginalArticleTopic", {filters:filters},success);
            },
            'getOriginalHotArticle':function(filters,success){
                getData(originalUrl + "getOriginalHotArticle", {filters:filters},success);
            },
            'getOriginalHotSearch':function(filters,pageNumber,pageSize,success){
                getData(originalUrl + "getOriginalHotSearch", {filters: filters,pageNumber:pageNumber,pageSize:pageSize},success);
            },
            'getOriginalHotSearchCount':function(filters,success){
                getLoginDataSync(originalUrl + "getOriginalHotSearchCount", {filters: filters},false,success);
            },
            getTop500:function(filters,success){
                getData(originalUrl + "getTop500", {filters:filters}, success);
            }
        }
    }());

    var apiList = (function(){
        var listUrl = urlBase + "list/";
        return {
            getList: function(period, type, rank_name_group, rank_name, start, end, success) {
                getData(listUrl + period + "/" + type, {"rank_name_group":rank_name_group, "rank_name": rank_name, "start": start, "end": end}, success);
            },
            getDate: function(success) {
                getLoginDataSync(listUrl + "getDate", {},false, success);
            }
        };
    }());

    var search = (function(){
        var searchUrl = urlBase + "data/weixinuser/",
            zixunUrl = urlBase + "index/",
            mobileUrl = urlBase + "m/";

        return {
            getBannerList:function(success){
                getData(mobileUrl + "getBannerList",{},success)
            },
            getCmsMedia:function(type,success){
                getData(mobileUrl + "getCmsMedia",{"type":type},success)
            },
            getCmsMediaList:function(pageNumber,pageSize,success){
                getData(mobileUrl + "getCmsMediaList",{"pageNumber":pageNumber,"pageSize":pageSize},success)
            },
            getCmsMediaListCount:function(success){
                getData(mobileUrl + "getCmsMediaListCount",{},success)
            },
            getCmsMediaAll:function(pageNumber,pageSize,keyword,success){
                getData(mobileUrl + "getCmsMediaAll",{"pageNumber":pageNumber,"pageSize":pageSize,"keyword":keyword},success)
            },
            getCmsMediaCount:function(keyword,success){
                getData(mobileUrl + "getCmsMediaCount",{"keyword":keyword},success)
            },
            getOriginalIncident:function(limit,success){
                getData(mobileUrl + "getOriginalIncident",{"limit":limit},success)
            },
            getHotArticleCount:function(success){
                getData(mobileUrl + "getHotArticleCount",{},success)
            },
            getHotArticle:function(pageNumber,pageSize,success){
                getData(mobileUrl + "getHotArticle",{"pageNumber":pageNumber,"pageSize":pageSize},success)
            },
            searchWeixinDataByCondition:function(keyName,order,filter,hasDeal, success){
                getData(searchUrl + "searchWeixinDataByCondition", {"keyName": keyName,"order":order,"filter":filter,"hasDeal":hasDeal}, success);
            },
            getMedia:function(pageSize,pageNumber,keyword, success){
                getData(zixunUrl + "getMedia", {"pageSize": pageSize,"pageNumber":pageNumber,"keyword":keyword}, success);
            }
        }
    }());

    var detail = (function(){
        var detailUrl = urlBase + "m/";
        return {
            'getAccountDetail':function(account,success){
                getLoginDataSync(detailUrl + "getAccountDetail", {account:account},false, success);
            },
            'getAccountCard':function(account,success){
                getData(detailUrl + "getAccountCard", {account:account}, success);
            },
            'getAccountArticle':function(account,success){
                getLoginDataSync(detailUrl + "getAccountArticle", {account:account}, false,success);
            }
        }
    }());

    var common = (function(){
        var loginUrl = urlBase + "login/wxyz/";
        return {
            showdata:function(url, success){
                getData(loginUrl + "showdata", {"url": url}, success);
            }
        }
    }());

    var user = (function(){
        var bangdouUrl = urlBase + "user/bangdou/";
        var profile_url = urlBase+"user/profile/";
        var baseUrl = urlBase + "account/bangdou/cdkey/";
        var accountUrl = urlBase + "account/bangdou/";


        return {
            consumeDetailAndBangDou: function(pageNum,success) {
                getData(bangdouUrl + "consumeDetailAndBangDou", {pageNum:pageNum}, success);
            },
            search:function(success){
                getData(profile_url +"weixin/search",{},success)
            },
            exchangeBangdou:function(cdkey,success){
                getData(baseUrl + 'exchangeBangdou',{cdkey:cdkey},success);
            },
            coupon:function(success){
                getData(accountUrl + 'coupon',{},success);
            }
        }


    }());



    return {
        original:original,
        apiList:apiList,
        search:search,
        detail:detail,
        common:common,
        user:user,
        common4share:common4share
    };

}});