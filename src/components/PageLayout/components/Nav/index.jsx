import React from 'react'
import { Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import style from './index.scss'
import useGetRoutes from '@/router'

const MenuItem = Menu.Item

const Nav = ({ history, location }) => {
  const { homeRoutes } = useGetRoutes()

  const goto = ({ key }) => {
    if (location.pathname === key) {
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
