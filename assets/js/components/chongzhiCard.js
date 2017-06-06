/**
 * Created by helin on 2017/5/26.
 */

PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$":"jquery",
        "common":"common",
        "memory":"memory",
        "remote":"/assets/js/components/common/data-api"
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){
            var common      = this.common,
                memory      = this.memory,
                remote      = this.remote,
                request     = PageInfo.FunUtil.common4getUrlParam()

            FunUtil.Global={'discount':''};


            //充值卡充值
            FunUtil.fillCardChongZhi=function(){
                var html=[
                    '<div class="clear">',
                    '<span>请输入充值码</span>',
                    '<input type="text" class="cz-card-input" id="cz_card_input" placeholder="卡密不区分大小写"/>',
                    '</div>',
                    '<input type="button" id="card_cz_btn" class="pay-btn card-pay-btn" disabled="true" value="立即充值">'
                ];
                $('#chongzhi_by_card_box').append(html.join(''));
            };


            FunUtil.events=function(){

                //输入充值卡号
                $('#cz_card_input').focus(function(){
                    $(this).addClass('cz-card-input-focus');
                }).bind('keyup',function(){
                    var cardInputVal =$('#cz_card_input').val();
                    if(cardInputVal){
                        $('#card_cz_btn').attr('disabled',false).css('background-color','rgba(227,25,25,1)');
                    }else{
                        $('#card_cz_btn').attr('disabled',true).css('background-color','rgba(227,25,25,0.3)');
                    }
                });


                //点击充值卡充值按钮
                $('#card_cz_btn').click(function(){
                    FunUtil.cardExchangeBangdou();
                });

            };

            FunUtil.cardExchangeBangdou=function(){
                var codeNum=$('#cz_card_input').val();
                remote.user.exchangeBangdou(codeNum,function(data){
                    //console.log(data);
                    if(data.result>0){
                        common.showMobileTip('成功充值100榜豆',55);
                    }else{
                        if(data.result == -100){
                            common.showMobileTip("充值码无效",55);
                        }else if(data.result == -101){
                            common.showMobileTip("充值码已被使用",55);
                        }else if(data.result == -102){
                            common.showMobileTip("充值码已于"+ data.end_time +"过期",55);
                        }else if(data.result == -105){
                            common.showMobileTip("已使用过同期发放的充值码！",55);
                        }else{
                            common.showMobileTip("充值失败",55);
                        }
                    }
                });
            };

            FunUtil.fillCardChongZhi();
            FunUtil.events();

        };
        return Page;

    };

    return PageObj;
}});





