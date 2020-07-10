import React, { useState, useEffect } from 'react'
import { Input, Avatar, Dropdown, Menu, Modal, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { setItem, getItem, removeItem } from '@/utils/storage'
import style from './index.scss'
import LoginModal from './../LoginModal'
import { userInfo } from '@/api/user'
import jwtDecode from 'jwt-decode'

const HeaderRight = () => {
  const [isShowModal, setIsShowModal] = useState(false)

  // 1: 登录 2: 注册
  const [type, setType] = useState(1)
  const [token, setToken] = useState(getItem('token'))
  const [user, setUser] = useState({
    avatar: '',
  })
  const [searchVal, setSearchVal] = useState('')

  const triggerShowModal = (type) => {
    setType(type)
    setIsShowModal(true)
  }

  const { confirm } = Modal

  const logOUt = () => {
    confirm({
      content: '是否退出登录',
      okText: '确认',
      cancelText: '取消',
      icon: '',
      onOk() {
        removeItem('token')
        removeItem('user')
        removeItem('article')
        setToken('')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const menuHandleClick = ({ key }) => {
    console.log(key)
    switch (key) {
      case 'out':
        logOUt()
        break
      default:
        message.info('敬请期待')
        break
    }
  }

  const searchArticle = (e) => {
    console.log(e.target.value)
    setSearchKey(e.target.value)
    setSearchVal(e.target.value)
    console.log('按下回车')
  }

  const menu = (
    <Menu className={style.menu} onClick={menuHandleClick}>
      <Menu.Item className={style.item} key="user">
        个人中心
      </Menu.Item>
      <Menu.Item className={style.item} key="set">
        通用设置
      </Menu.Item>
      <Menu.Item className={style.item} key="top">
        置顶文章
      </Menu.Item>
      <Menu.Item className={style.item} key="out">
        退出登录
      </Menu.Item>
    </Menu>
  )

  let defaultView
  if (token) {
    defaultView = (
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar className={style.avatarImg} src={user.avatar} />
      </Dropdown>
    )
  } else {
    defaultView = (
      <div className={style.loginBtn}>
        <span className={style.login} onClick={() => triggerShowModal(1)}>
          登录
        </span>
        <span className={style.register} onClick={() => triggerShowModal(2)}>
          注册
        </span>
      </div>
    )
  }

  const getUserInfo = async () => {
    try {
      const user = jwtDecode(token)
      console.log(user)
      const info = await userInfo({
        id: user.id,
      })
      console.log(info.data)
      setItem('user', JSON.stringify(info.data))
      setUser(info.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(token, 'use')
    if (!token) {
      setToken('')
      return
    }
    getUserInfo()
  }, [token])

  return (
    <div className={style.headerRight}>
      <Input
        className={style.searchInput}
        placeholder="搜索"
        value={searchVal}
        onChange={searchArticle}
        suffix={<SearchOutlined style={{ color: 'rgba(201, 201, 201)', fontSize: 20 }} />}
      />
      {defaultView}
      <LoginModal
        change={setToken}
        type={type}
        setIsShowModal={setIsShowModal}
        visible={isShowModal}
        onCancel={() => setIsShowModal(false)}
      />
    </div>
  )
}

export default withRouter(observer(HeaderRight))
