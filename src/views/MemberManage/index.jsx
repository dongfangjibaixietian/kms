import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, message, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { memberList, changeRole } from '@/api/library'
import { getUrlSearch } from '@/utils'
import { useRootStore } from '@/utils/customHooks'
import AddMemberModal from './components/AddMemberModal'

import style from './index.scss'

const roleList = [
  {
    text: '编辑者',
    value: 'editor',
  },
  {
    text: '管理员',
    value: 'admin',
  },
  {
    text: '创建者',
    value: 'owner',
  },
  {
    text: '查看者',
    value: 'normal',
  },
]
const OnlinehardDetails = ({ history }) => {
  const [list, setList] = useState([])
  const [id, setLibId] = useState('')
  const [visible, setVisible] = useState(false)
  const { roleCode } = useRootStore().userStore

  //   const removeUser = async () => {
  //     const res = await removeFileApi({
  //       fileId: editingKey,
  //     })
  //     if (res.code === 0) {
  //       message.success('删除成功')

  //       const delIndex = list.findIndex((item) => editingKey === item.id)
  //       const copyList = [...list]
  //       copyList.splice(delIndex, 1)
  //       setList(copyList)
  //     }
  //   }

  const handleDel = () => {
    Modal.confirm({
      title: '',
      content: `确认要删除该成员吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // removeFile()
        message.info('接口正在完善中。。。')
      },
    })
  }

  const getMemberList = async () => {
    const res = await memberList({
      id: id,
    })
    if (res.code === 0) setList(res.data.list)
  }

  const menuHandleClick = async (item) => {
    // const res = await changeRole({
    //   userId: userInfo.user.id,
    //   libId: id,
    //   role: item.roleCode
    // })
    console.log(item)
  }

  const filterMenu = (filterList, currentItem) => {
    return (
      <Menu className={style.menu} onClick={() => menuHandleClick(currentItem)}>
        {filterList.map((item) => (
          <Menu.Item className={style.item} key={item.value}>
            {item.text}
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      render: (text, record) => {
        return (
          <div>
            <img src={record.avatar} className={style.memberImg} />
            {text}
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
      filters: roleList,
      cancelText: '重置',
      filterMultiple: true,
      onFilter: (value, record) => record.roleCode.indexOf(value) === 0,
      //   render: (text, item) => {
      //     let viewRoleList = []
      //     if (item.roleCode === 'editor' || item.roleCode === 'normal') {
      //       return text
      //     } else if (item.roleCode === 'owner') {
      //       viewRoleList = roleList.filter((temp) => temp.value !== 'owner')
      //       console.log(viewRoleList)
      //     } else {
      //       viewRoleList = roleList.filter((temp) => temp.value !== 'owner' && temp.value !== 'admin')
      //     }
      //     console.log(viewRoleList)

      //     return (
      //       <Dropdown overlay={filterMenu(viewRoleList, item)} trigger={['click']}>
      //         <div>
      //           {text}
      //           <DownOutlined />
      //         </div>
      //       </Dropdown>
      //     )
      //   },
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
    setVisible(true)
  }

  useEffect(() => {
    const searchId = getUrlSearch(window.location.search)
    setLibId(searchId.hardId)
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
          {(roleCode === 'owner' || roleCode === 'admin') && (
            <div>
              <Button type="primary" className={style.btn} onClick={() => addMember()}>
                新增成员
              </Button>
            </div>
          )}
        </div>
        <Table
          locale={{ emptyText: '暂无成员', filterReset: '重置', filterConfirm: '确认' }}
          columns={columns}
          rowKey="id"
          dataSource={list}
          pagination={false}
          className={style.memberTable}
        />
      </div>
      <AddMemberModal visible={visible} libId={id} change={() => setVisible(false)} />
    </div>
  )
}

export default OnlinehardDetails
