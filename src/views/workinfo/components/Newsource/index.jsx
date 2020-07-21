import React, { useState } from 'react'
import { Modal, Input, Button, Select, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { libCreate } from '@/api/library'

import CloseIcon from '@/assets/svg/close.svg'
import style from './index.scss'

const { Option } = Select

const NewSource = ({ visible, triggerShowPublishModal, change }) => {
  const { TextArea } = Input

  const [title, setTitle] = useState('')

  // 新建知识库接口
  const _libCreate = async () => {
    if (title.length < 4) {
      message.error('名称长度不能小于四位')
      return
    }
    const res = await libCreate({
      name: title,
    })
    change()
    triggerShowPublishModal(false)
  }

  return (
    <Modal
      wrapClassName={style.modalWrapper}
      destroyOnClose
      closeIcon={
        <CloseIcon onClick={() => triggerShowPublishModal(false)} className={style.closeIcon} width={18} height={18} />
      }
      width={500}
      footer={null}
      visible={visible}
    >
      <div className={style.totalbox}>
        <div className={style.header}>新建资源知识库</div>
        <div className={style.infoWrapper}>
          <div style={{ marginTop: 18 }} className={style.titleInfo}>
            <div className={style.title}>名称</div>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="请输入知识库名称" />
          </div>

          <div className={style.introinfo}>
            <div className={style.intro}>简介</div>
            <TextArea rows={5} />
          </div>
          <div className={style.createBtn}>
            <Button onClick={_libCreate} className={style.btn} type="primary">
              新建
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(NewSource)
