const app = getApp()

Page({

  data: {
    balance: 0,
    money: 10,
    tabIndex: 1,
  },

  onShow() {
    this.setData({
      balance: wx.getStorageSync('money'),
    })
  },

  // inputMoney(e) {
  //   this.data.money = e.detail.value
  // },

  //统一下单
  unifiedOrder() {
    return app.api.create_order({
      'type': '1',                             //:订单类型 1:用户充值 2：用户购买套餐
      'user_id': wx.getStorageSync('user_id'),  //:用户ID 必填
      'money': this.data.money,
    })
  },

  pay() {
    // if (Number(this.data.money) < 1) {
    //   return wx.showToast({title: '充值金额最少1元', icon: 'none'})
    // }

    wx.showLoading({title: '请稍后'})
    this.unifiedOrder().then(res => {
      wx.hideLoading()
      wx.requestPayment({
        'timeStamp': res.data.timeStamp,
        'nonceStr': res.data.nonceStr,
        'package': res.data.package,
        'signType': res.data.signType,
        'paySign': res.data.paySign,
        success: () => {
          this.rechargeSuccessful()
        },
      })
    })
  },

  //更新余额
  rechargeSuccessful() {
    app.api.get_user_info({user_id: wx.getStorageSync('user_id')}).then(res => {
      this.setData({
        balance: res.data['money'],
      })
      wx.setStorageSync('money', res.data['money'])
      wx.setStorageSync('max_dosage', res.data['max_dosage'])
      wx.setStorageSync('isVIP', true)
    })
  },

  tab(e) {
    console.log(e)
    this.setData({
      money: e.currentTarget.dataset.price,
      tabIndex: e.currentTarget.dataset.id,
    })
  },
})
