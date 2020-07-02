import React, { useState } from 'react'
import { Tabs } from 'antd'

import style from './index.scss'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

const Right = () => {
  return (
    <div className={style.KnowledgeListHeader}>
      <div className={style.header}>
        <div className={style.tabsWrapper}>
          <Tabs className={style.tabs} defaultActiveKey="1" onChange={callback}>
            <TabPane tab="我的文章" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="我的专栏" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="我的问答" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="我的收藏" key="4">
              Content of Tab Pane 4
            </TabPane>
            <TabPane tab="成员管理" key="5">
              Content of Tab Pane 5
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Right
