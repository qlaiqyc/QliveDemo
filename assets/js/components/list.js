/**
 * Created by helin on 2017/4/12.
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
                doNull      = common.doNull,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                period      = request["period"],
                category    = request["category"];

            common.mobileBottomMenu('list');

            FunUtil.Global  ={rank_name_group:'资讯',rank_name:'时事',startDate:'',endDate:''};


            FunUtil.init=function(){
                var page_title;
                if(period=='day'||period == undefined){
                    period='day';
                    page_title='日榜';
                    $('#month_report').hide();
                }else if(period=='week'){
                    page_title='周榜';
                    $('#month_report').hide();
                }else if(period=='month'){
                    page_title='月榜';
                }
                $('.top-nav a').removeClass('active');
                $('.'+period).addClass('active');
                document.title = page_title;
            };

            FunUtil.tabClick=function(){
                $('div.top-nav a').unbind("click").bind("click",function(){
                    var $this = $(this);
                    if($this.hasClass("active")) return;
                    
                    $('div.top-nav a').removeClass('active');
                    
                    $this.addClass('active');
                    //PageInfo.FunUtil.common4openUrl({"url":"list?period="+$this.data("href")});
                    period  = $this.data("href");
                    $('#top_type').text('时事');
                    FunUtil.init4pub();
                });
            };

            //当url传有category时
            FunUtil.handleCategory=function(){
                if(category){
                    var typeDiv=$('.choose-wx-type-div span');
                    typeDiv.removeClass('active');
                    var rankName=unescape(category);
                    console.log(rankName);
                    typeDiv.each(function(){
                        if($(this).text()==rankName){
                            $(this).addClass('active');
                            FunUtil.Global.rank_name=$(this).text();
                            $('#top_type').text($(this).text());
                            FunUtil.listRemote();
                        }
                    });
                }else{
                    FunUtil.listRemote();
                }
            };




            var defaultWxTypeFlag=0;
            FunUtil.WxTypeList=function(){
                var arr=['时事','民生','财富','科技','创业','汽车','楼市','职场','教育','学术','政务','企业','文化','百科','健康','时尚','美食','乐活','旅行','幽默','情感','体娱','美体','文摘'];
                var buf = '';
                $(arr).each(function(){
                    defaultWxTypeFlag++;
                    var active=(defaultWxTypeFlag==1)?'active':'';
                  	 buf += ('<span class="'+active+'">'+this+'</span>');
                });
                
                $('#choose_wx_type_div').html(buf);
            };

            var defaultDateFlag=0;
            FunUtil.dateList=function(arr){
            	var buf = '';
                $(arr).each(function(){
                    defaultDateFlag++;
                    var active=(defaultDateFlag==1)?'active':'';
                    var date,dateStyle='';
                    if(period=='day'){
                        date=this.DateFormat('M月d日');
                    }else if(period=='week'){
                        date=this.split(',')[0].DateFormat('MM月dd日')+'-'+this.split(',')[1].DateFormat('dd日');
                        dateStyle='week-date';
                    }else if(period=='month'){
                        date=this.split(',')[0].DateFormat('yyyy年M月');
                        dateStyle='month-date';
                    }

                    buf +='<span class="'+active+' '+dateStyle+'" data='+this+'>'+date+'</span>';
                });
                  $('#choose_date_div').html(buf);
            };

            FunUtil.selectItem=function(){
                $('#top_right').click(function(){
                    $('.list-mask ,.top-custom-box,#top_confirm').show();
                    $(this).hide();
                });
                $('#top_confirm').click(function(){
                    $('.list-mask ,.top-custom-box,#top_confirm').hide();
                    $('#top_right').show();
                })

            };

            FunUtil.selectDate=function(){
                $('#choose_date_div span').click(function(){
                    $('#choose_date_div span').removeClass('active');
                    $(this).addClass('active');

                    if(period=='day'){
                        $('#top_date').text($(this).attr('data').DateFormat('MM月dd日'));
                        FunUtil.Global.startDate=FunUtil.Global.endDate=$(this).attr('data').DateFormat('yyyy-MM-dd');
                    }else if(period=='week'){
                        $('#top_date').text($(this).attr('data').split(',')[0].DateFormat('MM月dd日')+'-'+$(this).attr('data').split(',')[1].DateFormat('dd日'));
                        FunUtil.Global.startDate=$(this).attr('data').split(',')[0];
                        FunUtil.Global.endDate  =$(this).attr('data').split(',')[1];
                    }else if(period=='month'){
                        $('#top_date').text($(this).attr('data').split(',')[0].DateFormat('MM月'));
                        FunUtil.Global.startDate=$(this).attr('data').split(',')[0];
                        FunUtil.Global.endDate  =$(this).attr('data').split(',')[1];
                        FunUtil.monthReportHref();
                    }
                    FunUtil.listRemote();
                });
            };

            FunUtil.selectType=function(){
                $('#choose_wx_type_div span').click(function(){
                    $('#choose_wx_type_div span').removeClass('active');
                    $(this).addClass('active');
                    $('#top_type').text($(this).text());
                    FunUtil.Global.rank_name=$(this).text();
                    FunUtil.listRemote();
                });
            };

            //日榜最近七天计算
            FunUtil.fillDate=function(start){
                var strDate = start.split(" ")[0].split('-');
                var d = new Date(strDate[0], strDate[1] -1, strDate[2]);
                var dateArr=[];
                $('#top_date').html(new Date(d.getTime()).Format("MM月dd日"));
                FunUtil.Global.startDate=FunUtil.Global.endDate=new Date(d.getTime()).Format("yyyy-MM-dd");
                for (var i=0; i< 7;i++) {
                    var dd = new Date(d.getTime() - 24 * 3600 * 1000 * i);
                    var startDate = dd.Format("yyyy-MM-dd");
                    dateArr.push(startDate);
                }
                FunUtil.dateList(dateArr);
            };

            //周榜最近三周计算
            FunUtil.fillWeekDate=function(start){
                var strDate = start.split(" ")[0].split('-');
                var d = new Date(strDate[0], strDate[1] -1, strDate[2]);
                var dateArr=[];
                var latestStartDate=new Date(d.getTime());
                var latestEndDate=new Date(latestStartDate.getTime() + 24 * 3600 * 1000 * 6);
                FunUtil.Global.startDate=latestStartDate.Format("yyyy-MM-dd");
                FunUtil.Global.endDate=latestEndDate.Format("yyyy-MM-dd");
                $('#top_date').html(latestStartDate.Format('MM月dd日')+'-'+latestEndDate.Format('dd日'));
                for (var i=0; i< 3;i++) {
                    var dd = new Date(d.getTime() - 24 * 3600 * 1000 * i * 7);
                    var ddEnd = new Date(dd.getTime() + 24 * 3600 * 1000 * 6);
                    var startDate = dd.Format("yyyy-MM-dd");
                    var endDate = ddEnd.Format("yyyy-MM-dd");
                    var startAndEnd=startDate+','+endDate;
                    dateArr.push(startAndEnd);
                }
                FunUtil.dateList(dateArr);
            };

            /*月榜最近三月计算*/
            FunUtil.fillMonthDate=function(start){
                var strDate = start.split(" ")[0].split('-');
                var dd = new Date(strDate[0], strDate[1] -1, strDate[2]);
                FunUtil.Global.startDate=start;
                FunUtil.Global.endDate = FunUtil.getLastDay(start.split("-")[0], start.split("-")[1]).Format("yyyy-MM-dd");
                $('#top_date').html(new Date(start).Format('MM月'));
                FunUtil.monthReportHref();
                var dateArr=[];

                for (var i=0; i< 3;i++) {
                    dd =  new Date(dd.getTime() - 1000*3600*24 * i);
                    var endDate=(i==0)?FunUtil.Global.endDate:dd.Format('yyyy-MM-dd');
                    var aDate = dd.Format("yyyy-MM").split('-');
                    dd = new Date(aDate[0], aDate[1]-1,1);
                    var startDate=dd.Format('yyyy-MM-dd');
                    var startAndEnd=startDate+','+endDate;
                    dateArr.push(startAndEnd);
                }
                FunUtil.dateList(dateArr);
            };

            /*计算每月最后一天*/
            FunUtil.getLastDay=function(year,month){
                var new_year = year;  //取当前的年份
                var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
                if(month>12)      //如果当前大于12月，则年份转到下一年
                {
                    new_month -=12;    //月份减
                    new_year++;      //年份增
                }
                var new_date = new Date(new_year, new_month, 1);        //取当年当月中的第一天
                return new Date(new_date.getTime() - 1000 * 3600 * 24);//获取当月最后一天日期
            };

            FunUtil.getDate=function(){
                remote.apiList.getDate(function(data){
                    var startDate;
                    if(period=='day'){
                        startDate = data["WEIXIN_CAL_DAY"].substring(0,10);
                        FunUtil.fillDate(startDate);
                    }else if(period=='week'){
                        startDate = data["WEIXIN_CAL_WEEK"].substring(0,10);
                        FunUtil.fillWeekDate(startDate);
                    }else if(period=='month'){
                        startDate = data["WEIXIN_CAL_MONTH"].substring(0,10);
                        FunUtil.fillMonthDate(startDate);
                    }
                })
            };

            FunUtil.monthReportHref=function(){
                var filter=FunUtil.Global.startDate.DateFormat('yyyy-MM');
                remote.original.getTop500(filter,function(data){
                    if(data[0]){
                        var link=data[0].url,title=data[0].title;
                        var text='查看月报：'+title.getSubStr(34);
                        $('#month_report').text(text).css('display','block').attr('href',link);
                    }else{
                        $('#month_report').css('display','none');
                    }
                })
            };

            FunUtil.listRemote=function(){
                remote.apiList.getList(period, "rank", FunUtil.Global.rank_name_group, FunUtil.Global.rank_name, FunUtil.Global.startDate, FunUtil.Global.endDate ,function(data){
                    FunUtil.fillListData(data);
                });
            };

            FunUtil.fillListData=function(data){
                $('#list_data_table').html('');
                $(data).each(function(index){
                    var even=(index%2==0)?'even':'';
                    var topOneStyle=(this.a==1)?'top-one':'',topTwoStyle=(this.a==2)?'top-two':'',topThreeStyle=(this.a==3)?'top-three':'';

                    var html=[
                        '<tr class="'+even+' list-row-tr" data='+doNull(this.account)+'>',
                        '<td width="16%" class="'+topOneStyle+''+topTwoStyle+''+topThreeStyle+'">'+doNull(this.a)+'</td>',
                        '<td width="54%" align="left">',
                        '<div class="account-div">',
                        '<div class="left-head-img" style="background:url(http://open.weixin.qq.com/qr/code/?username='+ this.account+') no-repeat scroll 50% center / 495% auto transparent"></div>',
                        '<div class="account-info">',
                        '<p class="name">'+doNull(this.name).getSubStr(14)+'</p>',
                        '<p class="account">'+doNull(this.account)+'</p>',
                        '</div>',
                        '</div>',
                        '</td>',
                        '<td>',
                        '<div class="newrank-index">'+parseFloat(this.log1p_mark).toFixed(1)+'</div>',
                        '</td>',
                        '</tr>'
                    ];
                    $('#list_data_table').append(html.join(''));
                });

                $('tr.list-row-tr').unbind("click").bind("click",function(){
                	PageInfo.FunUtil.common4openUrl({"url":"detail?account="+$(this).attr('data')});
                });
            };

				
			FunUtil.init4pub = function(){
				 FunUtil.init();
           		 FunUtil.tabClick();


            //=========================================
           		FunUtil.WxTypeList();
           	 	FunUtil.getDate();
            	FunUtil.selectItem();
            	FunUtil.selectDate();
            	FunUtil.selectType();
            	FunUtil.handleCategory();
				
			};
			
           
			FunUtil.init4pub();

        };
        return Page;

    };

    return PageObj;
}});


