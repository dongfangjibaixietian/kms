import request from './index'

export function libList(data) {
  return request({
    url: '/kms/api/lib/list',
    method: 'GET',
    params: data,
  })
}

export function libCreate(data) {
  return request({
    url: '/kms/api/lib/create',
    method: 'POST',
    data,
  })
}
