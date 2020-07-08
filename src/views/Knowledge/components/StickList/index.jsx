import React, { forwardRef } from 'react'
import { List, Tag } from 'antd'
import style from './index.scss'

const StickList = forwardRef((props, ref) => {
  const data = [
    {
      color: '#2db7f5',
      name: '置顶',
      text: '官方公告：2019超G平台战略年会暨Gworld新产品群发布',
      tags: [
        {
          color: '#2db7f5',
          name: '置顶',
        },
        {
          color: '#f50',
          name: '精',
        },
      ],
    },
    {
      color: '#f50',
      name: '精',
      text: '官方公告：“超G名片”背后的故事 | 创业、创新、创举',
      tags: [
        {
          color: '#f50',
          name: '精',
        },
      ],
    },
  ]

  return (
    <div className={style.stickList} ref={ref}>
      <List
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            className={style.itemStyle}
            onClick={() => {
              window.open(window.location + 'article/detail', 'id=444')
            }}
          >
            <div className={style.tagList}>
              {item.tags.map((tag) => (
                <div key={tag.name}>
                  <Tag color={tag.color}>{tag.name}</Tag>
                </div>
              ))}
            </div>
            <div>{item.text}</div>
          </List.Item>
        )}
      />
    </div>
  )
})

export default StickList
