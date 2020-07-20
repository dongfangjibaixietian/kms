import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { List, Avatar, Spin } from 'antd'
import style from './index.scss'
import { scrollEvent, formateTime } from '@/utils'
import { articleCollectList } from '@/api/article'
const MyCollect = ({ userId, isSelf }) => {
  const locale = {
    emptyText: '暂无数据',
  }

  const toArticleDetails = (item) => {
    window.open(window.location.origin + `/article/detail?id=${item.id}`)
  }

  const initialState = {
    pageIndex: 1,
    pageSize: 10,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
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
    },
    [hasMore, state.pageInde, isLoading]
  )

  const getList = async () => {
    if (!hasMore) return

    const res = await articleCollectList({
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

  const goToUserCenter = (item) => {
    window.open(window.location.origin + `/user/center?userId=${item.id}`)
  }

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    return () => window.removeEventListener('scroll', _handleScroll)
  }, [_handleScroll])

  useEffect(() => {
    if (!userId) return
    getList().then(() => {
      setLoading(false)
    })
  }, [state.pageIndex, hasMore, userId])

  return (
    <div className={style.ArticleList}>
      <List
        size="large"
        locale={locale}
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item
            className={`${style.itemStyle} ${item.poster ? style.hasImg : null}`}
            onClick={() => toArticleDetails(item)}
          >
            {item.poster ? <img width={180} height={120} src={item.poster} alt="" className={style.coverImg} /> : null}

            <div className={style.articleSummary}>
              <div className={style.title}>{item.title}</div>
              <div className={style.Description}>{item.content}</div>
              <div className={style.ArticleRelated}>
                <div className={style.left}>
                  <Avatar size="small" className={style.avatarImg} src={item.createUser.avatar} />
                  <span className={style.author} onClick={() => goToUserCenter(item.createUser)}>
                    {item.createUser.username}
                  </span>
                  <span className={style.text}>{formateTime(item.updateTime)}</span>
                  <img className={style.text} width={16} src={require('@/assets/img/read.png').default} alt="" />
                  {item.tags.map((tag) => (
                    <span key={tag.id} className={style.text}>
                      {tag.content}
                    </span>
                  ))}
                </div>
                {isSelf ? (
                  <div>
                    {/* <img className={style.img} width={16} src={require('@/assets/img/write.png').default} alt="" />
                  <span>编辑</span> */}
                    <img className={style.img} width={16} src={require('@/assets/img/delete.png').default} alt="" />
                    {/* <span>删除</span> */}
                  </div>
                ) : null}
              </div>
            </div>
          </List.Item>
        )}
      />
      <div className={style.spinBox}>
        {hasMore ? (
          <Spin tip="正在加载" className={style.spin} spinning={hasMore} />
        ) : dataList.length > 0 ? (
          <div>没有更多了</div>
        ) : null}
      </div>
    </div>
  )
}

export default MyCollect
