import request from './index'

export function tagTree(data) {
  return request({
    url: '/kms/api/tag/tree',
    method: 'GET',
    data,
  })
}
