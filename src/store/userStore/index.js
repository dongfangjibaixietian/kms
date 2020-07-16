/*
 * @Author       : charm
 * @Date         : 2020-06-28 16:15:01
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-16 13:36:14
 * @FilePath     : \gworld-pc-share\src\store\userStore\index.js
 */

import { observable, action } from 'mobx'

export class UserStore {
  @observable userInfo = null

  @observable searchKey = null

  //控制登录状态显示
  @observable isLogin = false

  //控制登录注册弹框
  @observable modelVisible = false

  //控制登录还是注册 1:登录 2：注册
  @observable modelType = 1

  @action.bound
  setUserInfo(data) {
    this.userInfo = data
  }

  @action.bound
  setSearchKey(data) {
    this.searchKey = data
  }

  @action.bound
  setModelVisible(data) {
    this.modelVisible = data
  }

  @action.bound
  setModelType(data) {
    this.modelType = data
  }

  @action.bound
  setLoginState(data) {
    this.isLogin = data
  }
}

export default new UserStore()
