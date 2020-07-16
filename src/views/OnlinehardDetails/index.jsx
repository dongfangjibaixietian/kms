import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Upload, message, Modal } from 'antd'

import style from './index.scss'
import MemberManger from './membermanger'
import NewFils from './NewFils/index.jsx'

import { libFileList, upLoadLib } from '@/api/library'
import { getUrlSearch, formateTime } from '@/utils'
import { Uploader } from '@gworld/toolset'
import { randomNum } from '@/utils/index'

const OnlinehardDetails = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  const [dataList, setList] = useState([])

  const [id, setOnLineHardId] = useState('')
  const [url, setUrl] = useState('')
  const [parentId, setParentId] = useState('0')

  const getFileList = async () => {
    const res = await libFileList({
      //知识库id
      id: id,
      parentId: parentId,
    })
    console.log(res.data)
    res.data.list.map((item, index) => {
      item.key = index
    })
    setList(res.data.list)
  }

  const _upLoadLib = async (file, url) => {
    console.log(file)
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
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },

    customRequest: (info) => {
      console.log(randomNum())
      console.log(info)
      const fileSuffix = info.file.name.split('.')[1] || 'png'
      console.log(fileSuffix)
      Uploader.upload({
        file: info.file,
        type: 3, // 1 图片 2 视频 3 其他
        filename: `${randomNum()}.${fileSuffix}`, // 文件名称需要自己生成，不能包含中文
      }).then((url) => {
        console.log('上传后的地址', url)
        setUrl(url)
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
        console.log(file)
        _upLoadLib(file, url)
        // change(url)
      })
    },
  }

  const toNextfiles = (item) => {
    console.log(item.type)
    if (item.type !== 'folder') return
    setParentId(item.id)
    console.log(parentId)
    getFileList()
  }

  const download = (row) => {
    console.log(row)
    window.open(row.fileUrl)
  }

  useEffect(() => {
    id && getFileList()
  }, [id])

  useEffect(() => {
    const searchId = getUrlSearch(window.location.search)
    setOnLineHardId(searchId.id)
  }, [])

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
              <img src="/src/assets/img/file.png" className={style.filepng} />
            ) : (
              <img src="/src/assets/img/document.png" className={style.filepng} />
            )}
            {text}
          </div>
        )
      },
    },
    {
      title: '大小',
      dataIndex: 'fileSize',
    },
    {
      title: '上传人',
      dataIndex: 'userId',
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      render: (text, item, record, index) => {
        return formateTime(text)

        //text是时间，即是内容
        console.log(text)
        //record是行索引
        console.log(record)
        console.log(index)
        //item是行的文件总信息
        console.log(item)
      },
    },
    {
      title: '管理',
      dataIndex: 'manage',
      key: 'action',
      render: (text, record, row) => {
        if (record.type !== 'folder')
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
        if (record.type == 'folder')
          return (
            <Space size="middle">
              <a>下载</a>
            </Space>
          )
      },
    },
    {
      title: '',
      dataIndex: 'image',
      render: (text, item, record) => {
        return (
          <div>
            <img
              src="/src/assets/img/moreactions.png"
              onClick={({}) => {
                console.log(item)
                console.log(record)
                Modal.confirm({
                  title: '确认',
                  content: `您确认要删除此条数据吗`,
                  onOk: () => {
                    message.success('删除成功')
                    console.log(dataList)
                    //问题：key值是不变的，删除后不能根据key值判断，需要重新遍历一遍
                    dataList.map((item, index) => {
                      item.key = index
                    })
                    const delIndex = dataList.findIndex((item) => record === item.key)
                    const copyList = [...dataList]
                    copyList.splice(delIndex, 1)
                    setList(copyList)
                    //下面是用过滤器删除文章
                    // const copyList = [...dataList]
                    // setList(copyList.filter(item => item.key !== record))
                  },
                })
              }}
            />
          </div>
        )
      },
    },
  ]

  const dataone = [
    {
      key: '1',
      filename: (
        <div>
          <img src="/src/assets/img/file.png" className={style.filepng} />
          {'..'}
        </div>
      ),
      size: '-',
      role: '-',
      uptime: '-',
      manage: '-',
      // image: (
      //   <div>
      //     <img
      //       src="/src/assets/img/moreactions.png"
      //       onClick={() => {
      //         console.log(123)
      //       }}
      //     />
      //   </div>
      // ),
    },
    {
      key: '2',
      filename: (
        <div>
          <img src="/src/assets/img/file.png" className={style.filepng} />
          {'公司LOGO & ICON 合集'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '3',
      filename: (
        <div>
          <img src="/src/assets/img/file.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '4',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '5',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '6',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '7',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '8',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '9',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '10',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '11',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '12',
      filename: (
        <div>
          <img src="/src/assets/img/document.png" className={style.filepng} />
          {'设计规范合集（更新到2020.02.28）'}
        </div>
      ),
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
  ]
  const [flag, setFlag] = useState(true)

  function onChange(pagination, filters, extra) {
    console.log('params', pagination, filters, extra)
  }

  function changeflag() {
    console.log(123)
    setFlag(!flag)
  }

  return (
    <div className={style.harddrive}>
      <div className={style.memtit}>
        <div className={style.lefthardword}>
          <div className={style.hardword}>超G名片设计资料文件库</div>
        </div>

        <div className={style.operate}>
          <Button type="primary" className={style.btn} onClick={changeflag}>
            成员管理
          </Button>
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

      {/* <div className={style.introduction}>简介</div>
      <div className={style.introductionContent}>
        <p>库实际上是一种代码共享的方式，主要用于代码重用和源码隐藏，通常分为动态库和静态库。</p>
        <p>静态库：链接时完整的拷贝至可执行文件中，被多次使用就有多份冗余拷贝。</p>
        <p>
          动态库：链接时不复制，程序运行时由系统动态加载到内存，供程序调用，系统只加载一次，多个程序共用，节省内存空间。
        </p>
      </div> */}
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
