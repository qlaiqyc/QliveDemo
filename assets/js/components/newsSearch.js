/**
 * Created by zhaotao on 2017/4/11.
 */

PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common" :'common',
        "memory" :'memory',
        "remote":"/assets/js/components/common/data-api"
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){

            var common = this.common,
                memory = this.memory,
                remote = this.remote;

            common.mobileBottomMenu();
            common.mobileReturnUp();
            var pageUtil = {};

            $("input.new-search").focus();

            FunUtil.searchHistory = function(){
                var inputVal = $.trim($(".new-search").val());
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

                    if(search.length>11){
                        search = search.slice(-11,-1);
                    }else{
                        search = search.slice(-search.length,-1);
                    }

                    for(var i= search.length - 1;i>=0;i--){
                        buf+=("<a class='new-search-history-detail-li'>"+search[i]+"</a>");
                    }
                    $(".search-history-detail").html(buf);

                    $(".search-history-detail-del").unbind('click').bind("click", function (){
                        window.localStorage.removeItem("search");
                        $(".history,.search-history-detail").hide();
                    });

                    $(".new-search-history-detail-li").unbind('click').bind("click",function(){
                        var inputVal = $(this).text();
                        $(".new-search").val(inputVal);
                        FunUtil.searchHistory();
                        PageInfo.FunUtil.common4openUrl({"url":"news?keyword="+escape(inputVal)});
                    });

                    $("a.search-cancel").unbind("click").bind("click",function(){
                        PageInfo.FunUtil.common4openUrl({"url":"search"});
                    });

                }
            };

            pageUtil.init = function(){
                FunUtil.init = function(){

                    $("#new-search-inaccount-head-del").unbind('click').bind("click",function(){
                        $("input.new-search").val("").focus();
                        $(this).hide();
                        $(".search-cancel").show();
                        $(".search-yes").hide();
                    });

                    $(".search-yes").unbind("click").bind("click",function(){
                        var inputVal = $.trim($(".new-search").val());
                        if(inputVal){
                            FunUtil.searchHistory();
                            PageInfo.FunUtil.common4openUrl({"url":"news?keyword="+escape(inputVal)});
                        }
                    });

                    $("input.new-search").unbind('keyup').bind("keyup",function(e){
                        var inputVal = $.trim($(".new-search").val());

                        if(inputVal){
                            $("#new-search-inaccount-head-del").show();
                            $(".search-cancel").hide();
                            $(".search-yes").show();
                        }else{
                            $("#new-search-inaccount-head-del").hide();
                            $(".search-cancel").show();
                            $(".search-yes").hide();
                        }

                        if(e.keyCode == '13'&&inputVal != ""){
                            FunUtil.searchHistory();
                            remote.search.getCmsMediaCount(inputVal,function(data){
                                var nowPage = 1;
                                var page =Math.ceil(data/10);
                                PageInfo.FunUtil.common4openUrl({"url":"news?pageSize=10&&pageNumber="+page+"&&keyword="+escape(inputVal)});
                            });
                        }

                    });


                    $(".recommend-li span").unbind("click").bind("click",function(){
                        var inputVal = $(this).text();
                        $(".new-search").val(inputVal);
                        FunUtil.searchHistory();
                        PageInfo.FunUtil.common4openUrl({"url":"news?keyword="+escape(inputVal)});
                    });

                    HtmUtil.searchHistoryDeatil();
                };
                FunUtil.init();
            };
            pageUtil.init();
        };
        return Page;

    };

    return PageObj;
}});

