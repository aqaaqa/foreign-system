import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/passport/dologin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/passport/logout',
    method: 'post'
  })
}

export function roleList() {
    return request({
        url: '/quest/menu',
        method: 'get'
    })
}

export function activate(data) {
  return request({
      url: '/quest/active',
      method: 'post',
      data
  })
}
