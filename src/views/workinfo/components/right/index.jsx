import React, { useState } from 'react'
import { Tabs, Table, Tag, Input, Button, Space, Select, Comment, Avatar } from 'antd'
import { EyeOutlined, TagOutlined, MessageOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import Article from './Article/index'

import style from './index.scss'
import HotTags from './Tag/tag'

const { TabPane } = Tabs
const { Option } = Select

//以下都是成员管理功能模块

const Right = () => {
  const dataone = [
    {
      key: '1',
      name: '风信你听',
      email: 32,
      role: '超级管理员',
    },
    {
      key: '2',
      name: '不懂要问',
      email: 42,
      role: '管理员',
    },
    {
      key: '3',
      name: '二郎神 · 杨戬',
      email: 32,
      role: '编辑者',
    },
    {
      key: '4',
      name: '马可波罗',
      email: 32,
      role: '查看者',
    },
  ]

  const [list, setList] = useState(dataone)
  // const [list, setList] = useState(data)
  const [show, setShow] = useState(true)

  function callback(key) {
    console.log(key)
  }

  //以上成员管理功能模块

  const { Search } = Input

  //删除按钮功能

  const handleDel = (row) => {
    const delIndex = list.findIndex((item) => row.key === item.key)
    const copyList = [...list]
    copyList.splice(delIndex, 1)
    console.log(copyList)
    console.log(list)
    setList(copyList)
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
    },
    {
      title: '用户名',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      filters: [
        {
          text: '超级管理员',
          value: '超级管理员',
        },
        {
          text: '管理员',
          value: '管理员',
        },
        {
          text: '编辑者',
          value: '编辑者',
        },
        {
          text: '查看者',
          value: '查看者',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleDel(record)
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ]

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

  function onChange(pagination, filters, extra) {
    console.log('params', pagination, filters, extra)
  }

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
        <TabPane tab="成员管理" key="5">
          <div className={style.memman}>
            <div className={style.memtit}>
              <div className={style.leftmen}>
              <div className={style.numword}>知识库成员</div>
                <div className={style.num}>{3}</div>
                </div>
              <div className={style.operate}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择项目"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="项目1">项目1</Option>
                  <Option value="项目2">项目2</Option>
                  <Option value="项目3">项目3</Option>
                </Select>
                ,<Button type="primary">添加成员</Button>
              </div>
            </div>
            <Table columns={columns} dataSource={list} onChange={onChange} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Right
