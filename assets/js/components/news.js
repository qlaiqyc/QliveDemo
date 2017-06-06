/**
 * Created by zhaotao on 2017/4/10.
 */
PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common" :'common',
        "remote":"/assets/js/components/common/data-api"
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){
            var common      = this.common,
                remote      = this.remote,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                doNull      = common.doNull,
                keyword     = request["keyword"];

            common.mobileBottomMenu();
            common.mobileReturnUp();

            keyword=( keyword != undefined ? keyword :"");

            FunUtil.loadImg=function(){
                $( $('.index-zixun-left img')).each(function(){
                    var $self=$(this);
                    if($self.attr('src')==$self.attr('data-src') || $self.attr('data-src') == "" || $self.attr('data-src') == undefined) return;
                    var a = $self.offset().top;
                    //判断元素是否在可视区域
                    if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                        $self.attr('src',$self.attr('data-src'));
                    }
                })
            };

            HtmUtil.zixunDetail = function(data,keyWords){
                if(data == ""){
                    $("#zixun").append(
                        "<div class='wechat-content-li' style='background: rgb(246,246,246);display: block;margin-top: 8.85rem;text-align: center;'>" +
                        "<img src='/m/assets/img/result-empty.png' style='width:6.78rem'>" +
                        "<p style='font-size: 1rem;line-height: 1rem;margin-top:2rem;color:rgb(153,153,153);'>抱歉，没有搜到和"+'"'+keyWords+'"'+"相关的资讯</p>" +
                        "<p style='font-size: 1rem;line-height: 1rem;margin-top:1.14rem;color:rgb(153,153,153);'>换个词试试？</p>"+
                        "</div>"
                    );
                }else{
                    $.each(data,function(i,item){
                        $("#zixun").append(
                            "<div class='zixun-detail'>" +
                            "<div class='index-zixun-left'><img style='width:9.28rem;height:5.35rem;' src='/m/assets/img/default.png' data-src='"+doNull(item.cms_media_img)+"' /></div>" +
                            "<a class='index-zixun-right' href='"+doNull(item.url)+"'>" +
                            "<p class='index-zixun-right-top'>"+item.title.getSubStr(36)+"</p>"+
                            "<section class='index-zixun-right-bottom'>"+
                            "<p><i class='iconfont icon-xdn-tag'></i><span class='news-detail-label'>"+item.label.getSubStr(18)+"</span></p>"+
                            "<p>"+doNull(item.insert_time).DateFormat('yyyy-MM-dd')+"</p>"+
                            "</section>"+
                            "</a>"+
                            "</div>"
                        );
                    });
                }
            }


            FunUtil.init=function(){
                remote.search.getCmsMediaCount(keyword,function(data){
                    var nowPage = 1,page =Math.ceil(data/10);
                    $(window).scroll(function(){
                        var distance = $('body').height() - window.innerHeight;
                        if($(this).scrollTop() - distance > 0){
                            if(nowPage < page){
                                nowPage += 1;
                                $("#hot_loading").show();
                                remote.search.getMedia(10,nowPage,keyword,function(data){
                                    HtmUtil.zixunDetail(data,keyword);
                                    $("#hot_loading").hide();
                                })
                            }else{
                                $("#zixun").css("margin-bottom","3.5rem")
                            }
                        };
                        FunUtil.loadImg();
                    })

                    $(".m-loading").show();
                    remote.search.getMedia(10,nowPage,keyword,function(data){
                        HtmUtil.zixunDetail(data,keyword);
                        FunUtil.loadImg();
                        $(".m-loading").hide();
                    })
                });
            };


            FunUtil.events=function(){
              $('#new_search_a').unbind('click').bind('click',function(){
                  PageInfo.FunUtil.common4openUrl({"url":'newsSearch'});
              })
            };


            FunUtil.init();
            FunUtil.events();
            FunUtil.loadImg();
        };
        return Page;

    };

    return PageObj;
}});
