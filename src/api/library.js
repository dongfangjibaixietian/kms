import request from './index'

//知识库列表
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

//点进知识库之后的文件列表
export function libFileList(data) {
  return request({
    url: '/kms/api/lib/fileList',
    method: 'GET',
    params: data,
  })
}