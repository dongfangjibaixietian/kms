import React, { useEffect, useState, useCallback, useReducer, useRef, forwardRef, useImperativeHandle } from 'react'
import { List, Avatar, Spin } from 'antd'
import style from './index.scss'
import { format } from '@gworld/toolset'
import { scrollEvent } from '@/utils/index'
import { articleList } from '@/api/article'
import { useRootStore } from '@/utils/customHooks'

const ArticleList = forwardRef((props, ref) => {
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
  const { searchKey } = useRootStore().userStore

  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  const [notRefresh] = useState(props.notRefresh)
  // 加载中
  const [isLoading, setLoading] = useState(false)
  const [dataList, setList] = useState([])
  const childRef = useRef()

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useImperativeHandle(ref, () => ({
    refresh: () => {
      //需要处理的数据
      setHasMore(true)
      setLoading(false)
      setList([])
      dispatch({
        type: 'update',
        payload: {
          pageIndex: 1,
        },
      })
    },
  }))

  const _handleScroll = useCallback(
    (event) => {
      const height = scrollEvent(event)
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
    if (isLoading || !hasMore) return
    setLoading(true)

    const res = await articleList({
      searchKey: '',
      ...state,
      isEssence: props.isEssence,
      isHot: props.isHot,
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
    if (!notRefresh) {
      getList().then(() => {
        setLoading(false)
      })
    }
  }, [state.pageIndex, props.isEssence, props.isHot, hasMore, searchKey, notRefresh])

  return (
    <div className={style.articleList} ref={childRef}>
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
              <div className={style.description}>{item.content}</div>
              <div className={style.articleRelated}>
                <div className={style.left}>
                  <Avatar size="small" className={style.avatarImg} src={item.createUser.avatar} />
                  <span className={style.author}>{item.createUser.username}</span>
                  <span className={style.text}>{format(item.updateTime, 'YYYY-MM-DD HH:mm:ss')}</span>
                  <img className={style.text} width={16} src={require('@/assets/img/read.png').default} alt="" />
                  {item.tags.map((tag) => (
                    <span key={tag.id} className={style.text}>
                      {tag.content}
                    </span>
                  ))}
                </div>
                <div>
                  <img className={style.img} width={16} src={require('@/assets/img/read.png').default} alt="" />
                  <span>{item.viewCount}</span>
                  <img className={style.img} width={16} src={require('@/assets/img/remark.png').default} alt="" />
                  <span>{item.commentCount}</span>
                </div>
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
})

export default ArticleList
