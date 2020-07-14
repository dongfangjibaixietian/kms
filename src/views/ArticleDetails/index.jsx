import React, { useEffect, useState } from 'react'
import { Comment, Avatar, List, Menu, Dropdown, message } from 'antd'
import { articleDetail, articleCollect } from '@/api/article'
import { userFollow } from '@/api/user'
import { commentList as commentListApi, commentCreate } from '@/api/comment'
import { getUrlSearch, formateTime } from '@/utils'
import { setItem } from '@/utils/storage'
import BraftEditor from 'braft-editor'
import { format } from '@gworld/toolset'
import { getItem } from '@/utils/storage'
import { useRootStore } from '@/utils/customHooks'
import { ContentUtils } from 'braft-utils'
import style from './index.scss'
import 'braft-editor/dist/output.css'
import 'braft-editor/dist/index.css'

let commentContent = ''
const ArticleDetails = ({ history }) => {
  const { setModelVisible, isLogin } = useRootStore().userStore
  const [id, setArtcileId] = useState('')
  const [isCancel, setCollectStatus] = useState(false)
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
  const [parentId, setParentId] = useState('')
  const [targetUserId, setTargetUserId] = useState('')

  const getCommentList = async () => {
    try {
      // 获取评论列表
      const commentRes = await commentListApi({
        articleId: id,
        pageIndex: 1,
        pageSize: 20,
      })
      console.log(commentRes.data.list)
      setCommentList(commentRes.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const getArticleDetail = async () => {
    console.log(id)
    const res = await articleDetail({ id: id })
    const editorState = BraftEditor.createEditorState(res.data.rawContent)
    res.data.content = editorState.toHTML()
    console.log(res.data)

    const result = Object.assign({}, detail, res.data)
    setArtcileDetail(result)

    if (res.code === 0) getCommentList()
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
    {
      name: '置顶文章',
      type: 'stick',
    },
    {
      name: '取消置顶',
      type: 'cancelStick',
    },
    {
      name: '设置为精华文章',
      type: 'essence',
    },
    {
      name: '取消精华',
      type: 'cancelEssence',
    },
    {
      name: '设为热门',
      type: 'toHot',
    },
    {
      name: '取消热门',
      type: 'cancelHot',
    },
    {
      name: '屏蔽作者',
      type: 'mask',
    },
  ]

  const addComment = async () => {
    try {
      // 新增评论
      console.log(topCommentState.toHTML())
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
      console.log(postData)
      const creatRes = await commentCreate(postData)
      console.log(creatRes)
      if (!isTop) {
        setEditorState(ContentUtils.clear(commnetEditorState))
      } else {
        setTopCommentState(ContentUtils.clear(topCommentState))
      }
      getCommentList()
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
    console.log(currenItem)
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
    console.log(copyList)
    currenItem.user && setTargetUserId(currenItem.user.id)
    setParentId(parentId)
    setCommentList(copyList)
  }

  const changeComment = (val) => {
    console.log(val)
    console.log(val.toHTML())
    setIsTop(false)
    commentContent = val
  }

  const changeTopComment = (val) => {
    console.log(val.toHTML())
    console.log(isTop)
    setIsTop(true)
    setTopCommentState(val)
  }

  const CommentTemplate = ({ item, parentId, children }) => {
    console.log(item.targetUser)
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
    history.push({ pathname: '/editor', data })
  }

  const menuHandleClick = ({ key }) => {
    console.log(key)
    switch (key) {
      case 'edit':
        goToEditArticle()
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

  // 收藏文章
  const collectArticle = async () => {
    setCollectStatus(!isCancel)
    await articleCollect({ id: id, isCancel: isCancel })
  }

  // 关注用户
  const followUser = async () => {
    const res = await userFollow({ id: detail.createUser.id })
    if (res.code === 0) {
      message.success('关注成功')
    }
  }

  useEffect(() => {
    const searchId = getUrlSearch(window.location.search)
    setArtcileId(searchId.id)
  }, [])

  useEffect(() => {
    id && getArticleDetail()
  }, [id])

  return (
    <div>
      <div className={style.articleDetails}>
        <div className={style.articleArea}>
          <div className={style.main}>
            <div className={style.titleInfo}>
              <div className={style.more}>
                <Dropdown overlay={menu} trigger={['hover']} placement="bottomCenter">
                  <img style={{ cursor: 'pointer' }} width={16} src={require('@/assets/img/more.png').default} alt="" />
                </Dropdown>
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
                  <span className={style.text}>{formateTime(detail.updateTime)}</span>
                  <span className={style.number}>{detail.viewCount}</span>
                  <span className={style.text}>浏览</span>
                </div>
                <div className={style.left}>
                  <div onClick={collectArticle}>
                    <img className={style.img} width={16} src={require('@/assets/img/collect.png').default} alt="" />
                    <span>{isCancel ? '取消收藏' : '收藏'}</span>
                  </div>
                  <div>
                    <img className={style.img} width={16} src={require('@/assets/img/remark.png').default} alt="" />
                    <span>举报</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`braft-output-content ${style.content}`}
              dangerouslySetInnerHTML={{ __html: detail.content }}
            ></div>
            <div className={style.likeShare}>
              <div className={style.like}>
                <img className={style.tag} width={16} src={require('@/assets/img/like.png').default} alt="" />
                点赞
              </div>
              <div className={style.share}>
                <img className={style.tag} width={16} src={require('@/assets/img/share.png').default} alt="" />
                分享
              </div>
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
          </div>
        </div>

        <div className={style.articleRelated}>
          <div className={style.authorInfo}>
            <div className={style.authTitle}>作者信息</div>
            <div className={style.authInfo}>
              <Avatar size="small" className={style.avatarImg} src={detail.createUser.avatar} />
              <div className={style.authorAbout}>
                <div>{detail.createUser.username}</div>
                <div className={style.buttonGroup}>
                  <span className={style.attention} onClick={followUser}>
                    关注
                  </span>
                  <span className={style.private}>私信</span>
                </div>
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
              <div>万字长文，详解企业的线上运营策略MVP设计</div>
              <div>万字长文，详解企业的线上运营策略MVP设计</div>
              <div>万字长文，详解企业的线上运营策略MVP设计</div>
              <div>万字长文，详解企业的线上运营策略MVP设计</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.copyright}>
        Gworld（平潭）互联网科技有限公司 Copyright © 2012-2020 Gworld All Rights Reserved
      </div>
    </div>
  )
}

export default ArticleDetails
