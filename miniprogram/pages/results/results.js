// pages/results/results.js

const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    results:[],
    kw:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    var it = ""
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('test', function(data) {
      it = data.data
    })
    this.setData({
      kw:it
    })
    console.log(this.data.kw)

    db.collection("TANG").where(_.or([
      {
        now:({
          $regex:'.*' + it + '.*',
          $options: 'i'
        }) 
      },
      {
        old:({
          $regex:'.*' + it + '.*',
          $options: 'i'
        })
      }
    ])).get({
      success:res=>{
        console.log(res)
        this.setData({
          results:res.data
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