/*
 * @Author       : charm
 * @Date         : 2020-07-02 10:53:19
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-14 15:31:35
 * @FilePath     : \gworld-pc-share\src\utils\storage.js
 */

const STORAGEList = {
  token: 'KMS_TOKEN',
  user: 'KMS_USER_INFO',
  article: 'KMS_ARTICLE_INFO',
  type: 'KMS_ARTICLE_TYPE',
}
export function setItem(type, data) {
  window.localStorage.setItem(STORAGEList[type], data)
}

export function getItem(type) {
  return window.localStorage.getItem(STORAGEList[type])
}

export function removeItem(type) {
  return window.localStorage.removeItem(STORAGEList[type])
}
