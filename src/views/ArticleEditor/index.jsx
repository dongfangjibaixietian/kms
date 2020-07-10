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

  const fuwenbenOnChange = (v) => {
    console.log(v.toRAW())
    setEditorState(v)
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
    console.log(articleBaseInfo.type)
    if (articleBaseInfo.type === 'usd') {
      setEditorState(ContentUtils.clear(editorState))
    }
    const html = marked(content)
    const imgList = [
      'http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/267f9e2f07082838685c484ab999a9014c08f11f.jpg',
      'http://d.hiphotos.baidu.com/zhidao/pic/item/e61190ef76c6a7efd517f640fbfaaf51f3de66a6.jpg',
      'http://img3.imgtn.bdimg.com/it/u=3773584324,1413178473&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=1913434539,31339250&fm=11&gp=0.jpg',
    ]
    const tagList = [9, 10, 11, 12, 13]
    console.log(html)
    const postData = {
      title: articleBaseInfo.title || '测试问问我呢我呢问问问问',
      type: 'usd',
      poster: imgList[Math.floor(Math.random() * imgList.length)],
      content: articleBaseInfo.type === 'usd' ? editorState.toHTML() : mdValue,
      rawContent: articleBaseInfo.type === 'usd' ? editorState.toRAW() : html,
      tagIds: [tagList[Math.floor(Math.random() * tagList.length)]],
      fileIds: [],
    }
    console.log(postData)
    return
    const res = await createArticle(postData)
    if (res.code === 0) history.replace('/')
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

    Uploader.upload({
      file: param.file,
      type: 1, // 1 图片 2 视频 3 其他
      filename: randomNum(), // 文件名称需要自己生成，不能包含中文
    }).then((url) => {
      console.log('上传后的地址', url)
      param.success({
        url: url,
        meta: {
          id: param.file.id,
        },
      })
      // 获得缩略图
      //Uploader.getCompressImage(url, 100) // 第二个参数代表需要缩略图的宽度
    })

    // const progressFn = (event) => {
    //   // 上传进度发生变化时调用param.progress
    //   param.progress((event.loaded / event.total) * 100)
    // }

    // const errorFn = (response) => {
    //   // 上传发生错误时调用param.error
    //   param.error({
    //     msg: 'unable to upload.',
    //   })
    // }

    // xhr.upload.addEventListener('progress', progressFn, false)
    // xhr.addEventListener('load', successFn, false)
    // xhr.addEventListener('error', errorFn, false)
    // xhr.addEventListener('abort', errorFn, false)

    // fd.append('file', param.file)
    // xhr.open('POST', serverURL, true)
    // xhr.send(fd)
  }

  useEffect(() => {
    console.log(articleBaseInfo)
    if (location.data) {
      const searchId = location.data.id
      setArtcileId(searchId)
    }

    // articleBaseInfo.type === 'md' && mdEditorAddSaveBtn()
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
        <div onClick={saveArticle} className="fuwenben-publish-btn">
          发表
        </div>
      ),
    },
  ]

  return (
    <div className={style.editorWrapper}>
      {!!articleBaseInfo && articleBaseInfo.type === 'md' ? (
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
            accepts: {
              audio: false,
              image: false,
            },
          }}
          value={editorState}
          onChange={fuwenbenOnChange}
        />
      )}
    </div>
  )
}

export default withRouter(ArticleEditor)
