import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Upload, message } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import style from './index.scss'
import MemberManger from './membermanger'
import NewFils from './NewFils/index.jsx'

import { libFileList, upLoadLib } from '@/api/library'
import { getUrlSearch, sizeTostr } from '@/utils'
import { Uploader, format } from '@gworld/toolset'
import { randomNum } from '@/utils/index'

const OnlinehardDetails = ({ location }) => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  const [dataList, setList] = useState([])

  const [id, setOnLineHardId] = useState('')
  const [setUrl] = useState('')
  const [parentId, setParentId] = useState('0')
  // const [layerId, setLayerId] = useState('')

  const getFileList = async () => {
    const res = await libFileList({
      //知识库id
      id: id,
      parentId: parentId,
    })
    res.data.list.map((item, index) => {
      item.key = index
    })
    setList(res.data.list)
  }

  const _upLoadLib = async (file, url) => {
    let fileType = file.name.split('.')[1] || 'png'

    if (fileType == 'png') {
      fileType = 'img'
    }
    if (fileType == 'doc' || 'docx') {
      fileType = 'word'
    }
    if (fileType == 'xls' || 'xlsx') {
      fileType = 'excel'
    }
    // 图片格式

    const res = await upLoadLib({
      id: id,
      fileName: file.name,
      fileSize: file.size,
      type: fileType,
      fileUrl: url,
      parentId: parentId,
    })
    if (res.code === 0) getFileList()
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },

    customRequest: (info) => {
      const fileSuffix = info.file.name.split('.')[1] || 'png'
      Uploader.upload({
        file: info.file,
        type: 3, // 1 图片 2 视频 3 其他
        filename: `${randomNum()}.${fileSuffix}`, // 文件名称需要自己生成，不能包含中文
      }).then((url) => {
        // setUrl(url)
        // console.log(info.file.name)
        // setFiName(info.file.name)
        // console.log(info.file.size)
        // setFileSize(info.file.size)
        // console.log(info.file.type)
        // setFileType(info.file.type)
        // if (isLoading || !hasMore) return
        // setLoading(true)
        // console.log(1111111111)
        // console.log(id)
        const file = info.file
        _upLoadLib(file, url)
        // change(url)
      })
    },
  }

  const toNextfiles = (item) => {
    if (item.type !== 'folder') return
    setParentId(item.id)
    getFileList()
  }

  // function backBtn() {
  //   setParentId(layerId)
  //   getFileList()
  // }

  const download = (row) => {
    window.open(row.fileUrl)
  }

  useEffect(() => {
    id && getFileList()
  }, [id, parentId])

  useEffect(() => {
    const searchId = getUrlSearch(window.location.search)
    setOnLineHardId(searchId.id)
  }, [])

  // useEffect(() => {
  //   console.log(location)
  //   if (location.data && location.data.id) {
  //     const searchId = location.data.id
  //     sessionStorage.setItem('hardId', searchId)
  //     setOnLineHardId(searchId)
  //   } else {
  //     setOnLineHardId(sessionStorage.getItem('hardId'))
  //   }
  // }, [])

  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      width: 500,
      render: (text, item) => {
        // if (record == 0) {
        //   return '-'
        // }
        return (
          <div
            onClick={() => {
              toNextfiles(item)
            }}
          >
            {item.type === 'folder' ? (
              <img src={require('@/assets/img/file.png').default} className={style.filepng} />
            ) : (
              <FileImageOutlined
                className="site-form-item-icon"
                style={{ fontSize: '20px', marginRight: '10px' }}
                twoToneColor="#eb2f96"
              />
              // <img src={require('@/assets/img/document.png').default} className={style.filepng} />
            )}
            {text}
          </div>
        )
      },
    },
    {
      title: '大小',
      dataIndex: 'fileSize',
      render: (text, item) => {
        console.log(item)
        if (item.type === 'folder') {
          return ''
        }
        return sizeTostr(text)
      },
    },
    {
      title: '上传人',
      dataIndex: 'userId',
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      render: (text) => {
        return format(text, 'YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '管理',
      dataIndex: 'manage',
      key: 'action',
      render: (text, record, row) => {
        if (record.type == 'folder') return ''
        return (
          <Space size="middle">
            <a
              onClick={() => {
                download(record, row)
              }}
            >
              下载
            </a>
          </Space>
        )
      },
    },
    //删除页面，没有接口，暂时取消功能
    // {
    //   title: '',
    //   dataIndex: 'image',
    //   render: (text, item, record) => {
    //     return (
    //       <div>
    //         <img
    //           src="/src/assets/img/moreactions.png"
    //           onClick={({}) => {
    //             Modal.confirm({
    //               title: '确认',
    //               content: `您确认要删除此条数据吗`,
    //               onOk: () => {
    //                 message.success('删除成功')
    //                 //问题：key值是不变的，删除后不能根据key值判断，需要重新遍历一遍
    //                 dataList.map((item, index) => {
    //                   item.key = index
    //                 })
    //                 const delIndex = dataList.findIndex((item) => record === item.key)
    //                 const copyList = [...dataList]
    //                 copyList.splice(delIndex, 1)
    //                 setList(copyList)
    //                 //下面是用过滤器删除文章
    //                 // const copyList = [...dataList]
    //                 // setList(copyList.filter(item => item.key !== record))
    //               },
    //             })
    //           }}
    //         />
    //       </div>
    //     )
    //   },
    // },
  ]

  const [flag] = useState(true)

  function onChange(pagination, filters, extra) {
    console.log('params', pagination, filters, extra)
  }

  //flag控制成员管理页面与主页面切换
  // function changeflag() {
  //   console.log(123)
  //   setFlag(!flag)
  // }

  return (
    <div className={style.harddrive}>
      <div className={style.memtit}>
        <div className={style.lefthardword}>
          <div className={style.hardword}>超G名片设计资料文件库</div>
        </div>

        <div className={style.operate}>
          {/* <Button type="primary" className={style.btn} onClick={changeflag}>
            成员管理
          </Button> */}
          <Button className={style.btn} onClick={() => triggerShowPublishModal(true)}>
            新建文件夹
          </Button>
          <Upload {...props}>
            <Button type="primary" className={style.btn}>
              上传文件
            </Button>
          </Upload>
        </div>
      </div>

      <div className={style.tablewarp}>
        {flag ? (
          <Table className={style.table} columns={columns} dataSource={dataList} onChange={onChange} />
        ) : (
          <MemberManger />
        )}
      </div>

      {/* <Button className={style.backBtn} onClick={backBtn}>
        返回第一层
      </Button> */}
      {publishModalVisible && (
        <NewFils
          id={id}
          parentId={parentId}
          getFileList={getFileList}
          triggerShowPublishModal={triggerShowPublishModal}
          visible={publishModalVisible}
        />
      )}
    </div>
  )
}

export default OnlinehardDetails
