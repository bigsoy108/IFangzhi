//index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:""
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
    this.selectComponent('#sec').setData({
      nowText:getApp().globalData.name
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
    formSubmit1: function (e) {
      //获取表单所有name=keyword的值

      
      this.setData({
        keyword:e.detail.value.keyword
      })
      this.Searchnavigation()
    },
    formSubmit2: function (e) {
      //获取表单所有name=keyword的值
      
      //获取表单所有name=keyword的值
      this.setData({
        keyword:e.detail.value
      })
      this.Searchnavigation()
  
    },
    Searchnavigation(){
      if(this.data.keyword) {  
        
        wx.navigateTo({
          url: '/pages/results/results?kw='+this.data.keyword
        })
        
        }else{
            wx.showToast({
              title: '输入不能为空',
              icon: 'none',
              duration: 1000
          }) 
        }
      
    },

maps: function(){
  wx.navigateTo({
    url: '/pages/mapsearch/mapsearch'
  })
},

recommend: function(){
  wx.navigateTo({
    url: '/pages/recommend/recommend',
  })
}


})