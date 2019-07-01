import request from '@/utils/request'

export function topicList() {
  return request({
    url:'/topic/list',
    method: 'get',
  })
}