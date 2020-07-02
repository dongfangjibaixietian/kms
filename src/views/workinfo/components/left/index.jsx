import React, { useState } from 'react'
import { Button } from 'antd'

import style from './index.scss'
import NewSource from './../Newsource'
import InfiniteListExample from './list.jsx/list'

const Left = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  return (
    <div className={style.left}>
      <div className={style.butt}>
        <div className={style.content}>资源知识库</div>
        <InfiniteListExample></InfiniteListExample>
        <Button onClick={() => triggerShowPublishModal(true)} type="primary" className={style.publishBtn}>
          新建知识库
        </Button>
      </div>
      {publishModalVisible && (
        <NewSource triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default Left
