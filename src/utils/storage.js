/*
 * @Author       : charm
 * @Date         : 2020-07-02 10:53:19
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-09 19:33:53
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
//token相关
// export function setToken(data) {
//   window.localStorage.setItem(TOKEN_KEY, data)
// }

// export function getToken() {
//   return window.localStorage.getItem(TOKEN_KEY)
// }

// export function removeToken() {
//   return window.localStorage.removeItem(TOKEN_KEY)
// }
// // 用户信息
// export function setUserInfo(data) {
//   console.log(data)
//   window.localStorage.setItem(USER_INFO, data)
// }

// export function getUserInfo() {
//   console.log(window.localStorage.getItem(USER_INFO))
//   return window.localStorage.getItem(USER_INFO)
// }

// export function removeUserInfo() {
//   return window.localStorage.removeItem(USER_INFO)
// }
// // 文章相关
// export function setArticle(data) {
//   console.log(data)
//   window.localStorage.setItem(ARTICLE_INFO, data)
// }

// export function getArticle() {
//   console.log(window.localStorage.getItem(ARTICLE_INFO))
//   return window.localStorage.getItem(ARTICLE_INFO)
// }

// export function removeArticle() {
//   return window.localStorage.removeItem(ARTICLE_INFO)
// }
