/*
 * @Author       : charm
 * @Date         : 2020-07-02 10:53:19
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-04 13:46:45
 * @FilePath     : \gworld-pc-share\src\api\index.js
 */

import { Request } from '@gworld/toolset'
import { getToken, removeToken } from '@/utils/storage'

const service = new Request({
  namespace: 'gworld-kms',
  partBase(pageURL, uri) {
    console.log('页面路由', pageURL)
    console.log('接口路径partBase', uri)

    return 'http://kms.api.gworld-inc.com'
  },
  partHeaders(uri) {
    console.log('接口路径partHeaders', uri)
    console.log('getToken', getToken())

    return {
      Authorization: `Bearer ${getToken()}`,
    }
  },
  handleAccessDenied: {
    statusCode: [401],
    handler(code) {
      switch (code) {
        case 401:
          console.log('登录过期，请重新登录')
          removeToken()
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
