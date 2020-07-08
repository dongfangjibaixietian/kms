/*
 * @Author       : charm
 * @Date         : 2020-06-28 16:15:01
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-04 16:56:25
 * @FilePath     : \gworld-pc-share\src\utils\index.js
 */

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
  console.log(height, ' 距离页面底部的高度')
  return height
}
// 判断滚动方向
// export const scrollDirection = (event) => {
//   console.log(event)
//   const beforeScrollTop =
//     (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
//     window.pageYOffset ||
//     (event.srcElement ? event.srcElement.body.scrollTop : 0)
//   console.log(beforeScrollTop, 'beforeScrollTop')
//   let delta
//   window.addEventListener(
//     'scroll',
//     () => {
//       const afterScrollTop =
//         (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
//         window.pageYOffset ||
//         (event.srcElement ? event.srcElement.body.scrollTop : 0)
//       console.log(afterScrollTop, 'afterScrollTop')
//       delta = afterScrollTop - beforeScrollTop
//       if (delta === 0) return false
//       // callback(delta > 0 ? 'down' : 'up')
//       beforeScrollTop = afterScrollTop
//     },
//     false
//   )
//   return delta > 0 ? 'down' : 'up'
// }
