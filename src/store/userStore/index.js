/*
 * @Author       : charm
 * @Date         : 2020-06-28 16:15:01
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-09 11:05:41
 * @FilePath     : \gworld-pc-share\src\store\userStore\index.js
 */

import { observable, action } from 'mobx'

export class UserStore {
  @observable userInfo = null

  @observable searchKey = null

  @action.bound
  setUserInfo(data) {
    console.log(data)
    this.userInfo = data
    console.log(this.userInfo)
  }

  @action.bound
  setSearchKey(data) {
    console.log(data)
    this.searchKey = data
    console.log(this.searchKey)
  }
}

export default new UserStore()
