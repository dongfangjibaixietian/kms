import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

import style from './index.scss'
import { useRootStore } from '@/utils/customHooks'

const HeaderRight = () => {
  const { setRoutes } = useRootStore().routerStore

  return (
    <div className={style.headerRight}>
      <Input
        className={style.searchInput}
        placeholder="搜索"
        suffix={<SearchOutlined style={{ color: 'rgba(201, 201, 201)', fontSize: 20 }} />}
      />
      <div className={style.loginBtn}>登录</div>
      <div onClick={() => setRoutes(['testa'])}>不存在测试页面</div>
    </div>
  )
}

export default observer(HeaderRight)
