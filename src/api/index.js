/*
 * @Author       : charm
 * @Date         : 2020-07-02 10:53:19
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-04 13:46:45
 * @FilePath     : \gworld-pc-share\src\api\index.js
 */

import { Request } from '@gworld/toolset'
import { getToken, removeToken } from '@/utils/storage'
import { message } from 'antd'

const service = new Request({
  namespace: 'gworld-kms',
  partBase(pageURL, uri) {
    console.log('页面路由', pageURL)
    console.log('接口路径partBase', uri)

    return 'http://kms.api.gworld-inc.com'
  },
  partHeaders(uri) {
    console.log('接口路径partHeaders', uri)

    return {
      Authorization: `Bearer ${getToken()}`,
    }
  },
  handleAccessDenied: {
    statusCode: [401],
    handler(code) {
      switch (code) {
        case 401:
          message.error('登录过期，请重新登录')
          removeToken()
          break
        case 422:
          message.error('接口参数错误')
          break
      }
    },
  },
  handleResponseError: {
    codeIgnore: [],
    handler(code, message) {
      message.error(message + ':' + code)
    },
  },
})

export default service.getInstance()
