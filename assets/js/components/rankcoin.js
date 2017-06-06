/**
 * Created by helin on 2017/5/18.
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
            var common      = this.common,
                memory      = this.memory,
                remote      = this.remote,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                module      = request["module"];

            common.mobileBottomMenu();
            common.mobileReturnUp();

            FunUtil.Global={pageNumber:'0',totalPage:''};


            FunUtil.init=function(){
                var page_title;
                $('.rankcoin-common').hide();
                if(module=='bd'||module == undefined){
                    page_title='我的榜豆';
                    FunUtil.showMyBangdou();
                }else if(module=='detail'){
                    page_title='交易明细';
                    FunUtil.showTransationDetail();
                }
                document.title = page_title;
            };


            FunUtil.showMyBangdou=function(){
                $('.mine-bangdou').show();
                $('.user-transaction-detail').hide();
            };


            FunUtil.showTransationDetail=function(){
                $('.mine-bangdou').hide();
                $('.user-transaction-detail').show();
            };


            //FunUtil.handleHash=function(){
            //    window.onpopstate= function(){
            //        if(location.hash.indexOf("#detail")>-1){
            //            FunUtil.showTransationDetail();
            //        }else{
            //            FunUtil.showMyBangdou();
            //        }
            //    };
            //};


            FunUtil.events=function(){

                // 交易明细
               $('#b_transaction_detail').click(function(){
                    //location.hash='detail';
                    //FunUtil.showTransationDetail();
                   PageInfo.FunUtil.common4openUrl({"url":"rankcoin?module="+$(this).data("href")});
                });

                //普通充值
                $('.b-pt-chongzhi-btn').click(function(){
                    PageInfo.FunUtil.common4openUrl(memory.rootUrl.pay+'m/chongzhi.html');
                });

                //充值卡充值
                $('.b-card-chongzhi-btn').click(function(){
                    PageInfo.FunUtil.common4openUrl({"url":"chongzhiCard"});
                });
            };


            FunUtil.transationDetailRemote=function(){
                //if(FunUtil.Global.pageNumber >  FunUtil.Global.totalPage && FunUtil.Global.totalPage>1 ) return;

                remote.user.consumeDetailAndBangDou(FunUtil.Global.pageNumber,function(data){
                    //data={"threeMonthBangIncome":"52.00","threeMonthBangDou":"1334.00","bangdou":"7841.00","count":28,"consumeDetailMap":[{"intime":"2017-05-31 18:00:57.0","bangdou":"1.00","order_num":"2AFE825D867CC06D5F755EB123C2B1E6","status":"0"},{"intime":"2017-05-31 17:55:53.0","bangdou":"1.00","order_num":"7E4F0DB8125071F6AF9F1D900F3EA524","status":"0"},{"intime":"2017-05-31 17:48:24.0","bangdou":"50.00","order_num":"30096871F07346455990463E0DCF7F40","status":"0"},{"intime":"2017-05-17 12:41:37.0","bangdou":"100.00","memo":"新榜认证,分钟级监测任务","order_num":"6453D9E74C89451DA2AB929646CBE10A","status":"1"},{"intime":"2017-05-17 12:40:59.0","bangdou":"100.00","memo":"新榜认证,分钟级监测任务","order_num":"29CAA0C201DC4BA28686BD41A33340F3","status":"1"},{"intime":"2017-04-18 15:59:15.0","bangdou":"300.00","memo":"专属搜索升级，时长：1年","order_num":"62D946CDF504453191E34170C5BB3445","status":"1"},{"intime":"2017-04-18 14:08:46.0","bangdou":"1.00","memo":"广告价值临时权限","order_num":"47107789B7254464ABEE86CA46B15A72","status":"1"},{"intime":"2017-04-18 14:08:12.0","bangdou":"1.00","memo":"广告价值临时权限","order_num":"A8AE02E679974D7DBC6CFB9BB3D9E456","status":"1"},{"intime":"2017-04-13 17:38:26.0","bangdou":"300.00","memo":"专属搜索升级，时长：1年","order_num":"68E645EB9D60437397C3FF3240CDC590","status":"1"},{"intime":"2017-04-12 14:43:23.0","bangdou":"100.00","memo":"新榜认证,分钟级监测任务","order_num":"C40E053B1C2B44F884E62539D56DEFAE","status":"1"},{"intime":"2017-03-22 20:50:00.0","bangdou":"432.00","memo":"按公众号任务","order_num":"A360595454BF48FB98EC0B7D02F63C37","status":"1"},{"intime":"2017-02-06 17:20:12.0","bangdou":"100.00","memo":"新榜认证,分钟级监测任务","order_num":"4B1CDD7C6A2840289B8691205A459138","status":"1"},{"intime":"2017-02-06 17:06:37.0","bangdou":"1.00","memo":"广告价值临时权限","order_num":"2FFB07AAD45F438DB00DC3B5403A825C","status":"1"},{"intime":"2017-01-05 17:01:14.0","bangdou":"324.00","memo":"按公众号任务","order_num":"B7B0E989A6544A7F9FBC62ED35EEABB5","status":"1"},{"intime":"2017-01-05 11:59:05.0","bangdou":"3.00","memo":"阅读数查询支付","order_num":"62EE93F4DFFA430DA1E12BE2E81DCC04","status":"1"},{"intime":"2017-01-05 11:58:16.0","bangdou":"198.00","memo":"2016年度微信账号回采","order_num":"827890224D2A4DD8AA9E5DD1DE802617","status":"1"},{"intime":"2016-12-26 11:13:09.0","bangdou":"100.00","memo":"新榜认证,分钟级监测任务","order_num":"CF35E2780E4840078116A38CB6FC318F","status":"1"},{"intime":"2016-12-22 14:21:06.0","bangdou":"100.00","memo":"新榜认证,分钟级监测任务","order_num":"3F54687F46554DAE9B1F5F284216F250","status":"1"},{"intime":"2016-12-14 10:55:19.0","bangdou":"10000.00","memo":"后台充值","order_num":"FBF6985272EF2F2029CA02FAD3F39F50","status":"0"},{"intime":"2016-06-30 09:38:11.0","bangdou":"240.00","memo":"阅读数查询支付","order_num":"164B11D4E79B456EB3D38A5555D5D099","status":"1"}]};
                    console.log(data);
                    if(data!=-999){

                        FunUtil.fillBangdouDetail(data);
                        if(data.consumeDetailMap.length>0 ){
                            //FunUtil.Global.totalPage=parseInt(data.count/20 + (data.count%20 > 0 ? 1 : 0))-1;
                            FunUtil.Global.totalPage=Math.ceil(data.count/20)-1;
                            console.log(FunUtil.Global.totalPage);
                            console.log(FunUtil.Global.pageNumber);
                            FunUtil.transationDetail(data);
                        }else{
                            FunUtil.notTransactionDetail();
                        }
                    }
                });
            };


            FunUtil.fillBangdouDetail=function(data){
                $('#b_bangdou_remain').text(data.bangdou||0);
                $('#b_recent_months_spending').text(data.threeMonthBangDou||0);
                $('#b_recent_months_chongzhi').text(data.threeMonthBangIncome||0);
            };

            var buf="";
            FunUtil.transationDetail=function(data){
                $(data.consumeDetailMap).each(function(){
                    buf+=('<div class="t-list-row"><span>'+(this.intime.DateFormat('yyyy-MM-dd')|| "-")+'</span><span class="t-list-row-cash">' + (this.status == 0 ? '+'+ this.bangdou : '-'+ this.bangdou)  + '</span><span>' + (this.memo || "-") + '</span></div>');
                });
                $('.t-detail-list').html(buf);
            };


            FunUtil.notTransactionDetail=function(){
                $('div.t-detail-list').html('<p class="no-transaction-detail">暂无交易记录</p>');
            };


            FunUtil.bindScroll=function(){
                $(window).bind("scroll", function(){
                    if (FunUtil.Global.pageNumber >= FunUtil.Global.totalPage) {
                        return false;
                    }
                    var  distanceTopHeight = $(document).scrollTop();
                    var  distanceBottomHeight = distanceTopHeight - ($(document).height()-$(window).height());
                    if(distanceBottomHeight >= 0) {
                        setTimeout(function(){
                            FunUtil.Global.pageNumber ++;

                            if(FunUtil.Global.pageNumber >= FunUtil.Global.totalPage) {
                                common.showMobileTip('已为您加载所有数据');
                            }else{
                                common.showMobileTip('即将为您加载更多数据');
                            }
                            FunUtil.transationDetailRemote();
                        }, 300);

                    }
                });
            };



            FunUtil.init();
            FunUtil.transationDetailRemote();
            //FunUtil.handleHash();
            FunUtil.events();
            FunUtil.bindScroll();
        };

        return Page;

    };

    return PageObj;
}});



