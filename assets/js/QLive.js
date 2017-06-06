(function(window){
	
	/* 
	 * version : 0.0.1 
	 * 目标： 基于Jquery(仅初版)  单页展示dom ，  
	 * 五生  init show update hide destory
	 * init: 页面初始化加载时 执行，仅一次
	 * show: 页面 show 时每次执行
	 * hide: 页面hide  时每次执行
	 * share:页面 show 时每次执行
	 * update  (其他页 ：主要是为了用户体验  预先执行请求判断) +（ 当前模块页面 发生  交互 ，数据变换时触发 Update 动作  自己调用自己，触发执行） 
	 * destory 主要是因为DOM 有长度限制销毁 dom 关系链较长的dom  类似微信的打开多个tab限制， （初版暂时不做）
	 * 
	 * ========配置信息==========
	 * config
	 * 
	 * */
	
	var FunUtil		= {};
	var PageInfo 	= {};
	
	FunUtil.init = function() {
		String.HasText = function(str) {
			if(typeof(str) == "undefined") return false;
			if(str == null) return false;
			if(str == 'null') return false;
			if(str == 'undefined') return false;
	
			if(typeof(str) == 'string')
				str = str.replace(/(^\s*)|(\s*$)/g, '');
			if(str === '') return false;
			return true;
		};
	
		//數組去重
		Array.prototype.unique = function() {
			var res = [];
			var json = {};
			for(var i = 0; i < this.length; i++) {
				if(!json[this[i]]) {
					res.push(this[i]);
					json[this[i]] = 1;
				}
			}
			return res;
		}
	};
	
	FunUtil.init();
	
	FunUtil.common4getUrlParam = function() { 
		var url = location.href; //获取url中"?"符后的字串 
		var theRequest = {}; 
		if (url.indexOf("?") != -1) { 
			var str = url.split("?")[1];
			var strs = str.split("&"); 
			for(var i = 0; i < strs.length; i ++) { 
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
			} 
		} 
		return theRequest; 
	} 
	
	/*
	 * 常用判断工具类
	 * 1.isIN	判断对象是否有这个属性
	 * */
	FunUtil.common4Prop = function(data){
		var execuFun = {};
		
		execuFun.isIN = function(){
			
			return (data.in in data.obj);
		};
		
		return execuFun[data.type]();
	};
	
	FunUtil.common4class = function(data) {
	
		/*
		 * POBJ  根类 ，进行数据底层封装
		 * COBJ  模型类，类似与一个管道，作为注入类，和根类的桥接   (负责一级中转,当init 时拼接div  当 show 时 show , 当hide时hide)
		 * IOBJ  注入类，根据数据注入进行
		 * */
	
		var IOBJ = data;
	
		class POBJ {
			constructor(arg) {}
			data() {
	
			}
	
			init() {
				//console.log("init");
	
				console.log("init");
			}
			update() {}
			show() {
				console.log("show");
			}
			hide() {
				console.log("hide");
			}
			destory() {}
		};
	
		class COBJ extends POBJ {
			constructor(arg) {
				super(arg);
			}
			data() {
				super.data();
	
				//这里有个策略当页面间传参时记录 上一页的数据
	
				if(FunUtil.common4Prop({
						"type": "isIN",
						"in": "data",
						"obj": IOBJ
					})) return IOBJ.data();
			}
			init() {
				super.init();
	
				if(FunUtil.common4Prop({
						"type": "isIN",
						"in": "init",
						"obj": IOBJ
					})) IOBJ.init();
			}
			update() {
				super.update();
	
				if(FunUtil.common4Prop({
						"type": "isIN",
						"in": "update",
						"obj": IOBJ
					})) IOBJ.update();
			}
			show() {
				super.show();
	
				if(FunUtil.common4Prop({
						"type": "isIN",
						"in": "show",
						"obj": IOBJ
					})) {
					var func = new function() {
						for(var p in FunUtil.Global.Page.require) this[p] = FunUtil.Global.Page.require[p];
					};
	
					IOBJ.show.call(func, "var");
				}
			}
			hide() {
				super.hide();
	
				if(FunUtil.common4Prop({
						"type": "isIN",
						"in": "hide",
						"obj": IOBJ
					})) IOBJ.hide();
			}
			destory() {
				super.destory();
	
				if(FunUtil.common4Prop({
						"type": "isIN",
						"in": "destory",
						"obj": IOBJ
					})) IOBJ.destory();
			}
		};
	
		/*
		 *  返回初始类  +监听模块状态进行修改 执行方法
		 * */
		/*异步请求 成功后  注册对象到 全局变量 */
		var b = new COBJ();
	
		return b;
	};
	
	FunUtil.model4dep = function(s) {
		s = s.substring(0, 400);
	
		var st = new Date();
	
		function readch() {
			peek = s.charAt(index++)
		}
	
		function isBlank() {
			return /\s/.test(peek)
		}
	
		function isQuote() {
			return peek == '"' || peek == "'"
		}
	
		function dealQuote() {
			var start = index
			var c = peek
			var end = s.indexOf(c, start)
			if(end == -1) {
				index = length
			} else if(s.charAt(end - 1) != '\\') {
				index = end + 1
			} else {
				while(index < length) {
					readch()
					if(peek == '\\') {
						index++
					} else if(peek == c) {
						break
					}
				}
			}
			if(modName) {
				//maybe substring is faster  than slice .
				res.push(s.substring(start, index - 1))
				modName = 0
			}
		}
	
		function dealReg() {
			index--
			while(index < length) {
				readch()
				if(peek == '\\') {
					index++
				} else if(peek == '/') {
					break
				} else if(peek == '[') {
					while(index < length) {
						readch()
						if(peek == '\\') {
							index++
						} else if(peek == ']') {
							break
						}
					}
				}
			}
		}
	
		function isWord() {
			return /[a-z_$]/i.test(peek)
		}
	
		function dealWord() {
			var s2 = s.slice(index - 1)
			var r = /^[\w$]+/.exec(s2)[0]
			parentheseState = {
				'if': 1,
				'for': 1,
				'while': 1,
				'with': 1
			}[r]
			isReg = {
				'break': 1,
				'case': 1,
				'continue': 1,
				'debugger': 1,
				'delete': 1,
				'do': 1,
				'else': 1,
				'false': 1,
				'if': 1,
				'in': 1,
				'instanceof': 1,
				'return': 1,
				'typeof': 1,
				'void': 1
			}[r]
			isReturn = r == 'return'
			braceState = {
				'instanceof': 1,
				'delete': 1,
				'void': 1,
				'typeof': 1,
				'return': 1
			}.hasOwnProperty(r)
			modName = /^require\s*(?:\/\*[\s\S]*?\*\/\s*)?\(\s*(['"]).+?\1\s*[),]/.test(s2)
			if(modName) {
				r = /^require\s*(?:\/\*[\s\S]*?\*\/\s*)?\(\s*['"]/.exec(s2)[0]
				index += r.length - 2
			} else {
				index += /^[\w$]+(?:\s*\.\s*[\w$]+)*/.exec(s2)[0].length - 1
			}
		}
	
		function isNumber() {
			return /\d/.test(peek) ||
				peek == '.' && /\d/.test(s.charAt(index))
		}
	
		function dealNumber() {
			var s2 = s.slice(index - 1)
			var r
			if(peek == '.') {
				r = /^\.\d+(?:E[+-]?\d*)?\s*/i.exec(s2)[0]
			} else if(/^0x[\da-f]*/i.test(s2)) {
				r = /^0x[\da-f]*\s*/i.exec(s2)[0]
			} else {
				r = /^\d+\.?\d*(?:E[+-]?\d*)?\s*/i.exec(s2)[0]
			}
			index += r.length - 1
			isReg = 0
		}
	
		if(s.indexOf('require') == -1) {
			return []
		}
		var index = 0,
			peek, length = s.length,
			isReg = 1,
			modName = 0,
			res = []
		var parentheseState = 0,
			parentheseStack = []
		var braceState, braceStack = [],
			isReturn
		while(index < length) {
			readch()
			if(isBlank()) {
				if(isReturn && (peek == '\n' || peek == '\r')) {
					braceState = 0
					isReturn = 0
				}
			} else if(isQuote()) {
				dealQuote()
				isReg = 1
				isReturn = 0
				braceState = 0
			} else if(peek == '/') {
				readch()
				if(peek == '/') {
					index = s.indexOf('\n', index)
					if(index == -1) {
						index = s.length
					}
				} else if(peek == '*') {
					var i = s.indexOf('\n', index)
					index = s.indexOf('*/', index)
					if(index == -1) {
						index = length
					} else {
						index += 2
					}
					if(isReturn && i != -1 && i < index) {
						braceState = 0
						isReturn = 0
					}
				} else if(isReg) {
					dealReg()
					isReg = 0
					isReturn = 0
					braceState = 0
				} else {
					index--
					isReg = 1
					isReturn = 0
					braceState = 1
				}
			} else if(isWord()) {
				dealWord()
			} else if(isNumber()) {
				dealNumber()
				isReturn = 0
				braceState = 0
			} else if(peek == '(') {
				parentheseStack.push(parentheseState)
				isReg = 1
				isReturn = 0
				braceState = 1
			} else if(peek == ')') {
				isReg = parentheseStack.pop()
				isReturn = 0
				braceState = 0
			} else if(peek == '{') {
				if(isReturn) {
					braceState = 1
				}
				braceStack.push(braceState)
				isReturn = 0
				isReg = 1
			} else if(peek == '}') {
				braceState = braceStack.pop()
				isReg = !braceState
				isReturn = 0
			} else {
				var next = s.charAt(index)
				if(peek == ';') {
					braceState = 0
				} else if(peek == '-' && next == '-' ||
					peek == '+' && next == '+' ||
					peek == '=' && next == '>') {
					braceState = 0
					index++
				} else {
					braceState = 1
				}
				isReg = peek != ']'
				isReturn = 0
			}
		}
	
		//  alert("==="+s.substring(0,100)+"======"+((new Date()).getTime() - st.getTime()))
		return res
	
	};
	
	FunUtil.common4openUrl = function(data) {
		if(!String.HasText(data)) return;
	
		var url = data.url;
	
		var id4url = "until-open-url";
		var $url = $("#" + id4url);
	
		if($url.length <= 0) $("body").append('<a style="color: #f6f6f6;"><span id="' + id4url + '" >a</span></a>');
	
		$url = $("#" + id4url);
	
		var $this = $url.closest("a");
	
		if(!String.HasText(data.url)) {
			$this.attr("href", data).attr("target", "_self");
	
		} else if(FunUtil.Global.Router) {
			$this.attr("href", "#/" + url).attr("target", "_self");
		} else {
	
			url = url.replace(/\//g, "-");
			var list = url.split("?");
	
			if(list.length == 1) {
				url = list[0] + ".html";
			} else {
				url = list[0] + ".html?" + list[1];
			}
	
			$this.attr("href", url).attr("target", "_self");
		}
	
		$url.click();
	
		setTimeout(function() {
			$this.remove();
		}, 200);
	};
	/*
	 * common 4 缓存
	 * */
	
	FunUtil.common4cache = function(data){
		var  execuFun = {};
		var key 	= data.key;
		var value 	= data.value;
		var model	= data.model;
		
		if(!String.HasText(model)) model = "";
		
		execuFun.setItem = function(){
			if(model == "lo"){
				localStorage.setItem(key,value);
			}else{
				sessionStorage.setItem(key,value);
			}
		};
		
		
		execuFun.getItem = function(){
			var str  ="";
			if(model == "lo"){
				str = localStorage.getItem(key);
			}else{
				str = sessionStorage.getItem(key);
			}
			if(String.HasText(str)) str = JSON.parse(str);
			return	str;
		};
		
		return	execuFun[data.type+"Item"]();
	};
	
	/*
	 * 全局对象属性
	 * 
	 * 1.Router : 页面路由管理 
	 * 	  id:路由 
	 * 	  jid: 模块js 路径
	 *    page:页面对象
	 *    state:页面状态
	 *  1.1:  Jids : 路由映射 id: jid
	 * 2.Page : 新注册的对象 通过page对象中转到Router中
	 * 3.plug： 引入插件是的传参 
	 * 4.id: 页面对象 外包围id
	 * 5.name:项目名称
	 * 
	 * ---一般情况公用----
	 * 6.config,基础配置信息（一般指的是，常用cdn 或者插件）  
	 * 注意：刷新页面
	 * */
	
/*	FunUtil.Global = new Proxy({}, {
		"get": function (obj, sKey) {
   			
		  	return obj[sKey] || undefined;
		},
		"set": function(obj, prop, newval) {
	    
	   		obj[prop] = newval;
	  } 
	});*/
	
	FunUtil.Global = {
		"plug4require":[]
	};
	/*   测试 */
	
	 
	//栈队数组管
	FunUtil.common4Stack = function(data){
		var  execuFun = {};
		
		execuFun.pub = function(){
			
		};
		
		execuFun.hash	 = function(){
			//传统方式 原理  拼接一个a标签  执行点击事件  类似 push 一条记录到 history 中 ,然后删除a标签
			
		};
		execuFun.history = function(){
			//H5 模式 ，原理， 动态修改History 栈中对象， push  replace 
		};
		
		
		execuFun.page = function(){
			// page 栈队处理			
		};
		
		execuFun[data.type]();
	};
	
	
	/*
	 * hash 值 转换 
	 * 
	 * */
	FunUtil.common4hash = function(data){
		var keyword = data.key;
		
		var execuFun = {};
		
		execuFun.encode = function(){
			
			return  keyword.replace(/\#/g,"Qlive").replace(/\//g,"-")
		};
		
		execuFun.decode = function(){
			return  keyword.replace(/\Qlive/g,"#").replace(/-/g,"/")
		};
		
		execuFun.js = function(){
			return  execuFun.decode().replace(/#/g,"");
		};
		
		return execuFun[data.type]();
	};
	
	
	
	
	/*
	 * 通过hash 值或者 history 进行判断执行对象的生命周期
	 * 
	 * 1. 判断  当前是否存在这个新对象  ， （存在 ？  执行这个对象的show 方法 ： 执行这个对象的 init 方法 ）
	 * 2. 隐藏  当前展示对象  （存在 ？ 执行当前对象的 hide 方法， :  不做操作  ）
	 * 
	 * =======开启单页调试===  没有路由注入 ============
	 * 3.
	 * 
	 * */
	
	FunUtil.common4Page = function(data){
		
		var fun4help = {
			"global":{
				"type":"single"
			}
		};
		
		fun4help.common4isfun = function(data){
			//判断数组中 的值是否为一个function 
			var key 	= data.key;
			var value	= data.val;
			var list	= data.list;
			var len		= list.length;
			var result = 0;//0 不在数组中 1 在数组中是function  2 在数组中 是 Object
			
			
			for (var i= 0;i<len;i++) {
				var obj = list[i];
				
				if(obj.k == key){
					if(typeof(obj.v)=="function"){
						
						obj.v = value;
						
						list[i] = obj;
						result =1;
					}else{
						result =2;
					}
				}
			 
			}
			
			if(result == 0) list.push({"k":key,"v":value});
			
			return list;
		};
		fun4help.common4pluglist = function(data){
			var result = [];
			var inlist = data.in;//dep
			var outlist = data.out;//pluglist
			
			for (var i=0;i<inlist.length;i++) {
				var flag = true;
				
				for (var j= 0;j<outlist.length;j++) {
					
					if(inlist[i] == outlist[j].k) {
						flag = false;
					}
				}
				
				if(flag) result.push(inlist[i]);
			}
			
			return result;
			
			
			
			
			
			
		};
		
		
		fun4help.single = function(){
			
				/**
				 * 第一步加OBJ  成功后 输出对象  require plug 加载
				 
				 * 递归迭代 plug 中嵌套加载后：
				 * 
				 * 第一步： 获取所依赖的包  递归循环 由主 到次 依次Push 到 FunUtil.Global.plug4require象中， 当所有子孙节点 length == 0 时 停止循环
				 * 第二步： 由次到主，依次执行 执行这些节点， update  FunUtil.Global.plug4require 中的 value值
		 		 * 第三步：resolve 最终对象
				 * 
				 * */
				var param 	= FunUtil.Global.Page;
				var require = param.require;
				var keys 	= []
				var vals 	= []
				var list 	= [];
				var needsPlug = [];//第一步有 deps 的插件
				var plug4list = [];// 所有 needs 的模块
				
				for(var p in require){
					keys.push(p);
					vals.push(require[p]);
				};
				
				var len 	= keys.length;
				
				for(var i =0 ;i<len;i++) list.push(FunUtil.common4require(vals[i]));
				
				var fun4require = function(key){
					var len = plug4list.length-1;
					var result = {};
					
						for (var i =len;i>-1;i--) {
									var obj = plug4list[i];
							if(obj.k == key ){//|| typeof(obj.k)=="undefined"
								result = obj.v; 
								break 
							}
						}
					
					return result;
				};
				
				Promise.all(list).then(values => {
		 
					FunUtil.Global.Page.require = {};
					var firstlList = [];
					
					
					var plug4tree = function(data){
						var name = data.name;
						var deps = data.info;
						var dlen = deps.length;
			 
						var loadlist = []
					  	for (var i=0;i<dlen;i++) loadlist.push(FunUtil.common4require(deps[i]));  					
						
						Promise.all(loadlist).then(plugs => {
							
							var dlen = plugs.length;
							
							var snewList = [];
							
							
							for (var i=0;i<dlen;i++) {
								
								plug4list.push({"k":FunUtil.Global.plug4list[i],"v":plugs[i]});
								//检测递归判断
								var deps = FunUtil.model4dep(plugs[i].toString());
								var ndeps =  deps.length;
								
								if(deps.length == 0) {
									plug4list.push({"k":deps[i],"v":plugs[i]});
								}else{
									//next 需要加载的数组
									snewList = snewList.concat(deps);		
								}
							}
							
							if(snewList.length == 0){
								var Router = param;
								
							//	console.log('===============')
							//	console.log(plug4list);
								
								//执行plug
								
								var plen = plug4list.length-1;
								
							
								for (var i =plen;i>-1;i--) {
									var obj = plug4list[i];
									plug4list[i].v = obj.v(fun4require); 
									//console.log(plug4list[i].v);
								}
							
								for(var k=0;k<needsPlug.length;k++) FunUtil.Global.Page.require[needsPlug[k]] = plug4list[k].v;
								Router.init();
								Router.show();
								
							}else{
								
								FunUtil.Global.plug4list = snewList;
							
								plug4tree({"name":"","info":snewList})
							}
						});
						
					};
					
					for(var i =0 ;i<len;i++){
						
						var nval = values[i];
						
						if(!String.HasText(nval)) continue;
						
						var dep = FunUtil.model4dep(nval.toString());
						var dlen = dep.length;
						
						if(dlen == 0){
							FunUtil.Global.Page.require[keys[i]] = nval();
						}else{
							plug4list.push({"k":keys[i],"v":nval});
							needsPlug.push(keys[i]);
							FunUtil.Global.plug4list = dep;
							firstlList = firstlList.concat(dep);
							//FunUtil.Global.Page.require[keys[i]] = values[i];
						}
					}
					
					if(firstlList.length == 0){
						var Router = param;
						Router.init();
						Router.show();
						
						console.log(firstlList);
					}else{
						
						FunUtil.Global.plug4list = firstlList;
					
						plug4tree({"name":"","info":firstlList})
					} 
				});
		};
		
		fun4help.model = function(){
			
			data.jid = data.jid.split("?")[0];
		
			var $main	= $("#"+FunUtil.Global.id);
			var Router	= FunUtil.Global.Router;
			var id		= data.jid;
			Router.unshift({});
			var nid		= 0;//Router.findIndex(function(value, index, arr){	if(value.jid == id) return index;  }) -1;
			var oid		= 0;//Router.findIndex(function(value, index, arr){ if(value.state == "show") return index; })-1;
		 	
			for (var i = 0; i < Router.length; i++) {
				var robj = Router[i];

				if (robj.jid == id) nid = i;
				if (robj.state == "show") oid = i;
			}
			
			nid-=1;
			oid-=1;
			Router.shift();
			
			var Npage	= Router[nid];
			var type 	= "noPre";
			
			var execuFun = {};
			
			execuFun.pub = function(data){
				var futil ={};
				
				var url ="/"+ FunUtil.common4hash({"type":"js","key":id+""});
		 	
				futil.getJs =  function(){
					/**
					 * 第一步加载所需JS  成功后 输出对象  require 加载， 然后执行 相应方法
					 * */
					Promise.all([FunUtil.common4require(url)]).then(function (param) {
					//	FunUtil.Global.Page.require = {};
						
						var param = FunUtil.Global.Page;
						var require = param.require;
						var keys = [];
						var vals = [];
						var list = [];
						var needsPlug = [];//第一步有 deps 的插件
						var plug4list = [];// 所有 needs 的模块
				
						
						for(var p in require){
							keys.push(p);
							vals.push(require[p]);
						};
						var len = keys.length;
						
						for(var i =0 ;i<len;i++) list.push(FunUtil.common4require(vals[i]));
				
				
						var fun4require = function(key){
							var len = plug4list.length-1;
							var result = {};
							
							for (var i =len;i>-1;i--) {
								var obj = plug4list[i];
								if(obj.k == key ){//|| typeof(obj.k)=="undefined"
									result = obj.v; 
									break;
								}
							}
							return result;
						};
				
						Promise.all(list).then(values => {
							
							var firstlList = [];
							
							var plug4tree = function(data){
								var name = data.name;
								var deps = data.info;
								var dlen = deps.length;
					 
								var loadlist = []
							  	for (var i=0;i<dlen;i++) loadlist.push(FunUtil.common4require(deps[i]));  					
								
								Promise.all(loadlist).then(plugs => {
									
									var dslen = plugs.length;
									
									var snewList = [];
									
									
									for (var i=0;i<dslen;i++) {
										 
										//检测递归判断
										var deps2 = FunUtil.model4dep(plugs[i].toString());
										var ndeps =  deps2.length;
										
										if(deps2.length ==0) {
											plug4list =fun4help.common4isfun({"key":deps[i],"val":plugs[i](),"list":plug4list}); 
										}else{
											plug4list =fun4help.common4isfun({"key":deps[i],"val":plugs[i],"list":plug4list}); 
											//next 需要加载的数组
											deps2 = fun4help.common4pluglist({"in":deps2,"out":plug4list})
											snewList = snewList.concat(deps2);
										}
									};
									
									if(snewList.length == 0){
										var Router = param;
								 
										//console.log(plug4list);
										
										//执行plug
										plug4list = plug4list;
										var plen = plug4list.length-1;
										
										 /**
										  * pliglist 需要安 执行顺序排序
										  * 0： 没有引用的排最后面
										  * 0： 有引用的 排在 自己引用最大值前面
										  * */
										 
										var sortList = [];
										var ssList	 =[];
										 
										 
										for (var i =0;i<(plen+1);i++) {
											var obj = plug4list[i];
											var ssden = FunUtil.model4dep(obj.v.toString());
											var sslen = ssden.length;
											
											if(sslen == 0){
												ssList.push(obj);
											}else{
												sortList.unshift(obj);
											}
										} 
										 //判断 自己子类中 有的 如果有排在，最前面  
										function bubbleSort(array){
										    /*给每个未确定的位置做循环*/
										    for(var unfix=array.length-1; unfix>0; unfix--){
										      /*给进度做个记录，比到未确定位置*/
										      for(var i=0; i<unfix;i++){
										      	var a = array[i];
										      	var b = array[i+1];
										      	
										      	var result = 1;
										 
												var aden = FunUtil.model4dep(a.v.toString());
												for (var p =0;p<(aden.length);p++) {
													
													if(b.k == aden[p]) result = -1;
												} 
										      	
										        if(result == 1){
										          var temp = array[i];
										          array.splice(i,1,array[i+1]);
										          array.splice(i+1,1,temp);
										        }
										      }
										    }
										    
										    return array;
										  } 
										 sortList = bubbleSort(sortList);
										/* 
										sortList.sort(function(a,b){
											var result = 1;
										 
											var aden = FunUtil.model4dep(a.v.toString());
											for (var i =0;i<(aden.length);i++) {
												
												if(b.k == aden[i]) result = -1;
											} 
											return result;
										});
										*/
										//alert(JSON.stringify(sortList));
										
										sortList = sortList.concat(ssList);
										plug4list = sortList;
										
										for (var i =plen;i>-1;i--) {
											var obj = plug4list[i];
											var sslen = FunUtil.model4dep(obj.v.toString());
											if(sslen.length > 0){
												plug4list[i].v = obj.v(fun4require); 
											}
											
											//console.log(plug4list[i].v);
										}
										
										//执行
										for(var k=0;k<needsPlug.length;k++) {
											
											for (var i =plen;i>-1;i--) {
												var obj = plug4list[i];
												
												if(needsPlug[k] == obj.k) FunUtil.Global.Page.require[needsPlug[k]] = obj.v;
											}
										}
										
										
										FunUtil.Global.Router[nid].page = Router;
										FunUtil.Global.Router[nid].state = "show";
										FunUtil.Global.Router[nid].require = FunUtil.Global.Page.require;
										
										
										$main.append('<div class="' + id + '" ></div');
										$main.find("div."+id).hide();
										$main.find("div."+id).html( Router.data().HtmUtil.layout());
										 
										FunUtil.common4GetCSS({ "url": "../assets/css/" + FunUtil.Global.Router[nid].id + ".css", "callback": function callback() {
												$main.find("div."+id).show();
												Router.init();
												Router.show();
										}});
										
									}else{
										snewList = snewList.unique();
										snewList = fun4help.common4pluglist({"in":snewList,"out":plug4list})
										FunUtil.Global.plug4list = snewList;
										plug4tree({"name":"","info":snewList})
									}
								});
								
							};
							
							for(var i =0 ;i<len;i++){
						
								var nval = values[i];
								if(!String.HasText(nval)) continue;
								
								var dep = FunUtil.model4dep(nval.toString());
								var dlen = dep.length;
								needsPlug.push(keys[i]);
								if(dlen == 0){
									FunUtil.Global.Page.require[keys[i]] = nval();
									if(keys[i] == "$") plug4list.push({"k":"jquery","v":nval()});
									plug4list.push({"k":keys[i],"v":nval()});
								}else{
									plug4list.push({"k":keys[i],"v":nval});
									
									//对dep 中 的对象进行判断，如果加载过了就不在 二次加载了
									dep = fun4help.common4pluglist({"in":dep,"out":plug4list})
									
									
									firstlList = firstlList.concat(dep);
								}
							}
							
							if(firstlList.length == 0){
								var Router = param;
							
								FunUtil.Global.Router[nid].page = Router;
								FunUtil.Global.Router[nid].state = "show";
								FunUtil.Global.Router[nid].require = FunUtil.Global.Page.require;
								
								
								
								$main.append('<div class="' + id + '" ></div');
								$main.find("div."+id).hide();
								$main.find("div."+id).html( Router.data().HtmUtil.layout());
								console.log(FunUtil.Global.Router[nid].jid);		 
								FunUtil.common4GetCSS({ "url": "../assets/css/" + FunUtil.Global.Router[nid].id + ".css", "callback": function callback() {
										$main.find("div."+id).show();
										Router.init();
										Router.show();
								}});
								
								 
							}else{
								firstlList = firstlList.unique();
								/*FunUtil.Global.plug4list = firstlList;*/
								plug4tree({"name":"","info":firstlList})
							} 	
						});
						
					}, function(value) {
					  // 不会被调用
					}); 
				};
				
				futil.getJs()
				
			};
			
			execuFun.noPre =  function(){
			 
				//判断对象是否加载，加载？ 执行 show : 请求JS 成功后回调 执行init
				if(String.HasText(Npage.page)) {
					
					//这个本来不是这种处理的，只是为了 解决 代码不规范问题
					$main.find("div."+id).html(Npage.page.data().HtmUtil.layout());
					
					FunUtil.Global.Page.require = Npage.require;
					Npage.page.show();
					Npage.state = "show";
					
					FunUtil.Global.Router[nid] = Npage;
					
					$main.find("div."+id).show();
				}else{
					execuFun.pub();				
				}
					 
			};
			
			execuFun.hasPre = function(){
				//这种情况下 oid 一定存在  +  hide 时 移除css
				var Opage = Router[oid];
				console.log(Opage.jid);
				Opage.page.hide();
				Opage.state = "hide";
				FunUtil.Global.Router[oid] = Opage;
				
				$main.find("div."+Opage.jid).hide();
				//移除css
				var cssoid = "../assets/css/"+FunUtil.Global.Router[oid].id+".css";
				cssoid = cssoid.replace(/\./g,"").replace(/\//g,"-").substring(1);
				
				$("#"+cssoid).remove();
				
				if(String.HasText(Npage.page)) {
					
					console.log(Npage.jid);
						//这个本来不是这种处理的，只是为了 解决 代码不规范问题
					$main.find("div."+Npage.jid).hide().html(Npage.page.data().HtmUtil.layout());
					FunUtil.Global.Page.require = Npage.require;
					Npage.page.show();
					Npage.state = "show";
				//	Npage.page.data().FunUtil.Global.parent = Opage.page.data().FunUtil.Global.child;
					FunUtil.Global.Router[nid] = Npage;

					FunUtil.common4GetCSS({"url":"../assets/css/"+FunUtil.Global.Router[nid].id+".css","callback":function(){
						$main.find("div."+Npage.jid).show();
					}});
				}else{
				  	execuFun.pub();		
				}
				
				
			};
			
			if(String.HasText(oid) && oid > -1)  type = "hasPre";
			
			execuFun[type]();
			
			
			
			
		};
		
		if(String.HasText(FunUtil.Global.Router)) fun4help.global.type = "model";
		
		fun4help[fun4help.global.type]();
	};
	
	//监听对象
	FunUtil.register4Evet = function(data) {
		var execuFun = {};
	
		execuFun.pub = function() {
			//刷新页面
		};
	
		execuFun.hash = function() {
	
			var ecfun = function() {
	
				var defid = FunUtil.common4hash({
					"type": "decode",
					"key": FunUtil.Global.Router[0].jid
				});
				var key = defid;
				var hash = location.hash;
				if(String.HasText(location.hash)) {
					//判断是否合法  ？ 映射JS ,否，进入主页
					var ids = hash.split("?")[0];
	
					ids = ids.replace("#", "").substring(1);
					var jid = FunUtil.Global.Jids[ids];
	
					if(String.HasText(jid)) key = "#" + jid;
	
				}
				FunUtil.common4Page({
					"jid": FunUtil.common4hash({
						"type": "encode",
						"key": key
					})
				}); //触发hash 事件
			};
	
			window.onhashchange = function(e) {
				//通过hash 值进行判断
				ecfun();
			};
	
			if(String.HasText(FunUtil.Global.Router)) ecfun();
		};
	
		execuFun.history = function() {
	
		};
	
		execuFun[data.type]();
	};
	
	FunUtil.common4GetCSS = function(data) {
		var addheadfile = document.createElement("link");
		//为了解决nginx  跳转问题  data 
	
		// if(String.HasText(FunUtil.Global.name)) ?  FunUtil.Global.name + "-"+data.url
	
		addheadfile.type = "text/css";
		addheadfile.rel = "stylesheet";
		addheadfile.rev = "stylesheet";
		addheadfile.media = "screen";
		addheadfile.href = String.HasText(FunUtil.Global.name) ? data.url.substring(3) : data.url;
		addheadfile.id = data.url.replace(/\./g, "").replace(/\//g, "-").substring(1); // 为了解决 命名不规范
	
		document.head.appendChild(addheadfile);
		
		addheadfile.addEventListener('load', function(){
			
		   	data.callback();
		}, false);
	
		
	};
	/**
	 * 
	 * 按需加载异步请求js
	 * 判断是否缓存 根据打包值
	 * 
	 */
	
	 FunUtil.common4GetJS = function(data) {
	 	var vnum = "0000";
	 	try {
	 		vnum = v4num;
	 	} catch(e) {
	 		vnum = "0000";
	 	}
	 	var request = function(callback) {
	 		var xmlhttp = null;
	 
	 		if(window.XMLHttpRequest) {
	 			xmlhttp = new XMLHttpRequest();
	 		} else if(window.ActiveXObject) {
	 			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	 		}
	 
	 		if(xmlhttp === null) {
	 			alert("不支持咯");
	 			return
	 		};
	 
	 		//xmlhttp.onload  = 
	 
	 		xmlhttp.onreadystatechange = function() {
	 			try {
	 				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	 					if(String.HasText(FunUtil.Global.Router) && FunUtil.Global.debug == false) {
	 						FunUtil.common4cache({
	 							"type": "set",
	 							"key": xmlhttp.responseURL,
	 							"value": JSON.stringify({
	 								"vnum": vnum,
	 								"js": xmlhttp.responseText
	 							}),
	 							"model": "lo"
	 						});
	 					}
	 
	 					eval(xmlhttp.responseText);
	 					data.callback();
	 				}
	 			} catch(e) {
	 				//	alert("=========="=e);
	 			}
	 
	 		};
	 
	 		xmlhttp.open("GET", data.url, true); //代表请求是否异步处理
	 		xmlhttp.send(null);
	 
	 	};
	 
	 	if(String.HasText(FunUtil.Global.Router)) {
	 
	 		var ljs = FunUtil.common4cache({
	 			"type": "get",
	 			"key": data.url,
	 			"model": "lo"
	 		});
	 
	 		if(String.HasText(ljs)) {
	 
	 			if(ljs.vnum == vnum) {
	 
	 				eval(ljs.js);
	 				data.callback();
	 				return;
	 			}
	 		}
	 
	 	}
	 
	 	/*var script	= document.createElement("script");
	  		script.type	= "text/javascript";
	  		script.src	= data.url;
	  		String.HasText(data.async) ? data.async: (script.async="async");
	  		if(String.HasText(data.type) && data.type == "head") {
	  			document.head.appendChild(script);
	  		}else{
	  			document.body.appendChild(script);
	  		}
	  	　　　　if(script.readyState){ 
	  	　　　　　　script.onreadystatechange=function(){
	  	　　　　　　　　if(script.readyState=='complete'||script.readyState=='loaded'){
	  	　　　　　　　　　　	script.onreadystatechange=null;
	  	　　　　　　　　　　	data.callback();
	  					script.remove();
	  	　　　　　　　　}
	  	　　　　　　}
	  	　　　　}else{     
	  	　　　　　　 script.onload=function(){
	  					data.callback();
	  					script.remove();
	  				}
	  	　　　　};*/
	 
	 	request();
	 };
	 /* 
	  * 第一步： 获取所依赖的包  递归循环 由主 到次 依次Push 到 FunUtil.Global.plug4require象中， 当所有子孙节点 length == 0 时 停止循环
	  * 第二步： 由次到主，依次执行 执行这些节点， update  FunUtil.Global.plug4require 中的 value值
	  * 第三步：resolve 最终对象
	  * */
	 /*FunUtil.common4requirePlug = function(data){
	 	
	 	
	 	
	 	
	 	var deps = FunUtil.model4dep(data.info.toString());
	 	console.log(deps);
	 	
	 	var help4dep = function(str){
	 		
	 		
	 		var path	= FunUtil.Global.config().paths;
	 		var other	= FunUtil.Global.config().other;
	 		
	 		var type	= "foot";
	 		var loadJS	= location.origin+"/"+location.pathname.split("/")[1]+str+".js";
	 		var execuFun= {};
	 		
	 	     
	 	    var data = {"url":loadJS};
	 	    
	 		FunUtil.common4GetJS({"url":loadJS,"async":"async","callback":function(data){
	 			
	 			if(loadJS.indexOf("common") >= 0 || loadJS.indexOf("plug") >= 0){
	 				
	 				resolve(FunUtil.Global.plug);
	 			}else{
	 				
	 				resolve(FunUtil.Global.Page);
	 			}
	 		}});
	 		
	 	};
	 	
	 	
	 };
	 	
	 */
	 FunUtil.common4require = function(str) {
	 	/**
	 	 *思路:
	 	 *001  判断是否在config 中存在这个别名? 请求 加载,  顶部
	 	 *002  判断是否是/开始,若是者引用当前模块 项目上下的的 js  底部
	 	 *003: 是否同时并发异步 加载请求 多个 各自无强相关的js （适用于 各级不关的JS）
	 	 *004: 是否同步 单线程 加载（适用于 各级相关的JS） (占时单个进行)
	 	 * 
	 	 * =================核心重点==============005
	 	 * 判断 是否是Obj 当前 限定 指定plug
	 	 * 
	 	 * type: obj  对象需要， plug 插件需要   
	 	 * 
	 	 * :暂时这个模块是OBJ 需要
	 	 *
	 	 */
	 
	 	var result = new Promise(resolve => {
	 
	 		var path = FunUtil.Global.config().paths;
	 		var other = FunUtil.Global.config().other;
	 		var type = "normal";
	 		var loadJS = location.origin + "/" + location.pathname.split("/")[1] + str + ".js";
	 
	 		if(FunUtil.common4Prop({
	 				"type": "isIN",
	 				"in": str,
	 				"obj": path
	 			})) {
	 			loadJS = path[str];
	 		}
	 		if(FunUtil.common4Prop({
	 				"type": "isIN",
	 				"in": str,
	 				"obj": other
	 			})) {
	 			loadJS = other[str];
	 			type = "other"
	 		}
	 
	 		var data = {
	 			"url": loadJS
	 		};
	 
	 		if(type == "normal") {
	 
	 			FunUtil.common4GetJS({
	 				"url": loadJS,
	 				"async": "async",
	 				"callback": function(data) {
	 
	 					if(loadJS.indexOf("common") >= 0 || loadJS.indexOf("plug") >= 0) {
	 						//FunUtil.common4requirePlug({"info":FunUtil.Global.plug,"callback":resolve});
	 
	 						resolve(FunUtil.Global.plug);
	 					} else {
	 						//对页面来说需要获取CSS
	 
	 						resolve(FunUtil.Global.Page);
	 					}
	 				}
	 			});
	 		} else {
	 			var script = document.createElement("script");
	 			script.type = "text/javascript";
	 			script.src = data.url;
	 			script.async = String.HasText(data.async) ? data.async : "async";
	 
	 			document.head.appendChild(script);
	 
	 			script.onload = script.onreadystatechange = function() {
	 				if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
	 					resolve("");
	 				}
	 			};
	 
	 		}
	 
	 	});
	 
	 	return result;
	 };
	 
	 FunUtil.common4Router = function(data) {
	 	//初始化 设置路由 信息
	 	var router = data;
	 	var flag = router.flag;
	 	var keys = [];
	 	var valus = [];
	 	var nlist = [];
	 
	 	for(var p in router.list) {
	 		keys.push(p);
	 		valus.push(router.list[p]);
	 	}
	 
	 	var len = keys.length;
	 
	 	if(flag == "hash") {
	 		for(var i = 0; i < len; i++) nlist.push({
	 			"id": FunUtil.common4hash({
	 				"type": "encode",
	 				"key": (keys[i])
	 			}),
	 			"jid": FunUtil.common4hash({
	 				"type": "encode",
	 				"key": ("#" + valus[i])
	 			}),
	 			"page": "",
	 			"state": ""
	 		});
	 	}
	 
	 	FunUtil.Global.Router = nlist;
	 	FunUtil.Global.Jids = router.list;
	 	FunUtil.register4Evet({
	 		"type": flag
	 	});
	 };
	 
	 FunUtil.common4Global = function(data) {
	 
	 	FunUtil.Global.id = data.id;
	 	FunUtil.Global.name = data.name;
	 	FunUtil.Global.debug = data.debug;
	 };
	PageInfo.init4plug = function(data){
		//+ add 处理  require
 
		FunUtil.Global.plug = data.info; 
	};
	
	PageInfo.init4Obj = function(data){
		var obj = data.info();
		
		FunUtil.Global.Page = FunUtil.common4class(obj.page());
		FunUtil.Global.Page.require = obj.require;
		
		if(!String.HasText(FunUtil.Global.Router))  FunUtil.common4Page();
	};
 
	PageInfo.init4Start = function(data){
		 //对外暴漏 require 方法 应该是个数组对象  迭代请求结束后,再执行下面的方法
	 	
	 	var futil ={};
	 	
		futil.getJs =  function(param){
			var require	= param.require;
			var keys	= [];
			var vals	= [];
			var list	= [];
			
			for (var p in require) {
				keys.push(p);
				vals.push(require[p]);
			}
			
			var len		= keys.length;
			
			for(var i =0 ;i<len;i++) list.push(FunUtil.common4require(vals[i]));
			
			Promise.all(list).then(values => { 
				values[0]();
				FunUtil.common4Global(param.Global);
				FunUtil.common4Router(param.Router);
				
				var func=new function(){
					for(var i =0 ;i<len;i++)  this[keys[i]] = values[i]();
				};
				param.Pub.call(func,"var");
				
			});
		};
		
		futil.getJs(data.info())
	};
	
	PageInfo.init4config = function(data){
		
		FunUtil.Global.config = data.info;//加载配置信息丢入全局变量  (由于第一版是基于 Jquery 而言,所以会预加载Jquery)
	};
	
	
	PageInfo.register = function(data){
		PageInfo["init4"+data.type](data);//所有对象都通过注册进来
	};
	
	PageInfo.FunUtil = FunUtil;
	
	/* 对外暴露 一个公共方法，
	 * 条件
	 * 1. 有完整的路由路径
	 * 2. 有 初始化对象数据（主页对象）  需要根据按需加载 
	 * 3. 
	 * 
	 * 
	 * 在初始化后 进行数据操作 */
	
	
	window.PageInfo = PageInfo;
	window.SeaQ = {};
 	
	
})(window);
