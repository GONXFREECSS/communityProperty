var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    statusType: [
      { name: '全部', isVerify: -1 },
      { name: "待处理", isVerify: 0 },
      { name: "已完成", isVerify: 1 }],
    currentType: 0,
    list: [],
    page: 1,
    mtype:1,//加载更多动画显示类型
    hidden: true ,//加载动画显示与隐藏
    limit: 10,
    windowHeight: ''
  },
  lower(){
    console.log('dddd')
  },
  onLoad(options) {
    this.getList();
    var systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: systemInfo.windowHeight,
      currentType: options.id ? options.id : 0
    })
  },
  // 点击tab切换 
  swichNav: function (res) {
    console.log(this.data.currentType + '+' + res.detail.currentNum)
    if (this.data.currentType == res.detail.currentNum) return;
    this.setData({
      currentType: res.detail.currentNum
    })
  },

  bindChange: function (e) {
    console.log(e.detail.current)
    this.setData({
      currentType: e.detail.current
    })
    this.getList();
  },

  getList() {
    var that = this;
    wx.showLoading();
    that.setData({
      hidden : false,
      list:[]
    })
    var postData = ''
    var isVerify = that.data.statusType[that.data.currentType].isVerify;
    if (isVerify == -1) {
      postData = { page: that.data.page, limit: that.data.limit, offset: 0 };
    } else {
      postData = { isVerify: isVerify, page: that.data.page, limit: that.data.limit, offset: 0 };
    }
    util.req('/api/sqwuye/family/select', postData, function (data) {
      wx.hideLoading();
      if (!data) {
        that.setData({
          mtype:3
        })
        return false
      }
      var items = data.rows;
      items.forEach(element => {
        var json = JSON.stringify(element)
        element.json = json
      });
      that.setData({
        list: items,
        page:that.data.page+1,
        hidden:true
      })
      console.log(that.data.list)
    })
  },
  orderDetail: function (e) {
    var data = e.currentTarget.dataset.json
    wx.navigateTo({
      url: "/pages/housing_audit/item?data=" + data
    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    getList();
  }
})