import React, { useEffect, useState } from 'react'
import { Comment, Avatar, List } from 'antd'
import style from './index.scss'
import { articleDetail, articleCollect } from '@/api/article'
import { commentList } from '@/api/comment'
import { getUrlSearch, formateTime } from '@/utils'
import { setItem } from '@/utils/storage'
import { useRootStore } from '@/utils/customHooks'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'
import 'braft-editor/dist/index.css'

const ArticleDetails = ({ history }) => {
  const list = [
    {
      id: 1,
      content: '这个文章真的好',
      createTime: '2020-07-02T09:19:10.000Z',
      user: {
        id: 10,
        username: 'taroxin',
        nickname: 'taroxin',
        email: '15029352778@163.com',
        avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
      },
      targetUser: {
        id: 11,
        username: 'taroxin',
        nickname: 'taroxin',
        email: '15029352778@163.com',
        avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
      },
      children: [
        {
          id: 2,
          content: '这个文章真的好',
          createTime: '2020-07-02T09:19:40.000Z',
          user: {
            id: 13,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
          targetUser: {
            id: 14,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
        },
        {
          id: 3,
          content: '这个文章真的好',
          createTime: '2020-07-02T09:19:40.000Z',
          user: {
            id: 15,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
          targetUser: {
            id: 16,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
        },
      ],
    },
    {
      id: 4,
      content: '这个文章真的好',
      createTime: '2020-07-02T09:19:10.000Z',
      user: {
        id: 22,
        username: 'taroxin',
        nickname: 'taroxin',
        email: '15029352778@163.com',
        avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
      },
      targetUser: {
        id: 23,
        username: 'taroxin',
        nickname: 'taroxin',
        email: '15029352778@163.com',
        avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
      },
      children: [
        {
          id: 5,
          content: '这个文章真的好',
          createTime: '2020-07-02T09:19:40.000Z',
          user: {
            id: 24,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
          targetUser: {
            id: 25,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
        },
        {
          id: 6,
          content: '这个文章真的好',
          createTime: '2020-07-02T09:19:40.000Z',
          user: {
            id: 26,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
          targetUser: {
            id: 27,
            username: 'taroxin',
            nickname: 'taroxin',
            email: '15029352778@163.com',
            avatar: 'https://images.gmall88.com/bee9ec5c-97af-48ce-ac7d-5dec270ec500_120x120.png',
          },
        },
      ],
    },
  ]

  const CommentTemplate = ({ item, children }) => {
    console.log(item)
    console.log(children)
    return (
      <Comment
        actions={[
          <div key="comment-list-reply-to-0" className={style.reply}>
            {' '}
            <img width="16" src={require('@/assets/img/reply.png').default} alt="" /> 回复
          </div>,
        ]}
        author={<a>{item.user.username}</a>}
        avatar={<Avatar src={item.user.avatar} />}
        content={<p>{item.content}</p>}
        datetime={<span>{item.createTime}</span>}
      >
        {children}
      </Comment>
    )
  }

  const [id, setArtcileId] = useState('')
  const [isCancel, setCollectStatus] = useState(false)
  const [commontList, setcommontList] = useState([])
  const { setArticleBaseInfo } = useRootStore().articleStore
  const [detail, setArtcileDetail] = useState({
    title: '',
    content: '',
    createUser: {},
    tags: [],
  })

  const getCommentList = async () => {
    try {
      // 获取评论列表
      const commentRes = await commentList({
        articleId: id,
        pageIndex: 1,
        pageSize: 20,
      })
      console.log(commentRes)
      setcommontList(list)
    } catch (error) {
      console.log(error)
    }
  }

  const getArticleDetail = async () => {
    const res = await articleDetail({ id: id })
    const editorState = BraftEditor.createEditorState(res.data.rawContent)
    res.data.content = editorState.toHTML()
    console.log(res.data)

    const result = Object.assign({}, detail, res.data)
    setArtcileDetail(result)

    if (res.code === 0) getCommentList()
  }

  // 进入文章编辑页面
  const goToEditArticle = () => {
    // const data = {
    //   viewType,
    //   selectedTag,
    //   title,
    //   textType,
    // }
    // setArticleBaseInfo(data)
    const data = {
      type: 'usd',
      name: 'sunny',
      id: id,
    }
    setArticleBaseInfo(data)
    setItem('type', detail.type)
    history.push({ pathname: '/editor', data })
  }

  // 收藏文章
  const collectArticle = async () => {
    setCollectStatus(!isCancel)
    await articleCollect({ id: id, isCancel: isCancel })
  }

  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: <div className="fuwenben-publish-btn">发表</div>,
    },
  ]

  // 需要展示的富文本按钮
  const controls = ['bold', 'emoji', 'media']

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
                <img onClick={goToEditArticle} width={16} src={require('@/assets/img/more.png').default} alt="" />
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
            <BraftEditor extendControls={extendControls} controls={controls} />
          </div>
          <div className={style.commentArea}>
            <List
              header={`${commontList.length} 个评论`}
              className={style.commentList}
              itemLayout="horizontal"
              dataSource={commontList}
              renderItem={(item) => (
                <List.Item>
                  <CommentTemplate item={item}>
                    {item.children.length > 0
                      ? item.children.map((subItem) => (
                          <CommentTemplate key={subItem.id} item={subItem}></CommentTemplate>
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
            <Avatar size="small" className={style.avatarImg} src={detail.createUser.avatar} />
            <div className={style.authorAbout}>
              <div>{detail.createUser.username}</div>
              <div className={style.buttonGroup}>
                <span className={style.attention}>关注</span>
                <span className={style.private}>私信</span>
              </div>
            </div>
          </div>
          <div className={style.item}>
            <div>文档标签</div>
            <div className={style.categoryDetails}>
              {detail.tags.map((tag) => (
                <div key={tag.id} className={style.tagItem}>
                  {tag.content}
                </div>
              ))}
            </div>
          </div>
          <div className={style.item}>
            <div>相关文档</div>
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
