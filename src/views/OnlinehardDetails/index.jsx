import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Upload, message, Menu, Dropdown } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import style from './index.scss'
import NewFils from './NewFils/index.jsx'

import { libFileList, upLoadLib, downloadFile } from '@/api/library'
import { getUrlSearch, sizeTostr, getFileType } from '@/utils'
import { Uploader, format } from '@gworld/toolset'
import { randomNum } from '@/utils/index'

const OnlinehardDetails = ({ history }) => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  const [dataList, setList] = useState([])

  const [id, setOnLineHardId] = useState('')
  const [parentId, setParentId] = useState(0)
  const [editingKey, setEditingKey] = useState({})
  // const [layerId, setLayerId] = useState('')

  const getFileList = async () => {
    console.log(parentId)
    const res = await libFileList({
      //知识库id
      id: id,
      parentId: parentId,
    })
    // res.data.list.map((item, index) => {
    //   item.key = index
    // })
    if (parentId !== '0') {
      res.data.list.unshift({
        id: 'back',
        createTime: '',
        fileName: '..',
        fileSize: '',
        fileUrl: null,
        type: 'back',
      })
    }

    setList(res.data.list)
  }

  const _upLoadLib = async (file, url) => {
    // 图片格式
    const res = await upLoadLib({
      id: id,
      fileName: file.name,
      fileSize: file.size,
      type: getFileType(file.name),
      fileUrl: url,
      parentId: parentId,
    })
    if (res.code === 0) getFileList()
  }

  const props = {
    name: 'file',
    action: '',
    accept:
      'video/*,audio/*,image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',

    customRequest: (info) => {
      if (getFileType(info.file.name) === 'other') {
        message.error('请上传正确格式的文件！')
        return
      }

      let uploadType = 1
      switch (getFileType(info.file.name)) {
        case 'img':
          uploadType = 1
          break
        case 'video':
          uploadType = 2
          break
        default:
          uploadType = 3
          break
      }

      const typeList = {
        img: 1,
        video: 2,
      }
      const fileSuffix = info.file.name.split('.')[1] || 'png'
      Uploader.upload({
        file: info.file,
        type: uploadType, // 1 图片 2 视频 3 其他
        filename: `${randomNum()}.${fileSuffix}`, // 文件名称需要自己生成，不能包含中文
      }).then((url) => {
        const file = info.file
        _upLoadLib(file, url)
      })
    },
  }

  const toNextfiles = (item) => {
    if (item.type !== 'folder') return
    setParentId(item.id)
    window.location.href = window.location.origin + `/online/hard?hardId=${id}&parentId=${item.id}`
    // history.push(`/online/hard?hardId=${id}&parentId=${item.id}`)
  }

  const download = (row) => {
    window.open(downloadFile(row.id), '_blank')
  }

  const goToUserCenter = (item) => {
    window.open(window.location.origin + `/user/center?userId=${item.user.id}`)
  }

  const delFile = () => {
    Modal.confirm({
      title: '',
      content: `确认要删除此条数据吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功')
        const delIndex = dataList.findIndex((item) => editingKey === item.id)
        const copyList = [...dataList]
        copyList.splice(delIndex, 1)
        setList(copyList)
      },
    })
  }

  const menuHandleClick = (item) => {
    // 阻止点击某列触发行的事件
    item.domEvent.stopPropagation()
    switch (item.key) {
      case 'del':
        delFile()
        break
      case 'refresh':
        break
      case 'move':
        break
    }
  }

  const menu = (
    <Menu className={style.menu} onClick={menuHandleClick}>
      {/* <Menu.Item className={style.item} key="refresh">
        重命名
      </Menu.Item> */}
      <Menu.Item className={style.item} key="del">
        删除
      </Menu.Item>
      {/* <Menu.Item className={style.item} key="move">
        移动文件
      </Menu.Item> */}
    </Menu>
  )

  // 阻止点击某列触发行的事件
  const dropHandClick = (event, item) => {
    setEditingKey(item.id)
    event.stopPropagation()
  }

  const columns = [
    {
      title: '文件名',
      dataIndex: 'fileName',
      width: 500,
      render: (text, item) => {
        return (
          <div>
            {item.type === 'folder' || item.id === 'back' ? (
              <img src={require('@/assets/img/file.png').default} className={style.filepng} />
            ) : (
              <FileImageOutlined
                className="site-form-item-icon"
                style={{ fontSize: '20px', marginRight: '10px' }}
                twoToneColor="#eb2f96"
              />
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
        if (!item.user || item.type === 'folder') return '-'
        return sizeTostr(text)
      },
    },
    {
      title: '上传人',
      align: 'center',
      key: 'id',
      render: (record) => {
        if (!record.user) return '-'
        return (
          <span className={style.uploadRole} onClick={() => goToUserCenter(record)}>
            {record.user.nickname}
          </span>
        )
      },
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      render: (text, item) => {
        if (!item.user) return '-'
        return format(text, 'YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '管理',
      dataIndex: 'manage',
      key: 'action',
      render: (text, record, row) => {
        if (record.type == 'folder' || !record.user) return '-'
        return (
          <a
            onClick={() => {
              download(record)
            }}
          >
            下载
          </a>
        )
      },
    },
    {
      title: '',
      dataIndex: 'image',
      render: (text, item) => {
        if (!item.user) return ''
        return (
          <Dropdown overlay={menu} trigger={['click']} onClick={(e) => dropHandClick(e, item)}>
            <img width={26} height={26} src={require('@/assets/img/operate.png').default} />
          </Dropdown>
        )
      },
    },
  ]

  const goToMemberCenter = () => {
    history.push(`/member/manage?hardId=${id}&parentId=${parentId}`)
  }

  useEffect(() => {
    id && getFileList()
  }, [id, parentId])

  useEffect(() => {
    const searchId = getUrlSearch(window.location.search)
    setOnLineHardId(searchId.hardId)
    if (searchId.parentId) {
      setParentId(searchId.parentId)
    }
  }, [])

  return (
    <div className={style.hardDrive}>
      <div className={style.memtit}>
        <div className={style.hardword}>超G名片设计资料文件库</div>

        <div className={style.operate}>
          <div className={style.btnGroup}>
            {!!parentId ? (
              <Button type="primary" className={style.btn} onClick={() => goToMemberCenter()}>
                成员管理
              </Button>
            ) : null}
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
      </div>

      <div className={style.tablewarp}>
        <Table
          rowKey="id"
          locale={{ emptyText: '暂无数据' }}
          className={style.table}
          columns={columns}
          pagination={false}
          dataSource={dataList}
          onRow={(record) => {
            return {
              onClick: (e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                if (record.id === 'back') {
                  history.goBack()
                  return
                }
                toNextfiles(record)
              },
            }
          }}
        />
      </div>
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
