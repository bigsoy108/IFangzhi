// pages/detail/detail.js
// 连接云端数据库

const db = wx.cloud.database();
const cont = db.collection('TANG');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:{},  //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    cn:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      cn:options.cn
    })
    console.log(this.data.cn)

     
    db.collection('TANG').where(
      {
        old:this.data.cn     
      }
    ).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          ne:res.data[0]
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
