import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'

import CloseIcon from '@/assets/svg/close.svg'
import FuwenbenIcon from '@/assets/svg/fuwenben.svg'
// import MarkdownIcon from '@/assets/svg/markdown.svg'
import style from './index.scss'
import { tagTree as getTagListApi } from '@/api/tag'
import { setItem } from '@/utils/storage'

const PublishModal = ({ visible, triggerShowPublishModal, history }) => {
  // usd: 富文本  md:MarkDown
  const [type, setType] = useState('usd')

  const getTagList = async () => {
    try {
      const res = await getTagListApi()
      setTaglist(res.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  // 存储文章类型  usd: 富文本  md:MarkDown
  const saveType = (type) => {
    setType(type)
    setItem('type', type)
  }

  // 进入文章编辑页面
  const gotoEditArticle = () => {
    triggerShowPublishModal(false)
    window.open(window.location.origin + `/publish/editor`)
    // history.push('/publish/editor')
  }

  useEffect(() => {
    getTagList()
    setItem('type', 'usd')
  }, [])

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
      <div className={style.header}>请选择知识库类型</div>
      <div className={style.infoWrapper}>
        <div className={style.selectType}>
          {/* <div
            onClick={() => saveType('md')}
            className={classnames(style.mdType, type === 'md' && style.selectType)}
          >
            <div className={style.type}>
              <MarkdownIcon width={80} height={80} />
              <div className={style.text}>Markdown</div>
            </div>
          </div> */}
          <div
            onClick={() => saveType('usd')}
            className={classnames(style.fuwenbenType, type === 'usd' && style.selectType)}
          >
            <div className={style.type}>
              <FuwenbenIcon width={80} height={80} />
              <div className={style.text}>富文本</div>
            </div>
          </div>
        </div>
        <div className={style.createBtn}>
          <Button onClick={gotoEditArticle} className={style.btn} type="primary">
            新建
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default withRouter(PublishModal)
