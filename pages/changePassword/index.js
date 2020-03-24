// pages/changePassword/index.js
var util = require('../../utils/util.js')
var app = getApp();
var id = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPassword: '',
    newPassword: '',
    _newPassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: "userInfo",
      success: function (res) {
        id = res.data.id
      }
    })
  },
  oldPasswordInput: function (e) {
    this.setData({
      oldPassword: e.detail
    })
  },
  newPasswordInput: function (e) {
    this.setData({
      newPassword: e.detail
    })
  },
  _newPasswordInput: function (e) {
    this.setData({
      _newPassword: e.detail
    })
  },
  submit() {
    var that = this
    var data = that.data
    data.id = id
    if (data.oldPassword == '') {
      wx.showToast({
        title: '请输入原密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (data.newPassword == '') {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (data._newPassword == '') {
      wx.showToast({
        title: '请确认新密码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    var bl = data._newPassword==data.newPassword
    if (!bl) {
      wx.showToast({
        title: '两次输入的密码不相同',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    util.req('api/denglu/sys/user/updatePassword',data,function(res){
      if(res.code==0){
        wx.showToast({
          title: '修改成功，请重新登录',
          icon: 'none',
          duration: 2000
        })
        wx.clearStorageSync()
        wx.navigateBack({//返回
          delta: 1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})