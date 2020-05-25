import http from './http'

export const creatUser = (data = {}) => {
  return http.post('user/create', data)
}

export const login = (data = {}) => {
  return http.post('user/login', data)
}

export const getTagList = (data = {}) => {
  return http.get('tag/list', data)
}
