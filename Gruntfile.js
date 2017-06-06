 
module.exports = function (grunt) {
	//var es2015 = require('babel-preset-es2015');
	
	  
	
	var FunUtil = {};
	
	FunUtil.Global = {
		"files":{},
		"assets":"assets",
		"dist":"dist",
		
	};
	
	
	    var adeUrl = 'localhost:209/';
    var rongUrl = 'localhost:82/';
    var mainUrl = 'localhost/';
    var loginUrl = 'localhsot:200/';
    var adminUrl = 'localhost:84/';
    var editUrl = 'locahost:81/';
    var assetsUrl = 'localhost:201/';
    var wx_AppId = 'wxbb9766e7ae848bdd';
    var replacement = (function () {
        if (grunt.option('environment') == 'production') {
            //rongUrl = 'rong.newrank.cn/';
            //mainUrl = 'www.newrank.cn/';
            //loginUrl = 'login.newrank.cn/';
            //adminUrl = 'admin.newrank.cn/';
            //editUrl = 'edit.newrank.cn/';
            //assetsUrl = 'assets.newrank.cn/';
            adeUrl = 'a.newrank.cn/';
            rongUrl = 'rong.newrank.cn/';
            mainUrl = 'www.newrank.cn/';
            loginUrl = 'login.newrank.cn/';
            adminUrl = 'admin.newrank.cn/';
            editUrl = 'edit.newrank.cn/';
            assetsUrl = 'assets.newrank.cn/';
            wx_AppId = 'wxd1d1638e443fe774';
        } else if (grunt.option('environment') == 'test') {
            adeUrl = 'test.a.newrank.cn/';
            rongUrl = 'test.rong.newrank.cn/';
            mainUrl = 'test.main.newrank.cn/';
            loginUrl = 'test.login.newrank.cn/';
            adminUrl = 'test.admin.newrank.cn/';
            editUrl = 'test.edit.newrank.cn/';
            assetsUrl = 'test.assets.newrank.cn/';
            wx_AppId = 'wx0d2043928700edb2';
        }


        return [
            {from: 'localhost/', to: mainUrl},
            {from: 'localhost:84/', to: adminUrl},
            {from: 'localhost:100/', to: rongUrl},
            {from: 'localhost:81/', to: editUrl},
            {from: 'localhost:200/', to: loginUrl},
            {from: 'localhost:201/', to: assetsUrl},
            {from: 'localhost:209/', to: adeUrl},
            {from: '\'localhost\'',to:'\'newrank.cn\''},
            {from: '"localhost"',to:'\'newrank.cn\''}
        ]
    }());

	
	FunUtil.bable4delmap = function(){
		
		grunt.file.recurse(FunUtil.Global.dist, function callback(abspath, rootdir, subdir, filename) {
		   var isFile = true;
		   if(filename.indexOf(".map") < 0) isFile = false;
		   
		   if(isFile) grunt.file.delete(abspath)
		   
		});
		
		 grunt.file.delete("dist/assets")
		
	};
	
	
	FunUtil.bable4getFiles = function(){
		//grunt.file.mkdir(FunUtil.Global.dist);
		grunt.file.recurse(FunUtil.Global.assets+"/js/", function callback(abspath, rootdir, subdir, filename) {
		   var isFile = false;
		   if(filename.indexOf(".js") < 0) isFile = false;
		   if(abspath.indexOf("QLive") >= 0 || abspath.indexOf("main") >= 0 ) isFile = true;
		   
		   var p = FunUtil.Global.dist+"/tmp"+abspath.split(FunUtil.Global.assets)[1];
		   
		   if(isFile) {
			 //  grunt.log.writeln(p);
			   FunUtil.Global.files[p] = abspath;
//			   grunt.log.writeln(abspath);
		   }
		   
		  
		   
		}); 
		
		
		grunt.file.recurse("dist/"+FunUtil.Global.assets+"/js/", function callback(abspath, rootdir, subdir, filename) {
 
		   
			var p = FunUtil.Global.dist+"/tmp"+abspath.split(FunUtil.Global.assets)[1];
		   
			 
			FunUtil.Global.files[p] = abspath;
		   
		  
		   
		}); 
	};
	
	FunUtil.concathtml = function(){
		//grunt.file.mkdir(FunUtil.Global.dist);
	 
		grunt.file.recurse("dist/tmp/html/", function callback(abspath, rootdir, subdir, filename) {
			 /**
			 *1. ��ȡ�ļ�����
			 *2. �ϲ� �ļ�
			 **/
			 
			
			var nhtml = "";
			
			 
			var html = grunt.file.read(abspath);
			 
			var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
            
			var result = REG_BODY.exec(html);
             if(result && result.length === 2) {
			 	result = result[1];
			 }else{
			 	result = html;
			 }
			//grunt.log.writeln(result);
			
			grunt.log.writeln(filename);
			
			//====================
			var url = "assets/js/components/" +filename.replace(/-/g,"/").replace(/html/g,"js")
			grunt.log.writeln(url);
			var page = grunt.file.read(url);
			
			page = page.split("Page.show");
		 
			
			nhtml += page[0];
			nhtml += ("HtmUtil.layout = function(){ var result='"+result+"'; return result;} \n \n");
			
			nhtml += ("Page.data = function(){ var param = {}; param.HtmUtil = HtmUtil; return param;}; \n \n ");
			
			nhtml += ("Page.show "+page[1]);
			
			
			 
			grunt.log.writeln("=======����layout========="+url);
			 
			
		 
			
			grunt.file.write("dist/"+url, nhtml)
			
		}); 
	};
	
	FunUtil.common4Num = function(){
		
		var html = grunt.file.read("html/index.html");
		    html = html.split("<\/body>");
			
		var before = html[0];	
		
		var reslut = before + '</body><script type="text/javascript"> var v4num = '+parseInt(Math.random()*100000000)+';</script>' +html.slice(1);
		 
		grunt.file.write("dist/html/index.html",reslut);
		
	};
	

    // ������������
    grunt.initConfig({

        //��ȡpackage.json�����ݣ��γɸ�json���
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist"],
        //ѹ��js
        uglify: {
            //�ļ�ͷ�������Ϣ
            options: {
                banner: '/*! <%= pkg.name %> QL <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n'
            },
            my_target: {
                files: [
                    {
                        expand: true,
						cwd:FunUtil.Global.dist+ '/tmp/',
						src: '**/*.js',
						dest: FunUtil.Global.dist+'/build/assets/js'
						
						 
                    }
                ]
            },
			my_target: {
                files: [
                    {
                        expand: true,
						cwd:FunUtil.Global.dist+ '/tmp/',
						src: ["Qlive.js","QLive-config.js","main.js"],
						dest: FunUtil.Global.dist+'/build/assets/js'
						
						 
                    }
                ]
            }
        },
        //ѹ��css
        cssmin: {
            //�ļ�ͷ�������Ϣ
            options: {
                banner: '/*! <%= pkg.name %> QL <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n',
                //��������
                beautify: {
                   
                    ascii_only: true
                }
            },
            my_target: {
                files: [
                    {
                         
						
						expand: true,
						cwd: FunUtil.Global.assets+'/css/',
						src: ['*.css'],
						dest: FunUtil.Global.dist+'/build/assets/css/',
                    } 
                ]
            }
        },
 
		 babel: {
				options: {
					sourceMap:true
					 
				},
				dist: {
					files:FunUtil.Global.files
				}
			},
		
		htmlmin: {                                     // Task 
			dist: {                                      // Target 
			  options: {                                 // Target options 
				removeComments: true,
				collapseWhitespace: true
			  },
			  files: [{
				  expand: true,
				  cwd: 'html',
				  src: ['tmp/*.html'],
				  dest: 'dist/tmp/html/'
			  }]
			}
			 
		  },
		copy: {
		  main: {
			expand: true,
			expand: true,
			cwd: 'assets/js/plug',
			src: ['**/*.*', '*.*'],
			dest: 'dist/assets/js/plug'
			 
		  },
		  
		  
		  common: {
			expand: true,
			expand: true,
			cwd: 'assets/js/components/common',
			src: ['**/*.*', '*.*'],
			dest: 'dist/assets/js/components/common'
			 
		  },
		  js: { 
			expand: true,
			cwd: 'dist/tmp/js',
			src: ['**/*.js', '*.js'],
			dest: 'dist/assets/js'
		  },
		  
		 
		  
		   css: { 
				expand: true,
			cwd: 'assets/css',
			src: ['**/*.*'],
			dest: 'dist/assets/css'
		  },
		  
		   img: { 
			expand: true,
			cwd: 'assets/img',
			src: ['**/*.*'],
			dest: 'dist/assets/img'
		},
		 dist: { 
			expand: true,
			cwd: 'dist/assets',
			src: ['**/*.*',"*.*"],
			dest: '../dest/build/m/assets'
			},
			 
		 dist4html: { 
			expand: true,
			cwd: 'dist/html',
			src: ['**/*.*',"*.*"],
			dest: '../dest/build/m/html'
			}
		},
		
		eslint: {
			options: {
				configFile: 'econf/eslint.json' 
			},
			target:  ['assets/js/components/**/*.js']
		},
		 replace: {
            inner: {
                src: ['dist/assets/**/*.js'],             // source files array (supports minimatch)
                overwrite: true,
                replacements: [{
                    from: '../../assets/img/',
                    to: 'assets/img/'
                }
                
                ]
            },
			
			 localhost: {
                src: ['dist/**/*.html'],             // source files array (supports minimatch)
                overwrite: true,
              replacements: replacement
            }
		 
			
			
			 
        }
		 
    });
	
	grunt.registerTask("bable4getFiles", "", function() {
		FunUtil.bable4getFiles();
	});
	
	grunt.registerTask("bable4delmap", "", function() {
		FunUtil.bable4delmap();
	});
	
	grunt.registerTask("concathtml", "", function() {
		FunUtil.concathtml();
	});
	
	grunt.registerTask("common4Num", "", function() {
		FunUtil.common4Num();
	});
	
	
	
    require('load-grunt-tasks')(grunt);
 
  
//	grunt.registerTask('default', ['eslint']);
	grunt.registerTask('default', ["clean",'htmlmin','concathtml','bable4getFiles','babel','bable4delmap',"copy:main","copy:common","copy:js","copy:css","copy:img","copy:dist","copy:dist4html",'common4Num',"replace","copy:dist4html",]);
 

 
  
};