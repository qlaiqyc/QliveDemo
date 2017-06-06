
PageInfo.register({"type": "plug","info": function(require) {
	
	/*公共 footer 部分*/
	
		var FunUtil = {};
	 	
	 	FunUtil.mobileBottomMenu	= function(active){

	        var indexName=(active=='index')?'active':'',
	            listName=(active=='list')?'active':'',
	            aboutName=(active=='about')?'active':'';
	
	        var html=[
	            '<div class="m-footer">',
	                '<a >',
	                    '<div class="f-div f-index '+indexName+'">',
	                        '<span class="iconfont icon-xdn-home-default"></span>',
	                        '<p>首页</p>',
	                    '</div>',
	                '</a>',
	                '<a  >',
	                    '<div class="f-div f-list '+listName+'">',
	                        '<span class="iconfont icon-xdn-bangdan-default"></span>',
	                        '<p>榜单</p>',
	                    '</div>',
	                '</a>',
	                '<a  >',
	                    '<div class="f-div f-about '+aboutName+'">',
	                        '<span class="iconfont icon-xdn-guanyu-default"></span>',
	                        '<p>关于</p>',
	                    '</div>',
	                '</a>',
	            '</div>'
	        ];

        return{
            init:(function(){
                if($('.m-footer').length==0){
                    $("body").append(html.join(''));
                }
            }())
        }

    };

	 	FunUtil.mobileReturnUp		= function(){
	        $("body").append('<div class="m-return-top" id="m_return_top" style="position: fixed;bottom:60px;right: 20px;z-index:1002;width: 60px;height: 60px;display: none;"><div class=" iconfont icon-xdn-back" style="font-size: 2.5rem;color:#333;margin: 14px 0 0 20px;opacity: .5;filter: alpha(opacity=50);"></div></div>');
	
	        return{
	            init:(function(){
	                var $returnUp=$(".m-return-top");
	                if($('.m-footer').length==0){
	                    $('#m_return_top').css('bottom','20px');
	                }else{
	                    $('#m_return_top').css('bottom','60px');
	                }
	
	                $returnUp.click(function(e){
	                    e.stopPropagation();
	                    $("html, body").stop().animate({
	                        scrollTop:0
	                    },"fast");
	                });
	                $(window).scroll(function () {
	                    var top=$(window).scrollTop();
	                    if(top>600){
	                        $returnUp.show();
	                    }else{
	                        $returnUp.hide();
	                    }
	                });
	            }())
	        }
	    };

	 	
	 	return FunUtil

}});