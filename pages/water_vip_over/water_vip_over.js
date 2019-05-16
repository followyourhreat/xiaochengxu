const app = getApp()

Page({
  data: {
    order_vip: {},
  },

  onLoad() {
    this.setData({
      date: app.dateformat(),
      order_vip: app.data.order_vip,
    })
    this.rechargeSuccessful()
  },
  //更新余额
  rechargeSuccessful() {
    app.api.get_user_info({user_id: wx.getStorageSync('user_id')}).then(res => {
      wx.setStorageSync('money', res.data['money'])
      wx.setStorageSync('max_dosage', res.data['max_dosage'])
      wx.setStorageSync('isVIP', true)
    })
  },
})
