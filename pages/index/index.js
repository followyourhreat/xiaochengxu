const app = getApp()

Page({

  onLoad() {
    const self = this;
    app.data.index = -1
    wx.getUserInfo({
      success: (res) => {
        app.data.userInfo = res.userInfo
        self.login()
      }
    })
  },

  login() {
    wx.showLoading({title: '加载中~', mask: true})
    wx.login({
      success: (res) => {
        app.api.get_open_id({code: res.code}).then(res => {
          return res.data['openid']
        }).then(openid => {
          return app.api.register({open_id: openid,nickName: app.data.userInfo.nickName})
        }).then(res => {
          return app.api.get_user_info({user_id: res.data.id})
        }).then(res => {
          let isVIP = false
          if (Number(res.data['money']) > 0) {
            isVIP = true
          }
          wx.setStorageSync('money', res.data['money'])
          wx.setStorageSync('max_dosage', res.data['max_dosage'])
          wx.setStorageSync('isVIP', isVIP)
          wx.setStorageSync('user_id', res.data['id'])

          app.data.money = res.data['money']
          app.data.max_dosage = res.data['max_dosage']
          app.data.isVIP = isVIP
          app.data.id = res.data['id']
          wx.hideLoading()
        })
      },
    })
  },

  protocol() {
    wx.navigateTo({url: '/pages/protocol/protocol'})
  },

  //同意协议
  agree(e) {
    app.data.agree = e.detail.value.length
  },
})
