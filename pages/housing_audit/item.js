var util = require('../../utils/util.js')
var app = getApp();

Page({
    data: {
        item: {},
        loading: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var pics = ''
        var disabled = false
        var text = '审核'
        var item = JSON.parse(options.data);
        console.log(item)
        if (item.img != '' && item.img != null) {
            pics = item.img.split(",")
            for (var i = 0; i < pics.length; i++) {
                if (pics[i] != '') pics[i] = app.globalData.URL + pics[i]
            }
        }
        if (item.isVerify == 1) {
            disabled = true
            text = "已通过"
        }else if(item.isVerify == 2){
            disabled = true
            text = "已拒绝"
        }
        that.setData({
            item: item,
            pics: pics,
            disabled:disabled,
            text:text
        })
    },
    submit() {
        var that = this
        var token = wx.getStorageSync("token")
        console.log("dialog")
        wx.lin.showDialog({
            type: "confirm",
            title: "提示",
            content: "确定更改状态？",
            success: (res) => {
                if (res.confirm) {
                    var data = {}
                    data.isVerify = 1
                    data.housesId = that.data.item.housesId
                    data.id = that.data.item.id
                    // data = JSON.stringify(data)
                    console.log(data)
                    wx.request({
                        url: "http://wwjgzq.natappfree.cc/api/sqwuye/family/update",
                        data: data,
                        method: 'post',
                        header: {
                            'Authorization': token
                        },
                        success: function (res) {
                            if (res.data.code == 0) {
                                that.setData({
                                    disabled: true,
                                    text: "已处理"
                                })
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function () {
                            return typeof cb == "function" && cb(false)
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    previewImg(e) {
        console.log(e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        var imgArr = this.data.pics;
        wx.previewImage({
            current: imgArr[index],     //当前图片地址
            urls: imgArr,               //所有要预览的图片的地址集合 数组形式
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })

    }
}) 