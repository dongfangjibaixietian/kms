import { observable, action } from 'mobx'

export class TestStore {
  @observable
  articleBaseInfo = null

  @action
  setArticleBaseInfo = (articleBaseInfo) => {
    this.articleBaseInfo = articleBaseInfo
  }
}

export default new TestStore()
