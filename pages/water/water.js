const app = getApp()

Page({

  data: {
    water_package_id: -1,
    water: [],
    tds: 0,
  },

  onLoad(e) {
    this.data.mac_id = e.mac_id
    let tds = e.tds || 0
    if (tds !== undefined && Number(tds) === 0) {
      tds = 0
    } else if (tds !== undefined && tds.length === 1) {
      tds = '00' + tds
    } else if (tds !== undefined && tds.length === 2) {
      tds = '0' + tds
    }
    this.get_water_package().then(res => {
      this.setData({
        tds,
        water: res.data,
      })
    })
  },

  tab(e) {
    app.data.water = e.currentTarget.dataset.item
    this.setData({
      water_package_id: e.currentTarget.dataset.id,
    })
  },

  /**
   * 获取水量套餐包
   */
  get_water_package() {
    return app.api.get_water_package({device_id: this.data.mac_id})
  },

  /**
   * 统一下单
   */
  unifiedOrder() {
    return app.api.create_order({
      type: '2',                           //:订单类型 1:用户充值 2：用户购买套餐
      water_package_id: this.data.water_package_id,  //:套餐ID 当 type = 1时 可不填 type = 2时 必填
      device_id: this.data.mac_id,                      //:设备ID 当 type = 1时 可不填 type = 2时 必填
      user_id: app.data.id,                   //:用户ID 必填
    })
  },

  //支付
  pay() {
    if (!app.data.id) {
      return wx.showToast({title: '用户信息获取失败', icon: 'none'})
    }
    wx.showLoading({title: '请稍后'})
    if (this.data.water_package_id === -1) {
      wx.showToast({title: '请选择水量', icon: 'none'})
    } else {
      this.unifiedOrder().then(res => {
        wx.hideLoading()
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            wx.redirectTo({url: '/pages/water_over/water_over'})
          },
        })
      })
    }
  },
})
