//index.js
const app = getApp()

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
    //执行点击事件
    formSubmit: function (e) {

      //声明当天执行的
      var that = this;
  
      //获取表单所有name=keyword的值
      var formData = e.detail.value.keyword;

      wx.navigateTo({
        url: '/pages/results/results',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          test: function(data) {
            console.log(data)
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('test', { data: formData })
        }
      })
  
      //显示搜索中的提示
      wx.showLoading({
        title: '搜索中',
        icon: 'loading'
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      

    },
})