// pages/test/test.js

const db = wx.cloud.database();
const _ = db.command
const app = getApp()
var dy = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 116.3972282409668,
    latitude: 39.90960456049752,
    markers: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    let _this =this
    dy = app.globalData.dynasty

    db.collection(app.globalData.dynasty).where({
      level:_.gt(0)
    }).count({
      success: function(res) {
        _this.mapSet(res.total)
      }
    })


      wx.getLocation({
        type:'gcj02',
        altitude: true, //高精度定位
        success: function(res) {
          // 设置坐标
          _this.setData({
            longitude: res.longitude,
            latitude: res.latitude
          })
        },
        fail:function(err){
          
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
    let _this =this

    if(dy!=app.globalData.dynasty)
{
  dy = app.globalData.dynasty
    db.collection(app.globalData.dynasty).where({
      level:_.gt(0)
    }).count({
      success: function(res) {
        _this.mapSet(res.total)
      }
    })
  }
    this.selectComponent('#sec').setData({
      nowText:app.globalData.name
    })
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

  },

  mapdetail: function(e){
    var cn = this.data.markers[e.detail.markerId].label.content
    wx.navigateTo({
      url: '/pages/detail/detail?cn=' + cn,
    })
  },

  mapSet(e){
    var times = Math.ceil(e/20)
    var addResults = []
    var market_id = 0
    for(var tt =0;tt<times;tt++){
      db.collection(app.globalData.dynasty).skip(20*tt).get({
        success:res=>{
          for(var index in res.data){
            if(res.data[index].location){
              var ii =  {
                iconPath: "/images/loc.png",
                id: 0,
                latitude: 0,
                longitude: 0,
                width: 40,
                height: 40,
                label:{
                  content: '',  //文本
                  color: '#FF0202',  //文本颜色
                  borderRadius: 3,  //边框圆角
                  borderWidth: 1,  //边框宽度
                  borderColor: '#FF0202',  //边框颜色
                  bgColor: '#ffffff',  //背景色
                  padding: 5,  //文本边缘留白
                  textAlign: 'center'  //文本对齐方式。有效值: left, right, center
                  }
              }
              ii.id = Number(market_id)
              market_id = market_id+1
              ii.latitude = res.data[index].location.latitude
              ii.longitude = res.data[index].location.longitude
              ii.label.content = res.data[index].old
              addResults.push(ii)
            }
  
          }
          this.setData({
            markers:addResults
          })
        }
      })
    }
  },
  refresh(){
    this.onShow()
  }
})