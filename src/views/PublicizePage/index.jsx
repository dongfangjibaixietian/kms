import React, { useState, useEffect } from 'react'
import { tagTree as getTagListApi } from '@/api/tag'
import { Upload, Select, Input, Button, Form, message } from 'antd'
import { LoadingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons'
import style from './index.scss'
import ArticleList from '@/components/ArticleList'

const { Option, OptGroup } = Select
const PublicizePage = () => {
  const [tagList, setTagList] = useState([])
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPublish, setIsPublish] = useState(false)

  const getTagList = async () => {
    try {
      const res = await getTagListApi()
      // setTaglist(parseTagListToTree(res.data.list))
      setTagList(res.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false)
        setImageUrl(imageUrl)
      })
    }
  }

  // 选择的tagId
  const [selectedTag, setSelectedTag] = useState([])

  const selectTag = (values) => {
    console.log(selectedTag)
    setSelectedTag(values)
  }

  const publishArticle = () => {
    setIsPublish(true)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">请上传封面</div>
    </div>
  )

  useEffect(() => {
    getTagList()
  }, [])

  return (
    <div className={style.publishWrap}>
      <div className={style.main}>
        <div className={style.articleInfo}>
          {isPublish ? (
            <div>
              <div className={style.publishDate}>2017-2-12</div>
              <div
                className={style.toArticle}
                onClick={() => {
                  window.open(window.location.origin + `/article/detail?id=28`)
                }}
              >
                发布成功，点击查看文章
              </div>
            </div>
          ) : (
            <Form name="article_form" className={style.articleForm} layout="vertical" onFinish={publishArticle}>
              <Form.Item name="title" label="标题">
                <Input allowClear value={title} placeholder="请输入文章标题" autoComplete="false" />
              </Form.Item>
              <Form.Item name="password" label="标签">
                <div className={style.otherInfo}>
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
                </div>
              </Form.Item>
              <div className={style.uploadModule}>
                <Form.Item name="fm" label="封面">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className={style.uploadItem}
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Form.Item>
                <Form.Item name="fj" label="附件">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className={style.uploadItem}
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Form.Item>
              </div>
              <div className={style.btnGroup}>
                <Button className={style.btn}>返回修改</Button>
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
