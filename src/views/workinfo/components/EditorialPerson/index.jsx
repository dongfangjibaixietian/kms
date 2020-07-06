import React, { useState } from 'react'
import { Modal, Input, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
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

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
  }

  const { TextArea } = Input

  //以下为上传文件功能
  // const fileList = [
  //   {
  //     uid: '-1',
  //     name: 'xxx.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ]

  const props = {
    // 此处为上传的地址
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    // defaultFileList: [...fileList],

    //上传文件改变时的状态
    onChange(info) {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true })
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            imageUrl,
            loading: false,
          })
        )
      }
    },
  }
  //以上为上传文件功能

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
          <div className={style.title0}>名称</div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="" />
        </div>
        <div className={style.introduction}>
          <div className={style.title1}>简介</div>
          <TextArea rows={4} value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="" />
        </div>
        <div className={style.otherInfo}>
          <div className={style.title2}>头像</div>

          <div className={style.uplo}>
            <img className={style.pic} src="/src/assets/img/superG.png" alt="" />
            <div className={style.rightdiv}>
              <div className={style.but}>
                <Upload {...props}>
                  <Button>
                    <UploadOutlined /> Upload
                  </Button>
                </Upload>
              </div>
              <div className={style.smallword}>支持图片类型：png,jpg,gif</div>
            </div>
          </div>
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
