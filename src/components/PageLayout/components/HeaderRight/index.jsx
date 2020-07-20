import React, { useState, useEffect } from 'react'
import { Input, Avatar, Dropdown, Menu, Modal, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { removeItem } from '@/utils/storage'
import style from './index.scss'
import { useRootStore } from '@/utils/customHooks'
import ResetPassword from '../ResetPassword'

const HeaderRight = ({ history }) => {
  const { setModelVisible, setModelType, isLogin, setLoginState, userInfo } = useRootStore().userStore
  const [user, setUser] = useState({
    avatar: '',
  })
  const [searchVal, setSearchVal] = useState('')
  const [changePwd, setPwd] = useState(false)

  const triggerShowModal = (type) => {
    setModelType(type)
    setModelVisible(true)
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
        setLoginState(false)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const menuHandleClick = ({ key }) => {
    switch (key) {
      case 'out':
        logOUt()
        break
      case 'pwd':
        setPwd(true)
        break
      case 'user':
        const data = {
          userId: userInfo.user.id,
        }
        // history.push(`/user/center?userId=${userInfo.user.id}`)
        // window.open(window.location.origin + `/user/center`)
        window.location.href = window.location.origin + `/user/center?userId=${userInfo.user.id}`
        break

      default:
        message.info('敬请期待')
        break
    }
  }

  const searchArticle = (e) => {
    setSearchKey(e.target.value)
    setSearchVal(e.target.value)
  }

  const menu = (
    <Menu className={style.menu} onClick={menuHandleClick}>
      {/* <Menu.Item className={style.item} key="user">
        个人中心
      </Menu.Item>
      <Menu.Item className={style.item} key="set">
        通用设置
      </Menu.Item>
      <Menu.Item className={style.item} key="top">
        置顶文章
      </Menu.Item> */}
      <Menu.Item className={style.item} key="user">
        个人中心
      </Menu.Item>
      <Menu.Item className={style.item} key="pwd">
        修改密码
      </Menu.Item>
      <Menu.Item className={style.item} key="out">
        退出登录
      </Menu.Item>
    </Menu>
  )

  let defaultView
  if (isLogin) {
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

  useEffect(() => {
    if (!isLogin && !userInfo) return
    setUser(userInfo.user)
  }, [userInfo])

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

      <ResetPassword visible={changePwd} change={setPwd} />
    </div>
  )
}

export default withRouter(observer(HeaderRight))
