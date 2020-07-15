/*
 * @Author       : charm
 * @Date         : 2020-07-02 10:53:19
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-08 14:37:23
 * @FilePath     : \gworld-pc-share\src\api\article.js
 */

import request from './index'

export function createArticle(data) {
  return request({
    url: '/kms/api/article/new',
    method: 'POST',
    data,
  })
}

export function articleList(data) {
  return request({
    url: '/kms/api/article/list',
    method: 'GET',
    params: data,
  })
}

export function articleDetail(data) {
  return request({
    url: '/kms/api/article/detail',
    method: 'GET',
    params: data,
  })
}

export function articleTop(data) {
  return request({
    url: '/kms/api/article/top',
    method: 'GET',
    data,
  })
}

export function articleCollect(data) {
  return request({
    url: '/kms/api/article/collect',
    method: 'POST',
    data,
  })
}

export function articleCollectList(data) {
  return request({
    url: '/kms/api/article/collectList',
    method: 'GET',
    params: data,
  })
}
