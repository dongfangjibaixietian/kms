import React, { useState } from 'react'
import { Tabs, Button } from 'antd'

import style from './index.scss'
import PublishModal from './../PublishModal'

const { TabPane } = Tabs

const KnowledgeListHeader = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  return (
    <div className={style.KnowledgeListHeader}>
      <div className={style.header}>
        <div className={style.tabsWrapper}>
          <Tabs className={style.tabs} animated={false}>
            <TabPane tab="全部" key="1" />
            <TabPane tab="文章" key="2" />
            <TabPane tab="专题" key="3" />
          </Tabs>
        </div>
        <Button onClick={() => triggerShowPublishModal(true)} type="primary" className={style.publishBtn}>
          我要发表
        </Button>
      </div>
      {publishModalVisible && (
        <PublishModal triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default KnowledgeListHeader
