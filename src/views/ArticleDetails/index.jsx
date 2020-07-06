import React, { useEffect, useState } from 'react'
import { Comment, Avatar, List, Tooltip } from 'antd'
import style from './index.scss'
import moment from 'moment'
import { articleDetail } from '@/api/article'
import { getUrlSearch, formateTime } from '@/utils'
import { useRootStore } from '@/utils/customHooks'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'

const ArticleDetails = ({ history }) => {
  const tags = [
    {
      name: '产品报告2',
      id: 'report2',
    },
    {
      name: '活动专题2',
      id: 'special2',
    },
    {
      name: '项目政策2',
      id: 'policy2',
    },
    {
      name: '策划文档2',
      id: 'document2',
    },
  ]
  const data = [
    {
      actions: [
        <div key="comment-list-reply-to-0" className={style.reply}>
          {' '}
          <img width="16" src={require('@/assets/img/reply.png').default} alt="" /> 回复
        </div>,
      ],
      author: 'wxxx',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>桥接全国人脉资源，更好的拓展市场渠道，只要懂得应用这个软件，你的生意可以拓展全国各地市场</p>,
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: [
        <div key="comment-list-reply-to-0" className={style.reply}>
          {' '}
          <img width="16" src={require('@/assets/img/reply.png').default} alt="" /> 回复
        </div>,
      ],
      author: 'wxxx',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>超G名片，越了解越喜欢，新奇特，功能强大，复杂的技术变得简单，做生意好帮手。</p>,
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ]
  const ExampleComment = ({ children }) => (
    <Comment
      actions={[
        <div key="comment-list-reply-to-0" className={style.reply}>
          {' '}
          <img width="16" src={require('@/assets/img/reply.png').default} alt="" /> 回复
        </div>,
      ]}
      author={<a>wxxx</a>}
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
      content={<p>超G名片，越了解越喜欢，新奇特，功能强大，复杂的技术变得简单，做生意好帮手</p>}
      datetime={
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      }
    >
      {children}
    </Comment>
  )
  const [id, setArtcileId] = useState('')
  const { setArticleBaseInfo } = useRootStore().articleStore
  const [detail, setArtcileDetail] = useState({
    title: '',
    content: '',
    createUser: {},
  })
  const getArticleDetail = async () => {
    const res = await articleDetail({ id: id })
    const editorState = BraftEditor.createEditorState(res.data.rawContent)
    res.data.content = editorState.toHTML()
    console.log(res.data)

    const result = Object.assign({}, detail, res.data)
    setArtcileDetail(result)
    console.log(detail)
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
    history.push({ pathname: '/editor', data })
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
                <img onClick={goToEditArticle} width={16} src={require('@/assets/img/more.png').default} alt="" />
              </div>
              <div className={style.title}>
                {detail.title}
                <img className={style.tag} width={16} src={require('@/assets/img/hot.png').default} alt="" />
                <img className={style.tag} width={16} src={require('@/assets/img/essence.png').default} alt="" />
                <img className={style.tag} width={16} src={require('@/assets/img/stick.png').default} alt="" />
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
                  <img className={style.img} width={16} src={require('@/assets/img/collect.png').default} alt="" />
                  <span>收藏</span>
                  <img className={style.img} width={16} src={require('@/assets/img/remark.png').default} alt="" />
                  <span>举报</span>
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
          <div className={style.commentArea}>
            <List
              header={`${data.length} 个评论`}
              className={style.commentList}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={() => (
                <li>
                  <ExampleComment>
                    <ExampleComment> </ExampleComment>
                  </ExampleComment>
                  {/* <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  /> */}
                </li>
              )}
            />
          </div>
        </div>

        <div className={style.articleRelated}>
          <div className={style.authorInfo}>
            <Avatar
              size="small"
              className={style.avatarImg}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <div className={style.authorAbout}>
              <div>Sweet糖糖</div>
              <div className={style.buttonGroup}>
                <span className={style.attention}>关注</span>
                <span className={style.private}>私信</span>
              </div>
            </div>
          </div>
          <div className={style.item}>
            <div>文档标签</div>
            <div className={style.categoryDetails}>
              {tags.map((tag) => (
                <div key={tag.id} className={style.tagItem}>
                  {tag.name}
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
