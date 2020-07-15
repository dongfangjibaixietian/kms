import React from 'react'
import { Menu, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '@/utils/customHooks'
import { getItem } from '@/utils/storage'
import style from './index.scss'
import useGetRoutes from '@/router'

const MenuItem = Menu.Item

const Nav = ({ history, location }) => {
  const { homeRoutes } = useGetRoutes()
  const { isLogin, setModelVisible } = useRootStore().userStore
  const goto = ({ key }) => {
    if (location.pathname === key) {
      return
    }
    if (!getItem('token') || !isLogin) {
      message.error('登录过期，请重新登录')
      setModelVisible(true)
      return
    }

    history.push(key)
  }

  return (
    <div className={style.menuWrapper}>
      <Menu selectedKeys={[location.pathname]} mode="horizontal">
        {homeRoutes.children.map((item) =>
          item.title ? (
            <MenuItem onClick={goto} key={item.path}>
              {item.title}
            </MenuItem>
          ) : (
            ''
          )
        )}
      </Menu>
    </div>
  )
}

export default withRouter(observer(Nav))
