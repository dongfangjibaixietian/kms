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
    data,
  })
}

export function articleDetail(data) {
  return request({
    url: '/kms/api/article/detail',
    method: 'GET',
    data,
  })
}

export function articleTop(data) {
  return request({
    url: '/kms/api/article/top',
    method: 'GET',
    data,
  })
}
