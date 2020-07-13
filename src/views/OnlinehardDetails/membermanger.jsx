import React, { useState } from 'react'
import { Table, Button, Space, Select } from 'antd'

import style from './index.scss'

const { Option } = Select

const MemberManger = () => {
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
      render: () => {
        return (
          <div>
            <img src="http://img.zcool.cn/community/01a85e576a873b0000018c1be7e355.jpg" className={style.namepic} />
            {'风信你听'}
          </div>
        )
      },
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

  function onChange(pagination, filters, extra) {
    console.log('params', pagination, filters, extra)
  }

  return (
    <div className={style.KnowledgeListHeader}>
      <div className={style.memman1}>
        <div className={style.memtit1}>
          <div className={style.leftmen1}>
            <div className={style.numword1}>知识库成员</div>
            <div className={style.num1}>{3}</div>
          </div>
          <div className={style.operate1}>
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
    </div>
  )
}

export default MemberManger
