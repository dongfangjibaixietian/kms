/*
 * @Author       : charm
 * @Date         : 2020-07-02 10:53:19
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-16 18:38:10
 * @FilePath     : \gworld-pc-share\src\api\index.js
 */

import { Request } from '@gworld/toolset'
import { getItem, removeItem } from '@/utils/storage'
import { useRootStore } from '@/utils/customHooks'
import { message } from 'antd'

const service = new Request({
  namespace: 'gworld-kms',
  partBase(pageURL, uri) {
    console.log('接口路径partBase', uri)

    if (pageURL.includes('gworld.net')) {
      return 'https://apis.gworld.net'
    }

    return 'http://kms.api.gworld-inc.com'
  },
  partHeaders(uri) {
    console.log('接口路径partHeaders', uri)

    return {
      Authorization: getItem('token') ? `Bearer ${getItem('token')}` : '',
    }
  },
  handleAccessDenied: {
    statusCode: [401],
    handler(code) {
      const { setLoginState } = useRootStore().userStore
      switch (code) {
        case 401:
          message.error('登录过期，请重新登录')
          removeItem('token')
          removeItem('user')
          removeItem('article')
          removeItem('type')
          setLoginState(false)
          break
        case 422:
          message.error('接口参数错误')
          break
      }
    },
  },
  handleResponseError: {
    codeIgnore: [],
    handler(code, msg) {
      console.log(msg)
      message.error(msg + ':' + code)
    },
  },
})

export default service.getInstance()
