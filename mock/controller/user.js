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
      const { username } = config.body
      const accessToken = accessTokens[username]
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken },
      }
    },
  },
  // 修改密码
  {
    url: '/updatePassword',
    type: 'post',
    response(config) {
      const { pass, checkPass } = config.body

      if (!pass || !checkPass) {
        return {
          code: 500,
          msg: '密码不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { pass },
      }
    },
  },
  // 清空照片
  {
    url: '/deletephotos',
    type: 'post',
    response(config) {
      if (!config) {
        return {
          code: 500,
          msg: '参数错误',
        }
      }
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
  // 日出日落时间提交
  {
    url: '/daynighttime',
    type: 'post',
    response(config) {
      const { Sunrise, Sunset } = config.body

      if (!Sunrise || !Sunset) {
        return {
          code: 500,
          msg: '参数不正确',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          Sunrise,
          Sunset,
        },
      }
    },
  },
  // 基于日出日落开启
  {
    url: '/autoswitch',
    type: 'post',
    response(config) {
      // const { Sunrise, Sunset } = config.body
      const { data } = config.body
      if (!data) {
        return {
          code: 500,
          msg: '参数不正确',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data,
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
