/**
 * Created by helin on 2017/5/15.
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

            var  common      = this.common,
                memory      = this.memory,
                remote      = this.remote,
                cookie      = this.cookie,
                md5         = this.md5,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                backUrl     = request["back"];

            if(backUrl==undefined){
                backUrl='mine';
            }

            FunUtil.Global = {
                canReset:false,
                phoneNumber:'',
                phoneCode:'',
                passWord:'',
                canSendMs:true,
                userNameIsExists:false,
                reSendInterval:'',
                reSendTime:60,
                isSendCode:false
            };


            /*控制注册按钮是否可点击*/
            FunUtil.changeRegBtn=function(){
                var regPhonePVal =$('#reg_phone_input').val(), regPhoneCodePVal =$('#reg_phone_code_input').val(), regPhonePwdVal =$('#reg_phone_pwd_input').val();

                if(regPhonePVal&&regPhoneCodePVal&&regPhonePwdVal){
                    $('#phone_reg_btn').attr('disabled',false).css('background-color','#ff8c00');
                }else{
                    $('#phone_reg_btn').attr('disabled',true).css('background-color','#ffd6b2');
                }

                //清除密码是否可见
                var $clearPhoneRegPwdPwd=$('#clear_phone_reg_pwd');
                if(regPhonePwdVal){
                    $clearPhoneRegPwdPwd.show();
                }else{
                    $clearPhoneRegPwdPwd.hide();
                }
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
                if( FunUtil.checkPhoneIsExit() == false) return;

                if(FunUtil.Global.userNameIsExists){
                    FunUtil.Global.isSendCode = true;
                    cookie.setCookie("isSendMs",true,1/1440);
                    if(FunUtil.Global.canSendMs){
                        FunUtil.setMsCount();
                    }
                    remote.newLogin.sendSMSNewUsername(phone,"resetpass",function(result){
                        if(result == -1){
                            common.showMobileTip('验证码发送失败')
                        }else if(result == -2){
                            common.showMobileTip('当天发送短信已达上限')
                        }
                    });
                }

            };

            //发送手机验证码倒计时
            FunUtil.setMsCount = function(){
                var $this = $("#get_phone_cord");
                $this.removeClass('phone-active');
                $this.addClass('phone-disable');
                $this.html(FunUtil.Global.reSendTime+'秒后重发');
                FunUtil.Global.reSendTime--;
                FunUtil.Global.canSendMs = false;
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

            //检查必填项
            FunUtil.checkActive = function(){
                FunUtil.Global.phoneNumber = $("#reg_phone_input").val();
                FunUtil.Global.phoneCode = $("#reg_phone_code_input").val();
                FunUtil.Global.passWord = $("#reg_phone_pwd_input").val();

                if(FunUtil.Global.phoneNumber !='' && FunUtil.Global.phoneCode !='' && FunUtil.Global.passWord != ''){
                    if(!(/^(1+[0-9]{10})$/.test(FunUtil.Global.phoneNumber))){
                        common.showMobileTip("手机号格式错误");
                        return;
                    }else if(FunUtil.Global.isSendCode==false){
                        common.showMobileTip('请先获取验证码');
                        return;
                    }else if(FunUtil.Global.phoneCode.length<4){
                        common.showMobileTip("验证码错误");
                        return;
                    }else if(FunUtil.Global.passWord.length<6){
                        common.showMobileTip('密码不能小于6位');
                        return;
                    }else{
                        FunUtil.Global.canReset = true;
                    }
                }else{
                    FunUtil.Global.canReset = false;
                }
            };

            //检查账号是否存在
            FunUtil.checkPhoneIsExit=function(){
                var phoneVal=$('#reg_phone_input').val();
                remote.newLogin.usernameExists(phoneVal,function(result){
                    //console.log(result)
                    if(result.code == 1){
                        FunUtil.Global.userNameIsExists = true;
                    }else if(result.code == 0){
                        common.showMobileTip('该账号不存在');
                    }
                    return FunUtil.Global.userNameIsExists;
                });
            };

            FunUtil.phoneRegFunc=function(){
                $('#reg_phone_input').unbind('keyup').bind('keyup',function(){
                    FunUtil.changeRegBtn();
                });

                $('#reg_phone_code_input').unbind('keyup').bind('keyup',function(){
                    FunUtil.changeRegBtn();
                });

                $('#reg_phone_pwd_input').unbind('keyup').bind('keyup',function(){
                    FunUtil.changeRegBtn();
                });

                //清除密码
                $('#clear_phone_reg_pwd').unbind('click').bind('click',function(){
                    $('#reg_phone_pwd_input').val('');
                    FunUtil.changeRegBtn();
                });

                //点击密码是否可见
                $('#view_phone_reg_pwd').bind('click',function(){
                    var $regPwd=$('#view_phone_reg_pwd');
                    if($regPwd.hasClass('icon-xdn-bukejian')){  //可见
                        $regPwd.removeClass('icon-xdn-bukejian').addClass('icon-xdn-kejian');
                        $('#reg_phone_pwd_input').attr('type','text');
                    }else{
                        $regPwd.addClass('icon-xdn-bukejian').removeClass('icon-xdn-kejian');
                        $('#reg_phone_pwd_input').attr('type','password');
                    }
                });


                //点击发送手机验证码
                $("#get_phone_cord").unbind('click').bind('click',function(){

                    if(cookie.getCookie('isSendMs')){
                        common.showMobileTip('发送过于频繁，请稍后再试');
                    }else{
                        var phone = $("#reg_phone_input").val();
                        FunUtil.sendSMSNewUsername(phone);
                    }
                });

                //点击重置密码按钮
                $('#phone_reg_btn').unbind('click').bind('click',function(){
                    FunUtil.checkActive();

                    if(FunUtil.Global.canReset && FunUtil.Global.userNameIsExists &&FunUtil.Global.passWord.length>=6){
                        remote.newLogin.checkRetrievePass(FunUtil.Global.phoneNumber,FunUtil.Global.phoneCode,function(result){
                            console.log(result);
                            if(result.code == 1){
                                FunUtil.resetCode();
                            }else if(result.code == -1){
                                common.showMobileTip('手机验证码错误');
                            }else if(result.code == -2){
                                common.showMobileTip("验证码已过期")
                            }else if(result.code == -3){
                                common.showMobileTip('该账号不存在')
                            }else if(result.code == -7){
                                common.showMobileTip("请先获取验证码")
                            }
                        });
                    }
                });
            };

            FunUtil.resetCode=function(){
                remote.newLogin.RetrievePass(FunUtil.Global.phoneNumber,FunUtil.Global.passWord,FunUtil.Global.passWord,function(data){
                    if(data.code == 1){
                        common.showMobileTip("密码重置成功");
                        setTimeout(function(){
                            FunUtil.resetAfterLogin();
                        },1000);
                    }else if(data.code == -1){
                        common.showMobileTip('找回时间过长');
                    }else if(data.code == -2){
                        common.showMobileTip('手机号码错误');
                    }else if(data.code == -4){
                        common.showMobileTip('密码重置失败');
                    }
                })
            };


            //处理backURL跳转
            FunUtil.openBackUrl=function(){
                if(backUrl.indexOf("http") < 0) {
                    PageInfo.FunUtil.common4openUrl({"url":backUrl});
                }else{
                    PageInfo.FunUtil.common4openUrl(backUrl);
                }
            };

            //重置密码成功后登录
            FunUtil.resetAfterLogin=function(){
                var passWord = md5(md5(FunUtil.Global.passWord)+memory.mdValue);
                remote.newLogin.usernameLogin(FunUtil.Global.phoneNumber,passWord,"","",function(data){
                    if(data.code == 1){
                        cookie.setCookie('token', null);
                        cookie.setCookie('token', data.token);
                        FunUtil.openBackUrl();
                    }else if(data.code == -10000){
                        common.showMobileTip('账号被冻结');
                    }
                });
            };


            FunUtil.phoneRegFunc();

        };

        return Page;

    };

    return PageObj;
}});

