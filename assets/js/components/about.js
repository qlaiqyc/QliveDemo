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

            common.mobileBottomMenu('about');

            FunUtil.events=function(){

                $("#about_newrank").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"aboutNewrank"});
                });

                $("#product_service").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"product"});
                });

                $("#contact_us").unbind("click").bind("click",function(){

                });

            };

            FunUtil.events();
        };
        return Page;

    };

    return PageObj;
}});



