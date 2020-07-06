/*
 * @Author       : charm
 * @Date         : 2020-07-02 10:53:19
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-02 20:11:12
 * @FilePath     : \gworld-pc-share\src\utils\storage.js
 */

const TOKEN_KEY = 'KMS_TOKEN'

export function setToken(data) {
  window.localStorage.setItem(TOKEN_KEY, data)
}

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
  return window.localStorage.removeItem(TOKEN_KEY)
}
