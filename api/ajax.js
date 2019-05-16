// 正式环境 appid: 'wx58b8019fc43184ef'
const host = 'https://api.ourslinks.com/index.php/qx/wechat'

// 测试环境 appid: 'wx18dbe4b601a4777d'
// const host = 'http://testapi.ourslinks.com/qx/wechat'

class ajax {
  static get(url, data) {
    return this.request(url, data, 'GET')
  }

  static post(url, data) {
    return this.request(url, data, 'POST')
  }

  static request(url, data, method) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: host + url,
        data,
        method,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          reject(res)
        },
      })
    })
  }
}

export default ajax
