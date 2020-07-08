import React, { useState, useEffect } from 'react'
import MdEditor from 'for-editor'
import { withRouter } from 'react-router-dom'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css'
import marked from 'marked'
import { createArticle, articleDetail } from '@/api/article'
import { Uploader } from '@gworld/toolset'
import { randomNum } from '@/utils/index'
import { message } from 'antd'

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
  save: true,
}

let content = ''
const ArticleEditor = ({ history, location }) => {
  // 拿到之前填写的信息
  const { articleBaseInfo } = useRootStore().articleStore

  const [mdValue, setMdValue] = useState('')
  const [id, setArtcileId] = useState('')
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  // 获取文章类型 md: markdown use:富文本
  const [editorType, setEditorType] = useState('md')

  // 储存文章
  const saveStorage = () => {
    localStorage.setItem(
      'article',
      JSON.stringify({
        content: editorType === 'usd' ? editorState.toHTML() : mdValue,
        rawContent: editorType === 'usd' ? editorState.toRAW() : html,
      })
    )
  }

  const fuwenbenOnChange = (v) => {
    console.log(v.toRAW())
    setEditorState(v)
    !id && saveStorage()
    console.log(v.toHTML())
  }

  const handleChange = (value) => {
    console.log(value)
    setMdValue(value)
    content = value
    setTv(110)
    console.log(mdValue, 'change')
  }

  // 保存文章
  const saveArticle = async () => {
    console.log(editorType)

    const html = marked(content)
    const imgList = [
      'http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/267f9e2f07082838685c484ab999a9014c08f11f.jpg',
      'http://d.hiphotos.baidu.com/zhidao/pic/item/e61190ef76c6a7efd517f640fbfaaf51f3de66a6.jpg',
      'http://img3.imgtn.bdimg.com/it/u=3773584324,1413178473&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=1913434539,31339250&fm=11&gp=0.jpg',
    ]
    const titleList = [
      'Chrome DevTools中的这些骚操作，你都知道吗？',
      '离线预渲染OPR：0成本接入 媲美SSR效果',
      '如何实现防抖和节流，以及他们的使用场景是什么？',
      '很多人不知道可以使用这种 key 的方式来对 Vue 组件时行重新渲染',
    ]
    const tagList = [9, 10, 11, 12, 13]
    console.log(html)
    const postData = {
      title: titleList[Math.floor(Math.random() * titleList.length)],
      type: 'usd',
      poster: imgList[Math.floor(Math.random() * imgList.length)],
      content: editorType === 'usd' ? editorState.toHTML() : mdValue,
      rawContent: editorType === 'usd' ? editorState.toRAW() : html,
      tagIds: [tagList[Math.floor(Math.random() * tagList.length)]],
      fileIds: [],
    }

    !id && saveStorage()
    console.log(postData)
    const res = await createArticle(postData)
    if (res.code === 0) {
      if (editorType === 'usd') {
        setEditorState(ContentUtils.clear(editorState))
      }
      history.replace('/')
      localStorage.removeItem('article')
    }
  }

  const handleSave = (value) => {
    console.log(this)
    console.log('保存====', value)
    setMdValue(value)
    console.log(mdValue)
  }

  const mdEditorAddSaveBtn = () => {
    const mdToolTarget = document.querySelector('.for-toolbar').lastChild
    const btnChild = document.createElement('div')
    btnChild.textContent = '发表'
    btnChild.className = 'md-publish-btn'
    btnChild.addEventListener('click', () => {
      saveArticle()
    })
    mdToolTarget.appendChild(btnChild)
  }

  const getArticleDetail = async () => {
    const res = await articleDetail({ id: id })
    console.log(res)
    setEditorState(BraftEditor.createEditorState(res.data.rawContent))
  }

  const $vm = React.createRef()
  const addImg = ($file) => {
    $vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  }

  const uploadFn = (param) => {
    console.log(randomNum())
    console.log(param)
    const fileSuffix = param.file.name.split('.')[1] || 'png'
    Uploader.upload({
      file: param.file,
      type: 1, // 1 图片 2 视频 3 其他
      filename: `${randomNum()}.${fileSuffix}}`, // 文件名称需要自己生成，不能包含中文
    }).then(
      (url) => {
        console.log('上传后的地址', url)
        param.success({
          url: url,
          meta: {
            id: param.file.id,
          },
        })
        // 获得缩略图
        //Uploader.getCompressImage(url, 100) // 第二个参数代表需要缩略图的宽度
      },
      () => {
        param.error({
          msg: '上传失败，请再次上传',
        })
      }
    )
  }

  const validateFn = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传jpg/png文件')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过不超过2M')
    }
    return isJpgOrPng && isLt2M
  }

  const onInsert = (param) => {
    console.log('onInsert', param)
  }

  const braftEditorChange = (param) => {
    console.log('braftEditorChange', param)
  }

  useEffect(() => {
    console.log(articleBaseInfo)
    const type = localStorage.getItem('type')
    setEditorType(type)
    if (location.data) {
      const searchId = location.data.id
      setArtcileId(searchId)
    }
    type === 'md' && mdEditorAddSaveBtn()
  }, [])

  useEffect(() => {
    const articleContent = JSON.parse(localStorage.getItem('article'))
    const rawContent = articleContent
      ? BraftEditor.createEditorState(articleContent.rawContent)
      : BraftEditor.createEditorState(null)
    setEditorState(rawContent)
    console.log(articleContent, 'articleContent')
    id && getArticleDetail()
  }, [id])

  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: (
        <div onClick={saveArticle} className="fuwenben-publish-btn">
          发表
        </div>
      ),
    },
  ]

  return (
    <div className={style.editorWrapper}>
      {editorType === 'md' ? (
        <MdEditor
          ref={$vm}
          toolbar={toolbar}
          expand
          subfield
          preview
          value={mdValue}
          onChange={handleChange}
          addImg={($file) => addImg($file)}
          onSave={(value) => handleSave(value)}
        />
      ) : (
        <BraftEditor
          extendControls={extendControls}
          media={{
            uploadFn: uploadFn,
            validateFn: validateFn,
            accepts: {
              audio: false,
            },
            externals: {
              image: true,
              video: true,
            },
            onInsert: onInsert,
            onChange: braftEditorChange,
          }}
          value={editorState}
          onChange={fuwenbenOnChange}
        />
      )}
    </div>
  )
}

export default withRouter(ArticleEditor)
