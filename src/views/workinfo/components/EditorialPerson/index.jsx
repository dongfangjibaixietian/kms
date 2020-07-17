import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

import CloseIcon from '@/assets/svg/close.svg'
import style from './index.scss'
import { Uploader } from '@gworld/toolset'
import { randomNum } from '@/utils/index'
import { editUserInfo } from '@/api/user'
import { useRootStore } from '@/utils/customHooks'

const EditorialPerson = ({ visible, triggerShowPublishModal, change }) => {
  const { userInfo } = useRootStore().userStore

  // const userInfo = window.localStorage.getItem(user)

  // console.log(userInfo)

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const [introduction, setIntroduction] = useState('')

  const saveUser = async () => {
    if (title.length < 2) {
      message.error('名字长度不能小于两位')
      return
    }
    if (introduction.length == 0) {
      message.error('简介不能为空')
      return
    }
    const res = await editUserInfo({
      nickname: title,
      avatar: url,
      description: introduction,
    })
    triggerShowPublishModal(false)
    if (res.code === 0) change()
  }

  const { TextArea } = Input

  const props = {
    name: 'file',
    action: '',
    customRequest: (param) => {
      const fileSuffix = param.file.name.split('.')[1] || 'png'
      Uploader.upload({
        file: param.file,
        type: 1, // 1 图片 2 视频 3 其他
        filename: `${randomNum()}.${fileSuffix}`, // 文件名称需要自己生成，不能包含中文
      }).then((url) => {
        setUrl(url)
      })
    },
  }

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
  useEffect(() => {
    if (userInfo) {
      setTitle(userInfo.user.nickname)
      setUrl(userInfo.user.avatar)
      setIntroduction(userInfo.user.description)
    }
  }, [])

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
          <div className={style.title0}>昵称</div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="" />
        </div>
        <div className={style.introduction}>
          <div className={style.title1}>简介</div>
          <TextArea rows={4} value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="" />
        </div>
        <div className={style.otherInfo}>
          <div className={style.title2}>头像</div>

          <div className={style.uplo}>
            <img className={style.pic} src={url} alt="" />
            <div className={style.rightdiv}>
              <div className={style.but}>
                <Upload {...props}>
                  <Button>
                    <UploadOutlined /> 更换头像
                  </Button>
                </Upload>
              </div>
              <div className={style.smallword}>支持图片类型：png,jpg,gif</div>
            </div>
          </div>
        </div>
        <div className={style.createBtn}>
          <Button onClick={saveUser} className={style.btn} type="primary">
            保存
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(EditorialPerson)
