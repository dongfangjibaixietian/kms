import React, { useState, useReducer, useEffect } from 'react'
import { Table, Button, Space, Upload, message, Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import style from './index.scss'
import MemberManger from './MemberManger'
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
  const [finame, setFiName] = useState('')
  const [filesize, setFileSize] = useState('')
  const [filetype, setFileType] = useState('')
  const [url, setUrl] = useState('')
  const [parentId, setParentId] = useState('0')

  // function getFileType(fileName) {
  //   // 根据后缀判断文件类型
  //   let fileSuffix = ''
  //   // 结果
  //   let result = ''
  //   try {
  //     const flieArr = fileName.split('.')
  //     fileSuffix = flieArr[flieArr.length - 1]
  //   } catch (err) {
  //     fileSuffix = ''
  //   }
  //   // fileName无后缀返回 false
  //   // 图片格式
  //   const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
  //   // 进行图片匹配
  //   result = imglist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     setResult('img')
  //   }
  //   // 匹配txt
  //   const txtlist = ['txt']
  //   result = txtlist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     setResult(txt)
  //   }
  //   // 匹配 excel
  //   const excelist = ['xls', 'xlsx']
  //   result = excelist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     setResult(excel)
  //   }
  //   // 匹配 word
  //   const wordlist = ['doc', 'docx']
  //   result = wordlist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     result = 'word'
  //     return result
  //   }
  //   // 匹配 pdf
  //   const pdflist = ['pdf']
  //   result = pdflist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     result = 'pdf'
  //     return result
  //   }
  //   // 匹配 ppt
  //   const pptlist = ['ppt']
  //   result = pptlist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     result = 'ppt'
  //     return result
  //   }
  //   // 匹配 视频
  //   const videolist = ['mp4', 'm2v', 'mkv']
  //   result = videolist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     result = 'video'
  //     return result
  //   }
  //   // 匹配 音频
  //   const radiolist = ['mp3', 'wav', 'wmv']
  //   result = radiolist.some(function (item) {
  //     return item == fileSuffix
  //   })
  //   if (result) {
  //     result = 'radio'
  //     return result
  //   }
  //   // 其他 文件类型
  //   result = 'other'
  //   return result
  // }

  const getFileList = async () => {
    const res = await libFileList({
      //知识库id
      id: id,
    })
    console.log(res.data)
    res.data.list.map((item, index) => {
      item.key = index
    })

    setList(res.data.list)

    // setList(() => {
    //   return [...dataList, ...res.data.list]
    // })
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

    // if (!hasMore || res.data.list.length < 10) {
    //   setHasMore(false)
    // }
    window.location.reload()
    setParentId(res.data)
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
        filename: `${randomNum()}.${fileSuffix}}`, // 文件名称需要自己生成，不能包含中文
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

  const download = (row) => {
    console.log(row)
    window.open(row.fileUrl)
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
      dataIndex: 'fileName',
      width: 500,
      render: (text, item, record, index) => {
        return (
          <div
            onClick={() => {
              console.log(item)
              const id = item.id
            }}
          >
            {text}
          </div>
        )
      },

      //   )
      // },
      // render: (row) => {
      //   row === 0 ? '-' : 'fileName'
      //   // return (
      //   //   <div>
      //   //     <img src="/src/assets/img/file.png" className={style.filepng} />
      //   //     {'公司LOGO & ICON 合集'}
      //   //   </div>
      //   // )
      // },
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
      // render: (row) =>
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
      render: (text, record, row) => (
        // row === 0 ? (
        //   '-'
        // ) :
        <Space size="middle">
          <a
            onClick={() => {
              download(record, row)
            }}
          >
            下载
          </a>
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'image',
      render: (text, item, record, index) => {
        return (
          <div>
            <img
              src="/src/assets/img/moreactions.png"
              onClick={() => {
                console.log(item)
                const id = item.id
                Modal.confirm({
                  title: '确认',
                  content: `您确认要删除此条数据吗？${id}`,
                  onOk: () => {
                    message.success('删除成功')
                    window.location.reload()
                  },
                })
                // handleDelate(item)
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
            <Button type="primary" className={style.btn} onClick={_upLoadLib}>
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
