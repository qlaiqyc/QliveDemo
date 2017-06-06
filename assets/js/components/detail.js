/**
 * Created by helin on 2017/4/18.
 */

PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common" :'common',
        "memory" :'memory',
        "remote":"/assets/js/components/common/data-api",
        "highcharts":'highcharts'
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){

            var  common      = this.common,
                memory      = this.memory,
                remote      = this.remote,
                highcharts  = this.highcharts,
                request     = PageInfo.FunUtil.common4getUrlParam(),
                doNull      = common.doNull,
                formatNumGt1w = common.formatNumGt1w,
                flag        = request["flag"],
                account     = request['account'];

            var esbclf;
            remote.detail.getAccountDetail(account,function(data){

                //data={"data":[{"article_clicks_count":"1400000","article_likes_count_top_line":"50680","rank_name":"时事","insert_time":"2017-05-23 12:00:00.0","rank_position":"1","max_article_likes_count":"20788","article_count_big_clicks":"14","avg_article_clicks_log1p_mark":"1000","uid":"15","article_clicks_log1p_mark":"1041.1712838892445","update_time":"2017-05-23 12:03:48.0","max_article_clicks_count":"100000","top_article_clicks_log1p_mark":"1139.7931845779917","article_likes_count":"77008","article_clicks_count_top_line":"500000","article_count":"14","rank_date":"2017-05-22 00:00:00.0","avg_article_clicks_count":"100000","id":"63084155","article_count_top_line":"5","max_article_clicks_log1p_mark":"1000","new_rank_index_mark":"1037.6993111158922","avg_article_clicks_count_top_line":"100000","avg_article_likes_count_top_line":"10136","avg_article_likes_count_other":"2925","article_release_times":"5","avg_article_likes_count":"5500","log1p_mark":"1037.6993111158922","name":"人民日报","avg_article_clicks_count_other":"100000","article_count_other":"9","rank_mark":"100","article_likes_count_other":"26328","article_likes_log1p_mark":"996.6237794011867","account":"rmrbwx","article_clicks_count_other":"900000"},{"article_clicks_count":"1400000","article_likes_count_top_line":"38508","rank_name":"时事","insert_time":"2017-05-22 12:00:02.0","rank_position":"1","max_article_likes_count":"12147","article_count_big_clicks":"14","avg_article_clicks_log1p_mark":"1000","uid":"15","article_clicks_log1p_mark":"1041.1712838892445","update_time":"2017-05-22 12:03:10.0","max_article_clicks_count":"100000","top_article_clicks_log1p_mark":"1139.7931845779917","article_likes_count":"73092","article_clicks_count_top_line":"500000","article_count":"14","rank_date":"2017-05-21 00:00:00.0","avg_article_clicks_count":"100000","id":"63002296","article_count_top_line":"5","max_article_clicks_log1p_mark":"1000","new_rank_index_mark":"1037.4681745101586","avg_article_clicks_count_top_line":"100000","avg_article_likes_count_top_line":"7701","avg_article_likes_count_other":"3842","article_release_times":"5","avg_article_likes_count":"5220","log1p_mark":"1037.4681745101586","name":"人民日报","avg_article_clicks_count_other":"100000","article_count_other":"9","rank_mark":"100","article_likes_count_other":"34584","article_likes_log1p_mark":"992.0010472865165","account":"rmrbwx","article_clicks_count_other":"900000"},{"article_clicks_count":"1600000","article_likes_count_top_line":"38209","rank_name":"时事","insert_time":"2017-05-21 12:00:03.0","rank_position":"1","max_article_likes_count":"10275","article_count_big_clicks":"16","avg_article_clicks_log1p_mark":"1000","uid":"15","article_clicks_log1p_mark":"1050.9952748831279","update_time":"2017-05-21 12:03:20.0","max_article_clicks_count":"100000","top_article_clicks_log1p_mark":"1169.0187166952214","article_likes_count":"76715","article_clicks_count_top_line":"700000","article_count":"16","rank_date":"2017-05-20 00:00:00.0","avg_article_clicks_count":"100000","id":"62915003","article_count_top_line":"7","max_article_clicks_log1p_mark":"1000","new_rank_index_mark":"1046.5116984340216","avg_article_clicks_count_top_line":"100000","avg_article_likes_count_top_line":"5458","avg_article_likes_count_other":"4278","article_release_times":"7","avg_article_likes_count":"4794","log1p_mark":"1046.5116984340216","name":"人民日报","avg_article_clicks_count_other":"100000","article_count_other":"9","rank_mark":"100","article_likes_count_other":"38506","article_likes_log1p_mark":"996.2861287382931","account":"rmrbwx","article_clicks_count_other":"900000"},{"article_clicks_count":"1500000","article_likes_count_top_line":"39723","rank_name":"时事","insert_time":"2017-05-20 12:00:57.0","rank_position":"1","max_article_likes_count":"12192","article_count_big_clicks":"15","avg_article_clicks_log1p_mark":"1000","uid":"15","article_clicks_log1p_mark":"1046.2471339961","update_time":"2017-05-20 12:04:55.0","max_article_clicks_count":"100000","top_article_clicks_log1p_mark":"1155.6293910795189","article_likes_count":"67377","article_clicks_count_top_line":"600000","article_count":"15","rank_date":"2017-05-19 00:00:00.0","avg_article_clicks_count":"100000","id":"62800329","article_count_top_line":"6","max_article_clicks_log1p_mark":"1000","new_rank_index_mark":"1041.706307622013","avg_article_clicks_count_top_line":"100000","avg_article_likes_count_top_line":"6620","avg_article_likes_count_other":"3072","article_release_times":"6","avg_article_likes_count":"4491","log1p_mark":"1041.706307622013","name":"人民日报","avg_article_clicks_count_other":"100000","article_count_other":"9","rank_mark":"100","article_likes_count_other":"27654","article_likes_log1p_mark":"984.789751419238","account":"rmrbwx","article_clicks_count_other":"900000"},{"article_clicks_count":"1500000","article_likes_count_top_line":"86549","rank_name":"时事","insert_time":"2017-05-19 12:02:10.0","rank_position":"1","max_article_likes_count":"37288","article_count_big_clicks":"15","avg_article_clicks_log1p_mark":"1000","uid":"15","article_clicks_log1p_mark":"1046.2471339961","update_time":"2017-05-19 12:06:57.0","max_article_clicks_count":"100000","top_article_clicks_log1p_mark":"1155.6293910795189","article_likes_count":"122437","article_clicks_count_top_line":"600000","article_count":"15","rank_date":"2017-05-18 00:00:00.0","avg_article_clicks_count":"100000","id":"62741631","article_count_top_line":"6","max_article_clicks_log1p_mark":"1000","new_rank_index_mark":"1044.351556075584","avg_article_clicks_count_top_line":"100000","avg_article_likes_count_top_line":"14424","avg_article_likes_count_other":"3987","article_release_times":"6","avg_article_likes_count":"8162","log1p_mark":"1044.351556075584","name":"人民日报","avg_article_clicks_count_other":"100000","article_count_other":"9","rank_mark":"100","article_likes_count_other":"35888","article_likes_log1p_mark":"1037.694720490661","account":"rmrbwx","article_clicks_count_other":"900000"},{"article_clicks_count":"1400000","article_likes_count_top_line":"42127","rank_name":"时事","insert_time":"2017-05-18 12:08:34.0","rank_position":"1","max_article_likes_count":"12141","article_count_big_clicks":"14","avg_article_clicks_log1p_mark":"1000","uid":"15","article_clicks_log1p_mark":"1041.1712838892445","update_time":"2017-05-18 12:12:20.0","max_article_clicks_count":"100000","top_article_clicks_log1p_mark":"1139.7931845779917","article_likes_count":"74142","article_clicks_count_top_line":"500000","article_count":"14","rank_date":"2017-05-17 00:00:00.0","avg_article_clicks_count":"100000","id":"62549700","article_count_top_line":"5","max_article_clicks_log1p_mark":"1000","new_rank_index_mark":"1037.5313424361275","avg_article_clicks_count_top_line":"100000","avg_article_likes_count_top_line":"8425","avg_article_likes_count_other":"3557","article_release_times":"5","avg_article_likes_count":"5295","log1p_mark":"1037.5313424361275","name":"人民日报","avg_article_clicks_count_other":"100000","article_count_other":"9","rank_mark":"100","article_likes_count_other":"32015","article_likes_log1p_mark":"993.2644058058924","account":"rmrbwx","article_clicks_count_other":"900000"},{"article_clicks_count":"1400000","article_likes_count_top_line":"64831","rank_name":"时事","insert_time":"2017-05-17 17:27:48.0","rank_position":"1","max_article_likes_count":"38260","article_count_big_clicks":"14","avg_article_clicks_log1p_mark":"1000","uid":"15","article_clicks_log1p_mark":"1041.1712838892445","update_time":"2017-05-17 17:31:40.0","max_article_clicks_count":"100000","top_article_clicks_log1p_mark":"1139.7931845779917","article_likes_count":"108357","article_clicks_count_top_line":"500000","article_count":"14","rank_date":"2017-05-16 00:00:00.0","avg_article_clicks_count":"100000","id":"62441067","article_count_top_line":"5","max_article_clicks_log1p_mark":"1000","new_rank_index_mark":"1039.2118198888613","avg_article_clicks_count_top_line":"100000","avg_article_likes_count_top_line":"12966","avg_article_likes_count_other":"4836","article_release_times":"5","avg_article_likes_count":"7739","log1p_mark":"1039.2118198888613","name":"人民日报","avg_article_clicks_count_other":"100000","article_count_other":"9","rank_mark":"100","article_likes_count_other":"43526","article_likes_log1p_mark":"1026.8739548605697","account":"rmrbwx","article_clicks_count_other":"900000"}],"trendSize":7,"user":{"is_rumor_user":"0","last_article_title":"【荐读】教养就是细节","account_type":"0","month_top_times":"32","description":"参与、沟通、记录时代。","is_reward_user":"0","insert_time":"2014-07-31 00:00:00.0","type":"时事","is_comment_user":"1","max_release_times":"10","uuid":"04205A9952E24C3292871BA9F0E2852B","is_ori_user":"1","fake_id":"0","update_time":"2017-05-23 06:15:52.0","sub_type":"","certified_text":"微信认证：人民日报社","last_acq_time":"2017-05-23 06:15:52.0","last_article_url":"http://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2666157771&idx=1&sn=cd34f3f10c70d77fa844eb264ee1d815&chksm=bdb23f888ac5b69e30be629bb9c2d6be514ab8ab346c08c2f650bb6687aa4a5a8f329ca24618&scene=4","id":"15","code_image_url":"http://img03.sogoucdn.com/app/a/100520105/zHWKhSrEXhQhhzvmnyDo","had_been_locked":"0","index_url":"http://wx.qlogo.cn/mmhead/Q3auHgzwzM5Dlw4H8vWoicXPXccEVkWYgFE1pNUvX7uaHmafPODGIEA/0","last_article_time":"2017-04-20 05:46:54.0","biz_info":"MjM5MjAxNDM4MA==","is_ad_user":"0","head_image_url":"http://wx.qlogo.cn/mmhead/Q3auHgzwzM5Dlw4H8vWoicXPXccEVkWYgFE1pNUvX7uaHmafPODGIEA/0","last_rank_position":"1","name":"人民日报","wx_id":"gh_363b924965e9","account":"rmrbwx","status":"1","isBrand":"0"},"current_time":"2017-05-23 ","lastUpdateTime":"2017-05-22"};
                //data={
                //    "data": [
                //        {
                //            "article_clicks_count": "23585",
                //            "article_likes_count_top_line": "64",
                //            "rank_name": "创业",
                //            "insert_time": "2017-04-27 12:00:04.0",
                //            "rank_position": "58",
                //            "max_article_likes_count": "64",
                //            "article_count_big_clicks": "0",
                //            "avg_article_clicks_log1p_mark": "734.7509491165407",
                //            "uid": "80869",
                //            "article_clicks_log1p_mark": "740.7398331578108",
                //            "update_time": "2017-04-27 12:02:56.0",
                //            "max_article_clicks_count": "18228",
                //            "top_article_clicks_log1p_mark": "852.1518288212604",
                //            "article_likes_count": "108",
                //            "article_clicks_count_top_line": "18228",
                //            "article_count": "5",
                //            "rank_date": "2017-04-26 00:00:00.0",
                //            "avg_article_clicks_count": "4717",
                //            "id": "58808267",
                //            "article_count_top_line": "1",
                //            "max_article_clicks_log1p_mark": "852.1518288212604",
                //            "new_rank_index_mark": "735.0220938108054",
                //            "avg_article_clicks_count_top_line": "18228",
                //            "avg_article_likes_count_top_line": "64",
                //            "avg_article_likes_count_other": "11",
                //            "article_release_times": "1",
                //            "avg_article_likes_count": "21",
                //            "log1p_mark": "735.0220938108054",
                //            "name": "新榜",
                //            "avg_article_clicks_count_other": "1339",
                //            "article_count_other": "4",
                //            "rank_mark": "81.01160602891323",
                //            "article_likes_count_other": "44",
                //            "article_likes_log1p_mark": "415.5388229733397",
                //            "account": "newrankcn",
                //            "article_clicks_count_other": "5357"
                //        },
                //        {
                //            "article_clicks_count": "13994",
                //            "article_likes_count_top_line": "29",
                //            "rank_name": "创业",
                //            "insert_time": "2017-04-26 12:00:02.0",
                //            "rank_position": "133",
                //            "max_article_likes_count": "29",
                //            "article_count_big_clicks": "0",
                //            "avg_article_clicks_log1p_mark": "708.7881728540749",
                //            "uid": "80869",
                //            "article_clicks_log1p_mark": "702.3393732199318",
                //            "update_time": "2017-04-26 12:02:43.0",
                //            "max_article_clicks_count": "7825",
                //            "top_article_clicks_log1p_mark": "778.7072923397538",
                //            "article_likes_count": "62",
                //            "article_clicks_count_top_line": "7825",
                //            "article_count": "4",
                //            "rank_date": "2017-04-25 00:00:00.0",
                //            "avg_article_clicks_count": "3498",
                //            "id": "58797379",
                //            "article_count_top_line": "1",
                //            "max_article_clicks_log1p_mark": "778.7072923397538",
                //            "new_rank_index_mark": "693.8531028851975",
                //            "avg_article_clicks_count_top_line": "7825",
                //            "avg_article_likes_count_top_line": "29",
                //            "avg_article_likes_count_other": "11",
                //            "article_release_times": "1",
                //            "avg_article_likes_count": "15",
                //            "log1p_mark": "693.8531028851975",
                //            "name": "新榜",
                //            "avg_article_clicks_count_other": "2056",
                //            "article_count_other": "3",
                //            "rank_mark": "76.15204413590978",
                //            "article_likes_count_other": "33",
                //            "article_likes_log1p_mark": "366.98052901731404",
                //            "account": "newrankcn",
                //            "article_clicks_count_other": "6169"
                //        },
                //        {
                //            "article_clicks_count": "15419",
                //            "article_likes_count_top_line": "121",
                //            "rank_name": "创业",
                //            "insert_time": "2017-04-25 12:55:24.0",
                //            "rank_position": "115",
                //            "max_article_likes_count": "121",
                //            "article_count_big_clicks": "0",
                //            "avg_article_clicks_log1p_mark": "697.8222677580941",
                //            "uid": "80869",
                //            "article_clicks_log1p_mark": "709.4731738451709",
                //            "update_time": "2017-04-25 12:59:03.0",
                //            "max_article_clicks_count": "10705",
                //            "top_article_clicks_log1p_mark": "805.924747795641",
                //            "article_likes_count": "170",
                //            "article_clicks_count_top_line": "10705",
                //            "article_count": "5",
                //            "rank_date": "2017-04-24 00:00:00.0",
                //            "avg_article_clicks_count": "3083",
                //            "id": "58738938",
                //            "article_count_top_line": "1",
                //            "max_article_clicks_log1p_mark": "805.924747795641",
                //            "new_rank_index_mark": "705.250871513484",
                //            "avg_article_clicks_count_top_line": "10705",
                //            "avg_article_likes_count_top_line": "121",
                //            "avg_article_likes_count_other": "12",
                //            "article_release_times": "1",
                //            "avg_article_likes_count": "34",
                //            "log1p_mark": "705.250871513484",
                //            "name": "新榜",
                //            "avg_article_clicks_count_other": "1178",
                //            "article_count_other": "4",
                //            "rank_mark": "78.30172363179112",
                //            "article_likes_count_other": "49",
                //            "article_likes_log1p_mark": "455.4257914846471",
                //            "account": "newrankcn",
                //            "article_clicks_count_other": "4714"
                //        },
                //        {
                //            "article_clicks_count": "9027",
                //            "article_likes_count_top_line": "37",
                //            "rank_name": "创业",
                //            "insert_time": "2017-04-24 12:00:03.0",
                //            "rank_position": "145",
                //            "max_article_likes_count": "37",
                //            "article_count_big_clicks": "0",
                //            "avg_article_clicks_log1p_mark": "730.9116760897076",
                //            "uid": "80869",
                //            "article_clicks_log1p_mark": "670.0882411335361",
                //            "update_time": "2017-04-24 12:02:17.0",
                //            "max_article_clicks_count": "7390",
                //            "top_article_clicks_log1p_mark": "773.7399683970702",
                //            "article_likes_count": "51",
                //            "article_clicks_count_top_line": "7390",
                //            "article_count": "2",
                //            "rank_date": "2017-04-23 00:00:00.0",
                //            "avg_article_clicks_count": "4513",
                //            "id": "58673100",
                //            "article_count_top_line": "1",
                //            "max_article_clicks_log1p_mark": "773.7399683970702",
                //            "new_rank_index_mark": "670.5305289590274",
                //            "avg_article_clicks_count_top_line": "7390",
                //            "avg_article_likes_count_top_line": "37",
                //            "avg_article_likes_count_other": "14",
                //            "article_release_times": "1",
                //            "avg_article_likes_count": "25",
                //            "log1p_mark": "670.5305289590274",
                //            "name": "新榜",
                //            "avg_article_clicks_count_other": "1637",
                //            "article_count_other": "1",
                //            "rank_mark": "74.6751160165558",
                //            "article_likes_count_other": "14",
                //            "article_likes_log1p_mark": "349.9836732039501",
                //            "account": "newrankcn",
                //            "article_clicks_count_other": "1637"
                //        },
                //        {
                //            "article_clicks_count": "12856",
                //            "article_likes_count_top_line": "39",
                //            "rank_name": "创业",
                //            "insert_time": "2017-04-23 12:00:02.0",
                //            "rank_position": "114",
                //            "max_article_likes_count": "39",
                //            "article_count_big_clicks": "0",
                //            "avg_article_clicks_log1p_mark": "761.6280236139102",
                //            "uid": "80869",
                //            "article_clicks_log1p_mark": "696.0997164313648",
                //            "update_time": "2017-04-23 12:02:18.0",
                //            "max_article_clicks_count": "10373",
                //            "top_article_clicks_log1p_mark": "803.1885510942901",
                //            "article_likes_count": "55",
                //            "article_clicks_count_top_line": "10373",
                //            "article_count": "2",
                //            "rank_date": "2017-04-22 00:00:00.0",
                //            "avg_article_clicks_count": "6428",
                //            "id": "58640195",
                //            "article_count_top_line": "1",
                //            "max_article_clicks_log1p_mark": "803.1885510942901",
                //            "new_rank_index_mark": "696.3838362563794",
                //            "avg_article_clicks_count_top_line": "10373",
                //            "avg_article_likes_count_top_line": "39",
                //            "avg_article_likes_count_other": "16",
                //            "article_release_times": "1",
                //            "avg_article_likes_count": "27",
                //            "log1p_mark": "696.3838362563794",
                //            "name": "新榜",
                //            "avg_article_clicks_count_other": "2483",
                //            "article_count_other": "1",
                //            "rank_mark": "77.27508214498691",
                //            "article_likes_count_other": "16",
                //            "article_likes_log1p_mark": "356.54782924071503",
                //            "account": "newrankcn",
                //            "article_clicks_count_other": "2483"
                //        },
                //        {
                //            "article_clicks_count": "14565",
                //            "article_likes_count_top_line": "42",
                //            "rank_name": "创业",
                //            "insert_time": "2017-04-22 13:30:55.0",
                //            "rank_position": "116",
                //            "max_article_likes_count": "42",
                //            "article_count_big_clicks": "0",
                //            "avg_article_clicks_log1p_mark": "737.2550952450027",
                //            "uid": "80869",
                //            "article_clicks_log1p_mark": "705.2814596961972",
                //            "update_time": "2017-04-22 13:33:27.0",
                //            "max_article_clicks_count": "9466",
                //            "top_article_clicks_log1p_mark": "795.2417846886913",
                //            "article_likes_count": "84",
                //            "article_clicks_count_top_line": "9466",
                //            "article_count": "3",
                //            "rank_date": "2017-04-21 00:00:00.0",
                //            "avg_article_clicks_count": "4855",
                //            "id": "58614649",
                //            "article_count_top_line": "1",
                //            "max_article_clicks_log1p_mark": "795.2417846886913",
                //            "new_rank_index_mark": "701.8863016179566",
                //            "avg_article_clicks_count_top_line": "9466",
                //            "avg_article_likes_count_top_line": "42",
                //            "avg_article_likes_count_other": "21",
                //            "article_release_times": "1",
                //            "avg_article_likes_count": "28",
                //            "log1p_mark": "701.8863016179566",
                //            "name": "新榜",
                //            "avg_article_clicks_count_other": "2549",
                //            "article_count_other": "2",
                //            "rank_mark": "75.53977247108452",
                //            "article_likes_count_other": "42",
                //            "article_likes_log1p_mark": "393.51037704878615",
                //            "account": "newrankcn",
                //            "article_clicks_count_other": "5099"
                //        },
                //        {
                //            "article_clicks_count": "27113",
                //            "article_likes_count_top_line": "77",
                //            "rank_name": "创业",
                //            "insert_time": "2017-04-21 13:11:49.0",
                //            "rank_position": "65",
                //            "max_article_likes_count": "77",
                //            "article_count_big_clicks": "0",
                //            "avg_article_clicks_log1p_mark": "746.8472721870362",
                //            "uid": "80869",
                //            "article_clicks_log1p_mark": "750.9953590056504",
                //            "update_time": "2017-04-21 13:14:31.0",
                //            "max_article_clicks_count": "20356",
                //            "top_article_clicks_log1p_mark": "861.7420068319465",
                //            "article_likes_count": "131",
                //            "article_clicks_count_top_line": "20356",
                //            "article_count": "5",
                //            "rank_date": "2017-04-20 00:00:00.0",
                //            "avg_article_clicks_count": "5422",
                //            "id": "58583128",
                //            "article_count_top_line": "1",
                //            "max_article_clicks_log1p_mark": "861.7420068319465",
                //            "new_rank_index_mark": "745.730295863363",
                //            "avg_article_clicks_count_top_line": "20356",
                //            "avg_article_likes_count_top_line": "77",
                //            "avg_article_likes_count_other": "13",
                //            "article_release_times": "1",
                //            "avg_article_likes_count": "26",
                //            "log1p_mark": "745.730295863363",
                //            "name": "新榜",
                //            "avg_article_clicks_count_other": "1689",
                //            "article_count_other": "4",
                //            "rank_mark": "77.83515821348169",
                //            "article_likes_count_other": "54",
                //            "article_likes_log1p_mark": "432.49697414454",
                //            "account": "newrankcn",
                //            "article_clicks_count_other": "6757"
                //        }
                //    ],
                //    "user": {
                //        "is_rumor_user": "0",
                //        "last_article_title": "榜哥情报 | 腾讯就手机QQ新功能致歉",
                //        "account_type": "0",
                //        "month_top_times": "0",
                //        "description": "涨粉、变现、运营、观察，新榜给你不一样的新思路。新榜——内容创业服务平台，www.newrank.cn",
                //        "is_reward_user": "0",
                //        "insert_time": "2014-12-29 00:00:00.0",
                //        "type": "教育",
                //        "is_comment_user": "1",
                //        "max_release_times": "1",
                //        "uuid": "EDAB134A1DCAB6CB5263E42A7FEEF212",
                //        "is_ori_user": "1",
                //        "fake_id": "0",
                //        "update_time": "2017-03-06 10:46:48.0",
                //        "sub_type": "",
                //        "certified_text": "微信认证：上海看榜信息科技有限公司",
                //        "last_acq_time": "2016-04-18 03:14:00.0",
                //        "last_article_url": "http://mp.weixin.qq.com/s?__biz=MzAwMjE1NjcxMg==&mid=2654642762&idx=1&sn=6706c463d3abc751bcc13b67c9dab066&scene=4",
                //        "id": "80869",
                //        "code_image_url": "http://img03.sogoucdn.com/app/a/100520105/SEny-UjE5naZh1menxxs",
                //        "had_been_locked": "0",
                //        "index_url": "http://weixin.sogou.com/gzh?openid=oIWsFt3CUA6HniQM4e_i7zncqWkk",
                //        "last_article_time": "2016-04-17 17:51:07.0",
                //        "biz_info": "MzAwMjE1NjcxMg==",
                //        "is_ad_user": "0",
                //        "head_image_url": "http://img01.sogoucdn.com/app/a/100520090/oIWsFt3CUA6HniQM4e_i7zncqWkk",
                //        "last_rank_position": "793",
                //        "name": "新榜",
                //        "isNewrank": "1",
                //        "wx_id": "gh_54faa63b50a4",
                //        "account": "newrankcn",
                //        "status": "0",
                //        "isBrand": "1"
                //    },
                //    "lastUpdateTime": "2017-04-23"
                //};
                //console.log(data);
                esbclf=data;

            });
            //var fgkcdg = {"financ_money":"1500万","account_type":"1","wxu_status":"1","financ_leader":"分享资本","month_top_times":"2","description":"《政商参阅》唯一官方平台，中国最好的政商、财经、文化类微刊，百万高端精英用户群，2015年阅读量破5亿，是全国影响力最大的公众号之一，欢迎关注。","insert_time":"2014-09-29 06:09:25.0","type":"财富","uuid":"BB55A2AD2BDFE512EFEBB0ED3BFAF2FD","is_ori_user":"1","last_rank_position":"4","name":"政商参阅","financ_roundinfo":"A轮","id":"4396","financ_url":"http://xudanei.baijia.baidu.com/article/336433http:/finance.huanqiu.com/roll/2016-03/8653361.html","wx_id":"gh_347718021ab3","financ_date":"2016-02-01","account":"zhengshangcanyue"};




            //===============================公众号详情=============================
            FunUtil.fillTopUserDetail=function(){
                //console.log(esbclf);
                if(!esbclf.user) return;
                $('.card-left-img').css('background','url("http://open.weixin.qq.com/qr/code/?username='+doNull(esbclf.user.account)+'")  no-repeat scroll 50% center/512% auto transparent');
                $('.card-name .name').text(doNull(esbclf.user.name));
                $('.card-left-img .iconfont').css('display',(doNull(esbclf.user.isNewrank)==1)?'block':'none');
                $('.card-name .brand').css('display',(doNull(esbclf.user.brand)>0)?'inline-block':'none');
                $('#card_account_long').text('微信号：'+doNull(esbclf.user.account));
                $("#list_right_tag").text(doNull(esbclf.user.type)).unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl({"url":"list?category="+escape(esbclf.user.type)});
                });
            };

            FunUtil.fillDataByDate=function(data){
                $('#public_count').text(data.article_count||0);    //发布篇数
                $('#release_time').text(data.article_release_times||0);    //发布次数
                $('#hundred_public_time').text(data.article_count_big_clicks||0);   //10W+发布
                $('#newrank_index').text(data.rank_mark ||0);   //新榜指数
                $('#rank_mc').text(data.rank_position||0);   //排名
                $('#list_read_num').text(data.article_clicks_count||0);   //总计阅读数
                $('#list_toutiao_read_num').text(data.article_clicks_count_top_line||0);   //总计头条阅读数
                $('#list_click_num').text(data.article_likes_count||0);   //总计点赞数
                $('#list_bottom_read_tab span').click(function(){
                    $('#list_bottom_read_tab span').removeClass('checked');
                    $(this).addClass('checked');
                    if( $(this).attr('data')=='total'){
                        $('#list_read_num').text(data.article_clicks_count||0);   //总计阅读数
                        $('#list_toutiao_read_num').text(data.article_clicks_count_top_line||0);   //总计头条阅读数
                        $('#list_click_num').text(data.article_likes_count||0);   //总计点赞数
                    }else{
                        $('#list_read_num').text(data.avg_article_clicks_count||0);   //平均阅读数
                        $('#list_toutiao_read_num').text(data.avg_article_clicks_count_top_line||0);   //平均头条阅读数
                        $('#list_click_num').text(data.avg_article_likes_count||0);   //平均点赞数
                    }
                });
            };

            /*绘图*/
            FunUtil.indexing_change = function(datas, typeName) {
                $('.list-info-charts-box').highcharts({
                    chart: {backgroundColor: '#fff'},
                    title: {text: ''},
                    xAxis: {categories: datas.categories},
                    yAxis: {title: 'none',min: '0',allowDecimals:false},
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            allowPointSelect : true,
                            point: {
                                events: {
                                    click: function(e) {  //e.point.index 获取每个点的index ，e.point.category获取横坐标时间
                                        //typeName=='rankMark'?FunUtil.fillDataByDate(datas.rankMarkValues[e.point.index] || []):FunUtil.fillDataByDate(datas.rankPositionValues[e.point.index] || []);
                                        FunUtil.fillDataByDate(e.point.options||[]);
                                    }
                                }
                            },
                            dataLabels: {
                                enabled: true,color: '#000000',style: {fontWeight: 'normal'}
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:0.71rem;">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0;font-size:0.8rem;">'+ datas[typeName+"Name"] +': </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    credits: {enabled: false},
                    legend: {enabled:false},
                    series: [{color: 'orange',marker: {fillColor: 'white',lineWidth: 1,lineColor: this.color},data: datas[typeName+"Values"]}]
                });
            };


            FunUtil.noChartsShow=function(){
                $('#charts_show_tip').html('<img src="/m/assets/img/result-empty.png" alt=""/><p>抱歉，该账号已超过7天未推送图文内容</p><p>无趋势图展示</p>');
            };


            FunUtil.rank_index = function() {

                var trenkPageData = esbclf.data,trenkLastUpdateTime = esbclf.lastUpdateTime;
                //console.log(trenkPageData);

                if(trenkPageData==undefined||trenkPageData.length==0) {  //七天发布为空，不显示趋势图
                    FunUtil.noChartsShow();
                    $('#list_detail_info_main').hide();
                    $('.latest-public').addClass('latest-public-spe');
                    $('span.seven-hot').hide();
                    return;
                }else{
                    $('#list_detail_info_main').show();
                    $('.latest-public').removeClass('latest-public-spe');
                    $('span.seven-hot').show();
                }

                var indexData = trenkPageData;
                var indexObj = {
                    rankMarkName : "新榜指数",
                    rankPositionName : "排名变化",
                    categories : [],
                    rankMarkValues : [],
                    rankPositionValues: []
                };

                if(indexData&&indexData.length > 0) {
                    var dataObj = {};
                    $(indexData).each(function(){
                        var key = this["rank_date"].substring(0, 10);
                        dataObj[key] = this;
                    });

                    var usedTrend = [];
                    var sDate = trenkLastUpdateTime.split("-");
                    var startDate = new Date(sDate[0], sDate[1] -1, sDate[2]);

                    for(var i=0; i < 7; i++) {
                        var d = new Date(startDate.getTime() - 24 *3600 *1000 * i),
                            key = d.Format("yyyy-MM-dd"),
                            monthDate = d.Format("MM-dd"),
                            month_Date = d.Format("MM月dd日"),
                            currentObj = dataObj[key] || {};
                        //listDatailObj.date.push(month_Date);
                        indexObj.categories[i] = monthDate;

                        var obj1 = {
                            y:  parseInt(FunUtil.caseStrToFloat(currentObj.new_rank_index_mark).toFixed()), //新榜指数
                            rank_mark : parseInt(FunUtil.caseStrToFloat(currentObj.new_rank_index_mark).toFixed()), //新榜指数
                            rank_date : key, //排行日期
                            rank_name:currentObj.rank_name,
                            month_Date : month_Date,
                            rank_position : parseInt(FunUtil.caseStrToFloat(currentObj.rank_position)), //名次
                            article_release_times : formatNumGt1w(currentObj.article_release_times), //发布次数
                            article_count : formatNumGt1w(currentObj.article_count),//发布篇数
                            article_count_big_clicks : formatNumGt1w(currentObj.article_count_big_clicks), //10W+发布
                            max_article_clicks_count : formatNumGt1w(currentObj.max_article_clicks_count), //最高阅读数
                            article_clicks_count : formatNumGt1w(currentObj.article_clicks_count),//总计——阅读数
                            avg_article_clicks_count : formatNumGt1w(currentObj.avg_article_clicks_count), //平均——阅读数
                            article_clicks_count_top_line : formatNumGt1w(currentObj.article_clicks_count_top_line), //总计——头条阅读数
                            avg_article_clicks_count_top_line : formatNumGt1w(currentObj.avg_article_clicks_count_top_line),//平均——头条阅读数
                            article_likes_count : formatNumGt1w(currentObj.article_likes_count), //总计——点赞数
                            avg_article_likes_count : formatNumGt1w(currentObj.avg_article_likes_count) //平均——点赞数
                        };

                        var obj2 = {
                            y: parseInt(FunUtil.caseStrToFloat(currentObj.rank_position)), //名次
                            rank_mark : parseInt(FunUtil.caseStrToFloat(currentObj.new_rank_index_mark).toFixed()), //新榜指数
                            rank_date : key, //排行日期
                            rank_name:currentObj.rank_name,
                            month_Date : month_Date,
                            rank_position : parseInt(FunUtil.caseStrToFloat(currentObj.rank_position)), //名次
                            article_release_times : formatNumGt1w(currentObj.article_release_times), //发布次数
                            article_count : formatNumGt1w(currentObj.article_count),//发布篇数
                            article_count_big_clicks : formatNumGt1w(currentObj.article_count_big_clicks), //10W+发布
                            max_article_clicks_count : formatNumGt1w(currentObj.max_article_clicks_count), //最高阅读数
                            article_clicks_count : formatNumGt1w(currentObj.article_clicks_count),//总计——阅读数
                            avg_article_clicks_count : formatNumGt1w(currentObj.avg_article_clicks_count), //平均——阅读数
                            article_clicks_count_top_line : formatNumGt1w(currentObj.article_clicks_count_top_line), //总计——头条阅读数
                            avg_article_clicks_count_top_line : formatNumGt1w(currentObj.avg_article_clicks_count_top_line),//平均——头条阅读数
                            article_likes_count : formatNumGt1w(currentObj.article_likes_count), //总计——点赞数
                            avg_article_likes_count : formatNumGt1w(currentObj.avg_article_likes_count) //平均——点赞数
                        };

                        indexObj.rankMarkValues[i] = obj1;
                        indexObj.rankPositionValues[i] = obj2;
                    }
                    indexObj.categories.reverse();
                    indexObj.rankMarkValues.reverse();
                    indexObj.rankPositionValues.reverse();
                }
                return indexObj;
            };

            FunUtil.caseStrToFloat = function(numStr) {
                return $.isNumeric(numStr) ? parseFloat(numStr) : 0;
            };

            FunUtil.switchListCharts=function(){
                var rank_indexData = FunUtil.rank_index();
                //console.log(rank_indexData);
                if(!rank_indexData) return;

                FunUtil.fillDataByDate(rank_indexData.rankMarkValues[6] || []); //初始化填充详情页面数据
                FunUtil.indexing_change(rank_indexData, "rankMark");   //绘图
                $('#list_bottom_tab span').click(function(){
                    $('#list_bottom_tab span').removeClass('checked');
                    $(this).addClass('checked');
                    $(this).attr('data')=='index'?FunUtil.indexing_change(rank_indexData, "rankMark"):FunUtil.indexing_change(rank_indexData, "rankPosition");
                });
            };

            FunUtil.switchListDetailDate=function(){
                var $listDateUl=$('#list_date_ul'),$dateIconfont=$('#list_info_date span.iconfont');
                $('#list_info_date').click(function(){  //展示时间列表
                    //if($listDateUl.hasClass('show')){
                    //    $listDateUl.removeClass('show').hide();
                    //    $('.m-mask').hide();
                    //    $dateIconfont.removeClass('icon-xdn-shangla');
                    //}else{
                    $listDateUl.addClass('show').show();
                    $('.m-mask').show();
                    $dateIconfont.addClass('icon-xdn-shangla');
                    //}
                });

                $('.m-mask').click(function(){
                    $listDateUl.removeClass('show').hide();
                    $('.m-mask').hide();
                    $dateIconfont.removeClass('icon-xdn-shangla');
                });

                var rank_indexData = FunUtil.rank_index();
                if(!rank_indexData) return;
                rank_indexData.categories.reverse();
                rank_indexData.rankMarkValues.reverse();
                //console.log(rank_indexData);
                $('#list_date').text(rank_indexData.categories[0].split('-')[0]+'月'+rank_indexData.categories[0].split('-')[1]+'日');
                $(rank_indexData.categories).each(function(index){   //填充时间
                    var date=this.split('-'), time=date[0]+'月'+date[1]+'日';
                    $('#list_date_ul').append('<span data='+index+'>'+time+'</span>');
                });

                $('#list_date_ul span').click(function(){   //切换时间
                    $listDateUl.removeClass('show').hide();
                    $('.m-mask').hide();
                    $('#list_date').text($(this).text());
                    $dateIconfont.removeClass('icon-xdn-shangla');
                    var selectIndex=$(this).attr('data');
                    FunUtil.fillDataByDate(rank_indexData.rankMarkValues[selectIndex] || []); //初始化填充详情页面数据
                });
            };


            FunUtil.listDetailInit=function(){
                FunUtil.switchListCharts();
                FunUtil.switchListDetailDate();
                FunUtil.fillTopUserDetail();
            };


            //===============================发布文章==============================
            var publicArticleObj={data:''};
            FunUtil.switchPublicArticleTab=function(){
                $('#topic_top_tab span').click(function(){
                    $('#topic_top_tab span').removeClass('checked');
                    $(this).addClass('checked');
                    ($(this).attr('data')=='latest')? FunUtil.fillPublicArticle(publicArticleObj.data.lastestArticle):FunUtil.fillPublicArticle(publicArticleObj.data.topArticle);
                });
            };

            FunUtil.publicArticleToHns=function(){
                $("#to_hns").unbind("click").bind("click",function(){
                    PageInfo.FunUtil.common4openUrl(memory.rootUrl.data+'m/s.html?s=NyotPD42');
                });
            };

            FunUtil.remotePublicArticle=function(){
                remote.detail.getAccountArticle(account,function(data){
                    //console.log(data);
                    publicArticleObj.data=data;
                });
            };

            FunUtil.fillPublicArticle=function(data){
                $('#public_article_list').html('');
                $(data).each(function(){
                    var originalFlag=(this.originalFlag && parseInt(this.originalFlag)==1)?'<span class="h-original">原创</span>':'';
                    var html=[
                        '<a href='+doNull(this.url)+'&rd2werd=1'+' target="_blank" style="display:block;">',
                        '<div class="article-one clear">',
                        '<div class="right-article-info">',
                        '<div class="h-title">'+originalFlag +doNull(this.title)+'</div>',
                        '<div class="h-summary">'+doNull(this.summary).getSubStr(80)+'</div>',
                        '<div class="h-bottom clear">',
                        '<span class="h-date">'+doNull(this.publicTime).DateFormat('yyyy-MM-dd hh:mm')+'</span>',
                        '<span class="h-line"></span>',
                        '<span class="h-order-num">' +(this.orderNum == 0 ? "头条": this.orderNum == 1 ? "次条": ("第" + (parseInt(this.orderNum)+1) +"条"))+ '</span>',
                        '<div class="h-right">',
                        '<div class="h-read">',
                        '<i class="iconfont icon-xdn-read"></i>',
                        '<span class="read-num">'+formatNumGt1w(doNull(this.likeCount))+'</span>',
                        '</div>',
                        '<span class="h-line"></span>',
                        '<div class="h-like">',
                        '<i class="iconfont icon-xdn-zan"></i>',
                        '<span class="like-num">'+formatNumGt1w(doNull(this.clicksCount))+'</span>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '</a>'
                    ];
                    $('#public_article_list').append(html.join(''));
                });
            };

            FunUtil.publicArticleInit=function(){
                FunUtil.switchPublicArticleTab();
                FunUtil.publicArticleToHns();
                FunUtil.remotePublicArticle();
                FunUtil.fillPublicArticle(publicArticleObj.data.lastestArticle);
            };


            //===============================公众号名片===========================
            FunUtil.accountCardRemote=function(){
                remote.detail.getAccountCard(account,function(data){
                    //console.log(data);
                    if(data){
                        FunUtil.accountCardInfo(data);
                        FunUtil.concernAccountCard(data);
                    }
                });
            };

            FunUtil.accountCardInfo=function(data){
                if(!data.user) return;
                $('.card-right-index').text(data.user.log1p_mark?parseFloat(data.user.log1p_mark).toFixed(1):'--/-');
                $('#card_account_short').text('微信号：'+doNull(data.user.account).getSubStr(10));
                $('#profile_text').text(doNull(data.user.description));
                $('#join_date').text(doNull(data.user.insert_time).DateFormat('yyyy-MM-dd'));


                //微信认证
                if(data.user.certified_text){
                    $('#certify_text').text(data.user.certified_text.split('：')[1]);
                }else{
                    $('.weixin-certify').hide();
                }

                //荣誉勋章
                if(data.user.month_top_times>0||data.user.isNewrank>=1){
                    $('#month_top_time').css('display',data.user.month_top_times>0?'inline-block':'none');
                    $('#is_newrank').css('display',data.user.isNewrank>=1?'inline-block':'none');
                }else{
                    $('.honour-medal').hide();
                    $('.join-newrank-date').addClass('border-none');
                }

                //分类标签
                var tagArr='';
                if(data.tags.length>0||data.user.type){
                    if(data.tags.length>0){
                        $(data.tags).each(function(index){
                            //if(index>3) return;
                            tagArr+=(data.tags[index].name+' ');
                        });
                        $('#tag_group').text(data.user.type+' '+'|'+' '+ tagArr);
                    }else{
                        $('#tag_group').text(data.user.type);
                    }
                }else{
                    $('.card-tag').hide();
                }


                //同主体公号
                var commonListLength=data.commonList.length;
                if(commonListLength>0){
                    if(commonListLength>3){
                        $('#common_total_num').text('等'+commonListLength+'个');
                    }else{
                        $('#common_total_num').text(commonListLength+'个');
                    }

                    $(data.commonList).each(function(index){
                        if(index>2) return;
                        var imgUrl='url(http://open.weixin.qq.com/qr/code/?username='+ doNull(this.account)+') 50% 50% / 495% no-repeat scroll transparent';
                        $('.common-account-box').append('<div class="account-one" style="background:'+imgUrl+'"></div>');
                    });

                    $('.common-account-num').unbind("click").bind("click",function(){    //跳至搜索V
                        PageInfo.FunUtil.common4openUrl({"url":"wechatSubscription?auth="+escape(data.user.certified_text.split('：')[1])});
                    });

                }else{
                    $('.common-account').hide();
                    if(data.weibolist.length+data.applist.length<1){
                        $('.weixin-certify').addClass('border-none');
                    }
                }

                //两微一端
                var list = [];
                var weibolist = data.weibolist; //微博
                var applist = data.applist; //app

                $.each(weibolist, function() {
                    list.push(this);
                });
                $.each(applist, function() {
                    list.push(this);
                });
                if(list.length > 0) {
                    $.each(list, function(i){
                        $('.all-platform').append('<div class="platform-one"><i class="m-detail-pic common-'+ memory.microList[this.media_type].key +'"></i><a  '+ (this.index_url ? ('href='+ this.index_url) : 'style="text-decoration:none;"') +' target="_blank">'+ this.name +'</a></div>');
                    });
                }else {
                    $('.all-platform').hide();
                    $('.common-account').addClass('border-none');
                }

            };

            FunUtil.concernAccountCard=function(data){
                $('.card-left-img').click(function(){
                    $('.m-mask,.concern-account-box').show();
                    $('#concern_account_code').attr('src','http://open.weixin.qq.com/qr/code/?username='+doNull(data.user.account));
                    $('#concern_account').text(doNull(data.user.name));
                    $('#account_is_use_hns').css('display',data.user.hns>0?'block':'none');
                });
                $('.m-mask').click(function(){
                    $('.m-mask,.concern-account-box').hide();
                });
            };

            FunUtil.accountCardInit=function(){
                FunUtil.accountCardRemote();
            };

            //===============================初始化==============================
            FunUtil.init=function(){
                FunUtil.listDetailInit();
                FunUtil.publicArticleInit();
                FunUtil.accountCardInit();
                FunUtil.switchPageTab();
            };

            FunUtil.switchPageTab=function(){
                $('.top-nav a').click(function(){
                    var divId = $(this).attr("id") +"_body";
                    $('.page-main').children('div').hide();
                    $("#"+ divId).show();
                    $('.top-nav a').removeClass('active');
                    $(this).addClass('active');
                });
            };

            FunUtil.init();

        };

        return Page;

    };

    return PageObj;
}});
