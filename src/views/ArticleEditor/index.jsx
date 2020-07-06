import React, { useState, useEffect } from 'react'
import MdEditor from 'for-editor'
import { withRouter } from 'react-router-dom'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css'
import { createArticle, articleDetail } from '@/api/article'

import style from './index.scss'
import { useRootStore } from '@/utils/customHooks'

const toolbar = {
  h1: true, // h1
  h2: true, // h2
  h3: true, // h3
  h4: true, // h4
  img: true, // 图片
  link: true, // 链接
  code: true, // 代码块
  preview: true, // 预览
  expand: true, // 全屏
  undo: true, // 撤销
  redo: true, // 重做
  subfield: true, // 单双栏模式
}

const ArticleEditor = ({ history, location }) => {
  // 拿到之前填写的信息
  const { articleBaseInfo } = useRootStore().articleStore

  const [value, setValue] = useState('')
  const [id, setArtcileId] = useState('')
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

  const fuwenbenOnChange = (v) => {
    console.log(v.toRAW())
    setEditorState(v)
    console.log(v.toHTML())
  }

  // 保存文章
  const onSave = async () => {
    console.log(editorState)
    console.log(editorState.toHTML())
    console.log(ContentUtils)
    setEditorState(ContentUtils.clear(editorState))

    const postData = {
      title: '测试文章标题她她她她她她她她她她她她',
      type: 'usd',
      poster: 'http://img0.imgtn.bdimg.com/it/u=2231784420,293984436&fm=26&gp=0.jpg',
      content: editorState.toHTML(),
      rawContent: editorState.toRAW(),
      tagIds: [5],
      fileIds: [],
    }
    const res = await createArticle(postData)
    if (res.code === 0) history.replace('/')
  }

  const mdEditorAddSaveBtn = () => {
    const mdToolTarget = document.querySelector('.for-toolbar').lastChild
    const btnChild = document.createElement('div')
    btnChild.textContent = '发表'
    btnChild.className = 'md-publish-btn'
    btnChild.addEventListener('click', onSave)
    mdToolTarget.appendChild(btnChild)
  }
  const getArticleDetail = async () => {
    const res = await articleDetail({ id: id })
    console.log(res)
    setEditorState(BraftEditor.createEditorState(res.data.rawContent))
  }

  useEffect(() => {
    console.log(location)
    if (location.data) {
      const searchId = location.data.id
      setArtcileId(searchId)
    }
    if (!articleBaseInfo) {
      history.replace('/')
    } else {
      articleBaseInfo.type === 'md' && mdEditorAddSaveBtn()
    }
  }, [])
  useEffect(() => {
    id && getArticleDetail()
  }, [id])

  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: (
        <div onClick={onSave} className="fuwenben-publish-btn">
          发表
        </div>
      ),
    },
  ]

  return (
    <div className={style.editorWrapper}>
      {!!articleBaseInfo && articleBaseInfo.type === 'md' ? (
        <MdEditor toolbar={toolbar} expand subfield preview value={value} onChange={setValue} />
      ) : (
        <BraftEditor extendControls={extendControls} value={editorState} onChange={fuwenbenOnChange} />
      )}
    </div>
  )
}

export default withRouter(ArticleEditor)
