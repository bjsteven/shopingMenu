import request from '@/utils/request'

export async function photolisting(data) {
  return request({
    url: '/photolisting',
    method: 'post',
    data,
  })
}
