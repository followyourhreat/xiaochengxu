const app = getApp()

Component({
  properties: {
    setIndex: {
      type: Number,
      value: -1,
    },
  },
  methods: {
    find() {
      if (app.data.index !== 0) {
        app.data.index = 0
        wx.redirectTo({url: '/pages/find/find'})
      }
    },
    //获取用户信息
    userInfo(e) {
      if (e.detail.userInfo) {
        if (app.data.index !== 1) {
          app.data.index = 1
          wx.redirectTo({url: '/pages/my/my'})
        }
      } else {
        wx.redirectTo({url: '/pages/access/access'})
      }
    },
    scanCode() {
      wx.showLoading({title: '请稍后', mask: true})
      if (!app.data.agree) {
        wx.hideLoading()
        return wx.showToast({title: '未同意《用户协议》不能享受服务', icon: 'none'})
      }
      // 用户不授权,跳转授权页面
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo'] === true) {
            wx.scanCode({
              success(res) {
                const user_id = wx.getStorageSync('user_id')
                if (!user_id) {
                  wx.hideLoading()
                  return wx.showToast({title: '用户信息获取失败', icon: 'none'})
                }
                let code
                if (res.path) {
                  let param = res.path.split('?')
                  code = param[1].split('=')[1]
                }
                const mac = code || res.result
                app.api.bind_device({
                  'device_mac': mac,//:设备MAC地址
                  'user_id': wx.getStorageSync('user_id'), //:用户ID
                }).then(res => {
                  if (res['errcode'] !== 0) {
                    return wx.showToast({title: res['errmsg'], icon: 'none'})
                  } else {
                    return res.data
                  }
                }).then(res => {
                  if (res && Number(res.state) === 1) {
                    if (Number(wx.getStorageSync('money')) > 0) {
                      wx.redirectTo({url: `/pages/water_vip/water_vip?mac=${mac}&mac_id=${res.id}&tds=${res['tds_after']}`})
                    } else {
                      wx.redirectTo({url: `/pages/water/water?mac_id=${res.id}&tds=${res['tds_after']}`})
                    }
                    wx.hideLoading()
                  }
                })
              },
              complete() {
                wx.hideLoading()
              },
            })
          }else{
            wx.reLaunch({url: '/pages/login/login'})
          }
        }
      })
      //不删除这段代码苹果扫码会闪退
      // if (app.data.index !== -1) {
      //   app.data.index = -1
      //   wx.redirectTo({url: '/pages/index/index'})
      // }
      
    },
  },
})
