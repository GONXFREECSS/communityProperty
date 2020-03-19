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
        var item = JSON.parse(options.data);
        console.log(item)
        if (item.img != '' && item.img!=null) {
            pics = item.img.split(",")
            for (var i = 0; i < pics.length; i++) {
                if (pics[i] != '') pics[i] = app.globalData.URL + pics[i]
            }
        }
        that.setData({
            item: item,
            pics: pics
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