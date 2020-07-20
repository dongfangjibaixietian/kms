import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, List, Avatar, Spin, message } from 'antd'

//结合这个插件实现滚动加载功能
// import InfiniteScroll from 'react-infinite-scroller'
import style from './index.scss'
import NewSource from './../Newsource'

import { format } from '@gworld/toolset'
import { libList } from '@/api/library'
import { useRootStore } from '@/utils/customHooks'
// import { hasPrefixSuffix } from 'antd/lib/input/ClearableLabeledInput'

const Left = ({ userId, isSelf }) => {
  const locale = {
    emptyText: '暂无数据',
  }
  const initialState = {
    pageIndex: 1,
    pageSize: 20,
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

    // window.open(window.location.origin + `/online/hard?id=${item.id}`)
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }

  const { isLogin, userInfo } = useRootStore().userStore
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

  const [lib, setLib] = useState([])

  const _handleScroll = useCallback(() => {
    if (!isLoading && height <= 20 && hasMore) {
      setLoading(true)
      const pageIndex = state.pageIndex + 1
      dispatch({
        type: 'update',
        payload: {
          pageIndex,
        },
      })
    }
  }, [hasMore, state.pageIndex, isLoading])

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

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    return () => window.removeEventListener('scroll', _handleScroll)
  }, [_handleScroll])

  useEffect(() => {
    if (!userId) return
    getList().then(() => {
      setLoading(false)
    })
  }, [state.pageIndex, isLogin, userId])

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
        {isSelf ? (
          <Button onClick={() => triggerShowPublishModal(true)} type="primary" className={style.publishBtn}>
            新建知识库
          </Button>
        ) : null}
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
              <List.Item onClick={() => toLineHardDetails(item)} className={style.itemStyle}>
                {/* <List.Item.Meta
                  avatar={<Avatar src="/src/assets/img/file.png" className={style.fl} />}
                  //后端传过来的是name，其实title更好
                  title={<a>{item.name}</a>}
                  description={formateTime(item.createTime)}
                /> */}
                <Avatar size="small" className={style.fl} src={require('@/assets/img/file.png').default} />
                <div className={style.knowledgeInfo}>
                  <div className={style.title}>{item.name}</div>
                  <div className={style.creatTime}>{format(item.createTime, 'YYYY-MM-DD')}</div>
                </div>
              </List.Item>
            )}
          />
        </div>

        {/* <div className={style.spinBox}>
          {hasMore ? (
            <Spin tip="正在加载" className={style.spin} spinning={hasMore} />
          ) : dataList.length > 0 ? (
            <div>没有更多了</div>
          ) : null}
        </div> */}
      </div>
      {publishModalVisible && (
        <NewSource change={setLib} triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default Left
