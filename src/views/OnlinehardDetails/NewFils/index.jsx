import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd'

import { withRouter } from 'react-router-dom'

import CloseIcon from '@/assets/svg/close.svg'
import style from './index.scss'
import { upLoadLib } from '@/api/library'

const NewFils = ({ visible, triggerShowPublishModal, id, parentId, getFileList }) => {
  const [title, setTitle] = useState('')

  const _createFile = async () => {
    const res = await upLoadLib({
      id: id,
      fileName: title,
      type: 'folder',
      parentId: parentId + '',
      fileSize: '1',
    })
    triggerShowPublishModal(false)
    if (res.code === 0) getFileList()
  }

  return (
    <Modal
      wrapClassName={style.modalWrapper}
      closeIcon={
        <CloseIcon onClick={() => triggerShowPublishModal(false)} className={style.closeIcon} width={18} height={18} />
      }
      width={500}
      footer={null}
      visible={visible}
    >
      <div className={style.header}>新建文件夹</div>

      <div className={style.infoWrapper}>
        <div style={{ marginTop: 18 }} className={style.otherInfo}>
          <div className={style.title0}>名称</div>

          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="" />
        </div>
      </div>

      <div className={style.createBtn}>
        <Button onClick={_createFile} className={style.btn} type="primary">
          保存
        </Button>
      </div>
    </Modal>
  )
}

export default withRouter(NewFils)
