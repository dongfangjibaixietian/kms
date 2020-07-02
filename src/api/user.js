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
