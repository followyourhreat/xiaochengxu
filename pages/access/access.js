const app = getApp()

Page({
  data: {
    switch: false,
  },

  onShow() {
    wx.getSetting({
      success(res) {
        if (res['authSetting']['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              app.data.index = 1
              wx.redirectTo({url: '/pages/my/my'})
            },
          })
        }
      },
    })
  },

  switch(e) {
    this.setData({
      switch: !e.detail.value,
    })
  },
})
