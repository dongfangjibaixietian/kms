import React, { useState, useEffect } from 'react'
import MdEditor from 'for-editor'
import { withRouter } from 'react-router-dom'
import BraftEditor, { ExtendControlType } from 'braft-editor'
import 'braft-editor/dist/index.css'

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

const ArticleEditor = ({ history }) => {
  // 拿到之前填写的信息
  const { articleBaseInfo } = useRootStore().articleStore

  const [value, setValue] = useState('')

  const fuwenbenOnChange = (v) => {
    console.log(v.toHTML())
  }

  // 保存文章
  const onSave = () => {
    console.log(123)
  }

  const mdEditorAddSaveBtn = () => {
    const mdToolTarget = document.querySelector('.for-toolbar').lastChild
    const btnChild = document.createElement('div')
    btnChild.textContent = '发表'
    btnChild.className = 'md-publish-btn'
    btnChild.addEventListener('click', onSave)
    mdToolTarget.appendChild(btnChild)
  }

  useEffect(() => {
    if (!articleBaseInfo) {
      history.replace('/')
    } else {
      articleBaseInfo.textType === 1 && mdEditorAddSaveBtn()
    }
  }, [])

  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: (
        <div onClick={onSave} className="fuwenben-publish-btn">
          按钮
        </div>
      ),
    },
  ]

  return (
    <div className={style.editorWrapper}>
      {!!articleBaseInfo && articleBaseInfo.textType === 1 ? (
        <MdEditor toolbar={toolbar} expand subfield preview value={value} onChange={setValue} />
      ) : (
        <BraftEditor extendControls={extendControls} value={value} onChange={fuwenbenOnChange} />
      )}
    </div>
  )
}

export default withRouter(ArticleEditor)
