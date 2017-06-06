/**
 * Created by zhaotao on 2017/4/11.
 */

PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common" :'common',
        "memory" :'memory',
        "remote" :"/assets/js/components/common/data-api"
    };

    PageObj.page = function(){
        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){
            var common = this.common;

            common.mobileBottomMenu('index');
            common.mobileReturnUp();
            FunUtil.Global = {};

            $("input.search").focus();
            //$(".search-cancel").hide();
            //$(".search-yes").show();

            FunUtil.searchHistory = function(){
                var inputVal = $.trim($(".search").val());
                if(window.localStorage.search == undefined){
                    window.localStorage.setItem("search",inputVal+"|");
                }else{
                    if(window.localStorage.getItem("search").indexOf(inputVal) != -1){
                        window.localStorage.setItem("search",window.localStorage.getItem("search").replace(inputVal+"|","")+inputVal+"|");
                    }
                    if(window.localStorage.getItem("search").indexOf(inputVal) == -1){
                        window.localStorage.setItem("search",window.localStorage.getItem("search")+inputVal+"|");
                    }
                }
            };

            HtmUtil.searchHistoryDeatil = function(){
                if(window.localStorage.search == undefined){
                    $(".history,.search-history-detail").hide();
                }else{
                    $(".history,.search-history-detail").show();
                    var search = window.localStorage.search.split("|"),buf="";
                    if(search.length>=11){
                        search = search.slice(-11,-1);
                    }else{
                        search = search.slice(-search.length,-1)
                    }
                    for(var i= search.length - 1;i>=0;i--){
                        buf+=("<a class='search-history-detail-li'>"+search[i]+"</a>");
                    }
                    $(".search-history-detail").html(buf);
                    $(".search-history-detail-del").unbind('click').bind("click",function (){
                        window.localStorage.removeItem("search");
                        $(".history,.search-history-detail").hide();
                    });
                    $(".search-history-detail-li").unbind('click').bind("click",function () {
                        var inputVal = $(this).text();
                        $("input.search").val(inputVal);
                        FunUtil.searchHistory();
                        PageInfo.FunUtil.common4openUrl({"url":'wechatSubscription?value='+ escape(inputVal)});
                    });
                }
            };

            FunUtil.Global.init = function(){
                FunUtil.init = function() {

                    $(".information").unbind("click").bind("click", function () {
                        PageInfo.FunUtil.common4openUrl({"url":'newsSearch'});
                    });

                    $(".wechat-subscription").unbind("click").bind("click", function () {
                        $("input.search").attr("placeholder","搜索公众号");
                    });

                    $("#search-inaccount-head-del").unbind("click").bind("click", function () {
                        $(".search").val("").focus();
                        $(this).hide();
                        $(".search-cancel").show();
                        $(".search-yes").hide();
                    });

                    $("div.search-yes").unbind("click").bind("click", function () {
                        var inputVal = $.trim($("input.search").val());
                        if (inputVal) {
                            FunUtil.searchHistory();
                            PageInfo.FunUtil.common4openUrl({"url":'wechatSubscription?value='+ escape(inputVal)});
                        }
                    });

                    $("span.search-cancel").unbind("click").bind("click", function () {
                        PageInfo.FunUtil.common4openUrl({"url":'index'});
                    });

                    $('.search').unbind('keyup').bind('keyup',function(e){
                        var inputVal = $.trim($(this).val());

                        if(inputVal !=""){
                            $("#search-inaccount-head-del").show();
                            $(".search-cancel").hide();
                            $(".search-yes").show();
                        }else{
                            $("#search-inaccount-head-del").hide();
                            $(".search-cancel").show();
                            $(".search-yes").hide();
                        }

                        if ( e.keyCode == '13') {
                            if (inputVal != "") {
                                FunUtil.searchHistory();
                                PageInfo.FunUtil.common4openUrl({"url":'wechatSubscription?value='+ escape(inputVal)});
                            }
                        }
                    });

                    HtmUtil.searchHistoryDeatil();
                };
                FunUtil.init();
            };
            FunUtil.Global.init();

        };

        return Page;
    };

    return PageObj;
}});


