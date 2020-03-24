//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    customitem: '全部',
    adUrls: null,
    indicatorDots: true,
    autoplay: true,
    duration: 1000,
    interval: 5000,
    communityservice: [{
        name: 'issue',
        img: '/img/gonggao.svg',
        text: '公告管理',
        url:''
      },
      {
        name: 'car',
        img: '/img/shebei.svg',
        text: '设备管理',
        url:""
      },
      {
        name: 'houseregistration',
        img: '/img/review.svg',
        text: '房屋审核',
        url:'../housing_audit/index'
      },
      {
        name: 'repair',
        img: '/img/repair.svg',
        text: '报修处理',
        url:"../repair/index"
      },
    ],
    notices:[
      {
        title:'物业扫雪，温暖业主',
        id:'',
        img:'/img/saoxue.jpg',
        time:'2020-03-09 16:54',
        cb:'notice'
      },
      {
        id:'',
        title:'防控疫情我们在行动',
        img:'/img/yiqing.jpeg',
        time:'2020-03-09 16:54',
        cb:'notice'
      },
    ],
    show: false,
    text: ''
  },
  not(){
    wx.lin.showDialog({
      type:"alert",     
      title:"温馨提示",
      content:"此功能正在开发中，敬请期待" ,

    })
  },
  onShow: function() {},
  onLoad: function() {},
})