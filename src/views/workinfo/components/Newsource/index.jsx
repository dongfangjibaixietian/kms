import React, { useState } from 'react'
import { Modal, Input, Button, Select, message } from 'antd'
import { withRouter } from 'react-router-dom'

import CloseIcon from '@/assets/svg/close.svg'
import style from './index.scss'
import { libCreate } from '@/api/library'
// import { getTagList as getTagListApi } from '@/service/api'

import { useRootStore } from '@/utils/customHooks'

const { Option } = Select

const NewSource = ({ visible, triggerShowPublishModal, change }) => {
  const { setArticleBaseInfo } = useRootStore().articleStore

  // const [textType] = useState(1)

  const { TextArea } = Input

  const [title, setTitle] = useState('')

  // const [tagList, setTaglit] = useState([])

  // const getTagList = async () => {
  //   try {
  //     const res = await getTagListApi()
  //     setTaglit(parseTagListToTree(res.data.tagList))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // 可见范围
  const [viewType, setViewType] = useState(1)

  // 新建知识库接口
  const _libCreate = async () => {
    if (title.length < 4) {
      message.error('名称长度不能小于四位')
      return
    }
    const data = {
      // viewType,
      title,
      // textType,
    }
    console.log(data)

    const res = await libCreate({
      name: title,
    })
    change(res.data)

    setArticleBaseInfo(data)
    triggerShowPublishModal(false)
    window.location.reload()
  }

  // useEffect(() => {
  //   getTagList()
  // }, [])

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

          <div className={style.visibleInfo}>
            <div className={style.visible}>可见范围</div>
            <Select value={viewType} onChange={(type) => setViewType(type)} className={style.select}>
              <Option value={1}>互联网可见</Option>
              <Option value={2}>仅自己可见</Option>
            </Select>
          </div>

          <div className={style.pageInfo}>
            <div className={style.page}>封面</div>
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
