/*
 * @Author       : charm
 * @Date         : 2020-07-08 14:53:23
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-08 14:55:00
 * @FilePath     : \gworld-pc-share\src\api\comment.js
 */
import request from './index'

export function commentList(data) {
  return request({
    url: '/kms/api/comment/list',
    method: 'GET',
    params: data,
  })
}

export function commentCreate(data) {
  return request({
    url: '/kms/api/comment/create',
    method: 'POST',
    data,
  })
}
