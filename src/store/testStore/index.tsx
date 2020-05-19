import { observable, action } from 'mobx'

export class TestStore {
    @observable
    testNum: number = 0

    @action
    setTestNum = (num: number) => {
        this.testNum = num
    }
}

export default new TestStore()
