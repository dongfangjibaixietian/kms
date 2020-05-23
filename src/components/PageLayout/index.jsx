import React from 'react'
import { Layout } from 'antd'

import style from './index.scss'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

const { Header, Footer, Content } = Layout

const PageLayout = () => {
  return (
    <Layout className={style.appContainer}>
      <Header className={style.header}>
        <div className={style.pageHeader}>
          <HeaderLeft />
          <HeaderRight />
        </div>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default PageLayout
