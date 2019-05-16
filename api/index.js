import ajax from './ajax.js'

export default {
  //获取OpenID
  get_open_id(param) {
    return ajax.post('/get_open_id', param)
  },
  //用户注册
  register(param) {
    return ajax.post('/register', param)
  },
  //获取用户详细信息
  get_user_info(param) {
    return ajax.post('/get_user_info', param)
  },
  //获取水量套餐包
  get_water_package(param) {
    return ajax.post('/get_water_package', param)
  },
  //用户扫码设备
  bind_device(param) {
    return ajax.post('/bind_device', param)
  },
  //用户统一下单接口
  create_order(param) {
    return ajax.post('/create_order', param)
  },
  //停止取水
  close_water(param) {
    return ajax.post('/close_water', param)
  },
  //发现列表
  get_Information_list(param) {
    return ajax.post('/get_Information_list', param)
  },
  //发现详情
  get_Information_detail(param) {
    return ajax.post('/get_Information_detail', param)
  },
}
