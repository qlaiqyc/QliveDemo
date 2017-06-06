/**
 * Created by helin on 2017/4/7.
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
                request       = PageInfo.FunUtil.common4getUrlParam(),
                formatNumGt1w = common.formatNumGt1w,
                module        = request["module"];
            common.mobileBottomMenu();
            common.mobileReturnUp();


            FunUtil.init=function(){
                var page_title;
                $('.common-module').hide();
                if(module=='original'||module == undefined){
                    page_title='原创';
                    FunUtil.showOriginal();
                }else if(module=='hot'){
                    page_title='热文';
                    FunUtil.showHots();
                }else if(module=='project'){
                    page_title='专题';
                    FunUtil.showProject();
                }else if(module=='topic'){
                    page_title='热点聚焦';
                    FunUtil.showTopic();
                }
                document.title = page_title;
            };

            //FunUtil.showOriginal();
            FunUtil.switchTab=function($module,$tab){
                $('.module-main').show();
                $('.top-nav a').removeClass('active');
                $module.show();
                $tab.addClass('active');
            };

            FunUtil.tabClick=function(){
                $('.top-nav a').click(function(){
                	var $this = $(this);
                	if($this.hasClass("active")) return;
                	
                    $('.top-nav a').removeClass('active');
                    $this.addClass('active');
                    module = $this.data("href");
                 	PageInfo.FunUtil.common4openUrl({"url":"original?module="+module});
                   
                   // FunUtil.init();
                });
            };







            //============================原创=============================
            FunUtil.originalObj={pageNumber:'1',totalPage:'',type:'科技互联网'};

            var defaultOriginalFlag=0;
            FunUtil.allOriginalType=function(){
                $('#hover_all_type').html('');
                //$('#custom_type').html("");
                var arr=['科技互联网','时事政治','社会新闻','母婴育儿','美妆时尚','金融财经','宗教','娱乐','幽默笑话','艺术文化','星座占卜','文学','图片','体育', '视频','情感','汽车','旅游','历史','军事','教育培训','健康医疗', '工业农业','房产','餐饮美食','其他'];
                $(arr).each(function(){
                    defaultOriginalFlag++;
                    var selectFirst=(defaultOriginalFlag==1)?'wx-selected':'';
                    var html='<span data-type="'+this+'" class="'+selectFirst+'">'+this+'</span>';
                    $('#hover_all_type,#custom_type').append(html);
                });
            };

            FunUtil.switchOriginalType=function(){
                var removeSelected=function(type,ele){
                    $('#hover_all_type span').removeClass('wx-selected');
                    $('#custom_type span').removeClass('wx-selected');
                    FunUtil.originalObj.type=type;
                    FunUtil.originalObj.pageNumber=1;
                    ele.addClass('wx-selected');
                    $('#hot_article').html('');
                    FunUtil.originalHotsWord();
                    FunUtil.originalTotalPage();
                    FunUtil.originalRemote(type);
                    $('#original_bottom_tip').hide().text('已为您加载更多');
                };

                $('#hover_all_type span').click(function(){
                    removeSelected($(this).attr('data-type'),$(this));
                    $('.hover-all-type').hide();
                    $('#arrow_i').removeClass('icon-xdn-shangla');
                });

                $('#custom_type span').click(function(){
                    removeSelected($(this).attr('data-type'),$(this));
                });
            };

            FunUtil.originalTotalPage=function(){
                remote.original.getOriginalArticleCount(FunUtil.originalObj.type,function(data){
                    var page = parseInt(data/6 + (data%6 > 0 ? 1 : 0));
                    FunUtil.originalObj.totalPage=page;
                })
            };

            FunUtil.originalRemote=function(){
                var type=FunUtil.originalObj.type,pageNumber=FunUtil.originalObj.pageNumber;
                $('#original_loading').show();
                remote.original.getOriginalArticle(type,pageNumber,'6',function(data){
                    FunUtil.originalArticle(data);
                    FunUtil.loadImg($('.left-hot-img img'));
                    $('#original_loading').hide();
                });
            };

            FunUtil.showAllOriginalType= function () {
                $('#arrow').click(function(){
                    var $arrowIcon=$('#arrow_i');
                    if($arrowIcon.hasClass('icon-xdn-shangla')){
                        $arrowIcon.removeClass('icon-xdn-shangla');
                        $('.hover-all-type').hide();
                    }else{
                        $arrowIcon.addClass('icon-xdn-shangla');
                        $('.hover-all-type').show();
                    }
                });
            };

            FunUtil.originalArticle=function(data){
                //$('#hot_article').html("");
                $(data).each(function(){
                    var tag=doNull(this.tag),tagStr='';
                    tag=tag.replace('，',',').split(',');
                    if(tag){
                        $(tag).each(function(index){
                            //if(index>1) return;
                            //var ele='<a target="_blank" href="'+memory.rootUrl.data+'articleResult.html?value='+escape(tag[index])+'&flag=true">'+tag[index]+'</a>';
                            var ele='<span>'+tag[index]+'</span>';
                            tagStr+=ele;
                        });
                    }

                    var html=[
                        '<a href="'+doNull(this.link)+'&rd2werd=1'+'" target="_blank">',
                        '<div class="hot-one clear">',
                        '<div class="left-hot-img">',
                        '<img src="/m/assets/img/default.png" data-src="'+doNull(this.picture)+'" alt=""/>',
                        '</div>',
                        '<div class="right-hot-info">',
                        '<div class="h-title">'+doNull(this.title).getSubStr(50)+'</div>',
                        '<div class="h-author">'+doNull(this.author)+'</div>',
                        '<div class="h-bottom clear">',
                        '<span class="h-date">'+doNull(this.publish_time).pastTime()+'</span>',
                        '<div class="h-tag">',
                        '<i class="iconfont icon-xdn-tag"></i>',
                        '<div class="h-tag-div">'+tagStr+'</div>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '</a>'
                    ];
                    $('#hot_article').append(html.join(''));
                });

            };

            FunUtil.loadImg=function($img){
                $($img).each(function(){
                    var $self=$(this);
                    if($self.attr('src')==$self.attr('data-src')||$self.attr('data-src')=='') return;
                    var a = $self.offset().top;
                    if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                        $self.attr('src',$self.attr('data-src'));
                    }
                })
            };

            FunUtil.originalHotsWord=function(){
                $('#in_hot').html('');
                remote.original.getOriginalArticleTopic(FunUtil.originalObj.type,function(data){
                    if(data.length>0){
                        $(data).each(function(index){
                            if(index>1) return;
                            var last=(index+1==data.length)?'hot-words-box-last':'';
                            var topicArr=doNull(this.topic).split('#'),str='';
                            $(topicArr).each(function(){
                                var ele='<span>'+this+'</span>';
                                str+=ele;
                            });

                            var html=[
                                '<div class="hot-words-box">',
                                '<i class="iconfont icon-xdn-tag"></i>',
                                '<div class="original-tag">'+str+'</div>',
                                '</div>'
                            ];
                            $('#in_hot').show().append(html.join(''));
                        });
                    }else{
                        $('#in_hot').hide();
                    }
                });

            };

            FunUtil.originalBindScroll=function(){
                $(window).bind("scroll", function(){
                    FunUtil.loadImg($('.left-hot-img img'));
                    if (FunUtil.originalObj.pageNumber >= FunUtil.originalObj.totalPage) {
                        return;
                    }
                    var  distanceTopHeight = $(document).scrollTop();
                    var  distanceBottomHeight = distanceTopHeight - ($(document).height()-$(window).height());
                    if(distanceBottomHeight >= 0) {
                        setTimeout(function(){
                            FunUtil.originalObj.pageNumber ++;
                            if(FunUtil.originalObj.pageNumber >= FunUtil.originalObj.totalPage) {
                                $('#original_bottom_tip').show().text('已加载所有数据');
                            }else{
                                $('#original_bottom_tip').show().text('已为您加载更多');
                            }
                            FunUtil.originalRemote();
                        }, 50);
                    }
                });
            };

            FunUtil.showOriginal=function(){
                FunUtil.switchTab($('.original-module'),$('.original'));
                FunUtil.allOriginalType();
                FunUtil.switchOriginalType();
                FunUtil.showAllOriginalType();
                FunUtil.originalRemote();
                FunUtil.originalHotsWord();
                FunUtil.originalTotalPage();
                FunUtil.originalBindScroll();
            };




            //============================热文=============================
            var defaultHotFlag=0;
            FunUtil.allWxType=function(){
                $('.hover-all-wx-type').html('');
                $('#wx_type').html('');
                var arr=['时事','民生','财富','科技','创业','汽车','楼市','职场','教育','学术','政务','企业','文化','百科','健康','时尚','美食','乐活','旅行','幽默','情感','体娱','美体','文摘'];
                $(arr).each(function(){
                    defaultHotFlag++;
                    var selectFirst=(defaultHotFlag==1)?'wx-selected':'';
                    var html='<span data-type="'+this+'" class="'+selectFirst+'">'+this+'</span>';
                    $('#hover_all_wx_type,#wx_type').append(html);
                });
            };

            FunUtil.wxHotRemote=function(type){
                if(type==undefined) type='时事';
                $('#hot_loading').show();
                remote.original.getOriginalHotArticle(type,function(data){
                    //console.log(data);
                    FunUtil.fillWxArticle(data);
                    //FunUtil.loadBackgroundImg($('.wx-left-head'));
                    //FunUtil.wxArticleBindScroll();
                    $('#hot_loading').hide();
                })
            };

            FunUtil.showAllWxType= function () {
                $('#wx_arrow').click(function(){
                    var $arrowIcon=$('#wx_arrow_i');
                    if($arrowIcon.hasClass('icon-xdn-shangla')){
                        $arrowIcon.removeClass('icon-xdn-shangla');
                        $('.hover-all-wx-type').hide();
                    }else{
                        $arrowIcon.addClass('icon-xdn-shangla');
                        $('.hover-all-wx-type').show();
                    }
                });
            };

            FunUtil.switchWxType=function(){
                var removeSelected=function(){
                    $('#hover_all_wx_type span').removeClass('wx-selected');
                    $('#wx_type span').removeClass('wx-selected');
                };

                $('#hover_all_wx_type span').click(function(){
                    removeSelected();
                    $(this).addClass('wx-selected');
                    $('.hover-all-wx-type').hide();
                    $('#wx_arrow_i').removeClass('icon-xdn-shangla');
                    FunUtil.wxHotRemote($(this).attr('data-type'));
                });

                $('#wx_type span').click(function(){
                    removeSelected();
                    $(this).addClass('wx-selected');
                    FunUtil.wxHotRemote($(this).attr('data-type'));
                });
            };

            FunUtil.fillWxArticle=function(data){
                $('#wx_article').html('');
                $(data).each(function(){
                    var self=this,str='';
                    if(self.articles.length>0){
                        $(self.articles).each(function(index){
                            var last=(index+1==self.articles.length)?'wx-list-one-last':'';
                            var ele=[
                                '<a href="'+doNull(this.url)+'&rd2werd=1'+'" target="_blank">',
                                '<div class="wx-list-one  '+last+'">',
                                '<p class="w-list-title">'+doNull(this.title)+'</p>',
                                '<div class="w-time-read clear">',
                                '<span class="wx-time">'+doNull(this.rank_date).pastTime()+'</span>',
                                '<div class="wx-read">',
                                '<i class="iconfont icon-xdn-read"></i>',
                                '<span class="wx-read-num">'+formatNumGt1w(doNull(this.clicks_count))+'</span>',
                                '</div>',
                                '</div>',
                                '</div>',
                                '</a>'
                            ];
                            str+=ele.join('');
                        });
                    }

                    var html=[
                        '<div class="wx-one clear">',
                        '<div class="wx-account-div">',
                        '<div class="wx-left-head" style="background:url(http://open.weixin.qq.com/qr/code/?username='+doNull(self.account)+') no-repeat scroll 50% center /512% auto transparent;"></div>',
                        //'<div class="wx-left-head" data-src='+doNull(self.account)+' style="background:url('+memory.rootUrl.main+'m/assets/img/default_wx_head.png);background-size: cover;"></div>',
                        '<div class="wx-right-name" data='+doNull(self.account)+'>',
                        '<a class="wx-name" >'+doNull(self.author)+'</a>',
                        '<div class="wx-account">'+doNull(self.account)+'</div>',
                        '</div>',
                        '</div>',
                        '<div class="wx-list">',
                        str,
                        '</div>',
                        '</div>'
                    ];
                    $('#wx_article').append(html.join(''));

                });

                $('.wx-right-name').each(function(){
                    $(this).unbind('click').bind('click',function(){
                        PageInfo.FunUtil.common4openUrl({"url":'detail?account='+$(this).attr('data')});
                    });
                });

            };


            FunUtil.loadBackgroundImg=function($img){
                $($img).each(function(){
                    var $self=$(this);
                    //if($self.attr('src')==$self.attr('data-src')||$self.attr('data-src')=='') return;
                    if($self.data('is-load')=='true'||$self.attr('data-src')=='') return;
                    var a = $self.offset().top;
                    //console.log($self.data('is-load'));
                    if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                        $self.css('background','url(http://open.weixin.qq.com/qr/code/?username='+$self.attr('data-src')+') no-repeat scroll 50% center /512% auto transparent');
                        $self.data('is-load','true');
                    }
                })
            };

            //FunUtil.wxArticleBindScroll=function(){
            //    $(window).bind("scroll", function(){
            //        FunUtil.loadBackgroundImg($('.wx-left-head'));
            //    });
            //};

            FunUtil.showHots=function(){
                FunUtil.switchTab($('.hot-module'),$('.hot'));
                FunUtil.showAllWxType();
                FunUtil.wxHotRemote();
                FunUtil.allWxType();
                FunUtil.switchWxType();
            };


            //============================专题=============================
            FunUtil.projectRemote=function(){
                remote.original.getOriginalIncidentAll(function(data){
                    console.log(data);
                    FunUtil.fillProject(data);
                    FunUtil.loadImg($('.left-p-img img'));
                });
            };

            FunUtil.fillProject=function(data){
                var $projectsList= $('#projects_list');
                //$projectsList.html("");
                $(data).each(function(){
                    var html=[
                        '<div class="project-one clear">',
                        '<div class="project-left">',
                        '<i class="iconfont icon-xdn-circle"></i>',
                        '<span class="p-time">'+doNull(this.publish_time).DateFormat("yyyy-MM-dd")+'</span>',
                        '</div>',
                            '<div class="project-article clear" data-href="'+this.id+'">',
                                '<div class="left-p-img">',
                                    '<img src="/m/assets/img/default.png" alt="" data-src="'+doNull(this.logo)+'">',
                                '</div>',
                                '<div class="right-p-info">'+doNull(this.title).getSubStr(100)+'</div>',
                            '</div>',
                        '</div>'
                    ];
                    $projectsList.append(html.join(''));
                });

                $('#project_left_line').height($projectsList.height()-18);

                $('.project-article').each(function(){
                    $(this).unbind('click').bind('click',function(){
                        PageInfo.FunUtil.common4openUrl({"url":"projectDetail?id="+$(this).data("href")});
                    });
                })

            };

            FunUtil.projectScroll=function(){
                $(window).scroll(function () {
                    FunUtil.loadImg($('.left-p-img img'));
                });
            };

            FunUtil.showProject=function(){
                FunUtil.switchTab($('.project-module'),$('.project'));
                FunUtil.projectRemote();
                FunUtil.projectScroll();
            };


            //============================热点聚焦=========================
            FunUtil.topicObj={pageNumber:'1',totalPage:'',type:'微博'};

            FunUtil.topicTotalPage=function(){
                remote.original.getOriginalHotSearchCount(FunUtil.topicObj.type,function(data){
                    //console.log(data);
                    FunUtil.topicObj.totalPage=data;
                })
            };

            FunUtil.topicRemote=function(){
                $('#topic_loading').show();
                remote.original.getOriginalHotSearch(FunUtil.topicObj.type,FunUtil.topicObj.pageNumber,'2',function(data){
                    //console.log(data);
                    FunUtil.topicList(data);
                    $('#topic_loading').hide();
                });
            };

            FunUtil.topicSwitch=function(){
                $('.topic-top-tab span').click(function(){
                    $('.topic-top-tab span').removeClass('checked');
                    $(this).addClass('checked');
                    $('#topic_main').html('');
                    $('#topic_bottom_tip').hide().text('已为您加载更多');
                    FunUtil.topicObj.pageNumber=1;
                    FunUtil.topicObj.type=$(this).attr('data');
                    FunUtil.topicTotalPage();
                    FunUtil.topicRemote();
                })
            };

            FunUtil.topicBindScroll=function(){
                FunUtil.topicTotalPage();
                $(window).bind("scroll", function(){
                    if (FunUtil.topicObj.pageNumber >= FunUtil.topicObj.totalPage) {
                        return;
                    }
                    var  distanceTopHeight = $(document).scrollTop();
                    var  distanceBottomHeight = distanceTopHeight - ($(document).height()-$(window).height());
                    if(distanceBottomHeight >= 0) {
                        setTimeout(function(){
                            FunUtil.topicObj.pageNumber ++;
                            if(FunUtil.topicObj.pageNumber >= FunUtil.topicObj.totalPage) {
                                $('#topic_bottom_tip').show().text('已加载所有数据');
                            }else{
                                $('#topic_bottom_tip').show().text('已为您加载更多');
                            }
                            FunUtil.topicRemote();
                        }, 50);

                    }
                });
            };

            FunUtil.topicList=function(data){
                var $topicMain= $('#topic_main'),str='';
                //$topicMain.html("");
                var circleStyle=(FunUtil.topicObj.type=='百度')?'baidu-circle':'',listBoxStyle=(FunUtil.topicObj.type=='百度')?'baidu-list-box':'';

                $(data).each(function(){
                    var self=this;
                    $(self.data).each(function(){
                        var ele=[
                            '<a href="'+doNull(this.url)+'" target="_blank">',
                            '<div class="list-row">',
                            '<span class="hot-title">'+doNull(this.word)+'</span>',
                            '<span class="index">'+doNull(this.num)+'</span>',
                            '</div>',
                            '</a>'
                        ];
                        str+=ele.join('');
                    });

                    var html=[
                        '<div class="wb-topic-container">',
                        '<div class="wb-left-line topic-line" id="wb_left_line" ></div>',
                        '<div class="wb-list">',
                        '<div class="list-one clear">',
                        '<i class="iconfont icon-xdn-circle circle '+circleStyle+'"></i>',
                        '<div class="list-box '+listBoxStyle+'">',
                        '<div class="list-top">',
                        '<i class="iconfont icon-xdn-time"></i>',
                        '<span>更新于：'+doNull(self.time.pastTime())+'</span>',
                        '</div>',
                        '<div class="topic-box">'+str+'</div>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '</div>'
                    ];
                    $topicMain.append(html.join(''));
                });

                $('#wb_left_line').height($topicMain.height()-18);
            };

            FunUtil.showTopic=function(){
                FunUtil.switchTab($('.topic-module'),$('.topic'));
                FunUtil.topicRemote();
                FunUtil.topicSwitch();
                FunUtil.topicBindScroll();
            };


            //============================初始化=========================
            FunUtil.init();
            FunUtil.tabClick();
        };
        
        return Page;

    };

    return PageObj;
}});

