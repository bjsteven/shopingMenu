module.exports = [
  {
    url: '/deviceInfo',
    type: 'get',
    response(config) {
      console.log(config, '// config')
      // const { username } = config.body
      // if (!accessToken) {
      //   return {
      //     code: 500,
      //     msg: '帐户或密码不正确。',
      //   }
      // }
      return {
        code: 200,
        msg: 'success',
        data: {
          BatteryVol: '40%', // 电池余量
          MemoryVol: '160', // 存储卡余量
          CPUtemp: '45', // CPU温度
          CPUusage: '99', // CPU使用率
          isCharged: 'ON', // 是否充电中
          CamIsOn: 'ON', // 摄像头是否工作中
          CurrentMode: 'auto/user', // 当前拍摄模式 自动（夜间）/自定义
        },
      }
    },
  },
  {
    url: '/CamSwitch',
    type: 'post',
    response(config) {
      const { Mode } = config.body
      if (!Mode) {
        return {
          code: 500,
          msg: 'Mode不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          Mode,
        },
      }
    },
  },
]
