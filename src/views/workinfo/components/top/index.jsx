import React, { useState } from 'react'
import { Descriptions, Button } from 'antd'

import style from './index.scss'
import EditorialPerson from './../EditorialPerson'

const Top = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  return (
    <div className={style.KnowledgeListHeader}>
      <div className={style.header}>
        <div className={style.tabsWrapper}>
          {/* 左边的信息 */}
          <div className={style.pers}>
            <img className={style.pic} src="/src/assets/img/superG.png" alt="" />
            <div className={style.leftinfo}>
              <div className={style.nm}>马可波罗</div>
              <div className={style.intro}>暂无个人介绍</div>
              <Button onClick={() => triggerShowPublishModal(true)} className={style.publishBtn}>
                编辑资料
              </Button>
            </div>
          </div>
          {/* 右边的信息 */}
          <div className={style.rigtinfo}>
            <div className={style.one}>
              <div className={style.dataone}>54.2万</div>
              <div>总阅读</div>
            </div>
            <div className={style.two}>
              <div className={style.datatwo}>500篇</div>
              <div>文章</div>
            </div>
            <div className={style.three}>
              <div className={style.datathree}>55564</div>
              <div>点赞数</div>
            </div>
            <div className={style.four}>
              <div className={style.datafour}>454</div>
              <div>关注</div>
            </div>
            <div className={style.five}>
              <div className={style.datafive}>322</div>
              <div>粉丝</div>
            </div>
          </div>
          {/* <Descriptions title="User Info">
            <Descriptions.Item label="UserName" className={style.name}>Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions> */}
        </div>
      </div>
      {publishModalVisible && (
        <EditorialPerson triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default Top
