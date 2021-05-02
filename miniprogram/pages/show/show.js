// miniprogram/pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [{
      "id": "0",
      "text": "秦",
      "target":"QIN"
  }, {
      "id": "1",
      "text": "汉",
      "target":"HAN"
  },
  {
    "id": "2",
    "text": "唐",
    "target":"TANG"
},
{
  "id": "3",
  "text": "宋",
  "target":"SONG"
},
{
  "id": "4",
  "text": "明",
  "target":"MING"
},
{
  "id": "5",
  "text": "清",
  "target":"QING"
}
]
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      var app = getApp()
      app.globalData.dynasty = this.data.selectArray[0].target
      console.log(app.globalData.dynasty)
    }, 1000)
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

  },
  getDate:function(e){
    console.log(e.detail)
}
})