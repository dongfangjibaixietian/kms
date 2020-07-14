/*
 * @Author       : charm
 * @Date         : 2020-07-14 16:40:05
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-14 18:44:52
 * @FilePath     : \gworld-pc-share\src\api\user.js
 */

import request from './index'

export function login(data) {
  return request({
    url: '/kms/api/user/login',
    method: 'POST',
    data,
  })
}

export function register(data) {
  return request({
    url: '/kms/api/user/create',
    method: 'POST',
    data,
  })
}

export function userInfo(data) {
  return request({
    url: '/kms/api/user/info',
    method: 'GET',
    data,
  })
}

//用户被点赞数，阅读数等信息
export function userOtherInfo(data) {
  return request({
    url: '/kms/api/user/otherInfo',
    method: 'GET',
    data,
  })
}

//用户被点赞数，阅读数等信息
export function userFollow(data) {
  return request({
    url: '/kms/api/user/follow',
    method: 'POST',
    data,
  })
}
