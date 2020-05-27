import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Select } from 'antd'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { DownOutlined } from '@ant-design/icons'

import CloseIcon from '@/assets/svg/close.svg'
import FuwenbenIcon from '@/assets/svg/fuwenben.svg'
import MarkdownIcon from '@/assets/svg/markdown.svg'
import style from './index.scss'
import { getTagList as getTagListApi } from '@/service/api'
import { parseTagListToTree } from '@/utils'
import { useRootStore } from '@/utils/customHooks'

const { Option, OptGroup } = Select

const PublishModal = ({ visible, triggerShowPublishModal, history }) => {
  const { setArticleBaseInfo } = useRootStore().articleStore

  const [textType, setTextType] = useState(1)

  const [title, setTitle] = useState('')

  const [tagList, setTaglit] = useState([])

  const getTagList = async () => {
    try {
      const res = await getTagListApi()
      setTaglit(parseTagListToTree(res.data.tagList))
    } catch (error) {
      console.log(error)
    }
  }

  // 选择的tagId
  const [selectedTag, setSelectedTag] = useState([])

  const selectTag = (values) => {
    setSelectedTag(values)
  }

  // 可见范围
  const [viewType, setViewType] = useState(1)

  // 进入文章编辑页面
  const gotoEditArticle = () => {
    const data = {
      viewType,
      selectedTag,
      title,
      textType,
    }
    setArticleBaseInfo(data)
    triggerShowPublishModal(false)
    history.push('/editor')
  }

  useEffect(() => {
    getTagList()
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
          <div onClick={() => setTextType(1)} className={classnames(style.mdType, textType === 1 && style.selectType)}>
            <div className={style.type}>
              <MarkdownIcon width={80} height={80} />
              <div className={style.text}>Markdown</div>
            </div>
          </div>
          <div
            onClick={() => setTextType(2)}
            className={classnames(style.fuwenbenType, textType === 2 && style.selectType)}
          >
            <div className={style.type}>
              <FuwenbenIcon width={80} height={80} />
              <div className={style.text}>富文本</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 18 }} className={style.otherInfo}>
          <div className={style.title}>标题</div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="请输入文章标题" />
        </div>
        <div className={style.otherInfo}>
          <div className={style.title}>知识库标签</div>
          <Select
            mode="multiple"
            onChange={selectTag}
            suffixIcon={<DownOutlined />}
            className={style.select}
            style={{ width: 200 }}
          >
            {tagList.map((item, index) => (
              <OptGroup key={index} label={item.content}>
                {item.children.map((t) => (
                  <Option key={t.id} value={t.id}>
                    {t.content}
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        </div>
        <div className={style.otherInfo}>
          <div className={style.title}>可见范围</div>
          <Select value={viewType} onChange={(type) => setViewType(type)} className={style.select}>
            <Option value={1}>仅自己可见</Option>
            <Option value={2}>所有人可见</Option>
          </Select>
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
