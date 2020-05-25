import { observable, action } from 'mobx'
import jwtDecode from 'jwt-decode'

export class TestStore {
  @observable
  userInfo = null

  @action
  setUserInfo = (token) => {
    localStorage.setItem('token', token)
    const user = jwtDecode(token)
    console.log(user)
    this.userInfo = user
  }
}

export default new TestStore()
