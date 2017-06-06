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

        };
        return Page;

    };

    return PageObj;
}});



