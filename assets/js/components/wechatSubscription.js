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
            var common      = this.common,
                memory      = this.memory,
                remote      = this.remote,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                doNull      = common.doNull,
                value       = request["value"],
                auth        = request["auth"];

            common.mobileBottomMenu('index');
            common.mobileReturnUp();
            FunUtil.Global={ "filter":''};

            HtmUtil.init = function(data,brand,keyWords){
                if(data == "" && brand == null){
                    $(".hover-all-wx-type span").removeClass("wx-selected-detail");
                    $(".wechat-choose").hide();
                    $(".wechat-content").append(
                        "<div class='wechat-content-li' style='background: rgb(246,246,246);display: block;margin-top: 8.85rem;text-align: center;'>" +
                        "<img src='/m/assets/img/result-empty.png' style='width:6.78rem'>" +
                        "<p style='font-size: 1rem;line-height: 1rem;margin-top:2rem;color:rgb(153,153,153);'>抱歉，没有搜到和"+'"'+keyWords+'"'+"相关的公众号</p>" +
                        "<p style='font-size: 1rem;line-height: 1rem;margin-top:1.14rem;color:rgb(153,153,153);'>换个词试试?</p>"+
                        "</div>"
                    );
                }else{
                    $(".wechat-choose").show();
                    $.each(data,function(i,item){
                        var arr = ((item.tags!=null&&item.tags.length >= 5)?item.tags.slice(0,5):(item.tags!=null&&item.tags.length <5)?item.tags:''),
                            marginLeft = item.type == null ? 0 : "0.35rem",showHide = (item.certifiedText == null||item.certifiedText == "") ? "none" :"block",iconXdnV = (item.certifiedText != null) ? "icon-xdn-v1" : "";
                        var wxIndexNum = item.weekLog1pmark&&parseFloat(item.weekLog1pmark)>0?parseFloat(item.weekLog1pmark).toFixed(1):(item.weekLog1pmark&&parseFloat(item.weekLog1pmark)<0&&item.inGetDb==null)?"尚未入库":"--/-";
                        $(".wechat-content").append("<div class='wechat-content-li' account='"+item.account+"' ingetdb='"+item.inGetDb+"'>" +
                            "<div class='wechat-content-li-left'>" +
                            "<div class='wx_lp'>" +
                            "<div class='wx_logo'>" +
                            "<a style='background: url(http://open.weixin.qq.com/qr/code/?username="+item.wxId+") no-repeat -173px -173px;'></a></div>" +
                            "</div></div>"+
                            "<div class='wechat-content-li-right'>" +
                            "<h3 class='wx_title'>"+item.name+"</h3>"+
                            "<div class='wxh clearfix'>"+(item.account == null ? "" : item.account)+"</div>"+
                            "<p class='wx_label'>"+(item.type == null ? "" : item.type)+
                            "<span class='wx-label "+item.account+"' style='margin-left:"+marginLeft+"'></span>"+
                            "</p>"+
                            "<p class='wx-v' style='display:"+showHide+"'><span class='auth-span' title='点击搜索同主体公众号'>"+((item.certifiedText == null||item.certifiedText == "") ? '' : item.certifiedText.split('：')[1])+"</span><span class='iconfont "+iconXdnV+"'></span></p>"+
                            "<p class='wx_description'>"+doNull(item.description)+"</p>"+
                            "<p class='wx_index_num'>"+wxIndexNum+"</p>"+
                            "</div>"+
                            "</div>");

                        for(var i= 0;i<arr.length;i++){
                            var itemLabel=item.account;
                            $('.'+itemLabel).append("<span class='itemLabel-li'>"+arr[i]+"</span>");
                        }

                        for(var j=0;j<$(".wx_index_num").length;j++){
                            if($(".wx_index_num:eq("+(j)+")").text() == "尚未入库"){
                                $(".wx_index_num:eq("+(j)+")").css("font-size","1rem");
                            }
                        }

                        $(".wechat-content-li").unbind("click").bind("click",function(){
                            var account = $(this).attr("account"),ingetdb = $(this).attr("ingetdb");
                            if(ingetdb == "null"){
                                common.showMobileTip('当前无数据');
                            }else{
                                PageInfo.FunUtil.common4openUrl({"url":'detail?account='+account});
                            }
                        })
                    });

                    $(".auth-span").unbind("click").bind("click",function(){
                        var val = $(this).text();
                        $(".wechat-content .wechat-content-li,.wechat-content-brand-li,.wechat-number").remove();
                        $("input.weChat-search").val("v:"+val);

                        var filter = "auth",order;
                        $(".wechat-choose").find("span.wx-selected-detail").each(function(){
                            filter += $(this).attr("sv")+"|";
                        });

                        order = $(".wx-selected").text() == "新榜指数" ?"NRI" : "relation";

                        $(".m-loading").show();
                        remote.search.searchWeixinDataByCondition(val,order,filter,false,function(data){
                            if(data.total > 0){
                                $(".wechat-content").append(
                                    "<div class='wechat-number'><span class='wechat-company'><i class='iconfont icon-xdn-gouxuan'></i>"+val.substr(0,12)+"</span><p class='wechat-company-number'>累计认证数<span>"+data.total+"</span></p></div>"
                                );
                            }
                            if(data.brand.brandMap != null){
                                HtmUtil.brand(data.brand.brandMap);
                            }
                            HtmUtil.init(data.result,data.brand.brandMap,val);
                            $(".m-loading").hide();

                        })
                    })

                    $(".itemLabel-li").unbind('click').bind("click",function(){
                        var val = $(this).text();
                        $(".wechat-content .wechat-content-li,.wechat-content-brand-li,.wechat-number").remove();
                        $(this).addClass("label-choose");
                        $("input.weChat-search").val("tag:"+val);

                        var filter = "tags",order;
                        $(".wechat-choose").find("span.wx-selected-detail").each(function(){
                            filter += $(this).attr("sv")+"|";
                        });

                        order = $(".wx-selected").text() == "新榜指数" ?"NRI" : "relation";

                        $(".m-loading").show();
                        remote.search.searchWeixinDataByCondition(val,order,filter,false,function(data){
                            if(data.brand.brandMap != null){
                                HtmUtil.brand(data.brand.brandMap);
                            }
                            HtmUtil.init(data.result,data.brand.brandMap,val);
                            $(".m-loading").hide();
                        })
                    });

                }

            };

            HtmUtil.brand = function(brand){
                var	first = brand.first != "" ? JSON.parse(brand.first) : "",
                    second = brand.second != "" ? JSON.parse(brand.second) : "",
                    third = brand.third != "" ? JSON.parse(brand.third) : "",
                    articleList = brand.articleList;

                var src = first != "" ? first.first_logo : "";

                $(".wechat-content").append(
                    "<div class='wechat-content-brand-li'>" +
                    '<div class="name-top">'+
                    '<a class="brand-name" id="brand_name" data-href="'+brand.account+'">'+brand.weixin_name+'（'+brand.account+'）'+'—官方账号'+'</a>'+
                    '<a class="brand-link" href="'+memory.rootUrl.main+'public/brand/brand_zone.html" target="_blank" title="已通过新榜认证，并获得品牌置顶保护">品牌</a>'+
                    '</div>'+
                    "<div class='brand-detail'><div class='wechat-content-brand-li-left'>" +
                    "<div class='wx_lp'>" +
                    "<div class='wx_logo'>" +
                    "<img class='wx_logo-img' src='"+src+"' />" +
                    "</div>" +
                    "</div></div>"+
                    "<div class='wechat-content-brand-li-right'>" +
                    "<p class='brand-wx-description'>"+brand.description+"</p>"+
                    "<p class='wx_index_num'>"+(brand.weekLog1pmark&&parseFloat(item.weekLog1pmark)>=0?parseFloat(item.weekLog1pmark).toFixed(1):"")+"</p>"+
                    "</div></div>"+
                    "<div class='brand-business'>" +
                    "</div>"+
                    "<div class='brand-about-service'>" +
                    "</div>"+
                    "</div>"
                );
                if(second != ""){
                    $.each(second,function(i,item){
                        $(".brand-business").append(
                            //"<a class='brand-business-li' href='"+item.second_main_url+"'>"+item.second_name+"</a>"
                            "<a class='brand-business-li'>"+item.second_name+"</a>"
                        )
                    });
                }
                if(third != ""){
                    $.each(third,function(i,item){
                        $(".brand-about-service").append(
                            //"<a class='brand-about-service-li' href='"+item.third_url+"'>"+item.third_name+"</a>"
                            "<a class='brand-about-service-li'>"+item.third_name+"</a>"
                        )
                    });
                }

                $('#brand_name').unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"detail?account="+$(this).data("href")});
                });

            };

            FunUtil.searchHistory = function(){
                var inputVal = $.trim($("input.weChat-search").val());
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



            $("input.weChat-search").val(value);
            $('#wx_arrow_i').unbind("click").bind("click",function(){
                $('.hover-all-wx-type-detail').show();
                $(".search-choose").hide();
                $(".search-yes,.mask").show();

            });

            $(".search-yes").unbind('click').bind("click",function(){
                $('.hover-all-wx-type-detail,.search-yes,.mask').hide();
                $(".search-choose").show();
                var $inputVal=$.trim($("input.weChat-search").val());

                var filter = "",order;
                if($inputVal.indexOf("tag:")!=-1){
                    filter = "tags";
                }
                if($inputVal.indexOf("v:")!=-1){
                    filter = "auth";
                }

                $(".wechat-choose").find("span.wx-selected-detail").each(function(){
                    filter += $(this).attr("sv")+"|";
                });
                order = $(".wx-selected").text() == "新榜指数" ?"NRI" : "relation";
                $(".wechat-content .wechat-content-li,.wechat-content-brand-li,.wechat-number").remove();

                value = $inputVal.indexOf(":")!=-1?$inputVal.split(":")[1]:$inputVal;

                $(".m-loading").show();
                remote.search.searchWeixinDataByCondition(value,order,filter,false,function(data){
                    if($inputVal.indexOf("v:")>-1 && data.total > 0){
                        $(".wechat-content").append(
                            "<div class='wechat-number'><span class='wechat-company'>"+value.substr(0,12)+"</span><p class='wechat-company-number'>累计认证数<span>"+data.total+"</span></p></div>"
                        );
                    }
                    if(data.brand.brandMap != null){
                        HtmUtil.brand(data.brand.brandMap);
                    }
                    HtmUtil.init(data.result,data.brand.brandMap,value);
                    $(".m-loading").hide();
                })
            });


            var $wxType = $(".hover-all-wx-type span");
            $wxType.unbind('click').bind("click",function(){
                if($(this).hasClass("wx-selected-detail")){
                    $(this).removeClass('wx-selected-detail');
                }else{
                    $(this).addClass('wx-selected-detail');
                }
            });

            if(value != undefined){
                $(".m-loading").show();
                $('#search-yes').show();
                $('.search-cancel').hide();
                remote.search.searchWeixinDataByCondition(value,"NRI","",false,function(data){
                    $("#weChat-search-inaccount-head-del").show();
                    $("input.weChat-search").val(value);
                    if(data.brand.brandMap != null){
                        HtmUtil.brand(data.brand.brandMap);
                    }
                    HtmUtil.init(data.result,data.brand.brandMap,value);
                    $(".m-loading").hide();
                });
            }
            if(auth != undefined){
                $(".m-loading").show();
                remote.search.searchWeixinDataByCondition(auth,"NRI","auth",false,function(data){
                    if(data.total > 0){
                        $(".wechat-content").append(
                            "<div class='wechat-number'><span class='wechat-company'>"+auth.substr(0,12)+"</span><p class='wechat-company-number'>累计认证数<span>"+data.total+"</span></p></div>"
                        );
                    };
                    $("#weChat-search-inaccount-head-del").show();
                    $("input.weChat-search").val("v:"+auth);
                    if(data.brand.brandMap != null){
                        HtmUtil.brand(data.brand.brandMap);
                    }
                    HtmUtil.init(data.result,data.brand.brandMap,auth);
                    $(".m-loading").hide();
                });
            }


            $('a.search-cancel').unbind('click').bind("click",function(){
                PageInfo.FunUtil.common4openUrl({"url":'search'});
            });


            $(".list-index").unbind('click').bind("click",function(){
                $(".wechat-content .wechat-content-li,.wechat-content-brand-li").remove();
                $(".correlation-degree").removeClass("wx-selected");
                $(this).addClass("wx-selected");
                var $inputVal=$.trim($("input.weChat-search").val());

                var value = $inputVal.indexOf(":")!=-1?$inputVal.split(":")[1]:$inputVal;

                var filter = "",order;
                if($inputVal.indexOf("tag:")!=-1){
                    filter = "tags";
                }
                if($inputVal.indexOf("v:")!=-1){
                    filter = "auth";
                }

                $(".wechat-choose").find("span.wx-selected-detail").each(function(){
                    filter += $(this).attr("sv")+"|";
                });
                order = $(".wx-selected").text() == "新榜指数" ?"NRI" : "relation";

                $(".m-loading").show();
                remote.search.searchWeixinDataByCondition(value,order,filter,false,function(data){
                    if(data.brand.brandMap != null){
                        HtmUtil.brand(data.brand.brandMap);
                    }
                    HtmUtil.init(data.result,data.brand.brandMap,value);
                    $(".m-loading").hide();
                })
            });

            $(".correlation-degree").unbind('click').bind("click",function(){
                $(".wechat-content .wechat-content-li,.wechat-content-brand-li").remove();
                $(".list-index").removeClass("wx-selected");
                var inputVal=$.trim($("input.weChat-search").val());

                $(this).addClass("wx-selected");
                var value =inputVal.indexOf(":")!=-1?inputVal.split(":")[1]:inputVal;

                var filter = "",order;
                if(inputVal.indexOf("tag:")!=-1){
                    filter = "tags";
                }
                if(inputVal.indexOf("v:")!=-1){
                    filter = "auth";
                }

                $(".wechat-choose").find("span.wx-selected-detail").each(function(){
                    filter += $(this).attr("sv")+"|";
                });
                order = $(".wx-selected").text() == "新榜指数" ?"NRI" : "relation";

                $(".m-loading").show();
                remote.search.searchWeixinDataByCondition(value,order,filter,false,function(data){
                    if(data.brand.brandMap != null){
                        HtmUtil.brand(data.brand.brandMap);
                    }
                    HtmUtil.init(data.result,data.brand.brandMap,value);
                    $(".m-loading").hide();

                });

            });


            $('input.weChat-search').unbind('keyup').bind('keyup',function(e){
                var filter = "",order,keyName,$inputVal= $.trim($(this).val());

                $(".wechat-content .wechat-content-li,.wechat-content-brand-li,.wechat-number").remove();
                keyName = value = $inputVal.indexOf(":")!=-1?$inputVal.split(":")[1]:$inputVal;

                $(".wechat-choose").find("span.wx-selected-detail").each(function(){
                    filter += $(this).attr("sv")+"|";
                });
                order = $(".wx-selected").text() == "新榜指数" ?"NRI" : "relation";

                if($inputVal){
                    $("#weChat-search-inaccount-head-del").show();
                    $(".search-cancel").hide();
                    $("#search-yes").show();
                }else{
                    $("#weChat-search-inaccount-head-del").hide();
                    $(".search-cancel").show();
                    $("#search-yes").hide();
                }


                if(e.keyCode == '13'&& keyName != ""){
                    FunUtil.searchHistory();

                    $(".m-loading").show();
                    remote.search.searchWeixinDataByCondition(keyName,order,filter,false,function(data){
                        if(data.brand.brandMap != null){
                            HtmUtil.brand(data.brand.brandMap);
                        }
                        HtmUtil.init(data.result,data.brand.brandMap,keyName);
                        $(".m-loading").hide();

                    })
                }

            });

            if($.trim($("input.weChat-search").val())){
                $(".search-cancel").hide();
                $("#search-yes").show();
                $("#weChat-search-inaccount-head-del").show();
            }

            $("#weChat-search-inaccount-head-del").unbind("click").bind("click",function(){
                $("input.weChat-search").val("").focus();
                $(this).hide();
                $(".search-cancel").show();
                $("#search-yes").hide();
            });

            $("#search-yes").unbind("click").bind("click",function(){
                var filter = "",order,keyName,$inputVal=$.trim($("input.weChat-search").val());
                keyName = value = $inputVal.indexOf(":")!=-1? $inputVal.split(":")[1]:$inputVal;
                if($inputVal.indexOf("tag:")!=-1){
                    filter = "tags";
                }
                if($inputVal.indexOf("v:")!=-1){
                    filter = "auth";
                }

                $(".wechat-choose").find("span.wx-selected-detail").each(function(){
                    filter += $(this).attr("sv")+"|";
                });
                order = $(".wx-selected").text() == "新榜指数" ?"NRI" : "relation";
                $inputVal !="" ? $("#weChat-search-inaccount-head-del").show() : $("#weChat-search-inaccount-head-del").hide();

                if(keyName != ""){
                    FunUtil.searchHistory();
                    $(".wechat-content .wechat-content-li,.wechat-content-brand-li,.wechat-number").remove();
                    $(".m-loading").show();
                    remote.search.searchWeixinDataByCondition(keyName,order,filter,false,function(data){
                        if(data.brand.brandMap != null){
                            HtmUtil.brand(data.brand.brandMap);
                        }
                        HtmUtil.init(data.result,data.brand.brandMap,keyName);
                        $(".m-loading").hide();

                    })
                }
            });


        };

        return Page;

    };

    return PageObj;
}});

