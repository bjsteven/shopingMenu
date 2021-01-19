const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken',
}

module.exports = [
  {
    url: '/login',
    type: 'post',
    response(config) {
      const { username, password } = config.body
      if (!username || !password) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        }
      }
      return {
        status: 'succ',
        token: '123456',
      }
    },
  },
  // 修改密码
  {
    url: '/passwordchange',
    type: 'post',
    response(config) {
      console.log(config, '// in passwordchange')

      return {
        status: 'succ',
      }
    },
  },
  // 清空照片
  {
    url: '/deletephotos',
    type: 'post',
    response(config) {
      console.log(config, '// in deletephotos')

      return {
        status: 'succ',
      }
    },
  },
  // xiazai照片
  {
    url: '/download',
    type: 'post',
    response(config) {
      console.log(config, '// in deletephotos')

      return {
        status: 'succ',
        downloadlink: 'http://www.ppcam.cn/static/zipphoto/xxxx.txt',
      }
    },
  },
  // 日出日落时间提交
  {
    url: '/daynighttime',
    type: 'post',
    response(config) {
      console.log(config, '// configconfigconfig')

      const { Sunrise, Sunset } = config.body
      return {
        status: 'succ',
        Sunrise,
        Sunset,
      }
    },
  },
  // 基于日出日落开启
  {
    url: '/autoswitch',
    type: 'post',
    response(config) {
      console.log(config, '// configconfigconfig')
      return {
        status: 'succ',
      }
    },
  },
  {
    url: '/socialLogin',
    type: 'post',
    response(config) {
      const { code } = config.body
      if (!code) {
        return {
          code: 500,
          msg: '未成功获取Token。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken: accessTokens['admin'] },
      }
    },
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功',
      }
    },
  },
  {
    url: '/userInfo',
    type: 'post',
    response(config) {
      const { accessToken } = config.body
      let roles = ['admin']
      let ability = ['READ']
      let username = 'admin'
      if ('admin-accessToken' === accessToken) {
        roles = ['admin']
        ability = ['READ', 'WRITE', 'DELETE']
        username = 'admin'
      }
      if ('editor-accessToken' === accessToken) {
        roles = ['editor']
        ability = ['READ', 'WRITE']
        username = 'editor'
      }
      if ('test-accessToken' === accessToken) {
        roles = ['admin', 'editor']
        ability = ['READ']
        username = 'test'
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          roles,
          ability,
          username,
          'avatar|1': [
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
          ],
        },
      }
    },
  },
  {
    url: '/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
