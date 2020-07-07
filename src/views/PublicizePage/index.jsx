import React, { useState, useEffect } from 'react'
import { tagTree as getTagListApi } from '@/api/tag'
import { Upload, message, Select } from 'antd'
import { LoadingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons'
import style from './index.scss'
// import { useRootStore } from '@/utils/customHooks'

const { Option, OptGroup } = Select
const PublicizePage = () => {
  const [tagList, setTagList] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
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
    <div className={style.publishForm}>
      <div className={style.formTitle}>文章封面</div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
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
    </div>
  )
}

export default PublicizePage
