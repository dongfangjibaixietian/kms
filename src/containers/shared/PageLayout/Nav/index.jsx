import React, { useState } from 'react'
import { Menu } from 'antd'

import style from './index.scss'

const MenuItem = Menu.Item

const Nav = () => {
  const [tabKey, setTabkey] = useState('1')

  return (
    <div className={style.menuWrapper}>
      <Menu selectedKeys={[tabKey]} mode="horizontal">
        <MenuItem onClick={() => setTabkey('1')} key={'1'}>
          发现知识
        </MenuItem>
        <MenuItem onClick={() => setTabkey('2')} key={'2'}>
          工作资料
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Nav
