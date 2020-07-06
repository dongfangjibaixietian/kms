import React, { useState } from 'react'
import { Button, List, Avatar } from 'antd'

import style from './index.scss'
import NewSource from './../Newsource'

const Left = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  //列表数据
  const data = [
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
    {
      title: '超G名片APP特点',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '超G名片APP特点',
    },
    {
      title: '公司美术常用设计规范',
    },
    {
      title: '直播“赞助礼物”资源库',
    },
  ]

  return (
    <div className={style.left}>
      <div className={style.butt}>
        <div className={style.content}>资源知识库</div>
        <Button onClick={() => triggerShowPublishModal(true)} type="primary" className={style.publishBtn}>
          新建知识库
        </Button>
      </div>
      <div className={style.box}>
        <div className={style.list}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="/src/assets/img/file.png" className={style.fl} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="2020-05-20"
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      {publishModalVisible && (
        <NewSource triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default Left
