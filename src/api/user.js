import request from '@/utils/request'

/*
 * 登录
 * @param {*} data 
 */
export function login(data) {
  return request({
    url: '/passport/dologin',
    method: 'post',
    data
  })
}

/*
 * 注册
 * @param {*} data 
 */
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

/*
 * 验证码
 * @param {*} data 
 */
export function sms(data) {
  return request({
    url: '/user/sms',
    method: 'post',
    data
  })
}

/*
 * 退出
 * @param {*} data 
 */
export function logout() {
  return request({
    url: '/passport/logout',
    method: 'post'
  })
}


/*
 * 菜单栏
 * @param {*} data 
 */
export function roleList() {
    return request({
        url: '/front/base/menu',
        method: 'post'
    })
}


/*
 * 注册学校
 * @param {*} data 
 */
export function userSchool() {
  return request({
      url: '/user/school',
      method: 'post',
  })
}

/*
 * 激活单元
 * @param {*} data 
 */
export function activateBase(data) {
  return request({
      url: '/front/quest/active',
      method: 'post',
      data
  })
}


// 忘记密码
/*
 * 图片验证码
 * @param {*} data 
 */
export function imageCode(data) {
  return request({
    url: '/passport/imageCode',
    method: 'post',
    data
  })
}


/*
 * 手机验证码
 * @param {*} data 
 */
export function smsUdpass(data) {
  return request({
    url: '/user/smsUdpass',
    method: 'post',
    data
  })
}

/*
 * 确定用户
 * @param {*} data 
 */
export function confirmPhone(data) {
  return request({
    url: '/user/confirmPhone',
    method: 'post',
    data
  })
}

/*
 * 忘记密码
 * @param {*} data 
 */
export function updatePassword(data) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
}

/*
 * 修改密码
 * @param {*} data 
 */
export function updatePasswordUser(data) {
  return request({
    url: '/user/updatePasswordUser',
    method: 'post',
    data
  })
}