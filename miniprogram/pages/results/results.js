// pages/results/results.js

const db = wx.cloud.database()
const _ = db.command
const app = getApp()

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
    this.setData({
      kw:options.kw
    })
    console.log(this.data.kw)

    db.collection(app.globalData.dynasty).where(_.or([
      {
        now:({
          $regex:'.*' + this.data.kw + '.*',
          $options: 'i'
        }) 
      },
      {
        old:({
          $regex:'.*' + this.data.kw + '.*',
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
    db.collection(app.globalData.dynasty).where(_.or([
      {
        now:({
          $regex:'.*' + this.data.kw + '.*',
          $options: 'i'
        }) 
      },
      {
        old:({
          $regex:'.*' + this.data.kw + '.*',
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
    wx.showLoading({
      title: '刷新中',
      duration: 1000
    })
    
    var x = this.data.results.length
    console.log(x)
    var old_data = this.data.results
    db.collection(app.globalData.dynasty).where(_.or([
      {
        now:({
          $regex:'.*' + this.data.kw + '.*',
          $options: 'i'
        }) 
      },
      {
        old:({
          $regex:'.*' + this.data.kw + '.*',
          $options: 'i'
        })
      }
    ])).skip(x).get({
      success:res=>{
        console.log(res)
        this.setData({
          results: old_data.concat(res.data),
        })
      }
    })
    console.log('circle 下一页');
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  click: function (option) {
    console.log(option)
    var cn = option.currentTarget.dataset.cn
    wx.navigateTo({
      url: '/pages/detail/detail?cn=' + option.currentTarget.dataset.cn,
    })

  },
  formSubmit1: function (e) {
    //获取表单所有name=keyword的值
    
    this.setData({
      kw:e.detail.value.keyword
    })
    this.Searchnavigation()
  },
  formSubmit2: function (e) {
    //获取表单所有name=keyword的值
    
    this.setData({
      kw:e.detail.value
    })
    this.Searchnavigation()

  },
  Searchnavigation(){
    var pages = getCurrentPages()
    var currPage = pages[pages.length - 2]
    currPage.setData({
      keyword:this.data.kw
    })

    if(this.data.kw) {  
        
      wx.redirectTo({
        url: '/pages/results/results?kw='+this.data.kw
      })
  
      //显示搜索中的提示
      wx.showLoading({
        title: '搜索中',
        icon: 'loading'
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)      
      }else{
          wx.showToast({
            title: '输入不能为空',
            icon: 'none',
            duration: 2000
        }) 
      }
    
  },

  refresh: function(e){
    this.onShow()
  },

})