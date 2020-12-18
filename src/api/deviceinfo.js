import request from '@/utils/request'

export function getDeviceInfo(params) {
  return request({
    url: '/deviceInfo',
    method: 'post',
    params,
  })
}

export function CamSwitch(data) {
  return request({
    url: 'CamSwitch',
    method: 'post',
    data,
  })
}
