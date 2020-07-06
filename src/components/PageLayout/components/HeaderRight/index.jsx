import React, { useState, useEffect } from 'react'
import { Input, Avatar, Dropdown, Menu, Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { getToken, removeToken } from '@/utils/storage'
import style from './index.scss'
import LoginModal from './../LoginModal'

const HeaderRight = () => {
  const [isShowModal, setIsShowModal] = useState(false)

  // 1: 登录 2: 注册
  const [type, setType] = useState(1)
  const [token, setToken] = useState(getToken())

  const triggerShowModal = (type) => {
    setType(type)
    setIsShowModal(true)
  }

  const { confirm } = Modal

  const logOUt = () => {
    confirm({
      content: '是否确认登出',
      okText: '确认',
      cancelText: '取消',
      icon: '',
      onOk() {
        removeToken('TOKEN_KEY')
        setToken('')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const menu = (
    <Menu className={style.menu}>
      <Menu.Item className={style.item} onClick={logOUt}>
        登出
      </Menu.Item>
    </Menu>
  )
  let defaultView
  if (token) {
    defaultView = (
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar className={style.avatarImg} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Dropdown>
    )
  } else {
    defaultView = (
      <div className={style.login}>
        <div onClick={() => triggerShowModal()} className={style.loginBtn}>
          登录/注册
        </div>
      </div>
    )
  }

  useEffect(() => {
    console.log(token, 'use')
  }, [token])

  return (
    <div className={style.headerRight}>
      <Input
        className={style.searchInput}
        placeholder="搜索"
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
