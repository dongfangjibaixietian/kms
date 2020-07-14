import React, { forwardRef, useState, useEffect } from 'react'
import { List, Tag } from 'antd'
import { articleTop } from '@/api/article'
import style from './index.scss'

const StickList = forwardRef((props, ref) => {
  const [stickList, setStickList] = useState([])
  const getArticleTop = async () => {
    const res = await articleTop({})
    if (res.code === 0) {
      //设置获取的数据列表
      setStickList(res.data.list)
    }
  }
  useEffect(() => {
    getArticleTop()
  }, [])

  return (
    <div className={`${style.stickList} ${stickList.length > 0 ? null : style.hasContent}`} ref={ref}>
      {stickList.length > 0 ? (
        <List
          size="large"
          dataSource={stickList}
          renderItem={(item) => (
            <List.Item
              className={style.itemStyle}
              onClick={() => {
                window.open(window.location + 'article/detail', 'id=444')
              }}
            >
              <div className={style.tagList}>
                {item.isTop ? <Tag color="2db7f5">置顶</Tag> : null}
                {item.isEssence ? <Tag color="#f50">精</Tag> : null}
                {item.isHot ? <Tag color="#F83255">热门</Tag> : null}
              </div>
              <div>{item.title}</div>
            </List.Item>
          )}
        />
      ) : null}
    </div>
  )
})

export default StickList
