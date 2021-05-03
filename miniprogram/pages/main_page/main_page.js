// pages/main_page/main_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection("List").get({
      success:res=>{
        getApp().globalData.selectArray = res.data
        getApp().globalData.dynasty = res.data[0].target
        getApp().globalData.name = res.data[0].text
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

  },


  //  主页面的基础两个分类button
  select_l: function(){

    wx.switchTab({
      url: '/pages/index/index',
    }),

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

  },

  select_r: function(){

    wx.switchTab({
      url: '/pages/catalog/catalog',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  

  select_m: function(){

    wx.switchTab({
      url: '/pages/morefunction/morefunction',
    })
  },
})