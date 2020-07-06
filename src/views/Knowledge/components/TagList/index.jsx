import React, { useState, useEffect } from 'react'
import { tagTree } from '@/api/tag'
import style from './index.scss'
import { useRootStore } from '@/utils/customHooks'

const TagList = () => {
  const { userInfo } = useRootStore().userStore
  const [tagList, setTagList] = useState([])
  const getTagList = async () => {
    const res = await tagTree({})
    console.log(res)
    if (res.code === 0) {
      //设置获取的数据列表
      setTagList(res.data.list)
    }
  }
  useEffect(() => {
    console.log(userInfo)
    getTagList()
  }, [userInfo])
  return (
    <div className={style.tagDetails}>
      <div className={style.tagTitle}>文档标签</div>
      <div className={style.tagList}>
        {tagList
          ? tagList.map((item) => (
              <div key={item.id} className={style.category}>
                <div className={style.title}>{item.content}</div>
                <div className={style.categoryDetails}>
                  {item.children.map((tag) => (
                    <div key={tag.id} className={style.item}>
                      {tag.content}
                    </div>
                  ))}
                </div>
              </div>
            ))
          : '暂无标签'}
      </div>
    </div>
  )
}

export default TagList
