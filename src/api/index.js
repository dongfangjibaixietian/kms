import { Request } from '@gworld/toolset'
import { getToken } from '@/utils/storage'

const service = new Request({
  namespace: 'gworld-kms',
  partBase(pageURL, uri) {
    console.log('页面路由', pageURL)
    console.log('接口路径', uri)

    return 'http://localhost:7001'
  },
  partHeaders(uri) {
    console.log('接口路径', uri)

    return {
      Authorization: `Breaer ${getToken()}`,
    }
  },
  handleAccessDenied: {
    statusCode: [401],
    handler(code) {
      switch (code) {
        case 401:
          console.log('登录过期，请重新登录')
          break
      }
    },
  },
  handleResponseError: {
    codeIgnore: [],
    handler(code, message) {
      console.log('接口发生错误', code, message)
    },
  },
})

export default service.getInstance()
