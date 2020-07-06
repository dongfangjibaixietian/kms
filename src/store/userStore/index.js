/*
 * @Author       : charm
 * @Date         : 2020-06-28 16:15:01
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-04 11:07:47
 * @FilePath     : \gworld-pc-share\src\store\userStore\index.js
 */

import { observable, action } from 'mobx'

export class UserStore {
  @observable userInfo = null

  @action.bound
  setUserInfo(data) {
    console.log(data)
    this.userInfo = data
    console.log(this.userInfo)
  }
}

export default new UserStore()
