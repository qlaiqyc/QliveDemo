PageInfo.register({"type":"Obj","info":function(){
	
    var PageObj = {};
	
	PageObj.require = {
		"$":"jquery",
		"common":"common",
		"api":"/assets/js/components/common/data-api",
		"swiper":"swiper" 
	};
	
	PageObj.page = function(){
		
		var FunUtil = {};
	    var HtmUtil = {};
    	var Page 	= {};
		
		Page.show = function(){
 
		 	console.log(this);
	 	 	var $ = this.$;
		 	var swiper= this.swiper; 
		    var common	= this.common,
				remote	= this.api.search,
				doNull	= common.doNull;
		  
			common.mobileBottomMenu('index');
			common.mobileReturnUp();
	 	
	 		this.api.common4share({
	 			"title":"我是一个粉刷匠",
	 			 "desc":"粉刷本领强",
	 			 "link":"https://hao.360.cn/?wd_xp1",
	 			 "imgUrl":"http://newranktest.oss-cn-hangzhou.aliyuncs.com/original/2017/05/04/52d8168e52bc46098033404d7a94f56d.jpg?uuid=1493881826974.4236"
	 		});
	 		 
	 	
		    HtmUtil.activityList = function(){
		        remote.getCmsMedia(4,function(data){
		            $.each(data,function(i,item){
		                $(".nav-activity-right").append(
		                    "<a class='nav-activity-li' href='"+item.url+"'><!--<span style='color:rgb(255,79,79);font-size:0.85rem;'>【News】</span>-->"+item.title+"</a>"
		                );
		            })
		        })
		
		    };
		
		    HtmUtil.init = function(data){
		        $.each(data,function(i,item){
		            $("#zixun").append(
		                "<div class='zixun-detail'>" +
		                "<div class='index-zixun-left'><img style='width:9.28rem;height:5.35rem;' src='/m/assets/img/default.png' data-src='"+doNull(item.cms_media_img)+"'/></div>" +
		                "<a class='index-zixun-right' href='"+doNull(item.url)+"&rd2werd=1"+"'>" +
		                "<p class='index-zixun-right-top'>"+item.title.getSubStr(36)+"</p>"+
		                "<p class='index-zixun-right-bottom'>"+doNull(item.public_time).DateFormat('yyyy-MM-dd')+"</p>"+
		                "</a>"+
		                "</div>"
		            );
		        })
		    };
		
		    FunUtil.loadImg = function(){
		        $( $('.index-zixun-left img')).each(function(){
		            var $self=$(this);
		            if($self.attr('src')==$self.attr('data-src') || $self.attr('data-src') == "" || $self.attr('data-src') == undefined) return;
		            var a = $self.offset().top;
		            //判断元素是否在可视区域
		            if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
		                $self.attr('src',$self.attr('data-src'));
		            }
		        })
		    };
		
		    HtmUtil.messageList = function(){
		        remote.getCmsMediaListCount(function(data){
		            var nowPage = 1,page =Math.ceil(data/10);
		            $(window).scroll(function(){
		                var distance = $('body').height() - window.innerHeight;
		                if($(this).scrollTop() - distance > 0){
		                    if(nowPage < page){
		                        nowPage += 1;
		                        $("#hot_loading").show();
		                        remote.getCmsMediaList(nowPage,10,function(data){
		                            HtmUtil.init(data);
		                            $("#hot_loading").hide();
		                        });
		                    }else{
		                        $("#explain").show();
		                        $("#explain").addClass("margin-bottom");
		                        $("#zixun").removeClass("margin-bottom");
		                    }
		                };
		                FunUtil.loadImg();
		            })
		
		            $(".m-loading").show();
		            remote.getCmsMediaList(nowPage,10,function(data){
		                $("#zixun").addClass("margin-bottom");
		                HtmUtil.init(data);
		                $(".m-loading").hide();
		                FunUtil.loadImg();
		            })
		        });
		    };
		
		    HtmUtil.special = function(){
		        remote.getOriginalIncident(2,function(data){
		            $.each(data,function(i,item){
		                var logo=item.logo == ''?'/m/assets/img/default.png' : item.logo;
						var $specialImgLi=$('.special-img-li');

						if($specialImgLi.length<=2){
							$('.special-img').append(
								"<a class='special-img-li' data-href='"+item.id+"' style='background-image:url("+ logo +")'>" +
								"<div class='banner-left-mask'></div>"+
								"<div class='special'>专题</div>"+
								"<p class='special-title'>"+item.title+"</p>"+
								"</a>"
							)
						}
		            });

					$("a.special-img-li").unbind("click").bind("click",function(){
						PageInfo.FunUtil.common4openUrl({"url":"projectDetail?id="+$(this).data("href")});
					});
		        })
		    };
		
		    FunUtil.scroll = function(){
		        var _wrap=$('.nav-activity-right');
		        var _interval=2000;
		        var _moving;
		        _wrap.hover(function(){
		            clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
		        },function(){
		            _moving=setInterval(function(){
		                var _field=_wrap.find('.nav-activity-li:first');//此变量不可放置于函数起始处,li:first取值是变化的
		                var _h=_field.height();
		                _field.animate({marginTop:-_h+'px'},600,function(){//通过取负margin值,隐藏第一行
		                    _field.css('marginTop',0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
		                })
		            },_interval)
		        }).trigger('mouseleave');
		    };
		
		    FunUtil.lunbo = function(){
			 
		    	 remote.getBannerList(function(data){
		        	
		            var str = "";
		            for(var i=0;i<data.length;i++){
		                str +='<a class="swiper-slide" href="'+data[i].click_url+'"><img class="banner"  src="'+data[i].img_url+'"/></a>';
		            }
		            $(".swiper-wrapper").append(str);
		
		
		            $("#banner,img.banner,.swiper-slide").css("width",$(window).width());
		            var swiper = new Swiper('.swiper-container', {
		                pagination: '.swiper-pagination',
		                paginationClickable: true,
		                spaceBetween: 0,
		                centeredSlides: true,
		                autoplay: 4000,
		                autoplayDisableOnInteraction: false,
		                loop:true,
		                observer:true,
		                observeParents:true
		            });
		
		            $(".swiper-container").on("touchstart",function(event){
		                //var event = event || window.event;
		                //event.preventDefault();
		                swiper.stopAutoplay();
		            }).on("touchmove",function(event){
		                var event = event || window.event;
		                event.preventDefault();
		            }).on("touchend",function(){
		                swiper.startAutoplay();
		            })
		        });
		
		      
		       
		    };
		
		    FunUtil.events=function(){

				$("#index_search").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl({"url":"search"});
				});

				$("a.icon-xdn-haonei").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl('http://data.newrank.cn/m/s.html?s=NyotPD42');
				});

				$("a.icon-xdn-remen").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl({"url":"original?module=original"});
				});

				$("a.icon-xdn-tuiwu").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl('http://cec.newrank.cn');
				});

				$("a.icon-xdn-rongzi").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl('http://accelerator.newrank.cn');
				});

				$("a.icon-xdn-all").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl({"url":"all"});
				});

				$("a.more-hot").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl({"url":"original?module=hot"});
				});

				$("a.more-news").unbind("click").bind("click",function(){
					PageInfo.FunUtil.common4openUrl({"url":"news"});
				});

			};
					 
			
			FunUtil.init4pub = function(){

				FunUtil.events();
				FunUtil.lunbo();
			    HtmUtil.activityList();
			    HtmUtil.messageList();
			    HtmUtil.special();
			    FunUtil.scroll();
			    FunUtil.loadImg();
			};
			
			
			FunUtil.init4pub();
		};
		
		return Page;
		
	};
	
	return PageObj;
}});

