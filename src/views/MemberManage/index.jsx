import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, message } from 'antd'
import { memberList } from '@/api/library'
import { getUrlSearch } from '@/utils'
import AddMemberModal from './components/AddMemberModal'
import style from './index.scss'
import { set } from 'mobx'

const OnlinehardDetails = ({ history }) => {
  const [list, setList] = useState([])
  const [id, setLibId] = useState('')
  const [visible, setVisible] = useState(false)

  const handleDel = (row) => {
    const delIndex = list.findIndex((item) => row.key === item.key)
    const copyList = [...list]
    copyList.splice(delIndex, 1)
    setList(copyList)
  }

  const getMemberList = async (file, url) => {
    // 图片格式
    const res = await memberList({
      id: id,
    })
    if (res.code === 0) setList(res.data.list)
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      render: () => {
        return (
          <div>
            <img src="http://img.zcool.cn/community/01a85e576a873b0000018c1be7e355.jpg" className={style.memberImg} />
            {'风信你听'}
          </div>
        )
      },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
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
        <a
          onClick={() => {
            handleDel(record)
          }}
        >
          删除
        </a>
      ),
    },
  ]

  const addMember = () => {
    message.info('敬请期待')
    // setVisible(true)
  }

  useEffect(() => {
    const searchId = getUrlSearch(window.location.search)
    setLibId(searchId.parentId)
  }, [])

  useEffect(() => {
    id && getMemberList()
  }, [id])

  return (
    <div className={style.memberManger}>
      <div className={style.top}>
        <div className={style.title}>超G名片设计资料文件库</div>

        <div className={style.operate}>
          <div className={style.btnGroup}>
            <Button className={style.btn} onClick={() => history.goBack()}>
              返回知识库
            </Button>
          </div>
        </div>
      </div>
      <div className={style.tablewarp}>
        <div className={style.memberNum}>
          <div className={style.memberTitle}>
            知识库成员 <span className={style.num}>3</span>
          </div>
          <div>
            <Button type="primary" className={style.btn} onClick={() => addMember()}>
              新增成员
            </Button>
          </div>
        </div>
        <Table
          locale={{ emptyText: '暂无成员' }}
          columns={columns}
          dataSource={list}
          pagination={false}
          className={style.memberTable}
        />
      </div>
      <AddMemberModal visible={visible} change={() => setVisible(false)} />
    </div>
  )
}

export default OnlinehardDetails
