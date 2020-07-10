import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd'

import { withRouter } from 'react-router-dom'

import CloseIcon from '@/assets/svg/close.svg'
import style from './index.scss'
// import { Uploader } from '@gworld/toolset'
// import { creatUser as creatUserApi } from '@/service/api'

// import { useRootStore } from '@/utils/customHooks'

const NewFils = ({
  visible,
  triggerShowPublishModal,
  // history,
  // setIsShowModal
}) => {
  // const { setUserInfo } = useRootStore().userStore
  // const { setArticleBaseInfo } = useRootStore().articleStore

  // const [username, setUsername] = useState('')

  const [title, setTitle] = useState('')

  // const [introduction, setIntroduction] = useState('')

  // const closeModal = () => {
  //   setUsername('')
  //   setIsShowModal(false)
  // }

  // const createUser = async () => {
  //   try {
  //     const res = await creatUserApi({
  //       name: username,
  //     })
  //     setUserInfo(res.data.name)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   closeModal()
  // }

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
        <Button
          // onClick={createUser}
          className={style.btn}
          type="primary"
        >
          保存
        </Button>
      </div>
    </Modal>
  )
}

export default withRouter(NewFils)
