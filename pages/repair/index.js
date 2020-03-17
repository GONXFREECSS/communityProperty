var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    statusType: [
      { name: '全部', page: 0 },
      { name: "待处理", page: 0 },
      { name: "已完成", page: 0 }],
    currentType: 0,
    list: [],
    windowHeight: ''
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
    if (this.data.currentType == res.detail.currentNum) return;
    this.setData({
      currentType: res.detail.currentNum
    })
  },
  bindChange: function (e) {
    this.setData({
      currentType: e.detail.current
    })
    if (!this.data.list[e.detail.current].length)
      this.getList();
  },
  getList() {
    wx.showLoading();
    var that = this;
    var postData = { code: "", page: 1, limit: 10, offset: 0 };
    util.req('api/sqwuye/sys/repairs/list', postData, function (data) {
      wx.hideLoading();
      var items = data.rows;
      items.forEach(element => {
        var json = JSON.stringify(element)
        element.json =json
      });
      that.setData({
        list: items
      })
      console.log(that.data.list)
    })
  },
  orderDetail: function (e) {
    var data = e.currentTarget.dataset.json
    wx.navigateTo({
      url: "/pages/repair/item?data=" + data
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

  }
})