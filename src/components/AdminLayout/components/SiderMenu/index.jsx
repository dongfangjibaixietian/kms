import React from 'react'
import { Menu } from 'antd'
import { withRouter } from 'react-router-dom'

import useGetRoutes from '@/router'

const MenuItem = Menu.Item

const SiderMenu = ({ history }) => {
  const { adminRoutes } = useGetRoutes()

  // 获取菜单列表
  const getMenus = () => {
    return adminRoutes.children.map((item) => {
      return (
        <MenuItem key={item.path ? `/admin/${item.path}` : '/admin'}>
          <span>{item.title}</span>
        </MenuItem>
      )
    })
  }

  const goto = ({ key }) => {
    history.push(key)
  }

  return (
    <Menu selectedKeys={[location.pathname]} onClick={goto} theme="dark" mode="inline">
      {getMenus()}
    </Menu>
  )
}

export default withRouter(SiderMenu)
