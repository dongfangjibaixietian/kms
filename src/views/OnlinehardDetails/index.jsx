import React, { useState } from 'react'
import { Table, Button, Space } from 'antd'

import style from './index.scss'
import MemberManger from './MemberManger'
import NewFils from './NewFils/index.jsx'

const OnlinehardDetails = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  const columns = [
    {
      title: '文件名',
      dataIndex: 'filename',
      width: 500,
      render: () => {
        return (
          <div>
            <img src="/src/assets/img/file.png" className={style.filepng} />
            {'公司LOGO & ICON 合集'}
          </div>
        )
      },
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
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              download(record)
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
      filename: '..',
      size: '-',
      role: '-',
      uptime: '-',
      manage: '-',
    },
    {
      key: '2',
      filename: '公司LOGO & ICON 合集',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '3',
      filename: '设计规范合集（更新到2020.02.28）',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '4',
      filename: '运动健身产品交互流程设计.jpg',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '5',
      filename: '多端统一开发UIKIT.doc',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '6',
      filename: '运动健身产品交互流程设计.jpg',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '7',
      filename: '组件库：官方出品80个高品质UI设计组件.pdf',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '8',
      filename: '可商用！2020 年免费中文字体最全合集（已分类打包）.zip',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '9',
      filename: '春节红包（9cm_16cm含刀模）_20200130.cdr',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '10',
      filename: '超G名片表情Emoji方案.ai',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '11',
      filename: '春节海报PSD.psd',
      size: '62.4M',
      role: '雪狼独行',
      uptime: '30分钟前',
    },
    {
      key: '12',
      filename: '超G名片后台管理系统(最终方案定稿)2020_02_10.sketch',
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

  const setonRow = (record, index) => {
    console.log(index)
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
          <Button type="primary" className={style.btn}>
            上传文件
          </Button>
        </div>
      </div>

      <div className={style.tablewarp}>
        {flag ? (
          <Table
            className={style.table}
            columns={columns}
            dataSource={list}
            onChange={onChange}
            // rowClassName={setRowClassName} //表格行样式
            onRow={setonRow}
            // onRow={(record) => {
            //   //表格行点击事件
            //   return {
            //     onClick: this.clickRow.bind(this, record.no),
            //     clickRow(num) {
            //       console.log(123)
            //       this.setState({
            //         activeIndex: num - 1, //获取点击行的索引
            //       })
            //     },
            //   }
            // }}
          />
        ) : (
          <MemberManger />
        )}

        {/* <Table className={style.table} columns={columns} dataSource={list} onChange={onChange} /> */}
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
