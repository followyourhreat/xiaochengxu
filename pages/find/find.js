const app = getApp()

Page({

  data: {
    domain: '',
    list: [],
  },

  onLoad() {
    this.setData({setIndex: app.data.index})
    this.get_Information_list()
  },

  get_Information_list() {
    app.api.get_Information_list({
      enterprise_id: 35563,
      page: 1,
    }).then(res => {
      if (res) {
        this.setData({
          domain: res.domain,
          list: res.data,
        })
      }
    })
  },
})
