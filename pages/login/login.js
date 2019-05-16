const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.bindGetUserInfo()
  },
  bindGetUserInfo() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === true) {
          wx.redirectTo({url: '/pages/index/index'})
        }
      }
    })
  },
  //获取用户信息
  userInfo(e) {
    if (e.detail.userInfo) {
      wx.redirectTo({url: '/pages/index/index'})
    } else {
      // wx.redirectTo({url: '/pages/access/access'})
      // wx.showToast({title: '请同意授权信息', icon: 'none'})
    }
  }
})