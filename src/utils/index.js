/*
 * @Author       : charm
 * @Date         : 2020-06-28 16:15:01
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-18 16:42:43
 * @FilePath     : \gworld-pc-share\src\utils\index.js
 */
import { getTimestamp } from '@gworld/toolset'
export const parseTagListToTree = (tagList) => {
  const list = []
  tagList.forEach((tag) => {
    if (tag.id === 0) {
      tag.children = []
      list.push(tag)
    }
  })
  tagList.forEach((tag) => {
    if (tag.parentId !== 0) {
      const targetTag = list.find((t) => t.id === tag.parentId)
      targetTag.children.push(tag)
    }
  })
  return list
}

// 获取url参数
export const getUrlSearch = (urlStr) => {
  let urlSearch
  if (typeof urlStr == 'undefined') {
    urlSearch = decodeURI(location.search) //获取url中"?"符后的字符串
  } else {
    urlSearch = '?' + urlStr.split('?')[1]
  }
  const theRequest = new Object()
  if (urlSearch.indexOf('?') != -1) {
    const str = urlSearch.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}

//转换时间格式
export const formateTime = (date) => {
  const jsonDate = new Date(date).toJSON()
  return new Date(new Date(jsonDate) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
}

// 随机生成文件名
export const randomNum = () => {
  let num = ''
  for (let i = 0; i < 4; i++) {
    num += Math.floor(Math.random() * 10)
  }
  num = getTimestamp() + num
  return num
}

//处理滚动相关数据
export const scrollEvent = (event) => {
  // 滚动的高度
  const scrollTop =
    (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
    window.pageYOffset ||
    (event.srcElement ? event.srcElement.body.scrollTop : 0)

  // 视窗高度
  const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight
  // 页面高度
  const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight
  // 距离页面底部的高度
  const height = scrollHeight - scrollTop - clientHeight
  return height
}

//文件size转为kb,Mb等等
export const sizeTostr = (size) => {
  let data = ''
  if (size < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    data = size.toFixed(2) + 'B'
  } else if (size < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    data = (size / 1024).toFixed(2) + 'KB'
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    data = (size / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    //其他转化成GB
    data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
  const sizestr = data + ''
  const len = sizestr.indexOf('.')
  const dec = sizestr.substr(len + 1, 2)
  if (dec == '00') {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}
