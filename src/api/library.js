/*
 * @Author       : charm
 * @Date         : 2020-07-15 10:12:10
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-20 20:00:07
 * @FilePath     : \gworld-pc-share\src\api\library.js
 */

import request, { getBaseUrl } from './index'
import { getItem } from '@/utils/storage'

//知识库列表
export function libList(data) {
  return request({
    url: '/kms/api/lib/list',
    method: 'GET',
    params: data,
  })
}

//新建知识库
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

//上传文件到知识库
export function upLoadLib(data) {
  return request({
    url: '/kms/api/lib/upload',
    method: 'POST',
    data,
  })
}

//知识库成员列表
export function memberList(data) {
  return request({
    url: '/kms/api/lib/member',
    method: 'GET',
    params: data,
  })
}

//下载文件
export function downloadFile(id) {
  return (
    getBaseUrl(location.href, '/kms/api/lib/download') + '/kms/api/lib/download?id=' + id + '&token=' + getItem('token')
  )
}
