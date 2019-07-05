import request from '@/utils/request'

export function questList() {
  return request({
    url:'/quest/list',
    method: 'get',
  })
}

