import api from './api/index'
import dateformat from './utils/dateformat'

App({
  api,

  dateformat,

  data: {
    index: -1,
    //默认同意协议
    agree: 1,
  },

  onLaunch() {
    // wx.showLoading({title: '加载中~', mask: true})
    // wx.login({
    //   success: (res) => {
    //     console.log(res)
    //     api.get_open_id({code: res.code}).then(res => {
    //       return res.data['openid']
    //     }).then(openid => {
    //       return api.register({open_id: openid})
    //     }).then(res => {
    //       return api.get_user_info({user_id: res.data.id})
    //     }).then(res => {
    //       let isVIP = false
    //       if (Number(res.data['money']) > 0) {
    //         isVIP = true
    //       }
    //       wx.setStorageSync('money', res.data['money'])
    //       wx.setStorageSync('max_dosage', res.data['max_dosage'])
    //       wx.setStorageSync('isVIP', isVIP)
    //       wx.setStorageSync('user_id', res.data['id'])

    //       this.data.money = res.data['money']
    //       this.data.max_dosage = res.data['max_dosage']
    //       this.data.isVIP = isVIP
    //       this.data.id = res.data['id']
    //       wx.hideLoading()
    //     })
    //   },
    // })
  },
})
