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
    this.getUserProfile()
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

  },

  select_r: function(){

    wx.switchTab({
      url: '/pages/catalog/catalog',
    })
    this.getUserProfile()
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  

  select_m: function(){

    wx.switchTab({
      url: '/pages/morefunction/morefunction',
    })
    this.getUserProfile()
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '仅用于记录访问', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var info = res.userInfo
        info["time"] = new Date().toLocaleString()
        wx.cloud.database().collection("fangke").add({
          data:info
        })
      }
    })
  },

})