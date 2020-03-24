var util = require('../../utils/util.js')
var app = getApp();

Page({
    data: {
        item: {},
        pics: [],
        disabled: false,
        text: '',
        loading: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var item = JSON.parse(options.data);
        var img = (item.img.slice(item.img.length - 1) == ',') ? item.img.slice(0, -1) : item.img;
        var pics = img.split(",")
        for (var i = 0; i < pics.length; i++) {
            if (pics[i] != '') pics[i] = app.globalData.URL + pics[i]
        }
        console.log(pics)
        that.setData({
            item: item,
            pics: pics
        })
        if (item.isSolved == 1) {
            that.setData({
                disabled: true,
                text: "已处理"
            })
        } else {
            that.setData({
                text: "处理"
            })
        }
        console.log(that.data.pics)
    },
    submit() {
        var that = this
        wx.lin.showDialog({
            type:"confirm",     
            title:"提示",
            content:"确定更改状态？" ,
            success: (res) => {
              if (res.confirm) {
                var data = {}
                data.isSolved = 1
                data.id = that.data.item.id
                data = JSON.stringify(data)
                console.log(data)
                util.repair(
                    "api/sqwuye/app/repairs/update",
                    data,
                    function (res) {
                        console.log(res)
                        if (res.code == 0) {
                            that.setData({
                                disabled: true,
                                text: "已处理"
                            })
                        }
                    }
                )
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