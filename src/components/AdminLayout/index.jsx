import React from 'react'
import { Layout } from 'antd'

import styles from './index.scss'
import SiderMenu from './components/SiderMenu'

const LayoutSider = Layout.Sider

const LayoutContent = Layout.Content

const Admin = ({ children }) => {
  return (
    <Layout className={styles.adminContainer}>
      <LayoutSider>
        <SiderMenu />
      </LayoutSider>
      <Layout>
        <LayoutContent>{children}</LayoutContent>
      </Layout>
    </Layout>
  )
}

export default Admin
