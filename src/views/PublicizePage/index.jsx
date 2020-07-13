import React, { useState, useEffect } from 'react'
import { tagTree as getTagListApi } from '@/api/tag'
import { Upload, Select, Input, Button, Form, message } from 'antd'
import { getItem, removeItem } from '@/utils/storage'
// import { randomNum } from '@/utils/index'
import { LoadingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons'
import style from './index.scss'
import ArticleList from '@/components/ArticleList'
import { createArticle } from '@/api/article'
import { format } from '@gworld/toolset'

const { Option, OptGroup } = Select

const PublicizePage = ({ history }) => {
  const [tagList, setTagList] = useState([])
  const [title, setTitle] = useState('')
  const [articleId, setArticleId] = useState('')
  const [poster, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPublish, setIsPublish] = useState(false)
  const [publishDate, setPublishDate] = useState(format(new Date(), 'YYYY-MM-DD'))

  const getTagList = async () => {
    try {
      const res = await getTagListApi()
      setTagList(res.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const beforeUpload = (file) => {
    console.log('上传之前')
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
    return
    setLoading(true)
    const fileSuffix = param.file.name.split('.')[1] || 'png'
    Uploader.upload({
      file: param.file,
      type: 1, // 1 图片 2 视频 3 其他
      filename: `${randomNum()}.${fileSuffix}`, // 文件名称需要自己生成，不能包含中文
    }).then(
      (url) => {
        console.log('上传后的地址', url)
        setLoading(false)
        setImageUrl(url)
      },
      () => {
        message.error('上传失败，请再次上传')
      }
    )
  }

  // 选择的tagId
  const [selectTagIds, setSelectedTag] = useState([])

  const selectTag = (values) => {
    setSelectedTag(values)
    console.log(selectTagIds)
  }

  const publishArticle = async () => {
    // 保存文章
    const articleContent = JSON.parse(getItem('article'))
    console.log(articleContent, 'articleContent')
    const firstImg = getImgUrl(articleContent.content)
    const postData = {
      title: title,
      type: getItem('type') || 'usd',
      poster: firstImg,
      content: articleContent.content,
      rawContent: articleContent.rawContent,
      tagIds: selectTagIds,
      fileIds: [],
    }
    console.log(postData)
    const res = await createArticle(postData)
    console.log(res)
    if (res.code === 0) {
      setArticleId(res.data.id)
      window.sessionStorage.setItem('id', res.data.id)
      setPublishDate(format(new Date(), 'YYYY-MM-DD'))
      setIsPublish(true)
      removeItem('article')
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">请上传附件</div>
    </div>
  )

  useEffect(() => {
    const articleId = sessionStorage.getItem('id')
    console.log(articleId)
    if (articleId) {
      sessionStorage.removeItem('id')
      history.replace('/')
    } else {
      getTagList()
    }
  }, [])

  return (
    <div className={style.publishWrap}>
      <div className={style.main}>
        <div className={style.articleInfo}>
          {isPublish ? (
            <div>
              <div className={style.publishDate}>{publishDate}</div>
              <div
                className={style.toArticle}
                onClick={() => {
                  window.open(window.location.origin + `/article/detail?id=${articleId}`)
                }}
              >
                发布成功，点击查看文章
              </div>
            </div>
          ) : (
            <Form name="article_form" className={style.articleForm} layout="vertical" onFinish={publishArticle}>
              <Form.Item name="title" label="标题" rules={[{ required: true, message: '请填写文章标题!' }]}>
                <Input
                  allowClear
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入文章标题"
                  autoComplete="false"
                />
              </Form.Item>
              <Form.Item
                name="select-multiple"
                className={style.selectForm}
                label="标签"
                rules={[{ type: 'array', required: true, message: '请选择标签!' }]}
              >
                <Select
                  mode="multiple"
                  showArrow={true}
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
              </Form.Item>
              <div className={style.uploadModule}>
                <Form.Item name="fj" label="附件">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className={style.uploadItem}
                    showUploadList={false}
                    action=""
                    beforeUpload={beforeUpload}
                    customRequest={customUpload}
                  >
                    {poster ? <img src={poster} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Form.Item>
              </div>
              <div className={style.btnGroup}>
                <Button
                  className={style.btn}
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  返回修改
                </Button>
                <Button type="primary" htmlType="submit" className={style.btn}>
                  确认发表
                </Button>
              </div>
            </Form>
          )}
        </div>

        <div>
          <div style={{ padding: '20px', color: '#333', fontSize: '22px' }}>推荐阅读</div>
          <ArticleList isEssence={false} isHot={false} />
        </div>
      </div>
    </div>
  )
}

export default PublicizePage
