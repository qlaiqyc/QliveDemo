/**
 * Created by helin on 2017/5/12.
 */
PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common":"common",
        "api":"/assets/js/components/common/data-api",
        "memory" :'memory',
        "remote" :'login',
        "cookie" :'cookie'
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){

            var common      = this.common,
                memory      = this.memory,
                remote      = this.remote,
                cookie      = this.cookie,
                api         = this.api,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                module      = request["module"];

            common.mobileBottomMenu('mine');

            FunUtil.Global={};


            FunUtil.init=function(){
                var page_title;
                $('.common-page').hide();
                if(module=='mine'||module == undefined){
                    page_title='个人中心';
                    FunUtil.showMine();
                }else if(module=='info'){
                    page_title='热文';
                    FunUtil.showInfo();
                }else if(module=='account'){
                    page_title='专题';
                    FunUtil.showAccount();
                }
                document.title = page_title;
            };
 			
            FunUtil.getUser=function(){
                remote.user.info.getUser(function(result){
                    console.log(result);
                    FunUtil.Global.data=result;
                    FunUtil.fillMine();
                    FunUtil.fillPersonalInfo();
                    FunUtil.fillMyAccount();
                    FunUtil.getMoney();
                    FunUtil.searchAccount();

                    if(result!='-999'){
                        FunUtil.fillUserInfo(result);
                    }
                });
            };

            FunUtil.getMoney=function(){
                remote.user.money.getMoneyDetail(function(result){
                    //console.log(result);
                    if(result=='-999') return;
                    FunUtil.fillUserMoney(result);
                });
            };

            FunUtil.searchAccount=function(){
                api.user.search(function(data){
                    console.log(data);
                    if(data=='-999') return;
                    FunUtil.myAccountList(data);
                })
            };


            //我的
            FunUtil.fillMine=function(){
                var isLogin=(FunUtil.Global.data)=='-999'?'<span class="p-unlogin">登录/注册</span>':'<span class="p-name" id="p_name"></span>',
                    isShowPersonalInfo=(FunUtil.Global.data)=='-999'?'':'<a class="p-to-detail-info" id="p_to_detail_info" data-href="info">个人资料 <span class="iconfont icon-xdn-next"></span></a>',
                    isShowExitLogin=(FunUtil.Global.data)=='-999'?'':'<div class="p-info-row p-exit-login" id="p_exit_login">退出登录</div>';


                var html=[
                    '<div class="personal-center-page">',
                    '<div class="p-top-head">',
                    '<div class="p-top-head-logo" id="p_top_head_logo">',
                    '<div class="p-head" id="p_head"></div>',
                    '<div class="p-login">'+isLogin+'</div>',
                    '<div class="p-right">'+isShowPersonalInfo+'</div>',
                    '</div>',
                    '<div class="p-top-cash clear">',
                    '<div class="p-remain-bangdou" id="p_remain_bangdou">榜豆余额<span>0.00</span></div>',
                    '<div class="p-seperate-line"></div>',
                    '<div class="p-jiesuan-cash">可结算金额<span>0.00</span></div>',
                    '</div>',
                    '</div>',
                    '<div class="p-info-row" id="my_account" data-href="account">',
                    '<i class="iconfont icon-xdn-gongzhonghao"></i>',
                    '<span>我的公众号</span>',
                    '<span class="iconfont icon-xdn-next next"></span>',
                    '</div>',
                    '<div class="p-info-row" id="about_row">',
                        '<i class="iconfont icon-xdn-guanyu1"></i>',
                        '<span>关于</span>',
                        '<span class="iconfont icon-xdn-next next"></span>',
                    '</div>',
                    isShowExitLogin,
                    '</div>'
                ];
                if($("div.personal-center-page").length === 0) $('#personal_center_page').append(html.join(''));

                FunUtil.mineEvents();
            };

            //我的公众号
            FunUtil.fillMyAccount=function(){
                var html=[
                    '<div class="my-account-page">',
                    '<div class="my-account-list" id="my_account_list"></div>',
                    '<div class="a-add-account"><span class="iconfont icon-xdn-addaccount"></span><span>添加公众号</span></div>',
                    '</div>',
                    '</div>'
                ];
                $('#my_account_page').append(html.join(''));
            };

            //FunUtil.historyState=function(title,url){
            //    var stateObj = { foo: "bar" };
            //    history.pushState(stateObj , title, url+".html");
            //};

            //显示‘我的’模块
            FunUtil.showMine=function(){
                $('#personal_info_page,#my_account_page').hide();
                $('#personal_center_page').show();
            };

            //显示‘个人资料’模块
            FunUtil.showInfo=function(){
                $('#personal_center_page,#my_account_page').hide();
                $('#personal_info_page').show();
            };

            //显示‘我的公众号’模块
            FunUtil.showAccount=function(){
                $('#personal_center_page,#personal_info_page').hide();
                $('#my_account_page').show();
            };

            //通过hash处理页面的前进回退
            FunUtil.handleHash=function(){
                //history.pushState({ page: 1 }, "title 1", "?page=1");
                //window.onpopstate = function(){
                //    //alert();
                //    if(location.hash.indexOf("#info")>-1){
                //        FunUtil.showInfo();
                //    }else if(location.hash.indexOf("#account")>-1){
                //        FunUtil.showAccount();
                //    }
                //    //else if(location.hash.indexOf("#success")>-1){
                //    else if(JSON.stringify(event.state) == '{"page":1}'){
                //        //alert(window.location.href);
                //        history.pushState({ page: 1 }, "title 1", "?page=1");
                //        FunUtil.showMine();
                //    }
                //    else{
                //        FunUtil.showMine();
                //    }
                //
                //
                //};
            };

            FunUtil.mineEvents=function(){
                //登录
                $('#p_top_head_logo').unbind('click').bind('click',function(){
                    if(FunUtil.Global.data=='-999'){
                        PageInfo.FunUtil.common4openUrl({"url":"login"});
                    }
                });

                //点击个人资料
                $('#p_to_detail_info').unbind('click').bind('click',function(){
                    //location.hash = "info"; //给url加上锚点，此锚点会自动加载到url的
                    //FunUtil.showInfo();
                    PageInfo.FunUtil.common4openUrl({"url":"mine?module="+$(this).data("href")});
                });

                //点击我的公众号
                $('#my_account').unbind('click').bind('click',function(){
                    if(FunUtil.Global.data=='-999'){
                        PageInfo.FunUtil.common4openUrl({"url":"login"});
                    }else{
                        //location.hash = "account";
                        //FunUtil.showAccount();
                        PageInfo.FunUtil.common4openUrl({"url":"mine?module="+$(this).data("href")});
                    }
                });


                //点击关于
                $('#about_row').unbind('click').bind('click',function(){
                    PageInfo.FunUtil.common4openUrl({"url":"about"});
                });


                //点击榜豆余额
                $('#p_remain_bangdou').unbind('click').bind('click',function(){
                    if(FunUtil.Global.data=='-999'){
                        PageInfo.FunUtil.common4openUrl({"url":"login"});
                    }else{
                        PageInfo.FunUtil.common4openUrl({"url":"rankcoin"});
                    }
                });



                //退出登录
                $('#p_exit_login').unbind('click').bind('click',function(){
                    cookie.setCookie('token', null);
                    window.location.reload();
                });
            };


            FunUtil.fillUserInfo=function(result){

                var user=result.user;
                var showName = user.nick_name ||'暂无昵称';
                $('#p_name,#i_name').text(showName.getSubStr());

                if(user.headimgurl){
                    $('#p_head,#i_head_box').css({'background':'url('+user.headimgurl+') no-repeat','background-size':'cover'});
                }
                if(result.bangdou>0){
                    $('.p-remain-bangdou span').text(result.bangdou).addClass('p-color-orange');
                }
                $('#i_nr_name').text(user.nr_name);

                var phone=user.phone_login?(user.phone_login.substring(0,3)+'****'+user.phone_login.substring(7,11)):'暂未设置';
                $('#i_user_phone').html(phone);

                var name=(user.name && user.name.indexOf('@xx.com')==-1) ? user.name:'暂未设置';
                $('#i_user_email').text(name);

                var weixiname=result.weixiname?'<span class="iconfont icon-xdn-weixin"></span><span class="i-wx-name" id="i_wx_name">'+result.weixiname+'</span>':'暂无';
                $('#i_wx_name_right').html(weixiname);
            };


            //我的公众号列表
            FunUtil.myAccountList=function(data){

                $(data).each(function(){
                    var html=[
                        '<div class="account-one">',
                        '<div class="a-left-img-box">',
                        '<div class="a-left-img" style="background: url(\'http://open.weixin.qq.com/qr/code/?username='+this.account+'\') 50% center / 512% no-repeat scroll transparent;"></div>',
                        '</div>',
                        '<div class="a-account-detail"><div class="a-name">'+this.name+'</div><div class="a-account">'+this.account+'</div></div>',
                        '<a class="a-right-hns" href="'+memory.rootUrl.data+'m/s.html?s=NyotPD42"><span class="iconfont icon-xdn-search"></span><span>号内搜</span></a>',
                        '</div>'
                    ];
                    $('#my_account_list').append(html.join(''));
                });

            };

            //可提现金额
            FunUtil.fillUserMoney=function(result){

                if(result){
                    var advance_payment = result.advance_payment,ableTqMaxCash = result.available_money || 0;ableTqMaxCash = (ableTqMaxCash - result.advance_payment).toFixed(2);
                    $('.p-jiesuan-cash span').text(ableTqMaxCash);
                }
            };

            //个人资料
            FunUtil.fillPersonalInfo=function(){
                var html=[
                    '<div class="personal-info-page">',
                    '<div class="i-head-and-name">',
                    '<div class="i-head">',
                    '<span>我的头像</span>',
                    '<span class="i-head-box" id="i_head_box"></span>',
                    '</div>',
                    '<div class="i-name i-common-row">',
                    '<span class="i-left-title">昵称</span>',
                    '<div class="i-name-div i-common-right"><span id="i_name">昵称</span></div>',
                    '</div>',
                    '</div>',
                    //'<div class="i-common-row-box">',
                    //    '<div class="i-common-row i-common-row-border">',
                    //        '<span class="i-left-title">新榜账号</span>',
                    //    '<div class="i-common-right" id="i_nr_name"></div>',
                    //'</div>',
                    //'<div class="i-common-row">',
                    //    '<span class="i-left-title" id="i_update_pwd">修改密码</span>',
                    //    '<div class="i-common-right">修改<span class="iconfont icon-xdn-next"></span></div>',
                    //'</div>',
                    //'</div>',
                    '<div class="i-common-row-box">',
                    '<div class="i-common-row i-common-row-border">',
                    '<span class="i-left-title">新榜账号</span>',
                    '<div class="i-common-right" id="i_nr_name"></div>',
                    '</div>',

                    '<div class="i-common-row i-common-row-border">',
                    '<span class="i-left-title">手机号码</span>',
                    '<div class="i-common-right" id="i_user_phone"></div>',
                    '</div>',
                    '<div class="i-common-row">',
                    '<span class="i-left-title">邮箱地址</span>',
                    '<div class="i-common-right" id="i_user_email"></div>',
                    '</div>',
                    '</div>',
                    '<div class="i-common-row-box">',
                    '<div class="i-common-row i-bind-weixin">',
                    '<span class="i-left-title">绑定微信</span>',
                    '<div class="i-common-right" id="i_wx_name_right"></div>',
                    '</div>',
                    '</div>',
                    '</div>'
                ];
                $('#personal_info_page').append(html.join(''));
            };







            FunUtil.init();
            FunUtil.getUser();
            FunUtil.handleHash();
        }

        return Page;

    };

    return PageObj;
}});


