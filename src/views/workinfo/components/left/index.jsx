import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, List, Avatar, Spin, message } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import NewSource from './../Newsource'
import { format } from '@gworld/toolset'
import { libList } from '@/api/library'
import { useRootStore } from '@/utils/customHooks'

import style from './index.scss'

const Left = ({ userId, isSelf }) => {
  const locale = {
    emptyText: '暂无数据',
  }
  const initialState = {
    pageIndex: 1,
    pageSize: 10,
  }
  const toLineHardDetails = (item) => {
    // const data = {
    //   id: item.id,
    // }
    // history.push({ pathname: '/online/hard', data })
    if (!isSelf) {
      message.info('请先申请权限！')
      return
    }
    window.location.href = window.location.origin + `/online/hard?hardId=${item.id}`
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
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

  const handleInfiniteOnLoad = useCallback(() => {
    setLoading(true)
    const pageIndex = state.pageIndex + 1
    dispatch({
      type: 'update',
      payload: {
        pageIndex,
      },
    })
  }, [hasMore, state.pageIndex, isLoading])

  const refresh = () => {
    //需要处理的数据
    console.log('更新')
    setHasMore(true)
    setLoading(false)
    setList([])
    dispatch({
      type: 'update',
      payload: {
        pageIndex: 1,
      },
    })
  }

  const getList = async () => {
    console.log(hasMore, '更多')
    if (!hasMore) return

    const res = await libList({
      ...state,
      userId: userId,
    })

    if (!hasMore || res.data.list.length < 10) {
      setHasMore(false)
    }
    setList(() => {
      return [...dataList, ...res.data.list]
    })
  }

  useEffect(() => {
    console.log(userId)
    if (!userId) return
    getList().then(() => {
      setLoading(false)
    })
  }, [state.pageIndex, userId])

  return (
    <div className={style.left}>
      <div className={style.butt}>
        <div className={style.content}>资源知识库</div>
        {isSelf ? (
          <Button onClick={() => triggerShowPublishModal(true)} type="primary" className={style.publishBtn}>
            新建知识库
          </Button>
        ) : null}
      </div>
      <div className={style.box}>
        <div className={style.list}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={20}
            loadMore={handleInfiniteOnLoad}
            hasMore={!isLoading && hasMore}
            useWindow={false}
          >
            <List
              className={style.scrollList}
              itemLayout="horizontal"
              locale={locale}
              dataSource={dataList}
              renderItem={(item) => (
                <List.Item onClick={() => toLineHardDetails(item)} className={style.itemStyle}>
                  <Avatar size="small" className={style.fl} src={require('@/assets/img/file.png').default} />
                  <div className={style.knowledgeInfo}>
                    <div className={style.title}>{item.name}</div>
                    <div className={style.creatTime}>{format(item.createTime, 'YYYY-MM-DD')}</div>
                  </div>
                </List.Item>
              )}
            >
              <div className={style.spinBox}>
                {hasMore ? (
                  <Spin tip="正在加载" className={style.spin} spinning={hasMore} />
                ) : dataList.length > 0 ? (
                  <div>没有更多了</div>
                ) : null}
              </div>
            </List>
          </InfiniteScroll>
          {/* <List
            className={style.scrollList}
            itemLayout="horizontal"
            locale={locale}
            dataSource={dataList}
            renderItem={(item) => (
              <List.Item onClick={() => toLineHardDetails(item)} className={style.itemStyle}>
                <Avatar size="small" className={style.fl} src={require('@/assets/img/file.png').default} />
                <div className={style.knowledgeInfo}>
                  <div className={style.title}>{item.name}</div>
                  <div className={style.creatTime}>{format(item.createTime, 'YYYY-MM-DD')}</div>
                </div>
              </List.Item>
            )}
          /> */}
        </div>
      </div>
      {publishModalVisible && (
        <NewSource change={refresh} triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default Left
