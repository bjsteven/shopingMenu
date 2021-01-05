/* eslint-disable no-unused-vars */
import axios from 'axios'
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  successCode,
  tokenName,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { isArray } from '@/utils/validate'
import { message } from 'ant-design-vue'

let loadingInstance

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case 401:
      message.error(msg || '登录失效')
      store.dispatch('user/resetAll').catch(() => {})
      break
    case 403:
      router.push({ path: '/401' }).catch(() => {})
      break
    default:
      message.error(msg || `后端接口${code}异常`)
      break
  }
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    console.log(config, '// config in request')

    if (store.getters['user/accessToken'])
      config.headers[tokenName] = store.getters['user/accessToken']
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    if (debounce.some((item) => config.url.includes(item))) {
      // config.data = qs.stringify(config.data)
      //这里写加载动画
    }
    if (config && config.method == 'post') {
      config.data = config.data
        ? {
            ...config.data,
            [`${tokenName}`]: store.getters['user/accessToken'],
          }
        : {
            [`${tokenName}`]: store.getters['user/accessToken'],
          }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    console.log(response, '// response in response')
    if (loadingInstance) loadingInstance.close()
    const { data, config } = response
    let { code, msg } = data
    msg = msg ? msg : data.status
    code = data.status == 'succ' ? 200 : 500
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(code)) {
      return data
    } else {
      handleCode(code, msg)
      return Promise.reject(
        'vue-admin-beautiful请求异常拦截:' +
          JSON.stringify({ url: config.url, code, msg }) || 'Error'
      )
    }
  },
  (error) => {
    console.log(error, '// error222222222222222222222')

    if (loadingInstance) loadingInstance.close()
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }
      message.error(message || `后端接口未知异常`)
      return Promise.reject(error)
    }
  }
)

export default instance
