import React from 'react'
import { Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import style from './index.scss'
import { useRootStore } from '@/utils/customHooks'

const MenuItem = Menu.Item

const Nav = ({ history, location }) => {
  const { currentRoutes } = useRootStore().routerStore

  const goto = ({ key }) => {
    if (location.pathname === key) {
      return
    }
    history.push(key)
  }

  return (
    <div className={style.menuWrapper}>
      <Menu selectedKeys={[location.pathname]} mode="horizontal">
        {currentRoutes.map((item) =>
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
