const app = getApp()

Page({

  data: {},

  onLoad() {
    this.setData({
      water: app.data.water,
    })
  },

})
