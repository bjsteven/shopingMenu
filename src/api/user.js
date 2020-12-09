import request from '@/utils/request'
import { tokenName } from '@/config'

export async function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

// 清空照片
export async function deletephotos(data) {
  return request({
    url: 'deletephotos',
    method: 'post',
    data,
  })
}

// 修改密码
export async function updatePassword(data) {
  return request({
    url: '/updatePassword',
    method: 'post',
    data,
  })
}

// 日出日落时间提交
export async function daynighttime(data) {
  console.log('🚀 ~ file: user.js ~ line 23 ~ daynighttime ~ data', data)
  return request({
    url: '/daynighttime',
    method: 'post',
    data,
  })
}

// 基于日出日落开启
export async function autoswitch(data) {
  return request({
    url: '/autoswitch',
    method: 'post',
    data,
  })
}

export async function socialLogin(data) {
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo(accessToken) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
