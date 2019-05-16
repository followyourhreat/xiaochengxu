const app = getApp()

Page({

  data: {
    balance: 0,
  },

  onLoad() {
    wx.getUserInfo({
      success: (res) => {
        const emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
        const nickName = res.userInfo.nickName.replace(emojiReg, '')

        this.setData({
          nickName,
          info: res.userInfo,
        })
      },
    })
  },

  onShow() {
    this.setData({
      setIndex: app.data.index,
      balance: wx.getStorageSync('money'),
    })
  },
})
