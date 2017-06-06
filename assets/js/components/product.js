/**
 * Created by helin on 2017/4/14.
 */

PageInfo.register({"type":"Obj","info":function(){

    var PageObj = {};


    PageObj.require = {
        "$"  :'jquery',
        "common" :'common'
    };

    PageObj.page = function(){

        var FunUtil = {};
        var HtmUtil = {};
        var Page 	= {};

        Page.show = function(){
            var  common        = this.common;

            FunUtil.productList=function(){
                var arr=[
                    {
                        detail_title:'数据咨询',
                        detail_info:'基于权威的移动端全平台内容大数据，新榜提供新媒体发展状况的动态、详实数据，以及全方位的咨询评估服务。',
                        detail_info_two:'',
                        type_list:[
                            {
                                img:'icon-xdn-weixin',
                                text:"微信数据情报</br>分析"
                            },
                            {
                                img:'icon-xdn-pinggu',
                                text:"垂直行业新媒</br>体咨询评估"
                            },
                            {
                                img:'icon-xdn-jiance',
                                text:"口碑舆情监测"
                            },
                            {
                                img:'icon-xdn-ziping',
                                text:"集群新媒体运</br>营咨询评估"
                            },
                            {
                                img:'icon-xdn-renzheng1',
                                text:"数据甄别评估</br>认证"
                            }
                        ]
                    },
                    {
                        detail_title:'广告营销',
                        detail_info:'通过线上平台提供广告主和媒体主自助交易服务，并组建专业团队提供广告营销增值服务，包括策略投放、产品组合、效果监测等，覆盖全平台信息流、头部KOL、中长尾自媒体等海量移动端广告资源，全面服务于品牌客户及渠道代理商公司。',
                        type_list:[
                            {
                                img:'icon-xdn-celue',
                                text:"投放策略建议"
                            },
                            {
                                img:'icon-xdn-shaixuan',
                                text:"渠道筛选"
                            },
                            {
                                img:'icon-xdn-zijin',
                                text:"资金垫付"
                            },
                            {
                                img:'icon-xdn-xiaoguo',
                                text:"效果监测"
                            }
                        ]
                    },
                    {
                        detail_title:'电商导购',
                        detail_info:'依托新榜大数据优势，对优质商品和内容渠道进行精准匹配，在实现品牌传播和电商销售的同时，为自媒体变现开拓新的内容电商增量市场。',
                        type_list:[
                            {
                                img:'icon-xdn-youxuan',
                                text:"优质商品筛选"
                            },
                            {
                                img:'icon-xdn-baozhuang',
                                text:"场景化包装</br>呈现"
                            },
                            {
                                img:'icon-xdn-duijie',
                                text:"内容渠道精准</br>对接"
                            },
                            {
                                img:'icon-xdn-shangcheng',
                                text:"商城搭建及</br>运营"
                            },
                            {
                                img:'icon-xdn-fenxi',
                                text:"内容电商数据</br>分析"
                            }
                        ]
                    },
                    {
                        detail_title:'版权经纪',
                        detail_info:'为PUGC著作权所有者提供版权代理、交易、授权、维权等MCN开发服务，实现优质内容的跨平台分发和多介质传播，全方位发掘优质内容的传播价值和商业潜力。',
                        type_list:[
                            {
                                img:'icon-xdn-banquan',
                                text:"版权交易"
                            },
                            {
                                img:'icon-xdn-bianjiqi',
                                text:"编辑器、素材库"
                            },
                            {
                                img:'icon-xdn-quanpingtai',
                                text:"全平台分发"
                            },
                            {
                                img:'icon-xdn-yuanchuang',
                                text:"原创版权保护</br>险"
                            }
                        ]
                    },
                    {
                        detail_title:'孵化加速',
                        detail_info:'联合顶级VC和产业巨头，帮助早期内容创业者在各个商业领域展开创新和尝试，力争在消费升级时代培育出一批，具有核心竞争力的人格化、视频化、电商化内容品牌。',
                        type_list:[
                            {
                                img:'icon-xdn-fuhua',
                                text:"内容孵化"
                            },
                            {
                                img:'icon-xdn-jidi',
                                text:"制作基地"
                            },
                            {
                                img:'icon-xdn-zibenduijie',
                                text:"资本对接"
                            }
                        ]
                    }
                ];

                $(arr).each(function(){
                    var self=this,str='';

                    $(self.type_list).each(function(index){
                        var line=(index+1==self.type_list.length||(index+1)%3==0)?'':'<div class="type-line"></div>';
                        var ele=[
                            '<div class="type-one">',
                            '<p class="iconfont '+this.img+' icon"></p>',
                            '<p>'+this.text+'</p>',
                            '</div>',
                            line
                        ];
                        str+=ele.join('');
                    });

                    var html=[
                        '<div class="data-consult">',
                        '<div class="product-title">'+self.detail_title+'</div>',
                        '<p class="summary">'+self.detail_info+'</p>',
                        '<div class="type-box clear">'+str+'</div>',
                        '</div>'
                    ];
                    $('#product_body').append(html.join(''));
                });

            };

            FunUtil.productList();

        };
        return Page;

    };

    return PageObj;
}});



