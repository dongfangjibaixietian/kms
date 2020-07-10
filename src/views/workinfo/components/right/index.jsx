import React, { useState } from 'react'
import { Tabs, Button, Comment, Avatar } from 'antd'
import { EyeOutlined, TagOutlined, MessageOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import Article from './Article/index'

import style from './index.scss'

const { TabPane } = Tabs

//以下都是成员管理功能模块

const Right = () => {
  const [show, setShow] = useState(true)

  function callback(key) {
    console.log(key)
  }

  const data = [
    {
      name: '网页开发 28',
      sign: 'tag0',
    },
    {
      name: '大数据 32',
      sign: 'tag1',
    },
    {
      name: '产品策划 31',
      sign: 'tag2',
    },
    {
      name: '项目管理 12',
      sign: 'tag3',
    },
    {
      name: '运营 20',
      sign: 'tag4',
    },
    {
      name: '敏捷开发 18',
      sign: 'tag5',
    },
    {
      name: '运维 19',
      sign: 'tag6',
    },
    {
      name: '活动专题 14',
      sign: 'tag7',
    },
    {
      name: 'HTML5开发 14',
      sign: 'tag8',
    },
  ]
  const [copydata, setData] = useState(data)
  // const firstrow = data.splice(6)
  const [sign, changeCategory] = useState('new')
  const change = (e) => {
    e.persist()
    console.log(e)
    console.log(e.target.dataset.sign)
    changeCategory(e.target.dataset.sign)
  }

  const ExampleComment = ({ children }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">回复</span>]}
      author={<a>马可波罗</a>}
      avatar={<Avatar className={style.sculpture} src="http://www.9ht.com/xue/54507.html" alt="马可波罗" />}
      content={<p>牛牛牛！！！功能强大，超乎想象！</p>}
    >
      {children}
    </Comment>
  )

  function changetodown() {
    setShow(false)
    setData(data.splice(0, 6))
  }
  function changetoup() {
    setShow(true)
    setData(data)
  }

  return (
    <div className={style.KnowledgeListHeader}>
      <Tabs className={style.tabs} defaultActiveKey="1" onChange={callback}>
        <TabPane tab="我的文章" key="1" className={style.mypaper}>
          <div className={style.filtcategory}>
            <div className={style.KnowledgeCategory} onClick={change}>
              {copydata.map((item) => (
                <div
                  key={item.sign}
                  data-sign={item.sign}
                  className={`${style.Category} ${sign == item.sign ? style.active : null}`}
                  // className={(style.Category sign == item.sign && style.active)}
                >
                  {item.name}
                </div>
              ))}
              {/* {show ? (
              <UpOutlined onClick={changetodown} className={style.showicon} />
            ) : (
              <DownOutlined onClick={changetoup} className={style.showicon} />
            )} */}
            </div>
            <div className={style.totalshowicon}>
              {show ? (
                <UpOutlined onClick={changetodown} className={style.showicon} />
              ) : (
                <DownOutlined onClick={changetoup} className={style.showicon} />
              )}
            </div>
          </div>
          <Article className={style.articlelist} />
          {/* <div className={style.alltag}>
                <div className={style.firstrow}>
                  <Tag className={style.tag}>网页开发 {28}</Tag>
                  <Tag className={style.tag}>
                    <a href="https://www.baidu.com">大数据 {32}</a>
                  </Tag>
                  <Tag className={style.tag}>产品策划 {31}</Tag>
                  <Tag className={style.tag}>项目管理 {12}</Tag>
                  <Tag className={style.tag}>运营 {20}</Tag>
                  <Tag className={style.tag}>敏捷开发 {18}</Tag>
                </div>
                <Tag className={style.tag6}>运维 {19}</Tag>
                <Tag className={style.tag7}>活动专题 {14}</Tag>
                <Tag className={style.tag8}>HTML5开发 {14}</Tag>
              </div> */}
        </TabPane>

        <TabPane tab="我的专栏" key="2">
          <div className={style.mycolumn}>
            <div className={style.columntit}>
              <div className={style.columnnum}>共{4}个专题</div>
              <Button type="primary" className={style.newcolumn}>
                创建新的专题
              </Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="我的问答" key="3">
          <div className={style.myquest}>
            <div className={style.titquestion}>html5直播?</div>
            <div className={style.textcon}>
              我该怎么做？我试过用视频标签，但我没能用。下面是我的代码。有人能指点我正确的方向吗?
            </div>
            <div className={style.authorinfo}>
              <img
                className={style.sculpture}
                src="http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg"
                alt=""
              />
              <div className={style.authorname}>晓峰噢</div>
              <div className={style.time}>刚刚</div>

              <TagOutlined />
              <div className={style.questiontag}>网页开发，HTML5开发，大数据</div>
              <div className={style.rightauthorinfo}>
                <div>
                  <EyeOutlined />
                  {5656}
                </div>
                <div className={style.messageoutlined}>
                  <MessageOutlined />
                  {52}
                </div>
              </div>
            </div>
            <div className={style.comment}>
              <ExampleComment className={style.comment}></ExampleComment>
            </div>
          </div>
          ,
        </TabPane>
        <TabPane tab="我的收藏" key="4">
          <Article className={style.articlelist} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Right
