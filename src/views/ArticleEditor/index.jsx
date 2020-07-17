import React, { useState, useEffect, useRef } from 'react'
import MdEditor from 'for-editor'
import { Upload, Select, Input, Button, Form, message, Popconfirm } from 'antd'
import { DownOutlined, FileTextOutlined, SwapOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css'
import marked from 'marked'
import { articleDetail, createArticle } from '@/api/article'
import { tagTree as getTagListApi } from '@/api/tag'
import { Uploader } from '@gworld/toolset'
import { randomNum } from '@/utils/index'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { useRootStore } from '@/utils/customHooks'
import style from './index.scss'

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
const { Option, OptGroup } = Select

const ArticleEditor = ({ history, location }) => {
  const [mdValue, setMdValue] = useState('')
  // 文章详情编辑
  const [id, setArticleId] = useState('')
  // 选择的tagId
  const [selectTagIds, setSelectedTag] = useState([])
  // 标签列表
  const [tagList, setTagList] = useState([])
  // 文章标题
  const [title, setTitle] = useState('')
  // 设置文章封面
  // const [poster, setImageUrl] = useState('')
  // 可见范围
  const [viewType, setViewType] = useState(1)
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  // 获取文章类型 md: markdown use:富文本
  const [editorType, setEditorType] = useState('md')
  const { setModelVisible, isLogin } = useRootStore().userStore
  const [articleForm] = Form.useForm()

  const getTagList = async () => {
    try {
      const res = await getTagListApi()
      setTagList(res.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小小于2M')
    }
    return isJpgOrPng && isLt2M
  }

  // 获取富文本内容中第一张图片
  const getImgUrl = function (str) {
    let data = ''
    str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, (match, capture) => {
      data = capture
    })
    return data
  }

  const customUpload = (param) => {
    console.log(param.file, 'customUpload')
    message.info('功能正在完善，敬请期待')
  }

  // 富文本编辑保存
  const fuwenbenOnChange = (v) => {
    setEditorState(v)
    if (id) return
    // 储存文章
    setItem(
      'article',
      JSON.stringify({
        type: editorType,
        content: v.toHTML(),
        rawContent: v.toRAW(),
      })
    )
  }

  // MD编辑保存
  const handleChange = (value) => {
    setMdValue(value)
    // 储存文章
    setItem(
      'article',
      JSON.stringify({
        type: editorType,
        content: marked(value),
        rawContent: value,
      })
    )
  }

  //获取文章详情
  const getArticleDetail = async () => {
    const res = await articleDetail({ id: id })
    const tagIds = []
    res.data.tags.forEach((item) => {
      tagIds.push(item.id)
    })
    setSelectedTag(tagIds)
    setTitle(res.data.title)
    // 重置表单
    articleForm.setFieldsValue({ title: res.data.title })
    articleForm.setFieldsValue({ 'select-multiple': tagIds })
    if (res.data.type === 'usd') {
      setEditorState(BraftEditor.createEditorState(res.data.rawContent))
    } else {
      setMdValue(res.data.rawContent)
    }
  }

  // 进入文章发布成功页面
  const goToPublicizePage = (id) => {
    const data = {
      id: id,
    }
    history.push({ pathname: '/publicize', data })
  }

  // 保存文章
  const publishArticle = async () => {
    if (!getItem('token') || !isLogin) {
      message.error('登录过期，请重新登录')
      setModelVisible(true)
      return
    }
    const isUsd = editorType === 'usd'
    if ((isUsd && editorState.isEmpty()) || (!isUsd && mdValue === '')) {
      return message.error('请输入文章内容')
    }

    const firstImg = getImgUrl(isUsd ? editorState.toHTML() : marked(mdValue))
    const postData = {
      title: title,
      type: editorType,
      poster: firstImg,
      content: isUsd ? editorState.toHTML() : marked(mdValue),
      rawContent: isUsd ? editorState.toRAW() : mdValue,
      tagIds: selectTagIds,
      fileIds: [],
    }
    if (id) {
      postData['id'] = Number(id)
    }
    const res = await createArticle(postData)
    if (res.code === 0) {
      if (isUsd) {
        setEditorState(ContentUtils.clear(editorState))
      } else {
        setMdValue('')
      }

      articleForm.resetFields()
      goToPublicizePage(res.data.id)
      removeItem('article')
    }
  }

  const selectTag = (values) => {
    setSelectedTag(values)
  }

  const $vm = React.createRef()
  const addImg = ($file) => {
    if (!beforeUpload($file)) return
    const fileSuffix = $file.name.split('.')[1] || 'png'
    Uploader.upload({
      file: $file,
      type: 1, // 1 图片 2 视频 3 其他
      filename: `${randomNum()}.${fileSuffix}`, // 文件名称需要自己生成，不能包含中文
    }).then(
      (url) => {
        $vm.current.$img2Url($file.name, url)
      },
      () => {
        message.error('上传失败，请再次上传')
      }
    )
  }

  const uploadFn = (param) => {
    const fileSuffix = param.file.name.split('.')[1] || 'png'
    Uploader.upload({
      file: param.file,
      type: 1, // 1 图片 2 视频 3 其他
      filename: `${randomNum()}.${fileSuffix}`, // 文件名称需要自己生成，不能包含中文
    }).then(
      (url) => {
        param.success({
          url: url,
          meta: {
            id: param.file.id,
          },
        })
      },
      () => {
        param.error({
          msg: '上传失败，请再次上传',
        })
      }
    )
  }

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div className="ant-upload-text">请上传附件</div>
  //   </div>
  // )

  // 确认切换编辑器类型
  const confirm = () => {
    const type = editorType === 'usd' ? 'md' : 'usd'
    setEditorType(type)
    setItem('type', type)
    setEditorState(ContentUtils.clear(editorState))
    setSelectedTag([])
    setTitle([])
    removeItem('article')
  }

  const templateHtml = (
    <Popconfirm
      title="切换编辑器后，当前已编辑内容会丢失，请确认是否需要切换？"
      onConfirm={confirm}
      overlayClassName={style.editorPop}
      icon=""
      okText="确认"
      cancelText="取消"
    >
      <div className="fuwenben-publish-btn">
        <SwapOutlined />
        {editorType === 'usd' ? '切换MarkDown编辑器' : '切换富文本编辑器'}
      </div>
    </Popconfirm>
  )

  const extendControls = [
    'separator',
    {
      key: 'editor-type',
      type: 'button',
      className: 'change-button',
      html: ``,
      text: !id ? templateHtml : null,
    },
  ]

  useEffect(() => {
    getTagList()
    const type = getItem('type')
    setEditorType(type)
    if (location.data && location.data.id) {
      const searchId = location.data.id
      sessionStorage.setItem('articleId', searchId)
      setArticleId(searchId)
    } else {
      setArticleId(sessionStorage.getItem('articleId'))
    }
  }, [])

  useEffect(() => {
    const articleContent = JSON.parse(getItem('article'))
    if (editorType === 'usd') {
      const rawContent = articleContent
        ? BraftEditor.createEditorState(articleContent.rawContent)
        : BraftEditor.createEditorState(null)
      setEditorState(rawContent)
    } else {
      const mdRawContent = articleContent ? articleContent.rawContent : ''
      setMdValue(mdRawContent)
    }

    id && getArticleDetail()
  }, [id])

  return (
    <div className={`${style.editorWrapper} ${id ? style.toEditor : null}`}>
      <div className={style.publishTop}>
        <div className={style.publishIcon}>
          <FileTextOutlined className="site-form-item-icon" style={{ fontSize: '20px' }} twoToneColor="#eb2f96" />
        </div>
        <span className={style.publishTitle}>发表文章</span>
      </div>
      <Form
        name="article_form"
        className={style.articleForm}
        layout="horizontal"
        onFinish={publishArticle}
        form={articleForm}
        hideRequiredMark={true}
        initialValues={{
          title: '',
          ['select-multiple']: [],
        }}
      >
        <div className={style.formItem}>
          <Form.Item name="title" label="文章标题" rules={[{ required: true, message: '请填写文章标题!' }]}>
            <Input allowClear value={title} onChange={(e) => setTitle(e.target.value)} placeholder="请输入标题" />
          </Form.Item>
        </div>
        <div className={style.editorContent}>
          {editorType === 'md' ? (
            <div>
              <MdEditor
                ref={$vm}
                toolbar={toolbar}
                subfield
                preview
                value={mdValue}
                onChange={handleChange}
                addImg={($file) => addImg($file)}
                onSave={(value) => handleChange(value)}
                className={style.mdEditor}
              />
              {!id ? (
                <Popconfirm
                  title="切换编辑器后，当前已编辑内容会丢失，请确认是否需要切换？"
                  onConfirm={confirm}
                  overlayClassName={style.editorPop}
                  icon=""
                  okText="确认"
                  cancelText="取消"
                >
                  <div className="md-btn">
                    <SwapOutlined />
                    {editorType === 'usd' ? '切换MarkDown编辑器' : '切换富文本编辑器'}
                  </div>
                </Popconfirm>
              ) : null}
            </div>
          ) : (
            <BraftEditor
              extendControls={extendControls}
              placeholder="请输入内容"
              media={{
                uploadFn: uploadFn,
                validateFn: beforeUpload,
                accepts: {
                  audio: false,
                  video: false,
                },
                externals: {
                  image: true,
                },
              }}
              value={editorState}
              onChange={fuwenbenOnChange}
            />
          )}
        </div>

        <div className={`${style.formItem} ${style.otherItem}`}>
          <Form.Item
            name="select-multiple"
            className={style.selectForm}
            label="知识库标签"
            rules={[{ type: 'array', required: true, message: '请选择标签!' }]}
          >
            <Select
              mode="multiple"
              showArrow={true}
              onChange={selectTag}
              suffixIcon={<DownOutlined />}
              className={style.select}
              style={{ width: 360 }}
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
          </Form.Item>
        </div>

        <div className={`${style.formItem} ${style.otherItem}`}>
          <Form.Item name="viewType" className={style.selectForm} label="可见范围">
            <Select
              value={viewType}
              onChange={(type) => setViewType(type)}
              className={style.select}
              style={{ width: 200 }}
            >
              <Option value={1}>仅自己可见</Option>
              <Option value={2}>所有人可见</Option>
            </Select>
          </Form.Item>
        </div>

        <div className={style.formItem} style={{ display: 'none' }}>
          <Form.Item name="fj" label="附件">
            <Upload
              listType="picture-card"
              className={style.uploadItem}
              showUploadList={false}
              action=""
              beforeUpload={beforeUpload}
              customRequest={customUpload}
            >
              {/* {poster ? <img src={poster} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
            </Upload>
          </Form.Item>
        </div>
        <div className={style.btnGroup}>
          {/* <Button
            className={style.btn}
            onClick={() => {
              message.info('敬请期待')
            }}
          >
            保存草稿
          </Button> */}
          <Button type="primary" htmlType="submit" className={style.btn}>
            发表
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default withRouter(ArticleEditor)
