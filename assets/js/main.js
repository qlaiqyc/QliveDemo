PageInfo.register({"type":"Start","info":function(){
 	
	/**
	 * 所有入口通过初始化进入 Start
	 * require: 需要哪些 外部引用
	 * 
	 * Pub: 公共方法对象
	 * Global: 此模块下全局遍历对象
	 * Router : 路由对象 
	 * */
	
	var Start = {};
	
	Start.require = {
		"$":"jquery"
	};
	Start.Router ={
	 	flag:"hash",
	 	list:{
	 		 "index"	:"/assets/js/components/index",
	 		 "list"		:"/assets/js/components/list",
	 		 "mine"		:"/assets/js/components/mine",
	 		 "wechatSubscription":"/assets/js/components/wechatSubscription",
	 		 "search":"/assets/js/components/search",
	 		 "reset":"/assets/js/components/reset",
	 		 "rankcoin":"/assets/js/components/rankcoin",
	 		 "projectDetail":"/assets/js/components/projectDetail",
	 		 "product":"/assets/js/components/product",
	 		 "original":"/assets/js/components/original",
	 		 "newsSearch":"/assets/js/components/newsSearch",
	 		 "news":"/assets/js/components/news",
	 		 "login":"/assets/js/components/login",
	 		 "chongzhiCard":"/assets/js/components/chongzhiCard",
	 		 "all":"/assets/js/components/all",
	 		 "aboutNewrank":"/assets/js/components/aboutNewrank",
	 		 "about":"/assets/js/components/about",
	 		 "detail":"/assets/js/components/detail",
	 		 "phoneRegister":"/assets/js/components/phoneRegister"

			}
	 };
	
	Start.Global = {
		"id":"qlive-body",  //所有 主DIV
		"name":"",       //项目名称
		"debug":true
	};
	 
	Start.Pub =function(){
		var code = PageInfo.FunUtil.common4getUrlParam()["code"];
		if(String.HasText(code)) {
			var url = window.location.origin+window.location.pathname+"#/login?key="+code;
			PageInfo.FunUtil.common4openUrl(url);
		}
	};
	
	
 	
 	return Start;
	
}});



