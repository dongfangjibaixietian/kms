import React from 'react'
import { Layout } from 'antd'

import style from './index.scss'
import HeaderLeft from './components/HeaderLeft'
import HeaderRight from './components/HeaderRight'

const { Header, Content } = Layout

const PageLayout = ({ children }) => {
  return (
    <Layout className={style.appContainer}>
      <Header className={style.header}>
        <div className={style.pageHeader}>
          <HeaderLeft />
          <HeaderRight />
        </div>
      </Header>
      <Content className={style.appContent}>{children}</Content>
    </Layout>
  )
}

export default PageLayout
