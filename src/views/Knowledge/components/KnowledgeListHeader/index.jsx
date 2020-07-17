import React, { useState } from 'react'
import { Tabs, Button } from 'antd'
import { setItem } from '@/utils/storage'
import style from './index.scss'
import { useRootStore } from '@/utils/customHooks'

const { TabPane } = Tabs

const KnowledgeListHeader = ({ update }) => {
  const { setModelVisible, isLogin } = useRootStore().userStore
  const publishArticle = () => {
    if (!isLogin) return setModelVisible(true)
    setItem('type', 'md')
    window.location.href = window.location.origin + `/publish/editor`
    // setPublishModalVisible(isShow)
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
    if (!e.target.dataset.sign) return
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
            {/* <TabPane tab="文章" key="2" />
            <TabPane tab="专题" key="3" /> */}
          </Tabs>
        </div>
        <Button onClick={() => publishArticle(true)} type="primary" className={style.publishBtn}>
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
    </div>
  )
}

export default KnowledgeListHeader
