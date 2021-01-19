/* eslint-disable no-unused-vars */
const { getRandomBoolean } = require('../utils')

module.exports = [
  {
    url: '/deviceInfo',
    type: 'post',
    response(config) {
      const randomBoolean = getRandomBoolean()
      return {
        status: 'succ',
        BatteryVol: '40%', // 电池余量
        MemoryVol: '160', // 存储卡余量
        CPUtemp: '45', // CPU温度
        CPUusage: '99', // CPU使用率
        isCharged: 'ON', // 是否充电中
        CamIsOn: randomBoolean ? 'ON' : 'OFF', // 摄像头是否工作中
        CurrentMode: 'user', // 当前拍摄模式 自动（夜间）/自定义
      }
    },
  },
  {
    url: '/devicesetup',
    type: 'post',
    response(config) {
      console.log(config, '// config')
      // const randomBoolean = getRandomBoolean()
      return {
        data: {
          auto: [{ shutter: '1/200' }, { ISO: '100' }],
          night: [{ shutter: '1/100' }, { ISO: '200' }],
        },
        status: 'succ',
      }
    },
  },
  {
    url: '/CamSwitch',
    type: 'post',
    response(config) {
      return {
        status: 'succ',
      }
    },
  },
]
