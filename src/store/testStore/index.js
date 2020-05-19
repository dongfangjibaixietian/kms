import { observable, action } from 'mobx'

export class TestStore {
  @observable
  testNum = 0

  @action
  setTestNum = (num) => {
    this.testNum = num
  }
}

export default new TestStore()
