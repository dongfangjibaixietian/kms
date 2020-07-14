import React, { useState } from 'react'
import { Tabs, Button } from 'antd'

import style from './index.scss'
import PublishModal from './../PublishModal'
import { useRootStore } from '@/utils/customHooks'

const { TabPane } = Tabs

const KnowledgeListHeader = ({ update }) => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)
  const { setModelVisible, isLogin } = useRootStore().userStore
  const triggerShowPublishModal = (isShow) => {
    if (!isLogin) return setModelVisible(true)
    setPublishModalVisible(isShow)
  }

  const data = [
    {
      name: '最新',
      sign: 'new',
    },
    {
      name: '精选文章',
      sign: 'sift',
    },
    {
      name: '热门文章',
      sign: 'hot',
    },
    // {
    //   name: '我的收藏',
    //   sign: 'collect',
    // },
  ]
  const [sign, changeCategory] = useState('new')
  const change = (e) => {
    e.persist()
    console.log(e)
    console.log(e.target.dataset.sign)
    changeCategory(e.target.dataset.sign)
    // 更新数据
    update(e.target.dataset.sign)
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
      <div className={style.KnowledgeCategory} onClick={change}>
        {data.map((item) => (
          <div
            key={item.sign}
            data-sign={item.sign}
            className={`${style.Category} ${sign == item.sign ? style.active : null}`}
          >
            {item.name}
          </div>
        ))}
      </div>
      {publishModalVisible && (
        <PublishModal triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default KnowledgeListHeader
