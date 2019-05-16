const app = getApp()

Page({

  data: {
    url: '',
  },

  onLoad(e) {
    this.find_info(e.id)
  },

  //发现详情
  find_info(id) {
    app.api.get_Information_detail({id}).then(res => {
      this.setData({
        url: res.data.content,
      })
    })
  },
})
