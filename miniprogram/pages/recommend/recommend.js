// miniprogram/pages/recommend/recommend.js
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
        dy:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


        //开始查询数据了  news对应的是集合的名称   
        db.collection("special").get({

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

    click: function (option) {
        console.log(option)
        app.globalData.dynasty = option.currentTarget.dataset.dy
        app.globalData.name = option.currentTarget.dataset.dyy
        wx.navigateTo({
          url: '/pages/detail/detail?cn=' + option.currentTarget.dataset.cn,
        })

}

})