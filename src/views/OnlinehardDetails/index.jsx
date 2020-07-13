import React, { useState, useReducer, useEffect } from 'react'
import { Table, Button, Space, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import style from './index.scss'
import MemberManger from './membermanger'
import NewFils from './NewFils/index.jsx'

import { libFileList } from '@/api/library'
import { getUrlSearch, formateTime } from '@/utils'

const OnlinehardDetails = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  const initialState = {
    pageIndex: 1,
    pageSize: 10,
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        console.log({ ...state, ...action.payload }, 'update_state')
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [dataList, setList] = useState([])
  const [lib, setLib] = useState([])
  const [id, setOnLineHardId] = useState('')

  const getFileList = async () => {
    // if (isLoading || !hasMore) return
    // setLoading(true)
    console.log(1111111111)
    console.log(id)
    const res = await libFileList({
      id: id,
    })

    if (!hasMore || res.data.list.length < 10) {
      setHasMore(false)
    }
    console.log(res.data)
    const result = Object.assign({}, detail, res.data)
    setList(() => {
      return [...dataList, ...res.data.list]
    })
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
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
  }
  // useEffect(() => {
  //   getFileList().then(() => {
  //     setLoading(false)
  //   })
  // }, [state])

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
      dataIndex: 'filename',
      width: 500,
      // render: () => {
      //   return (
      //     <div>
      //       <img src="/src/assets/img/file.png" className={style.filepng} />
      //       {'公司LOGO & ICON 合集'}
      //     </div>
      //   )
      // },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
    },
    {
      title: '大小',
      dataIndex: 'size',
    },
    {
      title: '上传人',
      dataIndex: 'role',
    },
    {
      title: '上传时间',
      dataIndex: 'uptime',
    },
    {
      title: '管理',
      dataIndex: 'manage',
      key: 'action',
      render: (text, record, row) =>
        row === 0 ? (
          '-'
        ) : (
          <Space size="middle">
            <a
              onClick={() => {
                download(row)
              }}
            >
              下载
            </a>
          </Space>
        ),

      // <Space size="middle">
      //   <a
      //     onClick={() => {
      //       download(row)
      //     }}
      //   >
      //     下载
      //   </a>
      // </Space>
    },
    {
      title: '',
      dataIndex: 'image',
      render: () => {
        return (
          <div>
            <img
              src="/src/assets/img/moreactions.png"
              onClick={() => {
                console.log(123)
              }}
            />
          </div>
        )
      },
    },
  ]
  // const onRow = [{}]
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
  const [list] = useState(dataone)
  const [flag, setFlag] = useState(true)

  function onChange(pagination, filters, extra) {
    console.log('params', pagination, filters, extra)
  }

  const upfiles = () => {
    console.log(123)
  }

  function changeflag() {
    console.log(123)
    setFlag(!flag)
  }

  // const setRowClassName = (record, index) => {
  //   //record代表表格行的内容，index代表行索引
  //   //判断索引相等时添加行的高亮样式
  //   console.log(123)
  // }

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
            <Button type="primary" className={style.btn} onClick={upfiles}>
              上传文件
            </Button>
          </Upload>
        </div>
      </div>

      <div className={style.tablewarp}>
        {flag ? (
          <Table className={style.table} columns={columns} dataSource={dataone} onChange={onChange} />
        ) : (
          <MemberManger />
        )}
      </div>

      <div className={style.introduction}>简介</div>
      <div className={style.introductionContent}>
        <p>库实际上是一种代码共享的方式，主要用于代码重用和源码隐藏，通常分为动态库和静态库。</p>
        <p>静态库：链接时完整的拷贝至可执行文件中，被多次使用就有多份冗余拷贝。</p>
        <p>
          动态库：链接时不复制，程序运行时由系统动态加载到内存，供程序调用，系统只加载一次，多个程序共用，节省内存空间。
        </p>
      </div>
      {publishModalVisible && (
        <NewFils triggerShowPublishModal={triggerShowPublishModal} visible={publishModalVisible} />
      )}
    </div>
  )
}

export default OnlinehardDetails
