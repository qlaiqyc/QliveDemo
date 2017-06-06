/**
 * Created by helin on 2017/5/5.
 */

PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common" :'common'
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){
            var common      = this.common;

            common.mobileBottomMenu();

            FunUtil.events=function(){

                $("a.icon-xdn-zixun").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"news"});
                });

                $("a.icon-xdn-remen").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"original?module=original"});
                });

                $("a.icon-xdn-tuiwu").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl("http://cec.newrank.cn");
                });

                $("a.icon-xdn-rongzi").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl("http://accelerator.newrank.cn");
                });

                $("a.icon-xdn-zhaopin").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl("http://zhaopin.newrank.cn");
                });

                $("a.icon-xdn-haonei").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl("http://data.newrank.cn/m/s.html?s=NyotPD42");
                });

            };

            FunUtil.events();

        };
        return Page;

    };

    return PageObj;
}});



