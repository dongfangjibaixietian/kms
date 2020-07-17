import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, List, Avatar, Spin } from 'antd'

//结合这个插件实现滚动加载功能
// import InfiniteScroll from 'react-infinite-scroller'

import style from './index.scss'
import NewSource from './../Newsource'

import { formateTime } from '@/utils/index'
import { libList } from '@/api/library'
// import { useRootStore } from '@/utils/customHooks'
// import { hasPrefixSuffix } from 'antd/lib/input/ClearableLabeledInput'

const Left = () => {
  const locale = {
    emptyText: '暂无数据',
  }
  const initialState = {
    pageIndex: 1,
    pageSize: 10,
  }

  const toLineHardDetails = (item) => {
    window.open(window.location.origin + `/online/hard?id=${item.id}`)
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        console.log({ ...state, ...action.payload }, 'update_state')
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }

  const [publishModalVisible, setPublishModalVisible] = useState(false)
  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  // 加载中
  const [isLoading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [dataList, setList] = useState([])
  const [setLib] = useState([])

  // const _listScroll = () => {
  //   const listScroll = document.getElementsByClassName(style.list)[0]
  //   console.log(listScroll)
  //   console.log(1213213)
  //   const scrollTop = listScroll.scrollTop //页面上卷的高度
  //   console.log(scrollTop, '页面上卷的高度')
  //   const wholeHeight = listScroll.scrollHeight //页面底部到顶部的距离
  //   console.log(wholeHeight, '页面底部到顶部的距离')
  //   const divHeight = listScroll.clientHeight //页面可视区域的高度
  //   console.log(divHeight, '页面可视区域的高度')
  //   const height = wholeHeight - scrollTop - divHeight
  //   console.log(height, ' 距离页面底部的高度')
  //   setHeight(height)
  // }

  const _handleScroll = useCallback(() => {
    if (!isLoading && height <= 20 && hasMore) {
      const pageIndex = state.pageIndex + 1
      dispatch({
        type: 'update',
        payload: {
          pageIndex,
        },
      })
    }
  }, [hasMore, state.pageIndex])

  const getList = async () => {
    if (isLoading || !hasMore) return
    setLoading(true)

    const res = await libList({
      ...state,
    })

    if (!hasMore || res.data.list.length < 10) {
      setHasMore(false)
    }
    setList(() => {
      return [...dataList, ...res.data.list]
    })
  }

  // handleInfiniteOnLoad = () => {
  //   setLoading(true)
  //   if (data.length > 14) {
  //     message.warning('Infinite List loaded all')
  //     setLoading(false)
  //     setHasMore(false)

  //     // this.setState({
  //     //   hasMore: false,
  //     //   loading: false,
  //     // });
  //     return
  //   }

  //   getList()

  //   // this.fetchData(res => {
  //   //   data = data.concat(res.results);
  //   //   this.setState({
  //   //     data,
  //   //     loading: false,
  //   //   });
  //   // });
  // }

  // useEffect(() => {
  //   _handleScroll()
  // }, [_listScroll()])

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    return () => window.removeEventListener('scroll', _handleScroll)
  }, [_handleScroll])

  useEffect(() => {
    getList().then(() => {
      setLoading(false)
    })
  }, [state.pageIndex])

  // useEffect(() => {
  //   _listScroll()
  // }, [])

  //列表数据
  // const dataone = [
  //   {
  //     title: '公司美术常用设计规范',
  //   },
  //   {
  //     title: '直播“赞助礼物”资源库',
  //   },
  //   {
  //     title: '超G名片APP特点',
  //   },
  //   {
  //     title: '直播“赞助礼物”资源库',
  //   },
  //   {
  //     title: '公司美术常用设计规范',
  //   },
  //   {
  //     title: '直播“赞助礼物”资源库',
  //   },
  //   {
  //     title: '公司美术常用设计规范',
  //   },
  //   {
  //     title: '超G名片APP特点',
  //   },
  //   {
  //     title: '公司美术常用设计规范',
  //   },
  //   {
  //     title: '直播“赞助礼物”资源库',
  //   },
  // ]
  return (
    <div className={style.left}>
      <div className={style.butt}>
        <div className={style.content}>资源知识库</div>
        <Button onClick={() => triggerShowPublishModal(true)} type="primary" className={style.publishBtn}>
          新建知识库
        </Button>
      </div>
      <div className={style.box}>
        <div className={style.list}>
          {/* <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!isLoading && hasMore}
            useWindow={false}
          > */}
          <List
            className={style.scrollList}
            itemLayout="horizontal"
            locale={locale}
            dataSource={dataList}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="/src/assets/img/file.png" className={style.fl} />}
                  //后端传过来的是name，其实title更好
                  title={<a onClick={() => toLineHardDetails(item)}>{item.name}</a>}
                  description={formateTime(item.createTime)}
                />
              </List.Item>
            )}
          />
        </div>

        <div className={style.spinBox}>
          {hasMore ? (
            <Spin tip="正在加载" className={style.spin} spinning={hasMore} />
          ) : dataList.length > 0 ? (
            <div>没有更多了</div>
          ) : null}
        </div>
      </div>
      {publishModalVisible && (
        <NewSource change={setLib} triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default Left
