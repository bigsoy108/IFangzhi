// pages/catalog/catalog.js
// 连接云端数据库
const db = wx.cloud.database();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:[],  //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    cn:"",    //对应的古地名
    select: false,
    tihuoWay: '全部',
    classi: "",
    animationData:{},
    imgname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgname:getApp().globalData.name
    })

    //开始查询数据了 
    db.collection(app.globalData.dynasty).get({

      //如果查询成功的话    
      success: res => {

        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
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
    this.setData({
      imgname:getApp().globalData.name
    })
    var classi = this.data.classi
    if(classi==0){
      db.collection(app.globalData.dynasty).get({

        //如果查询成功的话    
        success: res => {
  
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
          this.setData({
            ne: res.data
          })
        }
      })
    }
  if(classi==1){
    db.collection(app.globalData.dynasty).where({
      level: 1
    }).get({

      //如果查询成功的话    
      success: res => {

        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
      }
    })
      
    }
    if(classi==2){
      db.collection(app.globalData.dynasty).where({
        level: 2
      }).get({

        //如果查询成功的话    
        success: res => {
  
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
          this.setData({
            ne: res.data
          })
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
    wx.showLoading({
      title: '刷新中',
      duration: 1000
    })
    var classic = this.data.classi
    var x = this.data.ne.length
    var old_data = this.data.ne
    if(classic == 0){
      db.collection(app.globalData.dynasty).skip(x).get({

        //如果查询成功的话    
        success: res => {
  
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
          this.setData({
            ne: old_data.concat(res.data),
          })
        }
      })
    }
    if(classic == 1){
      db.collection(app.globalData.dynasty).skip(x).where({
        level: 1
      }).get({

        //如果查询成功的话    
        success: res => {
  
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
          this.setData({
            ne: old_data.concat(res.data),
          })
        }
      })
    }
    if(classic == 2){
      db.collection(app.globalData.dynasty).skip(x).where({
        level: 2
      }).get({

        //如果查询成功的话    
        success: res => {
  
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
          this.setData({
            ne: old_data.concat(res.data),
          })
        }
      })
    }
    
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  refresh: function(e){
    this.onShow()
  },

  click: function (option) {
    wx.navigateTo({
      url: '/pages/detail/detail?cn=' + option.currentTarget.dataset.cn,
    })

  },


  bindShowMsg(){
    var animation = wx.createAnimation({
      timingFunction:"ease"
    })
    if(this.data.select){
      animation.rotate(0).step(); 
    }else{
      animation.rotate(180).step(); 
    }
    this.setData({
      animationData: animation.export(),
      select: !this.data.select
    })
  },

  mySelect(e){
    var name = e.currentTarget.dataset.name
    var cl = e.currentTarget.dataset.cl
    var animation = wx.createAnimation({
      timingFunction:"ease"
    })
    animation.rotate(0).step(); 
    this.setData({
      tihuoWay: name,
      select:false,
      classi: cl,
      animationData: animation.export(),
    })
    this.onShow()

  }

   

})