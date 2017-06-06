/**
 * Created by helin on 2017/5/12.
 */

PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common" :'common',
        "memory" :'memory',
        "remote" :'login',
        "cookie" :'cookie',
        "md5"    :'md5'
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){

            console.log(this);
            var  common      = this.common,
                memory      = this.memory,
                remote      = this.remote,
                cookie      = this.cookie,
                md5         = this.md5,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                backUrl     = request["back"];

            if(backUrl==undefined){
                backUrl='mine';
            }else{
                localStorage.setItem('main-backUrl',backUrl);
            }

            FunUtil.Global = {
                rememberPwd:true,
                errorTimeout:"",
                qrCode:'',
                ticket:'',
                userNameIsExists:true,
                pwdThreeTimesError:false,
                reSendInterval:'',
                reSendTime:60,
                canSendMs:true,
                WechatTimeInterval:'',//循环检测用户是否扫码
                codeFlag:"",
                canLogin:true,
                isSendPhoneCode:false
            };

            /*切换tab*/
            FunUtil.switchLoginTab=function(){
                $('.login-tab span').unbind('click').bind('click',function(){
                    $('.login-tab span').removeClass('active');
                    $(this).addClass('active');
                    var data=$(this).attr('data');
                    if(data=='account'){
                        FunUtil.accountLogin();
                    }else if(data=='phone'){
                        FunUtil.phoneLogin();
                    }
                });
            };



            /*账号密码登录*/
            FunUtil.accountLogin = function() {
                var html = [
                    '<div class="login-by-account">',
                    '<div class="login-account">',
                    '<input type="text" id="account_login_input" class="login-input" placeholder="手机/邮箱/新榜ID"/>',
                    '</div>',
                    '<div class="login-account">',
                    '<input type="password" id="account_pwd_input" class="login-input pwd-input" placeholder="请输入密码"/>',
                    '<div class="pwd-input-right">',
                    '<span class="iconfont icon-xdn-delete" id="clear_login_pwd" style="display: none;"></span>',
                    '<span class="iconfont icon-xdn-bukejian" id="view_login_pwd"></span>',
                    '</div>',
                    '</div>',

                    '<div class="login-account login-identifycode-row">',
                    '<input type="text" id="account_identifycode_input" maxlength="4" class="login-input account-identifycode-input" placeholder="请输入验证码"/>',
                    '<div class="pwd-input-right">',
                    '<img id="identifyCode" class="login-account-identifycode">',
                    '</div>',
                    '</div>',

                    '<input type="button" id="account_login_btn" class="login-btn" value="登录" disabled="true"; />',
                    '<div class="login-bottom clear">',
                    //'<a href="'+memory.rootUrl.main+'m/phoneRegister.html" class="phone-reg" id="phone_reg">手机快速注册</a>',
                    //'<a href="'+memory.rootUrl.main+'m/reset.html" class="reset-pwd" id="reset_pwd">忘记密码</a>',
                    '<a  class="phone-reg" id="phone_reg">手机快速注册</a>',
                    '<a  class="reset-pwd" id="reset_pwd">忘记密码</a>',
                    '</div>',
                    '</div>',

                    '<div class="login-by-weixin-auth">',
                    '<span class="login-sep-line"></span>',
                    '<span class="login-sep-text">微信授权登录</span>',
                    '<span class="login-sep-line login-sep-line-right"></span>',
                    '<div class="login-wx-auth-bth" id="login_wx_auth_bth">',
                    '<span class="iconfont icon-xdn-weixin"></span>',
                    '</div>',
                    '</div>'
                ];
                $("#login_input_box").html('').html(html.join(''));
                //$('#account_login_input').focus();

                FunUtil.accountLoginFunc();
                FunUtil.changeIdentifyCode();
                FunUtil.weixinLoginRemote();
            };


            //处理backURL跳转
            FunUtil.openBackUrl=function(data){
                var execuFun = {};

                execuFun.account = function(){
                    if(backUrl.indexOf("http") > -1) {
                        PageInfo.FunUtil.common4openUrl(backUrl);
                    }else{
                        PageInfo.FunUtil.common4openUrl({"url":backUrl});
                    }
                };

                execuFun.weixin = function(){  //微信登录时记住backURL
                    if(localStorage.getItem('main-backUrl')){
                        backUrl = localStorage.getItem('main-backUrl');
                        localStorage.setItem("main-backUrl","");
                    }
                    if(backUrl.indexOf("http") >-1) {
                        PageInfo.FunUtil.common4openUrl(backUrl);
                    }else{
                        PageInfo.FunUtil.common4openUrl({"url":backUrl});
                    }
                };

                execuFun[data.type]();

            };


            /*控制登录按钮是否可点击*/
            FunUtil.changeLoginBtn=function(){
                var accountInputVal =$('#account_login_input').val(),
                    accountPwdVal =$('#account_pwd_input').val();
                if(accountInputVal&&accountPwdVal){
                    $('#account_login_btn').attr('disabled',false).css('background-color','#ff8c00');
                }else{
                    $('#account_login_btn').attr('disabled',true).css('background-color','#ffd6b2');
                }

                //清除密码是否可见
                var $clearLoginPwd=$('#clear_login_pwd');
                if(accountPwdVal!=''){
                    $clearLoginPwd.show();
                }else{
                    $clearLoginPwd.hide();
                }
            };

            //更换图形验证码
            FunUtil.changeIdentifyCode = function(){
                FunUtil.Global.codeFlag = new Date().getTime() + "" + Math.random();
                $("#identifyCode").attr("src",memory.urlBase+"login/getIdentifyCode.json?flag="+FunUtil.Global.codeFlag);
            };

            //显示输入验证码
            FunUtil.showIdentifyCode = function(type){
                $(".login-identifycode-row").css('display',type=='show'?'block':'none');
            };

            //点击验证码更换
            $("#identifyCode").unbind('click').bind('click',function(){
                FunUtil.changeIdentifyCode();
            });

            //检查密码输入错误次数
            FunUtil.checkLoginError = function(username){
                remote.newLogin.loginCount(username,function(result){
                    console.log(result);
                    if(result == 3){
                        FunUtil.Global.pwdThreeTimesError = true;
                        FunUtil.showIdentifyCode("show");
                    }else{
                        FunUtil.Global.pwdThreeTimesError = false;
                        FunUtil.showIdentifyCode("hide");
                    }
                });
            };

            //账号登录
            FunUtil.accountLoginRemote=function(){
                var userName = $("#account_login_input").val(),
                    passWord = md5(md5($("#account_pwd_input").val())+memory.mdValue),
                    identify = $("#account_identifycode_input").val();

                if(userName && passWord && FunUtil.Global.canLogin){
                    console.log(userName,passWord);
                    FunUtil.Global.canLogin = false;
                    remote.newLogin.usernameLogin(userName,passWord,FunUtil.Global.codeFlag,identify,function(data){
                        console.log(data);
                        if(data.code == 1){
                            //判断是否勾选记住登录状态
                            cookie.setCookie('rmbuser', 'true', 30);
                            cookie.setCookie('name', userName, 365);
                            cookie.setCookie('token', data.token, 30);
                            cookie.setCookie('useLoginAccount', 'true', 30);
                            FunUtil.openBackUrl({"type":"account"});

                        }else{
                            common.showMobileTip(data.msg);
                            if(data.code == -10){
                                FunUtil.checkLoginError(userName);
                            }else if(data.code == -4){
                                FunUtil.changeIdentifyCode();
                            }
                            FunUtil.Global.canLogin = true;
                        }
                    });
                }
            };

            /*账号密码登录事件*/
            FunUtil.accountLoginFunc=function(){

                //点击手机快速注册
                $("#phone_reg").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"phoneRegister"});
                });

                //点击忘记密码
                $("#reset_pwd").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"reset"});
                });


                $('#account_login_input').unbind('keyup').bind('keyup',function(){
                    FunUtil.changeLoginBtn();
                });

                $('#account_pwd_input').unbind('keyup').bind('keyup',function(){
                    FunUtil.changeLoginBtn();
                });

                //清除密码
                $('#clear_login_pwd').unbind('click').bind('click',function(){
                    $('#account_pwd_input').val('');
                    FunUtil.changeLoginBtn();
                });

                //点击密码是否可见
                $('#view_login_pwd').bind('click',function(){
                    var $loginPwd=$('#view_login_pwd');
                    if($loginPwd.hasClass('icon-xdn-bukejian')){  //可见
                        $loginPwd.removeClass('icon-xdn-bukejian').addClass('icon-xdn-kejian');
                        $('#account_pwd_input').attr('type','text');
                    }else{
                        $loginPwd.addClass('icon-xdn-bukejian').removeClass('icon-xdn-kejian');
                        $('#account_pwd_input').attr('type','password');
                    }
                });

                //检查输入账号是否存在
                $("#account_login_input").unbind('blur').bind('blur',function(){
                    var userName = $(this).val();
                    if(userName){
                        FunUtil.Global.userNameIsExists = false;
                        remote.newLogin.usernameExists(userName,function(data){
                            if(data.code == 0){
                                //common.showMobileTip("该账号不存在");
                            }else{
                                if(data.pass == 0){
                                    common.showMobileTip("未设置密码，请用其他方式登录");
                                }else{
                                    FunUtil.Global.userNameIsExists = true;
                                    FunUtil.checkLoginError(userName);
                                }
                            }
                        })
                    }
                });

                //点击登录
                $('#account_login_btn').unbind('click').bind('click',function(){
                    FunUtil.accountLoginRemote();
                })
            };


            /*手机验证码登录*/
            FunUtil.phoneLogin = function() {
                var html = [
                    '<div class="login-by-phone-code">',
                    '<div class="login-account">',
                    '<input type="tel" id="login_phone_input" class="login-input phone-input" placeholder="请输入手机号">',
                    '<div class="get-phone-cord" id="get_phone_cord">获取验证码</div>',
                    '</div>',
                    '<div class="phone-code-box">',
                    '<input type="tel" id="phone_code_input_1" data-index="1" class="phone-code-input" maxlength="1"/>',
                    '<input type="tel" id="phone_code_input_2" data-index="2" class="phone-code-input" maxlength="1"/>',
                    '<input type="tel" id="phone_code_input_3" data-index="3" class="phone-code-input" maxlength="1"/>',
                    '<input type="tel" id="phone_code_input_4" data-index="4" class="phone-code-input" maxlength="1"/>',
                    '</div>',
                    '</div>'
                ];
                $("#login_input_box").html('').html(html.join(''));
                //$('#login_phone_input').focus();

                FunUtil.phoneLoginFunc();
            };


            //发送手机验证码
            FunUtil.sendSMSNewUsername = function(phone){
                if(phone == ''){
                    common.showMobileTip("手机号不能为空");
                    return;
                }
                if(!(/^(1+[0-9]{10})$/.test(phone))){
                    common.showMobileTip("手机号格式错误");
                    return;
                }

                cookie.setCookie("isSendMs",true,1/1440);
                if(FunUtil.Global.canSendMs){
                    FunUtil.setMsCount();
                }
                remote.newLogin.sendSMSNewUsername(phone,"login",function(result){
                    if(result == -1){
                        common.showMobileTip('验证码发送失败')
                    }else if(result == -2){
                        common.showMobileTip('当天发送短信已达上限')
                    }
                });
            };

            //发送手机验证码倒计时
            FunUtil.setMsCount = function(){
                var $this = $("#get_phone_cord");
                $this.removeClass('phone-active');
                $this.addClass('phone-disable');
                $this.html(FunUtil.Global.reSendTime+'秒后重发');
                FunUtil.Global.reSendTime--;
                FunUtil.Global.canSendMs = false;
                FunUtil.Global.isSendPhoneCode = true;
                FunUtil.Global.reSendInterval = setInterval(function(){
                    if(FunUtil.Global.reSendTime == 0){
                        clearInterval(FunUtil.Global.reSendInterval);
                        $this.removeClass('phone-disable');
                        $this.addClass('phone-active');
                        $this.html('获取验证码');
                        FunUtil.Global.canSendMs = true;
                        FunUtil.Global.reSendTime = 60;
                        return
                    }
                    $this.html(FunUtil.Global.reSendTime + '秒后重发');
                    FunUtil.Global.reSendTime--;
                },1000);
            };

            /*手机验证码登录事件*/
            FunUtil.phoneLoginFunc=function(){

                //点击发送手机验证码
                $("#get_phone_cord").unbind('click').bind('click',function(){
                    if(cookie.getCookie('isSendMs')){
                        common.showMobileTip('发送过于频繁，请稍后再试');
                    }else{
                        var phone = $("#login_phone_input").val();
                        FunUtil.sendSMSNewUsername(phone);
                    }
                });

                //输入验证码
                $(".phone-code-input").unbind('keyup').bind('keyup',function(e){
                    var $this = $(this), i = $this.attr('data-index');

                    if(e.keyCode==8) {  //按下删除键
                        if(i>1){
                            $('#phone_code_input_'+(i-1)).focus();
                        }
                    }else {
                        //FunUtil.phoneLoginRemote(e, i);
                        FunUtil.phoneLoginRemote();
                    }
                });
            };

            //var obj = {};
            //FunUtil.phoneCode = function(i) {
            //    var currArrVal = obj[""+i];
            //    if(!currArrVal) {
            //        var val = $('#phone_code_input_'+i).val();
            //        if(val) {
            //            obj[i+""] = val;
            //            i++;
            //            if(i == 5) i = 1;
            //            var val = $('#phone_code_input_'+i).val();
            //            if(val == '') {
            //                $('#phone_code_input_'+i).focus();
            //            }else {
            //                var len = Object.keys(obj).length;
            //                if(len < 4) {
            //                    i++;
            //                    if(i == 5) {
            //                        i = 1;
            //                    }
            //                    FunUtil.phoneCode(i);
            //                }
            //            }
            //        }else {
            //            $('#phone_code_input_'+i).focus();
            //        }
            //    }else {
            //        var len = Object.keys(obj).length;
            //        if(len < 4) {
            //            i++;
            //            if(i == 5) i = 1;
            //            FunUtil.phoneCode(i);
            //        }
            //
            //    }
            //};


            //清空输入验证码
            FunUtil.clearPhoneCode=function(){
                $(".phone-code-input").val('');
            };

            //检验是否可以输入手机验证码
            FunUtil.checkIsCanInputCode=function() {
                var phoneNumber = $("#login_phone_input").val();
                //console.log(FunUtil.Global.isSendPhoneCode)
                if(phoneNumber==''){
                    common.showMobileTip('请先输入手机号');
                    FunUtil.clearPhoneCode();
                    return;
                }
                if(!(/^(1+[0-9]{10})$/.test(phoneNumber))){
                    common.showMobileTip("手机号格式错误");
                    FunUtil.clearPhoneCode();
                    return;
                }
                if( FunUtil.Global.isSendPhoneCode==false){
                    common.showMobileTip("请先获取短信验证码");
                    FunUtil.clearPhoneCode();
                    return;
                }
            };


            //手机号直接登录
            FunUtil.phoneLoginRemote = function(e, i){
                //var phoneCodeStr='';
                //FunUtil.phoneCode(i);

                FunUtil.checkIsCanInputCode();

                var phoneCodeStr='';
                for(var i=1;i<=4;i++){
                    var val=$('#phone_code_input_'+i).val();
                    phoneCodeStr+=val;

                    if(val!=''&&i<4){
                        $('#phone_code_input_'+(i+1)).focus();
                    }
                }


                var phoneNumber = $("#login_phone_input").val(),phoneCode = phoneCodeStr;

                if(phoneNumber && phoneCode.length==4 && FunUtil.Global.canLogin){
                    FunUtil.Global.canLogin = false;
                    remote.newLogin.phoneLogin(phoneNumber,phoneCode,function(data){
                        console.log(data);
                        if(data.code == 1){
                            if(data.msg){
                                common.showMobileTip('系统检测到您是初次登录，</br>已为您创建账号。');
                                setTimeout(function(){
                                    cookie.setCookie('token', null);
                                    cookie.setCookie('token', data.token, 30);
                                    FunUtil.openBackUrl({"type":"account"});
                                },2000);
                            }else{
                                cookie.setCookie('token', null);
                                cookie.setCookie('token', data.token, 30);
                                FunUtil.openBackUrl({"type":"account"});
                            }
                        }else{
                            switch (data.code){
                                case "-1":common.showMobileTip('手机验证码错误');break;
                                case "-2":common.showMobileTip('手机验证码已过期');break;
                                case "-7":common.showMobileTip('请先获取短信验证码');break;
                            }
                            FunUtil.Global.canLogin = true;
                        }
                    })
                }
            };



            /*微信登录*/
            FunUtil.weixinChooseLogin = function(data) {
                var weixinInfo=data.weixinInfo, nickname=weixinInfo.nickname, userInfoList=data.userInfoList,str='';

                $(userInfoList).each(function(){
                    var name = this.nick_name || this.nr_name;
                    var ele='<div class="weixin-account-one" data-id="'+this.nr_id+'">'+name+'</div>';
                    str+=ele;
                });

                var html = [
                    '<div class="weixin-user-box">',
                    '<div class="weixin-user-head"></div>',
                    '<div class="weixin-user-name"><span>'+nickname+'，</span>欢迎回来</div>',
                    '<p>请选择您想要登录的账号</p>',
                    '<div class="weixin-user-account-box">'+str+'</div>',
                    '</div>'
                ];
                $("#weixin_login_show").html(html.join(''));
                if(weixinInfo.headimgurl){
                    $('.weixin-user-head').css({'background':'url('+weixinInfo.headimgurl+') no-repeat','background-size':'cover'});
                }
                FunUtil.wxChooseAccount();

            };

            FunUtil.common4openUrl   = function(url,tag){
                if(!String.HasText(url))  return;

                var id4url = "until-open-url";
                var $url   = $("#"+id4url);
                tag    = String.HasText(tag) ?tag:"_self";

                if( $url.length <= 0)  $("body").append('<a style="color: #f6f6f6;"><span id="'+id4url+'" >a</span></a>');

                $url  = $("#"+id4url);
                var $this = $url.closest("a");
                $this.attr("href",url).attr("target",tag);
                $url.click();
            };

            FunUtil.weixinLoginRemote=function(){

                $('#login_wx_auth_bth').unbind('click').bind('click',function(){
                    //var currrentUrl=window.location.href.split('?')[0].split("#")[0];
                    var currrentUrl=window.location.href.split("#")[0];
                    var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+memory.appId.test+'&redirect_uri='+currrentUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                    FunUtil.common4openUrl(url);
                });

            };

            FunUtil.weixinAuth=function(){
                var code=request['key'];
                
                if(code){
                    $('#account_login_show').hide();  //解决微信登录重定向跳转两个页面问题

                    remote.newLogin.weixinLoginPhone(code,function(data){
                        if(data){
                            if(data.code==1){
                                var userSize=data.userSize;
                                if(userSize==0||userSize==1){   //为0代表没有绑定微信,为其自动创建账号，为1直接登录
                                    cookie.setCookie('token', null);
                                    cookie.setCookie('token', data.token, 30);
                                    FunUtil.openBackUrl({"type":"weixin"});
                                }else if(userSize>1){
                                    $('#account_login_show').hide();
                                    $('#weixin_login_show').show();
                                    $('body').addClass('body-bg-gray');
                                    FunUtil.weixinChooseLogin(data);
                                }
                            }else{
                                //common.showMobileTip('登录失败');
                                PageInfo.FunUtil.common4openUrl({"url":"login"});
                   
                            }
                        }
                    });
                }


            };


            FunUtil.wxChooseAccount=function(){
                $('.weixin-account-one').unbind('click').bind('click',function(){
                    var nr_id=$(this).attr('data-id');
                    if(FunUtil.Global.canLogin){
                        FunUtil.Global.canLogin = false;
                        remote.newLogin.loginChoose(nr_id,'',function(data){
                            console.log(data);
                            if(data.code == 1){
                                cookie.setCookie('token', null);
                                cookie.setCookie('token', data.token, 30);
                                FunUtil.openBackUrl({"type":"weixin"});
                            }else if(data.code == -1){
                                common.showMobileTip('该账号不存在')
                            }else if(data.code == -2){
                                common.showMobileTip('未通过微信验证，请重新登录')
                            }else if(data.code == -10000){
                                common.showMobileTip('该账号已被冻结')
                            }
                            FunUtil.Global.canLogin = true;
                        });
                    }

                });
            };


            //FunUtil.handleBack=function(){
            //    history.pushState({ page: 1 }, "title 1", "?page=1");
            //
            //    window.onpopstate = function(event){
            //        var code=request['code'];
            //        //alert('code');
            //        alert(window.location.href);
            //        if(code||JSON.stringify(event.state) == '{"page":1}'){
            //            window.location.href = window.location.href.split('?')[0];
            //        }
            //        //if (JSON.stringify(event.state) == '{"page":1}') {
            //        //    alert('ok');
            //        //    window.location.href = unescape(backUrl);
            //        //}
            //        //if(code){
            //        //    window.location.href = 'index.html';
            //        //}
            //    };
            //};


            /*============================初始执行=====================*/

            FunUtil.init=function(){
                FunUtil.switchLoginTab();
                FunUtil.accountLogin();
                FunUtil.weixinAuth();
                //FunUtil.handleBack();
            };

            FunUtil.init();




        };

        return Page;

    };

    return PageObj;
}});

