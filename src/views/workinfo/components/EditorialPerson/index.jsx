import React, { useState} from 'react'
import { Modal, Input, Button } from 'antd'
import { withRouter } from 'react-router-dom'


import CloseIcon from '@/assets/svg/close.svg'
import style from './index.scss'
import { creatUser as creatUserApi } from '@/service/api'
import { parseTagListToTree } from '@/utils'
import { useRootStore } from '@/utils/customHooks'

const EditorialPerson = ({ visible, triggerShowPublishModal, history, setIsShowModal }) => {
  const { setUserInfo } = useRootStore().userStore
  const { setArticleBaseInfo } = useRootStore().articleStore

  const [textType] = useState(1)

  const [username, setUsername] = useState('')

  const [title, setTitle] = useState('')

  const [introduction, setIntroduction] = useState('')


  const closeModal = () => {
    setUsername('')
    setIsShowModal(false)
  }

  const { TextArea } = Input;
  
  const createUser = async () => {
    try {
      const res = await creatUserApi({
        name: username,
      })
      setUserInfo(res.data.name)
    } catch (error) {
      console.log(error)
    }
    closeModal()
  }

  // 进入文章编辑页面
  // const gotoEditArticle = () => {
  //   const data = {
  //     viewType,
  //     selectedTag,
  //     title,
  //     textType,
  //   }
  //   setArticleBaseInfo(data)
  //   triggerShowPublishModal(false)
  //   history.push('/editor')
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
      <div className={style.header}>编辑资料</div>
      <div className={style.infoWrapper}>
        <div style={{ marginTop: 18 }} className={style.otherInfo}>
          <div className={style.title}>名称</div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="" />
        </div>
        <div className={style.otherInfo}>
          <div className={style.title}>简介</div>
          <TextArea  rows={4} value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="" />
        </div>
        <div className={style.otherInfo}>
          <div className={style.title}>头像</div>
        </div>
        <div className={style.createBtn}>
          <Button onClick={createUser} className={style.btn} type="primary">
            保存
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(EditorialPerson)
