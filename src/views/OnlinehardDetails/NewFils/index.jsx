import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd'

import { withRouter } from 'react-router-dom'

import CloseIcon from '@/assets/svg/close.svg'
import style from './index.scss'
import { upLoadLib } from '@/api/library'
// import { Uploader } from '@gworld/toolset'
// import { creatUser as creatUserApi } from '@/service/api'

// import { useRootStore } from '@/utils/customHooks'

const NewFils = ({
  visible,
  triggerShowPublishModal,
  id,
  parentId,
  // history,
  // setIsShowModal
}) => {
  // const { setUserInfo } = useRootStore().userStore
  // const { setArticleBaseInfo } = useRootStore().articleStore

  // const [username, setUsername] = useState('')

  const [title, setTitle] = useState('')

  // const [introduction, setIntroduction] = useState('')

  const _createFile = async () => {
    console.log(1234564545)
    console.log(id)
    console.log(parentId)
    const res = await upLoadLib({
      id: id,
      fileName: title,
      type: 'folder',
      parentId: parentId + '',
      fileSize: '1',
    })
    // setUserInfo(res.data.name)
    triggerShowPublishModal(false)
    console.log(res)
    window.location.reload()
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
