import React, { useEffect, useState, useReducer, useCallback } from 'react'
import { Comment, Avatar, List, Menu, Dropdown, message, Modal } from 'antd'
import { articleDetail, articleCollect, removeArticle } from '@/api/article'
import { userFollow } from '@/api/user'
import { commentList as commentListApi, commentCreate } from '@/api/comment'
import { getUrlSearch } from '@/utils'
import { setItem } from '@/utils/storage'
import BraftEditor from 'braft-editor'
import { format } from '@gworld/toolset'
import { getItem } from '@/utils/storage'
import { useRootStore } from '@/utils/customHooks'
import { ContentUtils } from 'braft-utils'
import style from './index.scss'
import 'braft-editor/dist/output.css'
import 'braft-editor/dist/index.css'
import 'github-markdown-css'

let commentContent = ''
const ArticleDetails = ({ history }) => {
  const locale = {
    emptyText: '暂无评论',
  }
  const { setModelVisible, isLogin, userInfo } = useRootStore().userStore
  const [id, setArticleId] = useState('')
  // 是否已收藏
  const [isCollect, setCollectStatus] = useState(false)
  // 是否已点赞
  const [isLike, setLikeStatus] = useState(false)
  // 是否有文章操作权限
  const [isAllowed, setIsAllowed] = useState(false)
  // 文章点赞数
  const [likeCount, setLikeCount] = useState(0)
  // 是否已关注该用户
  const [isFollow, setFollow] = useState(false)
  // 是否还有更多评论
  const [hasMore, setHasMore] = useState(true)
  // 加载中
  const [isLoading, setLoading] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [detail, setArtcileDetail] = useState({
    title: '',
    content: '',
    createUser: {},
    tags: [],
  })
  // 回复其他用户
  const [commnetEditorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  // 评论文章
  const [topCommentState, setTopCommentState] = useState(BraftEditor.createEditorState(null))
  // 区分评论文章还是回复他人
  const [isTop, setIsTop] = useState(true)
  // 文章是否已删除
  const [isDel, setIsDel] = useState(false)
  const [parentId, setParentId] = useState('')
  const [targetUserId, setTargetUserId] = useState('')
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

  const [state, dispatch] = useReducer(reducer, initialState)

  const getCommentList = async () => {
    if (isLoading || !hasMore) return
    setLoading(true)
    try {
      // 获取评论列表
      const commentRes = await commentListApi({
        articleId: id,
        ...state,
      })
      if (!hasMore || commentRes.data.list.length < 10) {
        setHasMore(false)
      }
      setCommentList(() => {
        return [...commentList, ...commentRes.data.list]
      })
    } catch (error) {
      console.log(error)
    }
  }

  const refresh = () => {
    //需要处理的数据
    setHasMore(true)
    setLoading(false)
    dispatch({
      type: 'update',
      payload: {
        pageIndex: 1,
      },
    })
  }

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const pageIndex = state.pageIndex + 1
      dispatch({
        type: 'update',
        payload: {
          pageIndex,
        },
      })
    }
  }, [hasMore, state.pageIndex])

  const getArticleDetail = async () => {
    const res = await articleDetail({ id: id })
    if (res.data.type === 'usd') {
      const editorState = BraftEditor.createEditorState(res.data.rawContent)
      res.data.content = editorState.toHTML()
    }
    const result = Object.assign({}, detail, res.data)
    setArtcileDetail(result)
    setCollectStatus(result.isCollect)
    setLikeStatus(result.isLike)
    setLikeCount(result.likeCount)
    setFollow(result.isFollow)
    // if (res.code === 0) getCommentList()
  }

  const menuList = [
    {
      name: '编辑文章',
      type: 'edit',
    },
    {
      name: '删除文章',
      type: 'del',
    },
    // {
    //   name: '置顶文章',
    //   type: 'stick',
    // },
    // {
    //   name: '取消置顶',
    //   type: 'cancelStick',
    // },
    // {
    //   name: '设置为精华文章',
    //   type: 'essence',
    // },
    // {
    //   name: '取消精华',
    //   type: 'cancelEssence',
    // },
    // {
    //   name: '设为热门',
    //   type: 'toHot',
    // },
    // {
    //   name: '取消热门',
    //   type: 'cancelHot',
    // },
    // {
    //   name: '屏蔽作者',
    //   type: 'mask',
    // },
  ]

  const addComment = async () => {
    try {
      // 新增评论
      if (topCommentState.isEmpty() && !commentContent) return
      if (!getItem('token') || !isLogin) {
        message.error('请先登录')
        setModelVisible(true)
        return
      }
      const postData = {
        articleId: id,
        content: isTop ? topCommentState.toHTML() : commentContent.toHTML(),
        rawContent: isTop ? topCommentState.toRAW() : commentContent.toRAW(),
      }
      if (!isTop) {
        postData['parentId'] = parentId
        postData['targetUserId'] = targetUserId
      }
      const creatRes = await commentCreate(postData)
      if (creatRes.code === 0) {
        if (!isTop) {
          setEditorState(ContentUtils.clear(commnetEditorState))
        } else {
          setTopCommentState(ContentUtils.clear(topCommentState))
        }
      }
      setCommentList([])
      refresh()
    } catch (error) {
      console.log(error)
    }
  }

  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: (
        <div className="fuwenben-publish-btn" onClick={addComment}>
          评论
        </div>
      ),
    },
  ]

  // 需要展示的富文本按钮
  const controls = ['emoji']

  const replyComment = (currenItem, parentId) => {
    setEditorState(BraftEditor.createEditorState(null))
    const hasChildren = currenItem.children || ''
    let copyList = []
    if (hasChildren) {
      copyList = commentList.map((temp) =>
        temp.id === currenItem.id ? { ...temp, isComment: !temp.isComment } : { ...temp, isComment: false }
      )
    } else {
      copyList = commentList.map((item) => {
        if (item.id === parentId) {
          item.children = item.children.map((temp) =>
            temp.id === currenItem.id ? { ...temp, isComment: !temp.isComment } : { ...temp, isComment: false }
          )
        }
        return item
      })
    }
    currenItem.user && setTargetUserId(currenItem.user.id)
    setParentId(parentId)
    setCommentList(copyList)
  }

  const changeComment = (val) => {
    setIsTop(false)
    commentContent = val
  }

  const changeTopComment = (val) => {
    setIsTop(true)
    setTopCommentState(val)
  }

  const CommentTemplate = ({ item, parentId, children }) => {
    const contentHtml = item.targetUser
      ? `回复 <span class=${style.targerName}>${item.targetUser.username}:</span>${item.content}`
      : item.content

    return (
      <Comment
        className={style.commentItem}
        actions={[
          <div
            key="comment-list-reply-to-0"
            className={style.reply}
            onClick={() => {
              replyComment(item, parentId)
            }}
          >
            <img width="16" src={require('@/assets/img/reply.png').default} alt="" /> 回复
          </div>,
        ]}
        author={<a>{item.user ? item.user.username : '昵称'}</a>}
        avatar={<Avatar src={item.user ? item.user.avatar : ''} />}
        content={
          <div
            className={`${item.targetUser ? style.hasTarget : null} braft-output-content`}
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          ></div>
        }
        datetime={<span>{format(item.createTime, 'YYYY-MM-DD HH:mm:ss')}</span>}
      >
        {item.isComment ? (
          <div className={style.editorWrapper}>
            <BraftEditor
              extendControls={extendControls}
              controls={controls}
              value={commnetEditorState}
              onChange={changeComment}
            />
          </div>
        ) : null}

        {children}
      </Comment>
    )
  }

  // 进入文章编辑页面
  const goToEditArticle = () => {
    setItem('type', detail.type)
    const data = {
      id: id,
    }
    history.push({ pathname: '/publish/editor', data })
  }

  const { confirm } = Modal
  //删除文章

  const remove = async () => {
    const res = await removeArticle({ id: id })
    if (res.code === 0) {
      message.info('删除成功')
      setIsDel(true)
    }
  }

  const delArticle = () => {
    confirm({
      content: '是否删除该文章',
      okText: '确认',
      cancelText: '取消',
      icon: '',
      onOk() {
        remove()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const menuHandleClick = ({ key }) => {
    switch (key) {
      case 'edit':
        goToEditArticle()
        break
      case 'del':
        delArticle()
        break
      default:
        message.info('敬请期待')
        break
    }
  }

  const menu = (
    <Menu className={style.menu} onClick={menuHandleClick}>
      {menuList.map((item) => (
        <Menu.Item className={style.item} key={item.type}>
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  )

  // 收藏或点赞文章
  const collectArticle = async (type) => {
    if (!getItem('token') || !isLogin) {
      message.error('请先登录')
      setModelVisible(true)
      return
    }
    const isCancel = type === 'collect' ? isCollect : isLike
    const res = await articleCollect({ id: id, isCancel: isCancel, type: type })
    if (res.code !== 0) return
    if (type === 'collect') {
      setCollectStatus(!isCollect)
    } else {
      let currentLikeCount = 0
      if (isLike) {
        currentLikeCount = likeCount - 1
      } else {
        currentLikeCount = likeCount + 1
      }
      setLikeCount(currentLikeCount)
      setLikeStatus(!isLike)
    }
  }

  // 关注用户
  const followUser = async () => {
    if (!getItem('token') || !isLogin) {
      message.error('请先登录')
      setModelVisible(true)
      return
    }
    const res = await userFollow({ id: detail.createUser.id, isCancel: isFollow })
    if (res.code === 0) {
      setFollow(!isFollow)
    }
  }

  useEffect(() => {
    if (window.location.search) {
      const searchInfo = getUrlSearch(window.location.search)
      sessionStorage.setItem('detailId', searchInfo.id)
      setArticleId(searchInfo.id)
    } else {
      setArticleId(sessionStorage.getItem('detailId'))
    }
  }, [])

  useEffect(() => {
    if (!isLogin) setIsAllowed(false)
    if (id) {
      getArticleDetail()
      getCommentList().then(() => {
        setLoading(false)
      })
    }
  }, [id, isLogin])

  useEffect(() => {
    if (id) {
      getCommentList().then(() => {
        setLoading(false)
      })
    }
  }, [state.pageIndex, hasMore])

  useEffect(() => {
    if (!isLogin || !userInfo) return
    const hasAuth = detail.createUser.id === userInfo.user.id
    setIsAllowed(hasAuth)
  }, [userInfo, detail.createUser])

  return (
    <div>
      {isDel ? (
        <div className={style.delContent}>该文章已被删除</div>
      ) : (
        <div className={style.articleDetails}>
          <div className={style.articleArea}>
            <div className={style.main}>
              <div className={style.titleInfo}>
                <div className={style.more}>
                  {isAllowed && isLogin ? (
                    <Dropdown overlay={menu} trigger={['hover']} placement="bottomCenter">
                      <img
                        style={{ cursor: 'pointer' }}
                        width={16}
                        src={require('@/assets/img/more.png').default}
                        alt=""
                      />
                    </Dropdown>
                  ) : null}
                </div>
                <div className={style.title}>
                  {detail.title}
                  <img className={style.tag} width={16} src={require('@/assets/img/hot.png').default} alt="" />
                  <img className={style.tag} width={16} src={require('@/assets/img/essence.png').default} alt="" />
                  <img className={style.tag} width={16} src={require('@/assets/img/Stick.png').default} alt="" />
                </div>
                <div className={style.otherInfo}>
                  <div className={style.left}>
                    <span className={style.author}>{detail.createUser.username}</span>
                    <span className={style.number}>创建于</span>
                    <span className={style.text}>{format(detail.updateTime, 'YYYY-MM-DD HH:mm:ss')}</span>
                    <span className={style.number}>{detail.viewCount}</span>
                    <span className={style.text}>浏览</span>
                  </div>
                  {!isAllowed ? (
                    <div className={style.left}>
                      <div onClick={() => collectArticle('collect')}>
                        <img
                          className={style.img}
                          width={16}
                          src={require('@/assets/img/collect.png').default}
                          alt=""
                        />
                        <span>{isCollect ? '取消收藏' : '收藏'}</span>
                      </div>
                      <div>
                        <img className={style.img} width={16} src={require('@/assets/img/remark.png').default} alt="" />
                        <span>举报</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {detail.type === 'usd' ? (
                <div
                  className={`braft-output-content ${style.content}`}
                  dangerouslySetInnerHTML={{ __html: detail.content }}
                ></div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: detail.content }}
                  className={`markdown-body ${style.content}`}
                />
              )}

              <div className={style.likeShare}>
                <div className={style.like} onClick={() => collectArticle('like')}>
                  <img className={style.tag} width={16} src={require('@/assets/img/like.png').default} alt="" />
                  {isLike ? '已点赞' : '点赞'}
                  {likeCount ? `(${likeCount})` : ''}
                </div>
                {/* <div className={style.share}>
                  <img className={style.tag} width={16} src={require('@/assets/img/share.png').default} alt="" />
                  分享
                </div> */}
              </div>
            </div>
            <div className={style.editorWrapper}>
              <BraftEditor
                extendControls={extendControls}
                controls={controls}
                value={topCommentState}
                onChange={changeTopComment}
              />
            </div>
            <div className={style.commentArea}>
              <List
                locale={locale}
                header={`${commentList.length} 个评论`}
                className={style.commentList}
                itemLayout="horizontal"
                dataSource={commentList}
                renderItem={(item) => (
                  <List.Item>
                    <CommentTemplate item={item} parentId={item.id}>
                      {item.children.length > 0
                        ? item.children.map((subItem) => (
                            <CommentTemplate key={subItem.id} item={subItem} parentId={item.id}></CommentTemplate>
                          ))
                        : null}
                    </CommentTemplate>
                  </List.Item>
                )}
              />
              {hasMore ? (
                <div className={style.moreComment} onClick={loadMore}>
                  {isLoading ? '加载中...' : '查看更多 >'}
                </div>
              ) : null}
            </div>
          </div>

          <div className={style.articleRelated}>
            <div className={style.authorInfo}>
              <div className={style.authTitle}>作者信息</div>
              <div className={`${style.authInfo} ${!isAllowed ? null : style.personal}`}>
                <Avatar size="small" className={style.avatarImg} src={detail.createUser.avatar} />
                <div className={style.authorAbout}>
                  <div>{detail.createUser.username}</div>
                  {!isAllowed ? (
                    <div className={style.buttonGroup}>
                      <span className={`${style.attention} ${isFollow ? style.followed : null}`} onClick={followUser}>
                        {isFollow ? '取消关注' : '关注'}
                      </span>
                      {/* <span className={style.private}>私信</span> */}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={style.item}>
              <div className={style.authTitle}>文档标签</div>
              <div className={style.categoryDetails}>
                {detail.tags.map((tag) => (
                  <div key={tag.id} className={style.tagItem}>
                    {tag.content}
                  </div>
                ))}
              </div>
            </div>
            <div className={style.item}>
              <div className={style.authTitle}>相关文档</div>
              <div className={style.docList}>
                {/* <div>万字长文，详解企业的线上运营策略MVP设计</div>
                <div>万字长文，详解企业的线上运营策略MVP设计</div>
                <div>万字长文，详解企业的线上运营策略MVP设计</div>
                <div>万字长文，详解企业的线上运营策略MVP设计</div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={style.copyright}>
        Gworld（平潭）互联网科技有限公司 Copyright © 2012-2020 Gworld All Rights Reserved
      </div>
    </div>
  )
}

export default ArticleDetails
