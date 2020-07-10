import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Button, List, Avatar, Spin } from 'antd'

import style from './index.scss'
import NewSource from './../Newsource'
// import { hasPrefixSuffix } from 'antd/lib/input/ClearableLabeledInput'

const Left = () => {
  const locale = {
    emptyText: '暂无数据',
  }
  const initialState = {
    pageIndex: 1,
    pageSize: 10,
  }

  //点击网盘跳转详情
  // const tohref = (item) => {
  //   window.open(window.location + `article/detail?id=${item.id}`)
  // }

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

  const _handleScroll = useCallback(
    (event) => {
      const height = scrollEvent(event)
      console.log('hasMore', hasMore)
      console.log('isloading_hasMore', isLoading)
      if (!isLoading && height <= 20 && hasMore) {
        const pageIndex = state.pageIndex + 1
        dispatch({
          type: 'update',
          payload: {
            pageIndex,
          },
        })
      }
    },
    [hasMore, state.pageIndex]
  )

  const getList = async () => {
    console.log(isLoading, 'isloading')
    console.log(hasMore, 'hasMore_isloading')
    if (isLoading || !hasMore) return
    setLoading(true)

    const res = await articleList({
      searchKey: '',
      ...state,
      isEssence: false,
      isHot: false,
    })

    if (!hasMore || res.data.list.length < 10) {
      setHasMore(false)
    }
    res.data.list.forEach((item) => {
      item.tags = item.tags || []
    })
    setList(() => {
      return [...dataList, ...res.data.list]
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    return () => window.removeEventListener('scroll', _handleScroll)
  }, [_handleScroll])

  useEffect(() => {
    getList().then(() => {
      setLoading(false)
    })
  }, [state.pageIndex])

  //列表数据
  const dataone = [
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
    {
      title: '超G名片APP特点',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '超G名片APP特点',
    },
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
  ]

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
          <List
            itemLayout="horizontal"
            locale={locale}
            dataSource={dataone}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="/src/assets/img/file.png" className={style.fl} />}
                  title={<a onClick={() => window.open(window.location.origin + `/online/hard`)}>{item.title}</a>}
                  description="2020-05-20"
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className={style.spinBox}>
        {hasMore ? (
          <Spin tip="正在加载" className={style.spin} spinning={hasMore} />
        ) : dataList.length > 0 ? (
          <div>没有更多了</div>
        ) : null}
      </div>
      {publishModalVisible && (
        <NewSource triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default Left
