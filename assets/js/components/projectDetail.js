/**
 * Created by helin on 2017/4/11.
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
        	
        	var $ = this.$;
            var common      = this.common,
                remote      = this.remote,
                doNull      = common.doNull,
                request     = PageInfo.FunUtil.common4getUrlParam()


            common.mobileReturnUp();
            FunUtil.Global={datas:''};


            FunUtil.remoteFunc=function(){
                var id=request['id'];
                
                remote.original.getIncidentById(id,function(data){
                    //data={"update_time":"2017-04-10 19:43:50","publish_time":"2017-04-10 19:42:19","description":"昨晚，五月天“人生无限公司”演唱会在黄龙体育场举行了首场演出。距离上次五月天来杭州开唱，已经过去4年，作为华语乐坛第一天团的歌迷们，满格的“饥渴度”一旦被释放，能量是惊人的，现场甚至出现了“场内3万人看演唱会，场外几百人听演唱会”的奇景。而网友也夸张戏谑，“今天杭州一半的共享单车，都被骑到黄龙看演唱会了”。","logo":"http://p1.ifengimg.com/cmpp/2017/04/09/05/05636329-609f-4c33-8bfe-5ed3509626b3_size471_w550_h740.jpg","id":"34","visits_times":"2000","title":"数百歌迷在入口外跟唱进场前一路被拉扫二维码","keyword":"二维码","article":[{"groups":"前期","articles":[{"author":"新闻哥","publish_time":"2017-04-09 19:08:02","name":"笨贼抢劫后跑路 一头冲进对面派出所被抓，这方向感可以说神准了","link":"http://mp.weixin.qq.com/s?__biz=MjM5MTMwOTU4MA==&mid=2654752676&idx=1&sn=aee1cb0ba4e1cba2be629879b4cb82b9&chksm=bd7f65c78a08ecd15849bd5a2107eceef68994d7ed63b33cfa229ea47d92ed165640c94dcee1&scene=4","id":"67","account":"newsbro","picture":"http://img.xdnphb.com/ueditor/edit/upload/cover/20170410/1491824539942089584.jpg","content":"劫匪：我这样算不算自首啊警察同志？"},{"author":"FM93交通之声","publish_time":"2017-04-09 08:07:50","name":"太可怕了！浙A、浙B、浙C、浙D、浙E…浙江车主都在看…","link":"http://mp.weixin.qq.com/s?__biz=MTIzNDg3NzY2MA==&mid=2653019516&idx=1&sn=cb1e9d36060c35215b811d186f4676d1&chksm=7a7036cf4d07bfd9d3d9bc6a23325dd769ed417bbf3a73265c0beca9dc03c0419ab49a078925&scene=4","id":"68","account":"hifm93","picture":"http://img.xdnphb.com/ueditor/edit/upload/cover/20170410/1491824540926017721.jpg","content":"来源：爱洛阳、网络版权归原作者所有，如有侵权请及时联系你平时下车后都是怎么做的？赶快看看吧，太可怕了~如果觉"}]},{"groups":"中期","articles":[{"author":"人民日报","publish_time":"2017-04-09 19:00:48","name":"你不是出生在和平的年代，而是一个和平的国家","link":"http://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2666154929&idx=1&sn=67314f6f8890cf52c77052398b57f0fb&chksm=bdb222f28ac5abe4286a6dcb8b1ff96df3b8e9127cf335717435f630f80c1622c0e5eb65c91f&scene=4","id":"69","account":"rmrbwx","picture":"http://img.xdnphb.com/ueditor/edit/upload/cover/20170410/1491824542043099360.jpg","content":"且行且珍惜！"},{"author":"冯站长之家","publish_time":"2017-04-09 05:50:48","name":"今日聚焦：习普会谈，背后暗流涌动？会谈，强烈释放一个信号，就四字，字字与你有关！","link":"http://mp.weixin.qq.com/s?__biz=MzA5OTQyMDgyOQ==&mid=2652552805&idx=2&sn=f62c30e9b352610af3d877e57bc29e17&chksm=8b6c8197bc1b0881a0a37f528e58050a19f159117dbb17a995b40d56af8768e6fb96478b5aae&scene=4","id":"70","account":"fgzadmin","picture":"http://img.xdnphb.com/ueditor/edit/upload/cover/20170410/1491824630940027801.jpg","content":"人不犯我，我不犯人！ 朝鲜战争，突破三八线之前，中国，按兵不动！ 萨德部署，没有供地协议前，乐天，生意兴隆！"}]}],"status":"1"}
                    FunUtil.Global.datas=data;
                     
                });
            };

            FunUtil.topLatest=function(){
                $('#top_date').html(doNull(FunUtil.Global.datas.publish_time).DateFormat("yyyy-MM-dd"));
                $('#l_title').html(doNull(FunUtil.Global.datas.title));
                $('#l_summary').html(doNull(FunUtil.Global.datas.description).getSubStr(140));
                $('#banner_top_img').css('background-image','url('+FunUtil.Global.datas.logo+')');
            };

            FunUtil.groupArticle=function(){
                FunUtil.topLatest();
                var article=FunUtil.Global.datas.article;

                $(article).each(function(){
                    var self=this,str='';

                    /*每个group下面的文章*/
                    if(self.articles!=''){
                        $(self.articles).each(function(index){
                            var rowLast=(index+1==self.articles.length&&self.groups!='')?'hot-one-last':'';

                            var ele=[
                                '<a href="'+doNull(this.link)+'" target="_blank">',
                                '<div class="hot-one clear '+rowLast+'" id="hot_one_'+this.id+''+index+'">',
                                '<div class="left-hot-img">',
                                '<img src="/m/assets/img/default.png" data-src="'+doNull(this.picture)+'">',
                                '</div>',
                                '<div class="right-hot-info">',
                                '<div class="h-title">'+doNull(this.name).getSubStr(50)+'</div>',
                                '<div class="h-bottom clear">',
                                '<div class="account-div">',
                                '<span class="h-account">'+doNull(this.author)+'</span>',
                                '</div>',
                                '<div class="h-time">'+doNull(this.publish_time.DateFormat("yyyy-MM-dd"))+'</div>',
                                '</div>',
                                '</div>',
                                '</div>',
                                '</a>'
                            ];
                            str+=ele.join('');
                        });
                    }

                    if(self.articles!=''){
                        var groupLeft=(self.groups=='')?'group-left-spe':'';
                        var sectionOneSpe=(self.groups=='')?'section-one-spe':'';

                        var html=[
                            '<div class="section-one clear '+sectionOneSpe+'">',
                            '<div class="group-left '+groupLeft+'">',
                            '<span class="group-name">'+doNull(self.groups)+'</span>',
                            '</div>',
                            '<div class="group-list">'+str+'</div>',
                            '</div>'
                        ];
                        $('.projects-group').append(html.join(''));
                    }
                });

            };

            FunUtil.loadImg=function(){
                $( $('.left-hot-img img')).each(function(){
                    var $self=$(this);
                    if($self.attr('src')==$self.attr('data-src')||$self.attr('data-src')=='') return;
                    var a = $self.offset().top;
                    //判断元素是否在可视区域
                    if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                        $self.attr('src',$self.attr('data-src'));
                    }
                })
            };



            /*分享*/

            FunUtil.setWeixin = function(cfg){
                var nonceStr = cfg.nonceStr;
                var timestamp = cfg.timestamp;
                var signature = cfg.signature;
                var appid = cfg.appid;
                var link = window.location.href;
                var title = FunUtil.Global.datas.title;
                var desc = FunUtil.Global.datas.description;
                var imgUrl = FunUtil.Global.datas.logo;
                wx.config({
                    debug: false,
                    appId: appid,
                    timestamp:timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: ['checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'showMenuItems',
                        'hideMenuItems',
                        'hideAllNonBaseMenuItem'
                    ]
                });
                wx.ready(function(){
                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        link: link, // 分享链接
                        imgUrl : imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: desc, // 分享描述
                        link: link, // 分享链接
                        imgUrl : imgUrl, // 分享图标
                        type: '',
                        dataUrl: '',
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: link, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    //wx.hideAllNonBaseMenuItem();
                    wx.showMenuItems({
                        menuList: ['appMessage','menuItem:share:timeline','menuItem:share:appMessage','menuItem:share:qq'] // 要显示的菜单项，所有menu项见附录3
                    });
                });
            };

            FunUtil.ajaxWeixin = function(){
                var url = window.location.href;
                remote.common.showdata(url,function(result){
                    FunUtil.setWeixin(result );
                });
            };

            FunUtil.weixinShare=function(){
                FunUtil.ajaxWeixin();
            };

            FunUtil.scroll=function(){
                $(window).scroll(function () {
                    FunUtil.loadImg();
                });
            };







            FunUtil.remoteFunc();
            FunUtil.groupArticle();
            FunUtil.weixinShare();

            FunUtil.loadImg();
            FunUtil.scroll();
        };

        return Page;

    };

    return PageObj;
}});


