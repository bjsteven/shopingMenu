module.exports = [
  {
    url: '/photolisting',
    type: 'post',
    response(config) {
      const { page } = config.body
      if (!page) {
        return {
          code: 500,
          msg: '不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          status: 'succ',
          totalpage: 100,
          totalphoto: 2000,
          items: [
            {
              id: 111,
              name: '照片名称1',
              time: '2018-12-1',
              src: 'http://via.placeholder.com/350x150',
            },
            {
              id: 333,
              name: '照片名称2',
              time: '2018-12-2',
              src: 'http://via.placeholder.com/350x100',
            },
            {
              id: 444,
              name: '照片名称1',
              time: '2018-12-1',
              src: 'http://via.placeholder.com/350x150',
            },
            {
              id: 555,
              name: '照片名称2',
              time: '2018-12-2',
              src: 'http://via.placeholder.com/350x100',
            },
            {
              id: 666,
              name: '照片名称2',
              time: '2018-12-2',
              src: 'http://via.placeholder.com/350x100',
            },
            {
              id: 777,
              name: '照片名称1',
              time: '2018-12-1',
              src: 'http://via.placeholder.com/350x150',
            },
            {
              id: 888,
              name: '照片名称2',
              time: '2018-12-2',
              src: 'http://via.placeholder.com/350x100',
            },
          ],
        },
      }
    },
  },
]
