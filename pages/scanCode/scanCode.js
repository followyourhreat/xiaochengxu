const app = getApp()

Page({

  onLoad(options) {
    wx.showLoading({title: '加载中~', mask: true})
    const code = options['scene']
    this.getUser_id().then(user_id => {
      return app.api.bind_device({
        'device_mac': code,//:设备MAC地址
        'user_id': user_id, //:用户ID
      })
    }).then(res => {
      if (res['errcode'] !== 0) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
        return wx.showToast({title: res['errmsg'], icon: 'none'})
      } else {
        return res.data
      }
    }).then(res => {
      if (res && Number(res.state) === 1) {
        if (wx.getStorageSync('isVIP')) {
          wx.redirectTo({url: `/pages/water_vip/water_vip?mac=${code}&mac_id=${res.id}&tds=${res['tds_after']}`})
        } else {
          wx.redirectTo({url: `/pages/water/water?mac_id=${res.id}&tds=${res['tds_after']}`})
        }
      }
      wx.hideLoading()
    })
  },

  getUser_id() {
    return new Promise((resolve) => {
      const timing = setInterval(() => {
        const user_id = wx.getStorageSync('user_id')
        if (user_id) {
          clearInterval(timing)
          resolve(user_id)
        }
      }, 200)
    })
  },
})
